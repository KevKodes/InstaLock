from flask import Blueprint, jsonify, redirect, request
from app.models import db, Post, follows, User, Like
from app.forms import PostForm


like_routes = Blueprint("likes", __name__)


@like_routes.route('/', methods=['POST'])
def like():
    like = ''
    if 'postId' in request.json and 'userId' in request.json:
        # add current_user.id to userId variable
        like = Like(postId=request.json['postId'],
                    userId=request.json['userId'])
    elif 'commentId' in request.json and 'userId' in request.json:
        like = Like(commentId=request.json['commentId'],
                    userId=request.json['userId'])
    else:
        return jsonify('Must include comment or post id'), 400
    db.session.add(like)
    db.session.commit()
    return jsonify(like.to_dict())


@like_routes.route('/')
def get_all_likes():
    likes = Like.query.all()
    return {"likes": [like.to_dict() for like in likes]}


@like_routes.route('/', methods=['DELETE'])
def unlike_posts():

    query = ''
    if 'postId' in request.json and 'userId' in request.json:
        query = Like.query.filter(
            Like.postId == request.json['postId'],
            Like.userId == request.json['userId']
        )
    elif 'commentId' in request.json and 'userId' in request.json:
        query = Like.query.filter(
            Like.commentId == request.json['commentId'],
            Like.userId == request.json['userId']
        )

    like = query.first()

    success = query.delete()

    db.session.commit()

    return jsonify({'id': like.id, 'success': True if success else False})
