export async function load({ fetch, params }) {
  const { size } = params;
  const res = await fetch (`/api/puzzle/${size}`);
  const puzzle = await res.json();  
  return {
    puzzle: puzzle,
    size: size
  }
}