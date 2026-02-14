# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from storygenerator import StoryGenerator  
from voicegenerator import ChatterboxVoiceCloner
from videogenerator import VideoProcessor
from captionGenerator import CaptionGenerator
import torchaudio
from fastapi.responses import JSONResponse

import os
import traceback
from typing import List, Dict, Tuple

app = FastAPI()

def get_wav_duration(path: str) -> float:
    if not os.path.exists(path):
        raise FileNotFoundError(f"Audio file not found: {path}")
    waveform, sample_rate = torchaudio.load(path)
    num_samples = waveform.size(1)
    return num_samples / sample_rate

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
voice_cloner = ChatterboxVoiceCloner()
caption_generator = CaptionGenerator()


@app.post("/generate", response_model=AnswerResponse)
def generate_story(request: QuestionRequest):
    try:
        answer = generator.generate(request.question)
        return {"answer": answer}
    except Exception as e:
        traceback.print_exc()
        return JSONResponse(
            {"error": str(e), "traceback": traceback.format_exc()},
            status_code=500
        )


class Message(BaseModel):
    id: int
    speaker: str
    text: str

class VoiceImageRequest(BaseModel):
    voiceA: str
    voiceB: str
    conversation: List[Message]
    imageA: str
    imageB: str
    video:str


@app.post("/process-conversation")
def process_conversation(data: VoiceImageRequest):
    import uuid

    voice_a_path = data.voiceA.lstrip('/')
    voice_b_path = data.voiceB.lstrip('/')
    image_a_path = data.imageA.lstrip('/')
    image_b_path = data.imageB.lstrip('/')
    videopath = data.video.lstrip('/')
    conversation = data.conversation

    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    PUBLIC_DIR = os.path.abspath(os.path.join(BASE_DIR, "../Frontend/public"))

    # Concatenate all text values
    full_text = " ".join([msg.text for msg in conversation])
    
    # Generate a unique ID
    conversation_id = str(uuid.uuid4())
    
    # Generate caption
    caption = caption_generator.generate_caption(full_text, conversation_id)
    
    # Set output path for the final video
    output_dir = os.path.join(PUBLIC_DIR, "clips")
    os.makedirs(output_dir, exist_ok=True)
    output_video_path = os.path.join(output_dir, f"{caption}.mp4")

    subtitles: List[Tuple[str, float, float, str]] = []  # (text, start_sec, duration_sec, voice_path)
    current_start = 0.0

    for msg in conversation:
        voice_output_filename = f"voice_{msg.id}.wav"
        voice_output_path = os.path.join(output_dir, voice_output_filename)

        audio_prompt_path = os.path.join(PUBLIC_DIR, voice_a_path) if msg.speaker == "A" else os.path.join(PUBLIC_DIR, voice_b_path)

        voice_cloner.clone_and_generate(msg.text, audio_prompt_path, voice_output_path)
        duration = get_wav_duration(voice_output_path)

        subtitles.append((msg.text, current_start, duration, voice_output_path))
        current_start += duration

    videoPath = os.path.join(PUBLIC_DIR, videopath)
    logo_left_path = os.path.join(PUBLIC_DIR, image_a_path)
    logo_right_path = os.path.join(PUBLIC_DIR, image_b_path)

    videoProcessor = VideoProcessor(
        video_path=videoPath,
        logo_left_path=logo_left_path,
        logo_right_path=logo_right_path,
        subtitles=subtitles
    )
    
    videoProcessor.process(output_path=output_video_path, audio_duration=current_start)

    # Return the relative path for front-end access
    relative_output_path = os.path.join("/clips", f"{caption}.mp4")
    return {"message": "Conversation processed successfully", "video_path": relative_output_path}
