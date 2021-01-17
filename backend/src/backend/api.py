"""Module that describes API end-points."""
import datetime
import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel

import uvicorn

_LOGGER = logging.getLogger(__name__)
_SUGGESTIONS_FOLDER = '/suggestions'
app = FastAPI()
origins = [
    "http://localhost",
    "http://localhost:3000",
    "https://isthisanmlm.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Suggestion(BaseModel):
    name: str

@app.post('/suggestion')
async def make_suggestion(suggestion: Suggestion) -> None:
    """Enqueue random palturai company ids."""
    now = datetime.datetime.now(tz=datetime.timezone.utc)
    name = suggestion.name

    _LOGGER.info('Suggestion was made', extra={'suggestion': suggestion})
    with open(f'/{_SUGGESTIONS_FOLDER}/suggestions.log', 'a') as target:
        target.write(f'{now};{name}\n')


def run(host: str, port: int, with_hot_reload: bool = False) -> None:
    """Run the `backend`."""
    uvicorn.run('backend.api:app', host=host, port=port, reload=with_hot_reload)
