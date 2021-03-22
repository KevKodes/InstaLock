from app.models import db, follows

# add users in range to Demo's followers
def seed_follows():

  for i in range(2, 35):
    new_follower = Follow(
      followedId = 1,
      followerId = i
    )
    db.session.add(new_follower)
  
  db.session.commit()



def undo_follows():
  db.session.execute('TRUNCATE follows;')
  db.session.commit()
