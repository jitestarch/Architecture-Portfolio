import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Trash2, ArrowLeft, ExternalLink, SlidersHorizontal } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Project } from '@/types/project';
import { Button } from '@/components/ui/button';
import { DeleteProjectButton } from '@/components/admin/DeleteProjectButton';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const { data } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  const dbProjects = (data || []) as Project[];

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        
        {/* Navigation / Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100 pb-8 mb-12">
          <div>
            <div className="flex items-center gap-3 text-gray-400 mb-2">
              <Link href="/" className="inline-flex items-center text-[10px] uppercase tracking-widest font-bold hover:text-[#111111] transition-colors">
                <ArrowLeft className="w-3 h-3 mr-1" /> Portfolio Website
              </Link>
            </div>
            <h1 className="text-4xl md:text-5xl font-light tracking-tighter text-[#111111] flex items-center gap-3">
              Portfolio Manager <SlidersHorizontal className="w-6 h-6 stroke-1 text-[#2563EB]" />
            </h1>
          </div>
          
          <Button className="bg-[#111111] text-white hover:bg-[#2563EB] rounded-none px-6 text-[10px] uppercase tracking-widest font-bold shadow-sm transition-all duration-300 py-6" asChild>
            <Link href="/admin/new" className="flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add New Project
            </Link>
          </Button>
        </div>

        {/* Projects List */}
        {dbProjects.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-gray-200">
            <p className="text-sm text-gray-500 mb-4 font-light">No projects found in the portfolio database.</p>
            <Button className="bg-[#111111] text-white hover:bg-[#2563EB] rounded-none px-6 text-[10px] uppercase tracking-widest font-bold" asChild>
              <Link href="/admin/new">Create Your First Project</Link>
            </Button>
          </div>
        ) : (
          <div className="border border-gray-200 overflow-hidden bg-white">
            <div className="divide-y divide-gray-100">
              {dbProjects.map((project) => (
                <div key={project.slug} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 hover:bg-gray-50/50 transition-colors gap-6">
                  
                  {/* Left Side: Thumbnail & Title Info */}
                  <div className="flex items-center gap-6">
                    <div className="relative w-20 aspect-video overflow-hidden border border-gray-100 bg-gray-50 flex-shrink-0">
                      <Image
                        src={project.heroImage.url}
                        alt={project.heroImage.alt}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-gray-900 text-base">{project.title}</h3>
                        <span className="text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 bg-gray-100 text-gray-500">
                          {project.category}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-medium">
                        {project.location} &bull; {project.year}
                      </p>
                    </div>
                  </div>

                  {/* Right Side: Action Buttons */}
                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    <Link
                      href={`/projects/${project.slug}`}
                      target="_blank"
                      className="p-2 border border-gray-200 text-gray-600 hover:text-black hover:border-black transition-all duration-200"
                      title="View Live Page"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                    
                    {/* Client-side Client Component for Delete Action to handle Server Action interaction gracefully */}
                    <DeleteProjectButton slug={project.slug} title={project.title} />
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
