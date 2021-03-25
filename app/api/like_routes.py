from flask import Blueprint, jsonify, redirect, request
from app.models import db, Post, follows, User, Like
from app.forms import PostForm


like_routes = Blueprint("likes", __name__)


@like_routes.route('/', methods=['POST'])
def like():
    like = ''
    if 'postId' in request.json:
        # add current_user.id to userId variable
        like = Like(postId=request.json['postId'], userId=request.json['userId'])
    elif 'commentId' in request.json:
        like = Like(commentId=request.json['commentId'], userId=request.json['userId'])
    else:
        return jsonify('Must include comment or post id'), 400
    db.session.add(like)
    db.session.commit()
    return jsonify(like.to_dict())
