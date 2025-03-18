// src/routes/api/firestore/delete/+server.js
import { json } from '@sveltejs/kit';
import { db } from '$lib/server/firebase.server.js';
import { doc, deleteDoc } from 'firebase/firestore';

export async function DELETE({ request }) {
  try {
    const { collectionName, id } = await request.json();
    await deleteDoc(doc(db, collectionName, id));
    return json({ success: true });
  } catch (error) {
    console.error('Error deleting document:', error);
    return json({ error: 'Internal Server Error' }, { status: 500 });
  }
}