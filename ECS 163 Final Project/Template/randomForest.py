import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report, mean_squared_error
from joblib import dump

# Load the dataset
heart = pd.read_csv('heart_dataset.csv')

# Check for missing values
print(heart.isnull().sum())

# Convert categorical features to dummies
heart_processed = pd.get_dummies(heart)

# Define features and target variable
X = heart_processed.drop(['Mortality'], axis=1)  # Assuming 'Mortality' is the column name for the target variable
y = heart_processed['Mortality']

# Split the dataset into training set and test set
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a Random Forest Classifier
clf = RandomForestClassifier(n_estimators=64, random_state=42)
clf.fit(X_train, y_train)

# Make predictions and evaluate the model
y_pred = clf.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
mse = mean_squared_error(y_test, y_pred)
conf_matrix = confusion_matrix(y_test, y_pred)

print(f'Accuracy: {accuracy*100:.2f}%')
print(f'Mean Squared Error: {mse}')
print("Confusion Matrix:\n", conf_matrix)
print(classification_report(y_test, y_pred))

# Hyperparameter tuning using GridSearchCV
param_grid = {'n_estimators': list(range(1, 101))}
grid = GridSearchCV(RandomForestClassifier(random_state=42), param_grid, cv=10, scoring='accuracy')
grid.fit(X_train, y_train)  # Use training data for fitting

# Examine the best model from GridSearchCV
print(grid.best_score_)
print(grid.best_params_)

# Save the grid object (the trained model)
dump(grid, 'best_random_forest_model.joblib')
