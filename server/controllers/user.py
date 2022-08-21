import re
import hashlib
import mysql.connector

from flask_cors import CORS
from datetime import timedelta
from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager, jwt_required, create_access_token

user = Flask(__name__)
CORS(user)  # allow cross-origin resource sharing

# You must initialize a JWTManager with this flask application before using this method
user.config['JWT_SECRET_KEY'] = 'jwt-secret-string'
jwt = JWTManager(user)

conn = mysql.connector.connect(host='localhost', user='root', password='', database='project_saer_1')
cursor = conn.cursor()


def test():
    return jsonify({'status': 'success', 'message': 'Hello World'})


# Authentication
def auth():
    if request.is_json:
        username = request.json['username']
        password = request.json['password']

        # check if the role is 5 (user) or 4 (professor)
        cursor.execute("SELECT role FROM user WHERE username = %s", (username,))
        role = cursor.fetchone()
        if role is None:
            return jsonify({'status': 'error', 'message': 'Invalid username or password'})
        else:
            if role[0] == 5:
                # check if the username and password is correct and return the token if the login is successful or
                # return error message if the login is unsuccessful using JWT and save to the browser as a cookie
                cursor.execute("SELECT id_number, password FROM user WHERE username = %s", (username,))
                admin = cursor.fetchone()
                if admin is None:
                    return jsonify({'status': 'error', 'message': 'Invalid username or password'})
                else:
                    if admin[1] == password:
                        return jsonify({'status': 'success', 'message': 'Login successful',
                                        'token': create_access_token(identity={
                                            'username': username, 'role': role[0], 'id_number': admin[0]
                                        }, expires_delta=timedelta(days=14))})
                    else:
                        return jsonify({'status': 'error', 'message': 'Invalid username or password'})
            elif role[0] == 4:
                # check if the username and password is correct and return the token if the login is successful or
                # return error message if the login is unsuccessful using JWT and save to the browser as a cookie
                cursor.execute("SELECT id_number, password FROM user WHERE username = %s", (username,))
                moderator = cursor.fetchone()
                if moderator is None:
                    return jsonify({'status': 'error', 'message': 'Invalid username or password'})
                else:
                    if moderator[1] == password:
                        return jsonify({'status': 'success', 'message': 'Login successful',
                                        'token': create_access_token(identity={
                                            'username': username, 'role': role[0], 'id_number': moderator[0]
                                        }, expires_delta=timedelta(days=14))})
                    else:
                        return jsonify({'status': 'error', 'message': 'Invalid username or password'})
            elif role[0] == 3:
                # check if the username and password is correct and return the token if the login is successful or
                # return error message if the login is unsuccessful using JWT and save to the browser as a cookie
                cursor.execute("SELECT id_number, password FROM user WHERE username = %s", (username,))
                professor = cursor.fetchone()
                if professor is None:
                    return jsonify({'status': 'error', 'message': 'Invalid username or password'})
                else:
                    if professor[1] == password:
                        return jsonify({'status': 'success', 'message': 'Login successful',
                                        'token': create_access_token(identity={
                                            'username': username, 'role': role[0], 'id_number': professor[0]
                                        }, expires_delta=timedelta(days=14))})
                    else:
                        return jsonify({'status': 'error', 'message': 'Invalid username or password'})
            else:
                return jsonify({'status': 'error', 'message': 'Unauthorized access'})
    else:
        return jsonify({'status': 'something went wrong'})


