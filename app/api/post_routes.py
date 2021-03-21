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


@post_routes.route('/<int:id>')
#feed all user posts into user's feed based on userId
def post(id):
    posts = Post.query.filter_by(userId=id).all()
    return {"posts": [post.to_dict() for post in posts]}


@post_routes.route('/create_post', methods=['POST'])
#creates the post aka the holy grail
def create_post():
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post = Post(
            userId=2,
            photoURL=form.data['photoURL'],
            caption=form.data['caption'],
            vaulted=form.data['vaulted']
        )
        db.session.add(post)
        db.session.commit()
        return post.to_dict()
    print(form.errors)
    return {'errors': form.errors}
