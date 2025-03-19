<script>
  import LinkToOriginal from "$lib/components/LinkToOriginal.svelte";
  import { myBools, mySettings } from "$lib/utils.svelte";
  import { fade } from "svelte/transition";
</script>

{#if myBools.showPopup}
<div class="popup" transition:fade={{duration: 100}}>
  <div class="content">
    <h2>How to Play</h2>
    <p>
      Unscramble all the words by swapping letters.
      <br>
      Click a letter to select, then click another to swap.
    </p>
    <h3>Colors are clues</h3>
    <ul class="items">
      <li class="col2"><span class="tile-little green">W</span>Letter is in the correct position.</li>
      <li class="col2"><span class="tile-little yellow">W</span>Letter is in the row or column, but wrong position.</li>
      <li class="col2"><span class="tile-little gray">W</span>Letter is not in the row or column.</li>
    </ul>
    <h2>Preferences</h2>
    <label for="highContrast">
      <input type="checkbox" id="highContrast" bind:checked={mySettings.current.myContrast}>
      High contrast colors
    </label>
    <label for="definitions">
      <input type="checkbox" id="definitions" bind:checked={mySettings.current.fetchDefinitions}>
      Show word definitions
    </label>
    <label for="startingSwaps5">
      <input type="number" name="startingSwaps5" id="startingSwaps5" min=1 bind:value={mySettings.current.startingSwaps5} size="2"> Starting swaps for 5x5 <small>(default: 16)</small>
    </label>
    <label for="startingSwaps7">
      <input type="number" name="startingSwaps7" id="startingSwaps7" min=1 bind:value={mySettings.current.startingSwaps7} size="2"> Starting swaps for 7x7 <small>(default: 32)</small>
    </label>
    <h2>Keyboard</h2>
    <ul class="items smaller">
      <li class="col2"><span class="tile-little key">5</span>New 5x5</li>
      <li class="col2"><span class="tile-little key">7</span>New 7x7</li>
      <li class="col2"><span class="tile-little key">s</span>Solve</li>
      <li class="col2"><span class="tile-little key">?</span>Toggle info</li>
      <li>cheats</li>
      <li class="col2"><span class="tile-little key">-</span>Toggle answer</li>
      <li class="col2"><span class="tile-little key">]</span>Increase swaps</li>
      <li class="col2"><span class="tile-little key">[</span>Decrease swaps</li>
      <li class="col2"><span class="tile-little key">=</span>Shuffle</li>
    </ul>
    <!-- 
    <label for="easier">
      <input type="checkbox" id="easier" bind:checked={myBools.easierMode}>
      Easier mode <small>(don't loose a swap if placement is correct)</small>
    </label>
    <label for="helper">
      <input type="checkbox" id="helper" bind:checked={myBools.helperPositions}>
      Some positions are not shuffled.
    </label>
    <label class="todo" for="helperCount">
      <span class="helperCount">{myBools.helperCount}</span>non-shuffled tiles<br>
      <span class="range">
        harder <input disabled type="range" id="helperCount" min=0 max=8 bind:value={myBools.helperCount}> easier
      </span>
    </label> -->
    <h2>Info</h2>
    <p>There are no strict rules for which words will appear in the puzzles. There are some proper nouns, some plural words, and some informal slang. Crossword rules.</p>
    <LinkToOriginal />
    <!-- <h2>Stats</h2>
    <a href="/stats">stats</a> -->
  </div>
</div>
{/if}

<style>
  .popup {
    position: absolute;
    top: 2.5rem;
    left: 0rem;
    right: 0rem;
    bottom: 0rem;
    z-index: 9999;
    margin: 0 auto;
    padding: 0;
    max-width: var(--maxwide);
    display: flex;
    flex-direction: column;
  }

  label {
    margin-bottom: 1rem;
  }
  
  .content {
    --bline: light-dark(#666, #444);
    background-color: var(--fg);
    color: var(--bg);
    font-size: 1.2rem;
    text-align: left;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 2rem;
    flex-grow: 1;
    margin: 0 -1rem;
    
  }
   .items {
    margin: 0;
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    line-height: 1.5;
   }

   .smaller {
    gap: 0.5rem;
    font-size: 0.75rem;
    line-height: 1;
   }

   .col2 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    gap: 1rem;
   }

   h3 {
    margin: 0 0 1rem 0;
   }

   h2 {
    margin: 2rem 0 1rem -1rem;
    border-bottom: 1px solid var(--bline);
    width: 100%;
   }

   h2:first-child {
    margin-top: 0;
   }

  .tile-little {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    padding: 1px;
    width: 2.5rem;
    height: 2.5rem;
    aspect-ratio: 1/1;
    border-radius: var(--radius);
    color: #fff;
  }
  .tile-little.key {
    border: 1px solid var(--bg);
    width: 1.5rem;
    height: 1.5rem;
    font-size: 0.75rem;
    font-weight: normal;
  }
  .green {
    background-color: var(--ccolor);
  }
  .yellow {
    background-color: var(--icolor);
  }
  .gray {
    background-color: var(--xcolor);
  }
</style>