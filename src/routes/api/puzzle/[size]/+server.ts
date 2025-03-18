import { json } from '@sveltejs/kit';
import { pickSixWords, pickEightWords } from '$lib/pickWords_faster.js';

export const GET = async ({ fetch, params, setHeaders }) => {
  console.log('params:', params);
  try {
    const puzzle = params.size == '5' ? await pickSixWords() : await pickEightWords();
    return json(puzzle);
  } catch (error) {
    console.error(error);
    return json({ error: error.message }, 500);
  }
}