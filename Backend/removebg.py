from rembg import remove
from PIL import Image

input_path = "input.jpg"
output_path = "output.png"

input_img = Image.open(r"C:Users\PMLS\Downloads\trump.jpeg")
output_img = remove(input_img)
output_img.save(r"C:Users\PMLS\Downloads\trump2.jpeg")
