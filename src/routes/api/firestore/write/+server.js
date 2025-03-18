// src/routes/api/firestore/write/+server.js
import { json } from '@sveltejs/kit';
import { db } from '$lib/server/firebase.server.js';
import { collection, addDoc } from 'firebase/firestore';

export async function POST({ request }) {
  try {
    const { collectionName, data } = await request.json();
    const docRef = await addDoc(collection(db, collectionName), data);
    return json({ id: docRef.id });
  } catch (error) {
    console.error('Error adding document:', error);
    return json({ error: 'Internal Server Error' }, { status: 500 });
  }
}