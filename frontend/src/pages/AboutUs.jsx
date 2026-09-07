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

  const team = [
    {
      name: "Harsh Raj",
      role: "UI/UX Engineer",
      profile: "harsh-raj-aa0573353",
      url: "https://www.linkedin.com/in/harsh-raj-aa0573353/"
    },
    {
      name: "Janvi Singh",
      role: "ML Engineer",
      profile: "janvi-singh-4760b1296",
      url: "https://www.linkedin.com/in/janvi-singh-4760b1296/"
    },
    {
      name: "Ishita Agarwal",
      profile: "ishita-agarwal-3604b12a6",
      url: "https://www.linkedin.com/in/ishita-agarwal-3604b12a6/"
    },
    {
      name: "Laksh Raj",
      role: "Full Stack Developer",
      profile: "laksh-raj-0b14ab298",
      url: "https://www.linkedin.com/in/laksh-raj-0b14ab298/"
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

        <section className="bg-[#0E1217] border border-white/[0.08] rounded-[14px] p-5 sm:p-6">
          <div className="flex items-end justify-between gap-4 mb-4">
            <div>
              <span className="text-xs font-semibold text-[#EF3340] uppercase tracking-wider">
                The people behind DriveAlert
              </span>
              <h3 className="text-base sm:text-lg font-semibold text-[#F3F4F6] mt-1 m-0">
                Connect with our team
              </h3>
            </div>
            <span className="hidden sm:block text-xs text-[#858D98]">LinkedIn profiles</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {team.map((member) => (
              <a
                key={member.profile}
                href={member.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${member.name}'s LinkedIn profile`}
                className="group flex items-center gap-3 border border-white/[0.08] rounded-[10px] p-3 hover:border-[#EF3340]/60 transition-colors"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] bg-[#0A66C2] text-sm font-bold text-white">
                  in
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-[#F3F4F6]">
                    {member.name}
                  </span>
                  {member.role && (
                    <span className="block text-xs font-bold text-[#EF3340]">
                      {member.role}
                    </span>
                  )}
                  <span className="block truncate text-xs text-[#858D98] group-hover:text-[#F3F4F6] transition-colors">
                    linkedin.com/in/{member.profile}
                  </span>
                </span>
              </a>
            ))}
          </div>
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

export default AboutUs;
