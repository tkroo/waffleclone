<script>
  let { title, games } = $props();
  function countWordOccurrences(puzzles) {
    const wordCounts = {}; // Initialize an empty object to store word counts
    for (const puzzle of puzzles) { // Iterate through each puzzle object in the puzzles array
      for (const word of puzzle.words) { // Iterate through each word in the 'words' array of the current puzzle
        if (wordCounts[word]) { // Check if the word is already a key in the wordCounts object
          wordCounts[word]++; // If it exists, increment the count
        } else {
          wordCounts[word] = 1; // If it doesn't exist, initialize the count to 1
        }
      }
    }

    return wordCounts; // Return the object containing word counts
  }

  function sortWordCountsDescending(wordCounts) {
    // 1. Convert the wordCounts object to an array of [word, count] pairs
    const entries = Object.entries(wordCounts);

    // 2. Sort the array in descending order based on the count (the second element in each pair)
    entries.sort(([, countA], [, countB]) => countB - countA);

    // 3. (Optional) Convert the sorted array back to an object (if you need an object as output)
    const sortedWordCounts = {};
    for (const [word, count] of entries) {
      sortedWordCounts[word] = count;
    }

    return sortedWordCounts; // Or return 'entries' if you just need the sorted array
  }

  let sortedWordCounts = $derived.by(() => (sortWordCountsDescending(countWordOccurrences(data.games))));
  let howMany = $state(10);
</script>


<h2>{title}</h2>
  <p>Number of games: {games.length}</p>
  <p>Number of words: {games.reduce((acc, game) => acc + game.words.length, 0)}</p>

  
  <div class="control"><label for="howmany{title}">Top <input type="number" id="howmany{title}" bind:value={howMany} size="4"> words:</label></div>


  <div class="structure">
    {#each Object.entries(sortWordCountsDescending(countWordOccurrences(games))).slice(0, howMany) as [word, count]}
    <strong>{word}</strong> <span>was in {count} game{count>1 ? 's' : ''}</span> <span>( {((count / games.length) * 100).toFixed(1)}% of total games )</span>
    {/each}
  </div>


<style>
  .structure {
    margin: 1rem auto 3rem auto;
    display: grid;
    grid-template-columns: repeat(3, fit-content(35%));
    column-gap: 0.5em;
  }
  h2 {
    margin: 1rem 0 0 0;
    font-size: 1.5rem;
  }
  p {
    margin: 0 0 0.5rem 0;
  }
  .control {
    margin-top: 2rem;
  }
</style>