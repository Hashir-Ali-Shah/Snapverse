from yt_dlp import YoutubeDL

class YoutubeDownloader:
    def __init__(self):
        pass

    def download_by_resolution(self, url: str, resolution: str = '720',filename:str="", output_path: str = "downloads"):
        options = {
            'format': f'bestvideo[height<={resolution}]+bestaudio/best',
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
            return loader.extract_info(url, download=False)
    


    def download_playlist(self, playlist_url: str,filename:str="",output_path: str = "downloads"):

        options = {
           'outtmpl': f"{output_path}/{filename}.%(ext)s" if filename else f"{output_path}/%(title)s.%(ext)s",
            'noplaylist': False,  
            'merge_output_format': 'mp4',
        }

        with YoutubeDL(options) as loader:
            loader.download([playlist_url])

    def download_clip(self, url: str, start_time: str, duration: str,filename:str="", output_path: str = "downloads"):
        """
        Downloads a video clip starting at `start_time` for `duration` seconds.
        """
        options = {
            'outtmpl': f"{output_path}/{filename}.%(ext)s" if filename else f"{output_path}/%(title)s.%(ext)s",
            'merge_output_format': 'mp4',
            'postprocessor_args': ['-ss', start_time, '-t', duration],
        }

        with YoutubeDL(options) as loader:
            loader.download([url])


path=r"D:\ML\Flagship\testing"

if __name__ == "__main__":
    downloader = YoutubeDownloader()
    downloader.download_by_resolution("https://youtu.be/QC8iQqtG0hg?si=QYfNVaylojYYg_Z-", resolution='360', filename="test_video", output_path=path)



        
