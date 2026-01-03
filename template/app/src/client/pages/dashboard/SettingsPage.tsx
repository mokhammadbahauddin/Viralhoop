import React, { useState } from 'react';
import { User, Lock, Bell, Shield, LogOut, Check, Link as LinkIcon } from 'lucide-react';
import { useAuth } from 'wasp/client/auth';
import { logout } from 'wasp/client/auth';
import { useAction, updateUser } from 'wasp/client/operations';
import { Button } from '../../components/vertex/Button';
import { Card } from '../../components/vertex/Card';
import { Input } from '../../components/vertex/Input';
import { useToast } from '../../hooks/use-toast';
import { cn } from '../../cn';

export const SettingsPage = () => {
  const { data: user } = useAuth();
  const updateUserFn = useAction(updateUser);
  const { toast } = useToast();

  const [username, setUsername] = useState(user?.username || '');
  const [isSaving, setIsSaving] = useState(false);

  // Mock state for connections
  const [linkedinConnected, setLinkedinConnected] = useState(false);
  const [twitterConnected, setTwitterConnected] = useState(false);

  const handleUpdateProfile = async () => {
      setIsSaving(true);
      try {
          await updateUserFn({ username });
          toast({
            title: "Profile Updated",
            description: "Your username has been saved.",
          });
      } catch (error) {
          console.error(error);
          toast({
            title: "Error",
            description: "Failed to update profile",
            variant: "destructive",
          });
      } finally {
          setIsSaving(false);
      }
  };

  const toggleConnection = (platform: string, current: boolean, setter: any) => {
      if (current) {
          if(confirm(`Disconnect ${platform}?`)) {
              setter(false);
              toast({ title: "Disconnected", description: `${platform} account removed.` });
          }
      } else {
          // Mock OAuth flow
          const width = 500;
          const height = 600;
          const left = (window.innerWidth - width) / 2;
          const top = (window.innerHeight - height) / 2;
          const popup = window.open("", "Connect", `width=${width},height=${height},top=${top},left=${left}`);
          if (popup) {
              popup.document.write(`<h1>Connecting to ${platform}...</h1><p>Please wait (Simulation)</p>`);
              setTimeout(() => {
                  popup.close();
                  setter(true);
                  toast({ title: "Connected", description: `${platform} account linked successfully.` });
              }, 1500);
          }
      }
  }

  return (
    <div className="flex-1 bg-zinc-50 p-8 overflow-y-auto animate-enter">
        <div className="max-w-3xl mx-auto space-y-8">
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Settings</h2>
                <p className="text-zinc-500 mt-1">Manage your account preferences and subscription.</p>
            </div>

            {/* Profile Section */}
            <section className="space-y-4">
                <h3 className="text-sm font-medium text-zinc-900 uppercase tracking-wider">Profile</h3>
                <Card className="p-6 space-y-6">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-full bg-zinc-100 flex items-center justify-center text-2xl font-bold text-zinc-400 border border-zinc-200">
                             {user?.username?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <div>
                             {/* Future: Avatar Upload */}
                            <Button variant="secondary" size="sm" disabled>Change Avatar</Button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-zinc-700">Username</label>
                            <div className="flex gap-2">
                                <Input
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="bg-zinc-50"
                                />
                                <Button onClick={handleUpdateProfile} disabled={isSaving || username === user?.username}>
                                    {isSaving ? '...' : 'Save'}
                                </Button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-zinc-700">Email Address</label>
                            <Input defaultValue={user?.email || ''} disabled className="bg-zinc-100 text-zinc-500" />
                        </div>
                    </div>
                </Card>
            </section>

            {/* Connected Accounts (New) */}
            <section className="space-y-4">
                <h3 className="text-sm font-medium text-zinc-900 uppercase tracking-wider">Integrations</h3>
                <Card className="divide-y divide-zinc-100">
                    <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-[#0077b5] rounded-lg flex items-center justify-center text-white">
                                <LinkIcon className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-zinc-900">LinkedIn</p>
                                <p className="text-xs text-zinc-500">Post directly to your profile or page.</p>
                            </div>
                        </div>
                        <Button
                            variant={linkedinConnected ? "secondary" : "default"}
                            onClick={() => toggleConnection("LinkedIn", linkedinConnected, setLinkedinConnected)}
                        >
                            {linkedinConnected ? "Connected" : "Connect"}
                        </Button>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white">
                                <span className="font-bold text-lg">X</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-zinc-900">X (Twitter)</p>
                                <p className="text-xs text-zinc-500">Post threads and tweets.</p>
                            </div>
                        </div>
                        <Button
                            variant={twitterConnected ? "secondary" : "default"}
                            onClick={() => toggleConnection("X", twitterConnected, setTwitterConnected)}
                        >
                            {twitterConnected ? "Connected" : "Connect"}
                        </Button>
                    </div>
                </Card>
            </section>

            {/* Subscription Section */}
            <section className="space-y-4">
                <h3 className="text-sm font-medium text-zinc-900 uppercase tracking-wider">Subscription</h3>
                <Card className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-zinc-900">Current Plan</p>
                            <p className="text-2xl font-bold text-zinc-900 mt-1">
                                {user?.subscriptionStatus === 'active' ? 'Pro Plan' : 'Free Plan'}
                            </p>
                            <p className="text-sm text-zinc-500 mt-1">
                                {user?.subscriptionStatus === 'active'
                                    ? 'Next billing date: Jan 24, 2024'
                                    : `${user?.credits || 0} credits remaining`}
                            </p>
                        </div>
                        <Button onClick={() => window.location.href = '/pricing'}>
                            {user?.subscriptionStatus === 'active' ? 'Manage Subscription' : 'Upgrade to Pro'}
                        </Button>
                    </div>
                </Card>
            </section>

            {/* Danger Zone */}
            <section className="space-y-4 pt-8 border-t border-zinc-200">
                <div className="flex justify-between items-center">
                     <Button variant="ghost" onClick={logout} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                        <LogOut className="w-4 h-4 mr-2" /> Log out
                     </Button>
                </div>
            </section>
        </div>
    </div>
  );
};
