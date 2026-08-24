import { useEffect, useRef, useState } from "react";


function WebcamView({
  onPrediction,
  monitoring
}) {

  const videoRef = useRef(null);

  const canvasRef = useRef(null);

  const socketRef = useRef(null);

  const intervalRef = useRef(null);


  const [cameraError, setCameraError] =
    useState("");

  const [connected, setConnected] =
    useState(false);


  // ==================================================
  // CAMERA
  // ==================================================

  useEffect(() => {

    let stream = null;


    const startCamera = async () => {

      try {

        stream =
          await navigator.mediaDevices
            .getUserMedia({

              video: {
                width: 640,
                height: 480,
                facingMode: "user"
              },

              audio: false

            });


        if (videoRef.current) {

          videoRef.current.srcObject =
            stream;

        }

      } catch (error) {

        console.error(error);

        setCameraError(
          "Unable to access camera. Please allow camera permission."
        );

      }

    };


    startCamera();


    return () => {

      if (stream) {

        stream
          .getTracks()
          .forEach(
            (track) => track.stop()
          );

      }

    };

  }, []);


  // ==================================================
  // WEBSOCKET
  // ==================================================

  useEffect(() => {

    if (!monitoring) {

      if (socketRef.current) {

        socketRef.current.close();

        socketRef.current = null;

      }

      setConnected(false);

      return;

    }


    const socket =
      new WebSocket(
        "ws://127.0.0.1:8000/api/ws/predict"
      );


    socketRef.current = socket;


    socket.onopen = () => {

      console.log(
        "WebSocket connected."
      );

      setConnected(true);

    };


    socket.onmessage = (event) => {

      try {

        const data =
          JSON.parse(event.data);


        console.log(
          "Prediction:",
          data
        );


        if (onPrediction) {

          onPrediction(data);

        }

      } catch (error) {

        console.error(
          "Invalid WebSocket response:",
          error
        );

      }

    };


    socket.onerror = (error) => {

      console.error(
        "WebSocket error:",
        error
      );

      setCameraError(
        "Unable to connect to detection server."
      );

    };


    socket.onclose = () => {

      console.log(
        "WebSocket disconnected."
      );

      setConnected(false);

    };


    return () => {

      socket.close();

    };

  }, [monitoring, onPrediction]);


  // ==================================================
  // SEND FRAME
  // ==================================================

  useEffect(() => {

    if (!monitoring) {

      if (intervalRef.current) {

        clearInterval(
          intervalRef.current
        );

        intervalRef.current = null;

      }

      return;

    }


    intervalRef.current =
      setInterval(() => {

        const video =
          videoRef.current;

        const canvas =
          canvasRef.current;

        const socket =
          socketRef.current;


        if (
          !video ||
          !canvas ||
          !socket ||
          socket.readyState !==
            WebSocket.OPEN
        ) {

          return;

        }


        if (
          video.videoWidth === 0 ||
          video.videoHeight === 0
        ) {

          return;

        }


        canvas.width =
          video.videoWidth;

        canvas.height =
          video.videoHeight;


        const context =
          canvas.getContext("2d");


        context.drawImage(
          video,
          0,
          0,
          canvas.width,
          canvas.height
        );


        canvas.toBlob(
          (blob) => {

            if (
              blob &&
              socket.readyState ===
                WebSocket.OPEN
            ) {

              socket.send(blob);

            }

          },
          "image/jpeg",
          0.7
        );


      }, 500);


    return () => {

      if (intervalRef.current) {

        clearInterval(
          intervalRef.current
        );

        intervalRef.current = null;

      }

    };

  }, [monitoring, connected]);


  // ==================================================
  // UI
  // ==================================================

  return (

    <div className="webcam-container">


      {cameraError && (

        <div className="camera-error">

          {cameraError}

        </div>

      )}


      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="webcam-video"
      />


      <canvas
        ref={canvasRef}
        style={{
          display: "none"
        }}
      />


      <div className="connection-status">

        {connected
          ? "🟢 Detection Connected"
          : monitoring
          ? "🟡 Connecting..."
          : "⚪ Monitoring Off"}

      </div>

    </div>

  );

}


export default WebcamView;