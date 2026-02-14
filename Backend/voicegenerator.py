import torchaudio as ta
from chatterbox.tts import ChatterboxTTS

class ChatterboxVoiceCloner:
    def __init__(self, device: str = "cpu"):
        self.tts = ChatterboxTTS.from_pretrained(device=device)

    def clone_and_generate(
        self,
        text: str,
        audio_prompt_path: str,
        output_path: str,
    ) -> None:
        wav = self.tts.generate(text, audio_prompt_path=audio_prompt_path)
        ta.save(output_path, wav, self.tts.sr)

voice=ChatterboxVoiceCloner()
voice.clone_and_generate("hello how are you doing my friend ","./PM Modi hails Operation Sindoor_ A proud moment for every Indian.wav", "output.wav")
