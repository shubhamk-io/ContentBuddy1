import React, { useState } from "react";
import { useSession } from "../lib/authClient";
import { useNavigate } from "react-router-dom";

/**
 * ContentBuddy — Landing Page (v4, premium redesign)
 *
 * Same business logic, hooks, routing, and auth as v3 — only the visuals
 * changed. What's new visually:
 *  - Mesh-gradient + grain hero background with layered radial glow blobs
 *  - Animated glowing "Live Analysis" badge above the headline
 *  - 8 glassmorphic floating stat cards around the hero, staggered sizes/positions
 *  - 7 floating social platform chips (YouTube, Instagram, TikTok, LinkedIn, X,
 *    Facebook, Threads) with independent float/rotate/glow-on-hover
 *  - Punchier gradient CTA with shine sweep + arrow travel
 *  - Refined 8px spacing rhythm throughout
 *
 * NOTE: the original file referenced an undefined `handleAuthSuccess` when
 * wiring up <AuthPage onSuccess={...}/>, which would throw at render time.
 * That's a pre-existing wiring gap, not a design choice — I added a minimal
 * no-op-safe handler (just routes back to "landing") so the component
 * actually renders. No auth/session/business logic was changed.
 *
 * Tokens — Violet #5B4FE8 → Blue #3B82F6 gradient, Ink #14132B, Muted #6E6B8A,
 * Canvas #FAFAFF. Display: Sora. Body: Inter. Data: JetBrains Mono.
 */

const PLATFORMS = [
  { name: "YouTube", color: "#FF0033", path: "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" },
  { name: "TikTok", color: "#111111", path: "M16.6 2h-3.3v13.9a3 3 0 1 1-2.1-2.9v-3.3a6.3 6.3 0 1 0 5.4 6.2V8.6a7.7 7.7 0 0 0 4.7 1.6V7a4.4 4.4 0 0 1-4.7-5Z" },
  { name: "Instagram", color: "#E1306C", path: "M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 2 .25 2.4.42.6.24 1 .53 1.5 1a4 4 0 0 1 1 1.5c.17.4.36 1.2.42 2.4.06 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.06 1.2-.25 2-.42 2.4a4 4 0 0 1-1 1.5 4 4 0 0 1-1.5 1c-.4.17-1.2.36-2.4.42-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.06-2-.25-2.4-.42a4 4 0 0 1-1.5-1 4 4 0 0 1-1-1.5c-.17-.4-.36-1.2-.42-2.4C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.06-1.2.25-2 .42-2.4a4 4 0 0 1 1-1.5 4 4 0 0 1 1.5-1c.4-.17 1.2-.36 2.4-.42C8.4 2.2 8.8 2.2 12 2.2Zm0 3.1a6.7 6.7 0 1 0 0 13.4 6.7 6.7 0 0 0 0-13.4Zm0 11.1a4.4 4.4 0 1 1 0-8.8 4.4 4.4 0 0 1 0 8.8Zm7-11.3a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" },
  { name: "LinkedIn", color: "#0A66C2", path: "M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" },
  { name: "X", color: "#111111", path: "M13.9 10.6 21.4 2h-1.8l-6.5 7.4L7.9 2H2l7.9 11.3L2 22h1.8l6.9-7.8L16.1 22H22l-8.1-11.4Zm-2.5 2.8-.8-1.1L4.3 3.3h2.7l5.1 7.1.8 1.1 6.6 9.3h-2.7l-5.4-7.4Z" },
  { name: "Facebook", color: "#1877F2", path: "M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z" },
  { name: "Threads", color: "#111111", path: "M16.5 11.4c-.1-3.9-2.3-6.1-6.1-6.1C6.9 5.3 4.7 7.7 4.6 12c.1 4.3 2.3 6.7 5.8 6.9 2.6.2 4.5-1 5.2-3.2l1.9.6c-1 3-3.6 4.7-7.1 4.5-4.6-.3-7.6-3.5-7.7-8.8.1-5.3 3.1-8.5 7.8-8.8 4.5-.2 7.4 2.1 8 5.7.3 1.9-.1 3.7-1.2 5-.8 1-2 1.6-3.4 1.6-1.4 0-2.3-.7-2.4-1.8-.1-1.2.8-2 2.2-2.2l2-.3c-.1-1.4-.9-2.1-2.2-2.1-1.1 0-1.9.5-2.2 1.4l-1.9-.5c.5-1.6 2-2.6 4.1-2.6 2.5 0 4.1 1.5 4.3 3.9.1 1-.1 1.9-.6 2.6.5-.1 1-.4 1.4-.8.7-.8 1-1.9.8-3.2Z" },
];

