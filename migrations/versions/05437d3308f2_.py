from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '05437d3308f2'
down_revision = 'f141d6fda8a8'
branch_labels = None
depends_on = None

def upgrade():
    # Añade la columna con un server_default para no romper las filas existentes
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(
            sa.Column(
                'is_guest',
                sa.Boolean(),
                nullable=False,
                server_default=sa.text('false')
            )
        )
    # Opcional: retirar el default en la columna, si no quieres que
    # futuras inserciones lo hereden automáticamente
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column(
            'is_guest',
            server_default=None
        )

def downgrade():
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('is_guest')
