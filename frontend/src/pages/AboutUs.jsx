
function AboutUs() {
  const team = [
    {
      name: "Harsh Raj",
      role: "UI/UX Engineer",
      profile: "harsh-raj-aa0573353",
      url: "https://www.linkedin.com/in/harsh-raj-aa0573353/",
    },
    {
      name: "Janvi Singh",
      role: "ML Engineer",
      profile: "janvi-singh-4760b1296",
      url: "https://www.linkedin.com/in/janvi-singh-4760b1296/",
    },
    {
      name: "Ishita Agarwal",
      role: "Full-stack AI Engineer",
      profile: "ishita-agarwal-3604b12a6",
      url: "https://www.linkedin.com/in/ishita-agarwal-3604b12a6/",
    },
    {
      name: "Laksh Raj",
      role: "Full-stack Developer",
      profile: "laksh-raj-0b14ab298",
      url: "https://www.linkedin.com/in/laksh-raj-0b14ab298/",
    },
  ];

  return (
    <div className="flex-1 bg-[#090C10] text-[#F3F4F6]">

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/[0.06]">
        {/* Background glow */}
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[#EF3340]/10 blur-[100px]" />
        <div className="absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-[#EF3340]/5 blur-[100px]" />

        <div className="relative w-full max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-28">

          <div className="max-w-4xl">

            <div className="inline-flex items-center gap-2 border border-[#EF3340]/20 bg-[#EF3340]/[0.06] rounded-full px-3 py-1.5 mb-7">
              <span className="h-1.5 w-1.5 rounded-full bg-[#EF3340]" />
              <span className="text-[11px] font-semibold text-[#EF3340] uppercase tracking-widest">
                About DriveAlert
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-[-0.04em] leading-[1.05]">
              Stay awake.
              <br />
              <span className="text-[#EF3340]">Stay safe.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base sm:text-lg text-[#858D98] leading-relaxed">
              DriveAlert uses computer vision and machine learning to detect
              signs of driver drowsiness in real time — helping drivers
              recognize fatigue before it becomes a road safety risk.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              <div className="flex items-center gap-2 rounded-full bg-white/[0.05] border border-white/[0.08] px-4 py-2.5">
                <span className="text-[#EF3340]">●</span>
                <span className="text-xs font-medium text-[#D1D5DB]">
                  Real-time monitoring
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-full bg-white/[0.05] border border-white/[0.08] px-4 py-2.5">
                <span className="text-[#EF3340]">●</span>
                <span className="text-xs font-medium text-[#D1D5DB]">
                  AI-powered detection
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-full bg-white/[0.05] border border-white/[0.08] px-4 py-2.5">
                <span className="text-[#EF3340]">●</span>
                <span className="text-xs font-medium text-[#D1D5DB]">
                  Instant alerts
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PURPOSE */}
      <section className="w-full max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-16">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Main message */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#0E1217] p-7 sm:p-9 lg:p-10">

            <span className="text-[11px] font-semibold text-[#EF3340] uppercase tracking-widest">
              Why we built it
            </span>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-3">
              Because a moment of fatigue
              <br />
              can change everything.
            </h2>

            <p className="text-sm text-[#858D98] leading-relaxed mt-5 max-w-xl">
              Long drives and fatigue can affect attention and reaction time.
              DriveAlert is designed as an additional layer of safety that
              watches for visible signs of drowsiness and gives the driver
              a timely warning.
            </p>

          </div>

          {/* Big stat / visual */}
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0E1217] p-7 sm:p-9">

            <div className="absolute right-[-50px] top-[-50px] h-48 w-48 rounded-full border border-[#EF3340]/10" />
            <div className="absolute right-[-20px] top-[-20px] h-28 w-28 rounded-full border border-[#EF3340]/10" />

            <span className="text-[11px] font-semibold text-[#EF3340] uppercase tracking-widest">
              Our approach
            </span>

            <div className="mt-10">
              <div className="text-5xl sm:text-6xl font-bold tracking-tight">
                24/7
              </div>

              <p className="text-sm text-[#858D98] mt-2">
                Designed for continuous driver monitoring
              </p>
            </div>

            <div className="mt-8 h-px bg-white/[0.08]" />

            <p className="text-xs text-[#858D98] mt-5">
              Detect · Analyze · Alert
            </p>

          </div>

        </div>
      </section>

      

      {/* TEAM */}
      <section className="w-full max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 pb-16">

        <div className="rounded-2xl border border-white/[0.08] bg-[#0E1217] p-6 sm:p-8 lg:p-10">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">

            <div>
              <span className="text-[11px] font-semibold text-[#EF3340] uppercase tracking-widest">
                The team
              </span>

              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-2">
                Built by people who care about safety.
              </h2>
            </div>

            <p className="text-xs text-[#858D98]">
              Meet the team behind DriveAlert
            </p>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

            {team.map((member) => (
              <a
                key={member.profile}
                href={member.url}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-4 rounded-xl border border-white/[0.07] bg-white/[0.015] p-4 hover:bg-white/[0.03] hover:border-[#EF3340]/30 transition-all duration-300"
              >

                <div className="flex items-center gap-3 min-w-0">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0A66C2] text-sm font-bold text-white">
                    in
                  </div>

                  <div className="min-w-0">

                    <p className="text-sm font-semibold text-[#F3F4F6]">
                      {member.name}
                    </p>

                    <p className="text-xs text-[#EF3340] mt-0.5">
                      {member.role}
                    </p>

                  </div>

                </div>

                <span className="text-[#858D98] group-hover:text-[#EF3340] group-hover:translate-x-1 transition-all">
                  →
                </span>

              </a>
            ))}

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.06]">
        <div className="w-full max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 py-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span className="text-xs font-medium text-[#858D98]">
            DriveAlert
          </span>

          <span className="text-xs text-[#858D98]">
            Technology for safer journeys.
          </span>
        </div>
      </footer>

    </div>
  );
}

export default AboutUs;