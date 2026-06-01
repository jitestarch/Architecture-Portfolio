'use server';

import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { Project } from '@/types/project';

const jsonFilePath = path.join(process.cwd(), 'data', 'projects.json');

/**
 * Next.js Server Action to add a new project to the projects.json database
 * and instantly revalidate the Next.js static cache for the site pages.
 */
export async function createProject(projectData: Project) {
  try {
    // 1. Read the existing projects from the JSON database
    if (!fs.existsSync(jsonFilePath)) {
      return { success: false, error: 'Database file not found.' };
    }
    const fileContents = fs.readFileSync(jsonFilePath, 'utf8');
    const projects: Project[] = JSON.parse(fileContents);

    // 2. Ensure the slug is unique
    const slugExists = projects.some((p) => p.slug === projectData.slug);
    if (slugExists) {
      return { success: false, error: `A project with URL slug "${projectData.slug}" already exists.` };
    }

    // 3. Append the new project
    projects.push(projectData);

    // 4. Write back to the JSON file
    fs.writeFileSync(jsonFilePath, JSON.stringify(projects, null, 2), 'utf8');

    // 5. Revalidate target pages so the portfolio displays updates instantly
    revalidatePath('/');
    revalidatePath('/projects');

    return { success: true };
  } catch (error: any) {
    console.error('Failed to create new project:', error);
    return { success: false, error: error.message || 'An error occurred while saving the project.' };
  }
}

/**
 * Next.js Server Action to delete a project by its slug from the JSON database.
 */
export async function deleteProject(slug: string) {
  try {
    if (!fs.existsSync(jsonFilePath)) {
      return { success: false, error: 'Database file not found.' };
    }
    const fileContents = fs.readFileSync(jsonFilePath, 'utf8');
    const projects: Project[] = JSON.parse(fileContents);

    // Filter out the project to delete
    const updatedProjects = projects.filter((p) => p.slug !== slug);

    if (projects.length === updatedProjects.length) {
      return { success: false, error: 'Project not found.' };
    }

    // Write back to the JSON file
    fs.writeFileSync(jsonFilePath, JSON.stringify(updatedProjects, null, 2), 'utf8');

    // Revalidate target pages
    revalidatePath('/');
    revalidatePath('/projects');

    return { success: true };
  } catch (error: any) {
    console.error('Failed to delete project:', error);
    return { success: false, error: error.message || 'An error occurred while deleting the project.' };
  }
}
