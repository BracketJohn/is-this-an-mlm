from os import path

from api import SUGGESTION_LOGS, run


if not path.isfile(SUGGESTION_LOGS):
    with open(SUGGESTION_LOGS, 'a') as target:
        target.write(f'Logfile: `{SUGGESTION_LOGS}`.\n')

run()
