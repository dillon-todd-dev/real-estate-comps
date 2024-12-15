'use server';

import {
  Client,
  PlaceAutocompleteResult,
} from '@googlemaps/google-maps-services-js';

const client = new Client();

export const autocomplete = async (
  input: string
): Promise<PlaceAutocompleteResult[]> => {
  if (!input) return [];

  try {
    const response = await client.placeAutocomplete({
      params: {
        input,
        key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
      },
    });
    return response.data.predictions;
  } catch (err) {
    console.error(err);
    return [];
  }
};
