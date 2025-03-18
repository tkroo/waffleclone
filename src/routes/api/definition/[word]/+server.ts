import { json } from '@sveltejs/kit';

export const GET = async ({ fetch, params, setHeaders }) => {
  const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${params.word}`);
  const data = await res.json();
  // return new Response(JSON.stringify(data));
  if (!res.ok) {
    throw new Error(`${data.message}`);
  }
  
  setHeaders({
    'content-type': 'application/json',
    'cache-control': 'max-age=360000'
  })
  return json(data);
}