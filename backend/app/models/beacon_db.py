from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String

from database.db import Base


class BeaconDB(Base):
    __tablename__ = "beacons"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    question = Column(
        String,
        nullable=False,
    )

    author = Column(
        String,
        default="Explorer",
        nullable=False,
    )

    category = Column(
        String,
        default="general",
        nullable=False,
    )