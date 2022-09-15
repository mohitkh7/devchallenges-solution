import os
from flask import Flask, request, render_template, send_from_directory
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = "temp/"

app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

@app.get("/image/<string:image_id>")
def get_image(image_id: str):
	print(image_id)
	resp = send_from_directory(app.config["UPLOAD_FOLDER"], image_id)
	print(resp)
	return resp

@app.post("/image")
def post_image(): 
	image = request.files["image"]
	filename = secure_filename(image.filename)
	image.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))
	return render_template("success.html")

@app.get("/")
def home():
	return render_template("index.html")