import React, { useState } from 'react';
import { useQuery, useAction, getScheduledPosts, schedulePost } from 'wasp/client/operations';
import { Calendar, Plus, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../../components/vertex/Button';
import { Card } from '../../components/vertex/Card';
import { Input } from '../../components/vertex/Input';
import { cn } from '../../cn';

export const SchedulePage = () => {
    const { data: posts, isLoading, refetch } = useQuery(getScheduledPosts);
    const schedulePostFn = useAction(schedulePost);

    const [content, setContent] = useState('');
    const [platform, setPlatform] = useState('LinkedIn');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [isScheduling, setIsScheduling] = useState(false);

    const handleSchedule = async () => {
        if (!content || !date || !time) return;
        setIsScheduling(true);
        try {
            const scheduledFor = new Date(`${date}T${time}`);
            await schedulePostFn({ content, platform, scheduledFor });
            setContent('');
            setDate('');
            setTime('');
            refetch();
        } catch (error) {
            console.error(error);
            alert('Failed to schedule post');
        } finally {
            setIsScheduling(false);
        }
    };

    return (
        <div className="flex-1 bg-zinc-50 p-8 overflow-y-auto animate-enter">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Content Calendar</h2>
                        <p className="text-zinc-500 mt-1">Plan and schedule your upcoming posts.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Schedule Form */}
                    <Card className="p-6 h-fit">
                        <h3 className="text-sm font-medium text-zinc-900 mb-4 flex items-center gap-2">
                            <Plus className="w-4 h-4" /> New Post
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-medium text-zinc-700 mb-1.5 block">Platform</label>
                                <div className="flex gap-2">
                                    {['LinkedIn', 'Twitter', 'Blog'].map(p => (
                                        <button
                                            key={p}
                                            onClick={() => setPlatform(p)}
                                            className={cn(
                                                "flex-1 py-2 text-xs font-medium rounded border transition-all",
                                                platform === p
                                                    ? "bg-zinc-900 text-white border-zinc-900"
                                                    : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300"
                                            )}
                                        >
                                            {p}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-medium text-zinc-700 mb-1.5 block">Content</label>
                                <textarea
                                    className="w-full h-32 rounded-md border border-zinc-200 bg-zinc-50 p-3 text-sm placeholder:text-zinc-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900"
                                    placeholder="Write your post here..."
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-medium text-zinc-700 mb-1.5 block">Date</label>
                                    <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-zinc-700 mb-1.5 block">Time</label>
                                    <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                                </div>
                            </div>

                            <Button className="w-full" onClick={handleSchedule} disabled={isScheduling || !content || !date}>
                                {isScheduling ? 'Scheduling...' : 'Schedule Post'}
                            </Button>
                        </div>
                    </Card>

                    {/* Timeline */}
                    <div className="lg:col-span-2 space-y-6">
                        <h3 className="text-sm font-medium text-zinc-900 mb-4 flex items-center gap-2">
                            <Calendar className="w-4 h-4" /> Upcoming
                        </h3>

                        <div className="space-y-4">
                            {posts?.map((post) => (
                                <Card key={post.id} className="p-4 flex gap-4">
                                    <div className="flex-shrink-0 w-12 flex flex-col items-center justify-center bg-zinc-100 rounded-lg text-zinc-500">
                                        <span className="text-xs font-bold uppercase">{new Date(post.scheduledFor).toLocaleString('default', { month: 'short' })}</span>
                                        <span className="text-lg font-bold text-zinc-900">{new Date(post.scheduledFor).getDate()}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1 block">{post.platform}</span>
                                                <p className="text-sm text-zinc-900 line-clamp-2">{post.content}</p>
                                            </div>
                                            <div className="ml-4">
                                                 {post.status === 'Pending' && <span className="flex items-center text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full"><Clock className="w-3 h-3 mr-1"/> Pending</span>}
                                                 {post.status === 'Published' && <span className="flex items-center text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full"><CheckCircle className="w-3 h-3 mr-1"/> Published</span>}
                                            </div>
                                        </div>
                                        <p className="text-xs text-zinc-400 mt-2 flex items-center gap-1">
                                            <Clock className="w-3 h-3" /> {new Date(post.scheduledFor).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </Card>
                            ))}

                            {(!posts || posts.length === 0) && (
                                <div className="text-center p-12 bg-zinc-50 rounded-xl border border-dashed border-zinc-200 text-zinc-400 text-sm">
                                    No posts scheduled.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
