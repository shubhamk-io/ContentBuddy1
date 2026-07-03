import { useState, useRef, useEffect } from "react";
import { Menu, X, History, LogOut, ChevronDown } from "lucide-react";
import { useSession, signOut } from "../lib/authClient";

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const firstName = user?.name?.split(" ")[0];

  const [open, setOpen] = useState(false); // desktop dropdown
  const [mobileOpen, setMobileOpen] = useState(false); // mobile menu
  const dropdownRef = useRef(null);
  const closeTimeout = useRef(null);

  // close desktop dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleMouseEnter = () => {
    clearTimeout(closeTimeout.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => setOpen(false), 150);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setOpen(false);
      setMobileOpen(false);
      window.location.href = "/singin";
    } catch (err) {
      console.error("Sign out failed:", err);
    }
  };

  return (
    <nav className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-3 px-4 py-4 sm:px-6 md:px-8 md:py-5">
        <a href="#" className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[8px] bg-gradient-to-br from-[#7b3ff1] to-[#387df6] shadow-sm sm:h-9 sm:w-9">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-white sm:h-5 sm:w-5" fill="none" aria-hidden="true">
              <path d="M12 3.75c.55 3.2 1.55 4.18 4.75 4.75-3.2.55-4.2 1.55-4.75 4.75-.55-3.2-1.55-4.2-4.75-4.75 3.2-.57 4.2-1.55 4.75-4.75Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              <path d="M6.25 12.75c.38 2.18 1.07 2.87 3.25 3.25-2.18.38-2.87 1.07-3.25 3.25C5.87 17.07 5.18 16.38 3 16c2.18-.38 2.87-1.07 3.25-3.25Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              <path d="M18.3 14.2c.27 1.47.73 1.93 2.2 2.2-1.47.27-1.93.73-2.2 2.2-.27-1.47-.73-1.93-2.2-2.2 1.47-.27 1.93-.73 2.2-2.2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="text-lg font-bold text-[#111827] sm:text-xl">ContentBuddy</span>
        </a>

        <div className="hidden items-center gap-8 text-sm font-medium text-[#475569] md:flex">
          <a href="#features" className="transition hover:text-[#111827]">Features</a>
          <a href="#how-it-works" className="transition hover:text-[#111827]">How It Works</a>
          <a href="#pricing" className="transition hover:text-[#111827]">Pricing</a>
        </div>

        <div className="flex items-center gap-3">

          {/* Desktop avatar dropdown */}
          <div
            ref={dropdownRef}
            className="relative hidden md:block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow font-bold hover:bg-gray-50 transition"
            >
              {user?.image ? (
                <img
                  src={user.image}
                  alt={firstName}
                  className="h-7 w-7 rounded-full object-cover ring-2 ring-[#7b3ff1]/20"
                />
              ) : (
                <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-[#7b3ff1] to-[#387df6] text-xs font-bold text-white">
                  {firstName?.[0]?.toUpperCase()}
                </span>
              )}
              <span className="max-w-[100px] truncate">{firstName}</span>
              <ChevronDown
                className={`h-3.5 w-3.5 text-[#475569] transition-transform duration-200 ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`absolute right-0 mt-2 w-52 origin-top-right rounded-xl border border-white/10 bg-[#713EF1] p-1.5 shadow-xl shadow-[#713EF1]/25 transition-all duration-200 ease-out ${
                open
                  ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                  : "pointer-events-none -translate-y-1 scale-95 opacity-0"
              }`}
            >
              
             <a   href="/history"
                className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-white/90 transition hover:bg-white/10 hover:text-white"
              >
                <History className="h-4 w-4" />
                History
              </a>
              <button
                onClick={handleSignOut}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-white/90 transition hover:bg-white/10 hover:text-white"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </div>
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="grid h-10 w-10 place-items-center rounded-full bg-white shadow md:hidden"
            aria-label="Toggle menu"
          >
            <div className="relative h-5 w-5">
              <Menu
                className={`absolute inset-0 h-5 w-5 text-[#111827] transition-all duration-200 ${
                  mobileOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                }`}
              />
              <X
                className={`absolute inset-0 h-5 w-5 text-[#111827] transition-all duration-200 ${
                  mobileOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                }`}
              />
            </div>
          </button>

        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-out md:hidden ${
          mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-4 mb-4 rounded-2xl border border-black/5 bg-white shadow-xl sm:mx-6">

          {/* User info */}
          {user && (
            <div className="flex items-center gap-3 border-b border-black/5 px-4 py-4">
              {user?.image ? (
                <img
                  src={user.image}
                  alt={firstName}
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-[#7b3ff1]/20"
                />
              ) : (
                <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[#7b3ff1] to-[#387df6] text-sm font-bold text-white">
                  {firstName?.[0]?.toUpperCase()}
                </span>
              )}
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-[#111827]">{user?.name}</p>
                <p className="truncate text-xs text-[#64748b]">{user?.email}</p>
              </div>
            </div>
          )}

          {/* Nav links */}
          <div className="flex flex-col px-2 py-2 text-sm font-medium text-[#475569]">
            
          <a    href="#features"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 transition hover:bg-[#f4f2ff] hover:text-[#111827]"
            >
              Features
            </a>
            
            <a  href="#how-it-works"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 transition hover:bg-[#f4f2ff] hover:text-[#111827]"
            >
              How It Works
            </a>
            
            <a  href="#pricing"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 transition hover:bg-[#f4f2ff] hover:text-[#111827]"
            >
              Pricing
            </a>
          </div>

          {/* Profile actions */}
          {user && (
            <div className="flex flex-col gap-1 border-t border-black/5 px-2 py-2">
              
              <a  href="/history"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-[#475569] transition hover:bg-[#f4f2ff] hover:text-[#111827]"
              >
                <History className="h-4 w-4" />
                History
              </a>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-500 transition hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}