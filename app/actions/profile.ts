'use server';

import { revalidatePath } from 'next/cache';
import { supabaseAdmin } from '@/lib/supabase';
import { Profile } from '@/types/profile';

/**
 * Server action to update the profile record in Supabase.
 * Bypasses RLS using supabaseAdmin client.
 */
export async function updateProfile(profileData: Profile) {
  try {
    if (!supabaseAdmin) {
      return { 
        success: false, 
        error: 'Supabase admin client not initialized. Ensure SUPABASE_SERVICE_ROLE_KEY is configured.' 
      };
    }

    // Clean data format before sending to database to prevent any typescript/json parsing issues
    const cleanedData = {
      id: 1,
      name: profileData.name,
      description: profileData.description,
      experience: profileData.experience,
      academic_projects: profileData.academic_projects,
      software_suite: profileData.software_suite,
      competitions: profileData.competitions,
      languages: profileData.languages,
      updated_at: new Date().toISOString()
    };

    const { error } = await supabaseAdmin
      .from('profile')
      .upsert(cleanedData, { onConflict: 'id' });

    if (error) {
      throw error;
    }

    // Revalidate relevant pages so layout is rebuilt with the new data
    revalidatePath('/');
    revalidatePath('/admin');

    return { success: true };
  } catch (error: any) {
    console.error('Error updating profile settings:', error);
    return { success: false, error: error.message || 'An error occurred while saving the profile settings.' };
  }
}
