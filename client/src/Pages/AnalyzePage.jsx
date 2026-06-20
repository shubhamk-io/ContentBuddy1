import LeftAnalysisPanel from '../components/analyzeDashboard/LeftAnalysisPanel'
import RightStatsPanel from '../components/analyzeDashboard/RightStatsPanel'
import { dummyAnalysisReport } from '../data/analyzeData'

export default function AnalyzePage() {
  return (
    <section className="min-h-screen bg-[#f8fbff] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[1240px] gap-6 lg:grid-cols-[1fr_380px]">
        <LeftAnalysisPanel data={dummyAnalysisReport} />
        <RightStatsPanel data={dummyAnalysisReport} />
      </div>
    </section>
  )
}
