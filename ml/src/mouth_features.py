import math


def euclidean_distance(point1, point2):
    """
    Calculate Euclidean distance between two MediaPipe landmarks.
    """

    return math.sqrt(
        (point1.x - point2.x) ** 2
        + (point1.y - point2.y) ** 2
    )


def calculate_mar(landmarks):
    """
    Calculate Mouth Aspect Ratio (MAR).

    We use:
        61  -> left mouth corner
        291 -> right mouth corner

        13  -> upper inner lip
        14  -> lower inner lip

        78  -> upper/side mouth point
        308 -> lower/side mouth point

    MAR increases as the mouth opens.
    """

    left_corner = landmarks[61]
    right_corner = landmarks[291]

    upper_1 = landmarks[13]
    lower_1 = landmarks[14]

    upper_2 = landmarks[78]
    lower_2 = landmarks[308]

    mouth_width = euclidean_distance(
        left_corner,
        right_corner
    )

    vertical_1 = euclidean_distance(
        upper_1,
        lower_1
    )

    vertical_2 = euclidean_distance(
        upper_2,
        lower_2
    )

    if mouth_width == 0:
        return 0.0

    mar = (
        vertical_1 + vertical_2
    ) / (2.0 * mouth_width)

    return mar