<script>
  import { mySettings } from "$lib/utils.svelte";
  let { children } = $props();
</script>

<svelte:head>
  <title>Waffleclone</title>
  <meta name="description" content="waffle game clone">
</svelte:head>

<div class:cb={mySettings.current.myContrast}>
  {@render children()}
</div>