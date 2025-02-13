from flask import Flask, request, render_template, jsonify
import pandas as pd
import iat
import sem
import feedback

app = Flask(__name__)

# Mapping operations to processing functions
OPERATIONS = {
    "internal_assessment": iat.process_internal,
    "university_marks": sem.process_university,
    "student_feedback": feedback.process_feedback
}

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files or "operation" not in request.form:
        return jsonify({"error": "Missing file or operation"}), 400

    file = request.files["file"]
    operation = request.form["operation"]

    if operation not in OPERATIONS:
        return jsonify({"error": "Invalid operation selected"}), 400

    try:
        
        OPERATIONS[operation](file)

        return jsonify({"message": f"{operation} processed successfully!"})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
