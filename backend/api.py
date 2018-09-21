from aiohttp import web

from mlms import MLMS


async def get_mlms():
    web.json_response(MLMS)

app = web.Application()
app.add_routes([web.get('/api/mlms', get_mlms)])
web.run_app(app)
