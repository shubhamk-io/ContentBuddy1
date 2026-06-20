export function SectionCard({ icon: Icon, eyebrow, children, className = "" }) {
    return (
      <section className={`rounded-[1.6rem] border border-slate-200 bg-white p-5 shadow-crisp sm:p-7 ${className}`}>
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
            <Icon className="h-4 w-4" />
          </span>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-slate-400">{eyebrow}</p>
        </div>
        {children}
      </section>
    );
  }
  
  export function ProgressBar({ value, color = "bg-violet-500" }) {
    return (
      <div className="h-2 rounded-full bg-slate-200">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
    );
  }
  
  export function RadarChart() {
    return (
      <div className="mx-auto max-w-[260px]">
        <svg viewBox="0 0 260 230" className="h-auto w-full" role="img" aria-label="Content strength radar chart">
          <polygon points="130,20 225,75 225,155 130,210 35,155 35,75" fill="none" stroke="#E2E8F0" />
          <polygon points="130,57 190,92 190,140 130,175 70,140 70,92" fill="none" stroke="#E2E8F0" />
          <polygon points="130,95 155,110 155,128 130,145 105,128 105,110" fill="none" stroke="#E2E8F0" />
          <line x1="130" y1="20" x2="130" y2="210" stroke="#E2E8F0" />
          <line x1="35" y1="75" x2="225" y2="155" stroke="#E2E8F0" />
          <line x1="225" y1="75" x2="35" y2="155" stroke="#E2E8F0" />
          <polygon
            points="130,38 194,88 211,148 130,176 48,150 55,86"
            fill="rgba(124, 58, 237, 0.14)"
            stroke="#6D5DFE"
            strokeWidth="4"
          />
          {[
            [130, 38],
            [194, 88],
            [211, 148],
            [130, 176],
            [48, 150],
            [55, 86]
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="5" fill="#6D5DFE" stroke="white" strokeWidth="2" />
          ))}
          <text x="130" y="12" textAnchor="middle" className="fill-slate-400 text-[12px] font-bold">
            Hooks
          </text>
          <text x="235" y="78" textAnchor="middle" className="fill-slate-400 text-[12px] font-bold">
            Story
          </text>
          <text x="235" y="160" textAnchor="middle" className="fill-slate-400 text-[12px] font-bold">
            Retention
          </text>
          <text x="130" y="226" textAnchor="middle" className="fill-slate-400 text-[12px] font-bold">
            Trend
          </text>
          <text x="24" y="160" textAnchor="middle" className="fill-slate-400 text-[12px] font-bold">
            Authority
          </text>
          <text x="25" y="78" textAnchor="middle" className="fill-slate-400 text-[12px] font-bold">
            Engage
          </text>
        </svg>
      </div>
    );
  }
  