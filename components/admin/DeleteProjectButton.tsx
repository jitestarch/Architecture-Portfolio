'use client';

import * as React from 'react';
import { Trash2, Loader2 } from 'lucide-react';
import { deleteProject } from '@/app/actions/projects';

interface DeleteProjectButtonProps {
  slug: string;
  title: string;
}

export function DeleteProjectButton({ slug, title }: DeleteProjectButtonProps) {
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`);
    if (!confirmed) return;

    try {
      setIsDeleting(true);
      const res = await deleteProject(slug);
      
      if (!res.success) {
        alert(res.error || 'Failed to delete the project.');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('An error occurred while deleting the project.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-2 border border-gray-200 text-red-600 hover:text-white hover:bg-red-600 hover:border-red-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      title="Delete Project"
    >
      {isDeleting ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Trash2 className="w-4 h-4" />
      )}
    </button>
  );
}
