import os
import random, string

from flask import Flask, request, render_template, send_from_directory, redirect, url_for
from werkzeug.utils import secure_filename
from werkzeug.exceptions import RequestEntityTooLarge 

UPLOAD_FOLDER = "temp/"
ALLOWED_EXTENSION = ('jpg', 'jpeg', 'png')
MAX_FILE_SIZE = 1024 * 1024  # 1 MB

app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = MAX_FILE_SIZE

@app.get("/image/<string:filename>")
def get_image(filename: str):
	"""
	endpoint to render uploaded image
	:param filename: name of the uploaded image 
	"""
	return send_from_directory(app.config["UPLOAD_FOLDER"], filename)

@app.post("/upload")
def upload_image():
	"""
	endpoint to upload image.
	"""
	try:
		if "image" not in request.files:
			return render_template("fail.html", error_msg="Something went wrong!")
		image = request.files["image"]
		if not image or image.filename == '':
			return render_template("fail.html",
				error_msg="No File Selected")
		if not is_file_allowed(image.filename):
			return render_template("fail.html",
				error_msg="Invalid file format found. Upload only " + ', '.join(ext for ext in ALLOWED_EXTENSION))
		filename = secure_filename(image.filename)
		image.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))
		return render_template("success.html", filename=filename)
	except RequestEntityTooLarge as exc:
		return render_template("fail.html", error_msg="File size too large. Max file size allowed is 1 MB")
	except Exception as exc:
		return render_template("fail.html", error_msg="Something went wrong")

@app.get("/")
def home():
	"""
	endpoint to render home screen
	"""
	return render_template("index.html")

def is_file_allowed(filename) -> bool:
	"""
	checks whether given file is allowed to be uploaded or not
	"""
	return '.' in filename and \
			filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSION

def generate_id(length=6) -> str:
	"""
	generates a random alphanumeric string
	"""
	return ''.join(random.choices(string.ascii_letters + string.digits, k=length))
