import { NavLink } from "react-router-dom";

function Sidebar({ isMobile = false, onClose }) {
  const navItems = [
    {
      name: "Working Model",
      path: "/",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      )
    },
    {
      name: "How It Works",
      path: "/how-it-works",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      )
    },
    {
      name: "About Us",
      path: "/about",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      )
    }
  ];

  return (
    <aside
      className={`bg-[#0B1016] border-r border-white/[0.08] flex flex-col justify-between ${
        isMobile ? "w-full h-full p-5" : "w-[260px] min-w-[260px] h-screen sticky top-0 p-5 shrink-0"
      }`}
    >
      {/* BRAND AREA */}
      <div>
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-[2px] bg-[#B51635]" />
              <h1 className="text-lg font-bold tracking-tight text-[#F3F4F6] m-0">
                DriveAlert
              </h1>
            </div>
            <p className="text-[12px] text-[#858D98] mt-1 font-medium pl-4.5">
              Driver Monitoring System
            </p>
          </div>

          {isMobile && (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-[6px] text-[#858D98] hover:text-[#F3F4F6] hover:bg-[#13181F] cursor-pointer focus-visible:outline-2"
              aria-label="Close navigation menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>

        {/* NAVIGATION LINKS */}
        <nav aria-label="Main Navigation" className="flex flex-col gap-1.5">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              onClick={() => {
                if (isMobile && onClose) {
                  onClose();
                }
              }}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-[8px] text-[13px] font-medium transition-colors border-l-2 ${
                  isActive
                    ? "bg-[#B51635]/15 border-[#B51635] text-[#F3F4F6]"
                    : "border-transparent text-[#858D98] hover:text-[#C4CAD2] hover:bg-[#13181F]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className={`shrink-0 transition-colors ${isActive ? "text-[#EF3340]" : "text-[#858D98]"}`}>
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* SYSTEM STATUS WIDGET */}
      <div className="pt-4 border-t border-white/[0.08]">
        <div className="p-3 bg-[#0E1217] border border-white/[0.06] rounded-[8px] flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-[#858D98] uppercase tracking-wider">
              System status
            </span>
            <div className="flex items-center gap-1.5 text-xs font-medium text-[#22C55E]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
              <span>Connected</span>
            </div>
          </div>
          <p className="text-[12px] text-[#C4CAD2] m-0 font-medium">
            DriveAlert Platform v1.0
          </p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
