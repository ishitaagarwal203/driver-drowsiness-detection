import {
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";

import WebcamView from "./components/WebcamView";
import LiveCharts from "./components/LiveCharts";

import "./App.css";


function App() {

  const [prediction, setPrediction] =
    useState(null);

  const [history, setHistory] =
    useState([]);

  const [monitoring, setMonitoring] =
    useState(false);

  const [sessionSeconds, setSessionSeconds] =
    useState(0);

  const alarmAudioRef = useRef(null);


  // ==================================================
  // SESSION TIMER
  // ==================================================

  useEffect(() => {

    if (!monitoring) {

      return;

    }

    const timer = setInterval(() => {

      setSessionSeconds(
        (previous) => previous + 1
      );

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

  const time =
    now.toLocaleTimeString(
      [],
      {
        minute: "2-digit",
        second: "2-digit"
      }
    );

  const newPoint = {

    time,

    drowsyScore:
      Number(
        data.drowsy_score || 0
      ),

    ear:
      Number(
        data.features.average_ear || 0
      ),

    perclos:
      Number(
        data.features.perclos || 0
      ),

    mar:
      Number(
        data.features.mar || 0
      )

  };


  setHistory(
    previous => {

      const updated = [
        ...previous,
        newPoint
      ];

      // Keep only the latest 60 points
      return updated.slice(-60);

    }
  );

}, []);

  // ==================================================
  // ALARM
  // ==================================================

  useEffect(() => {

    if (!alarmAudioRef.current) {

      alarmAudioRef.current =
        new Audio(
          "/sounds/alarm.mp3"
        );

      alarmAudioRef.current.loop =
        true;

    }

    const audio =
      alarmAudioRef.current;


    if (
      monitoring &&
      prediction?.alarm
    ) {

      audio.play().catch(
        (error) => {

          console.log(
            "Audio playback blocked:",
            error
          );

        }
      );

    } else {

      audio.pause();

      audio.currentTime = 0;

    }


    return () => {

      audio.pause();

      audio.currentTime = 0;

    };

  }, [
    monitoring,
    prediction?.alarm
  ]);


  // ==================================================
  // START / STOP
  // ==================================================

  const toggleMonitoring = () => {

  setMonitoring(
    previous => {

      const next =
        !previous;

      if (next) {

        setHistory([]);

        setPrediction(null);

        setSessionSeconds(0);

      }

      return next;

    }
  );

};


  // ==================================================
  // FORMAT TIME
  // ==================================================

  const formatTime = (seconds) => {

    const minutes =
      Math.floor(seconds / 60);

    const remainingSeconds =
      seconds % 60;

    return `${String(minutes).padStart(
      2,
      "0"
    )}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;

  };


  // ==================================================
  // CURRENT STATE
  // ==================================================

  const currentState =
    prediction?.state || "waiting";


  const stateLabel = {

    awake: "AWAKE",

    drowsy: "DROWSY",

    yawning: "YAWNING",

    no_face: "NO FACE",

    waiting: "WAITING"

  }[currentState];


  // ==================================================
  // RENDER
  // ==================================================

  return (

    <div className="app">

      {/* ============================================
          HEADER
      ============================================ */}

      <header className="topbar">

        <div>

          <h1>
            Driver Drowsiness Detection
          </h1>

          <p>
            Real-time driver monitoring system
          </p>

        </div>


        <div
          className={
            monitoring
              ? "live-status active"
              : "live-status"
          }
        >

          <span className="status-dot">
            ●
          </span>

          {monitoring
            ? "LIVE"
            : "OFFLINE"}

        </div>

      </header>


      {/* ============================================
          MAIN DASHBOARD
      ============================================ */}

      <main className="dashboard">


        {/* ==========================================
            LEFT SIDE
        ========================================== */}

        <section className="camera-panel">

          <div className="panel-header">

            <h2>
              Driver Camera
            </h2>

            <span>
              Session:{" "}
              {formatTime(
                sessionSeconds
              )}
            </span>

          </div>


          <WebcamView
            monitoring={monitoring}
            onPrediction={handlePrediction}
          />


          <button
            className={
              monitoring
                ? "stop-button"
                : "start-button"
            }
            onClick={
              toggleMonitoring
            }
          >

            {monitoring
              ? "STOP MONITORING"
              : "START MONITORING"}

          </button>

        </section>


        {/* ==========================================
            RIGHT SIDE
        ========================================== */}

        <section className="status-panel">

          <div className="panel-header">

            <h2>
              Driver Status
            </h2>

          </div>


          {/* STATE */}

          <div
            className={`state-card ${currentState}`}
          >

            <div className="state-icon">

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

              <span>
                CURRENT STATE
              </span>

              <h2>
                {stateLabel}
              </h2>

            </div>

          </div>


          {/* METRICS */}

          <div className="metrics-grid">


            <div className="metric-card">

              <span>
                CONFIDENCE
              </span>

              <strong>
                {prediction
                  ? `${(
                      prediction.confidence *
                      100
                    ).toFixed(1)}%`
                  : "--"}
              </strong>

            </div>


            <div className="metric-card">

              <span>
                DROWSINESS SCORE
              </span>

              <strong>
                {prediction
                  ? `${(
                      prediction.drowsy_score *
                      100
                    ).toFixed(1)}%`
                  : "--"}
              </strong>

            </div>


            <div className="metric-card">

              <span>
                EAR
              </span>

              <strong>
                {prediction?.features
                  ?.average_ear !==
                undefined
                  ? prediction.features.average_ear.toFixed(
                      3
                    )
                  : "--"}
              </strong>

            </div>


            <div className="metric-card">

              <span>
                PERCLOS
              </span>

              <strong>
                {prediction?.features
                  ?.perclos !==
                undefined
                  ? `${(
                      prediction.features.perclos *
                      100
                    ).toFixed(1)}%`
                  : "--"}
              </strong>

            </div>


            <div className="metric-card">

              <span>
                MAR
              </span>

              <strong>
                {prediction?.features
                  ?.mar !==
                undefined
                  ? prediction.features.mar.toFixed(
                      3
                    )
                  : "--"}
              </strong>

            </div>


            <div className="metric-card">

              <span>
                BLINK RATE
              </span>

              <strong>
                {prediction?.features
                  ?.blink_rate !==
                undefined
                  ? prediction.features.blink_rate.toFixed(
                      1
                    )
                  : "--"}
              </strong>

            </div>

          </div>


          {/* DROWSINESS CONFIRMATION */}

          {prediction && (

            <div className="confirmation-panel">

              <div className="confirmation-header">

                <span>
                  DROWSINESS CONFIRMATION
                </span>

                <strong>
                  {prediction.drowsy_frames || 0}
                  /
                  {prediction.required_drowsy_frames || 6}
                </strong>

              </div>


              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{
                    width: `${
                      Math.min(
                        100,
                        (
                          (prediction.drowsy_frames || 0) /
                          (
                            prediction.required_drowsy_frames ||
                            6
                          )
                        ) *
                        100
                      )
                    }%`
                  }}
                />

              </div>

            </div>

          )}


          {/* ALARM */}

          <div
            className={
              prediction?.alarm
                ? "alarm-box active"
                : "alarm-box"
            }
          >

            <span>

              {prediction?.alarm
                ? "⚠️"
                : "🔔"}

            </span>


            <div>

              <strong>

                {prediction?.alarm
                  ? "DROWSINESS ALARM ACTIVE"
                  : "Alarm System Ready"}

              </strong>

              <p>

                {prediction?.alarm
                  ? "Please take a break and stop driving."
                  : "The system will alert you when prolonged drowsiness is detected."}

              </p>

            </div>

          </div>

        </section>
        <section className="charts-container">

  <div className="charts-header">

    <h2>
      Live ML Metrics
    </h2>

    <span>
      Last 60 measurements
    </span>

  </div>

  <LiveCharts
    history={history}
  />

</section>

      </main>


      <footer>

        <span>
          ML-powered driver monitoring
        </span>

        <span>
          MediaPipe • FastAPI • React
        </span>

      </footer>

    </div>

  );

}


export default App;