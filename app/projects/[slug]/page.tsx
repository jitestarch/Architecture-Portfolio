'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { getProjectBySlug, projects } from '@/data/projects';
import { ArrowLeft } from 'lucide-react';
import Container from '@/components/ui/container';

const GALLERY_IMAGES = [
  {
    id: 'img-1',
    url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
    width: 800,
    height: 1200,
    title: 'Brutalist Courtyard',
    category: 'Exterior',
    description: 'Raw concrete panels cast dramatic geometric shadows under direct sunlight.',
    alt: 'Brutalist concrete courtyard with sharp geometric shadows'
  },
  {
    id: 'img-2',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    width: 800,
    height: 533,
    title: 'Horizon Deck',
    category: 'Exterior',
    description: 'A seamless transition from natural stone decking to the vast coastal horizon.',
    alt: 'Modern house wooden deck looking out to the ocean'
  },
  {
    id: 'img-3',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    width: 800,
    height: 1000,
    title: 'Helix Void',
    category: 'Interior',
    description: 'A monolithic plaster spiral staircase weaving through the vertical core.',
    alt: 'White spiral staircase looking up'
  },
  {
    id: 'img-4',
    url: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=800&q=80',
    width: 800,
    height: 1100,
    title: 'Monolithic Hearth',
    category: 'Interior',
    description: 'A custom stone-carved kitchen island acting as the home\'s physical anchor.',
    alt: 'Minimal kitchen with a stone-carved kitchen island'
  },
  {
    id: 'img-5',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    width: 800,
    height: 533,
    title: 'Crystalline Facade',
    category: 'Facade',
    description: 'Steel mullions and specialized glazing reflecting the shifting sky colors.',
    alt: 'Glass skyscraper facade detail'
  },
  {
    id: 'img-6',
    url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    width: 800,
    height: 1200,
    title: 'Tropical Vestibule',
    category: 'Interior',
    description: 'Lush internal gardens introducing biophilic freshness into the concrete envelope.',
    alt: 'Biophilic interior with plants inside a concrete room'
  },
  {
    id: 'img-7',
    url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
    width: 800,
    height: 600,
    title: 'Infinity Horizon',
    category: 'Exterior',
    description: 'An expansive cantilevered pool extending directly into the coastal breeze.',
    alt: 'Infinity pool overlooking coastal cliff'
  },
  {
    id: 'img-8',
    url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
    width: 800,
    height: 533,
    title: 'Parametric Vault',
    category: 'Detail',
    description: 'Undulating wooden slat ceilings optimized for diffusion of natural acoustic waves.',
    alt: 'Undulating wood ceiling slats architecture detail'
  },
  {
    id: 'img-9',
    url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
    width: 800,
    height: 1066,
    title: 'Atrium Lounge',
    category: 'Interior',
    description: 'Double-height glazing washing the minimal living space in gentle morning light.',
    alt: 'Warm minimal double-height living room layout'
  },
  {
    id: 'img-10',
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    width: 800,
    height: 800,
    title: 'Light Study',
    category: 'Facade',
    description: 'Staggered shadow patterns cast by architectural screens during midday sun.',
    alt: 'Building facade with grid shadows'
  },
  {
    id: 'img-11',
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    width: 800,
    height: 533,
    title: 'Academic Salon',
    category: 'Interior',
    description: 'Warm timber shelving and structured desks fostering deep creative focus.',
    alt: 'Modern library workspace with clean wood tables'
  },
  {
    id: 'img-12',
    url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80',
    width: 800,
    height: 1200,
    title: 'Symmetric Portal',
    category: 'Detail',
    description: 'A sequence of minimal concrete arches defining a clean transition zone.',
    alt: 'Symmetrical concrete archways'
  }
];

export default function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const project = getProjectBySlug(slug);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const [activeFilter, setActiveFilter] = React.useState('All');
  const [selectedImageIndex, setSelectedImageIndex] = React.useState<number | null>(null);

  const filteredImages = React.useMemo(() => {
    if (activeFilter === 'All') return GALLERY_IMAGES;
    return GALLERY_IMAGES.filter(img => img.category === activeFilter);
  }, [activeFilter]);

  const handlePrevImage = React.useCallback(() => {
    setSelectedImageIndex((prev) => {
      if (prev === null) return null;
      return prev === 0 ? filteredImages.length - 1 : prev - 1;
    });
  }, [filteredImages.length]);

  const handleNextImage = React.useCallback(() => {
    setSelectedImageIndex((prev) => {
      if (prev === null) return null;
      return prev === filteredImages.length - 1 ? 0 : prev + 1;
    });
  }, [filteredImages.length]);

  React.useEffect(() => {
    if (selectedImageIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImageIndex(null);
      } else if (e.key === 'ArrowLeft') {
        handlePrevImage();
      } else if (e.key === 'ArrowRight') {
        handleNextImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, handlePrevImage, handleNextImage]);

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

      {/* Pinterest-style Gallery */}
      <section className="pb-32 pt-16 bg-[#FAFAFA] border-t border-gray-100">
        <div className="container mx-auto px-6 md:px-12">
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
          <div className="flex flex-wrap gap-2 mb-10 border-b border-gray-200/80 pb-4">
            {['All', 'Exterior', 'Interior', 'Facade', 'Detail'].map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => {
                    setActiveFilter(filter);
                    setSelectedImageIndex(null);
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
                  onClick={() => setSelectedImageIndex(index)}
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
      </section>

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-10"
            onClick={() => setSelectedImageIndex(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedImageIndex(null)}
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
                    src={filteredImages[selectedImageIndex].url}
                    alt={filteredImages[selectedImageIndex].title}
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
                      {filteredImages[selectedImageIndex].category}
                    </span>
                    <h2 className="text-2xl font-light text-white tracking-tight">
                      {filteredImages[selectedImageIndex].title}
                    </h2>
                  </div>
                  <p className="text-sm text-gray-400 font-light leading-relaxed">
                    {filteredImages[selectedImageIndex].description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center text-[10px] font-bold text-gray-500 tracking-wider uppercase">
                  <span>Inspiration Series</span>
                  <span>{selectedImageIndex + 1} / {filteredImages.length}</span>
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
