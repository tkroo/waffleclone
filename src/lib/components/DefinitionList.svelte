<script>
  import Definition from "$lib/components/Definition.svelte";
  // import Definition from "$lib/components/Definition-wiktionary.svelte";
  import { myArrays } from "$lib/utils.svelte";
	import { fade } from "svelte/transition";
</script>

{#if myArrays.completedWords.length}
  <div class="definition-list" transition:fade>
    {#each [...myArrays.completedWords].reverse() as word (word)}
    <Definition {word} />
    {/each}

    <hr>
    <div class="info">definitions fetched from <a href="https://en.wiktionary.org/">wiktionary</a> using <a href="https://dictionaryapi.dev/">dictionaryapi.dev</a></div>
  </div>
{/if}

<style>
  .definition-list {
    margin: 1rem;
    transition: all 0.3s ease-in-out;
    transition-behavior: allow-discrete;
  }
  .info {
    width: 100%;
    font-size: 0.9rem;
    text-align: center;
  }
  a {
    text-underline-position: under;
  }
</style>