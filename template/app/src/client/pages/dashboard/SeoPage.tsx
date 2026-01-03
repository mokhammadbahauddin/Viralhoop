import React, { useState } from 'react';
import { useQuery, useAction, getSeoKeywords, createSeoKeyword, deleteSeoKeyword } from 'wasp/client/operations';
import { Button } from '../../components/vertex/Button';
import { Input } from '../../components/vertex/Input';
import { Card } from '../../components/vertex/Card';
import { Search, Plus, Trash2, TrendingUp, BarChart } from 'lucide-react';
import { cn } from '../../cn';
import { useToast } from '../../hooks/use-toast';

export const SeoPage = () => {
  const { data: keywords, isLoading, refetch } = useQuery(getSeoKeywords);
  const createKeywordFn = useAction(createSeoKeyword);
  const deleteKeywordFn = useAction(deleteSeoKeyword);
  const [newKeyword, setNewKeyword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleAdd = async () => {
    if (!newKeyword) return;
    setIsSubmitting(true);
    try {
        await createKeywordFn({ keyword: newKeyword });
        setNewKeyword('');
        refetch();
        toast({
            title: "Keyword Added",
            description: `Now tracking "${newKeyword}"`,
        });
    } catch (error) {
        console.error(error);
        toast({
            title: "Error",
            description: "Failed to add keyword",
            variant: "destructive",
        });
    } finally {
        setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
      // confirm is still useful for destructive actions, but we could use a custom dialog.
      // For speed, keeping confirm or just doing it with an undo toast (undo not impl).
      if(!confirm('Delete this keyword?')) return;
      try {
          await deleteKeywordFn({ id });
          refetch();
          toast({
            title: "Keyword Deleted",
            description: "Stopped tracking keyword.",
        });
      } catch (error) {
          console.error(error);
          toast({
            title: "Error",
            description: "Failed to delete keyword",
            variant: "destructive",
        });
      }
  };

  return (
    <div className="flex-1 bg-zinc-50 p-8 overflow-y-auto animate-enter">
        <div className="max-w-5xl mx-auto">
             <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-zinc-900">SEO Intelligence</h2>
                    <p className="text-zinc-500 mt-1">Track keyword opportunities and difficulty.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                 <Card className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-zinc-100 rounded-lg text-zinc-500">
                            <Search className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-zinc-500">Tracked Keywords</p>
                            <p className="text-2xl font-bold text-zinc-900">{keywords?.length || 0}</p>
                        </div>
                    </div>
                 </Card>
                 <Card className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-50 rounded-lg text-green-600">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-zinc-500">Avg. Volume</p>
                            <p className="text-2xl font-bold text-zinc-900">
                                {keywords?.length ? Math.round(keywords.reduce((a, b) => a + b.volume, 0) / keywords.length).toLocaleString() : 0}
                            </p>
                        </div>
                    </div>
                 </Card>
            </div>

            <Card className="p-6 mb-8">
                <h3 className="text-sm font-medium text-zinc-900 mb-4">Add New Keyword</h3>
                <div className="flex gap-4">
                    <Input
                        placeholder="Enter a keyword (e.g. 'saas marketing')"
                        value={newKeyword}
                        onChange={(e) => setNewKeyword(e.target.value)}
                        className="flex-1"
                    />
                    <Button onClick={handleAdd} disabled={isSubmitting || !newKeyword}>
                        <Plus className="w-4 h-4 mr-2" /> Track Keyword
                    </Button>
                </div>
            </Card>

            <Card className="overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 font-medium">
                        <tr>
                            <th className="px-6 py-3">Keyword</th>
                            <th className="px-6 py-3">Monthly Volume</th>
                            <th className="px-6 py-3">Difficulty</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 bg-white">
                        {keywords?.map((k) => (
                            <tr key={k.id} className="hover:bg-zinc-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-zinc-900">{k.keyword}</td>
                                <td className="px-6 py-4 text-zinc-500 font-mono">{k.volume.toLocaleString()}</td>
                                <td className="px-6 py-4">
                                    <span className={cn(
                                        "px-2 py-0.5 rounded text-xs font-medium border",
                                        k.difficulty < 30 ? "bg-green-50 text-green-700 border-green-200" :
                                        k.difficulty < 70 ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                                        "bg-red-50 text-red-700 border-red-200"
                                    )}>
                                        {k.difficulty}/100
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button onClick={() => handleDelete(k.id)} className="text-zinc-400 hover:text-red-600 transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {!keywords?.length && (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-zinc-400">
                                    No keywords tracked yet. Add one above to get started.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </Card>
        </div>
    </div>
  );
};
