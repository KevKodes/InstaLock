from flask import Blueprint, jsonify, redirect, request
from app.models import db, Post, follows, User, Comment
from app.forms import PostForm

post_routes = Blueprint("posts", __name__)


@post_routes.route('/discovery/<int:id>')
# Query all posts from users that the session user is not following
def posts(id):
    all_user_ids = set([x for (x,) in db.session.query(User.id).all()])

    # find the list of users that are followed by the session user
    following = db.session.query(follows).filter_by(follower_id=id).all()
    following_ids = [y for x,y in following]
    # add in the session user's id to the list so their posts show on the feed also
    following_ids.append(id)
    following_set = set(following_ids)
    not_following_set = all_user_ids - following_set

    # Query posts with a userId in the not_following_set (ordered with newest first)
    posts = Post.query.filter(Post.userId.in_(not_following_set),
    Post.vaulted=='false').order_by(Post.createdAt.desc()).all()

    # posts = Post.query.all()
    return {"posts": [post.to_dict() for post in posts]}


@post_routes.route('/<int:id>')
#Add all user posts into user's feed based on userId
def post(id):
    posts = Post.query.filter_by(userId=id).order_by(Post.createdAt.desc()).all()
    return {"posts": [post.to_dict() for post in posts]}


@post_routes.route('/create_post', methods=['POST'])
#creates the post aka the holy grail
def create_post():
    form = PostForm()
    data = form.data
    form['csrf_token'].data = request.cookies['csrf_token']
    id = form.data['userId']
    # if form.validate_on_submit():
    if True:
        new_post = Post(
            userId=form.data['userId'],
            photoURL=form.data['photoURL'],
            caption=form.data['caption'],
            vaulted=form.data['vaulted']
        )
        # form.populate_obj(new_post)

        db.session.add(new_post)
        db.session.commit()

        # return new_post.to_dict()

        # get the followers posts for return so it component can redirect there
        following = db.session.query(follows).filter_by(follower_id=id).all()
        following_ids = [y for x,y in following]
        # add in the session user's id to the list so their posts show on the feed also
        following_ids.append(id)
        following_set = set(following_ids)
        # Query posts with a userId in the ids set (ordered with newest first)
        posts = Post.query.filter(Post.userId.in_(following_set)).order_by(Post.createdAt.desc()).all()
        return {"posts": [post.to_dict() for post in posts]}

    print('ERRORS: ', form.errors)
    return {'errors': form.errors}


@post_routes.route('/following/<int:id>')
def following_posts(id):
    # get the list of user id's that follow the session user that aren't vaulted
    following = db.session.query(follows).filter_by(follower_id=id).all()
    following_ids = [y for x,y in following]
    # add in the session user's id to the list so their posts show on the feed also
    following_ids.append(id)
    following_set = set(following_ids)
    # Query posts with a userId in the ids set (ordered with newest first)
    posts = Post.query.filter(Post.userId.in_(following_set),
    Post.vaulted=='false').order_by(Post.createdAt.desc()).all()
    return {"posts": [post.to_dict() for post in posts]}


# @post_routes.route('/delete/<int:postId>')
# def delete_post(postId):
#     pass


@post_routes.route('/update/<int:postId>')
# update the vaulted value of a post
def update_post(postId):
    post = Post.query.get(postId)
    post.vaulted = not post.vaulted
    db.session.commit()
    return post.to_dict()
