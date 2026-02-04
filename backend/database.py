from sqlmodel import create_engine, SQLModel

# Database file ka rasta
DATABASE_URL = "sqlite:///./todos.db"

# Engine setup
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

def init_db():
    # Circular Import fix: Models ko function ke andar import karein
    import models
    # Ye line naye columns ke saath tables banayegi
    SQLModel.metadata.create_all(engine)