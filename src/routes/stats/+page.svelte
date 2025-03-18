<script lang="ts">
  import { wordlist_5, exclusions as ex5 } from "$lib/wordlist_5.js";
  import { wordlist_7, exclusions as ex7 } from "$lib/wordlist_7.js";

  import GameStats from "$lib/components/GameStats.svelte";
  import { COLLECTION_NAME } from "$lib/utils.svelte";
  
  let { data } = $props();
  
  let gdata = $state(data.games);

  async function deleteData(id) {
    gdata = gdata.filter(g => g.id != id);
    const response = await fetch('/api/firestore/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "collectionName":COLLECTION_NAME, id }),
    });
    if (response.ok) {
      console.log('Data deleted');
    } else {
      console.error('Error');
    }
  }

  let duplicateEntries = $derived.by(() => gdata.filter((x, i) => gdata.findIndex(y => y.rot13string == x.rot13string) != i));
  let games_5_letters = $derived.by(() => gdata.filter(game => game.words.length == 6)
    .filter(game => game.words.filter(word => ex5.includes(word)).length == 0));
  let games_7_letters = $derived.by(() => gdata.filter(game => game.words.length == 8)
    .filter(game => game.words.filter(word => ex7.includes(word)).length == 0));

  let testword = $state('');
  
  const inWordList = $derived.by((): boolean => {
    return wordlist_5.includes(testword) || wordlist_7.includes(testword);
  })
</script>

<div class="wrapper">
  <h1><a class="knockout" href="/">waffleclone</a></h1>
  <section>
    <h1>Word checker</h1>
    <label for="testword"><input type="text" id="testword" bind:value={testword}> is <span class:green={testword.length == 7 || testword.length == 5}>{testword.length} letters</span>
      {#if testword.length == 5 || testword.length == 7}
      and <strong>{testword}</strong> <span class="{inWordList ? 'green' : 'red'}">{inWordList ? 'IS' : 'IS NOT'}</span> in the wordlist.
      {/if}
    </label>
    <p>
      <a href={`https://www.merriam-webster.com/dictionary/${testword}`} target="merriamwebster">try merriam-webster</a>
    </p>
  </section>
  
  <section>
    <h1>Stats</h1>
    <div class="row">
      <div class="col">
        <GameStats title="5x5 games" games={games_5_letters} />
        <div class="excluded">
          <p>Excluded words:</p>
          <ul>
            {#each ex5 as word}
              <li>{word}</li>
            {/each}
          </ul>
        </div>
      </div>
  
      <div class="col">
        <GameStats title="7x7 games" games={games_7_letters} />
        <div class="excluded">
          <p>Excluded words:</p>
          <ul>
            {#each ex7 as word}
              <li>{word}</li>
            {/each}
          </ul>
        </div>
      </div>
    </div>
  </section>
  <hr>
<p>duplicate entries: {duplicateEntries.length}</p>
{#if duplicateEntries.length}
  {#each duplicateEntries as game}
    <p>{game.id}
      <button onclick={() => deleteData(game.id)}>delete</button>
    </p>
  {/each}
{/if}
</div>




<style>
  .wrapper {
    margin: 2rem auto;
    max-width: 1200px;
  }
  h1 {
    margin: 2rem 0 0 0;
    font-size: 2rem;
  }
  .row {
    display: flex;
    justify-content: space-between;
  }
  .col {
    flex: 1;
  }
  .green {
    color: var(--ccolor);
  }
  .red {
    color: #ea0029;
  }

  button {
    padding: 0.5rem 1rem;
    background-color: var(--ccolor);
    color: var(--bg);
    border-radius: 0.5rem;
  }

  .knockout {
    text-decoration: none;
    margin: 0;
    padding: 0;
    font-size: 2rem;
    font-weight: bold;
    /* text-transform: uppercase; */
    /* color: var(--ccolor); */
    background: linear-gradient(0deg, var(--ccolor), var(--icolor));
    background: -webkit-linear-gradient(0deg, var(--ccolor), var(--icolor));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-fill-color: transparent;
  }
</style>