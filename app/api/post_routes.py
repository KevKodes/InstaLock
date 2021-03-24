from flask import Blueprint, jsonify, redirect, request
from app.models import db, Post, follows
from app.forms import PostForm

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
    data = form.data
    print('HERES THE FORM USER', data)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
    # if True:
        new_post = Post(
            userId=form.data['userId'],
            photoURL=form.data['photoURL'],
            caption=form.data['caption'],
            vaulted=form.data['vaulted']
        )
        # new_post = Post()
        # form.populate_obj(new_post)
        print(new_post)
        db.session.add(new_post)
        db.session.commit()
        return new_post.to_dict()
    print('ERRORS: ', form.errors)
    return {'errors': form.errors}


@post_routes.route('/following/<int:id>')
def following_posts(id):
    # get the list of user id's that follow the session user
    following = db.session.query(follows).filter_by(follower_id=id).all()
    followingIds = [y for x,y in following]
    # add in the session user's id to the list so their posts show on the feed also

    # Query posts with a userId in the ids list (ordered with newest first)
    posts = Post.query.filter(Post.userId.in_(followingIds)).all()
    return {"posts": [post.to_dict() for post in posts]}
