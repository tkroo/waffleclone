import { encodeText } from '$lib/rot13';
import { COLLECTION_NAME } from '$lib/utils.svelte';
export const writeGameToFireStore = async(words) => {
  if( words !== null && words !== undefined) {
    try {
      const data = {
        words: words,
        rot13string: words[0].length + '' + encodeText(words)
      }
      const response = await fetch('/api/firestore/write', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collectionName: COLLECTION_NAME, data }),
      });
      if (response.ok) {
        console.log('Data added');
      } else {
        console.error('Error');
      }
    } catch (error) {
      console.log(error, 'FAILED TO SAVE DATA.');
    }
  } else {
    throw new Error('words is undefined');
  }
}