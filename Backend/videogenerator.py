from moviepy import VideoFileClip, ImageClip, CompositeVideoClip, TextClip, AudioFileClip, CompositeAudioClip,concatenate_videoclips
import os
from PIL import Image
import numpy as np


class VideoProcessor:
    def __init__(self, video_path: str, logo_left_path: str, logo_right_path: str,
                 subtitles: list[tuple[str, float, float, str]]):
        self.video_path = video_path
        self.logo_left_path = logo_left_path
        self.logo_right_path = logo_right_path
        self.subtitles = subtitles
        self.font_path = "C:/Windows/Fonts/arial.ttf"

    def create_text_clips(self):
        text_clips = []
        for text, start_time, duration, _ in self.subtitles:
            clip = (
                TextClip(
                    text=text,
                    font=self.font_path,
                    font_size=40,
                    color='white',
                    bg_color=None,
                    size=(810, None),
                    method='caption',

                )
                .with_position(('center', 'top'))
                .with_start(start_time)
                .with_duration(duration)
            )
            text_clips.append(clip)
        return text_clips

    def create_audio_clips(self, total_duration):
        audio_clips = []
        for _, start_time, duration, audio_path in self.subtitles:
            audio = AudioFileClip(audio_path).with_start(start_time).with_volume_scaled(3)
            audio_clips.append(audio)
        return CompositeAudioClip(audio_clips).with_duration(total_duration)
    
    def loop_video(self, duration: float) -> VideoFileClip:
        video = VideoFileClip(self.video_path)
        clips = []
        total = 0
        while total < duration:
            remaining = duration - total
            if remaining < video.duration:
                clips.append(video.subclipped(0, remaining))
                total += remaining
            else:
                clips.append(video)
                total += video.duration
        return concatenate_videoclips(clips)

    def process(self, output_path,audio_duration: float):
        video = VideoFileClip(self.video_path)
        if video.duration < audio_duration:
            video = self.loop_video(duration=audio_duration+1)
        elif video.duration > audio_duration:
            video = video.subclipped(0, audio_duration+1)


        logo_clip_left = (
            ImageClip(self.logo_left_path)
            .with_duration(video.duration)
            .resized(height=300)
            .with_position(( 200, 400))
        )

        img = Image.open(self.logo_right_path)
        flipped_img = np.array(img.transpose(Image.FLIP_LEFT_RIGHT))
        logo_clip_right = (
            ImageClip(flipped_img)
            .with_duration(video.duration)
            .resized(height=300)
        )
        x_right = video.w - logo_clip_right.w - 200
        logo_clip_right = logo_clip_right.with_position((x_right, 400))

        text_clips = self.create_text_clips()
        audio_composite = self.create_audio_clips(video.duration)

        clips = [video, logo_clip_left, logo_clip_right] + text_clips
        final = CompositeVideoClip(clips).with_audio(audio_composite)

        final.write_videofile(output_path, codec="libx264", audio_codec="aac")


    





BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PUBLIC_DIR = os.path.abspath(os.path.join(BASE_DIR, "../Frontend/public"))

video_path = os.path.join(PUBLIC_DIR, "testing.mp4")
logo_left_path = os.path.join(PUBLIC_DIR, "logo.png")
logo_right_path = os.path.join(PUBLIC_DIR, "logo.png")

subtitles = [
    ("This is a subtitle example.This is a subtitle example.This is a subtitle example.This is a subtitle example.This is a subtitle example.", 1, 3, os.path.join(PUBLIC_DIR, "C:/Users/PMLS/Downloads/output.wav")),
      ("This is a subtitle example.", 4, 3, os.path.join(PUBLIC_DIR, "C:/Users/PMLS/Downloads/output.wav"))
   
]

output_path = os.path.join(BASE_DIR, "testing_output.mp4")
input_video_path = os.path.join(PUBLIC_DIR, "testing.mp4")

processor = VideoProcessor(
    video_path=video_path,
    logo_left_path=logo_left_path,
    logo_right_path=logo_right_path,
    subtitles=subtitles
)




