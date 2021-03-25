from flask import Blueprint, jsonify, redirect, request
from flask_login import current_user
from app.models import db, Post, follows, User, Like
from app.forms import PostForm


like_routes = Blueprint("likes", __name__)


@like_routes.route('/', methods=['POST'])
def like():
    like = ''
    if 'postId' in request.json:
        # add current_user.id to userId variable
        like = Like(postId=request.json['postId'], userId=1)
    elif 'commentId' in request.json:
        like = Like(commentId=request.json['commentId'], userId=1)
    else:
        return jsonify('Must include comment or post id'), 400
    db.session.add(like)
    db.session.commit()
    return jsonify(like.to_dict())
