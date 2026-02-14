from yt_dlp import YoutubeDL
import os
import math
import subprocess


class YoutubeDownloader:
    def __init__(self):
        pass
 


    def download_and_subclip(
            self,
            url: str,
            resolution: str = '720',
            filename: str = "",
            output_path: str = "downloads",
            subclipping: bool = False
        ):
        fmt = f'bestvideo[height<={resolution}]'  # video only

        os.makedirs(output_path, exist_ok=True)
        outtmpl = f"{output_path}/{filename}.%(ext)s" if filename else f"{output_path}/%(title)s.%(ext)s"

        options = {
            'format': fmt,
            'outtmpl': outtmpl,
            'quiet': True,
            'no_warnings': True,
            'http_headers': {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 '
                            '(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
            },
        }

        with YoutubeDL(options) as ydl:
            info = ydl.extract_info(url, download=True)
            downloaded_file = ydl.prepare_filename(info)
            if not downloaded_file.lower().endswith('.mp4'):
                base, _ = os.path.splitext(downloaded_file)
                downloaded_file = base + '.mp4'

        if not subclipping:
            return downloaded_file

        # Get video duration (in seconds) using ffprobe
        cmd = [
            'ffprobe', '-v', 'error',
            '-show_entries', 'format=duration',
            '-of', 'default=noprint_wrappers=1:nokey=1',
            downloaded_file
        ]
        result = subprocess.run(cmd, capture_output=True, text=True)
        duration = float(result.stdout.strip())

        clip_length = 60  # 1 minute clips
        num_clips = math.ceil(duration / clip_length)

        clips_paths = []

        for i in range(num_clips):
            start = i * clip_length
            clip_path = os.path.join(output_path, f"{filename}{i+1}.mp4")
            ffmpeg_cmd = [
                'ffmpeg', '-y',
                '-i', downloaded_file,
                '-ss', str(start),
                '-t', str(clip_length),
                '-c:v', 'libx264',
                '-preset', 'fast',
                '-c:a', 'aac',
                '-b:a', '128k',
                clip_path
            ]
            subprocess.run(ffmpeg_cmd, check=True)
            clips_paths.append(clip_path)

        return clips_paths





    def download_audio(self, url: str,filename:str="", output_path: str = "downloads"):
        options = {
            'format': 'bestaudio/best',
            'outtmpl': f"{output_path}/{filename}.%(ext)s" if filename else f"{output_path}/%(title)s.%(ext)s",
            'postprocessors': [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'mp3',
                'preferredquality': '192',
            }],
        }
        with YoutubeDL(options) as loader:
            loader.download([url])

    def get_video_info(self, url: str) -> dict:
        with YoutubeDL({'quiet': True}) as loader:
            info = loader.extract_info(url, download=False)

        return {
            "id": info.get("id"),
            "title": info.get("title"),
            "duration_seconds": info.get("duration"),
            "webpage_url": info.get("webpage_url"),
            "resolution": (
                f"{info.get('width')}x{info.get('height')}"
                if info.get("width") and info.get("height")
                else "Unknown"
            ),
        }
    


    def download_playlist(self, playlist_url: str,filename:str="",output_path: str = "downloads"):

        options = {
           'outtmpl': f"{output_path}/{filename}.%(ext)s" if filename else f"{output_path}/%(title)s.%(ext)s",
            'noplaylist': False,  
            'merge_output_format': 'mp4',
        }
        with YoutubeDL(options) as loader:
            
            loader.download([playlist_url])


path=r"D:\ML\Flagship\Code\Frontend\public\videos"

downlaod=YoutubeDownloader()
downlaod.download_and_subclip("https://youtube.com/shorts/lGw3aydyBvw?si=IS-ATlfrYHgH5H2p", resolution="360", filename="subway_surf", output_path=path,subclipping=True)
        
