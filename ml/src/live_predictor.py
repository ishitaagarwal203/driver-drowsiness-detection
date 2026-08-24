import time

import cv2
import joblib
import mediapipe as mp

from mediapipe.tasks import python
from mediapipe.tasks.python import vision

from ml.src.feature_extractor import extract_features
from ml.src.temporal_features import TemporalFeatureTracker
from ml.src.prediction_smoother import PredictionSmoother
from ml.src.alarm import DrowsinessAlarm


# ==================================================
# Configuration
# ==================================================

MODEL_PATH = "ml/models/drowsiness_model.joblib"

FACE_MODEL_PATH = "ml/models/face_landmarker.task"


# ==================================================
# Load trained model
# ==================================================

bundle = joblib.load(
    MODEL_PATH
)

model = bundle["model"]

FEATURE_COLUMNS = bundle["features"]


print("ML model loaded.")

print(
    "Features:",
    FEATURE_COLUMNS
)


# ==================================================
# MediaPipe Face Landmarker
# ==================================================

base_options = python.BaseOptions(
    model_asset_path=FACE_MODEL_PATH
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


# ==================================================
# Temporal tracker
# ==================================================

tracker = TemporalFeatureTracker(
    window_seconds=10.0
)

smoother = PredictionSmoother(
    window_size=10,
    drowsy_threshold=0.6
)

alarm = DrowsinessAlarm(
    required_duration=2.0,
    cooldown=5.0
)

# ==================================================
# Webcam
# ==================================================

cap = cv2.VideoCapture(
    0,
    cv2.CAP_DSHOW
)


if not cap.isOpened():

    print("Could not open webcam.")

    face_landmarker.close()

    exit()


# ==================================================
# Variables
# ==================================================

frame_timestamp_ms = 0

last_prediction_time = 0

prediction = "unknown"

prediction_probability = 0.0


# ==================================================
# Main loop
# ==================================================

while True:

    ret, frame = cap.read()

    if not ret:

        print("Could not read frame.")

        break


    frame = cv2.flip(
        frame,
        1
    )


    height, width, _ = frame.shape


    # ------------------------------------------------
    # Convert image
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


    # ------------------------------------------------
    # MediaPipe
    # ------------------------------------------------

    result = face_landmarker.detect_for_video(
        mp_image,
        frame_timestamp_ms
    )


    if result.face_landmarks:

        face_landmarks = result.face_landmarks[0]


        # --------------------------------------------
        # Extract static features
        # --------------------------------------------

        features = extract_features(
            face_landmarks,
            width,
            height
        )


        # --------------------------------------------
        # Update temporal features
        # --------------------------------------------

        temporal = tracker.update(
            features["average_ear"],
            features["mar"]
        )


        # --------------------------------------------
        # Build ML feature vector
        # --------------------------------------------

        ml_features = {

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
                features["roll"]
        }


        # --------------------------------------------
        # Predict
        # --------------------------------------------

        current_time = time.time()


        # Predict every 200 ms
        if (
            current_time -
            last_prediction_time
            >= 0.2
        ):

            input_data = [[
                ml_features[column]
                for column in FEATURE_COLUMNS
            ]]


            prediction = model.predict(
                input_data
            )[0]


            probabilities = model.predict_proba(
                input_data
            )[0]


            max_probability = max(
                probabilities
            )


            prediction_probability = (
                max_probability
            )

            smoothed = smoother.update(
                prediction,
                prediction_probability
            )

            prediction = smoothed["state"]

            drowsy_score = smoothed["drowsy_score"]

            alarm_triggered = alarm.update(
                prediction
            )


            last_prediction_time = (
                current_time
            )


        # --------------------------------------------
        # Display features
        # --------------------------------------------

        cv2.putText(
            frame,
            f"State: {prediction}",
            (20, 40),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.9,
            (0, 255, 0),
            2
        )


        cv2.putText(
            frame,
            f"Confidence: "
            f"{prediction_probability * 100:.1f}%",
            (20, 80),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.7,
            (0, 255, 0),
            2
        )


        cv2.putText(
            frame,
            f"EAR: "
            f"{features['average_ear']:.3f}",
            (20, 120),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.65,
            (255, 255, 255),
            2
        )


        cv2.putText(
            frame,
            f"PERCLOS: "
            f"{temporal['perclos'] * 100:.1f}%",
            (20, 155),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.65,
            (255, 255, 255),
            2
        )


        cv2.putText(
            frame,
            f"MAR: "
            f"{features['mar']:.3f}",
            (20, 190),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.65,
            (255, 255, 255),
            2
        )


        cv2.putText(
            frame,
            f"Pitch: "
            f"{features['pitch']:.1f}",
            (20, 225),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.65,
            (255, 255, 255),
            2
        )


        cv2.putText(
            frame,
            f"Yaw: "
            f"{features['yaw']:.1f}",
            (20, 260),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.65,
            (255, 255, 255),
            2
        )

        cv2.putText(
            frame,
            f"Drowsy score: "
            f"{drowsy_score * 100:.1f}%",
            (20, 295),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.65,
            (255, 255, 255),
            2
        )


        # --------------------------------------------
        # Drowsiness warning
        # --------------------------------------------

        if prediction == "drowsy":

            cv2.putText(
                frame,
                "DROWSINESS DETECTED!",
                (20, height - 50),
                cv2.FONT_HERSHEY_SIMPLEX,
                1.0,
                (0, 0, 255),
                3
            )

            cv2.putText(
                frame,
                "ALARM ACTIVE",
                (20, height - 90),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.8,
                (0, 0, 255),
                2
            )


        elif prediction == "yawning":

            cv2.putText(
                frame,
                "YAWNING",
                (20, height - 50),
                cv2.FONT_HERSHEY_SIMPLEX,
                1.0,
                (0, 255, 255),
                3
            )


    else:

        cv2.putText(
            frame,
            "NO FACE DETECTED",
            (20, 40),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.8,
            (0, 0, 255),
            2
        )


    # ------------------------------------------------
    # Display
    # ------------------------------------------------

    cv2.imshow(
        "Live Drowsiness Detection",
        frame
    )


    key = cv2.waitKey(1) & 0xFF


    if key == ord("q"):

        break


# ==================================================
# Cleanup
# ==================================================

cap.release()

cv2.destroyAllWindows()

face_landmarker.close()

print("Live detection stopped.")