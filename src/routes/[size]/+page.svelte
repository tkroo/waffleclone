<script>
	import { goto } from '$app/navigation';
  import { encodeText } from '$lib/rot13.js';

  let { data } = $props();
  let { size, puzzle } = data;
  if (puzzle !== undefined) {
    goto(`/${size}/${encodeText(puzzle)}`);
  }
</script>

<svelte:head>
  <title>Game {size}</title>
</svelte:head>

<!-- <h1>size: {size}</h1>
<h1>puzzle: {puzzle}</h1> -->