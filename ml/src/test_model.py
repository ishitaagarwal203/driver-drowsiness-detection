import joblib
import pandas as pd


MODEL_FILE = "ml/models/drowsiness_model.joblib"
TEST_FILE = "ml/data/processed/test.csv"


# --------------------------------------------------
# Load model
# --------------------------------------------------

bundle = joblib.load(
    MODEL_FILE
)

model = bundle["model"]

features = bundle["features"]


print("Model loaded successfully.")

print("\nFeatures used:")

print(features)


# --------------------------------------------------
# Load test data
# --------------------------------------------------

df = pd.read_csv(
    TEST_FILE
)


# --------------------------------------------------
# Select one sample
# --------------------------------------------------

sample = df[
    features
].iloc[[0]]


actual_label = df[
    "label"
].iloc[0]


# --------------------------------------------------
# Prediction
# --------------------------------------------------

prediction = model.predict(
    sample
)[0]


probabilities = model.predict_proba(
    sample
)[0]


classes = model.classes_


print("\n======================================")
print("SINGLE SAMPLE TEST")
print("======================================")


print(
    f"Actual label: {actual_label}"
)

print(
    f"Predicted label: {prediction}"
)


print("\nProbabilities:")

for class_name, probability in zip(
    classes,
    probabilities
):

    print(
        f"{class_name}: "
        f"{probability:.4f}"
    )