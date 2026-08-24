import pandas as pd


DATASET_PATH = "ml/data/raw/temporal_drowsiness_dataset.csv"


# --------------------------------------------------
# Load dataset
# --------------------------------------------------

df = pd.read_csv(DATASET_PATH)


print("\n======================================")
print("DATASET INFORMATION")
print("======================================\n")


# --------------------------------------------------
# Number of rows and columns
# --------------------------------------------------

print("Dataset shape:")
print(df.shape)

print()


# --------------------------------------------------
# Columns
# --------------------------------------------------

print("Columns:")
print(df.columns.tolist())

print()


# --------------------------------------------------
# First few rows
# --------------------------------------------------

print("First 5 rows:")
print(df.head())

print()


# --------------------------------------------------
# Class distribution
# --------------------------------------------------

print("Class distribution:")
print(df["label"].value_counts())

print()


print("Class percentage:")
print(
    df["label"]
    .value_counts(normalize=True)
    .mul(100)
    .round(2)
)

print()


# --------------------------------------------------
# Missing values
# --------------------------------------------------

print("Missing values:")
print(df.isnull().sum())

print()


# --------------------------------------------------
# Duplicate rows
# --------------------------------------------------

print("Duplicate rows:")
print(df.duplicated().sum())

print()


# --------------------------------------------------
# Numerical statistics
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

print("Feature statistics:")
print(
    df[feature_columns].describe()
)

print()


# --------------------------------------------------
# Label statistics
# --------------------------------------------------

print("Average feature values by class:")

print(
    df.groupby("label")[feature_columns].mean()
)

print()


print("======================================")
print("ANALYSIS COMPLETE")
print("======================================")