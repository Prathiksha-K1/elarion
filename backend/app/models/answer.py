from pydantic import BaseModel


class AnswerCreate(BaseModel):
    beacon_id: int
    text: str
    author: str
    parent_id: int | None = None


class AnswerResponse(BaseModel):
    id: int
    beacon_id: int
    parent_id: int | None = None
    author: str
    text: str