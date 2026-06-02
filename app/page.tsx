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
import Container from '@/components/ui/container';

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
      {/* Premium Student Profile / Hero Section */}
      <section className="pt-32 pb-10 bg-white">
        <Container className="max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 border-b border-gray-100 pb-16">
            {/* Left Info Column */}
            <div className="flex-1 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100/50 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse"></span>
                  <span className="text-[10px] uppercase tracking-widest text-[#2563EB] font-bold">Architecture Student</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-extralight tracking-tighter text-[#111111] leading-tight">
                  Jitesh SA
                </h1>
                <p className="text-sm md:text-base text-gray-600 font-light max-w-xl leading-relaxed">
                  Student at <span className="font-semibold text-[#111111]">SRM School of Environment Architecture and Design (SEAD)</span>, Ramapuram, Chennai. Exploring the intersection of form, environment, and human spatial interaction.
                </p>
              </motion.div>              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="pt-6 border-t border-gray-100 flex flex-wrap gap-x-10 gap-y-4"
              >
                <div>
                  <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#2563EB] mb-2">Get in Touch</h4>
                  <a href="mailto:jiteshsa5273@gmail.com" className="text-sm font-light text-gray-600 hover:text-[#2563EB] transition-colors block">
                    jiteshsa5273@gmail.com
                  </a>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#2563EB] mb-2">Phone</h4>
                  <a href="tel:+919087990009" className="text-sm font-light text-gray-600 hover:text-[#2563EB] transition-colors block">
                    +91 90879 90009
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Right DP Column */}
            <div className="flex-shrink-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative group w-64 h-64 md:w-72 md:h-72"
              >
                {/* Architectural styling frame */}
                <div className="absolute inset-0 border border-gray-200 translate-x-3 translate-y-3 group-hover:translate-x-1.5 group-hover:translate-y-1.5 transition-transform duration-500" />
                <div className="relative w-full h-full overflow-hidden border border-gray-900 bg-gray-50">
                  <img
                    src="https://res.cloudinary.com/dt3ucgv75/image/upload/q_auto/f_auto/v1780346832/portfolio-projects/ls5zjfapw2gyphq0ovrq.png"
                    alt="Rachit Dhaka DP"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>

      {/* Curriculum Vitae Grid Section */}
      <section id="curriculum-vitae" className=" bg-gray-50/50 border-y border-gray-100">
        <Container className="max-w-6xl">
          <div className="space-y-16">
            {/* Section Title */}
            
            {/* Three-Column Sheet Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              
              {/* Column 1: Academic Projects */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div className="border-b border-gray-200 pb-3">
                  <h3 className="text-xs uppercase tracking-[0.2em] font-extrabold text-gray-900">Academic Projects</h3>
                </div>
                
                <div className="space-y-6">
                  {/* Residential */}
                  <div className="group space-y-1">
                    <span className="text-[9px] uppercase tracking-widest text-[#2563EB] font-bold">Residential</span>
                    <p className="text-sm font-medium text-gray-800 group-hover:text-black transition-colors">Residential Design</p>
                  </div>

                  {/* Institutional */}
                  <div className="group space-y-1">
                    <span className="text-[9px] uppercase tracking-widest text-[#2563EB] font-bold">Institutional</span>
                    <p className="text-sm font-medium text-gray-800 group-hover:text-black transition-colors">Institutional Design</p>
                    <p className="text-xs text-gray-400 font-light">Nursery & Primary school</p>
                  </div>

                  {/* Rurals */}
                  <div className="group space-y-1">
                    <span className="text-[9px] uppercase tracking-widest text-[#2563EB] font-bold">Rural studies</span>
                    <p className="text-sm font-medium text-gray-800 group-hover:text-black transition-colors">Rurals - Housing</p>
                  </div>

                  {/* Commercial */}
                  <div className="group space-y-1">
                    <span className="text-[9px] uppercase tracking-widest text-[#2563EB] font-bold">Commercial</span>
                    <p className="text-sm font-medium text-gray-800 group-hover:text-black transition-colors">Commercial Design</p>
                    <ul className="text-xs text-gray-400 font-light space-y-1 list-disc pl-4 mt-1">
                      <li>Eye Hospital</li>
                      <li>Cultural centre</li>
                      <li>Mall with Theatre</li>
                      <li>Stadium</li>
                    </ul>
                  </div>

                  {/* Urban */}
                  <div className="group space-y-1">
                    <span className="text-[9px] uppercase tracking-widest text-[#2563EB] font-bold">Urban Planning</span>
                    <p className="text-sm font-medium text-gray-800 group-hover:text-black transition-colors">Urban Design</p>
                    <p className="text-xs text-gray-400 font-light">Masterplanning & Legal framework</p>
                  </div>
                </div>
              </motion.div>

              {/* Column 2: Software Skills */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-8"
              >
                <div className="border-b border-gray-200 pb-3">
                  <h3 className="text-xs uppercase tracking-[0.2em] font-extrabold text-gray-900">Software Suite</h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    'AUTOCAD',
                    'SKETCHUP',
                    'REVIT',
                    'RHINO',
                    'ENSCAPE',
                    'D5',
                    'PHOTOSHOP',
                    'ILLUSTRATOR',
                    'INDESIGN',
                    'PROCREATE'
                  ].map((software) => (
                    <div 
                      key={software}
                      className="border border-gray-200/80 bg-white p-3 hover:border-black transition-all duration-300 flex flex-col justify-between aspect-video rounded-none shadow-sm hover:shadow"
                    >
                      <span className="text-[8px] font-bold tracking-widest text-gray-400 uppercase">Tool</span>
                      <span className="text-xs font-semibold text-gray-800 tracking-tight uppercase mt-2">{software}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Column 3: Competitions & Languages */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-12"
              >
                {/* Competitions */}
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-3">
                    <h3 className="text-xs uppercase tracking-[0.2em] font-extrabold text-gray-900">Competitions</h3>
                  </div>

                  <ul className="space-y-4">
                    {[
                      { title: 'SRM Saram Project Expo 2026', subtitle: 'Exhibition entry' },
                      { title: '68th GSEN', subtitle: 'NASA India association work' },
                      { title: 'Jaipur Rugs Design', subtitle: 'Product design category' },
                      { title: 'ETHOS - Stadium Design', subtitle: 'National level submission' }
                    ].map((comp, idx) => (
                      <li key={idx} className="group space-y-0.5">
                        <p className="text-sm font-medium text-gray-800 group-hover:text-[#2563EB] transition-colors">{comp.title}</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">{comp.subtitle}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Languages */}
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-3">
                    <h3 className="text-xs uppercase tracking-[0.2em] font-extrabold text-gray-900">Languages</h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {[
                      { lang: 'TELUGU', level: 'Native' },
                      { lang: 'HINDI', level: 'Fluent' },
                      { lang: 'ENGLISH', level: 'Professional' },
                      { lang: 'TAMIL', level: 'Basic' }
                    ].map((item, idx) => (
                      <div key={idx} className="px-3 py-1.5 border border-gray-200 bg-white flex items-baseline gap-2">
                        <span className="text-[10px] font-bold text-gray-800 tracking-wider uppercase">{item.lang}</span>
                        <span className="text-[8px] font-medium text-gray-400 uppercase">{item.level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </Container>
      </section>

      {/* Featured Projects */}
      <section id="portfolio-works" className="py-32 bg-[#FAFAFA]">
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