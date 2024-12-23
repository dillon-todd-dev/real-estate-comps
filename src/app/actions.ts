'use server';

import { db } from '@/drizzle/db';
import { Properties } from '@/drizzle/schema/properties';
import { revalidatePath } from 'next/cache';

export async function addProperty(formData: FormData): Promise<void> {
  const street = formData.get('street') as string;
  const city = formData.get('city') as string;
  const state = formData.get('state') as string;
  const postalCode = formData.get('postalCode') as string;

  try {
    await db.insert(Properties).values({
      street,
      city,
      state,
      postalCode,
    });
    revalidatePath('/dashboard/properties');
  } catch (error) {
    console.error(error);
  }
}
