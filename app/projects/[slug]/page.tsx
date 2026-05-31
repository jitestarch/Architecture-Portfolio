'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion, useScroll, useTransform } from 'motion/react';
import { getProjectBySlug, projects } from '@/data/projects';
import { ArrowLeft } from 'lucide-react';

export default function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const project = getProjectBySlug(slug);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  if (!project) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative h-[80vh] w-full overflow-hidden bg-[#111111]">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image
            src={project.heroImage.url}
            alt={project.heroImage.alt}
            fill
            className="object-cover opacity-80"
            priority
            referrerPolicy="no-referrer"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
        
        <div className="absolute inset-0 pt-32 pb-16">
          <div className="container mx-auto px-6 md:px-12 h-full flex flex-col justify-between">
            <Link 
              href="/projects" 
              className="inline-flex items-center text-white/50 hover:text-white text-[11px] font-bold uppercase tracking-widest transition-colors w-fit"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Work
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-[#2563EB] text-[11px] font-bold tracking-widest uppercase block mb-4">
                {project.category}
              </span>
              <h1 className="text-6xl md:text-[84px] leading-[0.85] lg:text-[100px] font-light tracking-tighter text-white m-0">
                {project.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Metrics & Overview */}
      <section className="py-24 container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Metrics Sidebar */}
          <div className="lg:col-span-3 space-y-8">
            <div>
              <h4 className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Location</h4>
              <p className="text-sm font-medium">{project.location}</p>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Year</h4>
              <p className="text-sm font-medium">{project.year}</p>
            </div>
            {project.metrics && Object.entries(project.metrics).map(([key, value]) => (
              <div key={key}>
                <h4 className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">{key}</h4>
                <p className="text-sm font-medium capitalize">{value}</p>
              </div>
            ))}
          </div>

          {/* Detailed Description */}
          <div className="lg:col-span-8 lg:col-start-5 space-y-8 text-lg leading-relaxed text-gray-600 font-light">
            <h2 className="text-3xl font-light text-[#111111] mb-8 tracking-tighter">Design Architecture</h2>
            {project.fullDescription.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Full Width Gallery */}
      <section className="pb-32">
         {project.gallery.map((image, idx) => (
            <motion.div 
               key={idx}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.6 }}
               className="relative w-full aspect-[16/9] lg:aspect-[21/9] mb-4 bg-gray-100"
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
         ))}
      </section>

      {/* Plans Section */}
      {project.plans && project.plans.length > 0 && (
        <section className="py-24 bg-[#FAFAFA]">
          <div className="container mx-auto px-6 md:px-12">
            <h3 className="text-3xl font-light tracking-tighter mb-16 text-center">Technical Drawings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {project.plans.map((plan, idx) => (
                <div key={idx} className="flex flex-col bg-white p-8 border border-gray-100">
                  <div className="relative aspect-square w-full mb-6">
                    <Image
                      src={plan.url}
                      alt={plan.alt}
                      fill
                      className="object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <p className="text-[10px] font-bold tracking-widest uppercase text-center text-gray-400">
                    {plan.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Next Project / CTA */}
      <section className="py-32 bg-[#111111] text-white text-center">
        <div className="container mx-auto px-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-6">Continue Exploring</p>
          <Link href="/projects" className="text-4xl md:text-6xl font-light hover:text-[#2563EB] transition-colors tracking-tighter">
            View All Projects
          </Link>
        </div>
      </section>
    </article>
  );
}
