from yt_dlp import YoutubeDL

class YoutubeDownloader:
    def __init__(self):
        pass

    def download_video(self, url: str, resolution: str = '360', output_path: str = "downloads/%(title)s.%(ext)s"):
        options = {
            'format': f'bestvideo[height<={resolution}]+bestaudio/best/best',
            'outtmpl': output_path,
            'merge_output_format': 'mp4',
        }

        with YoutubeDL(options) as loader:
            loader.download([url])

    def download_audio(self, url: str, output_path: str = "downloads/%(title)s.%(ext)s"):
        options = {
            'format': 'bestaudio/best',
            'outtmpl': output_path,
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
            return loader.extract_info(url, download=False)
    
    def download_by_resolution(self, url: str, resolution: str = '720', output_path: str = "downloads/%(title)s.%(ext)s"):
        options = {
            'format': f'bestvideo[height<={resolution}]+bestaudio/best',
            'outtmpl': output_path,
            'merge_output_format': 'mp4',
        }
        with YoutubeDL(options) as loader:
            loader.download([url])

    def download_playlist(self, playlist_url: str, output_path: str = "downloads/%(playlist_title)s/%(title)s.%(ext)s"):

        options = {
            'outtmpl': output_path,
            'noplaylist': False,  
            'merge_output_format': 'mp4',
        }

        with YoutubeDL(options) as loader:
            loader.download([playlist_url])

    def download_clip(self, url: str, start_time: str, duration: str, output_path: str = "downloads/clip_%(title)s.%(ext)s"):
        """
        Downloads a video clip starting at `start_time` for `duration` seconds.
        """
        options = {
            'outtmpl': output_path,
            'merge_output_format': 'mp4',
            'postprocessor_args': ['-ss', start_time, '-t', duration],
        }

        with YoutubeDL(options) as loader:
            loader.download([url])





        
