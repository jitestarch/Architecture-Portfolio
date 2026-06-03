export interface ExperienceItem {
  category: string;
  title: string;
  location: string;
  desc: string;
}

export interface AcademicProjectItem {
  category: string;
  title: string;
  desc: string;
}

export interface CompetitionItem {
  title: string;
  subtitle: string;
}

export interface LanguageItem {
  lang: string;
  level: string;
}

export interface Profile {
  id?: number;
  name: string;
  description: string;
  experience: ExperienceItem[];
  academic_projects: AcademicProjectItem[];
  software_suite: string[];
  competitions: CompetitionItem[];
  languages: LanguageItem[];
}
