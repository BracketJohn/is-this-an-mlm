from datetime import datetime, timezone
from os import environ

from aiohttp import web

ALLOWED_ORIGINS = environ.get('ALLOWED_ORIGINS', '*')
SUGGESTION_LOGS = 'suggestion.log'
TIMES_SHARED = {}
LAST_REQUEST = {}

def submit_mlm(request):

    requester = request.remote
    suggestion = request.match_info['name']
    last_request, now = LAST_REQUEST.get(requester), datetime.now(tz=timezone.utc)
    LAST_REQUEST[requester] = now

    if last_request and (now - last_request).seconds < 2:
        print(f'{now} - Suggestion blocked. User suggested `{suggestion}`.')
        response = web.json_response({
            'status': 'error',
        })
    else:
        print(f'{now} - Suggestion was accepted. User suggested `{suggestion}`.')
        with open(SUGGESTION_LOGS, 'a') as target:
            target.write(f'{suggestion}\n')
        response = web.json_response({
            'status': 'success',
        })

    response.headers['Access-Control-Allow-Origin'] = ALLOWED_ORIGINS
    return response


def shared(request):
    target, now = request.match_info['target'], datetime.now(tz=timezone.utc)
    TIMES_SHARED[target] = TIMES_SHARED.get(target, 0) + 1
    print(f'{now} - Now shared `{sum(TIMES_SHARED.values())}` times. Shares per target:\n{TIMES_SHARED}')

    return web.json_response({
        'status': 'success',
    })


def run():
    app = web.Application()
    app.add_routes([web.get('/mlms/suggestion/{name}', submit_mlm)])
    app.add_routes([web.get('/mlms/shared/{target}', shared)])
    web.run_app(app)
