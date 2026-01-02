import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Infinity, Lock, Zap, BrainCircuit, BarChart2 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-zinc-900">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-zinc-900">
            <div className="w-7 h-7 bg-zinc-900 rounded-lg flex items-center justify-center text-white">
              <Infinity className="w-4 h-4" />
            </div>
            ViralLoop
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-500">
            <a href="#features" className="hover:text-zinc-900">Features</a>
            <a href="#pricing" className="hover:text-zinc-900">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
             <Link to="/login" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 px-3 py-2">Sign in</Link>
             <Link to="/dashboard" className="bg-zinc-900 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-all">
               Get Started
             </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative pt-20 pb-32 overflow-hidden border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 text-center z-10 relative">
           <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter text-zinc-900 mb-6 max-w-4xl mx-auto leading-[1.1]">
              Turn video content into <br className="hidden md:block" />
              <span className="text-zinc-500">revenue-generating assets.</span>
           </h1>
           <p className="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto mb-10 leading-relaxed">
              Stop manually rewriting content. Our AI engine analyzes your video, extracts viral hooks, and generates optimized posts for LinkedIn, X, and SEO blogs.
           </p>
           <div className="flex flex-col sm:flex-row gap-3 items-center justify-center mb-16">
              <Link to="/dashboard" className="w-full sm:w-auto hover:bg-zinc-800 transition-all flex gap-2 shadow-xl shadow-zinc-900/10 font-medium text-white bg-zinc-900 h-12 rounded-lg px-8 items-center justify-center">
                 Start Building Free <ArrowRight className="w-4 h-4" />
              </Link>
           </div>

           {/* Screenshot Section */}
           <div className="relative max-w-5xl mx-auto mt-16 shadow-2xl rounded-xl overflow-hidden border border-zinc-200">
              <img src="/img/dashboard_initial.png" alt="ViralLoop Dashboard Interface" className="w-full h-auto object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none"></div>
           </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-24 bg-white" id="features">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-8 rounded-2xl border border-zinc-200 bg-zinc-50">
                 <div className="w-10 h-10 rounded-lg bg-white border border-zinc-200 flex items-center justify-center mb-6 shadow-sm text-blue-600">
                    <Zap className="w-5 h-5" />
                 </div>
                 <h3 className="text-xl font-semibold text-zinc-900 mb-2">Instant Repurposing</h3>
                 <p className="text-zinc-500">Paste a YouTube URL and get a week's worth of content in 30 seconds.</p>
              </div>
              <div className="p-8 rounded-2xl border border-zinc-200 bg-white">
                 <div className="w-10 h-10 rounded-lg bg-zinc-50 border border-zinc-100 flex items-center justify-center mb-6 text-purple-600">
                    <BrainCircuit className="w-5 h-5" />
                 </div>
                 <h3 className="text-xl font-semibold text-zinc-900 mb-2">Contextual AI</h3>
                 <p className="text-zinc-500">Our model understands nuance, sarcasm, and industry jargon.</p>
              </div>
              <div className="p-8 rounded-2xl border border-zinc-200 bg-zinc-900 text-white">
                 <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center mb-6 shadow-sm text-emerald-400">
                    <BarChart2 className="w-5 h-5" />
                 </div>
                 <h3 className="text-xl font-semibold mb-2">Performance Prediction</h3>
                 <p className="text-zinc-400">Score content against viral posts before you publish.</p>
              </div>
           </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-zinc-50 border-t border-zinc-200 pt-16 pb-12">
         <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <div className="flex items-center gap-2 font-bold text-zinc-900">
               <div className="w-6 h-6 bg-zinc-900 rounded flex items-center justify-center text-white">
                  <Infinity className="w-3 h-3" />
               </div>
               ViralLoop
            </div>
            <div className="text-xs text-zinc-400">© 2024 ViralLoop Inc.</div>
         </div>
      </footer>
    </div>
  );
}
