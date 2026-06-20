import { BarChart3, BookOpen, Globe2, Users } from "lucide-react";
import { ProgressBar, RadarChart, SectionCard } from "./DashboardPrimitives";

export default function RightStatsPanel({ data }) {
    return (
        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <section className="rounded-[1.5rem] border border-slate-200 bg-white p-6 text-center shadow-crisp">
                <p className="font-black text-slate-400">Viral Potential Score</p>
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                    {data.viralBadges.map((badge, index) => (
                        <span
                            key={badge}
                            className={`rounded-full border px-3 py-1 text-sm font-black ${index === 0
                                    ? "border-violet-200 bg-violet-50 text-violet-600"
                                    : index === 1
                                        ? "border-blue-200 bg-blue-50 text-blue-600"
                                        : "border-emerald-200 bg-emerald-50 text-emerald-600"
                                }`}
                        >
                            {badge}
                        </span>
                    ))}
                </div>
            </section>

            <SectionCard icon={BarChart3} eyebrow="Content Strength Radar">
                <RadarChart />
                <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-slate-200 pt-4">
                    {data.radarStats.map(([label, value]) => (
                        <div key={label} className="flex items-center justify-between text-sm">
                            <span className="font-bold text-slate-500">{label}</span>
                            <span className="font-black text-slate-950">{value}</span>
                        </div>
                    ))}
                </div>
            </SectionCard>

            <SectionCard icon={Users} eyebrow="Audience Breakdown">
                <div className="grid items-center gap-5 sm:grid-cols-[120px_1fr] lg:grid-cols-1 xl:grid-cols-[120px_1fr]">
                    <div className="relative mx-auto h-28 w-28 rounded-full bg-[conic-gradient(#7C3AED_0_45%,#3B82F6_45%_77%,#10B981_77%_100%)]">
                        <div className="absolute inset-5 flex flex-col items-center justify-center rounded-full bg-white">
                            <span className="text-lg font-black">100%</span>
                            <span className="text-[10px] font-bold text-slate-400">audience</span>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {data.audience.map(([label, value, color]) => (
                            <div key={label} className="flex items-center justify-between gap-3">
                                <span className="flex items-center gap-3 font-semibold text-slate-600">
                                    <span className={`h-3 w-3 rounded ${color}`} />
                                    {label}
                                </span>
                                <span className="font-black text-slate-950">{value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </SectionCard>

            <SectionCard icon={Globe2} eyebrow="Market Opportunity">
                <div className="space-y-5">
                    <div>
                        <div className="mb-2 flex justify-between font-bold">
                            <span className="text-slate-600">Market Demand</span>
                            <span>{data.market.demand}%</span>
                        </div>
                        <ProgressBar value={data.market.demand} color="bg-violet-500" />
                    </div>
                    <div>
                        <div className="mb-2 flex justify-between font-bold">
                            <span className="text-slate-600">Competition Level</span>
                            <span>{data.market.competition}%</span>
                        </div>
                        <p className="mb-2 text-sm font-black text-emerald-600">Low = opportunity</p>
                        <ProgressBar value={data.market.competition} color="bg-emerald-500" />
                    </div>
                    <div>
                        <div className="mb-2 flex justify-between font-bold">
                            <span className="text-slate-600">Growth Potential</span>
                            <span>{data.market.growthPotential}%</span>
                        </div>
                        <ProgressBar value={data.market.growthPotential} color="bg-blue-500" />
                    </div>
                </div>
            </SectionCard>

            <SectionCard icon={BookOpen} eyebrow="Competitor Benchmark">
                <div className="space-y-5">
                    {data.benchmark.map(([label, value, color]) => (
                        <div key={label} className="grid grid-cols-[120px_1fr_36px] items-center gap-3 text-sm">
                            <span className="font-bold text-slate-600">{label}</span>
                            <ProgressBar value={value} color={color} />
                            <span className="text-right font-black text-slate-600">{value}</span>
                        </div>
                    ))}
                    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                        <p className="font-black text-amber-600">Gap Analysis</p>
                        <p className="mt-2 font-semibold leading-7 text-slate-600">
                            You're <span className="font-black text-amber-600">13 points behind</span> top creators.
                            Focus on stronger hooks and mid-content re-engagement to close the gap.
                        </p>
                    </div>
                </div>
            </SectionCard>
        </aside>
    );
}
