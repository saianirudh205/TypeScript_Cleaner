from flask import Flask, request, jsonify, send_file, make_response
from run_python import execute
import subprocess
import os

app = Flask(__name__)


@app.route('/clean', methods=['POST'])
def clean():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        input_path = 'input.ts'
        output_path = 'output.ts'

        try:

            file.save(input_path)
            execute()
            response = make_response(
                send_file(output_path, as_attachment=True))
            response.headers['Content-Type'] = 'text/plain'
            os.remove(input_path)
            # os.remove(output_path)

            return response
        except Exception as e:
            return make_response(f"Error downloading file: {str(e)}", 500)


if __name__ == '__main__':
    app.run(debug=True)
