from datetime import datetime, timezone

from aiohttp import web

from mlms import MLMS

SUGGESTION_LOGS = 'suggestion.log'


def all_mlms(request):
    ts = datetime.now(tz=timezone.utc).isoformat()
    print(f'{ts} - Request for complete MLM list.')
    return web.json_response(MLMS)


def submit_mlm(request):
    with open(SUGGESTION_LOGS, 'a') as target:
        target.write(f'{request.match_info["name"]}\n')
    return web.json_response({})


def run():
    app = web.Application()
    app.add_routes([web.get('/mlms', all_mlms)])
    app.add_routes([web.post('/mlms/{name}', submit_mlm)])
    web.run_app(app)
