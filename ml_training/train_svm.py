import pandas as pd
import numpy as np
import os
import json
import joblib

from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.metrics import (
    accuracy_score,
    classification_report
)

BASE_DIR = os.path.dirname(__file__)

csv_path = os.path.join(
    BASE_DIR,
    "phishing.csv"
)

df = pd.read_csv(csv_path)
df = df.drop("Index", axis=1)

X = df.drop("class", axis=1)
y = df["class"]

X_train, X_test, y_train, y_test = train_test_split(
    X,y,
    test_size=0.2,
    random_state=42
)

svm_model = SVC(
    kernel="linear",
    probability=True,
    random_state=42
)

svm_model.fit(
    X_train,
    y_train
)

y_pred = svm_model.predict(X_test)

accuracy = accuracy_score(
    y_test,
    y_pred
)

print("\nSVM Accuracy:\n")
print(accuracy)
print(
    classification_report(
        y_test,
        y_pred
    )
)

model_path = os.path.join(
    BASE_DIR,
    "models",
    "svm_model.pkl"
)

joblib.dump(
    svm_model,
    model_path
)

print("\nSVM Model Saved!")

coefficients = svm_model.coef_[0]
feature_weights = {}

for feature, value in zip(
    X.columns,
    coefficients
):

    feature_weights[feature] = float(
        abs(value)
    )

max_value = max(
    feature_weights.values()
)

for key in feature_weights: feature_weights[key] /= max_value

weights_path = os.path.join(
    BASE_DIR,
    "exported",
    "svm_weights.json"
)

with open(
    weights_path,
    "w"
) as f:

    json.dump(
        feature_weights,
        f,
        indent=4
    )

print("\nSVM Weights Exported!")