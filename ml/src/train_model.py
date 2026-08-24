import os

import joblib
import pandas as pd

from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix
)


# ==================================================
# Paths
# ==================================================

TRAIN_FILE = "ml/data/processed/train.csv"
VALIDATION_FILE = "ml/data/processed/validation.csv"
TEST_FILE = "ml/data/processed/test.csv"

MODEL_DIR = "ml/models"

MODEL_FILE = (
    f"{MODEL_DIR}/drowsiness_model.joblib"
)


# ==================================================
# Features
# ==================================================

FEATURE_COLUMNS = [
    "average_ear",
    "perclos",
    "blink_rate",
    "closure_duration",
    "mar",
    "yawn_duration",
    "pitch",
    "yaw",
    "roll"
]


TARGET_COLUMN = "label"


# ==================================================
# Create model directory
# ==================================================

os.makedirs(
    MODEL_DIR,
    exist_ok=True
)


# ==================================================
# Load datasets
# ==================================================

print("\nLoading datasets...")

train_df = pd.read_csv(
    TRAIN_FILE
)

validation_df = pd.read_csv(
    VALIDATION_FILE
)

test_df = pd.read_csv(
    TEST_FILE
)


print(
    f"Train: {train_df.shape}"
)

print(
    f"Validation: {validation_df.shape}"
)

print(
    f"Test: {test_df.shape}"
)


# ==================================================
# Separate X and y
# ==================================================

X_train = train_df[
    FEATURE_COLUMNS
]

y_train = train_df[
    TARGET_COLUMN
]


X_validation = validation_df[
    FEATURE_COLUMNS
]

y_validation = validation_df[
    TARGET_COLUMN
]


X_test = test_df[
    FEATURE_COLUMNS
]

y_test = test_df[
    TARGET_COLUMN
]


# ==================================================
# Create Random Forest
# ==================================================

print("\nCreating Random Forest...")

model = RandomForestClassifier(

    n_estimators=300,

    max_depth=None,

    min_samples_split=5,

    min_samples_leaf=2,

    max_features="sqrt",

    class_weight="balanced",

    random_state=42,

    n_jobs=-1
)


# ==================================================
# Train
# ==================================================

print("\nTraining model...")

model.fit(
    X_train,
    y_train
)


print("Training complete.")


# ==================================================
# Validation
# ==================================================

print("\n======================================")
print("VALIDATION RESULTS")
print("======================================")

validation_predictions = model.predict(
    X_validation
)


validation_accuracy = accuracy_score(
    y_validation,
    validation_predictions
)


print(
    f"\nValidation Accuracy: "
    f"{validation_accuracy:.4f}"
)


print("\nClassification Report:")

print(
    classification_report(
        y_validation,
        validation_predictions
    )
)


print("\nConfusion Matrix:")

print(
    confusion_matrix(
        y_validation,
        validation_predictions
    )
)


# ==================================================
# Test
# ==================================================

print("\n======================================")
print("TEST RESULTS")
print("======================================")


test_predictions = model.predict(
    X_test
)


test_accuracy = accuracy_score(
    y_test,
    test_predictions
)


print(
    f"\nTest Accuracy: "
    f"{test_accuracy:.4f}"
)


print("\nClassification Report:")

print(
    classification_report(
        y_test,
        test_predictions
    )
)


print("\nConfusion Matrix:")

cm = confusion_matrix(
    y_test,
    test_predictions
)

print(cm)


# ==================================================
# Feature importance
# ==================================================

print("\n======================================")
print("FEATURE IMPORTANCE")
print("======================================")


importance_df = pd.DataFrame({

    "feature":
        FEATURE_COLUMNS,

    "importance":
        model.feature_importances_

})


importance_df = importance_df.sort_values(
    "importance",
    ascending=False
)


print(
    importance_df.to_string(
        index=False
    )
)


# ==================================================
# Save model
# ==================================================

print("\nSaving model...")

joblib.dump(
    {
        "model": model,
        "features": FEATURE_COLUMNS
    },
    MODEL_FILE
)


print(
    f"\nModel saved to:"
)

print(
    MODEL_FILE
)


print("\n======================================")
print("MODEL TRAINING COMPLETE")
print("======================================")