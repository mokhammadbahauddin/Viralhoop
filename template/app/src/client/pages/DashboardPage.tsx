import React, { useState } from 'react';
import { useAction } from 'wasp/client/operations';
import { useQuery } from 'wasp/client/operations';
import { generateContent, getHistory } from 'wasp/client/operations';
import { useAuth } from 'wasp/client/auth';
import { Link } from 'react-router-dom';
import { Button } from '../components/vertex/Button';
import { Input } from '../components/vertex/Input';
import { Card } from '../components/vertex/Card';
import { cn } from '../cn';
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
} from 'lucide-react';

export default function DashboardPage() {
  const { data: user } = useAuth();
  const [url, setUrl] = useState('');
  const [mode, setMode] = useState('summary'); // summary, linkedin, twitter, blog
  const [generatedContent, setGeneratedContent] = useState('');

  const generateContentFn = useAction(generateContent);
  const { data: history, isLoading: isHistoryLoading, refetch: refetchHistory } = useQuery(getHistory);

  const [isGenerating, setIsGenerating] = useState(false);

  const isPro = user?.subscriptionStatus === 'active';
  const credits = user?.credits ?? 0;

  const handleGenerate = async () => {
    if (!url) return;

    // Client-side validation
    if (!isPro && mode !== 'summary') {
        alert("Upgrade to Pro to use this feature.");
        return;
    }
    if (!isPro && credits <= 0) {
        alert("Insufficient credits. Upgrade to Pro or wait for refill.");
        return;
    }

    setIsGenerating(true);
    try {
      const result = await generateContentFn({ url, mode });
      // Update local state immediately with result
      setGeneratedContent(result.summary || result.linkedin || result.twitter || result.blog || "");
      await refetchHistory();
    } catch (error: any) {
      console.error(error);
      alert(error.message || 'Failed to generate content. Check console.');
    } finally {
      setIsGenerating(false);
    }
  };

  // When history updates, if we just generated, maybe set the content?
  // Simplification: User clicks history to view.

  const activeContent = history?.[0]; // Show latest by default?

  return (
    <div className="flex h-screen bg-zinc-50 font-sans text-zinc-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-zinc-200 hidden md:flex flex-col z-30">
        <div className="p-4 h-14 flex items-center border-b border-zinc-100">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-6 h-6 bg-zinc-900 rounded-md flex items-center justify-center text-white shadow-sm">
               <span className="font-bold text-xs">V</span>
            </div>
            <span className="font-bold text-sm tracking-tight text-zinc-900">ViralLoop</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <Button variant="ghost" className="w-full justify-start gap-2" size="sm">
            <Layout className="w-4 h-4" /> Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2" size="sm">
            <History className="w-4 h-4" /> History
          </Button>
        </div>

        {/* Credit Usage */}
        <div className="p-4 border-t border-zinc-100 bg-zinc-50/50">
            <div className="mb-4">
                <div className="flex items-center justify-between text-[11px] mb-1.5">
                    <span className="font-medium text-zinc-600">Credits Used</span>
                    <span className="font-mono text-zinc-500">{isPro ? 'Unlimited' : `${credits} remaining`}</span>
                </div>
                {!isPro && (
                  <div className="w-full bg-zinc-200 rounded-full h-1.5 overflow-hidden">
                      {/* Simple calc for now, assuming max 3 */}
                      <div className="bg-zinc-800 h-full rounded-full" style={{ width: `${(credits / 3) * 100}%` }}></div>
                  </div>
                )}
            </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="h-14 bg-white border-b border-zinc-200 flex md:hidden items-center justify-between px-4 z-20 flex-shrink-0">
           <span className="font-bold text-sm">ViralLoop</span>
           <Button variant="ghost" size="sm"><Menu className="w-4 h-4"/></Button>
        </header>

        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left Panel: Input */}
          <div className="w-full md:w-[400px] bg-white border-r border-zinc-200 flex flex-col z-10 p-6 space-y-6 overflow-y-auto">
            <div>
              <h2 className="font-semibold text-sm text-zinc-900 mb-4">Project Setup</h2>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-700">Source URL</label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400" />
                    <Input
                      placeholder="https://youtube.com/watch?v=..."
                      className="pl-9"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-700">Mode</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'summary', icon: List, label: 'Summary' },
                      { id: 'linkedin', icon: Linkedin, label: 'LinkedIn' },
                      { id: 'twitter', icon: Twitter, label: 'Twitter' },
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

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !url}
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" /> Generate Content
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="border-t border-zinc-100 pt-6">
              <h3 className="font-semibold text-xs text-zinc-500 uppercase tracking-wider mb-3">Recent History</h3>
              <div className="space-y-2">
                {isHistoryLoading && <p className="text-xs text-zinc-400">Loading history...</p>}
                {history?.map((item: any) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-lg border border-zinc-200 bg-zinc-50 hover:bg-white hover:border-zinc-300 transition-all cursor-pointer text-xs"
                    onClick={() => {
                        // Display the first available content field
                        setGeneratedContent(item.summary || item.linkedin || item.twitter || item.blog || "");
                    }}
                  >
                    <div className="font-medium truncate">{item.title || item.sourceUrl}</div>
                    <div className="text-zinc-500 mt-1 flex justify-between">
                      <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                      <span className="capitalize">{/* Mode would be here if we saved it explicitly as a field, or we infer */}</span>
                    </div>
                  </div>
                ))}
                {history?.length === 0 && <p className="text-xs text-zinc-400">No history yet.</p>}
              </div>
            </div>
          </div>

          {/* Right Panel: Editor */}
          <div className="flex-1 bg-zinc-50 flex flex-col relative overflow-hidden">
             <div className="h-14 bg-white border-b border-zinc-200 flex items-center justify-between px-6">
                <div className="text-sm font-medium text-zinc-500">Editor</div>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm">Copy</Button>
                  <Button variant="secondary" size="sm">Export</Button>
                </div>
             </div>

             <div className="flex-1 p-8 overflow-y-auto">
                <Card className="min-h-[500px] p-8 max-w-3xl mx-auto shadow-sm">
                  {generatedContent || (activeContent ? (activeContent.summary || activeContent.linkedin || activeContent.twitter || activeContent.blog) : null) ? (
                    <div className="prose prose-zinc max-w-none">
                       <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                         {generatedContent || (activeContent ? (activeContent.summary || activeContent.linkedin || activeContent.twitter || activeContent.blog) : "Select an item from history or generate new content.")}
                       </pre>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-zinc-400">
                      <Layout className="w-12 h-12 mb-4 opacity-20" />
                      <p className="text-sm">Content workspace ready.</p>
                    </div>
                  )}
                </Card>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
