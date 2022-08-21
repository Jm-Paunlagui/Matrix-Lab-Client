import os
import controllers.user as user
import controllers.professor_status as professor_status

from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

app = Flask(__name__)
CORS(app)

# You must initialize a JWTManager with this flask application before using this method
app.config['JWT_SECRET_KEY'] = 'jwt-secret-string'
jwt = JWTManager(app)

app.add_url_rule('/test', view_func=user.test, methods=['GET'])

# User authentication and profile management
app.add_url_rule('/auth', view_func=user.auth, methods=['POST'])
app.add_url_rule('/register', view_func=user.register, methods=['POST'])
app.add_url_rule('/profile/<id_number>', view_func=user.user_profile, methods=['GET'])
app.add_url_rule('/update-profile/<id_number>', view_func=user.update_user_profile, methods=['PUT'])
app.add_url_rule('/delete-profile/<id_number>', view_func=user.delete_user_profile, methods=['DELETE'])
app.add_url_rule('/get-all-prof-list', view_func=user.get_all_prof_users, methods=['GET'])
app.add_url_rule('/get-all-mod-list', view_func=user.get_all_mod_users, methods=['GET'])

# To evaluate
app.add_url_rule('/create-prof-to-evaluate', view_func=professor_status.create_professor_to_evaluate, methods=['POST'])
app.add_url_rule('/get-all-prof-list-to-evaluate', view_func=professor_status.get_all_professors_to_evaluate,
                 methods=['GET'])
app.add_url_rule('/get_professor_to_evaluate/<id_number>', view_func=professor_status.get_professor_to_evaluate,
                 methods=['GET'])


#  __name__ will be equal to "__main__".
#  That means the if conditional statement is satisfied and the app.run() method will be executed.
if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 8081))
