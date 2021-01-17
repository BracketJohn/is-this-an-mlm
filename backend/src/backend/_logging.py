"""Module that handles logger setup."""
import logging
import os

from pythonjsonlogger import jsonlogger

# Adapted from https://docs.python.org/2/library/logging.html#logrecord-attributes
_LOG_LEVEL = os.environ.get('LOG_LEVEL', 'INFO').upper()
_LOG_FORMAT = '%(asctime)%(levelname)%(message)%(name)'
_LOG_FORMATTER = jsonlogger.JsonFormatter(_LOG_FORMAT)


def _raise_test_plugin_logging_level_to_error() -> None:
    """Raise the default test plugin logging level to `ERROR`.

    Some test plugin loggers have a default logging level of `debug`. This severely hinders
    debugabbility of code, since test plugin logs will swamp `stdout` if any test fails.

    To resolve this, we raise the default logging level of test plugin to `ERROR` here.

    """
    logging.getLogger('flake8').setLevel(logging.ERROR)
    logging.getLogger('filelock').setLevel(logging.ERROR)


def configure_logging() -> None:
    """Configure the project logging.

    This function configures the project logging, all loggers instantiated after calling
    this function will inherit this configuration.

    This function should be called at the very start of running the application, else loggers
    with different configurations may be instantiated.

    """
    _raise_test_plugin_logging_level_to_error()

    log_handler = logging.StreamHandler()
    log_handler.setFormatter(_LOG_FORMATTER)

    root_logger = logging.getLogger()
    root_logger.setLevel(_LOG_LEVEL)
    root_logger.addHandler(log_handler)
