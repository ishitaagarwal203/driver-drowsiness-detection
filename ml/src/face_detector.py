import cv2
import mediapipe as mp

from mediapipe.tasks import python
from mediapipe.tasks.python import vision

from eye_features import (
    calculate_ear,
    calculate_average_ear
)

from drowsiness_state import DrowsinessState
from perclos import PerclosCalculator
from mouth_features import calculate_mar
from yawning_detector import YawningDetector
from head_pose import calculate_head_pose

# --------------------------------------------------
# Configuration
# --------------------------------------------------

MODEL_PATH = "ml/models/face_landmarker.task"

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


# --------------------------------------------------
# MediaPipe Face Landmarker
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
# Drowsiness state
# --------------------------------------------------

drowsiness_state = DrowsinessState(
    ear_threshold=0.21,
    closure_time_threshold=1.0
)

perclos_calculator = PerclosCalculator(
    window_seconds=10.0,
    ear_threshold=0.21
)

yawning_detector = YawningDetector(
    mar_threshold=0.55,
    minimum_yawn_duration=1.0
)

# --------------------------------------------------
# Webcam
# --------------------------------------------------

cap = cv2.VideoCapture(0)

if not cap.isOpened():

    print("ERROR: Could not open webcam.")

    exit()


frame_timestamp_ms = 0


# --------------------------------------------------
# Main loop
# --------------------------------------------------

while True:

    ret, frame = cap.read()

    if not ret:

        print("ERROR: Could not read frame.")

        break


    # Mirror camera
    frame = cv2.flip(frame, 1)


    # Convert BGR → RGB
    rgb_frame = cv2.cvtColor(
        frame,
        cv2.COLOR_BGR2RGB
    )


    # Create MediaPipe image
    mp_image = mp.Image(
        image_format=mp.ImageFormat.SRGB,
        data=rgb_frame
    )


    # Increase timestamp
    frame_timestamp_ms += 33


    # Detect face landmarks
    result = face_landmarker.detect_for_video(
        mp_image,
        frame_timestamp_ms
    )


    # --------------------------------------------------
    # Face detected
    # --------------------------------------------------

    if result.face_landmarks:

        face_landmarks = result.face_landmarks[0]


        # ----------------------------------------------
        # Calculate EAR
        # ----------------------------------------------

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

        # ----------------------------------------------
        # Update drowsiness state
        # ----------------------------------------------

        state = drowsiness_state.update(
            average_ear
        )

        perclos = perclos_calculator.update(
            average_ear
        )
        
        mar = calculate_mar(
           face_landmarks
        )

        yawn_state = yawning_detector.update(
           mar
        )

        # Draw eye landmarks

        height, width, _ = frame.shape
        head_pose = calculate_head_pose(
            face_landmarks,
            width,
            height
        )

        for index in RIGHT_EYE + LEFT_EYE:

            landmark = face_landmarks[index]

            x = int(landmark.x * width)
            y = int(landmark.y * height)

            cv2.circle(
                frame,
                (x, y),
                3,
                (0, 255, 0),
                -1
            )


        # ----------------------------------------------
        # Display EAR
        # ----------------------------------------------

        cv2.putText(
            frame,
            f"EAR: {average_ear:.3f}",
            (20, 40),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.8,
            (0, 255, 0),
            2
        )


        # ----------------------------------------------
        # Display eye state
        # ----------------------------------------------

        cv2.putText(
            frame,
            f"State: {state['state']}",
            (20, 75),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.8,
            (0, 255, 0),
            2
        )


        # ----------------------------------------------
        # Closure duration
        # ----------------------------------------------

        cv2.putText(
            frame,
            f"Closed: {state['closure_duration']:.2f}s",
            (20, 110),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.7,
            (0, 255, 0),
            2
        )


        # ----------------------------------------------
        # Blink count
        # ----------------------------------------------

        cv2.putText(
            frame,
            f"Blinks: {state['blink_count']}",
            (20, 145),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.7,
            (0, 255, 0),
            2
        )

        cv2.putText(
            frame,
            f"PERCLOS: {perclos * 100:.1f}%",
            (20, 180),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.7,
            (0, 255, 0),
            2
        )

        cv2.putText(
            frame,
            f"MAR: {mar:.3f}",
            (20, 215),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.7,
            (0, 255, 0),
            2
        )

        cv2.putText(
            frame,
            f"Yawns: {yawn_state['yawn_count']}",
            (20, 250),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.7,
            (0, 255, 0),
            2
        )

        if yawn_state["yawning"]:
            cv2.putText(
                frame,
                "YAWNING DETECTED",
                (20, 290),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.9,
                (0, 0, 255),
                2
            )
        # ----------------------------------------------
        # Drowsiness warning
        # ----------------------------------------------

        if state["drowsy"]:

            cv2.putText(
                frame,
                "DROWSINESS DETECTED!",
                (20, 330),
                cv2.FONT_HERSHEY_SIMPLEX,
                1.0,
                (0, 0, 255),
                3
            )

        if head_pose:

            cv2.putText(
                frame,
                f"Pitch: {head_pose['pitch']:.1f}",
                (20, 330),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.7,
                (0, 255, 0),
                2
            )

            cv2.putText(
                frame,
                f"Yaw: {head_pose['yaw']:.1f}",
                (20, 365),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.7,
                (0, 255, 0),
                2
            )

            cv2.putText(
                frame,
                f"Roll: {head_pose['roll']:.1f}",
                (20, 400),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.7,
                (0, 255, 0),
                2
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


    # ----------------------------------------------
    # Display camera
    # ----------------------------------------------

    cv2.imshow(
        "Driver Drowsiness Detection",
        frame
    )


    # Press Q to quit
    if cv2.waitKey(1) & 0xFF == ord("q"):

        break


# --------------------------------------------------
# Cleanup
# --------------------------------------------------

cap.release()

cv2.destroyAllWindows()

face_landmarker.close()