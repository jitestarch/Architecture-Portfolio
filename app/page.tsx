"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { projects } from "@/data/projects";
import { supabase } from "@/lib/supabase";
import { Project } from "@/types/project";
import { Profile } from "@/types/profile";
import { fallbackProfile } from "@/data/profile";

import { ArrowRight, Download, ExternalLink } from "lucide-react";
import { getOptimizedImageUrl } from "@/lib/utils";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [liveProjects, setLiveProjects] = React.useState<Project[]>(projects);
  const [profile, setProfile] = React.useState<Profile>(fallbackProfile);

  React.useEffect(() => {
    async function loadLiveProjects() {
      const { data } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false }); // Show newest first
      if (data && data.length > 0) {
        setLiveProjects(data as Project[]);
      }
    }

    async function loadProfile() {
      try {
        const { data } = await supabase
          .from("profile")
          .select("*")
          .eq("id", 1)
          .maybeSingle();
        if (data) {
          setProfile(data as Profile);
        }
      } catch (err) {
        console.error("Error loading profile:", err);
      }
    }

    loadLiveProjects();
    loadProfile();
  }, []);

  const featuredProjects = liveProjects.slice(0, 3);

  return (
    <div className="flex flex-col w-full">
      {/* Premium Student Profile / Hero Section */}
      <section className="pt-32 pb-10 bg-white">
        <Container className="max-w-6xl">
          <div className="flex flex-col md:flex-row md:gap-2 border-b border-gray-100">
            {/* Left Info Column */}
            <div className="flex-1 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4"
              >
                <div className="md:hidden  bg-amber-200 flex items-start justify-center gap-4">
                  <div className="flex-1 space-y-3 ">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100/50 rounded-full ml-auto">
                      <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                      <span className="text-[10px] uppercase tracking-widest text-accent font-bold">
                        Architecture Student
                      </span>
                    </div>
                    <h1 className="text-4xl font-extralight tracking-tighter text-foreground leading-tight">
                      {profile.name}
                    </h1>
                  </div>

                  <div className="shrink-0">
                    <div className="relative group w-28 h-28">
                      <div className="absolute inset-0 border border-gray-200 translate-x-2 translate-y-2" />
                      <div className="relative rounded-2xl w-full h-full overflow-hidden border border-gray-900 bg-gray-50">
                        <img
                          src="https://res.cloudinary.com/dt3ucgv75/image/upload/v1781725992/Dp_lvbnva.jpg"
                          alt="Jitesh SA DP"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hidden md:inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100/50 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                  <span className="text-[10px] uppercase tracking-widest text-accent font-bold">
                    Architecture Student
                  </span>
                </div>
                <h1 className="hidden md:block text-5xl md:text-7xl font-extralight tracking-tighter text-foreground leading-tight">
                  {profile.name}
                </h1>
                <p className="text-sm md:text-base text-gray-600 font-light max-w-full md:max-w-xl leading-relaxed whitespace-pre-wrap text-right md:text-left">
                  {profile.description}
                </p>
              </motion.div>{" "}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="pt-6 border-t border-gray-100 flex flex-wrap gap-x-10 gap-y-4"
              >
                <div>
                  <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-accent mb-2">
                    Get in Touch
                  </h4>
                  <a
                    href="mailto:jiteshsa5273@gmail.com"
                    className="text-sm font-light text-gray-600 hover:text-accent transition-colors block"
                  >
                    jiteshsa5273@gmail.com
                  </a>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-accent mb-2">
                    Phone
                  </h4>
                  <a
                    href="tel:+919087990009"
                    className="text-sm font-light text-gray-600 hover:text-accent transition-colors block"
                  >
                    +91 90879 90009
                  </a>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-accent mb-2">
                    Portfolio PDF
                  </h4>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 rounded-none border-gray-200 hover:border-black text-[10px] tracking-wider px-3 font-semibold transition-all duration-300"
                    asChild
                  >
                    <a
                      href="https://drive.google.com/file/d/1noGsdkuszx7I5gfOgrWRYQGdtJqQ6Rgb/view?usp=drivesdk"
                      className="inline-flex items-center gap-1.5"
                    >
                      <Download className="w-3 h-3 text-accent" />
                      View PDf
                    </a>
                  </Button>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-accent mb-2">
                    Flipbook Link
                  </h4>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 rounded-none border-gray-200 hover:border-black text-[10px] tracking-wider px-3 font-semibold transition-all duration-300"
                    asChild
                  >
                    <a
                      href="https://heyzine.com/flip-book/9b00c15dbc.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3 h-3 text-accent" />
                      Open Link
                    </a>
                  </Button>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-accent mb-2">
                    Resume Link
                  </h4>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 rounded-none border-gray-200 hover:border-black text-[10px] tracking-wider px-3 font-semibold transition-all duration-300"
                    asChild
                  >
                    <a
                      href="https://heyzine.com/flip-book/9b00c15dbc.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3 h-3 text-accent" />
                      Open Link
                    </a>
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Right DP Column */}
            <div className="hidden md:block shrink-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative group w-64 h-64 md:w-72 md:h-72"
              >
                {/* Architectural styling frame */}
                <div className="absolute inset-0 border border-gray-200 translate-x-3 translate-y-3 group-hover:translate-x-1.5 group-hover:translate-y-1.5 transition-transform duration-500" />
                <div className="relative rounded-3xl  w-full h-full overflow-hidden border border-gray-900 bg-gray-50">
                  <img
                    src="https://res.cloudinary.com/dt3ucgv75/image/upload/v1781725992/Dp_lvbnva.jpg"
                    alt="Jitesh SA DP"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>

      {/* Curriculum Vitae Grid Section */}
      <section
        id="curriculum-vitae"
        className="py-24 bg-white border-y border-gray-100"
      >
        <Container className="max-w-6xl">
          <div className="space-y-16">
            {/* Section Title */}

            {/* Four-Column Sheet Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
              {/* Column 1: Experience */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div className="border-b border-gray-200 pb-3 flex justify-between items-center">
                  <h3 className="text-xs uppercase tracking-[0.2em] font-extrabold text-gray-900">
                    Experience
                  </h3>
                  <span className="text-[10px] text-gray-400 font-mono">
                    01
                  </span>
                </div>

                <div className="space-y-6">
                  {profile.experience && profile.experience.length > 0 ? (
                    profile.experience.map((exp, idx) => (
                      <div
                        key={idx}
                        className="group space-y-2 border-l-2 border-blue-600 pl-4 transition-all duration-300"
                      >
                        <span className="text-[9px] uppercase tracking-widest text-accent font-bold block">
                          {exp.category}
                        </span>
                        <h4 className="text-sm font-semibold text-gray-900 uppercase">
                          {exp.title}
                        </h4>
                        {exp.location && (
                          <p className="text-xs text-gray-500 font-medium">
                            {exp.location}
                          </p>
                        )}
                        {exp.desc && (
                          <p className="text-xs text-gray-400 font-light leading-relaxed">
                            {exp.desc}
                          </p>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400 font-light italic">
                      No experience records listed.
                    </p>
                  )}
                </div>
              </motion.div>

              {/* Column 2: Academic Projects */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-8"
              >
                <div className="border-b border-gray-200 pb-3 flex justify-between items-center">
                  <h3 className="text-xs uppercase tracking-[0.2em] font-extrabold text-gray-900">
                    Academic Projects
                  </h3>
                  <span className="text-[10px] text-gray-400 font-mono">
                    02
                  </span>
                </div>

                <div className="space-y-4">
                  {profile.academic_projects &&
                  profile.academic_projects.length > 0 ? (
                    profile.academic_projects.map((proj, idx) => (
                      <div
                        key={idx}
                        className="group space-y-0.5 border-l-2 border-transparent hover:border-blue-600 pl-3 transition-all duration-300"
                      >
                        <span className="text-[8px] uppercase tracking-widest text-accent font-bold block">
                          {proj.category}
                        </span>
                        <p className="text-xs font-semibold text-gray-800 group-hover:text-black transition-colors">
                          {proj.title}
                        </p>
                        {proj.desc && (
                          <p className="text-[10px] text-gray-400 font-light leading-tight">
                            {proj.desc}
                          </p>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400 font-light italic">
                      No academic projects listed.
                    </p>
                  )}
                </div>
              </motion.div>

              {/* Column 3: Software Skills */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-8"
              >
                <div className="border-b border-gray-200 pb-3 flex justify-between items-center">
                  <h3 className="text-xs uppercase tracking-[0.2em] font-extrabold text-gray-900">
                    Software Suite
                  </h3>
                  <span className="text-[10px] text-gray-400 font-mono">
                    03
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {profile.software_suite &&
                  profile.software_suite.length > 0 ? (
                    profile.software_suite.map((software) => (
                      <div
                        key={software}
                        className="border border-gray-100 bg-gray-50/50 px-4 py-3 hover:bg-white hover:border-foreground hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between aspect-video rounded-none shadow-sm"
                      >
                        <span className="text-[8px] font-bold tracking-widest text-gray-400 uppercase">
                          Tool
                        </span>
                        <span className="text-xs font-semibold text-gray-800 tracking-tight uppercase mt-2">
                          {software}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400 font-light italic col-span-2 text-center py-4">
                      No tools listed.
                    </p>
                  )}
                </div>
              </motion.div>

              {/* Column 4: Competitions & Languages */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-12"
              >
                {/* Competitions */}
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-3 flex justify-between items-center">
                    <h3 className="text-xs uppercase tracking-[0.2em] font-extrabold text-gray-900">
                      Competitions
                    </h3>
                    <span className="text-[10px] text-gray-400 font-mono">
                      04
                    </span>
                  </div>

                  <ul className="space-y-4">
                    {profile.competitions && profile.competitions.length > 0 ? (
                      profile.competitions.map((comp, idx) => (
                        <li
                          key={idx}
                          className="group space-y-1 pl-3 border-l border-gray-200 hover:border-blue-600 transition-colors"
                        >
                          <p className="text-sm font-medium text-gray-800 group-hover:text-accent transition-colors">
                            {comp.title}
                          </p>
                          {comp.subtitle && (
                            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                              {comp.subtitle}
                            </p>
                          )}
                        </li>
                      ))
                    ) : (
                      <li className="text-xs text-gray-400 font-light italic">
                        No competitions listed.
                      </li>
                    )}
                  </ul>
                </div>

                {/* Languages */}
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-3 flex justify-between items-center">
                    <h3 className="text-xs uppercase tracking-[0.2em] font-extrabold text-gray-900">
                      Languages
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {profile.languages && profile.languages.length > 0 ? (
                      profile.languages.map((item, idx) => (
                        <div
                          key={idx}
                          className="px-3 py-1.5 border border-gray-200 bg-white hover:border-foreground transition-colors flex items-baseline gap-2"
                        >
                          <span className="text-[10px] font-bold text-gray-800 tracking-wider uppercase">
                            {item.lang}
                          </span>
                          <span className="text-[8px] font-medium text-accent uppercase">
                            {item.level}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-gray-400 font-light italic">
                        No languages listed.
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Projects */}
      <section id="portfolio-works" className="py-32 bg-secondary">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex justify-between items-baseline mb-16 border-b border-gray-100 pb-4">
            <h2 className="text-3xl md:text-5xl font-light tracking-tighter">
              Selected Works
            </h2>
            <Link
              href="/projects"
              className="hidden md:inline-flex items-center text-[11px] uppercase tracking-widest font-bold text-accent hover:text-foreground transition-colors"
            >
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
                  <div className="relative aspect-4/5 overflow-hidden bg-gray-200 mb-6">
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
                    <span className="text-[10px] uppercase tracking-widest text-accent font-bold">
                      {project.category}
                    </span>
                    <h3 className="text-xl md:text-2xl font-light tracking-tight">
                      {project.title}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link
              href="/projects"
              className="inline-flex items-center text-sm uppercase tracking-wider font-medium hover:text-accent transition-colors"
            >
              All Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
