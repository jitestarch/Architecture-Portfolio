'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { getProjectBySlug } from '@/data/projects';
import { supabase } from '@/lib/supabase';
import { Project } from '@/types/project';
import { ArrowLeft } from 'lucide-react';
import Container from '@/components/ui/container';
import { getOptimizedImageUrl } from '@/lib/utils';

export default function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const staticProject = React.useMemo(() => getProjectBySlug(slug), [slug]);
  const [project, setProject] = React.useState<Project | undefined>(staticProject);
  const [isLoading, setIsLoading] = React.useState(!staticProject);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const [activeFilter, setActiveFilter] = React.useState('All');
  const [lightbox, setLightbox] = React.useState<{ type: 'gallery' | 'plan'; index: number } | null>(null);

  React.useEffect(() => {
    async function loadLiveProject() {
      try {
        const { data } = await supabase
          .from('projects')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();
        if (data) {
          setProject(data as Project);
        }
      } catch (error) {
        console.error('Failed to load project from database:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadLiveProject();
  }, [slug]);

  // Map dynamic admin-uploaded Cloudinary gallery images
  const projectImages = React.useMemo(() => {
    if (!project) return [];
    return (project.gallery || []).map((img, index) => ({
      id: `img-${index}`,
      url: getOptimizedImageUrl(img.url, 1000),
      width: 1200,
      // Stagger heights dynamically based on index to create a beautiful waterfall Pinterest-style masonry grid
      height: index % 2 === 0 ? 800 : 1200,
      title: img.alt || `Detail View ${index + 1}`,
      category: project.category, // Inherit project category
      description: img.alt || `Atmospheric detail showcasing the premium finishes of ${project.title}.`,
      alt: img.alt || `${project.title} detail showcase`
    }));
  }, [project]);

  const filteredImages = React.useMemo(() => {
    if (activeFilter === 'All') return projectImages;
    return projectImages.filter(img => img.category === activeFilter);
  }, [activeFilter, projectImages]);

  // Dynamically extract categories present in the project gallery
  const categories = React.useMemo(() => {
    const set = new Set<string>();
    projectImages.forEach((img) => {
      if (img.category) set.add(img.category);
    });
    const unique = Array.from(set);
    if (unique.length <= 1) return []; // Hide tabs if there is only 1 category
    return ['All', ...unique];
  }, [projectImages]);

  const handlePrevImage = React.useCallback(() => {
    setLightbox((prev) => {
      if (prev === null) return null;
      const listLength = prev.type === 'gallery' ? filteredImages.length : (project?.plans?.length || 0);
      const newIndex = prev.index === 0 ? listLength - 1 : prev.index - 1;
      return { type: prev.type, index: newIndex };
    });
  }, [filteredImages.length, project?.plans]);

  const handleNextImage = React.useCallback(() => {
    setLightbox((prev) => {
      if (prev === null) return null;
      const listLength = prev.type === 'gallery' ? filteredImages.length : (project?.plans?.length || 0);
      const newIndex = prev.index === listLength - 1 ? 0 : prev.index + 1;
      return { type: prev.type, index: newIndex };
    });
  }, [filteredImages.length, project?.plans]);

  React.useEffect(() => {
    if (lightbox === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightbox(null);
      } else if (e.key === 'ArrowLeft') {
        handlePrevImage();
      } else if (e.key === 'ArrowRight') {
        handleNextImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox, handlePrevImage, handleNextImage]);

  // Compute the active image or plan to display in the lightbox
  const activeLightboxItem = React.useMemo(() => {
    if (lightbox === null) return null;
    if (lightbox.type === 'gallery') {
      const img = filteredImages[lightbox.index];
      if (!img) return null;
      return {
        url: img.url,
        title: img.title,
        category: img.category,
        description: img.description,
      };
    } else {
      const plan = project?.plans?.[lightbox.index];
      if (!plan) return null;
      return {
        url: plan.url,
        title: plan.label,
        category: 'Technical Drawing',
        description: plan.alt || 'Architectural drawing blueprint details.',
      };
    }
  }, [lightbox, filteredImages, project?.plans]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="w-8 h-8 border-2 border-t-[#2563EB] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs uppercase tracking-[0.25em] text-[#2563EB] font-bold animate-pulse">Loading Project Details...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative h-[80vh] w-full overflow-hidden bg-[#111111]">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image
            src={getOptimizedImageUrl(project.heroImage.url, 1920)}
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
      <Container className="py-24 space-y-16 max-w-6xl">
        {/* Premium museum-style horizontal specification bar */}
        <div className="flex flex-wrap gap-x-10 md:gap-x-16 gap-y-6 py-8 border-y border-gray-200/60 justify-start items-center bg-[#FAFAFA]/40 px-8">
          <div className="space-y-1">
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-gray-400 font-extrabold">Location</h4>
            <p className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">{project.location}</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-gray-400 font-extrabold">Year</h4>
            <p className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">{project.year}</p>
          </div>
          {project.metrics && Object.entries(project.metrics).map(([key, value]) => (
            <div key={key} className="space-y-1">
              <h4 className="text-[10px] uppercase tracking-[0.25em] text-gray-400 font-extrabold capitalize">{key}</h4>
              <p className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight capitalize">{value}</p>
            </div>
          ))}
        </div>

        {/* Narrative & Narrative Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-light text-[#111111] tracking-tighter leading-[0.95]">
              Spatial <br className="hidden lg:block"/> Concept
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-6 text-[15px] leading-relaxed text-gray-600 font-light">
            {project.fullDescription.map((paragraph, idx) => (
              <p key={idx} className="first-of-type:text-gray-900 first-of-type:font-normal first-of-type:text-base leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Container>

      {/* Pinterest-style Gallery */}
      <Container className="pb-32 pt-16 bg-[#FAFAFA] border-t border-gray-100 max-w-7xl">
        <div className="mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="max-w-xl mb-12">
            <span className="text-[#2563EB] text-[11px] font-bold tracking-widest uppercase block mb-3">
              Inspiration Grid
            </span>
            <h2 className="text-4xl font-light tracking-tighter text-[#111111] mb-4">
              Atmosphere & Details
            </h2>
            <p className="text-sm text-gray-500 font-light leading-relaxed">
              A curated visual exploration of architectural space, light, material textures, and organic transitions.
            </p>
          </div>

          {/* Filter Tabs */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10 border-b border-gray-200/80 pb-4">
              {categories.map((filter) => {
                const isActive = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    onClick={() => {
                      setActiveFilter(filter);
                      setLightbox(null);
                    }}
                    className={`relative px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-colors duration-300 ${
                      isActive ? 'text-[#2563EB]' : 'text-gray-400 hover:text-[#111111]'
                    }`}
                  >
                    {filter}
                    {isActive && (
                      <motion.div
                        layoutId="activeFilterUnderline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Masonry Grid */}
          <motion.div 
            layout 
            className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="break-inside-avoid group relative overflow-hidden rounded-xl bg-white shadow-sm border border-gray-100 cursor-pointer"
                  onClick={() => setLightbox({ type: 'gallery', index })}
                >
                  <div className="relative overflow-hidden w-full bg-gray-100">
                    <Image
                      src={image.url}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <span className="text-[#2563EB] text-[9px] font-bold tracking-widest uppercase mb-1">
                        {image.category}
                      </span>
                      <h3 className="text-white text-lg font-light tracking-tight mb-1">
                        {image.title}
                      </h3>
                      <p className="text-white/60 text-xs font-light line-clamp-2">
                        {image.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </Container>

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {lightbox !== null && activeLightboxItem !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-10"
            onClick={() => setLightbox(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 z-50 text-white/50 hover:text-white transition-colors duration-200 p-2"
              aria-label="Close Lightbox"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Left navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevImage();
              }}
              className="absolute left-4 md:left-8 z-50 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-full p-3 transition-all duration-200"
              aria-label="Previous Image"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Content Container */}
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative max-w-5xl w-full max-h-[85vh] flex flex-col md:flex-row bg-[#111111] rounded-2xl overflow-hidden shadow-2xl border border-white/5"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image side */}
              <div className="relative flex-1 bg-black flex items-center justify-center min-h-[40vh] md:min-h-0">
                <div className="relative w-full h-full aspect-[4/3] md:aspect-auto md:h-[70vh]">
                  <Image
                    src={activeLightboxItem.url}
                    alt={activeLightboxItem.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    priority
                  />
                </div>
              </div>

              {/* Info side */}
              <div className="w-full md:w-80 bg-[#161616] p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/5">
                <div className="space-y-6">
                  <div>
                    <span className="text-[#2563EB] text-[10px] font-bold tracking-widest uppercase block mb-2">
                      {activeLightboxItem.category}
                    </span>
                    <h2 className="text-2xl font-light text-white tracking-tight">
                      {activeLightboxItem.title}
                    </h2>
                  </div>
                  <p className="text-sm text-gray-400 font-light leading-relaxed">
                    {activeLightboxItem.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center text-[10px] font-bold text-gray-500 tracking-wider uppercase">
                  <span>{lightbox.type === 'gallery' ? 'Inspiration Series' : 'Drawing Details'}</span>
                  <span>
                    {lightbox.index + 1} / {lightbox.type === 'gallery' ? filteredImages.length : (project?.plans?.length || 0)}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Right navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNextImage();
              }}
              className="absolute right-4 md:right-8 z-50 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-full p-3 transition-all duration-200"
              aria-label="Next Image"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Plans Section */}
      {project.plans && project.plans.length > 0 && (
        <section className="py-24 bg-[#FAFAFA]">
          <div className="container mx-auto px-6 md:px-12">
            <h3 className="text-3xl font-light tracking-tighter mb-16 text-center">Technical Drawings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {project.plans.map((plan, idx) => (
                <div
                  key={idx}
                  onClick={() => setLightbox({ type: 'plan', index: idx })}
                  className="flex flex-col bg-white p-8 border border-gray-100 cursor-pointer hover:border-black transition-all duration-300 group hover:shadow-md"
                >
                  <div className="relative aspect-square w-full mb-6 overflow-hidden">
                    <Image
                      src={getOptimizedImageUrl(plan.url, 1200)}
                      alt={plan.alt}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-103"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <p className="text-[10px] font-bold tracking-widest uppercase text-center text-gray-400 group-hover:text-black transition-colors">
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
