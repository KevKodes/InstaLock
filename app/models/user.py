from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  userName = db.Column(db.String(30), nullable = False, unique = True)
  firstName = db.Column(db.String(30), nullable - False)
  lastName = db.Column(db.String(30), nullable - False)
  email = db.Column(db.String(255), nullable = False, unique = True)
  profileImage = db.Column(db.String(255))
  following = dub.Column(db.Array, nullable = False, default = [])
  followers = dub.Column(db.Array, nullable = False, default = [])
  hashed_password = db.Column(db.String(255), nullable = False)
  createdAt  = db.Column(db.DateTime,  default=db.func.current_timestamp())
  updatedAt = db.Column(db.DateTime,  default=db.func.current_timestamp(),onupdate=db.func.current_timestamp())

  posts = db.relationship("Post", back_populates="user")


  @property
  def password(self):
    return self.hashed_password


  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)


  def check_password(self, password):
    return check_password_hash(self.password, password)


  def to_dict(self):
    return {
      "id": self.id,
      "userName": self.userName,
      "firstName": self.firstName,
      "lastName": self.lastName,
      "email": self.email,
      "profileImage": self.profileImage,
      "following": self.following,
      "followers": self.followers,

    }
