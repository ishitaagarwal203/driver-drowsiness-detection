import pandas as pd
import matplotlib.pyplot as plt


DATASET_PATH = "ml/data/raw/temporal_drowsiness_dataset.csv"


df = pd.read_csv(DATASET_PATH)


features = [
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


for feature in features:

    plt.figure(figsize=(8, 5))

    for label in df["label"].unique():

        subset = df[df["label"] == label]

        plt.hist(
            subset[feature],
            bins=40,
            alpha=0.5,
            label=label
        )

    plt.title(
        f"{feature} Distribution"
    )

    plt.xlabel(feature)

    plt.ylabel("Frequency")

    plt.legend()

    plt.tight_layout()

    plt.show()