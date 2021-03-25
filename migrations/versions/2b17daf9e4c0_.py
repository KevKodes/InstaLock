"""empty message

Revision ID: 2b17daf9e4c0
Revises: 9102f1ca6164
Create Date: 2021-03-25 01:54:30.912310

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2b17daf9e4c0'
down_revision = '9102f1ca6164'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index('uniqueLike', table_name='likes')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_index('uniqueLike', 'likes', ['commentId', 'postId', 'userId'], unique=True)
    # ### end Alembic commands ###