import json
import os

def write_findings_to_json(new_findings, json_file_path):
    # If file exists and has data, read it
    if os.path.exists(json_file_path):
        with open(json_file_path, "r") as f:
            try:
                existing_findings = json.load(f)
            except json.JSONDecodeError:
                existing_findings = []
    else:
        existing_findings = []

    # Combine findings, avoiding exact duplicates
    existing_urls = {finding["matched-at"] for finding in existing_findings if "matched-at" in finding}
    unique_new_findings = [f for f in new_findings if f.get("matched-at") not in existing_urls]

    # Append new unique findings
    combined_findings = existing_findings + unique_new_findings

    # Write back the full findings list
    with open(json_file_path, "w") as f:
        json.dump(combined_findings, f, indent=2)

    return combined_findings
