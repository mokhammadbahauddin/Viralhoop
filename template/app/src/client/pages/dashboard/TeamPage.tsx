import React from 'react';
import { Users, Mail, UserPlus, MoreHorizontal } from 'lucide-react';
import { Button } from '../../components/vertex/Button';
import { Card } from '../../components/vertex/Card';

export const TeamPage = () => {
  return (
    <div className="flex-1 bg-zinc-50 p-8 overflow-y-auto animate-enter">
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Team Members</h2>
                    <p className="text-zinc-500 mt-1">Manage access and collaboration for your workspace.</p>
                </div>
                <Button>
                    <UserPlus className="w-4 h-4 mr-2" /> Invite Member
                </Button>
            </div>

            <Card className="divide-y divide-zinc-100">
                {[
                    { name: 'You', email: 'admin@viralloop.com', role: 'Owner', status: 'Active' },
                    { name: 'Alex Writer', email: 'alex@viralloop.com', role: 'Editor', status: 'Pending' },
                ].map((member, i) => (
                    <div key={i} className="p-4 flex items-center justify-between hover:bg-zinc-50 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500">
                                <Users className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-zinc-900">{member.name}</p>
                                <p className="text-xs text-zinc-500">{member.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-xs font-medium px-2 py-1 rounded bg-zinc-100 text-zinc-600 border border-zinc-200">{member.role}</span>
                            <Button variant="ghost" size="sm"><MoreHorizontal className="w-4 h-4" /></Button>
                        </div>
                    </div>
                ))}
            </Card>
        </div>
    </div>
  );
};
