import * as ts from 'typescript';
import * as fs from 'fs';
import * as path from 'path';

function cleanCode(inputFilePath: string, outputFilePath: string): void {
    const program = ts.createProgram([inputFilePath], {});
    const sourceFile = program.getSourceFile(inputFilePath);

    if (!sourceFile) {
        console.error('Could not find source file.');
        return;
    }

    const diagnostics = ts.getPreEmitDiagnostics(program);
    const errorNodes: Set<ts.Node> = new Set();

    diagnostics.forEach(diagnostic => {
        if (diagnostic.file) {
            const { start, length } = diagnostic;
            if (start !== undefined && length !== undefined) {
                const end = start + length;
                const node = findNode(sourceFile, start, end);
                if (node) {
                    errorNodes.add(node);
                }
            }
        }
    });

    function findNode(node: ts.Node, start: number, end: number): ts.Node | null {
        if (node.getStart() <= start && node.getEnd() >= end) {
            return ts.forEachChild(node, child => findNode(child, start, end)) || node;
        }
        return null;
    }

    function visitor(node: ts.Node): ts.Node | undefined {
        if (errorNodes.has(node)) {
            return undefined;
        }
        return ts.visitEachChild(node, visitor, context);
    }

    const result = ts.transform(sourceFile, [(context) => (node) => ts.visitNode(node, visitor)]);
    const printer = ts.createPrinter();
    const transformedSourceFile = result.transformed[0] as ts.SourceFile;
    const cleanedCode = printer.printFile(transformedSourceFile);

    fs.writeFileSync(outputFilePath, cleanedCode);
    console.log(`Cleaned code written to ${outputFilePath}`);
}

const inputFilePath = path.resolve(__dirname, 'input.ts');
const outputFilePath = path.resolve(__dirname, 'output.ts');
cleanCode(inputFilePath, outputFilePath);
