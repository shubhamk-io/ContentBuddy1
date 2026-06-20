
import { Brain, Sparkles, Target, Zap } from "lucide-react";
import { ProgressBar, SectionCard } from "./DashboardPrimitives";

export default function LeftAnalysisPanel({ data }) {
    return (
        <div className="space-y-6">
            <SectionCard icon={Brain} eyebrow="AI Executive Summary">
                <div className="grid gap-4 sm:grid-cols-2">
                    {data.summaryCards.map(([label, value]) => (
                        <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                            <p className="text-sm font-black uppercase tracking-[0.16em] text-slate-400">{label}</p>
                            <p className="mt-3 text-base font-semibold leading-7 text-slate-700">{value}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-5 rounded-2xl border border-violet-200 bg-violet-50 p-5">
                    <p className="text-sm font-black uppercase tracking-[0.16em] text-violet-600">
                        Why this content performs
                    </p>
                    <p className="mt-3 text-lg font-semibold leading-8 text-slate-800">
                        Strong <span className="font-black text-violet-600">curiosity-driven hooks</span> combined with
                        educational storytelling and a clear failure-to-success arc. The negative-outcome framing
                        triggers loss aversion and drives retention past the 30-second mark.
                    </p>
                </div>

                <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                    <p className="text-sm font-black uppercase tracking-[0.16em] text-emerald-600">
                        Biggest opportunity
                    </p>
                    <p className="mt-3 text-lg font-semibold leading-8 text-slate-800">
                        Create more <span className="font-black text-emerald-600">case-study content</span> framed
                        around documented founder mistakes. Your audience responds 2.4x stronger to
                        vulnerability-led narratives than how-to guides.
                    </p>
                </div>
            </SectionCard>

            <SectionCard icon={Zap} eyebrow="Viral Hooks">
                <div className="grid gap-4 md:grid-cols-2">
                    {data.hooks.map(([hook, tag]) => (
                        <article key={tag} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                            <p className="text-base font-semibold leading-7 text-slate-800">"{hook}"</p>
                            <span className="mt-5 inline-flex rounded-full border border-violet-200 bg-violet-100 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-violet-600">
                                {tag}
                            </span>
                        </article>
                    ))}
                </div>
            </SectionCard>

            <SectionCard icon={Target} eyebrow="Content Opportunities">
                <div className="mb-5 flex justify-end text-sm font-black text-slate-400">Top 5 identified</div>
                <div className="space-y-4">
                    {data.opportunities.map(([title, description, score], index) => (
                        <article
                            key={title}
                            className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:grid-cols-[auto_1fr_90px] sm:items-center"
                        >
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 text-lg font-black text-white">
                                {index + 1}
                            </span>
                            <div>
                                <h3 className="font-black text-slate-950">{title}</h3>
                                <p className="mt-1 text-sm font-semibold leading-6 text-slate-500">{description}</p>
                            </div>
                            <div className="sm:text-right">
                                <p className="text-3xl font-black text-violet-500">{score}</p>
                                <ProgressBar value={score} color="bg-violet-500" />
                                <p className="mt-1 text-sm font-bold text-slate-400">/ 100</p>
                            </div>
                        </article>
                    ))}
                </div>
            </SectionCard>

            <SectionCard icon={Sparkles} eyebrow="AI Content Generator" className="bg-violet-50/70 text-center">
                <span className="mx-auto mb-5 inline-flex rounded-full border border-violet-200 bg-violet-100 px-4 py-2 text-sm font-black uppercase tracking-[0.16em] text-violet-600">
                    AI Content Generator
                </span>
                <h2 className="text-3xl font-black tracking-tight">Ready To Create Content?</h2>
                <p className="mt-3 text-lg font-semibold text-slate-500">
                    Generate platform-specific content from your analysis in one click
                </p>
                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                    {data.generatorActions.map(([label, Icon, color]) => (
                        <button
                            key={label}
                            className={`inline-flex h-14 items-center justify-center gap-3 rounded-xl bg-gradient-to-r px-5 font-black text-white shadow-crisp transition duration-300 hover:-translate-y-0.5 hover:shadow-soft ${color}`}
                        >
                            {Icon ? <Icon className="h-5 w-5" /> : <span className="text-lg font-black">X</span>}
                            {label}
                        </button>
                    ))}
                </div>
            </SectionCard>
        </div>
    );
}
