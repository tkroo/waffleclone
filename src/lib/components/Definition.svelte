<script lang="ts">
  import { fade } from "svelte/transition";
	import Spinner from "./Spinner.svelte";
  let { word } = $props();
  let tdelay = 300;

  const getDefinition = async () => {
    // const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const response = await fetch(`/api/definition/${word}`);
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(`${data.message}`);
    }
  }

</script>

<div class="definition-wrap">
  <span class="word" class:loaded={getDefinition}>{word}</span>
  {#await getDefinition()}
  <ul><li><Spinner message={"fetching definition..."}/></li></ul>
  {:then data}
  <div class="fadein" in:fade={{ delay: tdelay+1, duration: tdelay }}>
    <ul>
      {#each data[0].meanings as definition}
      <li>
        {#if definition.partOfSpeech}<i>{definition.partOfSpeech}</i>{/if}
        <ul>

          {#each definition.definitions.slice(0, 4) as def}
          <li>{def.definition}</li>
          {/each}
        </ul>
      </li>
      {/each}
    </ul>
    <div class="sources">
      links:
      {#each data[0].sourceUrls as url}
      <a href={url} target="_blank">{decodeURI(url.split('/').pop())}</a>
      {/each}
      <a href={`https://www.merriam-webster.com/dictionary/${word}`} target="_blank">merriam-webster</a>
    </div>

  </div>

  {:catch error}
    <p>Can't find a definition for "{word}" <small><a href={`https://www.merriam-webster.com/dictionary/${word}`} target="_blank">try merriam-webster</a></small></p>
  {/await}
</div>


<style>
  .definition-wrap {
    transition: all 0.3s ease-in-out;
    transition-behavior: allow-discrete;
    color: var(--bg);
  }
  ul {
    /* margin: 0 0 0.5rem 0; */
    margin: 0;
    font-size: 0.85rem;
    line-height: 1.3;
    padding-left: 1rem;
    list-style-type: none;
  }
  li {
    margin: 0;
  }
  ul>li>ul {
    margin: 0 0 0.5rem 0;
  }
  ul>li>ul>li {
    list-style-type: square;
    padding-left: 0.5rem;
  }
  .word {
    font-size: 1.2rem;
    font-weight: bold;
    color: var(--icolor);
    transition: color 0.3s ease-in-out;
  }
  .word.loaded {
    color: var(--ccolor);
  }
  .sources {

    font-size: 0.75rem;
    padding-left: 1rem;
    width: 100%;
    display: inline-flex;
    justify-content: flex-end;
    align-items: center;
    gap: 0.5rem;
    margin: 0 0 0.5rem 0;
  }
  .sources a {
    color: var(--bg);
    text-underline-position: under;
  }
  .sources a:hover {
    color: var(--ccolor);
  }
</style>