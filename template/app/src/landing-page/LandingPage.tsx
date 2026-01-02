import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Infinity, Lock, Zap, BrainCircuit, BarChart2, Twitter, Linkedin } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-zinc-900 overflow-x-hidden">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-zinc-900 group cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <div className="w-7 h-7 bg-zinc-900 rounded-lg flex items-center justify-center text-white shadow-lg shadow-zinc-900/10 transition-transform group-hover:rotate-12">
              <Infinity className="w-4 h-4" />
            </div>
            <span className="font-bold text-base tracking-tight">ViralLoop</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-500">
            <a href="#features" className="hover:text-zinc-900 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-zinc-900 transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
             <Link to="/login" className="hidden md:block text-sm font-medium text-zinc-500 hover:text-zinc-900 px-3 py-2 transition-colors">Sign in</Link>
             <Link to="/dashboard" className="bg-zinc-900 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0">
               Get Started
             </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative pt-20 pb-32 overflow-hidden border-b border-zinc-100">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.3] pointer-events-none"></div>
        {/* Gradient Blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-blue-50/60 via-purple-50/30 to-transparent rounded-[100%] blur-3xl pointer-events-none -z-10"></div>

        <div className="max-w-7xl mx-auto px-6 text-center z-10 relative">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200 shadow-sm mb-8 animate-enter hover:border-zinc-300 transition-colors cursor-default">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-medium text-zinc-600 uppercase tracking-wide">Gen-2 Engine Live</span>
           </div>

           <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter text-zinc-900 mb-6 max-w-4xl mx-auto leading-[1.1] animate-enter" style={{animationDelay: '0.1s'}}>
              Turn video content into <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-zinc-900 via-zinc-600 to-zinc-400">revenue-generating assets.</span>
           </h1>
           <p className="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto mb-10 leading-relaxed animate-enter" style={{animationDelay: '0.2s'}}>
              Stop manually rewriting content. Our AI engine analyzes your video, extracts viral hooks, and generates optimized posts for LinkedIn, X, and SEO blogs.
           </p>
           <div className="flex flex-col sm:flex-row gap-3 items-center justify-center mb-16 animate-enter" style={{animationDelay: '0.3s'}}>
              <Link to="/dashboard" className="w-full sm:w-auto hover:bg-zinc-800 transition-all flex gap-2 shadow-xl shadow-zinc-900/10 font-medium text-white bg-zinc-900 h-12 rounded-lg px-8 items-center justify-center group">
                 Start Building Free <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <button className="w-full sm:w-auto h-12 px-8 bg-white text-zinc-700 border border-zinc-200 rounded-lg font-medium hover:bg-zinc-50 transition-colors flex items-center justify-center gap-2 shadow-sm">
                  See how it works
              </button>
           </div>

           {/* Screenshot Section */}
           <div className="relative max-w-5xl mx-auto mt-16 shadow-2xl rounded-xl overflow-hidden border border-zinc-200 animate-enter" style={{animationDelay: '0.5s'}}>
              <img src="/img/dashboard_initial.png" alt="ViralLoop Dashboard Interface" className="w-full h-auto object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent pointer-events-none opacity-20"></div>
           </div>
        </div>
      </div>

      {/* Trusted By Section */}
      <div className="border-b border-zinc-100 py-10 bg-zinc-50/50">
          <div className="max-w-7xl mx-auto px-6">
              <p className="text-center text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-8">Trusted by marketing teams at</p>
              <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 grayscale opacity-60">
                  {/* Simple SVG placeholders for logos */}
                  <div className="h-6 w-24 bg-zinc-300 rounded opacity-50"></div>
                  <div className="h-6 w-24 bg-zinc-300 rounded opacity-50"></div>
                  <div className="h-6 w-24 bg-zinc-300 rounded opacity-50"></div>
                  <div className="h-6 w-24 bg-zinc-300 rounded opacity-50"></div>
              </div>
          </div>
      </div>

      {/* Features Grid */}
      <div className="py-24 bg-white" id="features">
        <div className="max-w-7xl mx-auto px-6">
           <div className="mb-16">
                <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 mb-4">Capabilities built for scale.</h2>
                <p className="text-zinc-500 max-w-xl text-lg">We don't just summarize. We extract context, tone, and intent to create content that sounds like you.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 p-8 rounded-2xl border border-zinc-200 bg-zinc-50 relative overflow-hidden group">
                 <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-zinc-100 to-transparent"></div>
                 <div className="relative z-10">
                     <div className="w-10 h-10 rounded-lg bg-white border border-zinc-200 flex items-center justify-center mb-6 shadow-sm text-blue-600">
                        <Zap className="w-5 h-5" />
                     </div>
                     <h3 className="text-xl font-semibold text-zinc-900 mb-2">Instant Repurposing</h3>
                     <p className="text-zinc-500 max-w-sm">Paste a YouTube URL and get a week's worth of content in 30 seconds. Support for shorts, long-form, and podcasts.</p>
                 </div>
              </div>

              <div className="p-8 rounded-2xl border border-zinc-200 bg-white group hover:border-zinc-300 transition-colors">
                 <div className="w-10 h-10 rounded-lg bg-zinc-50 border border-zinc-100 flex items-center justify-center mb-6 text-purple-600">
                    <BrainCircuit className="w-5 h-5" />
                 </div>
                 <h3 className="text-xl font-semibold text-zinc-900 mb-2">Contextual AI</h3>
                 <p className="text-zinc-500">Our model understands nuance, sarcasm, and industry jargon better than generic LLMs.</p>
              </div>

              <div className="p-8 rounded-2xl border border-zinc-200 bg-white group hover:border-zinc-300 transition-colors">
                 <div className="w-10 h-10 rounded-lg bg-zinc-50 border border-zinc-100 flex items-center justify-center mb-6 text-orange-600">
                    <Check className="w-5 h-5" />
                 </div>
                 <h3 className="text-xl font-semibold text-zinc-900 mb-2">Tone Matching</h3>
                 <p className="text-zinc-500">Train the engine on your previous writing to maintain a consistent brand voice automatically.</p>
              </div>

              <div className="md:col-span-2 md:col-start-2 p-8 rounded-2xl border border-zinc-200 bg-zinc-900 text-white relative overflow-hidden group">
                 <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                 <div className="relative z-10">
                     <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center mb-6 shadow-sm text-emerald-400">
                        <BarChart2 className="w-5 h-5" />
                     </div>
                     <h3 className="text-xl font-semibold mb-2">Performance Prediction</h3>
                     <p className="text-zinc-400 max-w-sm">We score generated content against millions of viral posts to predict engagement before you publish.</p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-zinc-50 border-t border-zinc-200 pt-16 pb-12">
         <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 font-bold text-zinc-900">
                   <div className="w-6 h-6 bg-zinc-900 rounded flex items-center justify-center text-white">
                      <Infinity className="w-3 h-3" />
                   </div>
                   ViralLoop
                </div>
                <div className="text-xs text-zinc-400">© 2024 ViralLoop Inc. All rights reserved.</div>
                <div className="flex gap-4 text-zinc-400">
                    <Twitter className="w-4 h-4 hover:text-zinc-900 transition-colors cursor-pointer" />
                    <Linkedin className="w-4 h-4 hover:text-zinc-900 transition-colors cursor-pointer" />
                </div>
            </div>
         </div>
      </footer>
    </div>
  );
}
