<script>
  import { myArrays } from "$lib/utils.svelte";
  let { words } = $props();
</script>


<div class="wordprogress">
  {#each words as wordblock, i}
    <div class="wordblock" data-found={i <= myArrays.completedWords.length-1}></div>
  {/each}
    <small>words completed</small>
</div>

<style>
  .wordprogress {
		display: flex;
		gap: 0.5rem;
		justify-content: space-between;
		margin: 1rem auto;
		align-items: center;
		height: 0.5rem;
	}
	.wordprogress small {
		flex: 0 0 auto;
		font-size: 13px;
	}
	.wordblock {
		height: .5rem;
    background: var(--xcolor);
    border-radius: var(--radius);
		/* border: 1px dashed var(--ccolor); */
		width: 100%;
	}
	.wordblock[data-found="true"] {
		background: var(--ccolor);
	}
</style>