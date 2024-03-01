import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.preprocessing import PowerTransformer
from sklearn.model_selection import train_test_split, GridSearchCV
from xgboost import XGBClassifier
from sklearn.metrics import classification_report, confusion_matrix
from joblib import dump

df = pd.read_csv('heart.csv')
df

pt = PowerTransformer()


oldpeak_column_2d = df['oldpeak'].values.reshape(-1, 1)

# Fit the transformer to the 'oldpeak' column and transform it
oldpeak_transformed = pt.fit_transform(oldpeak_column_2d)

# Convert the transformed column back to a 1D array
oldpeak_transformed = oldpeak_transformed.flatten()

# Replace the original 'oldpeak' column with the transformed values
df['oldpeak'] = oldpeak_transformed
X = df.drop(columns=['target'])
y = df['target']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)
xgb_classifier = XGBClassifier()

# Define parameter grid for GridSearchCV
param_grid = {
    'max_depth': [3, 5, 7],
    'learning_rate': [0.1, 0.01, 0.001],
    'n_estimators': [100, 200, 300]
}

# GridSearchCV for XGBoost Classifier
xgb_grid_search = GridSearchCV(estimator=xgb_classifier, param_grid=param_grid, cv=5)
xgb_grid_search.fit(X_train, y_train)

# Print best parameters for XGBoost Classifier
print("Best parameters for XGBoost Classifier:")
print(xgb_grid_search.best_params_)

# Predict on the test set
y_pred = xgb_grid_search.predict(X_test)

# Generate classification report
print("Classification Report:")
print(classification_report(y_test, y_pred))

# Generate confusion matrix
conf_matrix = confusion_matrix(y_test, y_pred)
print("Confusion Matrix:")
print(conf_matrix)

dump(xgb_grid_search, 'xgb_classifier.joblib')