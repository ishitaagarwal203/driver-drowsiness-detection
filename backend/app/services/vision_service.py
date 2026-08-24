from pathlib import Path

import cv2
import mediapipe as mp
import numpy as np

from mediapipe.tasks import python
from mediapipe.tasks.python import vision

from ml.src.feature_extractor import extract_features
from ml.src.temporal_features import TemporalFeatureTracker


# ==================================================
# Paths
# ==================================================

PROJECT_ROOT = Path(__file__).resolve().parents[3]

FACE_MODEL_PATH = (
    PROJECT_ROOT
    / "ml"
    / "models"
    / "face_landmarker.task"
)


# ==================================================
# Vision service
# ==================================================

class VisionService:

    def __init__(self, use_tracker=True):

        if not FACE_MODEL_PATH.exists():

            raise FileNotFoundError(
                f"Face Landmarker model not found: "
                f"{FACE_MODEL_PATH}"
            )

        base_options = python.BaseOptions(
            model_asset_path=str(FACE_MODEL_PATH)
        )

        options = vision.FaceLandmarkerOptions(
            base_options=base_options,
            running_mode=vision.RunningMode.IMAGE,
            num_faces=1,
            min_face_detection_confidence=0.5,
            min_face_presence_confidence=0.5,
            min_tracking_confidence=0.5
        )

        self.face_landmarker = (
            vision.FaceLandmarker
            .create_from_options(options)
        )

        self.tracker = (
            TemporalFeatureTracker(
                window_seconds=10.0
            )
            if use_tracker
            else None
        )

        print("Vision service loaded.")

    def create_tracker(self):
        return TemporalFeatureTracker(
            window_seconds=10.0
        )

    def process_frame(self,image_bytes,tracker=None):

        # ------------------------------------------
        # Decode image
        # ------------------------------------------

        image_array = np.frombuffer(
            image_bytes,
            dtype=np.uint8
        )

        frame = cv2.imdecode(
            image_array,
            cv2.IMREAD_COLOR
        )

        if frame is None:

            raise ValueError(
                "Could not decode image."
            )

        # ------------------------------------------
        # BGR → RGB
        # ------------------------------------------

        rgb_frame = cv2.cvtColor(
            frame,
            cv2.COLOR_BGR2RGB
        )

        mp_image = mp.Image(
            image_format=mp.ImageFormat.SRGB,
            data=rgb_frame
        )

        # ------------------------------------------
        # Face detection
        # ------------------------------------------

        result = (
            self.face_landmarker
            .detect(mp_image)
        )

        if not result.face_landmarks:

            return None

        # ------------------------------------------
        # First face
        # ------------------------------------------

        landmarks = result.face_landmarks[0]

        height, width, _ = frame.shape

        # ------------------------------------------
        # Extract features
        # ------------------------------------------

        features = extract_features(
            landmarks,
            width,
            height
        )

        # ------------------------------------------
        # Temporal features
        # ------------------------------------------

        active_tracker = (
            tracker
            if tracker is not None
            else self.tracker
        )

        temporal = active_tracker.update(
            features["average_ear"],
            features["mar"]
        )

        return {

            "average_ear":
                float(features["average_ear"]),

            "perclos":
                float(temporal["perclos"]),

            "blink_rate":
                float(temporal["blink_rate"]),

            "closure_duration":
                float(temporal["closure_duration"]),

            "mar":
                float(features["mar"]),

            "yawn_duration":
                float(temporal["yawn_duration"]),

            "pitch":
                float(features["pitch"]),

            "yaw":
                float(features["yaw"]),

            "roll":
                float(features["roll"])
        }

    def close(self):

        self.face_landmarker.close()