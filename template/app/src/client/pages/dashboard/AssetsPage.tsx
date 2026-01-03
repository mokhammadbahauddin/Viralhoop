import React, { useState } from 'react';
import { useQuery, useAction, getAllFilesByUser, createFileUploadUrl, addFileToDb, deleteFile } from 'wasp/client/operations';
import { Folder, Upload, Image, FileText, Film, Loader2, Trash2 } from 'lucide-react';
import { Button } from '../../components/vertex/Button';
import { Card } from '../../components/vertex/Card';
import axios from 'axios';

export const AssetsPage = () => {
  const { data: files, isLoading, refetch } = useQuery(getAllFilesByUser);
  const getUploadUrlFn = useAction(createFileUploadUrl);
  const addFileToDbFn = useAction(addFileToDb);
  const deleteFileFn = useAction(deleteFile);

  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setIsUploading(true);
      try {
          // 1. Get Signed URL
          const { s3UploadUrl, s3Key } = await getUploadUrlFn({
              fileName: file.name,
              fileType: file.type
          });

          // 2. Upload to S3 (or local mock)
          // Note: In local dev with generic file upload, simple PUT usually works.
          // Open SaaS template uses axios put.
          await axios.put(s3UploadUrl, file, {
              headers: { 'Content-Type': file.type }
          });

          // 3. Register in DB
          await addFileToDbFn({
              s3Key,
              fileName: file.name,
              fileType: file.type
          });

          refetch();
      } catch (error) {
          console.error(error);
          alert('Upload failed. Check console.');
      } finally {
          setIsUploading(false);
          // Reset input
          e.target.value = '';
      }
  };

  const handleDelete = async (id: string) => {
      if(!confirm("Delete this file?")) return;
      try {
          await deleteFileFn({ id });
          refetch();
      } catch (e) {
          console.error(e);
          alert('Delete failed');
      }
  }

  const getIcon = (type: string) => {
      if (type.includes('image')) return Image;
      if (type.includes('video')) return Film;
      return FileText;
  };

  return (
    <div className="flex-1 bg-zinc-50 p-8 overflow-y-auto animate-enter">
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Brand Assets</h2>
                    <p className="text-zinc-500 mt-1">Store logos, fonts, and templates for consistent content.</p>
                </div>
                <div className="relative">
                    <input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleFileSelect}
                        disabled={isUploading}
                    />
                    <Button disabled={isUploading}>
                        {isUploading ? <Loader2 className="w-4 h-4 animate-spin mr-2"/> : <Upload className="w-4 h-4 mr-2" />}
                        Upload Asset
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {files?.map((file) => {
                    const Icon = getIcon(file.type);
                    return (
                        <Card key={file.id} className="group relative hover:shadow-md transition-all">
                            <div className="h-32 bg-zinc-100 flex items-center justify-center border-b border-zinc-200 group-hover:bg-zinc-50 transition-colors">
                                <Icon className="w-8 h-8 text-zinc-400 group-hover:text-zinc-600 transition-colors" />
                            </div>
                            <div className="p-4">
                                <p className="text-sm font-medium text-zinc-900 truncate" title={file.name}>{file.name}</p>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-xs text-zinc-500 uppercase">{file.type.split('/')[1] || 'FILE'}</span>
                                    <button onClick={() => handleDelete(file.id)} className="text-zinc-300 hover:text-red-500">
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        </Card>
                    );
                })}

                {/* Empty State / Dropzone */}
                <div className="border-2 border-dashed border-zinc-300 rounded-xl flex flex-col items-center justify-center p-6 text-center hover:border-zinc-400 hover:bg-zinc-50/50 transition-all cursor-pointer relative">
                    <input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleFileSelect}
                        disabled={isUploading}
                    />
                    <Folder className="w-8 h-8 text-zinc-300 mb-2" />
                    <p className="text-sm font-medium text-zinc-600">
                        {isUploading ? 'Uploading...' : 'Upload New File'}
                    </p>
                </div>
            </div>
        </div>
    </div>
  );
};
