from database.db import SessionLocal

from app.models.beacon import BeaconDB
from app.models.answer_db import AnswerDB

db = SessionLocal()

# Clear Existing Data

db.query(AnswerDB).delete()
db.query(BeaconDB).delete()
db.commit()

seed_data = {
    "ai": [
        "How do I learn RAG effectively?",
        "Best roadmap for becoming a GenAI engineer?",
        "What are embeddings in LLMs?",
        "LangChain vs LangGraph?",
        "How do AI agents work?"
    ],

    "career": [
        "How can I get my first internship?",
        "What should I put on my resume?",
        "How important is LinkedIn?",
        "How do I prepare for placements?",
        "What skills are recruiters looking for?"
    ],

    "research": [
        "How do I start reading research papers?",
        "How do I publish an IEEE paper?",
        "How important is research experience?",
        "Best tools for literature review?",
        "How do researchers choose topics?"
    ],

    "startup": [
        "How do I validate a startup idea?",
        "How do student founders find cofounders?",
        "Should I bootstrap or raise funding?",
        "What is an MVP?",
        "How do startups find users?"
    ],

    "coding": [
        "Best way to learn React?",
        "How do I learn backend development?",
        "FastAPI or Django?",
        "How should I learn system design?",
        "What projects improve coding skills?"
    ],

    "cybersecurity": [
        "How do beginners start cybersecurity?",
        "What is bug bounty hunting?",
        "How do ethical hackers work?",
        "Best cybersecurity certifications?",
        "How important is networking knowledge?"
    ],

    "design": [
        "How do I improve UI/UX skills?",
        "Figma or Adobe XD?",
        "What makes a good portfolio?",
        "How do designers conduct user research?",
        "How important is color theory?"
    ],

    "general": [
        "What productivity habits changed your life?",
        "How do you stay motivated?",
        "Best books for self growth?",
        "How do you manage time effectively?",
        "What advice would you give your younger self?"
    ]
}

default_answers = [
    (
        "Elarion AI",
        "Interesting question. Focus on consistent learning and real-world projects."
    ),
    (
        "Alex",
        "I learned this mostly through building things rather than only watching tutorials."
    ),
    (
        "Sarah",
        "Practical experience made the biggest difference for me."
    )
]

for category, questions in seed_data.items():

    for question in questions:

        beacon = BeaconDB(
            question=question,
            author="Explorer",
            category=category
        )

        db.add(beacon)
        db.commit()
        db.refresh(beacon)

        for author, text in default_answers:

            db.add(
                AnswerDB(
                    beacon_id=beacon.id,
                    author=author,
                    text=text
                )
            )

        db.commit()

print("🚀 Elarion Galaxy Seeded Successfully")
print("✅ 40 Category Worlds Created")
print("✅ AI, Career, Research, Startup")
print("✅ Coding, Cybersecurity, Design, General")