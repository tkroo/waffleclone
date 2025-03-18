import { writeGameToFireStore } from '$lib/writeToFirestore.js';
export async function load({ fetch, params }) {
  const { size } = params;
  const res = await fetch (`/api/puzzle/${size}`);
  const puzzle = await res.json();  
  if(res.ok) {
    writeGameToFireStore(puzzle);
  } else {
    console.error('error fetching puzzle');
  }
  return {
    puzzle: puzzle,
    size: size
  }
}