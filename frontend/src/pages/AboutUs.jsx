function AboutUs() {
  const sections = [
    {
      title: "Mission",
      tagline: "Preventing fatigue-related road incidents",
      description:
        "DriveAlert is dedicated to enhancing driver safety by providing real-time cognitive state awareness. By alerting drivers at the earliest signs of fatigue, the system helps mitigate the risks associated with drowsy driving."
    },
    {
      title: "Technology",
      tagline: "Vision-based intelligent monitoring",
      description:
        "The platform utilizes computer vision techniques to assess facial landmarks, blink duration, eye aspect ratio, and yawning patterns in real-time to compute drowsiness scores."
    },
    {
      title: "Safety First",
      tagline: "Driver-centric warning system",
      description:
        "Designed to assist rather than distract, DriveAlert features multi-tiered confirmation safeguards to minimize false alarms and deliver clear warnings when attention is compromised."
    }
  ];

  return (
    <div className="flex-1 flex flex-col justify-between">
      <div className="w-full max-w-[1320px] mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
        {/* PAGE HEADER */}
        <div className="bg-[#0E1217] border border-white/[0.08] rounded-[14px] p-6 sm:p-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#EF3340] uppercase tracking-wider mb-2">
            <span>Platform Overview</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#F3F4F6] tracking-tight m-0">
            About DriveAlert
          </h2>
          <p className="text-sm text-[#858D98] mt-2 max-w-2xl">
            Driver safety through intelligent monitoring. Real-time vision-based driver drowsiness detection and alerting.
          </p>
        </div>

        {/* CONTENT PILLARS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {sections.map((section) => (
            <div
              key={section.title}
              className="bg-[#0E1217] border border-white/[0.08] rounded-[14px] p-5 sm:p-6 flex flex-col justify-between gap-4"
            >
              <div>
                <h3 className="text-base font-semibold text-[#F3F4F6] mb-1">
                  {section.title}
                </h3>
                <span className="text-xs font-medium text-[#EF3340] block mb-3">
                  {section.tagline}
                </span>
                <p className="text-[13px] leading-relaxed text-[#858D98] m-0">
                  {section.description}
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

export default AboutUs;
