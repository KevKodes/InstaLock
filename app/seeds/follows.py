from app.models import db, follows, User
from alembic import op

# add users in range to Demo's followers
def seed_follows():

  # for i in range(2, 35):
  #   new_follower = Follow(
  #     followedId = 1,
  #     followerId = i
  #   )
  #   db.session.add(new_follower)
  
  # db.session.commit()

  users = User.query.all()
  # print(users)

  user= users[2]
  followers = user.follows
  print('FOLLOWS USER', list(followers))
  # user.followers.append(users[2])
  # db.session.commit()

  # op.bulk_insert(follows, [
  #   { 'followed_Id':2, 'follower_Id':1},
  #   { 'followed_Id':3, 'follower_Id':1},
  #   { 'followed_Id':4, 'follower_Id':1},
  #   { 'followed_Id':5, 'follower_Id':1},
  #   { 'followed_Id':6, 'follower_Id':1},
  #   { 'followed_Id':7, 'follower_Id':1},
  #   { 'followed_Id':8, 'follower_Id':1},
  #   { 'followed_Id':9, 'follower_Id':1},
  #   { 'followed_Id':10, 'follower_Id':1},
  #   { 'followed_Id':11, 'follower_Id':1},
  #   { 'followed_Id':12, 'follower_Id':1},
  # ])



def undo_follows():
  db.session.execute('TRUNCATE follows;')
  db.session.commit()
