from app.db.database import Base, engine
from app.models import *


def reset_database():
    print("Dropping all tables...")
    Base.metadata.drop_all(bind=engine)
    print("Creating all tables...")
    Base.metadata.create_all(bind=engine)
    print("✅ Database has been reset.")

if __name__ == "__main__":
    reset_database()