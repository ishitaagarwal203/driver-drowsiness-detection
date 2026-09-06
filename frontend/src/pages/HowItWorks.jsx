import { useNavigate } from "react-router-dom";

/* ---------- VISUAL COMPONENTS ---------- */

function CameraVisual() {
  return (
    <div className="relative h-36 flex items-center justify-center">
      <div className="w-40 h-24 rounded-2xl bg-[#1A2028] border border-white/10 shadow-xl flex items-center justify-center">
        <div className="w-24 h-16 rounded-xl bg-[#0B0F14] border border-white/10 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-[#111820] border-4 border-[#EF3340]/70 flex items-center justify-center">
            <div className="w-5 h-5 rounded-full bg-[#EF3340]/20 border border-[#EF3340]" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-1 w-24 h-2 rounded-full bg-black/50" />
    </div>
  );
}

function FaceVisual() {
  return (
    <div className="relative h-36 flex items-center justify-center">
      <div className="relative w-28 h-32 rounded-[45%] bg-[#B9A08F]/20 border border-[#EF3340]/50 flex items-center justify-center">
        <div className="absolute top-12 left-7 w-4 h-2 rounded-full bg-[#EF3340]" />
        <div className="absolute top-12 right-7 w-4 h-2 rounded-full bg-[#EF3340]" />
        <div className="absolute top-20 w-8 h-1 bg-white/30 rounded-full" />
        <div className="absolute top-26 w-10 h-2 rounded-full border-b border-[#EF3340]" />

        <div className="absolute inset-[-8px] border border-[#EF3340]/40 rounded-[45%]" />

        {[
          ["top-4 left-10", "bg-[#EF3340]"],
          ["top-9 left-4", "bg-white/60"],
          ["top-9 right-4", "bg-white/60"],
          ["top-18 left-3", "bg-white/50"],
          ["top-18 right-3", "bg-white/50"],
          ["bottom-10 left-7", "bg-white/60"],
          ["bottom-10 right-7", "bg-white/60"],
        ].map(([position, color], index) => (
          <span
            key={index}
            className={`absolute ${position} w-1.5 h-1.5 rounded-full ${color}`}
          />
        ))}
      </div>
    </div>
  );
}

