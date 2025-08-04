from chatterbox_tts import TTS

# Load pre-trained model
tts = TTS.from_pretrained("chatterbox")

# Run zero-shot voice cloning
audio = tts.clone_and_speak(
    ref_audio="my_voice.wav",
    text="Hey, this is a cloned voice speaking from the ChatterBox model!",
    emotion="excited",  # other options: "neutral", "sad", "angry", "happy"
)

# Save output to a WAV file
with open("output.wav", "wb") as f:
    f.write(audio)