# Register a new user (professor, moderator)
@jwt_required()
def register():
    if request.is_json:
        email = request.json['email']
        name = request.json['name']
        username = request.json['username']
        password = request.json['password']
        role = request.json['role']

        # check if one of them exists
        cursor.execute("SELECT * FROM user WHERE username = %s OR email = %s", (username, email))
        is_exist = cursor.fetchall()
        if is_exist:
            return jsonify({'status': 'error', 'message': 'Username or email already exists'})
        else:
            # if email, name, username, password, role is empty, return error message
            if email == '' or name == '' or username == '' or password == '' or role == '':
                return jsonify({'status': 'error', 'message': 'Please fill in all the fields'})
            # validate the email using the regex
            if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
                return jsonify({"error": "Invalid email"}), 400

            # Check if the name is invalid using the regex
            if not re.match(r"[a-zA-Z]+", name):
                return jsonify({"error": "Invalid name"}), 400

            # Check the length of the username if it is less than 5 characters or more than 20 characters
            if len(username) < 5 or len(username) > 20:
                return jsonify({"error": "Username must be between 5 and 20 characters"}), 400

            # Check the length of the password if it is less than 5 characters or more than 20 characters
            if len(password) < 8 or len(password) > 20:
                return jsonify({"error": "Password must be between 8 and 20 characters"}), 400
            # Check if the password is weak using the regex
            if not re.match(r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{8,20}$", password):
                return jsonify({"error": "Password must be alphanumeric"}), 400
            # register the user
            else:
                cursor.execute("INSERT INTO user (email, name, username, password, role) VALUES (%s, %s, %s, %s, %s)",
                               (email, name, username, password, role))
                conn.commit()
                return jsonify({'status': 'success', 'message': 'User registered successfully', 'user': {
                    'email': email, 'name': name, 'username': username, 'role': role
                }})
    else:
        return jsonify({'status': 'something went wrong'})


# Get User Profile
@jwt_required()
def user_profile(id_number):
    cursor.execute("SELECT * FROM user WHERE id_number = %s", (id_number,))
    user_ = cursor.fetchall()
    user_info = []
    if user_:
        for _user in user_:
            user_info.append({
                'id_number': _user[0],
                'email': _user[1],
                'name': _user[2],
                'username': _user[3],
                'password': _user[4],
                'role': _user[5]
            })
        return jsonify({'status': 'success', 'message': 'User profile retrieved successfully', 'user': user_info})
    else:
        return jsonify({'status': 'error', 'message': 'User profile not found'})


# Update User Profile
@jwt_required()
def update_user_profile(id_number):
    if request.is_json:
        name = request.json['name']
        email = request.json['email']
        username = request.json['username']
        password = request.json['password']
        cursor.execute("SELECT * FROM user WHERE id_number = %s", (id_number,))
        data = cursor.fetchall()
        if data:
            # check if its already updated
            cursor.execute(
                "SELECT * FROM user WHERE username = %s AND name = %s AND email = %s AND "
                "password = %s",
                (username, name, email, password))
            data = cursor.fetchall()
            if data:
                return jsonify({"error": "No changes were made!"}), 400
            else:
                # if email, name, username, password, role is empty, return error message
                if email == '' or name == '' or username == '' or password == '':
                    return jsonify({'status': 'error', 'message': 'Please fill in all the fields'})
                # validate the email using the regex
                if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
                    return jsonify({"error": "Invalid email"}), 400

                # Check if the name is invalid using the regex
                if not re.match(r"[a-zA-Z]+", name):
                    return jsonify({"error": "Invalid name"}), 400

                # Check the length of the username if it is less than 5 characters or more than 20 characters
                if len(username) < 5 or len(username) > 20:
                    return jsonify({"error": "Username must be between 5 and 20 characters"}), 400

                # Check the length of the password if it is less than 5 characters or more than 20 characters
                if len(password) < 8 or len(password) > 20:
                    return jsonify({"error": "Password must be between 8 and 20 characters"}), 400
                # Check if the password is weak using the regex
                if not re.match(r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{8,20}$", password):
                    return jsonify({"error": "Password must be alphanumeric"}), 400
                # Update the profile of the admin
                else:
                    cursor.execute(
                        "UPDATE user SET name = %s, email = %s, username = %s, password = %s "
                        "WHERE id_number = %s", (name, email, username, password, id_number))
                    conn.commit()

                    # check if the user exists in the professor table
                    cursor.execute("SELECT * FROM professor_status WHERE id_professor = %s", (id_number,))
                    professor = cursor.fetchall()
                    if professor:
                        hidden_name = hashlib.sha1(name.encode('utf-8')).hexdigest()
                        cursor.execute("UPDATE professor_status SET hidden_name = %s WHERE id_professor = %s",
                                       (hidden_name, id_number))
                        conn.commit()
                        return jsonify({'status': 'success',
                                        'message': 'User profile and Hidden name updated successfully'})
                    else:
                        return jsonify({'status': 'success',
                                        'message': 'User profile and Hidden name updated successfully'})
    else:
        return jsonify({"error": "Bad request"}), 400


# Delete User Profile moderator and professor
@jwt_required()
def delete_user_profile(id_number):
    # Check if the user is a moderator or professor before deleting the profile
    cursor.execute("SELECT * FROM user WHERE id_number = %s", (id_number,))
    data = cursor.fetchall()
    print(data[0][5])
    if data[0][5] == 4 or data[0][5] == 3:
        cursor.execute("DELETE FROM user WHERE id_number = %s", (id_number,))
        conn.commit()
        # Delete the information of the user from the other tables as well
        cursor.execute("DELETE FROM professor_status WHERE id_professor = %s", (id_number,))
        conn.commit()
        return jsonify({"message": "Successfully deleted"})
    elif data[0][5] == 5:
        return jsonify({"error": "You are not allowed to delete this profile"}), 400
    else:
        return jsonify({"error": "Profile not found"}), 400


# Get all users in the database professor only
@jwt_required()
def get_all_prof_users():
    cursor.execute("SELECT * FROM user WHERE role = %s", (3,))
    data = cursor.fetchall()
    _users = []
    if data:
        for user_ in data:
            _user = {'id_number': user_[0], 'email': user_[1], 'name': user_[2], 'username': user_[3],
                     'password': user_[4], 'role': user_[5]}
            _users.append(_user)
        return jsonify({'status': 'success', 'message': 'All Users found', 'users': _users})
    else:
        return jsonify({'status': 'error', 'message': 'No Professors found'})


# Get all users in the database moderator only
@jwt_required()
def get_all_mod_users():
    cursor.execute("SELECT * FROM user WHERE role = %s", (4,))
    data = cursor.fetchall()
    _users = []
    if data:
        for user_ in data:
            _user = {'id_number': user_[0], 'email': user_[1], 'name': user_[2], 'username': user_[3],
                     'password': user_[4], 'role': user_[5]}
            _users.append(_user)
        return jsonify({'status': 'success', 'message': 'All Users found', 'users': _users})
    else:
        return jsonify({'status': 'error', 'message': 'No Moderators found'})
