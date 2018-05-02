import json
import os
from PIL import Image

images = []

rotate = []
for i in range(len(rotate)):
    rotate[i] = "img" + str(rotate[i]) + ".jpg"
print(rotate)

filenames = os.listdir(os.getcwd())
count = 0
for filename in filenames:
    if ".jpg" in filename:
        img = Image.open(filename) 
        width, height = img.size
        if filename in rotate:  #need better solution for detecting if image is in different orientation
            tmp = width
            width = height
            height = tmp            
        images.append({"file": filename, "ratio": str(round(height / width, 1))})

data = {"images" : images }

with open('imgdata.json', 'w') as outfile:
    json.dump(data, outfile)