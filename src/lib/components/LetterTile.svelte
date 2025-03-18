<script>
  let { tile, handleTileClick, delayFactor, solved, outOfTurns } = $props();
</script>

<div class="tile-wrap">
  <button
    onclick={() => {
      if (tile.value != tile.correctValue) {
        handleTileClick(tile)
      }
    }}
    disabled={solved || outOfTurns}
    class="tile bounce"
    class:active={tile.swapStatus == 'selected'}
    data-status={tile.status}
    data-swapStatus={tile.swapStatus == 'selected' ? 'woo' : ''}
    style="animation-delay: {delayFactor * 50}ms"
    >
    <!-- <span class="answer">{tile.correctValue}</span> -->
    <div class="inner"></div>
    {tile.value}
  </button>
</div>

<style>
  .tile-wrap {
    container-type: inline-size;
    /* width: 100%; */
    /* height: 100%; */
  }
  .tile {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    /* font-size: inherit; */
    font-size: clamp(1.5rem, 48cqi, 4rem);
    font-weight: 700;
    aspect-ratio: 1;
    text-transform: uppercase;
    border-radius: 0.5rem;
    border: none;
    z-index: 20;
    transition: all 0.2s ease-in;
    min-width: 1rem;
    width: 100%;
    height: 100%;
  }
  .tile .inner {
    font-size: inherit;
    position: absolute;
    z-index: -1;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: var(--radius);
    border: 4px solid hsla(0, 0%, 80%, 0);
    transition: all 0.2s ease-out;
  }
  .tile.active {
    transition: all 0.1s ease-out;
    transform: scale(1.2);
    outline: 0.5rem solid hsla(200, 60%, 60%, 0.5);
    outline-offset: -0.5rem;
    z-index: 1000;
  }

  .tile.active .inner {
    background-color: hsla(36, 24%, 100%, 0.25);
  }

  .tile[data-status='c'] {
    color: #efedea;
    background-color: var(--ccolor);
  }
  .tile[data-status='i'] {
    color: #efedea;
    background-color: var(--icolor);
  }
  .tile[data-status='x'] {
    color: hsla(36, 14%, 93%, 0.6);
    background-color: var(--xcolor);
  }
  .tile[data-swapStatus='woo'][data-status='c'] {
    animation-delay: 0s !important;
    animation: woo2 0.4s ease-in-out 0s 2 reverse both running;
  }


  @keyframes woo2 {
  0% {
    color: #efedea;
  }
  5% {
    color: var(--wavecolor1);
  }
  50% {
    color: var(--wavecolor2);
  }
  100% {
    color: var(--wavecolor3);
  }
}
</style>
