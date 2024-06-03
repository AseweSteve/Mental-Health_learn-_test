import os
from flask import Flask, jsonify, make_response, request, session
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
import secrets
from models.user import User
from models.dbconfig import db

secret_key = secrets.token_hex(24)

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = secret_key
bcrypt = Bcrypt(app)
app.config["JWT_SECRET_KEY"] = os.environ.get('JWT_SECRET')
jwt = JWTManager(app)
CORS(app)
migrate = Migrate(app, db)
db.init_app(app)

# Register a new user
@app.route('/signup', methods=['POST', 'GET'])
def signup():
    if request.method == 'POST':
        # Get user data from the request
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')

        # Check if the username is already taken
        existing_user = User.query.filter_by(username=username).first()

        if existing_user:
            return jsonify({'message': 'Username already taken'}), 400

        # Hash the password using bcrypt
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        # Create a new user with the provided data
        new_user = User(username=username, password=hashed_password, email=email)

        # Add the new user to the database
        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'User created successfully'}), 201  # 201 Created status code
    elif request.method == 'GET':
        # Handle GET request for signup page (if needed)
        return jsonify({'message': 'Welcome to signup page'}), 200

@app.route('/login', methods=['POST'])
def login():
    # Get user data from the request
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Find the user in the database
    user = User.query.filter_by(username=username).first()

    if user and bcrypt.check_password_hash(user.password, password):
        # Create JWT token
        access_token = create_access_token(identity={'username': user.username, 'email': user.email})
        return jsonify(access_token=access_token), 200  # Successful login, return status code 200
    else:
        return jsonify({'message': 'Login failed'}), 401  # Unauthorized status code

@app.route('/logout', methods=['DELETE'])
def logout():
    # Clear user_id from the session
    session.pop('user_id', None)
    return jsonify({'message': 'Logged out successfully'}), 200

if __name__ == "__main__":
    app.run(port=5555, debug=True)
