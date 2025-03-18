import { wordlist_5 } from './wordlist_5.js';
import { wordlist_7 } from './wordlist_7.js';

const attemptLimit = 20000;

// Pre-process wordlists
const wordlist5ByPositions = preprocessWordlist(wordlist_5);
const wordlist7ByPositions = preprocessWordlist(wordlist_7);

/**
 * Pre-processes a wordlist to create a nested record structure.
 * The returned object maps each character position in the words to another object,
 * which maps characters at that position to an array of words containing that character at that position.
 * 
 * @param wordlist - The list of words to preprocess.
 * @returns A nested record structure for quick lookup of words by character positions.
 */
function preprocessWordlist(wordlist: string[]): Record<number, Record<string, string[]>> {
  return wordlist.reduce((acc, word) => {
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if (!acc[i]) acc[i] = {};
      if (!acc[i][char]) acc[i][char] = [];
      acc[i][char].push(word);
    }
    return acc;
  }, {} as Record<number, Record<string, string[]>>);
}

const oneWordFromList = (obj: {
  len: 5 | 7;
  startLetter?: string;
  middleLetter?: string;
  middleLetter2?: string;
  endLetter?: string;
}): string | undefined => {
  const wordlistByPositions = obj.len === 7 ? wordlist7ByPositions : wordlist5ByPositions;
  let filteredWords = obj.len === 7 ? wordlist_7 : wordlist_5;

  if (obj.startLetter) {
    filteredWords = wordlistByPositions[0][obj.startLetter] || [];
  }

  if (obj.middleLetter) {
    filteredWords = filteredWords.filter(word => word[2] === obj.middleLetter);
  }

  if (obj.len === 7 && obj.middleLetter2) {
    filteredWords = filteredWords.filter(word => word[4] === obj.middleLetter2);
  }

  if (obj.endLetter) {
    filteredWords = filteredWords.filter(word => word[obj.len - 1] === obj.endLetter);
  }

  if (filteredWords.length === 0) {
    return undefined;
  }

  return filteredWords[Math.floor(Math.random() * filteredWords.length)];
};

export const pickSixWords = async (): Promise<string[]> => {
  await new Promise(resolve => setTimeout(resolve, 100)); // Add a short delay
  const words = new Set<string>();
  const maxAttempts = attemptLimit;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    words.clear();

    const word0 = oneWordFromList({ len: 5 });
    if (!word0) continue;
    words.add(word0);

    const word1 = oneWordFromList({ len: 5, startLetter: word0[4] });
    if (!word1) continue;
    words.add(word1);

    const word2 = oneWordFromList({ len: 5, endLetter: word1[4] });
    if (!word2) continue;
    words.add(word2);

    const word3 = oneWordFromList({ len: 5, startLetter: word0[0], endLetter: word2[0] });
    if (!word3) continue;
    words.add(word3);

    const word4 = oneWordFromList({ len: 5, startLetter: word0[2], endLetter: word2[2] });
    if (!word4) continue;
    words.add(word4);

    const word5 = oneWordFromList({ len: 5, startLetter: word3[2], middleLetter: word4[2], endLetter: word1[2] });
    if (!word5) continue;
    words.add(word5);

    if (words.size === 6) {
      return [...words];
    }
  }

  return [];
};

export const pickEightWords = async(): Promise<string[]> => {
  await new Promise(resolve => setTimeout(resolve, 100)); // Add a short delay
  const words = new Set<string>();
  const maxAttempts = attemptLimit * 2;
  // const startTime = performance.now();

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    words.clear();

    const word0 = oneWordFromList({ len: 7 });
    if (!word0) continue;
    words.add(word0);

    const word1 = oneWordFromList({ len: 7, startLetter: word0[6] });
    if (!word1) continue;
    words.add(word1);

    const word2 = oneWordFromList({ len: 7, endLetter: word1[6] });
    if (!word2) continue;
    words.add(word2);

    const word3 = oneWordFromList({ len: 7, startLetter: word0[0], endLetter: word2[0] });
    if (!word3) continue;
    words.add(word3);

    const word4 = oneWordFromList({ len: 7, startLetter: word0[2], endLetter: word2[2] });
    if (!word4) continue;
    words.add(word4);

    const word5 = oneWordFromList({ len: 7, startLetter: word0[4], endLetter: word2[4] });
    if (!word5) continue;
    words.add(word5);

    const word6 = oneWordFromList({
      len: 7,
      startLetter: word3[2],
      middleLetter: word4[2],
      middleLetter2: word5[2],
      endLetter: word1[2],
    });
    if (!word6) continue;
    words.add(word6);

    const word7 = oneWordFromList({
      len: 7,
      startLetter: word3[4],
      middleLetter: word4[4],
      middleLetter2: word5[4],
      endLetter: word1[4],
    });
    if (!word7) continue;
    words.add(word7);

    if (words.size === 8) {
      // const endTime = performance.now();
      // const executionTime = endTime - startTime;
      // console.log(`pickEightWords executed in ${executionTime} milliseconds.`);
      return [...words];
    }
  }
  // const endTime = performance.now();
  // const executionTime = endTime - startTime;
  // console.log(`pickEightWords FAILED after ${maxAttempts} attempts. Execution time: ${executionTime} milliseconds.`);

  throw new Error(`FAILED TO CHOOSE EIGHT WORDS after ${maxAttempts} attempts.`);
};


export const validatePuzzle = (size: number, puzzle: string[]) => {
  // size must be 5 or 7
  if(size !== 5 && size !== 7) {
    console.error('size must be 5 or 7');
    return false;
  }

  // puzzle array must be of correct length for size
  if(size == 5 && puzzle.length !== 6) {
    console.error('puzzle must be of length 6 for size 5');
    return false;
  }
  if(size == 7 && puzzle.length !== 8) {
    console.error('puzzle must be of length 8 for size 7');
    return false;
  }
  // words must be in wordlist
  if(size == 5) {
    if(puzzle.some(word => !wordlist_5.includes(word))) {
      console.error('puzzle words must be in wordlist_5');
      return false;
    }
  }
  if(size == 7) {
    if(puzzle.some(word => !wordlist_7.includes(word))) {
      console.error('puzzle words must be in wordlist_7');
      return false;
    }
  }
  // words must be unique
  if(new Set(puzzle).size !== puzzle.length) {
    console.error('puzzle words must be unique');
    return false;
  }
  return true;
}