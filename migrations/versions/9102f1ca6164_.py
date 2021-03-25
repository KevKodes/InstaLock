"""empty message

Revision ID: 9102f1ca6164
Revises: a1a77e0396d8
Create Date: 2021-03-25 01:46:27.960685

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9102f1ca6164'
down_revision = 'a1a77e0396d8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_index('uniqueLike', 'likes', ['commentId', 'postId', 'userId'], unique=True)
    op.drop_constraint('unique_like', 'likes', type_='unique')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint('unique_like', 'likes', ['userId', 'commentId', 'postId'])
    op.drop_index('uniqueLike', table_name='likes')
    # ### end Alembic commands ###