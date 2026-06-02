'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import { projects } from '@/data/projects';
import { supabase } from '@/lib/supabase';
import { Project, ProjectCategory } from '@/types/project';
import { getOptimizedImageUrl } from '@/lib/utils';

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = React.useState<ProjectCategory | 'All'>('All');
  const [liveProjects, setLiveProjects] = React.useState<Project[]>(projects);

  React.useEffect(() => {
    async function loadLiveProjects() {
      const { data } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false }); // Show newest first
      if (data && data.length > 0) {
        setLiveProjects(data as Project[]);
      }
    }
    loadLiveProjects();
  }, []);

  const categories = React.useMemo(() => {
    const set = new Set<string>();
    liveProjects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ['All', ...Array.from(set)];
  }, [liveProjects]);

  const filteredProjects = activeCategory === 'All' 
    ? liveProjects 
    : liveProjects.filter(p => p.category === activeCategory);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <header className="mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-[84px] font-light tracking-tighter mb-12 uppercase"
          >
            Work
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-4"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category as any)}
                className={`text-[11px] tracking-widest uppercase font-bold px-6 py-3 rounded-none transition-all duration-300 ${
                  activeCategory === category 
                    ? 'bg-[#111111] text-white' 
                    : 'border border-gray-200 text-[#111111] hover:border-[#111111]'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </header>

        <LayoutGroup>
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  key={project.slug}
                  className="group cursor-pointer flex flex-col"
                >
                  <Link href={`/projects/${project.slug}`} className="flex-1 flex flex-col">
                    <div className="relative aspect-[4/3] mb-6 overflow-hidden bg-gray-100">
                      <Image
                        src={getOptimizedImageUrl(project.heroImage.url, 600)}
                        alt={project.heroImage.alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex flex-col flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] uppercase tracking-widest text-[#2563EB] font-bold">{project.category}</span>
                        <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{project.year}</span>
                      </div>
                      <h3 className="text-xl font-light tracking-tight mb-2">{project.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mt-auto font-light leading-relaxed">{project.description}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </div>
  );
}
