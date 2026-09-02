import {
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";

import WebcamView from "../components/WebcamView";
import LiveCharts from "../components/LiveCharts";

function WorkingModel() {
  const [prediction, setPrediction] = useState(null);
  const [history, setHistory] = useState([]);
  const [monitoring, setMonitoring] = useState(false);
  const [sessionSeconds, setSessionSeconds] = useState(0);

  const alarmAudioRef = useRef(null);

  // ==================================================
  // SESSION TIMER
  // ==================================================
  useEffect(() => {
    if (!monitoring) {
      return;
    }

    const timer = setInterval(() => {
      setSessionSeconds((previous) => previous + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [monitoring]);

  // ==================================================
  // RESET TIMER
  // ==================================================
  useEffect(() => {
    if (!monitoring) {
      setSessionSeconds(0);
    }
  }, [monitoring]);

  const handlePrediction = useCallback((data) => {
    setPrediction(data);

    if (!data?.features) {
      return;
    }

    const now = new Date();
    const time = now.toLocaleTimeString([], {
      minute: "2-digit",
      second: "2-digit"
    });

    const newPoint = {
      time,
      drowsyScore: Number(data.drowsy_score || 0),
      ear: Number(data.features.average_ear || 0),
      perclos: Number(data.features.perclos || 0),
      mar: Number(data.features.mar || 0)
    };

    setHistory((previous) => {
      const updated = [...previous, newPoint];
      // Keep only the latest 60 points
      return updated.slice(-60);
    });
  }, []);

  // ==================================================
  // ALARM
  // ==================================================
  useEffect(() => {
    if (!alarmAudioRef.current) {
      alarmAudioRef.current = new Audio("/sounds/alarm.mp3");
      alarmAudioRef.current.loop = true;
    }

    const audio = alarmAudioRef.current;

    if (monitoring && prediction?.alarm) {
      audio.play().catch((error) => {
        console.log("Audio playback blocked:", error);
      });
    } else {
      audio.pause();
      audio.currentTime = 0;
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [monitoring, prediction?.alarm]);

  // ==================================================
  // START / STOP
  // ==================================================
  const toggleMonitoring = () => {
    setMonitoring((previous) => {
      const next = !previous;

      if (next) {
        setHistory([]);
        setPrediction(null);
        setSessionSeconds(0);
      }

      return next;
    });
  };

  // ==================================================
  // FORMAT TIME
  // ==================================================
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  // ==================================================
  // CURRENT STATE
  // ==================================================
  const currentState = prediction?.state || "waiting";

  const stateLabel = {
    awake: "Awake",
    drowsy: "Drowsy",
    yawning: "Yawning",
    no_face: "No face detected",
    waiting: "Waiting to start"
  }[currentState];

  const stateCardStyles = {
    awake: "bg-[#13181F] border-white/[0.08] border-l-[#22C55E]",
    drowsy: "bg-[#3A101A]/30 border-[#EF3340]/20 border-l-[#EF3340]",
    yawning: "bg-[#241A10]/30 border-[#F59E0B]/20 border-l-[#F59E0B]",
    no_face: "bg-[#13181F] border-white/[0.08] border-l-[#858D98]",
    waiting: "bg-[#13181F] border-white/[0.08] border-l-[#858D98]"
  }[currentState] || "bg-[#13181F] border-white/[0.08] border-l-[#858D98]";

  return (
    <div className="flex-1 flex flex-col justify-between">
      {/* MAIN DASHBOARD CONTENT */}
      <div className="w-full max-w-[1320px] mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT SIDE: DRIVER CAMERA PANEL */}
        <section className="col-span-1 lg:col-span-7 bg-[#0E1217] border border-white/[0.08] rounded-[14px] p-4 sm:p-6 flex flex-col gap-4 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-base font-semibold text-[#F3F4F6] m-0">
                Driver camera
              </h2>
              <p className="text-[13px] text-[#858D98] mt-0.5">
                Real-time video feed
              </p>
            </div>

            <div className={`flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-medium border ${monitoring ? "bg-[#22C55E]/10 border-[#22C55E]/20 text-[#22C55E]" : "bg-[#13181F] border-white/[0.08] text-[#858D98]"}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              {monitoring ? "Live" : "Inactive"}
            </div>
          </div>

          <WebcamView
            monitoring={monitoring}
            onPrediction={handlePrediction}
          />

          <button
            type="button"
            className={`w-full py-3 px-4 rounded-[10px] text-sm font-medium transition-colors cursor-pointer text-white focus-visible:outline-2 focus-visible:outline-offset-2 ${
              monitoring
                ? "bg-[#EF3340] hover:bg-[#D42A36] focus-visible:outline-[#EF3340]"
                : "bg-[#B51635] hover:bg-[#9E122D] focus-visible:outline-[#B51635]"
            }`}
            onClick={toggleMonitoring}
            aria-label={
              monitoring
                ? "Stop monitoring session"
                : "Start monitoring session"
            }
          >
            {monitoring ? "Stop monitoring" : "Start monitoring"}
          </button>

          <div className="flex justify-between items-center px-4 py-2.5 bg-[#13181F] border border-white/[0.06] rounded-[8px] text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[#858D98] font-medium">Detection engine</span>
              <span className="text-[#F3F4F6] font-medium flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${monitoring ? "bg-[#22C55E]" : "bg-[#858D98]"}`} />
                {monitoring ? "Processing" : "Ready"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#858D98] font-medium">Session time</span>
              <span className="text-[#F3F4F6] font-medium tabular-nums">
                {formatTime(sessionSeconds)}
              </span>
            </div>
          </div>
        </section>

        {/* RIGHT SIDE: DRIVER STATUS PANEL */}
        <section className="col-span-1 lg:col-span-5 bg-[#0E1217] border border-white/[0.08] rounded-[14px] p-4 sm:p-6 flex flex-col gap-4 shadow-sm">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-semibold text-[#F3F4F6] m-0">
              Driver status
            </h2>
          </div>

          {/* STATE */}
          <div className={`flex items-center gap-4 p-4 rounded-[10px] border border-l-4 transition-colors ${stateCardStyles}`}>
            <div className="text-xl flex items-center justify-center w-[38px] h-[38px] rounded-[6px] bg-[#0E1217] border border-white/[0.08] shrink-0 text-[#F3F4F6]">
              {currentState === "drowsy"
                ? "⚠️"
                : currentState === "yawning"
                ? "🥱"
                : currentState === "no_face"
                ? "?"
                : currentState === "awake"
                ? "✓"
                : "●"}
            </div>

            <div>
              <span className="text-xs text-[#858D98] font-medium block">
                Current state
              </span>
              <h3 className="mt-0.5 text-lg font-semibold text-[#F3F4F6]">
                {stateLabel}
              </h3>
            </div>
          </div>

          {/* METRICS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 sm:px-4 rounded-[8px] bg-[#13181F] border border-white/[0.06]">
              <span className="block text-xs font-medium text-[#858D98]">
                Confidence
              </span>
              <strong className="block mt-1 text-lg font-semibold text-[#F3F4F6] tabular-nums">
                {prediction
                  ? `${(prediction.confidence * 100).toFixed(1)}%`
                  : "--"}
              </strong>
            </div>

            <div className="p-3 sm:px-4 rounded-[8px] bg-[#13181F] border border-white/[0.06]">
              <span className="block text-xs font-medium text-[#858D98]">
                Drowsiness score
              </span>
              <strong className="block mt-1 text-lg font-semibold text-[#F3F4F6] tabular-nums">
                {prediction
                  ? `${(prediction.drowsy_score * 100).toFixed(1)}%`
                  : "--"}
              </strong>
            </div>

            <div className="p-3 sm:px-4 rounded-[8px] bg-[#13181F] border border-white/[0.06]">
              <span className="block text-xs font-medium text-[#858D98]">
                EAR
              </span>
              <strong className="block mt-1 text-lg font-semibold text-[#F3F4F6] tabular-nums">
                {prediction?.features?.average_ear !== undefined
                  ? prediction.features.average_ear.toFixed(3)
                  : "--"}
              </strong>
            </div>

            <div className="p-3 sm:px-4 rounded-[8px] bg-[#13181F] border border-white/[0.06]">
              <span className="block text-xs font-medium text-[#858D98]">
                PERCLOS
              </span>
              <strong className="block mt-1 text-lg font-semibold text-[#F3F4F6] tabular-nums">
                {prediction?.features?.perclos !== undefined
                  ? `${(prediction.features.perclos * 100).toFixed(1)}%`
                  : "--"}
              </strong>
            </div>

            <div className="p-3 sm:px-4 rounded-[8px] bg-[#13181F] border border-white/[0.06]">
              <span className="block text-xs font-medium text-[#858D98]">
                MAR
              </span>
              <strong className="block mt-1 text-lg font-semibold text-[#F3F4F6] tabular-nums">
                {prediction?.features?.mar !== undefined
                  ? prediction.features.mar.toFixed(3)
                  : "--"}
              </strong>
            </div>

            <div className="p-3 sm:px-4 rounded-[8px] bg-[#13181F] border border-white/[0.06]">
              <span className="block text-xs font-medium text-[#858D98]">
                Blink rate
              </span>
              <strong className="block mt-1 text-lg font-semibold text-[#F3F4F6] tabular-nums">
                {prediction?.features?.blink_rate !== undefined
                  ? prediction.features.blink_rate.toFixed(1)
                  : "--"}
              </strong>
            </div>
          </div>

          {/* DROWSINESS CONFIRMATION */}
          {prediction && (
            <div className="mt-2 p-3 sm:px-4 rounded-[8px] bg-[#13181F] border border-white/[0.06]">
              <div className="flex justify-between items-center mb-2 text-xs font-medium text-[#858D98]">
                <span>Drowsiness confirmation</span>
                <strong className="text-[#F3F4F6] tabular-nums font-semibold">
                  {prediction.drowsy_frames || 0}/
                  {prediction.required_drowsy_frames || 6}
                </strong>
              </div>

              <div className="w-full h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
                <div
                  className="h-full rounded-full bg-[#EF3340] transition-[width] duration-200 ease-out"
                  style={{
                    width: `${Math.min(
                      100,
                      ((prediction.drowsy_frames || 0) /
                        (prediction.required_drowsy_frames || 6)) *
                        100
                    )}%`
                  }}
                />
              </div>
            </div>
          )}

          {/* ALARM */}
          <div
            className={`flex items-center gap-4 p-4 rounded-[10px] border transition-all ${
              prediction?.alarm
                ? "bg-[#3A101A]/60 border-[#EF3340]/40 text-[#EF3340] animate-alarm-pulse"
                : "bg-[#13181F] border-white/[0.08]"
            }`}
          >
            <span className="text-xl shrink-0">
              {prediction?.alarm ? "⚠️" : "🔔"}
            </span>

            <div>
              <strong
                className={`text-[13px] font-semibold block ${
                  prediction?.alarm ? "text-[#EF3340]" : "text-[#F3F4F6]"
                }`}
              >
                {prediction?.alarm
                  ? "Drowsiness alert active"
                  : "Alert system ready"}
              </strong>

              <p
                className={`mt-1 text-xs m-0 ${
                  prediction?.alarm ? "text-[#F3F4F6]" : "text-[#858D98]"
                }`}
              >
                {prediction?.alarm
                  ? "Please take a break and stop driving."
                  : "The system will alert you when prolonged drowsiness is detected."}
              </p>
            </div>
          </div>
        </section>

        {/* LIVE CHARTS */}
        <section className="col-span-1 lg:col-span-12 bg-[#0E1217] border border-white/[0.08] rounded-[14px] p-4 sm:p-6 shadow-sm">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-base font-semibold text-[#F3F4F6] m-0">
              Live metrics
            </h2>
            <span className="text-[#858D98] text-[13px]">
              Last 60 measurements
            </span>
          </div>

          <LiveCharts history={history} />
        </section>
      </div>

      {/* FOOTER */}
      <footer className="max-w-[1320px] w-full mx-auto px-4 sm:px-8 py-5 sm:py-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-[#858D98] text-xs border-t border-white/[0.08] mt-auto">
        <span>DriveAlert Driver Safety Platform</span>
        <span>Real-time monitoring system</span>
      </footer>
    </div>
  );
}

export default WorkingModel;
