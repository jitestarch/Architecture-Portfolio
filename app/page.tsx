'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { projects } from '@/data/projects';
import { supabase } from '@/lib/supabase';
import { Project } from '@/types/project';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { getOptimizedImageUrl } from '@/lib/utils';

export default function Home() {
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

  const featuredProjects = liveProjects.slice(0, 3);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] w-full flex items-center bg-white overflow-hidden pt-20">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-12 z-10 w-full mt-20 md:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-6 flex items-center gap-4">
                <span className="text-[11px] uppercase tracking-widest text-[#2563EB] font-bold">Jitesh S A</span>
                <span className="w-8 h-[1px] bg-gray-300"></span>
                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Architect Student</span>
              </div>
              <h1 className="text-6xl md:text-8xl lg:text-[100px] leading-[0.85] font-light tracking-tighter text-[#111111] mb-8">
                Spaces that <br className="hidden lg:block" /> speak in silence.
              </h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <p className="text-lg text-gray-600 font-light leading-relaxed">
                With over a decade of experience, I explore the boundary between brutalist form and human experience, interrogating vertical voids and natural light to create buildings that resonate with their environment.
              </p>
              <div className="space-y-6">
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Based In</h4>
                  <p className="text-sm font-medium text-[#111111]">Chennai - Tamil Nadu</p>
                </div>
                
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Button size="lg" className="bg-[#111111] text-white hover:bg-[#2563EB] rounded-none px-8 text-[11px] uppercase tracking-widest font-bold" asChild>
                <Link href="/projects">View Selected Works</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-gray-200 text-[#111111] hover:border-[#111111] rounded-none px-8 text-[11px] uppercase tracking-widest font-bold" asChild>
                <Link href="/about">About Practice</Link>
              </Button>
            </motion.div>
          </div>
          
          <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
             className="flex-1 w-full relative aspect-[3/4] md:aspect-[4/5] bg-[#FAFAFA] hidden md:block"
          >
             <div className="absolute inset-x-12 inset-y-16 border border-gray-200 flex flex-col justify-between p-8">
                <div className="w-12 h-[1px] bg-[#2563EB]"></div>
                <div className="space-y-2 text-right">
                   <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Current Status</p>
                   <p className="text-sm font-medium text-[#111111]">Accepting Commissions 2025</p>
                </div>
             </div>
             
             {/* Abstract minimalist graphic element representing architecture */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-gray-200 opacity-50 flex items-center justify-center">
                 <div className="w-48 h-48 border border-gray-200 flex items-center justify-center">
                     <div className="w-32 h-32 border border-gray-200 relative">
                         <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#FAFAFA] border border-gray-200 shadow-sm translate-x-4 -translate-y-4"></div>
                     </div>
                 </div>
             </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-10 left-12 text-gray-400 hidden md:block"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Scroll</span>
          <div className="w-[1px] h-12 bg-gray-300 ml-[18px] mt-2" />
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-[56px] leading-[0.9] font-light tracking-tighter mb-8">
                Architecture as a <br/> dialogue with nature.
              </h2>
              <p className="text-[#111111]/70 text-lg mb-6 leading-relaxed font-light">
                Our approach is rooted in the belief that buildings should not merely occupy a site, but emerge from it. We prioritize local materials, passive design principles, and an aesthetic of reduction.
              </p>
              <Link href="/about" className="inline-flex items-center text-[11px] uppercase tracking-widest font-bold text-[#2563EB] hover:text-[#111111] transition-colors">
                Read our full philosophy <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5] bg-gray-100 overflow-hidden"
            >
               <Image
                  src="https://picsum.photos/seed/philosophy/800/1000"
                  alt="Studio sketch"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
               />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-32 bg-[#FAFAFA]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex justify-between items-baseline mb-16 border-b border-gray-100 pb-4">
            <h2 className="text-3xl md:text-5xl font-light tracking-tighter">Selected Works</h2>
            <Link href="/projects" className="hidden md:inline-flex items-center text-[11px] uppercase tracking-widest font-bold text-[#2563EB] hover:text-[#111111] transition-colors">
              All Projects <ArrowRight className="ml-2 h-3 w-3" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <Link href={`/projects/${project.slug}`}>
                  <div className="relative aspect-[4/5] overflow-hidden bg-gray-200 mb-6">
                    <Image
                      src={getOptimizedImageUrl(project.heroImage.url, 600)}
                      alt={project.heroImage.alt}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                  </div>
                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] uppercase tracking-widest text-[#2563EB] font-bold">{project.category}</span>
                    <h3 className="text-xl md:text-2xl font-light tracking-tight">{project.title}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
            <Link href="/projects" className="inline-flex items-center text-sm uppercase tracking-wider font-medium hover:text-accent transition-colors">
              All Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