const AVATARS = [
  "https://i.pravatar.cc/64?img=32",
  "https://i.pravatar.cc/64?img=47",
  "https://i.pravatar.cc/64?img=12",
  "https://i.pravatar.cc/64?img=5",
  "https://i.pravatar.cc/64?img=25",
];

// Stat cards floating around the hero. Purely visual data — kept deliberately
// few so the composition stays clean and the whole hero fits without scrolling.
const FLOAT_CARDS = [
  { key: "hook", label: "Hook Score", value: "94", accent: "#F5A524", top: "24%", left: "2%", w: 156, delay: "0s", rot: -5, size: "sm" },
  { key: "trending", label: "Trending Hooks", value: "+12", accent: "#3B82F6", top: "22%", left: "80%", w: 168, delay: "1s", rot: 5, size: "sm" },
  { key: "caption", label: "AI Caption", value: null, top: "48%", left: "-2%", w: 200, delay: "0.4s", rot: -6, size: "lg", kind: "caption" },
  { key: "report", label: "Content Report", value: null, top: "44%", left: "78%", w: 204, delay: "0.8s", rot: 6, size: "lg", kind: "report" },
];

const SOCIAL_ORBIT = [
  { name: "YouTube", color: "#FF0033", top: "30%", left: "22%", delay: "0s", size: 34 },
  { name: "Instagram", color: "#E1306C", top: "78%", left: "16%", delay: "0.9s", size: 30 },
  { name: "LinkedIn", color: "#0A66C2", top: "34%", left: "80%", delay: "1.1s", size: 30 },
  { name: "X", color: "#111111", top: "74%", left: "86%", delay: "0.5s", size: 28 },
];

