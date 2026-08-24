from ml.src.eye_features import (
    calculate_ear,
    calculate_average_ear
)

from ml.src.mouth_features import calculate_mar

from ml.src.head_pose import calculate_head_pose


RIGHT_EYE = [
    33,
    160,
    158,
    133,
    153,
    144
]

LEFT_EYE = [
    362,
    385,
    387,
    263,
    373,
    380
]


def extract_features(face_landmarks, image_width, image_height):
    """
    Extract ML features from a detected face.

    Returns a dictionary containing:
        - left EAR
        - right EAR
        - average EAR
        - MAR
        - head pitch
        - head yaw
        - head roll
    """

    # -------------------------------
    # EAR
    # -------------------------------

    right_ear = calculate_ear(
        face_landmarks,
        RIGHT_EYE
    )

    left_ear = calculate_ear(
        face_landmarks,
        LEFT_EYE
    )

    average_ear = calculate_average_ear(
        left_ear,
        right_ear
    )


    # -------------------------------
    # MAR
    # -------------------------------

    mar = calculate_mar(
        face_landmarks
    )


    # -------------------------------
    # Head pose
    # -------------------------------

    head_pose = calculate_head_pose(
        face_landmarks,
        image_width,
        image_height
    )


    if head_pose is None:

        pitch = 0.0
        yaw = 0.0
        roll = 0.0

    else:

        pitch = head_pose["pitch"]
        yaw = head_pose["yaw"]
        roll = head_pose["roll"]


    # -------------------------------
    # Feature dictionary
    # -------------------------------

    features = {
        "left_ear": left_ear,
        "right_ear": right_ear,
        "average_ear": average_ear,
        "mar": mar,
        "pitch": pitch,
        "yaw": yaw,
        "roll": roll
    }

    return features