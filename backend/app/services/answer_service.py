from groq import Groq
from dotenv import load_dotenv
import os

from sqlalchemy.orm import Session

from app.models.answer_db import AnswerDB


load_dotenv()

client = Groq(
    api_key=os.getenv(
        "GROQ_API_KEY"
    )
)


def generate_ai_answer(
    question: str,
):
    try:
        response = (
            client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=[
                    {
                        "role": "system",
                        "content": """
You are Elarion AI.

Answer like a smart helpful internet friend.

Rules:
- Useful
- Slightly funny
- Creative
- Easy to read
- Under 200 words
"""
                    },
                    {
                        "role": "user",
                        "content": question,
                    },
                ],
            )
        )

        return (
            response
            .choices[0]
            .message.content
        )

    except Exception as e:
        print(
            "Groq Error:",
            e,
        )

        return (
            "⚡ Elarion AI is thinking..."
        )


def get_answers_for_beacon(
    db: Session,
    beacon_id: int,
):
    answers = (
        db.query(AnswerDB)
        .filter(
            AnswerDB.beacon_id
            == beacon_id
        )
        .all()
    )

    return [
        {
            "id": answer.id,
            "author": answer.author,
            "text": answer.text,
        }
        for answer in answers
    ]


def create_user_answer(
    db: Session,
    beacon_id: int,
    text: str,
    author: str,
):
    answer = AnswerDB(
        beacon_id=beacon_id,
        author=author,
        text=text,
    )

    db.add(answer)

    db.commit()

    db.refresh(answer)

    return {
        "id": answer.id,
        "author": answer.author,
        "text": answer.text,
    }