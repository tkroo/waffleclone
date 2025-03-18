// src/routes/api/firestore/read/+server.js
import { json } from '@sveltejs/kit';
import { db } from '$lib/server/firebase.server.js';
import { collection, getDocs } from 'firebase/firestore';
import { COLLECTION_NAME } from '$lib/utils.svelte.js';

export async function GET({ params }) {
  try {
    // const { collectionName } = params;
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return json(data);
  } catch (error) {
    console.error('Error getting documents:', error);
    return json({ error: 'Internal Server Error' }, { status: 500 });
  }
}