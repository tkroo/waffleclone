import { LocalStorage as LocalStorageState } from '$lib/storage.svelte';

export const myBools = $state({
  debug: false,
  working: false,
  generateError: false
})

// firestore collection name
export const COLLECTION_NAME = 'wafflygames'

export const myArrays = $state({
  completedWords: [] as string[],
})

export const mySettings = new LocalStorageState('mySettings', {
  myContrast: false,
  fetchDefinitions: false,
  startingSwaps5: 16,
  startingSwaps7: 32,
})
