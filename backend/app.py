from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import os

from utils.json_writer import write_findings_to_json

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return "VulnWatch CI is running"

@app.route('/api/results')
def get_results():
    findings_path = os.path.join(app.root_path, 'data')
    return send_from_directory(findings_path, 'findings.json', mimetype='application/json')

@app.route('/scan/nuclei', methods=['POST'])
def scan_nuclei():
    data = request.get_json()
    target_url = data.get("url")

    # Simulated scan result
    findings = [{
        "template-id": "generic-detect",
        "name": "Simulated Vulnerability",
        "severity": "medium",
        "matched-at": target_url
    }]

    # Path to findings file
    json_path = os.path.join(app.root_path, "data", "findings.json")

    # Write or merge into findings.json
    combined = write_findings_to_json(findings, json_path)

    return jsonify({
        "new_findings": findings,
        "total_stored": len(combined)
    })

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)
