from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/api/showpath", methods=['POST'])
def getOptimalPath():
    destinationListJSON = request.get_json()
    destinationList = destinationListJSON.get('destination')
    # Sort destinationList in an optimal order
    return jsonify({'optimalList': destinationList}), 200

if __name__ == '__main__':
    app.run(debug=True)