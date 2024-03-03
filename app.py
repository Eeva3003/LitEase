from flask import Flask, render_template, request
import os
from werkzeug.utils import secure_filename
import textract

app = Flask(__name__)

# Specify the upload folder
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Allowed file extensions
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'doc', 'docx'}

# Function to check if the file extension is allowed
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def index():
    return render_template('index1.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    # Check if a file was uploaded
    if 'file' not in request.files:
        return 'No file part'
    
    file = request.files['file']

    # Check if the file has a filename
    if file.filename == '':
        return 'No selected file'

    # Check if the file is allowed
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        # Extract text from the uploaded file
        text = textract.process(file_path).decode('utf-8')

        # Delete the uploaded file
        os.remove(file_path)

        return text

    return 'Invalid file format'

if __name__ == '__main__':
    app.run(debug=True)