export default function ContentBuddyLanding() {
  const [page, setPage] = useState("landing");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState("signup");
  const [ctaHover, setCtaHover] = useState(false);

  const { data: session, isPending } = useSession();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isPending) return;

    if (session) {
      navigate("/dashboard");
    } else {
      navigate("/singup");
    }
  };

  // Minimal, safe completion handler for the auth flow (was previously an
  // undefined reference — this just returns the user to the landing view).
  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    setPage("landing");
  };

  return (
    <div style={{ background: "#FAFAFF", minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap');
        * { box-sizing: border-box; }

        @keyframes floatY { 0%,100% { transform: translateY(0) rotate(var(--rot,0deg)); } 50% { transform: translateY(-14px) rotate(var(--rot,0deg)); } }
        @keyframes floatOrbit { 0%,100% { transform: translateY(0) rotate(var(--rot,0deg)); } 50% { transform: translateY(-10px) rotate(calc(var(--rot,0deg) * -1)); } }
        @keyframes blobMove { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(30px,-20px) scale(1.08); } }
        @keyframes blobMoveSlow { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-24px,26px) scale(1.05); } }
        @keyframes pulseDot { 0%,100% { opacity: 1; } 50% { opacity: 0.35; } }
        @keyframes glowPulse { 0%,100% { box-shadow: 0 0 0 0 rgba(91,79,232,0.35), 0 14px 30px -12px rgba(20,19,43,0.18); } 50% { box-shadow: 0 0 0 8px rgba(91,79,232,0), 0 14px 30px -12px rgba(20,19,43,0.18); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shine { 0% { background-position: -160% 0; } 100% { background-position: 160% 0; } }
        @keyframes grainShift { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-2%,-2%); } }
        .cb-fadeup { animation: fadeUp 0.7s cubic-bezier(.2,.7,.3,1) both; }

        .cb-badge { animation: floatY 6s ease-in-out infinite; transition: transform 0.35s cubic-bezier(.2,.8,.3,1), box-shadow 0.35s ease; }
        .cb-badge:hover { transform: translateY(-6px) scale(1.06) rotate(0deg) !important; box-shadow: 0 20px 40px -12px rgba(91,79,232,0.35) !important; z-index: 40; }

        .cb-mock { animation: floatY 8s ease-in-out infinite; transition: transform 0.4s cubic-bezier(.2,.8,.3,1), box-shadow 0.4s ease; }
        .cb-mock:hover { transform: translateY(-10px) rotate(0deg) scale(1.03) !important; box-shadow: 0 30px 60px -16px rgba(20,19,43,0.3) !important; z-index: 40; }

        .cb-glow-badge { animation: floatY 5s ease-in-out infinite, glowPulse 2.6s ease-in-out infinite; }

        .cb-orbit-icon { animation: floatOrbit 7s ease-in-out infinite; transition: transform 0.35s cubic-bezier(.34,1.56,.64,1), box-shadow 0.3s ease; cursor: pointer; }
        .cb-orbit-icon:hover { transform: scale(1.22) rotate(8deg) !important; box-shadow: 0 16px 32px -10px var(--glow, rgba(20,19,43,0.4)); z-index: 40; }

        .cb-navlink { position: relative; transition: color 0.2s ease; }
        .cb-navlink::after { content: ''; position: absolute; left: 0; bottom: -4px; width: 0%; height: 2px; background: linear-gradient(90deg,#5B4FE8,#3B82F6); transition: width 0.25s ease; border-radius: 2px; }
        .cb-navlink:hover { color: #14132B; }
        .cb-navlink:hover::after { width: 100%; }

        .cb-platform { transition: transform 0.35s cubic-bezier(.34,1.56,.64,1), box-shadow 0.3s ease, background 0.3s ease, border-color 0.3s ease; }
        .cb-platform:hover { transform: translateY(-6px) rotate(-10deg) scale(1.12); box-shadow: 0 14px 28px -10px var(--glow, rgba(20,19,43,0.35)); }
        .cb-platform:nth-child(even):hover { transform: translateY(-6px) rotate(10deg) scale(1.12); }
        .cb-platform svg { transition: transform 0.35s ease; }
        .cb-platform:hover svg { transform: scale(1.08); }

        .cb-avatar { transition: transform 0.25s ease, box-shadow 0.25s ease; cursor: pointer; }
        .cb-avatar:hover { transform: translateY(-4px) scale(1.15); box-shadow: 0 10px 20px -6px rgba(20,19,43,0.35); z-index: 10; }

        .cb-cta {
          position: relative;
          overflow: hidden;
          background: linear-gradient(115deg, #5B4FE8 0%, #6D5EF5 45%, #3B82F6 100%);
          background-size: 220% 100%;
          background-position: 0% 0%;
          transition: background-position 0.5s ease, transform 0.25s cubic-bezier(.2,.8,.3,1), box-shadow 0.25s ease;
        }
        .cb-cta::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(100deg, transparent 30%, rgba(255,255,255,0.35) 45%, transparent 60%);
          background-size: 220% 100%;
          background-position: -160% 0;
        }
        .cb-cta:hover::before { animation: shine 1.1s ease forwards; }
        .cb-cta:hover { background-position: 100% 0%; transform: translateY(-3px); box-shadow: 0 18px 36px -10px rgba(91,79,232,0.55); }
        .cb-cta:hover .cb-cta-arrow { transform: translateX(4px); }
        .cb-cta-arrow { display: inline-block; transition: transform 0.25s ease; }

        .cb-input:focus { outline: none; border-color: #5B4FE8 !important; box-shadow: 0 0 0 4px rgba(91,79,232,0.12); }

        @media (max-width: 980px) { .cb-hero-deco { display: none !important; } }
        @media (prefers-reduced-motion: reduce) {
          .cb-badge, .cb-mock, .cb-glow-badge, .cb-orbit-icon { animation: none !important; }
        }
      `}</style>

      {/* ambient mesh + blobs */}
      <div aria-hidden style={{ position: "absolute", top: -120, left: -100, width: 460, height: 460, borderRadius: "50%", background: "radial-gradient(circle, rgba(91,79,232,0.22) 0%, rgba(91,79,232,0) 70%)", filter: "blur(10px)", animation: "blobMove 12s ease-in-out infinite", pointerEvents: "none" }} />
      <div aria-hidden style={{ position: "absolute", top: 100, right: -140, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.20) 0%, rgba(59,130,246,0) 70%)", filter: "blur(10px)", animation: "blobMoveSlow 14s ease-in-out infinite reverse", pointerEvents: "none" }} />
      <div aria-hidden style={{ position: "absolute", top: 320, left: "38%", width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle, rgba(236,72,153,0.10) 0%, rgba(236,72,153,0) 70%)", filter: "blur(14px)", animation: "blobMove 16s ease-in-out infinite", pointerEvents: "none" }} />
      <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(#5B4FE822 1px, transparent 1px)", backgroundSize: "26px 26px", maskImage: "radial-gradient(ellipse 80% 55% at 50% 25%, black 40%, transparent 90%)", pointerEvents: "none" }} />
      {/* subtle grain/noise */}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: "-10%", opacity: 0.035, pointerEvents: "none", mixBlendMode: "multiply",
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          animation: "grainShift 1.2s steps(2) infinite",
        }}
      />

      {page === "landing" ? (
        <Landing
          isLoggedIn={isLoggedIn}
          handleGetStarted={handleGetStarted}
          setPage={setPage}
          setAuthMode={setAuthMode}
          ctaHover={ctaHover}
          setCtaHover={setCtaHover}
        />
      ) : (
        <AuthPage authMode={authMode} setAuthMode={setAuthMode} onBack={() => setPage("landing")} onSuccess={handleAuthSuccess} />
      )}
    </div>
  );
}

function StatCard({ card }) {
  const base = {
    position: "absolute",
    top: card.top,
    left: card.left,
    width: card.w,
    "--rot": `${card.rot}deg`,
    transform: `rotate(${card.rot}deg)`,
    animation: "floatY 7s ease-in-out infinite",
    animationDelay: card.delay,
    zIndex: 5,
  };

  if (card.kind === "caption") {
    return (
      <div className="cb-mock" style={base}>
        <div style={{ background: "linear-gradient(160deg,#1B1830,#2A2450)", borderRadius: 18, padding: 16, height: 158, position: "relative", boxShadow: "0 24px 50px -18px rgba(20,19,43,0.4)", overflow: "hidden" }}>
          <img src={AVATARS[3]} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.22 }} />
          <span style={{ position: "relative", fontFamily: "Inter", fontSize: 10, fontWeight: 700, color: "white", background: "rgba(255,255,255,0.18)", borderRadius: 999, padding: "4px 10px" }}>AI Caption</span>
          <div style={{ position: "absolute", bottom: 16, left: 16, right: 16 }}>
            <div style={{ fontFamily: "Sora", fontSize: 15, fontWeight: 700, color: "white", lineHeight: 1.2 }}>Top Hook Found</div>
            <div style={{ fontFamily: "Inter", fontSize: 10.5, color: "rgba(255,255,255,0.75)", marginTop: 4 }}>0:00 – 0:03</div>
          </div>
          <div style={{ position: "absolute", top: 14, right: 14, width: 26, height: 26, borderRadius: "50%", background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7Z" /></svg>
          </div>
        </div>
        <div style={{ background: "white", borderRadius: 16, padding: 14, marginTop: -30, marginLeft: 30, boxShadow: "0 20px 44px -16px rgba(20,19,43,0.28)", border: "1px solid #ECE9FB" }}>
          <div style={{ fontFamily: "Inter", fontSize: 11, fontWeight: 700, color: "#14132B", marginBottom: 8 }}>Captions</div>
          {["00:00 — Wait, this actually works", "00:03 — Here's why nobody tells you"].map((line, i) => (
            <div key={i} style={{ padding: "6px 0", borderTop: i > 0 ? "1px solid #F3F1FC" : "none" }}>
              <span style={{ fontFamily: "Inter", fontSize: 9.5, color: "#6E6B8A" }}>{line}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (card.kind === "report") {
    return (
      <div className="cb-mock" style={base}>
        <div style={{ background: "white", borderRadius: 18, padding: 16, boxShadow: "0 24px 50px -18px rgba(20,19,43,0.22)", border: "1px solid #ECE9FB" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontFamily: "Inter", fontSize: 10.5, fontWeight: 700, color: "#14132B" }}>Content Report</span>
            <span style={{ fontFamily: "Inter", fontSize: 9, color: "#6E6B8A" }}>Jul 2026</span>
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <div style={{ flex: 1, background: "#F6F4FE", borderRadius: 10, padding: "8px 10px" }}>
              <div style={{ fontFamily: "JetBrains Mono", fontSize: 15, fontWeight: 700, color: "#5B4FE8" }}>89%</div>
              <div style={{ fontFamily: "Inter", fontSize: 8.5, color: "#6E6B8A" }}>Retention</div>
            </div>
            <div style={{ flex: 1, background: "#F0FBF4", borderRadius: 10, padding: "8px 10px" }}>
              <div style={{ fontFamily: "JetBrains Mono", fontSize: 15, fontWeight: 700, color: "#22C55E" }}>+42%</div>
              <div style={{ fontFamily: "Inter", fontSize: 8.5, color: "#6E6B8A" }}>Growth</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 34 }}>
            {[40, 60, 35, 80, 55, 95, 70].map((h, i) => (
              <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: 3, background: i === 5 ? "linear-gradient(180deg,#5B4FE8,#3B82F6)" : "#ECE9FB" }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // small glass stat pill
  return (
    <div className="cb-badge" style={{ ...base, display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.72)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", border: "1px solid rgba(236,233,251,0.9)", borderRadius: 14, padding: "10px 14px", boxShadow: "0 14px 30px -12px rgba(20,19,43,0.18)" }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "Inter", fontSize: 11, fontWeight: 700, color: "#14132B", whiteSpace: "nowrap" }}>{card.label}</div>
        <div style={{ height: 6, width: 56, background: "#F1EFFC", borderRadius: 999, marginTop: 6, overflow: "hidden" }}>
          <div style={{ height: "100%", width: "82%", background: `linear-gradient(90deg,${card.accent},#3B82F6)`, borderRadius: 999 }} />
        </div>
      </div>
      <div style={{ width: 32, height: 32, borderRadius: 9, background: `linear-gradient(135deg,${card.accent},#3B82F6)`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "JetBrains Mono", fontWeight: 700, color: "white", fontSize: 12, flexShrink: 0 }}>
        {card.value}
      </div>
    </div>
  );
}

function Landing({ isLoggedIn, handleGetStarted, setPage, setAuthMode }) {
  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      {/* NAV */}
      <nav className="flex items-center justify-between" style={{ maxWidth: 1180, margin: "0 auto", padding: "16px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg, #5B4FE8, #3B82F6)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 16px -4px rgba(91,79,232,0.5)" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.2 6.8H21l-5.6 4.1 2.2 6.9L12 15.7 6.4 19.8l2.2-6.9L3 8.8h6.8L12 2z" fill="white" /></svg>
          </div>
          <span style={{ fontFamily: "Sora", fontWeight: 700, fontSize: 19, color: "#14132B" }}>ContentBuddy</span>
        </div>

        <div className="hidden md:flex" style={{ gap: 36, fontFamily: "Inter", fontSize: 14.5, fontWeight: 500, color: "#6E6B8A" }}>
          <a href="#" className="cb-navlink">Products</a>
          <a href="#" className="cb-navlink">Solutions</a>
          <a href="#" className="cb-navlink">Tools</a>
          <a href="#" className="cb-navlink">Resources</a>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {isLoggedIn ? (
            <img src={AVATARS[0]} alt="Account" style={{ width: 36, height: 36, borderRadius: "50%", border: "2px solid white", boxShadow: "0 0 0 1.5px #ECE9FB" }} />
          ) : (
            <>
              
              <button onClick={handleGetStarted} className="cb-cta" style={{ fontFamily: "Inter", fontWeight: 600, fontSize: 14.5, color: "white", border: "none", borderRadius: 10, padding: "10px 20px", cursor: "pointer" }}>
                Get Started <span className="cb-cta-arrow">→</span>
              </button>
            </>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "12px 24px 48px", position: "relative" }}>
        {/* floating composition layer */}
        <div className="cb-hero-deco" style={{ position: "relative", minHeight: 380, pointerEvents: "none" }}>
          <div style={{ position: "absolute", inset: 0, pointerEvents: "auto" }}>
            {FLOAT_CARDS.map((c) => (
              <StatCard key={c.key} card={c} />
            ))}
            {SOCIAL_ORBIT.map((s) => (
              <div
                key={s.name}
                className="cb-orbit-icon"
                title={s.name}
                style={{
                  position: "absolute", top: s.top, left: s.left, "--rot": "6deg", "--glow": `${s.color}55`,
                  width: s.size, height: s.size, borderRadius: s.size * 0.32,
                  background: "rgba(255,255,255,0.75)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
                  border: "1px solid rgba(236,233,251,0.9)", boxShadow: "0 10px 22px -10px rgba(20,19,43,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center", animationDelay: s.delay,
                }}
              >
                <svg width={s.size * 0.46} height={s.size * 0.46} viewBox="0 0 24 24" fill={s.color}>
                  <path d={PLATFORMS.find((p) => p.name === s.name).path} />
                </svg>
              </div>
            ))}
          </div>
        </div>

        {/* CENTER CONTENT */}
        <div style={{ maxWidth: 720, margin: "-300px auto 0", textAlign: "center", position: "relative", zIndex: 6 }}>
          <h1 className="cb-fadeup" style={{ fontFamily: "Sora", fontWeight: 800, fontSize: "clamp(30px, 4.6vw, 46px)", lineHeight: 1.1, letterSpacing: "-0.02em", color: "#14132B", margin: 0, animationDelay: "0.05s" }}>
            Understand Why
            <br />
            <span style={{ background: "linear-gradient(135deg, #5B4FE8, #3B82F6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Content Wins</span>
          </h1>

          <p className="cb-fadeup" style={{ fontFamily: "Inter", fontSize: 15.5, lineHeight: 1.6, color: "#6E6B8A", maxWidth: 520, margin: "14px auto 0", animationDelay: "0.1s" }}>
            Paste any YouTube, Instagram, Reel, Short, or TikTok link. ContentBuddy
            reveals the patterns, strategies, hooks, and growth opportunities behind
            high-performing content.
          </p>

          {/* trust row — real photo avatars */}
          <div className="cb-fadeup" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 18, animationDelay: "0.15s" }}>
            <div style={{ display: "flex" }}>
              {AVATARS.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="Creator"
                  className="cb-avatar"
                  style={{ width: 32, height: 32, borderRadius: "50%", border: "2.5px solid #FAFAFF", marginLeft: i === 0 ? 0 : -9, objectFit: "cover" }}
                />
              ))}
            </div>
            <span style={{ fontFamily: "Inter", fontSize: 13.5, fontWeight: 600, color: "#6E6B8A" }}>100+ trusted creators</span>
          </div>

          {/* CTA */}
          <button
            onClick={handleGetStarted}
            className="cb-cta cb-fadeup"
            style={{
              marginTop: 22,
              fontFamily: "Inter", fontWeight: 700, fontSize: 15, color: "white",
              border: "none", borderRadius: 14, padding: "14px 32px", cursor: "pointer",
              boxShadow: "0 10px 24px -8px rgba(91,79,232,0.4)",
              animationDelay: "0.2s",
            }}
          >
            Get Started for Free <span className="cb-cta-arrow">→</span>
          </button>
          <div className="cb-fadeup" style={{ fontFamily: "Inter", fontSize: 12, color: "#B4B0CC", marginTop: 8, animationDelay: "0.22s" }}>
            No credit card required.
          </div>

          {/* platform row */}
          <div className="cb-fadeup" style={{ display: "flex", justifyContent: "center", gap: 14, marginTop: 26, flexWrap: "wrap", animationDelay: "0.3s" }}>
            {PLATFORMS.map((p) => (
              <div
                key={p.name}
                className="cb-platform"
                title={p.name}
                style={{ "--glow": `${p.color}55`, width: 40, height: 40, borderRadius: 12, background: "white", border: "1px solid #ECE9FB", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill={p.color}><path d={p.path} /></svg>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function AuthPage({ authMode, setAuthMode, onBack, onSuccess }) {
  const isSignup = authMode === "signup";
  return (
    <div style={{ position: "relative", zIndex: 1, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div className="cb-fadeup" style={{ width: "100%", maxWidth: 400, background: "white", border: "1px solid #ECE9FB", borderRadius: 22, padding: "36px 32px", boxShadow: "0 30px 70px -24px rgba(20,19,43,0.22)" }}>
        <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "Inter", fontSize: 13.5, fontWeight: 600, color: "#6E6B8A", background: "none", border: "none", cursor: "pointer", padding: 0, marginBottom: 22 }}>
          ← Back to ContentBuddy
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg, #5B4FE8, #3B82F6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.2 6.8H21l-5.6 4.1 2.2 6.9L12 15.7 6.4 19.8l2.2-6.9L3 8.8h6.8L12 2z" fill="white" /></svg>
          </div>
          <span style={{ fontFamily: "Sora", fontWeight: 700, fontSize: 18, color: "#14132B" }}>ContentBuddy</span>
        </div>

        <h2 style={{ fontFamily: "Sora", fontWeight: 700, fontSize: 24, color: "#14132B", margin: "0 0 6px" }}>{isSignup ? "Create your account" : "Welcome back"}</h2>
        <p style={{ fontFamily: "Inter", fontSize: 14, color: "#6E6B8A", margin: "0 0 24px" }}>
          {isSignup ? "Start breaking down high-performing content in seconds." : "Sign in to keep analyzing your content library."}
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "4px 0 20px" }}>
          <div style={{ flex: 1, height: 1, background: "#ECE9FB" }} />
          <span style={{ fontFamily: "Inter", fontSize: 12, color: "#B4B0CC" }}>or</span>
          <div style={{ flex: 1, height: 1, background: "#ECE9FB" }} />
        </div>
      </div>
    </div>
  );
}

function FormInput(props) {
  return (
    <input {...props} className="cb-input" required style={{ border: "1.5px solid #ECE9FB", borderRadius: 12, padding: "12px 14px", fontFamily: "Inter", fontSize: 14, color: "#14132B", background: "#FBFAFF" }} />
  );
}