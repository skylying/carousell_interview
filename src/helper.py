from flask import current_app, make_response
from flask.json import jsonify
from collections import defaultdict

err_dict = defaultdict(lambda: (500, "Unknown error"), {
        # Generic
        'OK': (200, 'OK'),
        'NOT_MODIFIED': (304, 'Not Modified'),
        'BAD_REQUEST': (400, 'Bad request'),
        'NOT_FOUND': (404, 'Not Found'),
        'CONFLICT': (409, 'Resource conflict'),
        'INTERNAL_ERROR': (500, "Internal error"),
})



def api_err(name='INTERNAL_ERROR', data=None, message=None):
    err_obj = err_dict[name]

    if data is None:
        data = {}

    if message is None or len(message) == 0:
        message = err_obj[1]

    return jsonify(
        code=err_obj[0],
        message=message,
        **data)

def api_ok(**kwargs):
    return api_err(name='OK', data=kwargs)