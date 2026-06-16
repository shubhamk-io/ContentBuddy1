import { useState } from 'react'
import Navbar from './Navbar'

const categories = [
  'Business',
  'Marketing',
  'AI',
  'Education',
  'Finance',
  'Tech',
  'Personal Brand',
  'Fitness',
  'Entertainment',
  'Custom',
]

const trustPoints = [
  'AI-Powered Analysis',
  'Creator Pattern Recognition',
  'Viral Content Research',
  'Actionable Insights',
]

const features = [
  {
    title: 'Hook Analysis',
    text: 'Discover exactly what captures attention in the crucial first 3 seconds.',
    color: 'bg-[#efdfff] text-[#7c2fff]',
    icon: (
      <path d="M9 6.6v10.8c0 .75.82 1.22 1.47.84l8.9-5.4a.98.98 0 0 0 0-1.68l-8.9-5.4A.98.98 0 0 0 9 6.6Z" />
    ),
  },
  {
    title: 'Pattern Recognition',
    text: 'Identify structural patterns that keep viewers engaged till the end.',
    color: 'bg-[#dbeafe] text-[#2563eb]',
    icon: <path d="M5 14h3l2-8 4 13 2.4-8H20" />,
  },
  {
    title: 'Growth Insights',
    text: 'Actionable takeaways to apply to your own content strategy.',
    color: 'bg-[#d1fae5] text-[#059669]',
    icon: <path d="M5 16l5-5 3 3 6-7m0 0h-5m5 0v5" />,
  },
]

