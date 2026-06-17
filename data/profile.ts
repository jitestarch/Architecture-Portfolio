import { Profile } from '@/types/profile';

export const fallbackProfile: Profile = {
  name: "Jitesh SA",
  description: "Student at SRM School of Environment Architecture and Design (SEAD), Ramapuram, Chennai. Exploring the intersection of form, environment, and human spatial interaction.",
  experience: [
    {
      category: "Externship",
      title: "Starchitect",
      location: "Kaladipet, Chennai",
      desc: "Hands-on practice in design development, working drawings, 3D visualization, and site supervision."
    }
  ],
  academic_projects: [
    { category: 'Foundation', title: 'Basic Design', desc: 'Exploration of form, scale, and spatial fundamentals' },
    { category: 'Residential', title: 'Villa Design', desc: 'Bespoke housing design and layouts' },
    { category: 'Institutional', title: 'Primary & Nursery School Design', desc: 'Educational and child-centric spaces' },
    { category: 'Rural Studies', title: 'Rurals', desc: 'Contextual design and community housing' },
    { category: 'Commercial', title: 'Eye Hospital & Cultural Centre', desc: 'Healthcare and cultural interaction spaces' },
    { category: 'Retail', title: 'Mall Design', desc: 'High-density commercial planning' },
    { category: 'Recreation', title: 'Stadium Design', desc: 'Large-span structures and public routing' },
    { category: 'Urban Planning', title: 'Porur Lake Urban Design', desc: 'Revitalization and community masterplanning' }
  ],
  software_suite: [
    'AUTOCAD',
    'SKETCHUP',
    'REVIT',
    'RHINO',
    'ENSCAPE',
    'D5 RENDER',
    'PHOTOSHOP',
    'ILLUSTRATOR',
    'INDESIGN',
    'PROCREATE'
  ],
  competitions: [
    { title: 'SRM Saram Project Expo 2026', subtitle: 'Exhibition entry' },
    { title: '68th GSEN', subtitle: 'NASA India association work' },
    { title: 'Jaipur Rugs Design', subtitle: 'Product design category' },
    { title: 'ETHOS - Stadium Design', subtitle: 'National level submission' }
  ],
  languages: [
    { lang: 'TELUGU', level: 'Native' },
    { lang: 'HINDI', level: 'Fluent' },
    { lang: 'ENGLISH', level: 'Professional' },
    { lang: 'TAMIL', level: 'Basic' }
  ],
  flipbook_url: '',
  portfolio_pdf_url: ''
};
