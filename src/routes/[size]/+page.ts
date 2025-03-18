import { writeGameToFireStore } from '$lib/writeToFirestore.js';
export async function load({ fetch, params }) {
  console.log('[size]/+page.ts] load() params:', params);
  const { size } = params;
  const res = await fetch (`/api/puzzle/${size}`);
  const puzzle = await res.json();  
  if(res.ok) {
    writeGameToFireStore(puzzle);
  } else {
    console.error('[size]/+page.ts] load() res:', res);
  }
  return {
    puzzle: puzzle,
    size: size
  }
}