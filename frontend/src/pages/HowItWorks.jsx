import { useNavigate } from "react-router-dom";

function HowItWorks() {
  const navigate = useNavigate();

  const sections = [
    {
      number: "01",
      title: "Introduction",
      description:
        "DriveAlert is a real-time driver monitoring system designed to identify signs of driver drowsiness. It combines computer vision, facial analysis, and machine learning to continuously assess the driver's alertness.",
    },
    {
      number: "02",
      title: "Camera Input",
      description:
        "The driver-facing camera continuously captures video frames during the monitoring session. These frames provide the visual input required for analyzing the driver's face and behavior.",
    },
    {
      number: "03",
      title: "Face Detection",
      description:
        "The system processes each captured frame to detect the driver's face and identify important facial landmarks around the eyes and mouth.",
    },
    {
      number: "04",
      title: "Feature Extraction",
      description:
        "Facial landmarks are used to calculate important measurements such as Eye Aspect Ratio (EAR), Mouth Aspect Ratio (MAR), and PERCLOS. These features provide signals related to eye closure, blinking, and yawning.",
      features: ["EAR", "MAR", "PERCLOS", "BLINK RATE"],
    },
    {
      number: "05",
      title: "ML Prediction",
      description:
        "The extracted facial features are passed to the machine learning system. The model analyzes these features and predicts the driver's current state and level of drowsiness.",
    },
    {
      number: "06",
      title: "Drowsiness Confirmation",
      description:
        "The system analyzes predictions over time instead of relying on a single frame. Persistent drowsiness patterns are confirmed before an alert is triggered, helping reduce false alarms.",
    },
    {
      number: "07",
      title: "Alert",
      description:
        "When drowsiness is confirmed, DriveAlert activates the warning system. Audible and visual alerts notify the driver that they should pay attention or take a break.",
    },
  ];

  const metrics = [
    {
      label: "EAR",
      title: "Eye Aspect Ratio",
      description:
        "Helps monitor eye closure and blinking patterns.",
    },
    {
      label: "MAR",
      title: "Mouth Aspect Ratio",
      description:
        "Helps identify mouth opening and yawning patterns.",
    },
    {
      label: "PERCLOS",
      title: "Eyelid Closure",
      description:
        "Measures prolonged eye closure over a period of time.",
    },
    {
      label: "ML",
      title: "Machine Learning",
      description:
        "Uses extracted features to estimate driver state.",
    },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-full">

      {/* =====================================================
          MAIN
      ===================================================== */}
      <main className="w-full max-w-[1320px] mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6">

        {/* ===================================================
            PAGE HEADER
        =================================================== */}
        <section className="bg-[#0E1217] border border-white/[0.08] rounded-[14px] p-6 sm:p-8">

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">

            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#EF3340] uppercase tracking-wider mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EF3340]" />
                <span>Architecture & Process</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-[#F3F4F6] tracking-tight">
                How It Works
              </h2>

              <p className="text-sm text-[#858D98] mt-2 max-w-2xl leading-relaxed">
                Learn how DriveAlert captures driver information, analyzes
                facial features, predicts drowsiness, and generates safety
                alerts in real time.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="shrink-0 px-4 py-2 rounded-[8px]
                         bg-[#13181F]
                         border border-white/[0.10]
                         text-[#F3F4F6]
                         text-sm font-medium
                         hover:bg-[#1A2028]
                         transition-colors"
            >
              ← Back to Dashboard
            </button>

          </div>

        </section>


        {/* ===================================================
            PROCESS FLOW
        =================================================== */}
        <section className="bg-[#0E1217] border border-white/[0.08] rounded-[14px] p-6 sm:p-8">

          <div className="mb-6">

            <p className="text-xs font-semibold text-[#858D98] uppercase tracking-wider">
              Detection pipeline
            </p>

            <h3 className="text-lg sm:text-xl font-semibold text-[#F3F4F6] mt-1">
              From camera input to driver alert
            </h3>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">

            {sections.map((section, index) => (
              <div key={section.number} className="relative">

                <div className="h-full bg-[#13181F] border border-white/[0.08] rounded-[10px] p-4">

                  <div className="flex items-center justify-between mb-4">

                    <span className="text-xs font-mono font-semibold text-[#EF3340]">
                      {section.number}
                    </span>

                    <span className="w-1.5 h-1.5 rounded-full bg-[#858D98]" />

                  </div>

                  <h4 className="text-sm font-semibold text-[#F3F4F6]">
                    {section.title}
                  </h4>

                </div>

                {index < sections.length - 1 && (
                  <span className="hidden lg:block absolute top-1/2 -right-2 text-[#555D68] text-xs">
                    →
                  </span>
                )}

              </div>
            ))}

          </div>

        </section>


        {/* ===================================================
            SEVEN STEPS
        =================================================== */}
        <section>

          <div className="mb-4">

            <p className="text-xs font-semibold text-[#858D98] uppercase tracking-wider">
              System workflow
            </p>

            <h3 className="text-lg sm:text-xl font-semibold text-[#F3F4F6] mt-1">
              How the detection process works
            </h3>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {sections.map((section) => (
              <article
                key={section.number}
                className="group bg-[#0E1217]
                           border border-white/[0.08]
                           rounded-[14px]
                           p-5 sm:p-6
                           min-h-[230px]
                           flex flex-col
                           transition-colors
                           hover:border-[#EF3340]/30"
              >

                <div className="flex items-center justify-between mb-5">

                  <span className="text-2xl font-bold font-mono text-[#EF3340] tracking-wider">
                    {section.number}
                  </span>

                  <span className="w-2 h-2 rounded-full bg-white/[0.10] group-hover:bg-[#EF3340] transition-colors" />

                </div>


                <h4 className="text-base font-semibold text-[#F3F4F6]">
                  {section.title}
                </h4>


                <p className="text-[13px] leading-relaxed text-[#858D98] mt-3">
                  {section.description}
                </p>


                {section.features && (
                  <div className="flex flex-wrap gap-2 mt-4">

                    {section.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-2.5 py-1 rounded-[6px]
                                   bg-[#13181F]
                                   border border-white/[0.08]
                                   text-[10px]
                                   font-semibold
                                   tracking-wide
                                   text-[#B8BEC8]"
                      >
                        {feature}
                      </span>
                    ))}

                  </div>
                )}


                <div className="mt-auto pt-5">

                  <div className="h-1 w-8 rounded-full bg-white/[0.08] group-hover:bg-[#EF3340] transition-colors" />

                </div>

              </article>
            ))}

          </div>

        </section>


        {/* ===================================================
            KEY METRICS
        =================================================== */}
        <section className="bg-[#0E1217] border border-white/[0.08] rounded-[14px] p-6 sm:p-8">

          <div className="mb-6">

            <p className="text-xs font-semibold text-[#858D98] uppercase tracking-wider">
              Detection signals
            </p>

            <h3 className="text-lg sm:text-xl font-semibold text-[#F3F4F6] mt-1">
              Key metrics used by the system
            </h3>

            <p className="text-sm text-[#858D98] mt-2 max-w-2xl">
              These signals help the system understand changes in eye,
              mouth, and facial behavior during monitoring.
            </p>

          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="bg-[#13181F]
                           border border-white/[0.08]
                           rounded-[10px]
                           p-5"
              >

                <div className="flex items-center justify-between mb-5">

                  <span className="text-lg font-bold font-mono text-[#F3F4F6]">
                    {metric.label}
                  </span>

                  <span className="w-2 h-2 rounded-full bg-[#858D98]" />

                </div>

                <h4 className="text-sm font-semibold text-[#F3F4F6]">
                  {metric.title}
                </h4>

                <p className="text-xs leading-relaxed text-[#858D98] mt-2">
                  {metric.description}
                </p>

              </div>
            ))}

          </div>

        </section>


        {/* ===================================================
            CTA
        =================================================== */}
        <section className="bg-[#0E1217]
                            border border-white/[0.08]
                            rounded-[14px]
                            p-6 sm:p-8
                            flex flex-col sm:flex-row
                            sm:items-center
                            justify-between
                            gap-5">

          <div>

            <p className="text-sm font-semibold text-[#F3F4F6]">
              Ready to start monitoring?
            </p>

            <p className="text-xs text-[#858D98] mt-1">
              Return to the dashboard and start a driver monitoring session.
            </p>

          </div>


          <button
            type="button"
            onClick={() => navigate("/")}
            className="shrink-0 px-5 py-2.5 rounded-[8px]
                       bg-[#EF3340]
                       hover:bg-[#D92F3A]
                       text-white
                       text-sm font-medium
                       transition-colors"
          >
            Open monitoring
          </button>

        </section>

      </main>


      {/* =====================================================
          FOOTER
      ===================================================== */}
      <footer className="max-w-[1320px] w-full mx-auto px-4 sm:px-8 py-5 sm:py-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-[#858D98] text-xs border-t border-white/[0.08] mt-auto">

        <span>
          DriveAlert Driver Safety Platform
        </span>

        <span>
          Real-time monitoring system
        </span>

      </footer>

    </div>
  );
}

export default HowItWorks;