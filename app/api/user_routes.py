from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()  # this line is throwing and error

@user_routes.route('/<userName>')
@login_required
def userName(userName):
    user = User.query.filter_by(userName=userName).first()
    return user.to_dict()


# Restore the session user
