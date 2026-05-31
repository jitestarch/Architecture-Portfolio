import { Project, ProjectCategory } from '../types/project';

export const projects: Project[] = [
  {
    slug: 'the-horizon-residence',
    title: 'The Horizon Residence',
    description: 'A minimal coastal cliffside home blurring the boundaries between interior and exterior spaces.',
    fullDescription: [
      'The Horizon Residence is engineered to embrace the stark beauty of its coastal site. The architectural intent was to create a structure that feels less like an imposition on the landscape and more like an extension of the cliff itself.',
      'Massive cantilevered concrete planes offer shelter while directing the gaze outward toward the infinite ocean. The material palette—board-formed concrete, untreated cedar, and expansive high-performance glazing—was selected for its ability to weather and patina gracefully over time.'
    ],
    category: 'Residential',
    year: '2024',
    location: 'Big Sur, California',
    heroImage: { url: 'https://picsum.photos/seed/horizon-hero/1920/1080', alt: 'The Horizon Residence exterior' },
    gallery: [
      { url: 'https://picsum.photos/seed/horizon-gal1/1200/800', alt: 'Living area' },
      { url: 'https://picsum.photos/seed/horizon-gal2/800/1200', alt: 'Staircase detail' },
      { url: 'https://picsum.photos/seed/horizon-gal3/1200/800', alt: 'Exterior at dusk' },
      { url: 'https://picsum.photos/seed/horizon-gal4/1200/800', alt: 'Master bedroom view' },
    ],
    plans: [
      { url: 'https://picsum.photos/seed/horizon-plan1/1000/1000', alt: 'Site Plan', label: 'Site Plan' },
      { url: 'https://picsum.photos/seed/horizon-plan2/1000/1000', alt: 'Ground Floor', label: 'Ground Floor' },
    ],
    metrics: {
      area: '4,200 sq ft',
      status: 'Completed',
      client: 'Private',
      team: 'Lead Architect, Structural Eng.'
    }
  },
  {
    slug: 'urban-canopy-tower',
    title: 'Urban Canopy Tower',
    description: 'A sustainable mixed-use high-rise integrating vertical forests and natural ventilation.',
    fullDescription: [
      'Addressing the density of the urban core, the Urban Canopy Tower introduces a breathing ecosystem into the city skyline. By staggering the floor plates, the design creates deep terraces capable of supporting mature trees and diverse plant life.',
      'This vertical forest acts as a natural sunshade, reducing the building\'s cooling load while filtering city air. The structural exoskeleton is pulled to the exterior, leaving the interior floorplates entirely column-free and adaptable for future uses.'
    ],
    category: 'Commercial',
    year: '2025',
    location: 'Seattle, Washington',
    heroImage: { url: 'https://picsum.photos/seed/canopy-hero/1920/1080', alt: 'Urban Canopy Tower exterior' },
    gallery: [
      { url: 'https://picsum.photos/seed/canopy-gal1/1200/800', alt: 'Lobby atrium' },
      { url: 'https://picsum.photos/seed/canopy-gal2/1200/800', alt: 'Terrace garden' },
      { url: 'https://picsum.photos/seed/canopy-gal3/800/1200', alt: 'Facade detail' },
      { url: 'https://picsum.photos/seed/canopy-gal4/1200/800', alt: 'Office floorplate' },
    ],
    metrics: {
      area: '120,000 sq ft',
      status: 'Under Construction',
      client: 'Terra Development',
    }
  },
  {
    slug: 'silica-pavilion',
    title: 'Silica Pavilion',
    description: 'An experimental temporal structure exploring the constraints of parametric glass block masonry.',
    fullDescription: [
      'Commissioned for the annual design biennale, the Silica Pavilion is an exploration of light, transparency, and computational masonry. The undulating form is constructed entirely from dry-stacked, custom-cast glass blocks.',
      'During the day, the pavilion acts as a sun dial, casting intricate, caustic light patterns across the plaza. At night, it becomes a glowing lantern, subtly illuminating its surroundings through integrated edge lighting.'
    ],
    category: 'Competition',
    year: '2023',
    location: 'Milan, Italy',
    heroImage: { url: 'https://picsum.photos/seed/silica-hero/1920/1080', alt: 'Silica Pavilion' },
    gallery: [
      { url: 'https://picsum.photos/seed/silica-gal1/1200/800', alt: 'Interior light patterns' },
      { url: 'https://picsum.photos/seed/silica-gal2/800/1200', alt: 'Glass block detail' },
    ],
    metrics: {
      area: '800 sq ft',
      status: 'Completed',
    }
  },
  {
    slug: 'nexus-transit-hub',
    title: 'Nexus Transit Hub',
    description: 'Masterplan and architectural design for a multi-modal transportation center.',
    fullDescription: [
      'The Nexus Transit Hub seeks to clarify the chaotic experience of urban commuting. A sweeping timber roof structure spans the main concourse, bringing warmth and acoustic dampening to a typically sterile environment.',
      'Skylights are parametrically distributed to guide passenger flow instinctively through the space, reducing the reliance on artificial wayfinding signage.'
    ],
    category: 'Urban Design',
    year: '2027',
    location: 'Portland, Oregon',
    heroImage: { url: 'https://picsum.photos/seed/nexus-hero/1920/1080', alt: 'Nexus Transit Hub exterior' },
    gallery: [
      { url: 'https://picsum.photos/seed/nexus-gal1/1200/800', alt: 'Main concourse' },
      { url: 'https://picsum.photos/seed/nexus-gal2/1200/800', alt: 'Timber roof structure' },
      { url: 'https://picsum.photos/seed/nexus-gal3/1200/800', alt: 'Platform view' },
    ],
    metrics: {
      area: '250,000 sq ft',
      status: 'Design Phase',
      client: 'Metropolitan Transit Auth.',
    }
  },
  {
    slug: 'atelier-k',
    title: 'Atelier K',
    description: 'A minimalist adaptive reuse of an industrial warehouse into a multidisciplinary design studio.',
    fullDescription: [
      'We stripped away decades of modifications to reveal the raw, honest bones of this 1920s warehouse. By inserting a series of freestanding, pristine white volumes within the shell, we created a clear dialogue between old and new.',
      'These insertions house the private meeting rooms and acoustic spaces, while the vast expanse of the open floor plan is preserved for collaborative, messy work.'
    ],
    category: 'Interior',
    year: '2022',
    location: 'Brooklyn, New York',
    heroImage: { url: 'https://picsum.photos/seed/atelier-hero/1920/1080', alt: 'Atelier K workspace' },
    gallery: [
      { url: 'https://picsum.photos/seed/atelier-gal1/1200/800', alt: 'Open workspace' },
      { url: 'https://picsum.photos/seed/atelier-gal2/800/1200', alt: 'Meeting box insertion' },
      { url: 'https://picsum.photos/seed/atelier-gal3/1200/800', alt: 'Material library' },
    ],
    metrics: {
      area: '8,500 sq ft',
      status: 'Completed',
    }
  },
  {
    slug: 'alpine-research-center',
    title: 'Alpine Research Center',
    description: 'An academic facility designed to withstand extreme high-altitude weather conditions.',
    fullDescription: [
      'Perched at an elevation of 3,000 meters, this research facility responds formally to the harsh alpine wind and snow loads. The aerodynamic envelope is clad in oxidized copper, selected to weather harmoniously with the surrounding rock outcroppings.',
      'The facility operations are entirely off-grid, utilizing a combination of geothermal heating, building-integrated photovoltaics, and advanced water recuperation systems.'
    ],
    category: 'Academic',
    year: '2026',
    location: 'Swiss Alps',
    heroImage: { url: 'https://picsum.photos/seed/alpine-hero/1920/1080', alt: 'Alpine Research Center' },
    gallery: [
      { url: 'https://picsum.photos/seed/alpine-gal1/1200/800', alt: 'Laboratory view' },
      { url: 'https://picsum.photos/seed/alpine-gal2/1200/800', alt: 'Common area' },
      { url: 'https://picsum.photos/seed/alpine-gal3/800/1200', alt: 'Facade detail' },
    ],
    metrics: {
      area: '15,000 sq ft',
      status: 'In Development',
    }
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(project => project.slug === slug);
}

export function getAllCategories(): ProjectCategory[] {
  const categories = new Set(projects.map(p => p.category));
  return Array.from(categories);
}