function FeatureVisual() {
  return (
    <div className="h-36 flex items-center justify-center gap-3">
      <div className="w-24 h-24 rounded-xl bg-[#171D25] border border-white/10 flex items-center justify-center">
        <div className="relative w-16 h-12 rounded-[50%] border-2 border-[#EF3340]">
          <div className="absolute w-5 h-5 rounded-full border-2 border-white/70 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          <span className="absolute top-1 left-3 w-1.5 h-1.5 bg-[#EF3340] rounded-full" />
          <span className="absolute top-1 right-3 w-1.5 h-1.5 bg-[#EF3340] rounded-full" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="px-3 py-1.5 rounded-md bg-[#171D25] border border-white/10 text-[10px] text-[#B8BEC8]">
          EAR
        </div>
        <div className="px-3 py-1.5 rounded-md bg-[#171D25] border border-white/10 text-[10px] text-[#B8BEC8]">
          MAR
        </div>
        <div className="px-3 py-1.5 rounded-md bg-[#171D25] border border-white/10 text-[10px] text-[#B8BEC8]">
          Head Pose
        </div>
      </div>
    </div>
  );
}

function RandomForestVisual() {
  return (
    <div className="h-36 flex items-center justify-center">
      <svg
        width="230"
        height="135"
        viewBox="0 0 230 135"
        className="overflow-visible"
      >
        {/* tree 1 */}
        <line x1="35" y1="35" x2="15" y2="65" stroke="#EF3340" />
        <line x1="35" y1="35" x2="55" y2="65" stroke="#EF3340" />
        <line x1="15" y1="65" x2="5" y2="95" stroke="#777" />
        <line x1="15" y1="65" x2="25" y2="95" stroke="#777" />
        <line x1="55" y1="65" x2="45" y2="95" stroke="#777" />
        <line x1="55" y1="65" x2="65" y2="95" stroke="#777" />

        {/* tree 2 */}
        <line x1="115" y1="25" x2="95" y2="55" stroke="#EF3340" />
        <line x1="115" y1="25" x2="135" y2="55" stroke="#EF3340" />
        <line x1="95" y1="55" x2="85" y2="85" stroke="#777" />
        <line x1="95" y1="55" x2="105" y2="85" stroke="#777" />
        <line x1="135" y1="55" x2="125" y2="85" stroke="#777" />
        <line x1="135" y1="55" x2="145" y2="85" stroke="#777" />

        {/* tree 3 */}
        <line x1="195" y1="35" x2="175" y2="65" stroke="#EF3340" />
        <line x1="195" y1="35" x2="215" y2="65" stroke="#EF3340" />
        <line x1="175" y1="65" x2="165" y2="95" stroke="#777" />
        <line x1="175" y1="65" x2="185" y2="95" stroke="#777" />
        <line x1="215" y1="65" x2="205" y2="95" stroke="#777" />
        <line x1="215" y1="65" x2="225" y2="95" stroke="#777" />

        {[35, 115, 195].map((x) => (
          <circle
            key={x}
            cx={x}
            cy={x === 115 ? 25 : 35}
            r="7"
            fill="#EF3340"
          />
        ))}

        {[15, 55, 95, 135, 175, 215].map((x, index) => (
          <circle
            key={index}
            cx={x}
            cy={index < 2 ? 65 : index < 4 ? 55 : 65}
            r="5"
            fill="#B8BEC8"
          />
        ))}

        <text
          x="115"
          y="125"
          textAnchor="middle"
          fill="#858D98"
          fontSize="10"
        >
          Ensemble of decision trees
        </text>
      </svg>
    </div>
  );
}

function PredictionVisual() {
  return (
    <div className="h-36 flex items-center justify-center">
      <div className="w-52 space-y-2">
        <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-[#151B22] border border-white/10">
          <span className="w-3 h-3 rounded-full border border-[#858D98]" />
          <span className="text-xs text-[#B8BEC8]">Awake</span>
        </div>

        <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-[#EF3340]/15 border border-[#EF3340]/50">
          <span className="w-3 h-3 rounded-full bg-[#EF3340]" />
          <span className="text-xs font-semibold text-white">Drowsy</span>
        </div>

        <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-[#151B22] border border-white/10">
          <span className="w-3 h-3 rounded-full border border-[#858D98]" />
          <span className="text-xs text-[#B8BEC8]">Yawning</span>
        </div>
      </div>
    </div>
  );
}

function AlertVisual() {
  return (
    <div className="h-36 flex items-center justify-center">
      <div className="relative w-24 h-24 rounded-full bg-[#EF3340]/10 border border-[#EF3340]/50 flex items-center justify-center">
        <div className="text-5xl text-[#EF3340]">!</div>
        <div className="absolute inset-[-10px] rounded-full border border-[#EF3340]/20 animate-pulse" />
      </div>
    </div>
  );
}

/* ---------- MAIN PAGE ---------- */

function HowItWorks() {
  const navigate = useNavigate();

  const steps = [
    {
      number: "01",
      title: "Introduction",
      description: "Real-time driver monitoring",
      visual: (
        <div className="h-36 flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl mb-3">🚗</div>
            <div className="text-xs text-[#858D98]">Driver Safety</div>
          </div>
        </div>
      ),
    },
    {
      number: "02",
      title: "Camera Input",
      description: "Live video frames",
      visual: <CameraVisual />,
    },
    {
      number: "03",
      title: "Face Detection",
      description: "Facial landmarks",
      visual: <FaceVisual />,
    },
    {
      number: "04",
      title: "Feature Extraction",
      description: "Eye, mouth & head features",
      visual: <FeatureVisual />,
    },
    {
      number: "05",
      title: "ML Prediction",
      description: "Random Forest classifier",
      visual: <RandomForestVisual />,
    },
    {
      number: "06",
      title: "Drowsiness Confirmation",
      description: "Prediction analyzed over time",
      visual: (
        <div className="h-36 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="w-12 h-16 rounded-lg bg-[#171D25] border border-white/10" />
            <div className="w-12 h-16 rounded-lg bg-[#171D25] border border-[#EF3340]/40" />
            <div className="w-12 h-16 rounded-lg bg-[#171D25] border border-[#EF3340]/60" />
          </div>
        </div>
      ),
    },
    {
      number: "07",
      title: "Alert",
      description: "Driver safety warning",
      visual: <AlertVisual />,
    },
  ];

  const eyeFeatures = [
    "Average EAR",
    "PERCLOS",
    "Blink Rate",
    "Closure Duration",
  ];

  const mouthFeatures = ["MAR", "Yawn Duration"];

  const headFeatures = ["Pitch", "Yaw", "Roll"];

  return (
    <div className="flex-1 min-h-full">
      <main className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">

        {/* HERO */}

        <section className="relative overflow-hidden bg-[#0E1217] border border-white/[0.08] rounded-[16px] p-6 sm:p-8">
          <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-[#EF3340]/10 to-transparent pointer-events-none" />

          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <p className="text-xs font-bold text-[#EF3340] uppercase tracking-[0.18em]">
                How DriveAlert Works
              </p>

              <h1 className="text-3xl sm:text-4xl font-bold text-[#F3F4F6] mt-3 tracking-tight">
                From Camera to Safety Alert
              </h1>

              <p className="text-sm text-[#858D98] mt-3 max-w-xl">
                A visual walkthrough of how driver behavior is analyzed using
                computer vision and a Random Forest machine learning model.
              </p>
            </div>

            <div className="relative w-full lg:w-[360px] h-40 rounded-xl bg-[#111820] border border-white/10 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#EF3340]/10 to-transparent" />

              <div className="absolute right-10 top-5 w-24 h-28 rounded-[45%] bg-[#B9A08F]/15 border border-[#EF3340]/40" />

              <div className="absolute right-[82px] top-[65px] w-4 h-2 rounded-full bg-[#EF3340]" />
              <div className="absolute right-[45px] top-[65px] w-4 h-2 rounded-full bg-[#EF3340]" />

              <div className="absolute left-6 bottom-5 text-xs font-semibold text-[#EF3340]">
                STAY ALERT
              </div>

              <div className="absolute left-6 bottom-2 text-[10px] text-[#858D98]">
                DRIVE SAFE
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="absolute top-6 right-6 px-4 py-2 rounded-lg bg-[#13181F] border border-white/10 text-sm font-medium text-[#F3F4F6] hover:bg-[#1A2028] transition"
            >
              ← Back
            </button>
          </div>
        </section>

        {/* PIPELINE */}

        <section className="bg-[#0E1217] border border-white/[0.08] rounded-[16px] p-6 sm:p-8">
          <p className="text-xs font-semibold text-[#858D98] uppercase tracking-wider">
            Detection Pipeline
          </p>

          <h2 className="text-xl font-bold text-[#F3F4F6] mt-1">
            See how each frame is processed
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3 mt-6">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                <div
                  className={`h-full min-h-[250px] rounded-xl p-4 border ${
                    step.number === "05"
                      ? "border-[#EF3340]/60 bg-[#EF3340]/10"
                      : "border-white/[0.08] bg-[#13181F]"
                  }`}
                >
                  <div className="text-xl font-bold text-[#EF3340]">
                    {step.number}
                  </div>

                  <h3 className="text-xs font-bold text-[#F3F4F6] mt-2">
                    {step.title}
                  </h3>

                  {step.visual}

                  <p className="text-[10px] text-[#858D98] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 translate-x-1/2 text-[#EF3340] z-10">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* SEVEN STEPS */}

        <section>
          <p className="text-xs font-semibold text-[#858D98] uppercase tracking-wider">
            Seven Steps
          </p>

          <h2 className="text-xl font-bold text-[#F3F4F6] mt-1">
            System workflow
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
            {steps.map((step) => (
              <div
                key={step.number}
                className="bg-[#0E1217] border border-white/[0.08] rounded-[14px] overflow-hidden hover:border-[#EF3340]/40 transition"
              >
                <div className="px-5 pt-4">
                  <span className="text-lg font-bold text-[#EF3340]">
                    {step.number}
                  </span>

                  <h3 className="text-sm font-bold text-[#F3F4F6] mt-1">
                    {step.title}
                  </h3>
                </div>

                <div className="px-3">{step.visual}</div>

                <div className="px-5 pb-5">
                  <p className="text-xs text-[#858D98]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURE EXTRACTION */}

        <section className="bg-[#0E1217] border border-white/[0.08] rounded-[16px] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-[#EF3340] uppercase tracking-wider">
                Step 04
              </p>

              <h2 className="text-xl sm:text-2xl font-bold text-[#F3F4F6] mt-1">
                Feature Extraction
              </h2>
            </div>

            <div className="text-sm text-[#858D98]">
              <span className="text-white font-bold">9</span> input features
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

            {/* EYE */}

            <div className="bg-[#13181F] border border-white/[0.08] rounded-xl p-5">
              <div className="h-28 flex items-center justify-center mb-4">
                <div className="relative w-40 h-20 rounded-[50%] border-2 border-[#EF3340]/70">
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-4 border-white/50">
                    <div className="absolute inset-3 rounded-full bg-[#EF3340]/50" />
                  </div>

                  <span className="absolute top-2 left-5 w-2 h-2 rounded-full bg-[#EF3340]" />
                  <span className="absolute top-2 right-5 w-2 h-2 rounded-full bg-[#EF3340]" />
                  <span className="absolute bottom-2 left-12 w-2 h-2 rounded-full bg-white/50" />
                  <span className="absolute bottom-2 right-12 w-2 h-2 rounded-full bg-white/50" />
                </div>
              </div>

              <h3 className="text-sm font-bold text-[#F3F4F6]">
                Eye Features
              </h3>

              <p className="text-xs text-[#858D98] mt-1">
                4 signals
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                {eyeFeatures.map((feature) => (
                  <span
                    key={feature}
                    className="px-2 py-1 rounded-md bg-[#0E1217] border border-white/10 text-[10px] text-[#B8BEC8]"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* MOUTH */}

            <div className="bg-[#13181F] border border-white/[0.08] rounded-xl p-5">
              <div className="h-28 flex items-center justify-center mb-4">
                <div className="w-32 h-16 rounded-[50%] border-2 border-[#EF3340]/70 flex items-center justify-center">
                  <div className="w-16 h-7 rounded-[50%] bg-[#EF3340]/20 border border-[#EF3340]" />
                </div>
              </div>

              <h3 className="text-sm font-bold text-[#F3F4F6]">
                Mouth Features
              </h3>

              <p className="text-xs text-[#858D98] mt-1">
                2 signals
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                {mouthFeatures.map((feature) => (
                  <span
                    key={feature}
                    className="px-2 py-1 rounded-md bg-[#0E1217] border border-white/10 text-[10px] text-[#B8BEC8]"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* HEAD POSE */}

            <div className="bg-[#13181F] border border-white/[0.08] rounded-xl p-5">
              <div className="h-28 flex items-center justify-center mb-4">
                <div className="relative w-24 h-24 rounded-full border border-white/20 bg-white/[0.02]">
                  <div className="absolute left-1/2 top-1/2 w-16 h-px bg-[#EF3340] origin-left rotate-12" />
                  <div className="absolute left-1/2 top-1/2 w-14 h-px bg-green-400 origin-left rotate-[-20deg]" />
                  <div className="absolute left-1/2 top-1/2 w-12 h-px bg-blue-400 origin-left rotate-90" />

                  <div className="absolute left-1/2 top-1/2 w-2 h-2 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />

                  <span className="absolute right-0 top-2 text-[9px] text-[#EF3340]">
                    Yaw
                  </span>

                  <span className="absolute right-1 bottom-4 text-[9px] text-green-400">
                    Pitch
                  </span>

                  <span className="absolute left-1 bottom-1 text-[9px] text-blue-400">
                    Roll
                  </span>
                </div>
              </div>

              <h3 className="text-sm font-bold text-[#F3F4F6]">
                Head Pose
              </h3>

              <p className="text-xs text-[#858D98] mt-1">
                3 signals
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                {headFeatures.map((feature) => (
                  <span
                    key={feature}
                    className="px-2 py-1 rounded-md bg-[#0E1217] border border-white/10 text-[10px] text-[#B8BEC8]"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* RANDOM FOREST */}

        <section className="bg-[#0E1217] border border-[#EF3340]/40 rounded-[16px] p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row items-center gap-8">

            <div className="w-full lg:w-[45%]">
              <p className="text-xs font-bold text-[#EF3340] uppercase tracking-wider">
                Step 05 · Machine Learning
              </p>

              <h2 className="text-2xl font-bold text-[#F3F4F6] mt-2">
                Random Forest Classifier
              </h2>

              <p className="text-sm text-[#858D98] mt-3 max-w-xl">
                The extracted features are provided to a Random Forest
                classifier, which predicts the driver's current state.
              </p>
            </div>

            <div className="flex-1 w-full bg-[#13181F] rounded-xl border border-white/10 p-4">
              <RandomForestVisual />

              <div className="flex items-center justify-center gap-2 flex-wrap mt-2">
                <span className="px-3 py-2 rounded-md bg-[#0E1217] border border-white/10 text-xs">
                  9 Input Features
                </span>

                <span className="text-[#EF3340]">→</span>

                <span className="px-3 py-2 rounded-md bg-[#EF3340]/10 border border-[#EF3340]/40 text-xs font-bold">
                  Random Forest
                </span>

                <span className="text-[#EF3340]">→</span>

                <span className="px-3 py-2 rounded-md bg-[#0E1217] border border-white/10 text-xs">
                  Driver Label
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* MODEL OUTPUT */}

        <section>
          <p className="text-xs font-semibold text-[#858D98] uppercase tracking-wider">
            Model Output
          </p>

          <h2 className="text-xl font-bold text-[#F3F4F6] mt-1">
            Driver states
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">

            <div className="bg-[#0E1217] border border-white/10 rounded-xl p-5">
              <div className="h-24 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border-2 border-green-400 flex items-center justify-center text-2xl text-green-400">
                  ✓
                </div>
              </div>

              <h3 className="text-sm font-bold text-[#F3F4F6]">
                AWAKE
              </h3>

              <p className="text-xs text-[#858D98] mt-1">
                Driver appears alert
              </p>
            </div>

            <div className="bg-[#0E1217] border border-[#EF3340]/50 rounded-xl p-5">
              <div className="h-24 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border-2 border-[#EF3340] bg-[#EF3340]/10 flex items-center justify-center text-2xl text-[#EF3340]">
                  !
                </div>
              </div>

              <h3 className="text-sm font-bold text-[#F3F4F6]">
                DROWSY
              </h3>

              <p className="text-xs text-[#858D98] mt-1">
                Signs of drowsiness detected
              </p>
            </div>

            <div className="bg-[#0E1217] border border-white/10 rounded-xl p-5">
              <div className="h-24 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border-2 border-[#858D98] flex items-center justify-center text-2xl text-[#B8BEC8]">
                  ◌
                </div>
              </div>

              <h3 className="text-sm font-bold text-[#F3F4F6]">
                YAWNING
              </h3>

              <p className="text-xs text-[#858D98] mt-1">
                Yawning behavior detected
              </p>
            </div>
          </div>
        </section>

        {/* CONFIRMATION + ALERT */}

        <section className="bg-[#0E1217] border border-[#EF3340]/40 rounded-[16px] p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row items-center gap-7">

            <div className="w-full lg:w-[45%]">
              <p className="text-xs font-bold text-[#EF3340] uppercase tracking-wider">
                Step 06 → Step 07
              </p>

              <h2 className="text-2xl font-bold text-[#F3F4F6] mt-2">
                Confirmation → Alert
              </h2>

              <p className="text-sm text-[#858D98] mt-3 max-w-xl">
                Predictions are evaluated over time. When a concerning driver
                state is confirmed, the safety alert mechanism can warn the
                driver.
              </p>
            </div>

            <div className="flex-1 w-full">
              <div className="flex items-center justify-center gap-2">
                <div className="w-20 h-20 rounded-xl bg-[#13181F] border border-white/10" />
                <div className="h-px w-8 bg-[#EF3340]" />
                <div className="w-20 h-20 rounded-xl bg-[#EF3340]/10 border border-[#EF3340]/40" />
                <div className="h-px w-8 bg-[#EF3340]" />
                <div className="w-20 h-20 rounded-xl bg-[#EF3340]/15 border border-[#EF3340]/60 flex items-center justify-center text-3xl text-[#EF3340]">
                  !
                </div>
              </div>

              <div className="flex justify-center mt-5">
                <div className="px-6 py-3 rounded-lg bg-[#EF3340]/10 border border-[#EF3340]/40 text-center">
                  <p className="text-[10px] text-[#EF3340] uppercase tracking-wider font-bold">
                    Safety
                  </p>
                  <p className="text-sm font-bold text-[#F3F4F6] mt-1">
                    Alert Ready
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}

        <footer className="border-t border-white/[0.08] pt-5 pb-3 flex flex-col sm:flex-row justify-between gap-2 text-xs text-[#858D98]">
          <span>DriveAlert Driver Safety Platform</span>
          <span>Computer Vision · Random Forest · Driver Safety</span>
        </footer>
      </main>
    </div>
  );
}

export default HowItWorks;