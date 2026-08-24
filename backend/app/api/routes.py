from fastapi import (
    APIRouter,
    File,
    UploadFile,
    HTTPException,
    WebSocket,
    WebSocketDisconnect
)

from backend.app.services.ml_service import (
    MLService
)

from backend.app.services.vision_service import (
    VisionService
)

from backend.app.services.alarm_service import (
    AlarmService
)

router = APIRouter()


ml_service = MLService()

vision_service = VisionService()

alarm_service = AlarmService()

@router.get("/")
def root():

    return {
        "message":
            "Driver Drowsiness Detection API"
    }


@router.get("/health")
def health():

    return {
        "status": "healthy",
        "model_loaded": True
    }


@router.post("/predict")
async def predict(
    file: UploadFile = File(...)
):

    try:

        image_bytes = await file.read()

        features = (
            vision_service
            .process_frame(image_bytes)
        )

        if features is None:

            return {
                "state": "no_face",
                "confidence": 0.0,
                "drowsy_score": 0.0,
                "alarm": False,
                "features": {}
            }

        result = ml_service.predict(
            features
        )

        state = result["state"]

        drowsy_score = (
            result["drowsy_score"]
        )

        # Basic threshold for now.
        # We'll add temporal alarm logic later.

        alarm_result = alarm_service.update(
            state=state,
            drowsy_score=drowsy_score
        )

        return {

            "state": state,

            "confidence":
                result["confidence"],

            "drowsy_score":
                drowsy_score,

            "alarm":
                alarm_result["alarm"],

            "drowsy_frames":
                alarm_result["drowsy_frames"],

            "required_drowsy_frames":
                alarm_result["required_frames"],

            "features": features
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

@router.websocket("/ws/predict")
async def websocket_predict(websocket: WebSocket):

    await websocket.accept()
    session_tracker = (
        vision_service.create_tracker()
    )

    session_alarm = AlarmService()

    print("WebSocket client connected.")

    try:

        while True:

            # Receive JPEG bytes from React
            frame_bytes = (
                await websocket.receive_bytes()
            )

            # --------------------------------------
            # Vision processing
            # --------------------------------------

            features = (
                vision_service.process_frame(
                    frame_bytes,
                    tracker=session_tracker
                )
            )

            # --------------------------------------
            # No face detected
            # --------------------------------------

            if features is None:

                await websocket.send_json({

                    "state": "no_face",

                    "confidence": 0.0,

                    "drowsy_score": 0.0,

                    "alarm": False,

                    "drowsy_frames": 0,

                    "required_drowsy_frames":
                        alarm_service.required_drowsy_frames,

                    "features": {}

                })

                continue

            # --------------------------------------
            # ML prediction
            # --------------------------------------

            prediction = ml_service.predict(
                features
            )

            state = prediction["state"]

            drowsy_score = (
                prediction["drowsy_score"]
            )

            # --------------------------------------
            # Temporal alarm logic
            # --------------------------------------

            alarm_result = session_alarm.update(
                state=state,
                drowsy_score=drowsy_score
            )

            # --------------------------------------
            # Send result back to React
            # --------------------------------------

            response = {

                "state": state,

                "confidence":
                    prediction["confidence"],

                "drowsy_score":
                    drowsy_score,

                "alarm":
                    alarm_result["alarm"],

                "drowsy_frames":
                    alarm_result["drowsy_frames"],

                "required_drowsy_frames":
                    alarm_result[
                        "required_frames"
                    ],

                "features": features
            }

            await websocket.send_json(
                response
            )

    except WebSocketDisconnect:

        print(
            "WebSocket client disconnected."
        )

    except Exception as error:

        print(
            "WebSocket error:",
            error
        )