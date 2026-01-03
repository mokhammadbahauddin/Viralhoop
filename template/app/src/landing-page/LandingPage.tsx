import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Infinity, Lock, Zap, BrainCircuit, BarChart2, Twitter, Linkedin, Github, PlayCircle, ChevronRight, PenTool } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-zinc-900 overflow-x-hidden">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <div className="w-7 h-7 bg-zinc-900 rounded-lg flex items-center justify-center text-white shadow-lg shadow-zinc-900/10 transition-transform group-hover:rotate-12">
              <Infinity className="w-4 h-4" />
            </div>
            <span className="font-bold text-base tracking-tight text-zinc-900">ViralLoop</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-500">
            <a href="#features" className="hover:text-zinc-900 transition-colors">Features</a>
            <a href="#customers" className="hover:text-zinc-900 transition-colors">Customers</a>
            <a href="#pricing" className="hover:text-zinc-900 transition-colors">Pricing</a>
            <a href="#blog" className="hover:text-zinc-900 transition-colors">Resources</a>
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

        <div className="relative max-w-7xl mx-auto px-6 text-center z-10">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200 shadow-sm mb-8 animate-enter hover:border-zinc-300 transition-colors cursor-default">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-medium text-zinc-600 uppercase tracking-wide">Gen-2 Engine Live</span>
                <span className="w-px h-3 bg-zinc-200 mx-1"></span>
                <span className="text-xs text-zinc-400 flex items-center gap-1">Read Update <ArrowRight className="w-3 h-3" /></span>
           </div>

           <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter text-zinc-900 mb-6 max-w-4xl mx-auto leading-[1.1] animate-enter" style={{animationDelay: '0.1s'}}>
              Turn video content into <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-zinc-900 via-zinc-600 to-zinc-400">revenue-generating assets.</span>
           </h1>
           <p className="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto mb-10 leading-relaxed animate-enter" style={{animationDelay: '0.2s'}}>
              Stop manually rewriting content. Our AI engine analyzes your video, extracts viral hooks, and generates optimized posts for LinkedIn, X, and SEO blogs.
           </p>
           <div className="flex flex-col sm:flex-row animate-enter gap-3 items-center justify-center mb-16" style={{animationDelay: '0.3s'}}>
              <Link to="/dashboard" className="w-full sm:w-auto hover:bg-zinc-800 transition-all flex gap-2 shadow-xl shadow-zinc-900/10 font-medium text-white bg-zinc-900 h-12 rounded-lg px-8 items-center justify-center group">
                 Start Building Free <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <button className="w-full sm:w-auto h-12 px-8 bg-white text-zinc-700 border border-zinc-200 rounded-lg font-medium hover:bg-zinc-50 transition-colors flex items-center justify-center gap-2 shadow-sm">
                  <PlayCircle className="w-4 h-4 text-zinc-400" />
                  See how it works
              </button>
           </div>

           {/* Interface Mockup */}
           <div className="relative max-w-5xl mx-auto animate-enter" style={{animationDelay: '0.5s'}}>
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-20 h-full w-full pointer-events-none"></div>

              <div className="rounded-xl bg-zinc-900 p-2 shadow-2xl border border-zinc-800 ring-1 ring-white/10 relative overflow-hidden group">
                  {/* Top Bar */}
                  <div className="h-10 bg-zinc-950 border-b border-zinc-800 flex items-center px-4 gap-2 rounded-t-lg">
                      <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
                      </div>
                      <div className="ml-4 flex-1 flex justify-center">
                          <div className="bg-zinc-900 border border-zinc-800 rounded px-3 py-1 text-[10px] text-zinc-500 font-mono flex items-center gap-2">
                              <Lock className="w-2 h-2" />
                              viralloop.ai/engine/v2
                          </div>
                      </div>
                  </div>

                  {/* Content Area */}
                  <div className="bg-zinc-950 rounded-b-lg overflow-hidden aspect-[16/9] relative grid grid-cols-12 text-left">

                      {/* Left Sidebar Mock */}
                      <div className="col-span-3 border-r border-zinc-800 p-4 hidden md:block">
                          <div className="flex items-center gap-2 text-zinc-400 mb-6">
                              <div className="w-6 h-6 rounded bg-zinc-800"></div>
                              <div className="h-3 w-16 bg-zinc-800 rounded"></div>
                          </div>
                          <div className="space-y-3">
                              <div className="h-8 w-full bg-zinc-900 border border-zinc-800 rounded flex items-center px-2">
                                  <div className="h-2 w-20 bg-zinc-800 rounded"></div>
                              </div>
                              <div className="h-8 w-full bg-transparent rounded flex items-center px-2">
                                  <div className="h-2 w-16 bg-zinc-800/50 rounded"></div>
                              </div>
                              <div className="h-8 w-full bg-transparent rounded flex items-center px-2">
                                  <div className="h-2 w-24 bg-zinc-800/50 rounded"></div>
                              </div>
                          </div>
                          <div className="mt-8 pt-6 border-t border-zinc-800 space-y-3">
                              <div className="flex gap-2">
                                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                  <div className="h-2 w-12 bg-zinc-800 rounded"></div>
                              </div>
                              <div className="flex gap-2">
                                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                                  <div className="h-2 w-16 bg-zinc-800 rounded"></div>
                              </div>
                          </div>
                      </div>

                      {/* Main Editor Mock */}
                      <div className="col-span-12 md:col-span-6 p-6 border-r border-zinc-800 flex flex-col relative">
                          {/* Floating Process Tag */}
                          <div className="absolute top-6 right-6 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2 py-1 rounded text-[10px] font-medium flex items-center gap-1.5 animate-pulse">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                              Optimized
                          </div>

                          <div className="h-6 w-3/4 bg-zinc-800 rounded mb-4 animate-pulse"></div>
                          <div className="space-y-2 mb-6">
                              <div className="h-3 w-full bg-zinc-800/50 rounded"></div>
                              <div className="h-3 w-full bg-zinc-800/50 rounded"></div>
                              <div className="h-3 w-5/6 bg-zinc-800/50 rounded"></div>
                          </div>

                          <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg mb-4">
                              <div className="flex items-center gap-3 mb-3">
                                  <div className="w-8 h-8 rounded-full bg-zinc-800"></div>
                                  <div className="space-y-1">
                                      <div className="h-2 w-24 bg-zinc-800 rounded"></div>
                                      <div className="h-2 w-16 bg-zinc-800/50 rounded"></div>
                                  </div>
                              </div>
                              <div className="space-y-2">
                                  <div className="h-2 w-full bg-zinc-800 rounded"></div>
                                  <div className="h-2 w-full bg-zinc-800 rounded"></div>
                                  <div className="h-2 w-2/3 bg-zinc-800 rounded"></div>
                              </div>
                          </div>
                      </div>

                      {/* Right Config Mock */}
                      <div className="col-span-3 p-4 hidden md:flex flex-col gap-4">
                          <div className="p-3 bg-zinc-900 rounded border border-zinc-800">
                              <div className="h-2 w-16 bg-zinc-800 rounded mb-3"></div>
                              <div className="flex gap-1">
                                  <div className="h-6 w-8 bg-zinc-800 rounded border border-zinc-700"></div>
                                  <div className="h-6 w-8 bg-zinc-800 rounded"></div>
                                  <div className="h-6 w-8 bg-zinc-800 rounded"></div>
                              </div>
                          </div>
                          <div className="p-3 bg-zinc-900 rounded border border-zinc-800">
                              <div className="flex justify-between mb-2">
                                  <div className="h-2 w-12 bg-zinc-800 rounded"></div>
                                  <div className="h-2 w-4 bg-blue-500 rounded"></div>
                              </div>
                              <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                                  <div className="h-full w-3/4 bg-blue-600"></div>
                              </div>
                          </div>
                          {/* Code Snippet */}
                          <div className="mt-auto font-mono text-[8px] text-zinc-600 p-2 bg-zinc-900/50 rounded">
                              <span className="text-purple-400">const</span> <span className="text-blue-400">generate</span> = <span className="text-yellow-400">async</span> () ={'>'} {'{'}<br />
                              &nbsp;&nbsp;<span className="text-purple-400">await</span> ai.<span className="text-blue-400">process</span>(video);<br />
                              {'}'}
                          </div>
                      </div>
                  </div>
              </div>
           </div>
        </div>
      </div>

      {/* Trusted By Section */}
      <div className="border-b border-zinc-100 py-10 bg-zinc-50/50">
          <div className="max-w-7xl mx-auto px-6">
              <p className="text-center text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-8">Trusted by marketing teams at</p>
              <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 grayscale opacity-60">
                  <svg className="h-6 w-auto text-zinc-400 fill-current" viewBox="0 0 100 30"><path d="M10,15 L20,5 L30,15 L20,25 Z M40,5 H50 V25 H40 Z M60,5 H90 V10 H65 V12 H85 V17 H65 V25 H60 Z" /></svg>
                  <svg className="h-7 w-auto text-zinc-400 fill-current" viewBox="0 0 100 30"><circle cx="15" cy="15" r="10"/><rect x="35" y="5" width="10" height="20"/><rect x="55" y="5" width="30" height="5"/><rect x="55" y="12" width="20" height="5"/><rect x="55" y="20" width="30" height="5"/></svg>
                  <svg className="h-6 w-auto text-zinc-400 fill-current" viewBox="0 0 100 30"><path d="M10,25 L20,5 L30,25 M15,18 H25 M40,5 H60 M50,5 V25 M70,5 H90 L70,25 H90"/></svg>
                  <svg className="h-5 w-auto text-zinc-400 fill-current" viewBox="0 0 100 30"><rect x="5" y="5" width="20" height="20"/><rect x="35" y="5" width="20" height="20" rx="10"/><rect x="65" y="5" width="20" height="20" rx="5"/></svg>
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
              {/* Feature 1 (Large) */}
              <div className="md:col-span-2 p-8 rounded-2xl border border-zinc-200 bg-zinc-50 relative overflow-hidden group">
                 <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-zinc-100 to-transparent"></div>
                 <div className="relative z-10">
                     <div className="w-10 h-10 rounded-lg bg-white border border-zinc-200 flex items-center justify-center mb-6 shadow-sm text-blue-600">
                        <Zap className="w-5 h-5" />
                     </div>
                     <h3 className="text-xl font-semibold text-zinc-900 mb-2">Instant Repurposing</h3>
                     <p className="text-zinc-500 max-w-sm">Paste a YouTube URL and get a week's worth of content in 30 seconds. Support for shorts, long-form, and podcasts.</p>
                 </div>
                 <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 opacity-50 group-hover:opacity-100 transition-opacity transform group-hover:-translate-y-2 duration-500">
                    <div className="w-64 bg-white rounded-lg shadow-xl border border-zinc-200 p-3 space-y-2">
                        <div className="flex items-center gap-2 border-b border-zinc-100 pb-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <div className="text-[10px] text-zinc-400 font-mono">youtube.com/watch?v=...</div>
                        </div>
                        <div className="space-y-1.5">
                            <div className="h-1.5 bg-zinc-100 rounded w-full"></div>
                            <div className="h-1.5 bg-zinc-100 rounded w-5/6"></div>
                            <div className="h-1.5 bg-zinc-100 rounded w-4/6"></div>
                        </div>
                    </div>
                 </div>
              </div>

              {/* Feature 2 */}
              <div className="p-8 rounded-2xl border border-zinc-200 bg-white group hover:border-zinc-300 transition-colors">
                 <div className="w-10 h-10 rounded-lg bg-zinc-50 border border-zinc-100 flex items-center justify-center mb-6 text-purple-600">
                    <BrainCircuit className="w-5 h-5" />
                 </div>
                 <h3 className="text-xl font-semibold text-zinc-900 mb-2">Contextual AI</h3>
                 <p className="text-zinc-500 text-sm leading-relaxed">Our model understands nuance, sarcasm, and industry jargon better than generic LLMs.</p>
              </div>

              {/* Feature 3 */}
              <div className="p-8 rounded-2xl border border-zinc-200 bg-white group hover:border-zinc-300 transition-colors">
                 <div className="w-10 h-10 rounded-lg bg-zinc-50 border border-zinc-100 flex items-center justify-center mb-6 text-orange-600">
                    <PenTool className="w-5 h-5" />
                 </div>
                 <h3 className="text-xl font-semibold text-zinc-900 mb-2">Tone Matching</h3>
                 <p className="text-zinc-500 text-sm leading-relaxed">Train the engine on your previous writing to maintain a consistent brand voice automatically.</p>
              </div>

              {/* Feature 4 (Large Dark) */}
              <div className="md:col-span-2 md:col-start-2 p-8 rounded-2xl border border-zinc-200 bg-zinc-900 text-white relative overflow-hidden group">
                 <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                 <div className="relative z-10">
                     <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center mb-6 shadow-sm text-emerald-400">
                        <BarChart2 className="w-5 h-5" />
                     </div>
                     <h3 className="text-xl font-semibold mb-2 text-white">Performance Prediction</h3>
                     <p className="text-zinc-400 max-w-sm">We score generated content against millions of viral posts to predict engagement before you publish.</p>
                 </div>
                 <div className="absolute bottom-0 right-0 p-8 opacity-40 group-hover:opacity-80 transition-opacity">
                     <svg className="w-32 h-16 text-emerald-500" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="2">
                         <path d="M0 45 L20 35 L40 40 L60 15 L80 20 L100 5" />
                     </svg>
                </div>
              </div>
           </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-zinc-50 border-t border-zinc-200 pt-16 pb-12">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                <div className="col-span-2 md:col-span-1">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-6 h-6 bg-zinc-900 rounded flex items-center justify-center text-white">
                            <Infinity className="w-3 h-3" />
                        </div>
                        <span className="font-bold text-zinc-900">ViralLoop</span>
                    </div>
                    <p className="text-xs text-zinc-500 leading-relaxed mb-4">Engineered in San Francisco.<br />Building the future of content workflows.</p>
                </div>
                <div>
                    <h4 className="font-semibold text-zinc-900 text-sm mb-4">Product</h4>
                    <ul className="space-y-2 text-sm text-zinc-500">
                        <li><a href="#" className="hover:text-zinc-900">Features</a></li>
                        <li><a href="#" className="hover:text-zinc-900">Integrations</a></li>
                        <li><a href="#" className="hover:text-zinc-900">Changelog</a></li>
                        <li><a href="#" className="hover:text-zinc-900">Docs</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-zinc-900 text-sm mb-4">Company</h4>
                    <ul className="space-y-2 text-sm text-zinc-500">
                        <li><a href="#" className="hover:text-zinc-900">About</a></li>
                        <li><a href="#" className="hover:text-zinc-900">Blog</a></li>
                        <li><a href="#" className="hover:text-zinc-900">Careers</a></li>
                        <li><a href="#" className="hover:text-zinc-900">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-zinc-900 text-sm mb-4">Legal</h4>
                    <ul className="space-y-2 text-sm text-zinc-500">
                        <li><a href="#" className="hover:text-zinc-900">Privacy</a></li>
                        <li><a href="#" className="hover:text-zinc-900">Terms</a></li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between border-t border-zinc-200 pt-8 gap-4">
                <div className="text-xs text-zinc-400">© 2024 ViralLoop Inc. All rights reserved.</div>
                <div className="flex gap-4 text-zinc-400">
                    <Twitter className="w-4 h-4 hover:text-zinc-900 transition-colors cursor-pointer" />
                    <Github className="w-4 h-4 hover:text-zinc-900 transition-colors cursor-pointer" />
                    <Linkedin className="w-4 h-4 hover:text-zinc-900 transition-colors cursor-pointer" />
                </div>
            </div>
         </div>
      </footer>
    </div>
  );
}
