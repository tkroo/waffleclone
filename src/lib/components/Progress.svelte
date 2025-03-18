<script>
  // import PieChart2 from "./PieChart2.svelte";
  import { myBools } from "$lib/utils.svelte";
  let props = $props();
</script>
<div class="prog">
  <progress value={props.currentTurn} max={props.startingSwaps}></progress>
  <button class="swapsnotice" onclick={() => myBools.debug = !myBools.debug}>{props.currentTurn} swaps remain</button>
  <!-- <PieChart2 {props.board} height={'1'} /> -->
</div>

<style>
  .prog {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.25rem;
    height: 0.5rem;
    gap: 0.25rem;
  }

  .swapsnotice {
    /* font-size: 0.85rem; */
    font-size: 13px;
    padding: 0;
  }

  progress[value],
  progress[value]::-webkit-progress-bar {
    --bg: hsl(157, 90%, 32%);
    --fg: hsl(43, 50%, 53%);
    appearance: none;
    border: none;
    /*width: 60%;*/
    flex-grow: 1;
    
    height: .5rem;

    background: var(--xcolor);
    border-radius: var(--radius);
      
    position: relative;
    margin: 0 0;
  }

  progress::-moz-progress-bar {
    background: var(--ccolor);
    border-radius: var(--radius);
  }
  progress::-webkit-progress-value {
    background: var(--ccolor);
    border-radius: var(--radius);
  }

  @media screen and (max-width: 500px) {
    /*
    .prog {
      margin-bottom: 0.5rem;
      flex-wrap: wrap;
      justify-content: center;
    }
    .swapsnotice {
      font-size: 0.75rem;
      text-align: center;
    }
    */
    progress[value],
    progress[value]::-webkit-progress-bar {
      width: 60%;
    }
  }
</style>