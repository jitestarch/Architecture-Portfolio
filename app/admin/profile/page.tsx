"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  User,
  Briefcase,
  GraduationCap,
  Cpu,
  Trophy,
  Languages,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { updateProfile } from "@/app/actions/profile";
import { fallbackProfile } from "@/data/profile";
import {
  Profile,
  ExperienceItem,
  AcademicProjectItem,
  CompetitionItem,
  LanguageItem,
} from "@/types/profile";

type TabType =
  | "profile"
  | "experience"
  | "academic"
  | "software"
  | "competitions";

export default function AdminProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState<TabType>("profile");

  // Loading and feedback states
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSaving, setIsSaving] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(
    null,
  );
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  // Profile fields state
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [experience, setExperience] = React.useState<ExperienceItem[]>([]);
  const [academicProjects, setAcademicProjects] = React.useState<
    AcademicProjectItem[]
  >([]);
  const [softwareSuite, setSoftwareSuite] = React.useState<string[]>([]);
  const [competitions, setCompetitions] = React.useState<CompetitionItem[]>([]);
  const [languages, setLanguages] = React.useState<LanguageItem[]>([]);
  const [portfolioPdfUrl, setPortfolioPdfUrl] = React.useState("");
  const [flipbookUrl, setFlipbookUrl] = React.useState("");

  // New item inputs
  const [newExp, setNewExp] = React.useState<ExperienceItem>({
    category: "",
    title: "",
    location: "",
    desc: "",
  });
  const [newAcad, setNewAcad] = React.useState<AcademicProjectItem>({
    category: "",
    title: "",
    desc: "",
  });
  const [newSoftware, setNewSoftware] = React.useState("");
  const [newComp, setNewComp] = React.useState<CompetitionItem>({
    title: "",
    subtitle: "",
  });
  const [newLang, setNewLang] = React.useState<LanguageItem>({
    lang: "",
    level: "",
  });

  // Fetch current data on load
  React.useEffect(() => {
    async function fetchProfile() {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("profile")
          .select("*")
          .eq("id", 1)
          .maybeSingle();

        if (data) {
          setName(data.name || "");
          setDescription(data.description || "");
          setExperience(data.experience || []);
          setAcademicProjects(data.academic_projects || []);
          setSoftwareSuite(data.software_suite || []);
          setCompetitions(data.competitions || []);
          setLanguages(data.languages || []);
          setPortfolioPdfUrl(data.portfolio_pdf_url || "");
          setFlipbookUrl(data.flipbook_url || "");
        } else {
          // Initialize states with default fallback data
          setName(fallbackProfile.name);
          setDescription(fallbackProfile.description);
          setExperience(fallbackProfile.experience);
          setAcademicProjects(fallbackProfile.academic_projects);
          setSoftwareSuite(fallbackProfile.software_suite);
          setCompetitions(fallbackProfile.competitions);
          setLanguages(fallbackProfile.languages);
          setPortfolioPdfUrl(fallbackProfile.portfolio_pdf_url || "");
          setFlipbookUrl(fallbackProfile.flipbook_url || "");
        }
      } catch (err: any) {
        console.error("Error fetching profile:", err);
        setErrorMessage(
          "Failed to load profile from database. Loaded fallback data.",
        );
        // Still load fallbacks so user has editable form
        setName(fallbackProfile.name);
        setDescription(fallbackProfile.description);
        setExperience(fallbackProfile.experience);
        setAcademicProjects(fallbackProfile.academic_projects);
        setSoftwareSuite(fallbackProfile.software_suite);
        setCompetitions(fallbackProfile.competitions);
        setLanguages(fallbackProfile.languages);
        setPortfolioPdfUrl(fallbackProfile.portfolio_pdf_url || "");
        setFlipbookUrl(fallbackProfile.flipbook_url || "");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProfile();
  }, []);

  // Save profile submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!name.trim()) {
      setErrorMessage("Name cannot be empty.");
      setIsSaving(false);
      return;
    }

    if (!description.trim()) {
      setErrorMessage("Description cannot be empty.");
      setIsSaving(false);
      return;
    }

    const payload: Profile = {
      name: name.trim(),
      description: description.trim(),
      experience,
      academic_projects: academicProjects,
      software_suite: softwareSuite,
      competitions,
      languages,
      portfolio_pdf_url: portfolioPdfUrl,
      flipbook_url: flipbookUrl,
    };

    try {
      const res = await updateProfile(payload);
      if (res.success) {
        setSuccessMessage("Profile and CV updated successfully!");
        window.scrollTo({ top: 0, behavior: "smooth" });
        setTimeout(() => {
          router.push("/admin");
          router.refresh();
        }, 1500);
      } else {
        setErrorMessage(res.error || "Failed to save changes.");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (err: any) {
      console.error("Error updating profile:", err);
      setErrorMessage(
        err.message || "An error occurred while saving the profile settings.",
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setIsSaving(false);
    }
  };

  // Add & Remove Helpers
  const addExperience = () => {
    if (!newExp.category || !newExp.title) {
      alert("Please fill out Category and Title for the experience item.");
      return;
    }
    setExperience((prev) => [...prev, newExp]);
    setNewExp({ category: "", title: "", location: "", desc: "" });
  };

  const removeExperience = (index: number) => {
    setExperience((prev) => prev.filter((_, i) => i !== index));
  };

  const addAcademicProject = () => {
    if (!newAcad.category || !newAcad.title) {
      alert("Please fill out Category and Title for the academic project.");
      return;
    }
    setAcademicProjects((prev) => [...prev, newAcad]);
    setNewAcad({ category: "", title: "", desc: "" });
  };

  const removeAcademicProject = (index: number) => {
    setAcademicProjects((prev) => prev.filter((_, i) => i !== index));
  };

  const addSoftware = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanSoftware = newSoftware.trim().toUpperCase();
    if (!cleanSoftware) return;
    if (softwareSuite.includes(cleanSoftware)) {
      alert("Tool already exists in software suite.");
      return;
    }
    setSoftwareSuite((prev) => [...prev, cleanSoftware]);
    setNewSoftware("");
  };

  const removeSoftware = (tool: string) => {
    setSoftwareSuite((prev) => prev.filter((t) => t !== tool));
  };

  const addCompetition = () => {
    if (!newComp.title) {
      alert("Please fill out the Title for the competition.");
      return;
    }
    setCompetitions((prev) => [...prev, newComp]);
    setNewComp({ title: "", subtitle: "" });
  };

  const removeCompetition = (index: number) => {
    setCompetitions((prev) => prev.filter((_, i) => i !== index));
  };

  const addLanguage = () => {
    if (!newLang.lang || !newLang.level) {
      alert("Please fill out both Language name and proficiency Level.");
      return;
    }
    setLanguages((prev) => [...prev, newLang]);
    setNewLang({ lang: "", level: "" });
  };

  const removeLanguage = (index: number) => {
    setLanguages((prev) => prev.filter((_, i) => i !== index));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pt-32 pb-24">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">
            Loading Profile Settings...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-6 mb-10">
          <div>
            <Link
              href="/admin"
              className="inline-flex items-center text-[10px] uppercase tracking-widest font-bold text-gray-400 hover:text-black transition-colors mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Dashboard
            </Link>
            <h1 className="text-3xl font-light tracking-tighter text-[#111111]">
              Edit Profile & CV Details
            </h1>
          </div>
        </div>

        {/* Status Alerts */}
        {errorMessage && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-none font-medium flex items-start gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <div className="leading-relaxed">{errorMessage}</div>
          </div>
        )}

        {successMessage && (
          <div className="mb-8 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-none font-medium flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <div className="leading-relaxed">{successMessage}</div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-8 overflow-x-auto scrollbar-none whitespace-nowrap gap-1">
          {[
            { id: "profile", label: "Profile & Bio", icon: User },
            { id: "experience", label: "Experience", icon: Briefcase },
            { id: "academic", label: "Academic Projects", icon: GraduationCap },
            { id: "software", label: "Software Suite", icon: Cpu },
            { id: "competitions", label: "Competitions & Langs", icon: Trophy },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-2 px-5 py-4 border-b-2 text-xs font-bold uppercase tracking-widest transition-all ${
                  isActive
                    ? "border-black text-black bg-gray-50/50"
                    : "border-transparent text-gray-400 hover:text-black hover:border-gray-200"
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 ${isActive ? "text-[#2563EB]" : ""}`}
                />
                {tab.label}
              </button>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* TAB 1: PROFILE & BIO */}
          {activeTab === "profile" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="text-xs uppercase tracking-[0.2em] font-extrabold text-[#2563EB]">
                  General Bio Settings
                </h3>
              </div>
              <div className="space-y-4 font-light">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Jitesh SA"
                    className="w-full border border-gray-200 px-4 py-3 text-sm focus:border-black focus:outline-none transition-all rounded-none bg-gray-50/50 font-light"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block">
                    Professional Biography / Description *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Write a bio to display in the hero section..."
                    className="w-full border border-gray-200 px-4 py-3 text-sm focus:border-black focus:outline-none transition-all rounded-none bg-gray-50/50 font-light leading-relaxed"
                  />
                </div>

                {/* Flipbook URL Input */}
                <div className="mt-6">
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">
                    Flipbook URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://your-flipbook-link.com"
                    value={flipbookUrl}
                    onChange={(e) => setFlipbookUrl(e.target.value)}
                    className="w-full border border-gray-200 px-4 py-3 text-sm focus:border-black focus:outline-none transition-all rounded-none bg-gray-50/50 font-light"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: EXPERIENCE */}
          {activeTab === "experience" && (
            <div className="space-y-8 animate-fadeIn">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="text-xs uppercase tracking-[0.2em] font-extrabold text-[#2563EB]">
                  Work Experience List
                </h3>
              </div>

              {/* Add New Experience Form */}
              <div className="border border-gray-150 p-6 bg-gray-50/30 space-y-4">
                <h4 className="text-[10px] uppercase tracking-widest font-extrabold text-gray-900">
                  Add Experience Entry
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest text-gray-400 font-bold block">
                      Category * (e.g. Externship, Internship)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Externship"
                      value={newExp.category}
                      onChange={(e) =>
                        setNewExp({ ...newExp, category: e.target.value })
                      }
                      className="w-full border border-gray-200 px-3 py-2 text-xs focus:border-black focus:outline-none bg-white rounded-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest text-gray-400 font-bold block">
                      Company / Organization *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Starchitect"
                      value={newExp.title}
                      onChange={(e) =>
                        setNewExp({ ...newExp, title: e.target.value })
                      }
                      className="w-full border border-gray-200 px-3 py-2 text-xs focus:border-black focus:outline-none bg-white rounded-none"
                    />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-[9px] uppercase tracking-widest text-gray-400 font-bold block">
                      Location (e.g. Kaladipet, Chennai)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Kaladipet, Chennai"
                      value={newExp.location}
                      onChange={(e) =>
                        setNewExp({ ...newExp, location: e.target.value })
                      }
                      className="w-full border border-gray-200 px-3 py-2 text-xs focus:border-black focus:outline-none bg-white rounded-none"
                    />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-[9px] uppercase tracking-widest text-gray-400 font-bold block">
                      Description / Key Roles
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Hands-on practice in design development..."
                      value={newExp.desc}
                      onChange={(e) =>
                        setNewExp({ ...newExp, desc: e.target.value })
                      }
                      className="w-full border border-gray-200 px-3 py-2 text-xs focus:border-black focus:outline-none bg-white rounded-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <Button
                    type="button"
                    onClick={addExperience}
                    className="bg-[#111111] hover:bg-[#2563EB] text-white rounded-none text-[9px] uppercase tracking-widest font-bold py-4 px-4 flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Entry
                  </Button>
                </div>
              </div>

              {/* Existing Experience Items */}
              <div className="space-y-4">
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
                  Current Entries ({experience.length})
                </h4>

                {experience.length === 0 ? (
                  <div className="text-center py-8 border border-dashed border-gray-200 text-gray-400 text-xs font-light">
                    No experience records added yet. Add one above.
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100 border border-gray-100 bg-white">
                    {experience.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-start p-5 hover:bg-gray-50/50 gap-4 transition-colors"
                      >
                        <div className="space-y-1 pl-3 border-l-2 border-[#2563EB]">
                          <span className="text-[8px] uppercase tracking-widest text-[#2563EB] font-bold block">
                            {item.category}
                          </span>
                          <h5 className="text-sm font-semibold text-gray-900 uppercase">
                            {item.title}
                          </h5>
                          {item.location && (
                            <p className="text-xs text-gray-500 font-medium">
                              {item.location}
                            </p>
                          )}
                          {item.desc && (
                            <p className="text-xs text-gray-400 font-light mt-1 max-w-xl">
                              {item.desc}
                            </p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeExperience(idx)}
                          className="p-2 text-red-500 hover:text-red-750 hover:bg-red-50 transition-all"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: ACADEMIC PROJECTS */}
          {activeTab === "academic" && (
            <div className="space-y-8 animate-fadeIn">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="text-xs uppercase tracking-[0.2em] font-extrabold text-[#2563EB]">
                  Academic Projects
                </h3>
              </div>

              {/* Add New Academic Project Form */}
              <div className="border border-gray-150 p-6 bg-gray-50/30 space-y-4">
                <h4 className="text-[10px] uppercase tracking-widest font-extrabold text-gray-900">
                  Add Academic Project Entry
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest text-gray-400 font-bold block">
                      Category * (e.g. Residential, Commercial, Recreation)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Residential"
                      value={newAcad.category}
                      onChange={(e) =>
                        setNewAcad({ ...newAcad, category: e.target.value })
                      }
                      className="w-full border border-gray-200 px-3 py-2 text-xs focus:border-black focus:outline-none bg-white rounded-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest text-gray-400 font-bold block">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Villa Design"
                      value={newAcad.title}
                      onChange={(e) =>
                        setNewAcad({ ...newAcad, title: e.target.value })
                      }
                      className="w-full border border-gray-200 px-3 py-2 text-xs focus:border-black focus:outline-none bg-white rounded-none"
                    />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-[9px] uppercase tracking-widest text-gray-400 font-bold block">
                      Description
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Bespoke housing design and layouts..."
                      value={newAcad.desc}
                      onChange={(e) =>
                        setNewAcad({ ...newAcad, desc: e.target.value })
                      }
                      className="w-full border border-gray-200 px-3 py-2 text-xs focus:border-black focus:outline-none bg-white rounded-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <Button
                    type="button"
                    onClick={addAcademicProject}
                    className="bg-[#111111] hover:bg-[#2563EB] text-white rounded-none text-[9px] uppercase tracking-widest font-bold py-4 px-4 flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Project
                  </Button>
                </div>
              </div>

              {/* Existing Academic Projects */}
              <div className="space-y-4">
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
                  Current Academic Projects ({academicProjects.length})
                </h4>

                {academicProjects.length === 0 ? (
                  <div className="text-center py-8 border border-dashed border-gray-200 text-gray-400 text-xs font-light">
                    No academic projects added yet. Add one above.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {academicProjects.map((item, idx) => (
                      <div
                        key={idx}
                        className="border border-gray-250 p-4 hover:border-black transition-all duration-300 flex justify-between gap-2 bg-white"
                      >
                        <div className="space-y-1">
                          <span className="text-[8px] uppercase tracking-widest text-[#2563EB] font-bold block">
                            {item.category}
                          </span>
                          <p className="text-xs font-semibold text-gray-800 uppercase">
                            {item.title}
                          </p>
                          {item.desc && (
                            <p className="text-[10px] text-gray-400 font-light mt-1 line-clamp-3 leading-snug">
                              {item.desc}
                            </p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeAcademicProject(idx)}
                          className="text-red-500 hover:text-red-750 self-start p-1.5 hover:bg-red-50 transition-colors"
                          title="Remove project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: SOFTWARE SUITE */}
          {activeTab === "software" && (
            <div className="space-y-8 animate-fadeIn">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="text-xs uppercase tracking-[0.2em] font-extrabold text-[#2563EB]">
                  Software Skills Suite
                </h3>
              </div>

              {/* Add New Tool */}
              <div className="border border-gray-150 p-6 bg-gray-50/30 space-y-4">
                <div className="flex gap-3 items-end max-w-md">
                  <div className="space-y-1 flex-1">
                    <label className="text-[9px] uppercase tracking-widest text-gray-400 font-bold block">
                      Tool Name (e.g. REVIT, AUTOCAD, RHINO)
                    </label>
                    <input
                      type="text"
                      placeholder="Type tool name..."
                      value={newSoftware}
                      onChange={(e) => setNewSoftware(e.target.value)}
                      className="w-full border border-gray-200 px-3 py-2 text-xs focus:border-black focus:outline-none bg-white rounded-none uppercase"
                    />
                  </div>
                  <Button
                    type="button"
                    onClick={addSoftware}
                    className="bg-[#111111] hover:bg-[#2563EB] text-white rounded-none text-[9px] uppercase tracking-widest font-bold py-4 px-5 flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Tool
                  </Button>
                </div>
              </div>

              {/* Tool Tags */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
                    Software Suite Tools ({softwareSuite.length})
                  </h4>
                  <span className="text-[9px] text-gray-400 italic">
                    Click on any tool tag to remove it
                  </span>
                </div>

                {softwareSuite.length === 0 ? (
                  <div className="text-center py-8 border border-dashed border-gray-200 text-gray-400 text-xs font-light">
                    No software tools added yet. Add one above.
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2.5">
                    {softwareSuite.map((tool) => (
                      <button
                        key={tool}
                        type="button"
                        onClick={() => removeSoftware(tool)}
                        className="group border border-gray-200 px-4 py-3 bg-gray-50/30 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all flex items-center gap-2 duration-200"
                        title={`Remove ${tool}`}
                      >
                        <span className="text-xs font-semibold text-gray-800 tracking-tight group-hover:text-red-600 uppercase">
                          {tool}
                        </span>
                        <Trash2 className="w-3 h-3 text-gray-300 group-hover:text-red-500 transition-colors" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: COMPETITIONS & LANGUAGES */}
          {activeTab === "competitions" && (
            <div className="space-y-12 animate-fadeIn">
              {/* Part A: Competitions */}
              <div className="space-y-8">
                <div className="border-b border-gray-100 pb-3">
                  <h3 className="text-xs uppercase tracking-[0.2em] font-extrabold text-[#2563EB]">
                    Competitions
                  </h3>
                </div>

                {/* Add Competition form */}
                <div className="border border-gray-150 p-6 bg-gray-50/30 space-y-4">
                  <h4 className="text-[10px] uppercase tracking-widest font-extrabold text-gray-900">
                    Add Competition Entry
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-widest text-gray-400 font-bold block">
                        Competition / Exhibition Title *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. SRM Saram Project Expo 2026"
                        value={newComp.title}
                        onChange={(e) =>
                          setNewComp({ ...newComp, title: e.target.value })
                        }
                        className="w-full border border-gray-200 px-3 py-2 text-xs focus:border-black focus:outline-none bg-white rounded-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-widest text-gray-400 font-bold block">
                        Details / Category (e.g. Exhibition Entry, Rugs design)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Exhibition entry"
                        value={newComp.subtitle}
                        onChange={(e) =>
                          setNewComp({ ...newComp, subtitle: e.target.value })
                        }
                        className="w-full border border-gray-200 px-3 py-2 text-xs focus:border-black focus:outline-none bg-white rounded-none"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end pt-2">
                    <Button
                      type="button"
                      onClick={addCompetition}
                      className="bg-[#111111] hover:bg-[#2563EB] text-white rounded-none text-[9px] uppercase tracking-widest font-bold py-4 px-4 flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Competition
                    </Button>
                  </div>
                </div>

                {/* Existing Competitions */}
                <div className="space-y-4">
                  <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
                    Current Competitions ({competitions.length})
                  </h4>

                  {competitions.length === 0 ? (
                    <div className="text-center py-8 border border-dashed border-gray-200 text-gray-400 text-xs font-light">
                      No competitions added yet.
                    </div>
                  ) : (
                    <div className="border border-gray-100 divide-y divide-gray-100 bg-white">
                      {competitions.map((comp, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center p-4 hover:bg-gray-50/50 gap-4 transition-colors"
                        >
                          <div className="pl-3 border-l border-gray-200">
                            <p className="text-sm font-semibold text-gray-800 uppercase">
                              {comp.title}
                            </p>
                            {comp.subtitle && (
                              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                                {comp.subtitle}
                              </p>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => removeCompetition(idx)}
                            className="p-1.5 text-red-500 hover:text-red-750 hover:bg-red-50 transition-colors"
                            title="Remove competition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Part B: Languages */}
              <div className="space-y-8">
                <div className="border-b border-gray-100 pb-3">
                  <h3 className="text-xs uppercase tracking-[0.2em] font-extrabold text-[#2563EB]">
                    Languages
                  </h3>
                </div>

                {/* Add Language form */}
                <div className="border border-gray-150 p-6 bg-gray-50/30 space-y-4">
                  <h4 className="text-[10px] uppercase tracking-widest font-extrabold text-gray-900">
                    Add Language Entry
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-widest text-gray-400 font-bold block">
                        Language Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. ENGLISH, TELUGU"
                        value={newLang.lang}
                        onChange={(e) =>
                          setNewLang({
                            ...newLang,
                            lang: e.target.value.toUpperCase(),
                          })
                        }
                        className="w-full border border-gray-200 px-3 py-2 text-xs focus:border-black focus:outline-none bg-white rounded-none uppercase"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-widest text-gray-400 font-bold block">
                        Proficiency Level * (e.g. Native, Fluent, Basic)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Native"
                        value={newLang.level}
                        onChange={(e) =>
                          setNewLang({ ...newLang, level: e.target.value })
                        }
                        className="w-full border border-gray-200 px-3 py-2 text-xs focus:border-black focus:outline-none bg-white rounded-none"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end pt-2">
                    <Button
                      type="button"
                      onClick={addLanguage}
                      className="bg-[#111111] hover:bg-[#2563EB] text-white rounded-none text-[9px] uppercase tracking-widest font-bold py-4 px-4 flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Language
                    </Button>
                  </div>
                </div>

                {/* Existing Languages */}
                <div className="space-y-4">
                  <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
                    Current Languages ({languages.length})
                  </h4>

                  {languages.length === 0 ? (
                    <div className="text-center py-8 border border-dashed border-gray-200 text-gray-400 text-xs font-light">
                      No languages added yet.
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2.5">
                      {languages.map((item, idx) => (
                        <div
                          key={idx}
                          className="px-3.5 py-2 border border-gray-200 bg-white hover:border-[#111111] transition-colors flex items-center gap-3"
                        >
                          <span className="text-[10px] font-bold text-gray-800 tracking-wider uppercase">
                            {item.lang}
                          </span>
                          <span className="text-[8px] font-medium text-[#2563EB] uppercase">
                            {item.level}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeLanguage(idx)}
                            className="text-red-500 hover:text-red-750 transition-colors p-0.5 ml-1"
                            title={`Remove ${item.lang}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Form Actions Footer */}
          <div className="flex items-center justify-end gap-4 border-t border-gray-100 pt-8 mt-12">
            <Button
              type="button"
              variant="outline"
              disabled={isSaving}
              className="border-gray-200 text-gray-700 hover:border-black rounded-none px-6 text-[10px] uppercase tracking-widest font-bold disabled:opacity-50 py-5"
              asChild
            >
              <Link href="/admin">Cancel</Link>
            </Button>

            <Button
              type="submit"
              disabled={isSaving}
              className="bg-[#111111] text-white hover:bg-[#2563EB] rounded-none px-8 text-[10px] uppercase tracking-widest font-bold shadow-md disabled:opacity-50 flex items-center gap-2 py-5"
            >
              {isSaving ? "Saving Profile..." : "Save & Revalidate Profile"}{" "}
              <Save className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
