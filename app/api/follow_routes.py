from flask import Blueprint, request
from app.models import follows, User, db
from app.forms import FollowForm


follow_routes = Blueprint("follow", __name__)

# @follow_routes.route('/')
# def follows():
#     follows = Follow.query.all()
#     return {"follow":[follow.to_dict() for follow in follows]}


@follow_routes.route('/<int:id>/follows', methods=["GET"])
def user_follows(id):
    # user = User.query.filter(User.id==id).first()
    following = db.session.query(follows).filter_by(follower_id=id).all()
    followingIds = [y for x,y in following]
    users = User.query.filter(User.id.in_(followingIds)).all()
    # return {user.id:{follower.id:
    #     {"id":follower.id,"userName":follower.userName}
    #     for follower in user.followers.all()}}
    return {"follows":[user.to_dict() for user in users]}


@follow_routes.route('/<int:id>/followedBy', methods=["GET"])
def user_followed_by(id):
    # user = User.query.filter(User.id==id).first()
    followed = db.session.query(follows).filter_by(followed_id=id).all()
    followedIds = [x for x,y in followed]
    users = User.query.filter(User.id.in_(followedIds)).all()
    # return {user.id:{follower.id:
    #     {"id":follower.id,"userName":follower.userName}
    #     for follower in user.followers.all()}}
    return {"followed":[user.to_dict() for user in users]}



@follow_routes.route('/<int:followedId>/follows', methods=['POST'])
def follow_user(followedId):
    followed_user = User.query.filter(User.id == followedId).first()
    form = FollowForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        session_user_id = form.data['follower_id']

        session_user = User.query.filter(User.id == session_user_id).first()
        followers = followed_user.followers.all()
        followed_user.followers.append(session_user)
        # db.session.add(followed_user)
        db.session.commit()
        return {"follows":[user.to_dict() for user in followed_user.followers]}
    return {'errors': form.errors}



@follow_routes.route('/<int:followedId>/follows', methods=['DELETE'])
def unfollow_user(followedId):
    followed_user = User.query.filter(User.id == followedId).first()
    form = FollowForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        session_user_id = form.data['follower_id']

        session_user = User.query.filter(User.id == session_user_id).first()
        followers = followed_user.followers.all()
        followed_user.follows.remove(session_user)
        # db.session.add(followed_user)
        db.session.commit()
        return {"follows":[user.to_dict() for user in followed_user.followers]}
    return {'errors': form.errors}
