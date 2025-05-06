from flask import Flask, jsonify
from backend.scanner.nuclei_scanner import run_nuclei_scan
from backend.utils.logger import logger
import json

app = Flask(__name__)

@app.route("/")
def index():
    return "VulnWatch CI is running"

@app.route("/scan", methods=["GET"])
def scan():
    target = "http://testphp.vulnweb.com"
    logger.info("Starting Nuclei scan...")
    results = run_nuclei_scan(target)

    if results:
        logger.info(f"Results:\n{json.dumps(results, indent=2)}")
        return jsonify(results)
    else:
        logger.warning("No vulnerabilities found or scan failed.")
        return jsonify({"message": "No vulnerabilities found or scan failed."}), 404

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)
