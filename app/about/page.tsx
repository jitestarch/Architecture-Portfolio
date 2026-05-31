'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';

const team = [
  { name: 'Elena Rostova', role: 'Principal Architect' },
  { name: 'Marcus Chen', role: 'Design Director' },
  { name: 'Sarah Jenkins', role: 'Lead Interior Architect' },
  { name: 'David Okafor', role: 'Sustainable Design Lead' },
];

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mb-24"
        >
          <h1 className="text-6xl md:text-[84px] leading-[0.85] font-light tracking-tighter mb-8">
            Designing spaces that elevate the human experience.
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light">
            Founded in 2018, Studio is a multidisciplinary practice focusing on the intersection of contextual design, sustainable systems, and uncompromising minimal aesthetics.
          </p>
        </motion.div>

        <div className="relative aspect-[21/9] w-full mb-32 bg-gray-100 overflow-hidden">
           <Image 
             src="https://picsum.photos/seed/studio-hero/1920/800"
             alt="Studio workspace"
             fill
             className="object-cover"
             referrerPolicy="no-referrer"
             priority
           />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-32">
          <div className="md:col-span-4">
            <h2 className="text-3xl font-light tracking-tighter sticky top-32">Our Philosophy</h2>
          </div>
          <div className="md:col-span-8 space-y-8 text-lg text-gray-600 leading-relaxed font-light">
            <p>
              We believe architecture is fundamentally an act of optimisim. Every project is an opportunity to improve the built environment and the lives of those who inhabit it. We reject trend-driven design in favor of timeless, elemental forms that respond directly to their climatic and cultural contexts.
            </p>
            <p>
              Materiality plays a central role in our work. We favor materials that age gracefully—concrete that gathers the patina of rain, timber that silvers in the sun, and metals that oxidize to protect themselves. This approach ensures our buildings become more anchored to their sites over time.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="md:col-span-4">
            <h2 className="text-3xl font-light tracking-tighter sticky top-32">Leadership</h2>
          </div>
          <div className="md:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
              {team.map((person, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  key={person.name}
                  className="group"
                >
                  <div className="relative aspect-[3/4] mb-6 bg-gray-100 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                     <Image 
                        src={`https://picsum.photos/seed/person-${idx}/600/800`}
                        alt={person.name}
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                     />
                  </div>
                  <h3 className="text-xl font-light tracking-tighter">{person.name}</h3>
                  <p className="text-gray-400 text-[10px] font-bold mt-2 uppercase tracking-widest">{person.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
