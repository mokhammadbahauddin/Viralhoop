import React, { useState } from 'react';
import { useAction, useQuery } from 'wasp/client/operations';
import { generateContent, getHistory } from 'wasp/client/operations';
import { useAuth } from 'wasp/client/auth';
import { Link } from 'react-router-dom';
import { Button } from '../../components/vertex/Button';
import { Input } from '../../components/vertex/Input';
import { Card } from '../../components/vertex/Card';
import { cn } from '../../cn';
import {
  Sparkles,
  Link as LinkIcon,
  Layout,
  Loader2,
  FileText,
  Linkedin,
  Twitter,
  List,
  History,
  Menu,
  Lock,
  PlusCircle,
  Clock,
  LayoutGrid,
  BarChart2,
  Search,
  Users,
  FolderClosed,
  Settings,
  X,
  HelpCircle,
  Copy,
  Download,
  Bold,
  Italic,
  Link2,
  Check,
  Zap
} from 'lucide-react';
import { AnalyticsView } from './AnalyticsView';
import { TeamPage } from './TeamPage';
import { AssetsPage } from './AssetsPage';
import { SettingsPage } from './SettingsPage';

export default function DashboardPage() {
  const { data: user } = useAuth();
  const [activeTab, setActiveTab] = useState('home'); // home, history, templates, analytics, seo, team, assets, settings
  const [url, setUrl] = useState('');
  const [mode, setMode] = useState('summary'); // summary, linkedin, twitter, blog
  const [keywords, setKeywords] = useState('');

  // State for result content
  const [generatedContent, setGeneratedContent] = useState('');
  const [viralScore, setViralScore] = useState<number | null>(null);
  const [viralReasoning, setViralReasoning] = useState<string | null>(null);

  const [isGenerating, setIsGenerating] = useState(false);

  const generateContentFn = useAction(generateContent);
  const { data: history, isLoading: isHistoryLoading, refetch: refetchHistory } = useQuery(getHistory);

  const isPro = user?.subscriptionStatus === 'active';
  const credits = user?.credits ?? 0;

  const handleGenerate = async () => {
    if (!url) return;

    if (!isPro && mode !== 'summary') {
        alert("Upgrade to Pro to use this feature.");
        return;
    }
    if (!isPro && credits <= 0) {
        alert("Insufficient credits. Upgrade to Pro or wait for refill.");
        return;
    }

    setIsGenerating(true);
    // Reset previous results
    setGeneratedContent('');
    setViralScore(null);
    setViralReasoning(null);

    try {
      const result = await generateContentFn({ url, mode, keywords: mode === 'blog' ? keywords : undefined });

      // Determine content based on mode (fallback logic preserved)
      const content = result.summary || result.linkedin || result.twitter || result.blog || "";
      setGeneratedContent(content);

      // Set Viral Data
      if (result.viralScore !== undefined) setViralScore(result.viralScore);
      if (result.viralReasoning) setViralReasoning(result.viralReasoning);

      await refetchHistory();
    } catch (error: any) {
      console.error(error);
      alert(error.message || 'Failed to generate content. Check console.');
    } finally {
      setIsGenerating(false);
    }
  };

  const NavItem = ({ id, label, icon: Icon }: { id: string; label: string; icon: any }) => (
    <button
        onClick={() => setActiveTab(id)}
        className={cn(
            "w-full flex items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-lg group transition-all",
            activeTab === id
                ? "bg-zinc-100 text-zinc-900"
                : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
        )}
    >
        <Icon className={cn("w-4 h-4 transition-colors", activeTab === id ? "text-zinc-900" : "text-zinc-400 group-hover:text-zinc-900")} />
        {label}
    </button>
  );

  return (
    <div className="flex h-screen bg-zinc-50 font-sans text-zinc-900 overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-[280px] bg-white border-r border-zinc-200 flex flex-col z-30 hidden md:flex">
        {/* Header */}
        <div className="p-4 h-14 flex items-center border-b border-zinc-100">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
                <div className="w-6 h-6 bg-zinc-900 rounded-md flex items-center justify-center text-white shadow-sm">
                    <span className="font-bold text-xs">V</span>
                </div>
                <span className="font-bold text-sm tracking-tight text-zinc-900">ViralLoop</span>
                {isPro && <span className="text-[10px] bg-zinc-100 text-zinc-500 px-1.5 py-0.5 rounded font-mono border border-zinc-200 ml-auto">PRO</span>}
            </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-3 space-y-6">
            <div className="space-y-0.5">
                <NavItem id="home" label="New Project" icon={PlusCircle} />
                <NavItem id="history" label="History" icon={Clock} />
                <NavItem id="templates" label="Templates" icon={LayoutGrid} />
            </div>

            <div>
                <h3 className="px-3 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">Intelligence</h3>
                <div className="space-y-0.5">
                    <NavItem id="analytics" label="Analytics" icon={BarChart2} />
                    <NavItem id="seo" label="SEO Keyword Tracker" icon={Search} />
                </div>
            </div>

            <div>
                <h3 className="px-3 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">Workspace</h3>
                <div className="space-y-0.5">
                    <NavItem id="team" label="Team Members" icon={Users} />
                    <NavItem id="assets" label="Assets" icon={FolderClosed} />
                </div>
            </div>
        </div>

        {/* Footer / Usage */}
        <div className="p-4 border-t border-zinc-100 bg-zinc-50/50">
            <div className="mb-4">
                <div className="flex items-center justify-between text-[11px] mb-1.5">
                    <span className="font-medium text-zinc-600">Credits Used</span>
                    <span className="font-mono text-zinc-500">{isPro ? 'Unlimited' : `${credits} remaining`}</span>
                </div>
                {!isPro && (
                  <div className="w-full bg-zinc-200 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-zinc-800 h-full rounded-full" style={{ width: `${(credits / 3) * 100}%` }}></div>
                  </div>
                )}
            </div>

            <button onClick={() => setActiveTab('settings')} className="flex items-center gap-3 w-full p-2 hover:bg-white border border-transparent hover:border-zinc-200 hover:shadow-sm rounded-lg transition-all text-left group">
                <div className="relative">
                     <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-zinc-200 to-zinc-300 flex items-center justify-center text-xs font-semibold text-zinc-600 border border-zinc-200 shadow-sm">
                        {user?.username?.[0]?.toUpperCase() || 'U'}
                     </div>
                     <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-medium text-zinc-900 truncate">{user?.username || 'User'}</p>
                    <p className="text-[10px] text-zinc-500 truncate">{user?.email}</p>
                </div>
                <Settings className="w-4 h-4 text-zinc-400 group-hover:text-zinc-600 transition-colors" />
            </button>
        </div>
      </aside>

      {/* MAIN AREA */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Mobile Header */}
        <header className="h-14 bg-white border-b border-zinc-200 flex md:hidden items-center justify-between px-4 z-20 flex-shrink-0">
            <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-zinc-900 rounded-md flex items-center justify-center text-white">
                    <span className="font-bold text-xs">V</span>
                </div>
                <span className="font-bold tracking-tight text-zinc-900">ViralLoop</span>
            </div>
            <Button variant="ghost" size="sm"><Menu className="w-5 h-5"/></Button>
        </header>

        {/* VIEW: GENERATOR (HOME) */}
        {activeTab === 'home' && (
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden animate-enter">
                {/* Left Panel: Configuration */}
                <div className="w-full md:w-[400px] bg-white border-r border-zinc-200 flex flex-col z-10 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.05)]">
                    <div className="h-14 border-b border-zinc-100 flex items-center px-6 justify-between flex-shrink-0">
                        <h2 className="font-semibold text-sm text-zinc-900">Project Setup</h2>
                        <button className="text-xs text-zinc-400 hover:text-zinc-900 underline" onClick={() => { setUrl(''); setGeneratedContent(''); setViralScore(null); setViralReasoning(null); }}>Reset</button>
                    </div>

                    <div className="p-6 space-y-6 flex-1 overflow-y-auto">
                        <div className="space-y-3">
                            <label className="text-xs font-medium text-zinc-700 flex items-center justify-between">
                                Source URL
                                <span className="text-[10px] text-zinc-400 bg-zinc-100 px-1.5 rounded">YouTube / Vimeo</span>
                            </label>
                            <div className="relative group">
                                <LinkIcon className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400 group-focus-within:text-zinc-600 transition-colors" />
                                <Input
                                  placeholder="Paste video link..."
                                  className="pl-9 pr-8 input-ring"
                                  value={url}
                                  onChange={(e) => setUrl(e.target.value)}
                                />
                                {url && (
                                    <button onClick={() => setUrl('')} className="absolute right-2 top-2.5 text-zinc-400 hover:text-zinc-600">
                                        <X className="w-3 h-3" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Settings */}
                        <div className="border-t border-zinc-100 pt-6 space-y-5">
                            <div>
                                <label className="text-xs font-medium text-zinc-700 mb-2.5 flex items-center gap-2">
                                    Content Formats
                                    <HelpCircle className="w-3 h-3 text-zinc-300" />
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {[
                                      { id: 'summary', icon: List, label: 'Summary' },
                                      { id: 'linkedin', icon: Linkedin, label: 'LinkedIn' },
                                      { id: 'twitter', icon: Twitter, label: 'X Thread' },
                                      { id: 'blog', icon: FileText, label: 'Blog' },
                                    ].map((m) => (
                                      <div
                                        key={m.id}
                                        onClick={() => setMode(m.id)}
                                        className={cn(
                                          "cursor-pointer p-3 rounded-lg border flex flex-col items-center justify-center gap-2 transition-all relative",
                                          mode === m.id
                                            ? "border-zinc-900 bg-zinc-900 text-white"
                                            : "border-zinc-200 bg-white hover:border-zinc-300 text-zinc-600"
                                        )}
                                      >
                                        {!isPro && m.id !== 'summary' && (
                                            <Lock className="absolute top-1 right-1 w-3 h-3 text-zinc-400" />
                                        )}
                                        <m.icon className="w-4 h-4" />
                                        <span className="text-xs font-medium">{m.label}</span>
                                      </div>
                                    ))}
                                </div>
                            </div>

                            {/* Keywords Input (Blog Only) */}
                            {mode === 'blog' && (
                                <div className="animate-enter">
                                    <label className="text-xs font-medium text-zinc-700 mb-2 block">Target Keywords</label>
                                    <Input
                                      placeholder="e.g. saas growth, ai tools"
                                      className="input-ring"
                                      value={keywords}
                                      onChange={(e) => setKeywords(e.target.value)}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="p-4 border-t border-zinc-200 bg-zinc-50/30">
                        <Button
                          onClick={handleGenerate}
                          disabled={isGenerating || !url}
                          className="w-full py-3 shadow-lg shadow-zinc-900/10 active:scale-[0.98]"
                        >
                          {isGenerating ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing...
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-4 h-4 mr-2" /> Generate Content
                            </>
                          )}
                        </Button>
                    </div>
                </div>

                {/* Right Panel: Editor & Intelligence */}
                <div className="flex-1 bg-zinc-50 flex flex-col relative overflow-hidden">
                     {/* Toolbar */}
                     <div className="h-14 bg-white border-b border-zinc-200 flex items-center justify-between px-4 shadow-sm z-20 flex-shrink-0">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center bg-zinc-100 p-1 rounded-lg">
                                {['Summary', 'LinkedIn', 'Thread'].map(fmt => (
                                    <button key={fmt} className="px-3 py-1.5 text-xs font-medium rounded-md text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 transition-all">{fmt}</button>
                                ))}
                            </div>
                            <div className="h-4 w-px bg-zinc-200"></div>
                            <div className="flex items-center gap-1">
                                <button className="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded"><Bold className="w-3.5 h-3.5" /></button>
                                <button className="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded"><Italic className="w-3.5 h-3.5" /></button>
                                <button className="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded"><Link2 className="w-3.5 h-3.5" /></button>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="secondary" size="sm" title="Copy"><Copy className="w-4 h-4" /></Button>
                            <Button variant="secondary" size="sm"><Download className="w-3 h-3 mr-2"/> Export</Button>
                        </div>
                     </div>

                     {/* Content Area with Split View for Intelligence if needed */}
                     <div className="flex-1 overflow-y-auto p-8 md:p-12 relative scroll-smooth">
                        {!generatedContent ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 animate-enter">
                                <div className="w-24 h-24 bg-gradient-to-b from-zinc-50 to-zinc-100 border border-zinc-200 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                                    <Layout className="w-8 h-8 text-zinc-300" />
                                </div>
                                <h3 className="text-lg font-semibold text-zinc-900">Workspace Ready</h3>
                                <p className="text-zinc-500 max-w-sm mt-2 text-sm leading-relaxed">Paste a URL on the left sidebar to start the generation engine.</p>
                            </div>
                        ) : (
                            <div className="max-w-5xl mx-auto space-y-6">
                                {/* Viral Score Card */}
                                {(viralScore !== null && viralScore !== undefined) && (
                                    <div className="bg-white border border-zinc-200 rounded-xl p-4 flex items-center gap-6 shadow-sm animate-enter">
                                        <div className="flex items-center gap-3 border-r border-zinc-100 pr-6">
                                            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                                                <Zap className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Viral Score</p>
                                                <p className="text-2xl font-bold text-zinc-900">{viralScore}/100</p>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                             <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider mb-1">Reasoning</p>
                                             <p className="text-sm text-zinc-600 leading-snug">{viralReasoning || "Analysis complete."}</p>
                                        </div>
                                        {/* Simple Progress Bar */}
                                        <div className="w-24 h-12 relative flex items-center justify-center">
                                            <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${viralScore}%` }}></div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <Card className="min-h-[600px] p-12 shadow-sm animate-enter">
                                    <div className="prose prose-zinc max-w-none">
                                    <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-zinc-600">
                                        {generatedContent}
                                    </pre>
                                    </div>
                                </Card>
                            </div>
                        )}
                        <div className="h-20"></div>
                     </div>
                </div>
            </div>
        )}

        {/* VIEW: HISTORY */}
        {activeTab === 'history' && (
            <div className="flex-1 bg-white p-6 overflow-y-auto animate-enter">
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                         <h2 className="text-2xl font-bold tracking-tight text-zinc-900">History</h2>
                         <div className="relative">
                             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                             <Input placeholder="Search archives..." className="pl-9 w-64" />
                         </div>
                    </div>
                    <div className="border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 font-medium">
                                <tr>
                                    <th className="px-6 py-3">Content Title</th>
                                    <th className="px-6 py-3">Source</th>
                                    <th className="px-6 py-3">Viral Score</th>
                                    <th className="px-6 py-3">Created</th>
                                    <th className="px-6 py-3 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100 bg-white">
                                {history?.map((item: any) => (
                                    <tr key={item.id} className="hover:bg-zinc-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-zinc-900 flex items-center gap-3">
                                            <div className="w-8 h-8 rounded bg-zinc-100 flex items-center justify-center text-zinc-500">
                                                <FileText className="w-4 h-4" />
                                            </div>
                                            {item.title || "Untitled Project"}
                                        </td>
                                        <td className="px-6 py-4 text-zinc-500 max-w-xs truncate">{item.sourceUrl}</td>
                                        <td className="px-6 py-4">
                                            {item.viralScore ? (
                                                <span className={cn("px-2 py-0.5 rounded text-xs font-medium",
                                                    item.viralScore > 80 ? "bg-green-100 text-green-700" :
                                                    item.viralScore > 50 ? "bg-yellow-100 text-yellow-700" :
                                                    "bg-zinc-100 text-zinc-600"
                                                )}>
                                                    {item.viralScore}
                                                </span>
                                            ) : <span className="text-zinc-300">-</span>}
                                        </td>
                                        <td className="px-6 py-4 text-zinc-500">{new Date(item.createdAt).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 text-right">
                                            <Button variant="ghost" size="sm" onClick={() => {
                                                setGeneratedContent(item.summary || item.linkedin || item.twitter || item.blog || "");
                                                setViralScore(item.viralScore);
                                                setViralReasoning(item.viralReasoning);
                                                setActiveTab('home');
                                            }}>Load</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {(!history || history.length === 0) && (
                            <div className="p-12 text-center text-zinc-500">No history found.</div>
                        )}
                    </div>
                </div>
            </div>
        )}

        {/* VIEW: ANALYTICS */}
        {activeTab === 'analytics' && <AnalyticsView />}

        {/* VIEW: TEMPLATES */}
        {activeTab === 'templates' && (
            <div className="flex-1 bg-zinc-50 p-8 overflow-y-auto animate-enter">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl font-bold tracking-tight text-zinc-900 mb-2">Templates</h2>
                    <p className="text-zinc-500 mb-8">Start your next project with a pre-configured workflow.</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { id: 'linkedin', title: 'Viral LinkedIn Post', desc: 'Optimized for high engagement with hooks and takeaways.', icon: Linkedin, color: 'text-blue-600 bg-blue-50' },
                            { id: 'twitter', title: 'Twitter Thread', desc: 'Break down complex topics into a 7-tweet thread.', icon: Twitter, color: 'text-sky-500 bg-sky-50' },
                            { id: 'blog', title: 'SEO Blog Post', desc: 'Long-form content targeted at specific keywords.', icon: FileText, color: 'text-orange-600 bg-orange-50' },
                        ].map((t) => (
                            <div key={t.id} onClick={() => { setMode(t.id); setActiveTab('home'); }} className="group bg-white p-6 rounded-xl border border-zinc-200 hover:border-zinc-300 shadow-sm hover:shadow-md transition-all cursor-pointer">
                                <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center mb-4", t.color)}>
                                    <t.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-semibold text-zinc-900 mb-2 group-hover:text-primary transition-colors">{t.title}</h3>
                                <p className="text-zinc-500 text-sm leading-relaxed">{t.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}

        {/* VIEW: TEAM */}
        {activeTab === 'team' && <TeamPage />}

        {/* VIEW: ASSETS */}
        {activeTab === 'assets' && <AssetsPage />}

        {/* VIEW: SETTINGS */}
        {activeTab === 'settings' && <SettingsPage />}

        {/* VIEW: SEO (Still placeholder if needed, or link to Docs) */}
        {activeTab === 'seo' && (
             <div className="flex-1 bg-zinc-50 p-6 flex items-center justify-center animate-enter">
                <div className="text-center">
                    <div className="w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-zinc-200">
                        <Search className="w-6 h-6 text-zinc-300" />
                    </div>
                    <h2 className="text-xl font-semibold text-zinc-900">SEO Intelligence</h2>
                    <p className="text-zinc-500 mt-2">Advanced keyword tracking coming in the next update.</p>
                </div>
            </div>
        )}

      </main>
    </div>
  );
}
