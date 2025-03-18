function rot13(str: string) {
  return str.replace(/[a-zA-Z]/g, (char) => {
    const base = char >= 'a' ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
    const offset = char.charCodeAt(0) - base;
    const rotatedOffset = (offset + 13) % 26;
    return String.fromCharCode(base + rotatedOffset);
  });
}

/**
 * Compresses a list of words into a URL-safe parameter string using ROT13 for obfuscation.
 *
 * @param {string[]} wordList - An array of strings (words to obfuscate).
 * @returns {string} The URL string (e.g., "obfuscatedValue").
 */
function encodeText(wordList: string[]) {
  if (!Array.isArray(wordList)) {
    throw new Error("wordList must be an array");
  }
  const textString = wordList.join('');
  const rot13String = rot13(textString);
  return rot13String;
}

function splitStringIntoChunks(str: string, chunkLength: number) {
  if (chunkLength <= 0) {
    return [];
  }
  return str.match(new RegExp(`.{1,${chunkLength}}`, 'g')) || [];
}


/**
 * Decompresses (de-obfuscates) a URL parameter value back into a list of words using ROT13.
 *
 * @param {string} urlParameterValue - The value of the URL parameter (the ROT13 obfuscated string).
 * @returns {string[]} An array of strings (the original list of words).
 */
function decodeText(urlParameterValue: string) {
  if (typeof urlParameterValue !== 'string') {
    throw new Error("urlParameterValue must be a string");
  }

  const obfuscatedString = urlParameterValue.includes('=') ? urlParameterValue.split('=')[1] : urlParameterValue;
  const deObfuscatedString = rot13(obfuscatedString);
  let chunks = splitStringIntoChunks(deObfuscatedString.slice(1), deObfuscatedString[0]);
  const wordList = chunks;
  return wordList;
}


export { encodeText, decodeText, splitStringIntoChunks };


// function rot47(string) {
//   let result = '';
//   for (let i = 0; i < string.length; i++) {
//     let charCode = string.charCodeAt(i);
//     if (charCode >= 33 && charCode <= 126) {
//       result += String.fromCharCode(33 + ((charCode + 14) % 94));
//     } else {
//       result += string[i];
//     }
//   }
//   return result;
// }

// function urlSafeRot47Encode(string) {
//     return encodeURIComponent(rot47(string));
// }

// function urlSafeRot47Decode(string) {
//     return rot47(decodeURIComponent(string));
// }