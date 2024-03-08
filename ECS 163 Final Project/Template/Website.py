import sys
print(sys.executable)

from flask import Flask, request, render_template
import numpy as np
import joblib  
flask_app = Flask(__name__)
model = joblib.load('xgb_classifier.joblib') 

@flask_app.route("/")
def Home():
    return render_template("home.html", form_data={})

@flask_app.route("/predict", methods=["POST"])
def predict():
    form_data = request.form.to_dict() 
    features = []
    for feature in ['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal']:
        value = form_data.get(feature, 0)
        features.append(float(value) if value else 0.0)

    features = np.array(features).reshape(1, -1) 

    prediction_proba = model.predict(features)

    prediction_text = "Positive" if prediction_proba[0] > 0.7 else "Negative" 
    predictionProb = "{:.2f}".format(prediction_proba[0])

    return render_template("home.html", prediction=prediction_text, prediction_prob=predictionProb, prediction_value=prediction_proba[0], form_data=form_data)

if __name__ == "__main__":
    flask_app.run(host='0.0.0.0', port=5000, debug=True)
