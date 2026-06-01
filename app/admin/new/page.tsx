'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Plus, Trash2, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { createProject } from '@/app/actions/projects';
import { Project, ProjectCategory } from '@/types/project';

const CATEGORIES: ProjectCategory[] = [
  'Residential',
  'Commercial',
  'Interior',
  'Urban Design',
  'Academic',
  'Competition',
];

interface GalleryImageState {
  id: string;
  url: string;
}

interface PlanState {
  id: string;
  url: string;
  label: string;
}

export default function NewProjectPage() {
  const router = useRouter();

  // Loading and error states
  const [isSaving, setIsSaving] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  // Form Field States
  const [title, setTitle] = React.useState('');
  const [slug, setSlug] = React.useState('');
  const [isSlugManual, setIsSlugManual] = React.useState(false);
  const [category, setCategory] = React.useState<ProjectCategory>('Residential');
  const [year, setYear] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [fullDescriptionRaw, setFullDescriptionRaw] = React.useState('');

  // Metrics
  const [area, setArea] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [client, setClient] = React.useState('');
  const [team, setTeam] = React.useState('');

  // Uploaded media states
  const [heroImageUrl, setHeroImageUrl] = React.useState('');
  const [gallery, setGallery] = React.useState<GalleryImageState[]>([]);
  const [plans, setPlans] = React.useState<PlanState[]>([]);

  // Auto-generate slug when title changes (unless manual is toggled)
  React.useEffect(() => {
    if (!isSlugManual) {
      const generated = title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // Remove non-word/non-space chars
        .replace(/[\s_-]+/g, '-') // Replace spaces with a single dash
        .replace(/^-+|-+$/g, ''); // Trim leading/trailing dashes
      setSlug(generated);
    }
  }, [title, isSlugManual]);

  // Gallery Helpers
  const addGalleryUploader = () => {
    setGallery((prev) => [...prev, { id: Math.random().toString(), url: '' }]);
  };

  const updateGalleryImage = (id: string, url: string) => {
    setGallery((prev) =>
      prev.map((item) => (item.id === id ? { ...item, url } : item))
    );
  };

  const removeGalleryImage = (id: string) => {
    setGallery((prev) => prev.filter((item) => item.id !== id));
  };

  // Plan Helpers
  const addPlanUploader = () => {
    setPlans((prev) => [
      ...prev,
      { id: Math.random().toString(), url: '', label: `Floor Plan ${prev.length + 1}` },
    ]);
  };

  const updatePlanImage = (id: string, url: string) => {
    setPlans((prev) =>
      prev.map((item) => (item.id === id ? { ...item, url } : item))
    );
  };

  const updatePlanLabel = (id: string, label: string) => {
    setPlans((prev) =>
      prev.map((item) => (item.id === id ? { ...item, label } : item))
    );
  };

  const removePlan = (id: string) => {
    setPlans((prev) => prev.filter((item) => item.id !== id));
  };

  // Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validations
    if (!title || !slug || !year || !location || !description || !fullDescriptionRaw) {
      setErrorMessage('Please fill in all mandatory fields.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (!heroImageUrl) {
      setErrorMessage('Please upload a Hero Image to showcase the project.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const validGallery = gallery.filter((g) => g.url !== '');
    if (validGallery.length === 0) {
      setErrorMessage('Please upload at least one image to the Project Gallery.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSaving(true);
    setErrorMessage(null);

    // Prepare complete Project model
    const newProject: Project = {
      slug,
      title,
      description,
      fullDescription: fullDescriptionRaw
        .split('\n\n')
        .map((p) => p.trim())
        .filter(Boolean),
      category,
      year,
      location,
      heroImage: { url: heroImageUrl, alt: `${title} Hero Image` },
      gallery: validGallery.map((g, idx) => ({
        url: g.url,
        alt: `${title} Gallery Photo ${idx + 1}`,
      })),
      plans: plans
        .filter((p) => p.url !== '')
        .map((p) => ({
          url: p.url,
          alt: p.label,
          label: p.label,
        })),
      metrics: {
        ...(area && { area }),
        ...(status && { status }),
        ...(client && { client }),
        ...(team && { team }),
      },
    };

    try {
      const res = await createProject(newProject);

      if (res.success) {
        // Project created successfully, redirect back
        router.push('/admin');
        router.refresh();
      } else {
        setErrorMessage(res.error || 'Failed to save project. Please check if slug already exists.');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (err: any) {
      console.error('Error creating project:', err);
      setErrorMessage(err.message || 'An error occurred while saving the project.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSaving(false);
    }
  };

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
            <h1 className="text-3xl font-light tracking-tighter text-[#111111]">Add New Architecture Work</h1>
          </div>
        </div>

        {errorMessage && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-none font-medium leading-relaxed">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-12">
          
          {/* Section 1: Basic Info */}
          <div className="space-y-6">
            <h2 className="text-xs uppercase tracking-[0.2em] font-extrabold text-[#2563EB] border-b border-gray-100 pb-2">
              01 &bull; General Project Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Title */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Glass Pavilion"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-gray-200 px-4 py-3 text-sm focus:border-black focus:outline-none transition-all rounded-none bg-gray-50/50"
                />
              </div>

              {/* Slug */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                    URL Slug *
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsSlugManual(!isSlugManual)}
                    className="text-[9px] uppercase tracking-widest text-[#2563EB] font-bold hover:underline"
                  >
                    {isSlugManual ? 'Auto-Generate' : 'Edit Manually'}
                  </button>
                </div>
                <input
                  type="text"
                  required
                  disabled={!isSlugManual}
                  placeholder="e.g. glass-pavilion"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full border border-gray-200 px-4 py-3 text-sm focus:border-black focus:outline-none transition-all rounded-none bg-gray-50/50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                />
              </div>

              {/* Category */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block">
                  Design Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ProjectCategory)}
                  className="w-full border border-gray-200 px-4 py-3 text-sm focus:border-black focus:outline-none transition-all rounded-none bg-gray-50/50"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block">
                  Project Year *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2025"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full border border-gray-200 px-4 py-3 text-sm focus:border-black focus:outline-none transition-all rounded-none bg-gray-50/50"
                />
              </div>

              {/* Location */}
              <div className="space-y-1 md:col-span-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block">
                  Location *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Milan, Italy"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full border border-gray-200 px-4 py-3 text-sm focus:border-black focus:outline-none transition-all rounded-none bg-gray-50/50"
                />
              </div>

            </div>
          </div>

          {/* Section 2: Metrics / Performance Info */}
          <div className="space-y-6">
            <h2 className="text-xs uppercase tracking-[0.2em] font-extrabold text-[#2563EB] border-b border-gray-100 pb-2">
              02 &bull; Metrics & Specifications (Optional)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Area */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block">
                  Square Footage / Area
                </label>
                <input
                  type="text"
                  placeholder="e.g. 15,000 sq ft"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full border border-gray-200 px-4 py-3 text-sm focus:border-black focus:outline-none transition-all rounded-none bg-gray-50/50"
                />
              </div>

              {/* Status */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block">
                  Project Status
                </label>
                <input
                  type="text"
                  placeholder="e.g. Completed, In Design, Construction"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full border border-gray-200 px-4 py-3 text-sm focus:border-black focus:outline-none transition-all rounded-none bg-gray-50/50"
                />
              </div>

              {/* Client */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block">
                  Client Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Private / Corporation"
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  className="w-full border border-gray-200 px-4 py-3 text-sm focus:border-black focus:outline-none transition-all rounded-none bg-gray-50/50"
                />
              </div>

              {/* Team */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block">
                  Project Team
                </label>
                <input
                  type="text"
                  placeholder="e.g. Lead Architect, Structural Eng."
                  value={team}
                  onChange={(e) => setTeam(e.target.value)}
                  className="w-full border border-gray-200 px-4 py-3 text-sm focus:border-black focus:outline-none transition-all rounded-none bg-gray-50/50"
                />
              </div>

            </div>
          </div>

          {/* Section 3: Narratives & Descriptions */}
          <div className="space-y-6">
            <h2 className="text-xs uppercase tracking-[0.2em] font-extrabold text-[#2563EB] border-b border-gray-100 pb-2">
              03 &bull; Project Narrative & Description
            </h2>

            <div className="space-y-6">
              
              {/* Short Description */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block">
                  Short Summary * (Displays on Cards & Previews)
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="A one-sentence impact statement describing the core concept..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-gray-200 px-4 py-3 text-sm focus:border-black focus:outline-none transition-all rounded-none bg-gray-50/50 resize-y"
                />
              </div>

              {/* Full Description / Story */}
              <div className="space-y-1">
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block">
                    Full Architectural Concept *
                  </label>
                  <span className="text-[9px] text-gray-400 uppercase tracking-widest font-semibold flex items-center gap-1">
                    <HelpCircle className="w-3 h-3" /> Press Enter twice to start a new paragraph
                  </span>
                </div>
                <textarea
                  required
                  rows={8}
                  placeholder="Write the full spatial concept and technical challenges faced during this project..."
                  value={fullDescriptionRaw}
                  onChange={(e) => setFullDescriptionRaw(e.target.value)}
                  className="w-full border border-gray-200 px-4 py-3 text-sm focus:border-black focus:outline-none transition-all rounded-none bg-gray-50/50 resize-y leading-relaxed"
                />
              </div>

            </div>
          </div>

          {/* Section 4: Hero Image */}
          <div className="space-y-6">
            <h2 className="text-xs uppercase tracking-[0.2em] font-extrabold text-[#2563EB] border-b border-gray-100 pb-2">
              04 &bull; Hero Media Showcase
            </h2>

            <ImageUploader
              label="Hero Image * (Landscape format recommended for full-width headers)"
              value={heroImageUrl}
              onUploadSuccess={setHeroImageUrl}
              onRemove={() => setHeroImageUrl('')}
            />
          </div>

          {/* Section 5: Gallery Images */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <h2 className="text-xs uppercase tracking-[0.2em] font-extrabold text-[#2563EB]">
                05 &bull; Gallery Showcase (At least 1 required)
              </h2>
              <button
                type="button"
                onClick={addGalleryUploader}
                className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-widest font-extrabold text-[#2563EB] hover:text-[#111111] transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add Gallery Slot
              </button>
            </div>

            {gallery.length === 0 ? (
              <div className="text-center py-10 border border-dashed border-gray-200 bg-gray-50/50">
                <p className="text-xs text-gray-400 font-light mb-3">No gallery images added yet.</p>
                <button
                  type="button"
                  onClick={addGalleryUploader}
                  className="px-4 py-2 border border-gray-200 hover:border-black text-[9px] uppercase tracking-widest font-bold text-gray-800 transition-colors"
                >
                  Add Image Slot
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {gallery.map((item, idx) => (
                  <div key={item.id} className="relative border border-gray-200 p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] uppercase tracking-widest font-bold text-gray-400">
                        Gallery Asset {idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <ImageUploader
                      label="Upload Photo"
                      value={item.url}
                      onUploadSuccess={(url) => updateGalleryImage(item.id, url)}
                      onRemove={() => updateGalleryImage(item.id, '')}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 6: Floor Plans / Drawings */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <h2 className="text-xs uppercase tracking-[0.2em] font-extrabold text-[#2563EB]">
                06 &bull; Technical Drawings & Plans (Optional)
              </h2>
              <button
                type="button"
                onClick={addPlanUploader}
                className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-widest font-extrabold text-[#2563EB] hover:text-[#111111] transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add Blueprint / Plan
              </button>
            </div>

            {plans.length === 0 ? (
              <div className="text-center py-10 border border-dashed border-gray-200 bg-gray-50/50">
                <p className="text-xs text-gray-400 font-light">Add blueprint drawings, site plans, elevations or custom sections.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {plans.map((item, idx) => (
                  <div key={item.id} className="border border-gray-200 p-4 space-y-4 relative">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] uppercase tracking-widest font-bold text-gray-400">
                        Blueprint Asset {idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removePlan(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block">
                        Drawing Label (e.g. Ground Floor Plan, North Elevation)
                      </label>
                      <input
                        type="text"
                        value={item.label}
                        onChange={(e) => updatePlanLabel(item.id, e.target.value)}
                        className="w-full border border-gray-200 px-3 py-2 text-xs focus:border-black focus:outline-none transition-all rounded-none bg-gray-50/50"
                      />
                    </div>

                    <ImageUploader
                      label="Upload Blueprint Image"
                      value={item.url}
                      onUploadSuccess={(url) => updatePlanImage(item.id, url)}
                      onRemove={() => updatePlanImage(item.id, '')}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Form Actions */}
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
              {isSaving ? 'Saving Project...' : 'Save & Publish Project'} <Save className="w-4 h-4" />
            </Button>
          </div>

        </form>

      </div>
    </div>
  );
}
