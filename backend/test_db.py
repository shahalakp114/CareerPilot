from app import create_app
from app.extensions import db

app = create_app()

with app.app_context():

    print("Database engine:")
    print(db.engine)

    print("Database tables:")
    print(db.metadata.tables)