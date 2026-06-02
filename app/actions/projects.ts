'use server';

import { revalidatePath } from 'next/cache';
import { supabaseAdmin } from '@/lib/supabase';
import { Project } from '@/types/project';

/**
 * Next.js Server Action to add a new project to the Supabase database.
 * Uses the secure admin client to bypass Row-Level Security.
 */
export async function createProject(projectData: Project) {
  try {
    if (!supabaseAdmin) {
      return { 
        success: false, 
        error: 'Supabase admin client not initialized. Ensure SUPABASE_SERVICE_ROLE_KEY is configured.' 
      };
    }

    // 1. Ensure the slug is unique by querying first
    const { data: existingProject } = await supabaseAdmin
      .from('projects')
      .select('slug')
      .eq('slug', projectData.slug)
      .maybeSingle();

    if (existingProject) {
      return { success: false, error: `A project with URL slug "${projectData.slug}" already exists.` };
    }

    // 2. Insert the project data into Supabase
    const { error: insertError } = await supabaseAdmin
      .from('projects')
      .insert([projectData]);

    if (insertError) {
      throw insertError;
    }

    // 3. Revalidate site pages cache so the update shows immediately
    revalidatePath('/');
    revalidatePath('/projects');
    revalidatePath('/admin');

    return { success: true };
  } catch (error: any) {
    console.error('Failed to create new project:', error);
    return { success: false, error: error.message || 'An error occurred while saving the project to the database.' };
  }
}

/**
 * Next.js Server Action to delete a project by its slug from the Supabase database.
 * Uses the secure admin client.
 */
export async function deleteProject(slug: string) {
  try {
    if (!supabaseAdmin) {
      return { 
        success: false, 
        error: 'Supabase admin client not initialized. Ensure SUPABASE_SERVICE_ROLE_KEY is configured.' 
      };
    }

    // 1. Delete the record from Supabase
    const { error: deleteError, count } = await supabaseAdmin
      .from('projects')
      .delete()
      .eq('slug', slug);

    if (deleteError) {
      throw deleteError;
    }

    // 2. Revalidate target pages
    revalidatePath('/');
    revalidatePath('/projects');
    revalidatePath('/admin');

    return { success: true };
  } catch (error: any) {
    console.error('Failed to delete project:', error);
    return { success: false, error: error.message || 'An error occurred while deleting the project from the database.' };
  }
}
