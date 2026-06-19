from database.db import Base
from database.db import engine

from app.models.beacon import BeaconDB
from app.models.answer_db import AnswerDB

Base.metadata.create_all(bind=engine)

print("✅ Database tables created")