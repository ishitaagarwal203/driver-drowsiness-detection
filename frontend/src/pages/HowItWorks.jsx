function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Camera capture",
      description:
        "The driver-facing camera captures real-time video frames continuously during the driving session to monitor facial cues."
    },
    {
      number: "02",
      title: "Facial feature extraction",
      description:
        "Computer vision algorithms detect key facial landmarks to calculate metrics such as Eye Aspect Ratio (EAR), Mouth Aspect Ratio (MAR), and PERCLOS (percentage of eyelid closure)."
    },
    {
      number: "03",
      title: "Temporal analysis",
      description:
        "Metrics are analyzed over sliding time windows to distinguish normal blinking or yawning from sustained fatigue and drowsiness patterns."
    },
    {
      number: "04",
      title: "Driver state detection",
      description:
        "The system determines the driver's current cognitive state: Awake, Drowsy, Yawning, or No face detected, with confidence scoring."
    },
    {
      number: "05",
      title: "Safety alert",
      description:
        "When persistent drowsiness exceeds confirmation thresholds, the system triggers audible and visual alarms to prompt the driver to take a break."
    }
  ];

  return (
    <div className="flex-1 flex flex-col justify-between">
      <div className="w-full max-w-[1320px] mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
        {/* PAGE HEADER */}
        <div className="bg-[#0E1217] border border-white/[0.08] rounded-[14px] p-6 sm:p-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#EF3340] uppercase tracking-wider mb-2">
            <span>Architecture & Process</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#F3F4F6] tracking-tight m-0">
            How It Works
          </h2>
          <p className="text-sm text-[#858D98] mt-2 max-w-2xl">
            DriveAlert monitors driver alertness in real-time through continuous vision processing, feature extraction, temporal analysis, and multi-stage alerting.
          </p>
        </div>

        {/* WORKFLOW STEPS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-[#0E1217] border border-white/[0.08] rounded-[14px] p-5 sm:p-6 flex flex-col justify-between gap-4"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-[#EF3340] font-mono tracking-wider">
                    {step.number}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-white/[0.1]" />
                </div>
                <h3 className="text-base font-semibold text-[#F3F4F6] mb-2">
                  {step.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-[#858D98] m-0">
                  {step.description}
                </p>
              </div>
              <div className="h-1 w-8 bg-white/[0.08] rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="max-w-[1320px] w-full mx-auto px-4 sm:px-8 py-5 sm:py-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-[#858D98] text-xs border-t border-white/[0.08] mt-auto">
        <span>DriveAlert Driver Safety Platform</span>
        <span>Real-time monitoring system</span>
      </footer>
    </div>
  );
}

export default HowItWorks;
