import {
    BrainCircuit,
    Compass,
    Factory,
    FileText,
    Lightbulb,
    Radar,
    SearchCheck,
    Sparkles,
    Timer,
    Zap
  } from "lucide-react";
  
  export const summaryCards = [
    ["Content Niche", "Entrepreneur / SaaS Productivity"],
    ["Main Topic", "Morning routines & founder productivity"],
    ["Target Audience", "Early-stage founders, indie hackers aged 22-38"],
    ["Why It Performs", "Curiosity-driven hooks + educational storytelling with social proof"]
  ];
  
  export const hooks = [
    ["Nobody talks about this productivity secret that top founders use every morning...", "Curiosity Gap"],
    ["I wasted 6 months following bad advice before I discovered this framework...", "Personal Failure"],
    ["Stop doing this if you want to build a successful SaaS - you're killing your own growth.", "Pattern Interrupt"],
    ["The truth about content consistency: most creators have it completely backwards.", "Contrarian"],
    ["Before you start creating more content, you need to watch this...", "Urgency Loop"],
    ["What if your morning routine is the reason you're not growing as fast as you should?", "Reframe"]
  ];
  
  export const opportunities = [
    ["AI SaaS Validation Content", "High demand for early-stage founder stories with proof-of-concept walkthroughs.", 96],
    ["Founder Mistake Case Studies", "Authentic failure content with lessons converts 3x better in this niche.", 92],
    ["Weekly Productivity Systems", "Series format with accountability mechanics performs strongly with your audience.", 88],
    ["Build-in-Public Documentaries", "Long-form episodes tracking product development drive loyal subscriber bases.", 84],
    ["Tool Stack Breakdowns", "Comparative reviews with affiliate potential and high search intent volume.", 79]
  ];
  
  export const radarStats = [
    ["Hooks", 88],
    ["Storytelling", 75],
    ["Retention", 92],
    ["Trend Fit", 71],
    ["Authority", 85],
    ["Engagement", 80]
  ];
  
  export const audience = [
    ["Founders", "45%", "bg-violet-600"],
    ["Creators", "32%", "bg-blue-500"],
    ["Developers", "23%", "bg-emerald-500"]
  ];
  
  export const generatorActions = [
    ["LinkedIn Post", FileText, "from-[#0A66C2] to-[#1594D2]"],
    ["X Thread", null, "from-slate-950 to-slate-700"],
    ["Instagram Caption", Sparkles, "from-[#D62976] to-[#8E3DD8]"],
    ["YouTube Script", FileText, "from-[#FF0000] to-[#D70000]"],
    ["Reel Script", Zap, "from-[#7C3AED] to-[#3B82F6]"],
    ["Blog Post", FileText, "from-slate-200 to-slate-100 text-slate-600 border border-slate-300"]
  ];
  
  export const dummyAnalysisReport = {
    sourceUrl: "youtube.com/watch?v=dQw4w9WgXcQ",
    platform: "YouTube",
    generatedAt: "Generated 2 minutes ago",
    viralBadges: ["Top 9%", "High Hook", "Shareable"],
    summaryCards,
    hooks,
    opportunities,
    radarStats,
    audience,
    generatorActions,
    market: {
      demand: 87,
      competition: 42,
      growthPotential: 93
    },
    benchmark: [
      ["Your Content", 78, "bg-violet-500"],
      ["Top Creators", 91, "bg-blue-500"],
      ["Category Avg", 54, "bg-slate-400"]
    ]
  };
  
  export const resultCards = [
    {
      icon: BrainCircuit,
      title: "Understand why creators grow",
      description: "See the signals behind audience growth, engagement, and repeatable creator momentum."
    },
    {
      icon: SearchCheck,
      title: "Discover winning content patterns",
      description: "Find the formats, hooks, topics, and posting habits that consistently perform."
    },
    {
      icon: Compass,
      title: "Reduce content guesswork",
      description: "Replace random posting with clear direction based on proven creator behavior."
    },
    {
      icon: Timer,
      title: "Save hours of manual research",
      description: "Skip the spreadsheet grind and move from profile analysis to content planning faster."
    },
    {
      icon: Radar,
      title: "Identify content opportunities",
      description: "Spot gaps, angles, and topics your audience already responds to in your niche."
    },
    {
      icon: Lightbulb,
      title: "Make smarter content decisions",
      description: "Prioritize ideas with stronger evidence before your team spends time producing them."
    },
    {
      icon: Sparkles,
      title: "Learn from proven creator strategies",
      description: "Study what already works and adapt those patterns into your own authentic playbook."
    },
    {
      icon: Factory,
      title: "Build a repeatable growth system",
      description: "Turn one-off research into a reliable process for content strategy and execution."
    }
  ];
  
