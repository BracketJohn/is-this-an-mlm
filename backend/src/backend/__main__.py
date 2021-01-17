"""Module that allows running the package."""
import os
import sys

from .api import run

HOST = os.environ.get('HOST', 'localhost')
PORT = int(os.environ.get('PORT', 8001))

if __name__ == '__main__':  # pragma: no cover
    run(HOST, PORT, with_hot_reload=bool(sys.flags.dev_mode))
