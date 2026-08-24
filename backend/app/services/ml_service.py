from pathlib import Path

import joblib
import pandas as pd


PROJECT_ROOT = (
    Path(__file__)
    .resolve()
    .parents[3]
)


MODEL_PATH = (
    PROJECT_ROOT
    / "ml"
    / "models"
    / "drowsiness_model.joblib"
)


class MLService:

    def __init__(self):

        if not MODEL_PATH.exists():

            raise FileNotFoundError(
                f"ML model not found: "
                f"{MODEL_PATH}"
            )

        bundle = joblib.load(
            MODEL_PATH
        )

        self.model = bundle["model"]

        self.features = bundle["features"]

        print("ML model loaded.")

    def predict(
        self,
        feature_values
    ):

        X = pd.DataFrame(
            [
                {
                    name: feature_values[name]
                    for name in self.features
                }
            ],
            columns=self.features
        )

        prediction = self.model.predict(
            X
        )[0]

        probabilities = (
            self.model.predict_proba(X)[0]
        )

        probability_map = {

            str(label):
                float(probability)

            for label, probability
            in zip(
                self.model.classes_,
                probabilities
            )
        }

        confidence = max(
            probability_map.values()
        )

        drowsy_score = (
            probability_map.get(
                "drowsy",
                0.0
            )
        )

        return {

            "state":
                str(prediction),

            "confidence":
                float(confidence),

            "drowsy_score":
                float(drowsy_score),

            "probabilities":
                probability_map
        }