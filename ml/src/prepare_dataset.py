import os

import pandas as pd

from sklearn.model_selection import train_test_split


# --------------------------------------------------
# Paths
# --------------------------------------------------

INPUT_FILE = (
    "ml/data/raw/"
    "temporal_drowsiness_dataset.csv"
)

OUTPUT_DIR = "ml/data/processed"


# --------------------------------------------------
# Create output directory
# --------------------------------------------------

os.makedirs(
    OUTPUT_DIR,
    exist_ok=True
)


# --------------------------------------------------
# Load dataset
# --------------------------------------------------

print("\nLoading dataset...")

df = pd.read_csv(INPUT_FILE)


print(
    f"Original dataset: {df.shape}"
)


# --------------------------------------------------
# Required columns
# --------------------------------------------------

required_columns = [
    "session_id",
    "timestamp",
    "average_ear",
    "perclos",
    "blink_rate",
    "closure_duration",
    "mar",
    "yawn_duration",
    "pitch",
    "yaw",
    "roll",
    "label"
]


missing_columns = [
    column
    for column in required_columns
    if column not in df.columns
]


if missing_columns:

    print(
        "\nERROR: Missing columns:"
    )

    print(missing_columns)

    exit()


# --------------------------------------------------
# Remove duplicate rows
# --------------------------------------------------

before = len(df)

df = df.drop_duplicates()

after = len(df)

print(
    f"Removed duplicates: {before - after}"
)


# --------------------------------------------------
# Remove rows with missing values
# --------------------------------------------------

before = len(df)

df = df.dropna(
    subset=required_columns
)

after = len(df)

print(
    f"Removed missing rows: {before - after}"
)


# --------------------------------------------------
# Remove invalid numerical values
# --------------------------------------------------

feature_columns = [
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


for column in feature_columns:

    df = df[
        pd.to_numeric(
            df[column],
            errors="coerce"
        ).notna()
    ]


# --------------------------------------------------
# Display class distribution
# --------------------------------------------------

print("\nClass distribution:")

print(
    df["label"].value_counts()
)


print("\nClass percentages:")

print(
    df["label"]
    .value_counts(normalize=True)
    .mul(100)
    .round(2)
)


# --------------------------------------------------
# Session information
# --------------------------------------------------

print("\nNumber of sessions:")

print(
    df["session_id"].nunique()
)


print("\nSessions per class:")

session_labels = (
    df[
        ["session_id", "label"]
    ]
    .drop_duplicates()
)

print(
    session_labels["label"]
    .value_counts()
)


# --------------------------------------------------
# Get unique sessions
# --------------------------------------------------

sessions = (
    df["session_id"]
    .unique()
)


print(
    f"\nTotal unique sessions: {len(sessions)}"
)


# --------------------------------------------------
# First split:
# Train = 70%
# Temporary = 30%
# --------------------------------------------------

train_sessions, temp_sessions = train_test_split(
    sessions,
    test_size=0.30,
    random_state=42
)


# --------------------------------------------------
# Second split:
# Validation = 15%
# Test = 15%
# --------------------------------------------------

validation_sessions, test_sessions = train_test_split(
    temp_sessions,
    test_size=0.50,
    random_state=42
)


# --------------------------------------------------
# Create datasets
# --------------------------------------------------

train_df = df[
    df["session_id"].isin(
        train_sessions
    )
].copy()


validation_df = df[
    df["session_id"].isin(
        validation_sessions
    )
].copy()


test_df = df[
    df["session_id"].isin(
        test_sessions
    )
].copy()


# --------------------------------------------------
# Print split information
# --------------------------------------------------

print("\n======================================")
print("DATASET SPLIT")
print("======================================")

print(
    f"Train sessions: {len(train_sessions)}"
)

print(
    f"Validation sessions: "
    f"{len(validation_sessions)}"
)

print(
    f"Test sessions: {len(test_sessions)}"
)

print()

print(
    f"Train rows: {len(train_df)}"
)

print(
    f"Validation rows: "
    f"{len(validation_df)}"
)

print(
    f"Test rows: {len(test_df)}"
)


# --------------------------------------------------
# Check for session leakage
# --------------------------------------------------

train_set = set(train_sessions)

validation_set = set(validation_sessions)

test_set = set(test_sessions)


if train_set & validation_set:

    raise ValueError(
        "Session leakage between "
        "train and validation!"
    )


if train_set & test_set:

    raise ValueError(
        "Session leakage between "
        "train and test!"
    )


if validation_set & test_set:

    raise ValueError(
        "Session leakage between "
        "validation and test!"
    )


print(
    "\nNo session leakage detected."
)


# --------------------------------------------------
# Save
# --------------------------------------------------

train_df.to_csv(
    f"{OUTPUT_DIR}/train.csv",
    index=False
)

validation_df.to_csv(
    f"{OUTPUT_DIR}/validation.csv",
    index=False
)

test_df.to_csv(
    f"{OUTPUT_DIR}/test.csv",
    index=False
)


print("\nFiles created:")

print(
    f"{OUTPUT_DIR}/train.csv"
)

print(
    f"{OUTPUT_DIR}/validation.csv"
)

print(
    f"{OUTPUT_DIR}/test.csv"
)


print("\nDataset preparation complete.")