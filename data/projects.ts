import { Project, ProjectCategory } from "../types/project";
import projectsData from "./projects.json";

export const projects: Project[] = projectsData as Project[];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAllCategories(): ProjectCategory[] {
  const categories = new Set(projects.map((p) => p.category));
  return Array.from(categories);
}
