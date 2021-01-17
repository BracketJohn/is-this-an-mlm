"""Module that test running of the package."""
import pytest

from python_scaffold.__main__ import run


def test_main() -> None:
    with pytest.raises(NotImplementedError):
        run()
