import math


def euclidean_distance(point1, point2):
    """
    Calculate Euclidean distance between two facial landmarks.
    """

    return math.sqrt(
        (point1.x - point2.x) ** 2
        + (point1.y - point2.y) ** 2
    )


def calculate_ear(landmarks, eye_indices):
    """
    Calculate Eye Aspect Ratio (EAR).

    eye_indices:
        [left_corner, upper_1, upper_2,
         right_corner, lower_1, lower_2]
    """

    p1 = landmarks[eye_indices[0]]
    p2 = landmarks[eye_indices[1]]
    p3 = landmarks[eye_indices[2]]
    p4 = landmarks[eye_indices[3]]
    p5 = landmarks[eye_indices[4]]
    p6 = landmarks[eye_indices[5]]

    vertical_1 = euclidean_distance(p2, p6)
    vertical_2 = euclidean_distance(p3, p5)

    horizontal = euclidean_distance(p1, p4)

    if horizontal == 0:
        return 0.0

    ear = (vertical_1 + vertical_2) / (2.0 * horizontal)

    return ear


def calculate_average_ear(left_ear, right_ear):
    """
    Calculate average EAR of both eyes.
    """

    return (left_ear + right_ear) / 2.0


def is_eye_closed(ear, threshold=0.21):
    """
    Determine whether the eye is closed.

    NOTE:
    0.21 is only an initial threshold.
    Later we will calibrate this and use ML/temporal features.
    """

    return ear < threshold