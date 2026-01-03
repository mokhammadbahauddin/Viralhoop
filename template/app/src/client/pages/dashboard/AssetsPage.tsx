import React from 'react';
import { Folder, Upload, Image, FileText, Film } from 'lucide-react';
import { Button } from '../../components/vertex/Button';
import { Card } from '../../components/vertex/Card';

export const AssetsPage = () => {
  return (
    <div className="flex-1 bg-zinc-50 p-8 overflow-y-auto animate-enter">
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Brand Assets</h2>
                    <p className="text-zinc-500 mt-1">Store logos, fonts, and templates for consistent content.</p>
                </div>
                <Button>
                    <Upload className="w-4 h-4 mr-2" /> Upload Asset
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[
                    { name: 'Logo Dark.png', type: 'Image', size: '24 KB', icon: Image },
                    { name: 'Brand Guidelines.pdf', type: 'Document', size: '2.4 MB', icon: FileText },
                    { name: 'Intro Animation.mp4', type: 'Video', size: '14 MB', icon: Film },
                ].map((file, i) => (
                    <Card key={i} className="group cursor-pointer hover:shadow-md transition-all">
                        <div className="h-32 bg-zinc-100 flex items-center justify-center border-b border-zinc-200 group-hover:bg-zinc-50 transition-colors">
                            <file.icon className="w-8 h-8 text-zinc-400 group-hover:text-zinc-600 transition-colors" />
                        </div>
                        <div className="p-4">
                            <p className="text-sm font-medium text-zinc-900 truncate">{file.name}</p>
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-xs text-zinc-500">{file.type}</span>
                                <span className="text-[10px] text-zinc-400 font-mono">{file.size}</span>
                            </div>
                        </div>
                    </Card>
                ))}

                {/* Empty State / Dropzone */}
                <div className="border-2 border-dashed border-zinc-300 rounded-xl flex flex-col items-center justify-center p-6 text-center hover:border-zinc-400 hover:bg-zinc-50/50 transition-all cursor-pointer">
                    <Folder className="w-8 h-8 text-zinc-300 mb-2" />
                    <p className="text-sm font-medium text-zinc-600">New Folder</p>
                </div>
            </div>
        </div>
    </div>
  );
};
