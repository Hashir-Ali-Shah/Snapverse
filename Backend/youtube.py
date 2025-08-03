from yt_dlp import YoutubeDL

class YoutubeDownloader:
    def __init__(self):
        pass

    def download_by_resolution(self,url: str, resolution: str = '720', filename: str = "", output_path: str = "downloads"):
        options = {
            'format': f'bestvideo[height<={resolution}]+bestaudio[ext=m4a]/best',
            'outtmpl': f"{output_path}/{filename}.%(ext)s" if filename else f"{output_path}/%(title)s.%(ext)s",
            'merge_output_format': 'mp4',
        }

        with YoutubeDL(options) as loader:
            loader.download([url])

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


path=r"D:\ML\Flagship\Code\Frontend\public"

downlaod=YoutubeDownloader()
downlaod.download_by_resolution("https://www.youtube.com/watch?v=9bZkp7q19f0", resolution="720", filename="Gangnam_Style", output_path=path)
        
