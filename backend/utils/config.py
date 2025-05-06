import os

NUCLEI_PATH = os.getenv("NUCLEI_PATH", "/usr/local/bin/nuclei")
TEMPLATES_DIR = os.getenv("NUCLEI_TEMPLATES", "/path/to/nuclei-templates")
TARGETS_FILE = os.getenv("NUCLEI_TARGETS_FILE", "./targets.txt")
FINDINGS_FILE = os.getenv("FINDINGS_FILE", "./backend/data/findings.json")
