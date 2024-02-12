from flask import request
from flask_restful import Resource
import json
from flask_restful import Resource
from flask import jsonify,session,request
from config import app,db,api, jwt, cloudconfig
from models.user import User
# from models.uploadimage import UploadImage
# from models.uploadvideo import UploadVideo
from werkzeug.security import generate_password_hash,check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
# from subscriptions import subscriptions_blueprint
import cloudinary
import cloudinary.uploader
from flask_cors import CORS
import base64
from io import BytesIO
from PIL import Image
from datetime import datetime, timedelta
blacklisted_tokens = set()



class SignUp(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        if not username or not email or not password:
            return {"Error": "Invalid data provided"}, 400

        if User.query.filter_by(username=username).first() or User.query.filter_by(email=email).first():
            return {"Error": "Username or email already exists"}, 401
        else:
            new_user = User(username=username, email=email, password=generate_password_hash(password))
            db.session.add(new_user)
            db.session.commit()
            return {"Message": "Sign-Up Successful!!"}, 201

class Login(Resource):
    def post(self):
        data=request.get_json()
        email=data['email']
        password=data['password']
        
        user=User.query.filter_by(email=email).first()
        if user and check_password_hash(user.password,password):
            token = create_access_token(identity=user.id,expires_delta=timedelta(days = 2))
            blacklisted_tokens.clear()
            return {"Message":"Login Successful!!","token":token},200
        else:
            return {"Error":"Invalid Username or Password!!"},401
        
class Logout(Resource):
    @jwt_required()
    def delete(self):
        current_user = get_jwt_identity()
        blacklisted_tokens.add(current_user)
        return {"Message":"Logout Successful!"}
    
api.add_resource(SignUp, '/sign_up')
api.add_resource(Login,'/login',endpoint='login')
api.add_resource(Logout,'/logout',endpoint='logout')

if __name__ == "__main__":
  app.run(port=5555, debug=True)


