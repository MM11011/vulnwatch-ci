import logging

def setup_logger():
    logger = logging.getLogger("VulnWatchCI")
    logger.setLevel(logging.INFO)

    if not logger.handlers:
        ch = logging.StreamHandler()
        ch.setLevel(logging.INFO)

        formatter = logging.Formatter("[%(asctime)s] %(levelname)s - %(message)s")
        ch.setFormatter(formatter)

        logger.addHandler(ch)

    return logger

# Expose the logger object
logger = setup_logger()
