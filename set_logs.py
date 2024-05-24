import logging

# Define the log file path


def set_logger():
    log_file = "program.log"

    # Create a logger
    logger = logging.getLogger(__name__)
    logger.setLevel(logging.DEBUG)  # Adjust logging level as needed

    # Create a file handler
    file_handler = logging.FileHandler(log_file)

    # Set a formatter for the log messages
    formatter = logging.Formatter(
        "%(asctime)s - %(name)s - %(levelname)s - %(message)s")
    file_handler.setFormatter(formatter)

    # Add the handler to the logger
    logger.addHandler(file_handler)

    # Now you can use the logger to record messages
    return logger
