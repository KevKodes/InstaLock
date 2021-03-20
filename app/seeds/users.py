from werkzeug.security import generate_password_hash
from app.models import db, User
from faker import Faker

# Adds a demo user, you can add other users here if you want
def seed_users():
    faker = Faker()
    password = 'password'

    demo = User(userName='Demo',
                firstName='Demo',
                lastName='User',
                email='demo@aa.io',
                password=password)

    db.session.add(demo)

    count = 0
    while count < 50:
        newUser = User(
            userName= faker.user_name(),
            firstName= faker.first_name(),
            lastName= faker.last_name(),
            email= faker.email(),
            password= (f'password{count}')
        )
        count = count + 1
        db.session.add(newUser)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users;')
    db.session.commit()
