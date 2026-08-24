import csv
import os
import time

import cv2
import mediapipe as mp

from mediapipe.tasks import python
from mediapipe.tasks.python import vision

from feature_extractor import extract_features


# --------------------------------------------------
# Configuration
# --------------------------------------------------

MODEL_PATH = "ml/models/face_landmarker.task"

OUTPUT_FILE = "ml/data/raw/drowsiness_dataset.csv"


# --------------------------------------------------
# Create output directory
# --------------------------------------------------

os.makedirs(
    os.path.dirname(OUTPUT_FILE),
    exist_ok=True
)


# --------------------------------------------------
# MediaPipe
# --------------------------------------------------

base_options = python.BaseOptions(
    model_asset_path=MODEL_PATH
)

options = vision.FaceLandmarkerOptions(
    base_options=base_options,
    running_mode=vision.RunningMode.VIDEO,
    num_faces=1,
    min_face_detection_confidence=0.5,
    min_face_presence_confidence=0.5,
    min_tracking_confidence=0.5
)

face_landmarker = vision.FaceLandmarker.create_from_options(
    options
)


# --------------------------------------------------
# CSV columns
# --------------------------------------------------

fieldnames = [
    "timestamp",
    "left_ear",
    "right_ear",
    "average_ear",
    "mar",
    "pitch",
    "yaw",
    "roll",
    "label"
]


# --------------------------------------------------
# Ask user for label
# --------------------------------------------------

print()
print("======================================")
print(" DRIVER DROWSINESS DATA COLLECTION")
print("======================================")
print()

print("Choose the label you want to record:")
print()
print("1 = Awake")
print("2 = Drowsy")
print("3 = Yawning")
print()

choice = input("Enter choice: ").strip()


label_mapping = {
    "1": "awake",
    "2": "drowsy",
    "3": "yawning"
}


if choice not in label_mapping:

    print("Invalid choice.")
    face_landmarker.close()
    exit()


label = label_mapping[choice]

print()
print(f"Selected label: {label}")
print()
print("Press SPACE to start recording.")
print("Press Q to quit.")
print()


# --------------------------------------------------
# Open webcam
# --------------------------------------------------

cap = cv2.VideoCapture(0)

if not cap.isOpened():

    print("ERROR: Could not open webcam.")

    face_landmarker.close()

    exit()


# --------------------------------------------------
# Open CSV
# --------------------------------------------------

file_exists = os.path.exists(
    OUTPUT_FILE
)

csv_file = open(
    OUTPUT_FILE,
    "a",
    newline=""
)

writer = csv.DictWriter(
    csv_file,
    fieldnames=fieldnames
)

if not file_exists:

    writer.writeheader()


# --------------------------------------------------
# Variables
# --------------------------------------------------

recording = False

frame_timestamp_ms = 0

sample_count = 0

last_sample_time = 0


# --------------------------------------------------
# Main loop
# --------------------------------------------------

while True:

    ret, frame = cap.read()

    if not ret:

        print("Could not read webcam frame.")

        break


    frame = cv2.flip(
        frame,
        1
    )


    height, width, _ = frame.shape


    # ----------------------------------------------
    # MediaPipe
    # ----------------------------------------------

    rgb_frame = cv2.cvtColor(
        frame,
        cv2.COLOR_BGR2RGB
    )


    mp_image = mp.Image(
        image_format=mp.ImageFormat.SRGB,
        data=rgb_frame
    )


    frame_timestamp_ms += 33


    result = face_landmarker.detect_for_video(
        mp_image,
        frame_timestamp_ms
    )


    # ----------------------------------------------
    # Extract features
    # ----------------------------------------------

    if result.face_landmarks:

        face_landmarks = result.face_landmarks[0]

        features = extract_features(
            face_landmarks,
            width,
            height
        )


        # ------------------------------------------
        # Record data
        # ------------------------------------------

        current_time = time.time()


        # Save approximately 10 samples/second
        if (
            recording
            and current_time - last_sample_time >= 0.1
        ):

            writer.writerow({
                "timestamp": current_time,
                "left_ear": features["left_ear"],
                "right_ear": features["right_ear"],
                "average_ear": features["average_ear"],
                "mar": features["mar"],
                "pitch": features["pitch"],
                "yaw": features["yaw"],
                "roll": features["roll"],
                "label": label
            })

            csv_file.flush()

            sample_count += 1

            last_sample_time = current_time


        # ------------------------------------------
        # Display
        # ------------------------------------------

        cv2.putText(
            frame,
            f"Label: {label}",
            (20, 40),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.8,
            (0, 255, 0),
            2
        )

        cv2.putText(
            frame,
            f"Samples: {sample_count}",
            (20, 75),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.7,
            (0, 255, 0),
            2
        )

        cv2.putText(
            frame,
            f"EAR: {features['average_ear']:.3f}",
            (20, 110),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.7,
            (0, 255, 0),
            2
        )

        cv2.putText(
            frame,
            f"MAR: {features['mar']:.3f}",
            (20, 145),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.7,
            (0, 255, 0),
            2
        )


    # ----------------------------------------------
    # Recording indicator
    # ----------------------------------------------

    if recording:

        cv2.putText(
            frame,
            "RECORDING",
            (20, 190),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.8,
            (0, 0, 255),
            2
        )

    else:

        cv2.putText(
            frame,
            "PRESS SPACE TO RECORD",
            (20, 190),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.7,
            (255, 255, 0),
            2
        )


    # ----------------------------------------------
    # Show
    # ----------------------------------------------

    cv2.imshow(
        "Drowsiness Dataset Collection",
        frame
    )


    key = cv2.waitKey(1) & 0xFF


    # SPACE → start/stop recording
    if key == ord(" "):

        recording = not recording

        if recording:

            print(
                f"Started recording: {label}"
            )

        else:

            print(
                f"Stopped recording. "
                f"Samples: {sample_count}"
            )


    # Q → quit
    elif key == ord("q"):

        break


# --------------------------------------------------
# Cleanup
# --------------------------------------------------

cap.release()

cv2.destroyAllWindows()

csv_file.close()

face_landmarker.close()

print()
print("Data collection finished.")
print(f"Saved to: {OUTPUT_FILE}")
print(f"Total samples: {sample_count}")