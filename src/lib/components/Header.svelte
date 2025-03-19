<script>
	import Info from "./Info.svelte";
  import { myBools, mySettings } from "$lib/utils.svelte";
  let { title, showDef } = $props();
</script>

<header>
  <h1><a href="/">{title}</a></h1>
  <div class="controls">
    {#if showDef}
    <button onclick={() => mySettings.current.fetchDefinitions = !mySettings.current.fetchDefinitions} class="abs" class:faded={!mySettings.current.fetchDefinitions}>
      <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="1.5rem" height="1.5rem" viewBox="0 0 459.319 459.319"><title>show definitions</title><path d="M141.288 189.821h-23.685V145.28h23.528v-23.69h21.016v23.374h23.681v44.707h-23.681v.151h-20.859zM60.801 398.87c.012 1.1.03 1.921.042 2.459.006.331-.053.638-.071.963.739 18.224 15.755 32.817 34.146 32.817h303.76v-33.461c0-6.68 5.421-12.105 12.105-12.105 6.679 0 12.105 5.426 12.105 12.105v45.565c0 6.686-5.427 12.105-12.105 12.105H93.091c-.629 0-1.235-.089-1.847-.183-30.505-1.91-54.757-27.261-54.757-58.245 0-.71.085-1.396.109-2.099-.375-35.943 0-309.36.042-339.109-.047-.423-.127-.827-.127-1.259C36.511 26.205 62.719 0 94.938 0h315.833c6.685 0 12.105 5.423 12.105 12.105v342.139c0 6.679-5.421 12.104-12.105 12.104-.071 0-.13-.023-.201-.023-.887.213-1.82.354-2.772.354H94.918c-18.182-.005-33.059 14.269-34.117 32.191zm217.546-277.28h94.425v20.862h-23.685v23.69h-23.525v23.685h-23.69v23.533h-23.536v49.882h120.792v-26.209h-94.584v-20.859h23.69V192.49h23.525V168.8h23.689v-23.52h23.679V95.237h-120.78v26.353zm-53.398 70.9h56.265v-26.353h-56.265v26.353zM91.41 263.229h26.2v-47.056h23.679v-.15h44.54v47.219h26.354v-120.79h-23.688v-23.841H164.81V95.237h-26.202v23.684h-23.685v23.69H91.389v120.618h.021z"/></svg>
    </button>
    {/if}
    <button onclick={() => myBools.showPopup = !myBools.showPopup} class="abs help">
      {#if myBools.showPopup}
      <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="none" viewBox="0 0 24 24"><title>back</title><path fill="#000" fill-rule="evenodd" d="M3 12a9 9 0 1 1 18 0 9 9 0 0 1-18 0Zm9-11C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1Zm.707 6.707a1 1 0 0 0-1.414-1.414l-5 5a1 1 0 0 0 0 1.414l5 5a1 1 0 0 0 1.414-1.414L9.414 13H17a1 1 0 1 0 0-2H9.414l3.293-3.293Z" clip-rule="evenodd"/></svg>
      {:else}
      <svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><title>help</title><path fill-rule="evenodd" clip-rule="evenodd" d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12Zm12.25 4.75a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Zm-3.115-7.786C10.4 8.46 11.083 8 12 8c1.283 0 2 .835 2 1.5s-.717 1.5-2 1.5a1 1 0 0 0-1 1v1a1 1 0 1 0 2 0v-.113c1.632-.373 3-1.64 3-3.387C16 7.404 14.03 6 12 6c-1.543 0-2.975.775-3.636 2.036a1 1 0 1 0 1.771.928Z" fill="#f6f5f4"/></svg>
      {/if}
    </button>
  </div>
</header>
<Info />

<style>
  header {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    line-height: 0;
    margin: 1rem auto;
  }
  h1 {
    margin: 0;
    padding: 0;
  }
  h1 a {
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
  .abs svg path {
    stroke: none;
    fill: var(--bg);
  }
  .faded {
    opacity: 0.5;
  }
</style>