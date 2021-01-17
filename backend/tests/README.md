# Tests

Tests are split into the following structure:

- `tests/`:
    - `__init__`: Package for _all_ tests of this package
    - (optional) `conftest.py`: Contains additional test configuration, fixtures, ...
    - `*.py` and additional folders: Contains End-to-end and integration tests, i.e., publicly/outside available functionality, i.e., "blackbox testing"
    - `test_python_scaffold/`: Contains module, function and unit tests
