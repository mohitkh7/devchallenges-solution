import os
from flask import Flask, request, render_template, send_from_directory, redirect, url_for
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = "temp/"
ALLOWED_EXTENSION = ('jpg', 'jpeg', 'png')
MAX_FILE_SIZE = 1024 * 1024  # 1 MB

app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = MAX_FILE_SIZE

@app.get("/image/<string:filename>")
def image(filename: str):
	return send_from_directory(app.config["UPLOAD_FOLDER"], filename)

@app.post("/upload")
def upload_image():
	if "image" not in request.files:
		return redirect(request.url)
	image = request.files["image"]
	if not image or image.filename == '':
		return render_template("fail.html",
			msg="No File Selected")
	if not is_file_allowed(image.filename):
		return render_template("fail.html",
			msg="Invalid file format found. Upload only " + ', '.join(ext for ext in ALLOWED_EXTENSION))
	filename = secure_filename(image.filename)
	image.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))
	return render_template("success.html", image_id=filename)

@app.get("/")
def home():
	return render_template("index.html")

def is_file_allowed(filename):
	return '.' in filename and \
			filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSION

def generate_id(length=6):
	import random, string
	return ''.join(random.choices(string.ascii_letters + string.digits, k=length))
