import random, string
from constants import ALLOWED_EXTENSION

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
