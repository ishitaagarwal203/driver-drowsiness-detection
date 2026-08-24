import csv
import os
import time

import cv2
import mediapipe as mp

from mediapipe.tasks import python
from mediapipe.tasks.python import vision

from feature_extractor import extract_features
from temporal_features import TemporalFeatureTracker

import uuid

MODEL_PATH = "ml/models/face_landmarker.task"

OUTPUT_FILE = "ml/data/raw/temporal_drowsiness_dataset.csv"


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
# Label
# --------------------------------------------------

print()
print("======================================")
print(" TEMPORAL DATA COLLECTION")
print("======================================")
print()

print("1 = Awake")
print("2 = Drowsy")
print("3 = Yawning")

choice = input("\nEnter choice: ").strip()


labels = {
    "1": "awake",
    "2": "drowsy",
    "3": "yawning"
}


if choice not in labels:

    print("Invalid choice.")

    face_landmarker.close()

    exit()


label = labels[choice]

session_id = str(uuid.uuid4())[:8]

print()
print(f"Session ID: {session_id}")

# --------------------------------------------------
# CSV
# --------------------------------------------------

fieldnames = [
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
# Tracker
# --------------------------------------------------

tracker = TemporalFeatureTracker(
    window_seconds=10.0
)


# --------------------------------------------------
# Webcam
# --------------------------------------------------

cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)


if not cap.isOpened():

    print("Could not open webcam.")

    csv_file.close()

    face_landmarker.close()

    exit()


frame_timestamp_ms = 0

recording = False

last_save_time = 0

sample_count = 0


print()
print(f"Selected label: {label}")
print()
print("SPACE = Start/Stop recording")
print("Q = Quit")
print()


# --------------------------------------------------
# Main loop
# --------------------------------------------------

while True:

    ret, frame = cap.read()

    if not ret:

        break


    frame = cv2.flip(
        frame,
        1
    )


    height, width, _ = frame.shape


    # ------------------------------------------------
    # MediaPipe image
    # ------------------------------------------------

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


    if result.face_landmarks:

        face_landmarks = result.face_landmarks[0]


        # --------------------------------------------
        # Static features
        # --------------------------------------------

        features = extract_features(
            face_landmarks,
            width,
            height
        )


        # --------------------------------------------
        # Temporal features
        # --------------------------------------------

        temporal = tracker.update(
            features["average_ear"],
            features["mar"]
        )


        # --------------------------------------------
        # Save
        # --------------------------------------------

        current_time = time.time()


        if (
            recording
            and current_time - last_save_time >= 0.2
        ):

            writer.writerow({
                "session_id": session_id,

                "timestamp": current_time,

                "average_ear":
                    features["average_ear"],

                "perclos":
                    temporal["perclos"],

                "blink_rate":
                    temporal["blink_rate"],

                "closure_duration":
                    temporal["closure_duration"],

                "mar":
                    features["mar"],

                "yawn_duration":
                    temporal["yawn_duration"],

                "pitch":
                    features["pitch"],

                "yaw":
                    features["yaw"],

                "roll":
                    features["roll"],

                "label":
                    label
            })


            csv_file.flush()


            sample_count += 1

            last_save_time = current_time


        # --------------------------------------------
        # Display
        # --------------------------------------------

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
            f"EAR: {features['average_ear']:.3f}",
            (20, 75),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.7,
            (0, 255, 0),
            2
        )


        cv2.putText(
            frame,
            f"PERCLOS: {temporal['perclos'] * 100:.1f}%",
            (20, 110),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.7,
            (0, 255, 0),
            2
        )


        cv2.putText(
            frame,
            f"Blink rate: {temporal['blink_rate']:.1f}/min",
            (20, 145),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.7,
            (0, 255, 0),
            2
        )


        cv2.putText(
            frame,
            f"MAR: {features['mar']:.3f}",
            (20, 180),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.7,
            (0, 255, 0),
            2
        )


        cv2.putText(
            frame,
            f"Yawns: {temporal['yawn_count']}",
            (20, 215),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.7,
            (0, 255, 0),
            2
        )


        if recording:

            cv2.putText(
                frame,
                "RECORDING",
                (20, 260),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.8,
                (0, 0, 255),
                2
            )

        else:

            cv2.putText(
                frame,
                "PRESS SPACE",
                (20, 260),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.8,
                (255, 255, 0),
                2
            )


    cv2.imshow(
        "Temporal Drowsiness Data Collection",
        frame
    )


    key = cv2.waitKey(1) & 0xFF


    if key == ord(" "):

        recording = not recording

        print(
            "Recording:",
            recording
        )


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
print("======================================")
print("DATA COLLECTION COMPLETE")
print("======================================")
print(f"Label: {label}")
print(f"Samples: {sample_count}")
print(f"Saved to: {OUTPUT_FILE}")