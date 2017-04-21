from flask import Blueprint, request
from src.model.billboard import Topics
from flask.json import jsonify
from src.model import db

from src.forms import validate_json_schema
from src.forms import AddTopicForm

from src.exceptions import CSNotFoundException
from src.helper import api_err, api_ok

from src.model.pydb_pydblite import pydb

bp = Blueprint('ajax', __name__)

@bp.errorhandler(CSNotFoundException)
def existed_handler(err):
    return api_err('NOT_FOUND', message=err.message), 404

# Add topic API
@bp.route('/topic', methods=['POST'])
@validate_json_schema(AddTopicForm)
def add_topic(form):

    new_topic_id = pydb.insert(content=form.content.data)
    data = dict(
        id=new_topic_id,
        upvotes=0,
        downvotes=0,
        content=form.content.data
    )
    return api_ok(data=data)


# Get topic API
@bp.route('/topic', methods=['GET'])
def get_topic():

    # Initial value
    data = dict(
        topic_list=[],
        total_rows=0
    )

    topic_list = [r for r in pydb.db]

    if len(topic_list) > 0:
        for t in topic_list:
            topic = dict(
                id=t['__id__'],
                upvotes=t['upvotes'],
                downvotes=t['downvotes'],
                content=t['content']
            )
            data['topic_list'].append(topic)
        data['total_rows'] = len(topic_list)

    return api_ok(data=data)


# Up vote topic API
@bp.route('/upvote/<string:topic_id>', methods=['POST'])
def up_vote(topic_id):

    topic = pydb.queryById(topic_id)

    if topic is None:
        raise CSNotFoundException(message="Topic id:{} not found".format(topic_id))

    updated_topic = pydb.upvoteById(topic_id)

    data = dict(
        id=updated_topic['__id__'],
        upvotes=updated_topic['upvotes'],
        downvotes=updated_topic['downvotes'],
    )

    return api_ok(data=data)


# Up vote topic API
@bp.route('/downvote/<string:topic_id>', methods=['POST'])
def down_vote(topic_id):

    topic = pydb.queryById(topic_id)

    if topic is None:
        raise CSNotFoundException(message="Topic id:{} not found".format(topic_id))

    updated_topic = pydb.downvoteById(topic_id)

    data = dict(
        id=updated_topic['__id__'],
        upvotes=updated_topic['upvotes'],
        downvotes=updated_topic['downvotes'],
    )

    return api_ok(data=data)
