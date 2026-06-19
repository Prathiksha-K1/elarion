from sqlalchemy.orm import Session

from app.models.beacon import BeaconDB
from app.models.answer_db import AnswerDB

from app.services.answer_service import (
    generate_ai_answer,
)


def get_all_beacons(
    db: Session,
):
    beacons = db.query(
        BeaconDB
    ).all()

    result = []

    for beacon in beacons:
        answers = (
            db.query(AnswerDB)
            .filter(
                AnswerDB.beacon_id
                == beacon.id
            )
            .all()
        )

        result.append(
            {
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
        )

    return result


def create_beacon(
    db: Session,
    question: str,
    author: str,
    category: str,
):
    beacon = BeaconDB(
        question=question,
        author=author,
        category=category,
    )

    db.add(beacon)

    db.commit()

    db.refresh(beacon)

    try:
        ai_answer_text = (
            generate_ai_answer(
                question
            )
        )

        ai_answer = AnswerDB(
            beacon_id=beacon.id,
            author="Elarion AI",
            text=ai_answer_text,
        )

        db.add(ai_answer)

        db.commit()

    except Exception as e:
        print(
            "AI Error:",
            e,
        )

    return beacon