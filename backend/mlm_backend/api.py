from datetime import datetime, timezone
from os import environ

from aiohttp import web

ALLOWED_ORIGINS = environ.get('ALLOWED_ORIGINS', 'http://localhost:3000')
SUGGESTION_LOGS = 'suggestion.log'
LAST_REQUEST = {}

def submit_mlm(request):

    requester = request.remote
    suggestion = request.match_info['name']
    last_request, now = LAST_REQUEST.get(requester), datetime.now(tz=timezone.utc)
    LAST_REQUEST[requester] = now

    if last_request and (now - last_request).seconds < 3:
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


def run():
    app = web.Application()
    app.add_routes([web.get('/mlms/{name}', submit_mlm)])
    web.run_app(app)
