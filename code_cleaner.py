import subprocess
import re
from set_logs import set_logger
# File paths
typescript_file = 'input.ts'
temp_file = 'output.ts'
logger = set_logger()
# Function to run the TypeScript file and capture errors


def run_typescript(file):
    run_command = f'npx ts-node {file}'
    result = subprocess.run(
        run_command, capture_output=True, text=True, shell=True)
    return result.stdout, result.stderr

# Function to parse errors and identify problematic functions


def parse_errors(stderr):

    # pattern to pick line and the error details
    pattern = r"input\.ts\((\d+),(\d+)\): error (?P<code>\w+): (?P<message>.*)"
    errors = []
    logger.info(re.finditer(pattern, stderr))
    for match in re.finditer(pattern, stderr):
        errors.append({
            "line": int(match.group(1)),
            "error_message": match.group("message").strip()
        })
    return errors

# Function to comment out problematic functions


def comment_out_functions(file, errors):
    unique = "sdfhgaksbgvjsavbh"
    with open(file, 'r') as f:
        data = f.read()
        data = data.replace("function", f"function{unique}")
        data = data.split("function")

    l = 0
    c_index = 0
    res = ""
    # lines = [int(i) for i in lines]
    logger.info(errors)
    for i in data:
        c = l + i.count("\n")
        comment = False
        # f"Line: {error['line']}, Error: {error['error_message']}"
        error_msg = f"Line: {errors[c_index]['line']}, Error: {errors[c_index]['error_message']}" if c_index < len(
            errors) else ""
        while c_index < len(errors) and l <= errors[c_index]["line"] <= c:
            comment = True
            c_index += 1

        l = c
        tmp = i.replace(unique, "function")
        res += tmp if not comment else f"/*\n\n{error_msg}\n\n {tmp} */\n"
    logger.info("=======result=============")
    logger.info(res)
    with open(temp_file, "w") as f:
        f.write(res)

    # Replace original file with the modified one
    # subprocess.run(['mv', temp_file, file])
# Main execution


def execute():
    stdout, stderr = run_typescript(typescript_file)

    if stderr:
        logger.info("Errors during execution:")
        logger.info(stderr)

        # Identify functions causing errors
        error_functions = parse_errors(stderr)
        logger.info(f"Functions to comment out: {error_functions}")

        # Comment out the identified functions
        comment_out_functions(typescript_file, error_functions)

        logger.info(
            "Modified TypeScript file to comment out error-causing functions.")
    else:
        logger.info("No errors encountered. TypeScript file is correct.")
