import React, { useState } from 'react';
import { useQuery, useAction, getTeamMembers, inviteTeamMember } from 'wasp/client/operations';
import { Users, Mail, UserPlus, MoreHorizontal, Loader2 } from 'lucide-react';
import { Button } from '../../components/vertex/Button';
import { Card } from '../../components/vertex/Card';
import { Input } from '../../components/vertex/Input';
import { useToast } from '../../hooks/use-toast';

export const TeamPage = () => {
  const { data: members, isLoading, refetch } = useQuery(getTeamMembers);
  const inviteMemberFn = useAction(inviteTeamMember);
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [isInviting, setIsInviting] = useState(false);

  const handleInvite = async () => {
    if (!email) return;
    setIsInviting(true);
    try {
        await inviteMemberFn({ email, role: 'Editor' });
        setEmail('');
        refetch();
        toast({
            title: "Invitation Sent",
            description: `Invited ${email} to the team.`,
        });
    } catch (error) {
        console.error(error);
        toast({
            title: "Error",
            description: "Failed to invite member",
            variant: "destructive",
        });
    } finally {
        setIsInviting(false);
    }
  };

  return (
    <div className="flex-1 bg-zinc-50 p-8 overflow-y-auto animate-enter">
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Team Members</h2>
                    <p className="text-zinc-500 mt-1">Manage access and collaboration for your workspace.</p>
                </div>
            </div>

            <Card className="p-6 mb-8">
                <h3 className="text-sm font-medium text-zinc-900 mb-4">Invite New Member</h3>
                <div className="flex gap-4">
                    <Input
                        placeholder="colleague@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1"
                    />
                    <Button onClick={handleInvite} disabled={isInviting || !email}>
                        {isInviting ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4 mr-2" />}
                        Send Invite
                    </Button>
                </div>
            </Card>

            <Card className="divide-y divide-zinc-100">
                {/* Current User (Hardcoded or fetched if needed, but usually not in TeamMember table if purely relation) */}
                <div className="p-4 flex items-center justify-between hover:bg-zinc-50 transition-colors">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-white text-sm font-bold">
                            ME
                        </div>
                        <div>
                            <p className="text-sm font-medium text-zinc-900">You</p>
                            <p className="text-xs text-zinc-500">Owner</p>
                        </div>
                    </div>
                    <span className="text-xs font-medium px-2 py-1 rounded bg-zinc-100 text-zinc-600 border border-zinc-200">Owner</span>
                </div>

                {members?.map((member) => (
                    <div key={member.id} className="p-4 flex items-center justify-between hover:bg-zinc-50 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500">
                                <Users className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-zinc-900">{member.email}</p>
                                <p className="text-xs text-zinc-500">{member.status}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-xs font-medium px-2 py-1 rounded bg-zinc-100 text-zinc-600 border border-zinc-200">{member.role}</span>
                            <Button variant="ghost" size="sm"><MoreHorizontal className="w-4 h-4" /></Button>
                        </div>
                    </div>
                ))}

                {(!members || members.length === 0) && (
                    <div className="p-8 text-center text-zinc-400 text-sm">
                        No other team members yet.
                    </div>
                )}
            </Card>
        </div>
    </div>
  );
};
