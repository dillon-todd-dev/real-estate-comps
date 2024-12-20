'use server';

import { db } from '@/drizzle/db';
import { Properties } from '@/drizzle/schema/properties';
import { redirect } from 'next/navigation';

export async function addProperty(formData: FormData): Promise<void> {
  const street = formData.get('street') as string;
  const city = formData.get('city') as string;
  const state = formData.get('state') as string;
  const postalCode = formData.get('postalCode') as string;

  const results = await db
    .insert(Properties)
    .values({
      street,
      city,
      state,
      postalCode,
    })
    .returning({
      id: Properties.id,
    });

  const { id } = results[0];
  redirect(`/dashboard/properties/${id}`);
}
