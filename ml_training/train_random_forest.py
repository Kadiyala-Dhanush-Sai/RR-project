import pandas as pd
import numpy as np

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix
)

import matplotlib.pyplot as plt
import seaborn as sns
import json
import joblib
import os

BASE_DIR = os.path.dirname(__file__)

csv_path = os.path.join(
    BASE_DIR,
    "phishing.csv"
)

df = pd.read_csv(csv_path)

print(df.head())

print(df.shape)

print(df.columns)


if "Index" in df.columns: df = df.drop("Index", axis=1)

X = df.drop("class", axis=1)

y = df["class"]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

rf_model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

rf_model.fit(X_train, y_train)

y_pred = rf_model.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)

print("Accuracy:", accuracy)

print(classification_report(y_test, y_pred))

joblib.dump(
    rf_model,
    "models/random_forest.pkl"
)

print("Model Saved!")

importance = rf_model.feature_importances_

feature_weights = {}

for feature, value in zip(X.columns, importance):

    feature_weights[feature] = float(value)

with open("exported/rf_weights.json", "w") as f:

    json.dump(feature_weights, f, indent=4)

print("Weights Exported!")