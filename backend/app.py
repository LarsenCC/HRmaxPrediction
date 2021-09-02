from flask import Flask, jsonify
from flask_restful import reqparse, abort, Api, Resource
import pickle
import numpy as np
from sklearn.ensemble import RandomForestRegressor

from flask_cors import CORS

app = Flask(__name__)
# app.config['CORS_HEADERS'] = 'Content-Type'
api = Api(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# model = NLPModel()

# clf_path = 'lib/models/SentimentClassifier.pkl'
# with open(clf_path, 'rb') as f:
    # model.clf = pickle.load(f)

# load the model from disk
filename = './models/finalized_rf_model.sav'
loaded_model = pickle.load(open(filename, 'rb'))


# argument parsing
# parser = reqparse.RequestParser()
# parser.add_argument('query')


class HRmaxPrediction(Resource):
  
  # class parser
  parser = reqparse.RequestParser()
  parser.add_argument('age',
                      type=int,
                      required=True,
                      help="This field cannot be left blank!")
  parser.add_argument('height',
                      type=int,
                      required=True,
                      help="This field cannot be left blank!")
  parser.add_argument('weight',
                      type=int,
                      required=True,
                      help="This field cannot be left blank!")
  parser.add_argument('hrrest',
                      type=int,
                      required=True,
                      help="This field cannot be left blank!")
  parser.add_argument('dbp',
                      type=int,
                      required=True,
                      help="This field cannot be left blank!")
  parser.add_argument('sbp',
                      type=int,
                      required=True,
                      help="This field cannot be left blank!")

  def post(self):
    # use parser for data
    data = HRmaxPrediction.parser.parse_args()  
    print(data)

    params = [data['age'], data['hrrest'], data['height'], data['sbp'], data['dbp'], data['weight']]
    params = np.array(params)
    print(params)

    # ['ageattest', 'resting_hr', 'height inch->cm', 
    # 'resting_sbp', 'resting_dbp', 'weight Ib->kg']

    # Example
    # ageattest          0.514706
    # resting_hr         0.457500
    # height inch->cm    0.254439
    # resting_sbp        0.379182
    # resting_dbp        0.484250
    # weight Ib->kg      0.291403

    maxs = np.array([88, 120, 208.28, 190, 120, 179.61])
    mins = np.array([20, 32, 143.51, 80, 40, 50.03])

    sub = maxs - mins
    params = (params - mins) / sub
    print(params) 

    prediction = loaded_model.predict([params])[0]

    # create JSON object
    output = {'prediction': prediction} # round(prediction)
    
    return output, 201


# Setup the Api resource routing here
# Route the URL to the resource
api.add_resource(HRmaxPrediction, '/')
cors = CORS(app, resources={r"/*": {"origins": "*"}})

if __name__ == '__main__':
  app.run(port=5000, debug=True)