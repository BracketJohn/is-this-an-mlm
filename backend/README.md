# Backend

Backend that provides some basic reporting functionality, like making new suggestions.

## Development

Install `python-poetry` and `python3.9`, then run:
```sh
> poetry env use python3.9 # Create virtual environment and enter it
> poetry install
> poetry run python -X dev -m backend
```

## Deployment

Remove the `dev` flag:
```sh
> poetry install
> poetry run python -m backend
```
