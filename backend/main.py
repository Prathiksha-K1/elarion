from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import WebSocket

from database.db import Base
from database.db import engine

from app.websocket.manager import manager

from app.models.beacon import BeaconDB
from app.models.answer_db import AnswerDB

from app.routers.beacons import (
    router as beacon_router,
)

from app.routers.answers import (
    router as answers_router,
)


Base.metadata.create_all(
    bind=engine
)


app = FastAPI(
    title="Elarion API"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(
    beacon_router,
    prefix="/beacons",
    tags=["beacons"],
)


app.include_router(
    answers_router,
    prefix="/answers",
    tags=["answers"],
)


@app.get("/")
def root():
    return {
        "message": "Elarion Backend Running 🚀"
    }


@app.websocket("/ws")
async def websocket_endpoint(
    websocket: WebSocket,
):
    await manager.connect(
        websocket
    )

    try:
        while True:
            await websocket.receive_text()

    except Exception:
        manager.disconnect(
            websocket
        )