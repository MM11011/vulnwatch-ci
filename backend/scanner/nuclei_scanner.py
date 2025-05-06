import subprocess
import json
import os
from dotenv import load_dotenv
from backend.utils.logger import logger

load_dotenv()

TEMPLATES_PATH = os.getenv("NUCLEI_TEMPLATES_PATH", "")
FINDINGS_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "findings.json")

def run_nuclei_scan(target_url):
    logger.info("Starting Nuclei scan...")
    logger.info(f"Starting Nuclei scan for {target_url}")

    cmd = [
        "nuclei",
        "-u", target_url,
        "-jsonl"
    ]

    if TEMPLATES_PATH:
        cmd.extend(["-t", TEMPLATES_PATH])

    try:
        result = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            check=True
        )

        findings = []

        for line in result.stdout.strip().splitlines():
            try:
                finding = json.loads(line)
                findings.append(finding)
                logger.info(f"Finding: {finding.get('info', {}).get('name', 'Unknown')}")
            except json.JSONDecodeError:
                logger.warning(f"Skipping malformed line: {line}")

        if findings:
            logger.info(f"{len(findings)} vulnerabilities found.")
        else:
            logger.info("No vulnerabilities found.")

        # Save to findings.json
        with open(FINDINGS_PATH, "w") as f:
            json.dump(findings, f, indent=2)

        return findings

    except subprocess.CalledProcessError as e:
        logger.error(f"Nuclei scan failed with exit code {e.returncode}")
        logger.error(f"stderr: {e.stderr}")
        return []
