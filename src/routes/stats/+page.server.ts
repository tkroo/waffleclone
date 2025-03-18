export const load = async({ fetch }) => {
  const response = await fetch(`/api/firestore/read`);
  if (response.ok) {
    const data = await response.json();
    return { games: data };
  } else {
    console.error('Error');
  }
}
