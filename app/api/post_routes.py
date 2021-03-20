from flask import Blueprint, jsonify, redirect, request
from app.models import db, Post
from app.forms.post_form import PostForm

post_routes = Blueprint("posts", __name__)


@post_routes.route('/')
#feed all posts into this route?

def posts():
    posts = Post.query.all()
#Return all posts for feeds
    return {"posts": [post.to_dict() for post in posts]}

# @post_routes.route('/user/:id')
#feed all user posts into user's feed
