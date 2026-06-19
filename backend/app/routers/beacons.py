from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from pydantic import BaseModel

from database.db import get_db

from app.services.beacon_service import (
    get_all_beacons,
    create_beacon,
)

from app.models.answer_db import AnswerDB

from app.websocket.manager import manager

router = APIRouter()


class BeaconCreate(BaseModel):
    question: str
    author: str
    category: str


@router.get("/")
def get_beacons(
    db: Session = Depends(get_db),
):
    return get_all_beacons(db)


@router.post("/")
async def create_new_beacon(
    data: BeaconCreate,
    db: Session = Depends(get_db),
):
    beacon = create_beacon(
        db,
        data.question,
        data.author,
        data.category,
    )

    answers = (
        db.query(AnswerDB)
        .filter(
            AnswerDB.beacon_id
            == beacon.id
        )
        .all()
    )

    beacon_payload = {
        "id": beacon.id,
        "question": beacon.question,
        "author": beacon.author,
        "category": beacon.category,
        "answers": [
            {
                "id": answer.id,
                "author": answer.author,
                "text": answer.text,
            }
            for answer in answers
        ],
    }

    await manager.broadcast(
        {
            "type": "new_beacon",
            "beacon": beacon_payload,
        }
    )

    return beacon_payload