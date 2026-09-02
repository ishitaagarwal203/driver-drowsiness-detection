import { useEffect, useRef, useState } from "react";

function WebcamView({
  onPrediction,
  monitoring
}) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const socketRef = useRef(null);
  const intervalRef = useRef(null);

  const [cameraError, setCameraError] = useState("");
  const [connected, setConnected] = useState(false);

  // ==================================================
  // CAMERA INIT
  // ==================================================
  useEffect(() => {
    let stream = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: 640,
            height: 480,
            facingMode: "user"
          },
          audio: false
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
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
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // ==================================================
  // WEBSOCKET CONNECTION
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

    const socket = new WebSocket("ws://127.0.0.1:8000/api/ws/predict");
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket connected.");
      setConnected(true);
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Prediction:", data);
        if (onPrediction) {
          onPrediction(data);
        }
      } catch (error) {
        console.error("Invalid WebSocket response:", error);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      setCameraError("Unable to connect to detection server.");
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected.");
      setConnected(false);
    };

    return () => {
      socket.close();
    };
  }, [monitoring, onPrediction]);

  // ==================================================
  // SEND FRAME INTERVAL
  // ==================================================
  useEffect(() => {
    if (!monitoring) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const socket = socketRef.current;

      if (
        !video ||
        !canvas ||
        !socket ||
        socket.readyState !== WebSocket.OPEN
      ) {
        return;
      }

      if (video.videoWidth === 0 || video.videoHeight === 0) {
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          if (blob && socket.readyState === WebSocket.OPEN) {
            socket.send(blob);
          }
        },
        "image/jpeg",
        0.7
      );
    }, 500);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [monitoring, connected]);

  // ==================================================
  // UI RENDER
  // ==================================================
  return (
    <div className="relative overflow-hidden rounded-[10px] bg-[#090C10] aspect-4/3 border border-white/[0.08]">
      {cameraError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 bg-[#13181F] border border-[#EF3340]/40 text-[#EF3340] text-[13px] text-center z-10">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{cameraError}</span>
        </div>
      )}

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="block w-full h-full object-cover -scale-x-100"
      />

      <canvas ref={canvasRef} style={{ display: "none" }} />

      {/* RESTRAINED DARK OVERLAY TAGS */}
      <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1 rounded-[6px] bg-[#0E1217]/90 border border-white/[0.08] text-[#F3F4F6] text-xs font-medium">
        <span className={`w-1.5 h-1.5 rounded-full ${monitoring ? "bg-[#22C55E]" : "bg-[#858D98]"}`} />
        <span>{monitoring ? "Monitoring active" : "Standby"}</span>
      </div>

      <div className={`absolute top-3 right-3 flex items-center gap-2 px-2.5 py-1 rounded-[6px] bg-[#0E1217]/90 border border-white/[0.08] text-xs font-medium ${connected ? "text-[#22C55E]" : monitoring ? "text-[#F59E0B]" : "text-[#858D98]"}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${connected ? "bg-[#22C55E]" : monitoring ? "bg-[#F59E0B]" : "bg-[#858D98]"}`} />
        <span>
          {connected
            ? "Detection connected"
            : monitoring
            ? "Connecting..."
            : "Offline"}
        </span>
      </div>
    </div>
  );
}

export default WebcamView;