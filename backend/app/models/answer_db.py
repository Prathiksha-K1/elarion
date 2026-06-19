from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import ForeignKey

from database.db import Base


class AnswerDB(Base):
    __tablename__ = "answers"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    beacon_id = Column(
        Integer,
        ForeignKey("beacons.id"),
    )

    author = Column(
        String,
        nullable=False,
    )

    text = Column(
        String,
        nullable=False,
    )