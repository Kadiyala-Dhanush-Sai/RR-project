import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
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

if "Index" in df.columns:
    df = df.drop("Index", axis=1)

X = df.drop("class", axis=1)
y = df["class"]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# Scale features (important for Logistic Regression)
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test  = scaler.transform(X_test)

lr_model = LogisticRegression(
    max_iter=1000,
    random_state=42
)
lr_model.fit(X_train, y_train)

y_pred = lr_model.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)
print("Accuracy:", accuracy)
print(classification_report(y_test, y_pred, target_names=["Legitimate", "Phishing"]))
print("\nConfusion Matrix:")
print(confusion_matrix(y_test, y_pred))
os.makedirs("models", exist_ok=True)

joblib.dump(
    lr_model,
    "models/logistic_regression.pkl"
)
print("Model Saved!")

# Export feature coefficients (equivalent of RF feature importances)
coefficients = lr_model.coef_[0]
feature_weights = {}
for feature, value in zip(X.columns, coefficients):
    feature_weights[feature] = float(value)
os.makedirs("exported", exist_ok=True)
with open("exported/lr_weights.json", "w") as f:
    json.dump(feature_weights, f, indent=4)
print("Weights Exported!")