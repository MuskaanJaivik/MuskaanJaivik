import os
filenames = os.listdir(os.getcwd())

count = 0
for filename in filenames:
    if ".jpg" in filename.lower():
        os.rename(filename, "img" + str(count) + ".jpg")
        count = count + 1