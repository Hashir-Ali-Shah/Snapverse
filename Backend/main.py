# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from storygenerator import StoryGenerator  

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # or ["*"] for all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QuestionRequest(BaseModel):
    question: str

class AnswerResponse(BaseModel):
    answer: str

generator = StoryGenerator()
@app.post("/generate", response_model=AnswerResponse)
def generate_story(request: QuestionRequest):

    answer = generator.generate(request.question)
    return {"answer": answer}


