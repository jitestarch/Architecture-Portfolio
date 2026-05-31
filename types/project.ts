export type ProjectCategory = 'Residential' | 'Commercial' | 'Interior' | 'Urban Design' | 'Academic' | 'Competition';

export interface MediaAsset {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface ProjectPlan extends MediaAsset {
  label: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  fullDescription: string[];
  category: ProjectCategory;
  year: string;
  location: string;
  heroImage: MediaAsset;
  gallery: MediaAsset[];
  plans?: ProjectPlan[];
  metrics?: {
    area?: string;
    status?: string;
    client?: string;
    team?: string;
  };
}
