export async function load({ fetch, params }) {
  const { size } = params;

  const res = await fetch (`/api/puzzle/${size}`);
  const puzzle = await res.json();

  console.log('PAGE.TS puzzle:', puzzle);
  console.log('PAGE.TS size:', size);
  
  return {
    puzzle: puzzle,
    size: size
  }
}