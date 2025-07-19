from yt_dlp import YoutubeDL

class YoutubeDownloader:
    def __init__(self):
        pass

    def download_video(self,url: str, output_path: str = "downloads/%(title)s.%(ext)s"):
        path = {
            'outtmpl': output_path,  
        }
        with YoutubeDL(path) as loader:
            loader.download([url])

testing= YoutubeDownloader()
testing.download_video("https://youtu.be/668nUCeBHyY?si=hVY9SBc2Ps0rvDY0", "downloads/%(title)s.%(ext)s")
        
