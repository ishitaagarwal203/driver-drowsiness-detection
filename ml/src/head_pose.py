import cv2
import numpy as np


# MediaPipe landmark indices
NOSE_TIP = 1
CHIN = 152

LEFT_EYE_CORNER = 263
RIGHT_EYE_CORNER = 33

LEFT_MOUTH_CORNER = 291
RIGHT_MOUTH_CORNER = 61


def calculate_head_pose(landmarks, image_width, image_height):
    """
    Estimate head orientation using MediaPipe landmarks
    and OpenCV solvePnP.

    Returns:
        pitch
        yaw
        roll
    """

    # --------------------------------------------------
    # 2D facial landmarks from the camera image
    # --------------------------------------------------

    image_points = np.array(
        [
            [
                landmarks[NOSE_TIP].x * image_width,
                landmarks[NOSE_TIP].y * image_height
            ],

            [
                landmarks[CHIN].x * image_width,
                landmarks[CHIN].y * image_height
            ],

            [
                landmarks[LEFT_EYE_CORNER].x * image_width,
                landmarks[LEFT_EYE_CORNER].y * image_height
            ],

            [
                landmarks[RIGHT_EYE_CORNER].x * image_width,
                landmarks[RIGHT_EYE_CORNER].y * image_height
            ],

            [
                landmarks[LEFT_MOUTH_CORNER].x * image_width,
                landmarks[LEFT_MOUTH_CORNER].y * image_height
            ],

            [
                landmarks[RIGHT_MOUTH_CORNER].x * image_width,
                landmarks[RIGHT_MOUTH_CORNER].y * image_height
            ]
        ],
        dtype=np.float64
    )


    # --------------------------------------------------
    # Approximate 3D face model
    # --------------------------------------------------

    model_points = np.array(
        [
            [0.0, 0.0, 0.0],          # Nose
            [0.0, -63.6, -12.5],      # Chin
            [-43.3, 32.7, -26.0],     # Left eye
            [43.3, 32.7, -26.0],      # Right eye
            [-28.9, -28.9, -24.1],    # Left mouth
            [28.9, -28.9, -24.1]      # Right mouth
        ],
        dtype=np.float64
    )


    # --------------------------------------------------
    # Camera matrix
    # --------------------------------------------------

    focal_length = image_width

    camera_center = (
        image_width / 2,
        image_height / 2
    )

    camera_matrix = np.array(
        [
            [
                focal_length,
                0,
                camera_center[0]
            ],

            [
                0,
                focal_length,
                camera_center[1]
            ],

            [
                0,
                0,
                1
            ]
        ],
        dtype=np.float64
    )


    # Assume no lens distortion
    dist_coeffs = np.zeros(
        (4, 1),
        dtype=np.float64
    )


    # --------------------------------------------------
    # Solve PnP
    # --------------------------------------------------

    success, rotation_vector, translation_vector = cv2.solvePnP(
        model_points,
        image_points,
        camera_matrix,
        dist_coeffs,
        flags=cv2.SOLVEPNP_ITERATIVE
    )


    if not success:

        return None


    # --------------------------------------------------
    # Convert rotation vector to rotation matrix
    # --------------------------------------------------

    rotation_matrix, _ = cv2.Rodrigues(
        rotation_vector
    )


    # --------------------------------------------------
    # Convert rotation matrix to Euler angles
    # --------------------------------------------------

    angles, _, _, _, _, _ = cv2.RQDecomp3x3(
        rotation_matrix
    )


    pitch = angles[0]
    yaw = angles[1]
    roll = angles[2]


    return {
        "pitch": pitch,
        "yaw": yaw,
        "roll": roll
    }