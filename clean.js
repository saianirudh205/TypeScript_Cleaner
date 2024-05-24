"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var fs = require("fs");
var path = require("path");
function cleanCode(inputFilePath, outputFilePath) {
    var program = ts.createProgram([inputFilePath], {});
    var sourceFile = program.getSourceFile(inputFilePath);
    if (!sourceFile) {
        console.error('Could not find source file.');
        return;
    }
    var diagnostics = ts.getPreEmitDiagnostics(program);
    var errorNodes = new Set();
    diagnostics.forEach(function (diagnostic) {
        if (diagnostic.file) {
            var start = diagnostic.start, length_1 = diagnostic.length;
            if (start !== undefined && length_1 !== undefined) {
                var end = start + length_1;
                var node = findNode(sourceFile, start, end);
                if (node) {
                    errorNodes.add(node);
                }
            }
        }
    });
    function findNode(node, start, end) {
        if (node.getStart() <= start && node.getEnd() >= end) {
            return ts.forEachChild(node, function (child) { return findNode(child, start, end); }) || node;
        }
        return null;
    }
    function visitor(node) {
        if (errorNodes.has(node)) {
            return undefined;
        }
        return ts.visitEachChild(node, visitor, context);
    }
    var result = ts.transform(sourceFile, [function (context) { return function (node) { return ts.visitNode(node, visitor); }; }]);
    var printer = ts.createPrinter();
    var transformedSourceFile = result.transformed[0];
    var cleanedCode = printer.printFile(transformedSourceFile);
    fs.writeFileSync(outputFilePath, cleanedCode);
    console.log("Cleaned code written to ".concat(outputFilePath));
}
var inputFilePath = path.resolve(__dirname, 'input.ts');
var outputFilePath = path.resolve(__dirname, 'output.ts');
cleanCode(inputFilePath, outputFilePath);
