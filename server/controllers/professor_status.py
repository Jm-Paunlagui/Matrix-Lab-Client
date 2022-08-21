import re
import hashlib
import mysql.connector

from flask_cors import CORS
from datetime import timedelta
from datetime import datetime
from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager, jwt_required

professor = Flask(__name__)
CORS(professor)  # allow cross-origin resource sharing

# You must initialize a JWTManager with this flask application before using this method
professor.config['JWT_SECRET_KEY'] = 'jwt-secret-string'
jwt = JWTManager(professor)

conn = mysql.connector.connect(host='localhost', user='root', password='', database='project_saer_1')
cursor = conn.cursor()


# Create a new professor with hidden name and department based on the id_professor
@jwt_required()
def create_professor_to_evaluate():
    if request.is_json:
        id_number = request.json['id_number']

        cursor.execute("SELECT * FROM user WHERE id_number = %s AND role = %s",
                       (id_number, 3))

        user_row = cursor.fetchall()

        hidden_name = hashlib.sha1(user_row[0][2].encode('utf-8')).hexdigest()
        department = request.json['department']

        now = datetime.now()
        date_created = now.strftime("%A %d %B, %Y at %I:%M:%S %p")
        # Check if id_professor already exists
        cursor.execute("SELECT * FROM professor_status WHERE id_professor = %s", (id_number,))
        data = cursor.fetchall()
        if data:
            return jsonify({"message": "Professor already exists"}), 400
        else:
            if id_number is None:
                return jsonify({"message": "Missing id_number"}), 400
            if department is None:
                return jsonify({"message": "Missing department"}), 400
            else:
                cursor.execute("INSERT INTO professor_status (id_professor, hidden_name, department, date_created) "
                               "VALUES (%s, %s, %s, %s)", (id_number, hidden_name, department, date_created))
                conn.commit()
                return jsonify({"message": "Professor created successfully"}), 201
    else:
        return jsonify({"message": "Bad request"}), 400


# Get all professors
@jwt_required()
def get_all_professors_to_evaluate():
    cursor.execute("SELECT * FROM professor_status")
    data = cursor.fetchall()
    _professors = []
    if data:
        for professor_ in data:
            _professors.append({
                "id_number": professor_[0],
                "id_professor": professor_[1],
                "hidden_name": professor_[2],
                "department": professor_[3],
                "positive_score": professor_[4],
                "negative_score": professor_[5],
                "date_created": professor_[6],
                "date_modified": professor_[7],
                "date_evaluated": professor_[8]
            })
        return jsonify({'status': 'success', 'message': 'All professors found', 'professors': _professors}), 200
    else:
        return jsonify({"message": "No professors found"}), 404


# Get a professor by id_number
@jwt_required()
def get_professor_to_evaluate(id_number):
    cursor.execute("SELECT * FROM professor_status WHERE id_professor = %s", (id_number,))
    data = cursor.fetchall()
    _professor = []
    if data:
        for professor_ in data:
            _professor.append({
                "id_number": professor_[0],
                "id_professor": professor_[1],
                "hidden_name": professor_[2],
                "department": professor_[3],
                "positive_score": professor_[4],
                "negative_score": professor_[5],
                "date_created": professor_[6],
                "date_modified": professor_[7],
                "date_evaluated": professor_[8]
            })
        return jsonify({'status': 'success', 'message': 'Professor found', 'professor': _professor}), 200
    else:
        return jsonify({"message": "Professor not found"}), 404

