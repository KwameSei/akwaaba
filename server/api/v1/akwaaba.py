#from models import storage
from os import getenv
from flask_cors import CORS
# from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from models.engine.database import Session
from flask import Flask, make_response, jsonify
from api.v1.routes import views
import os
from dotenv import load_dotenv

load_dotenv()
db = Session()

app = Flask(__name__)
# SECRET_KEY = os.environ.get('SECRET_KEY')
cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
# needed for session cookies
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
app.config['JWT_SECRET_KEY'] = os.environ.get('SECRET_KEY')
# hashes the password and then stores in the databse
app.config['SECURITY_PASSWORD_SALT'] = "MY_SECRET"
# allows new registrations to application
app.config['SECURITY_REGISTERABLE'] = True
# to send automatic registration email to user
app.config['SECURITY_SEND_REGISTER_EMAIL'] = False

app.register_blueprint(views)
jwt = JWTManager(app)

# migrate=Migrate(app, db)

@app.errorhandler(404)
def not_found(error):
    """ Throwing 404 error """
    return make_response(jsonify({'error': "Not Found"}))



if __name__ == "__main__":
    """ Main function"""
    host = getenv('API_HOST')
    port = getenv('API_PORT')
    if not host:
        host = '0.0.0.0'
    if not port:
        port = '5000'
    app.run(host=host, port=port, debug=True, threaded=True)