function AnalyzerCard() {
  const [contentUrl, setContentUrl] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Marketing')
  const [customCategory, setCustomCategory] = useState('')
  const [message, setMessage] = useState('')

  const activeCategory = selectedCategory === 'Custom' && customCategory.trim()
    ? customCategory.trim()
    : selectedCategory

  const handleCategoryClick = (category) => {
    setSelectedCategory(category)
    setMessage('')
  }

  const handleAnalyze = () => {
    if (!contentUrl.trim()) {
      setMessage('Please paste a YouTube, Instagram, Reel, Short, or TikTok URL first.')
      return
    }

    if (selectedCategory === 'Custom' && !customCategory.trim()) {
      setMessage('Add your custom category name before analyzing.')
      return
    }

    setMessage(`Ready to analyze this ${activeCategory} content link.`)
  }

  return (
    <div id="analyzer" className="mx-auto mt-8 max-w-[920px] scroll-mt-8 rounded-[16px] border border-slate-200/80 bg-white px-4 py-5 text-left shadow-[0_8px_28px_rgba(15,23,42,0.08)] sm:mt-10 sm:px-5 md:mt-12 md:rounded-[18px] md:px-8 md:py-8">
      <label htmlFor="content-url" className="sr-only">Content URL</label>
      <input
        id="content-url"
        type="url"
        value={contentUrl}
        onChange={(event) => {
          setContentUrl(event.target.value)
          setMessage('')
        }}
        placeholder="Paste YouTube, Instagram, Reel or Short URL..."
        className="flex min-h-14 w-full items-center rounded-[12px] border border-slate-200 bg-[#f8fafc] px-4 text-sm font-medium leading-6 text-[#334155] outline-none transition placeholder:text-[#94a3b8] focus:border-[#6f47f2] focus:bg-white focus:ring-4 focus:ring-[#7440f1]/10 sm:h-16 sm:px-5 sm:text-base md:h-[68px] md:px-6 md:text-lg"
      />

      <div className="mt-5 md:mt-6">
        <p className="mb-3 text-sm font-semibold text-[#475569]">Content Category</p>
        <div className="flex flex-wrap gap-2 sm:gap-2.5">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => handleCategoryClick(category)}
              className={`rounded-full border px-3 py-2 text-xs font-semibold shadow-sm transition hover:-translate-y-0.5 sm:px-4 sm:py-2.5 sm:text-sm ${
                category === selectedCategory
                  ? 'border-transparent bg-gradient-to-r from-[#733cf1] to-[#347df5] text-white'
                  : 'border-slate-200 bg-[#f1f5f9] text-[#475569]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {selectedCategory === 'Custom' && (
        <div className="mt-4">
          <label htmlFor="custom-category" className="mb-2 block text-xs font-semibold text-[#475569]">
            Custom Category
          </label>
          <input
            id="custom-category"
            type="text"
            value={customCategory}
            onChange={(event) => {
              setCustomCategory(event.target.value)
              setMessage('')
            }}
            placeholder="Example: Gaming, Beauty, Real Estate..."
            className="h-12 w-full rounded-[12px] border border-slate-200 bg-[#f8fafc] px-4 text-sm font-medium text-[#334155] outline-none transition placeholder:text-[#94a3b8] focus:border-[#6f47f2] focus:bg-white focus:ring-4 focus:ring-[#7440f1]/10"
          />
        </div>
      )}

      <button
        type="button"
        onClick={handleAnalyze}
        className="mt-6 flex h-14 w-full items-center justify-center gap-2.5 rounded-[12px] bg-gradient-to-r from-[#8747ed] to-[#4385f5] text-base font-extrabold text-white shadow-[0_8px_16px_rgba(67,91,229,0.22)] transition hover:-translate-y-0.5 active:translate-y-0 sm:h-16 sm:text-lg md:mt-7 md:h-[68px] md:gap-3 md:text-xl"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" aria-hidden="true">
          <path d="M12 4c.5 2.8 1.36 3.65 4.15 4.15C13.36 8.64 12.5 9.5 12 12.3c-.5-2.8-1.36-3.66-4.15-4.15C10.64 7.65 11.5 6.8 12 4Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
          <path d="M7 13c.32 1.82.9 2.4 2.72 2.72C7.9 16.04 7.32 16.62 7 18.45c-.32-1.83-.9-2.41-2.72-2.73C6.1 15.4 6.68 14.82 7 13Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
        </svg>
        Analyze Content
      </button>

      {message && (
        <p className={`mt-3 rounded-[10px] px-3 py-2.5 text-center text-xs font-semibold ${
          message.startsWith('Ready')
            ? 'bg-emerald-50 text-emerald-700'
            : 'bg-rose-50 text-rose-700'
        }`}>
          {message}
        </p>
      )}

      <div className="mt-6 grid gap-4 text-xs font-bold text-[#94a3b8] sm:grid-cols-2 md:mt-8 lg:grid-cols-4">
        {trustPoints.map((point) => (
          <div key={point} className="flex items-center justify-center gap-2.5">
            <span className="grid h-4 w-4 place-items-center rounded-full border-2 border-[#10b981] text-[#10b981]">
              <svg viewBox="0 0 16 16" className="h-2.5 w-2.5" fill="none" aria-hidden="true">
                <path d="m4 8 2.2 2.2L12 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            {point}
          </div>
        ))}
      </div>
    </div>
  )
}

function TrustStrip() {
  const avatars = [
    'https://i.pravatar.cc/80?img=12',
    'https://i.pravatar.cc/80?img=32',
    'https://i.pravatar.cc/80?img=68',
    'https://i.pravatar.cc/80?img=59',
    'https://i.pravatar.cc/80?img=47',
  ]

  return (
    <div className="mx-auto mt-10 flex max-w-xl flex-col items-center px-6 sm:mt-14">
      <div className="flex -space-x-2.5">
        {avatars.map((avatar) => (
          <img key={avatar} src={avatar} alt="" className="h-10 w-10 rounded-full border-2 border-white object-cover shadow-sm" />
        ))}
      </div>
      <p className="mt-4 text-center text-sm font-semibold text-[#475569]">
        Trusted by 12,000+ creators and marketers
      </p>
    </div>
  )
}

function FeatureGrid() {
  return (
    <div id="features" className="mx-auto mt-10 grid max-w-[980px] gap-8 px-6 pb-12 sm:mt-14 md:grid-cols-3 md:gap-6 md:pb-16 lg:gap-8">
      {features.map((feature) => (
        <article key={feature.title} className="text-center">
          <div className={`mx-auto grid h-[50px] w-[50px] place-items-center rounded-[10px] ${feature.color}`}>
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {feature.icon}
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-extrabold text-[#111827] sm:mt-5 sm:text-xl">{feature.title}</h3>
          <p className="mx-auto mt-3 max-w-[280px] text-sm leading-6 text-[#475569]">{feature.text}</p>
        </article>
      ))}
    </div>
  )
}

export default function HeroSection() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-200/70 bg-[#f8fbff]">
        <Navbar />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e6edf5_1px,transparent_1px),linear-gradient(to_bottom,#e6edf5_1px,transparent_1px)] bg-[size:50px_50px] opacity-65" />
        <div className="absolute -left-28 -top-28 h-[420px] w-[420px] rounded-full bg-[#b996ff]/25 blur-[95px]" />
        <div className="absolute right-0 top-0 h-[340px] w-[340px] rounded-full bg-white/70 blur-[80px]" />

        <div className="relative mx-auto max-w-[1240px] px-4 pb-6 pt-[96px] text-center sm:px-6 sm:pt-[108px] md:px-8 md:pt-[118px]">
          <h1 className="[font-family:'Playfair_Display',serif] text-[36px] font-black leading-[1.05] tracking-normal text-[#0f172a] min-[390px]:text-[42px] sm:text-[54px] md:text-[62px] lg:text-[72px]">
            Understand Why
            <br />
            <span className="bg-gradient-to-r from-[#723cf1] to-[#367df5] bg-clip-text text-transparent">
              Content Wins
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-[720px] text-[15px] font-medium leading-[1.6] text-[#475569] sm:mt-6 sm:text-[17px] md:mt-7 md:text-[19px]">
            Paste any YouTube, Instagram, Reel, Short, or TikTok link. ContentBuddy reveals the patterns, strategies, hooks, and growth opportunities behind high-performing content.
          </p>

          <AnalyzerCard />
        </div>
      </section>

      <section className="bg-gradient-to-b from-white to-[#f8fbff]">
        <TrustStrip />
        <FeatureGrid />
      </section>
    </>
  )
}
