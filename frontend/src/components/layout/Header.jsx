import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Header({ onOpenMobileMenu }) {
  const [timeString, setTimeString] = useState("");
  const location = useLocation();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const pageSectionName = {
    "/": "Driver monitoring",
    "/how-it-works": "How It Works",
    "/about": "About Us"
  }[location.pathname] || "Driver monitoring";

  return (
    <header className="h-[60px] px-4 sm:px-6 lg:px-8 bg-[#0E1217] border-b border-white/[0.08] flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-3">
        {/* MOBILE MENU TOGGLE */}
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 -ml-2 rounded-[6px] text-[#858D98] hover:text-[#F3F4F6] hover:bg-[#13181F] cursor-pointer focus-visible:outline-2"
          aria-label="Open navigation menu"
          aria-haspopup="true"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-[16px] sm:text-[17px] font-bold text-[#F3F4F6] tracking-tight">
            DriveAlert
          </span>
          <span className="text-white/20 font-light text-[15px] select-none" aria-hidden="true">
            /
          </span>
          <span className="text-xs sm:text-sm font-medium text-[#858D98]">
            {pageSectionName}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-6">
        <div className="flex items-center gap-2 text-xs font-medium text-[#22C55E] bg-[#22C55E]/10 border border-[#22C55E]/20 px-2.5 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
          <span>Connected</span>
        </div>

        {timeString && (
          <div className="text-[13px] font-medium text-[#858D98] tabular-nums" aria-label="Current time">
            {timeString}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
