from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from database.db import get_db

from app.models.answer import (
    AnswerCreate,
)

from app.services.answer_service import (
    get_answers_for_beacon,
    create_user_answer,
)

from app.websocket.manager import manager

router = APIRouter()


@router.get("/{beacon_id}")
def get_answers(
    beacon_id: int,
    db: Session = Depends(
        get_db
    ),
):
    return get_answers_for_beacon(
        db,
        beacon_id,
    )


@router.post("/")
async def create_answer(
    data: AnswerCreate,
    db: Session = Depends(
        get_db
    ),
):
    answer = create_user_answer(
        db,
        data.beacon_id,
        data.text,
        data.author,
    )

    answer_payload = {
        "id": answer["id"],
        "beacon_id": data.beacon_id,
        "author": answer["author"],
        "text": answer["text"],
    }

    await manager.broadcast(
        {
            "type": "new_answer",
            "answer": answer_payload,
        }
    )

    return answer_payload