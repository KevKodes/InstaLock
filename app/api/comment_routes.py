from flask import Blueprint, jsonify, request
from app.models import db, Comment, Post


comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/')
def allComments():
    # get the comments
    comments = Comment.query.order_by(Comment.createdAt.desc()).all()
    return {
        "comments": [comment.to_dict() for comment in comments]
    }

# get a specific post's comments based on postId
@comment_routes.route('/<int:id>/')
def postComments(id):
    comments = Comment.query.filter_by(postId=id).order_by(Comment.createdAt.desc()).all()
    return {
        "comments": [comment.to_dict() for comment in comments]
    }

@comment_routes.route('/<int:id>/', methods=['POST'])
def new_comment(id):
    user_comment = request.get_json()
    userId=user_comment["userId"]
    postId=user_comment['postId']
    body=user_comment['body']

    freshComment = Comment(
        userId=userId,
        postId=postId,
        body=body
    )
    db.session.add(freshComment)
    db.session.commit()

    return freshComment.to_dict()



@comment_routes.route('/<int:id>/', methods=['DELETE'])
def delete_comment(id):
    #comments = Comment.query.filter_by(postId=id).order_by(Comment.createdAt.desc()).all()
    comment = Comment.query.get(id)
    db.session.delete(comment)
    db.session.commit()

    return comment.to_dict()
