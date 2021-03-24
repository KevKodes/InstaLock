from app.models import db, follows, User
from alembic import op

# add users in range to Demo's followers
def seed_follows():

  users = User.query.all()
  # print(users)
  user= users[0]

  for i in range(1, 35):
    user.followers.append(users[i])

  db.session.commit()

  # methods for accessing follows
  # followers = user.follows
  # print('FOLLOWS USER', list(followers))
  

def undo_follows():
  db.session.execute('TRUNCATE follows;')
  db.session.commit()
