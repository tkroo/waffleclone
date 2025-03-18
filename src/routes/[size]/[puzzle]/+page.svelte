<script lang="ts">
	import { onMount } from 'svelte';
	import { myBools } from '$lib/utils.svelte';
  import { pickEightWords, pickSixWords, validatePuzzle } from '$lib/pickWords_faster';
  import { encodeText, decodeText } from '$lib/rot13';
  import { type Game, type Tile, GameFactory } from '$lib/game2.svelte';
	import { myArrays, mySettings } from '$lib/utils.svelte';
  import DefinitionList from '$lib/components/DefinitionList.svelte';
	import LetterTile from '$lib/components/LetterTile.svelte';
	import Progress from '$lib/components/Progress.svelte';
	import WordsProgress from '$lib/components/WordsProgress.svelte';
	import Header from '$lib/components/Header2.svelte';
	import Spinner from "$lib/components/Spinner.svelte";
	import { fade } from "svelte/transition";
	import { gameMessages } from "$lib/game_messages.js";
	import { pushState } from '$app/navigation';
	import { writeGameToFireStore } from '$lib/writeToFirestore.js';

	// let { data } = $props();
	

  // let puzzle = $derived.by(() => decodeText(size+''+puzzle));

  let game: Game | undefined = $state();
  let working = $state(false);
  let generationError = $state(false);
  let gameReady = $state(false);
  let currentTurn = $state<number | undefined>(0);
  let debug = $state(false);                                            

	const pickWords = async(size: number) => {
    if (size === 5) {
      return await pickSixWords();
    } else {
      return await pickEightWords();
    }
  };

	const newGame = async (size: number) => {
		const words = await pickWords(size);
		initialize(size, words);
		// pushState(`/${size}/${encodeText(words)}`, {});
		pushState(`/${size}/${encodeText(words)}`, {});
	};


  const initialize = async (size: number, puzzle: string[] | undefined) => {
    working = true;
    generationError = false;

    try {
      game = await GameFactory(size, puzzle);
      currentTurn = game.startingSwaps;
      writeGameToFireStore(game.words);
      working = false;
      generationError = false;
      myArrays.completedWords = [];
      gameReady = true;
    } catch (error) {
      console.error('Error initializing game:', error);
      generationError = true;
    }
  }

  const solved = $derived.by(() => {
		if (!gameReady || !game) return false;
		return game.grid.flat().every((tile) => tile.value == tile.correctValue);
	});

	const outOfTurns = $derived.by((): boolean => {
		if (!gameReady) return false;
		return (
			currentTurn !== null && currentTurn !== undefined && (currentTurn as number) <= 0 && !solved
		);
	});

  const handleTileClick = (tile: Tile) => {
		game?.swapTile(tile);
		currentTurn = game?.getCurrentTurn();
		game?.updateTileStatuses(game.grid);
		myArrays.completedWords = game?.checkRowsAndColumns(game.grid) ?? [];
	};

  const solvePuzzle = () => {
		game?.solveGrid(game.grid);
		working = false;
		generationError = false;
		myArrays.completedWords = game?.checkRowsAndColumns(game.grid) ?? [];
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		console.log('handleKeyDown', e.key);
		if (e.key == '-') {
			myBools.debug = !myBools.debug;
		}
		if (e.key == '=') {
			shuffle();
		}
		if (e.key == '5') {
			newGame(5);
		}
		if (e.key == '7') {
			newGame(7);
		}
		if (e.key == 's') {
			solvePuzzle();
		}
		if (e.key == ']') {
			game?.increaseTurns(1);
			currentTurn = game?.getCurrentTurn();
		}
		if (e.key == '[') {
			game?.decreaseTurns(1);
			currentTurn = game?.getCurrentTurn();
		}
	};

	const shuffle = () => {
		game?.resetTurns();
		currentTurn = game?.startingSwaps;
		myArrays.completedWords = [];
		game.grid = game?.shuffle2DArray(game.grid);
	};

	const startUp = async () => {
		let parts = window.location.pathname.split('/');
		let size = parseInt(parts[1]);
		let puzzle = decodeText(parts[1]+''+parts[2]);
		gameReady = false;
		if(validatePuzzle(size, puzzle)) {
			initialize(size, puzzle);
		} else {
			console.log('invalid puzzle');
			// goto(`/puzzle`);
		}
	};

	onMount(() => {
		startUp()
	});

</script>


{#snippet myButton(text: string, func: () => void)}
	<button class="myButton" onclick={func}>{text}</button>
{/snippet}

<svelte:head>
	<title>PUZZLE</title>
</svelte:head>
<!-- <svelte:window onkeydown={handleKeyDown} onpopstate={() => initialize(page.data.p[0], decodeText(page.data.p))} /> -->
<svelte:window onkeydown={handleKeyDown} onpopstate={() => startUp()} />
<main>
  <Header title="Waffleclone" />
  {#if gameReady && game}
		<Progress {currentTurn} startingSwaps={game?.startingSwaps} board={game?.grid} />
		<WordsProgress words = {game.words} />
		<div class="board" class:solved class:failed={outOfTurns} style="--cols: {game.grid.length}">
			{#each game.grid as row, rowIndex}
				<div class="row" data-row={rowIndex}>
					{#each row as tile, colIndex}
						{#if !tile.hidden}
							<LetterTile
								{solved}
								{outOfTurns}
								{handleTileClick}
								{tile}
								delayFactor={colIndex + rowIndex}
							/>
						{:else}
							<div class="tile blank"></div>
						{/if}
					{/each}
				</div>
			{/each}
		</div>
	{/if}

	{#if solved || outOfTurns}
		<div transition:fade>
			{#if outOfTurns}
				<!-- <h2>out of turns!</h2> -->
				<div class="win-lose">
				{gameMessages.lost[Math.floor(Math.random() * gameMessages.lost.length)]}
				</div>
				<!-- <button class="myButton" onclick={shuffle}>Retry?</button> -->
				{@render myButton('Retry?', () => shuffle())}
				{:else if solved}
				<!-- <h2>solved!</h2> -->
				 <div class="win-lose">
					 {currentTurn < 2 ? gameMessages.close[Math.floor(Math.random() * gameMessages.close.length)] : gameMessages.won[Math.floor(Math.random() * gameMessages.won.length)]}
					</div>
			{/if}

			<div class="controls">
				<!-- <button class="myButton" onclick={() => initialize(5)}>new 5x5</button> -->
				{@render myButton('new 5x5', ()=> newGame(5))}
				<!-- <button class="myButton" onclick={() => initialize(7)}>new 7x7</button> -->
				{@render myButton('new 7x7', ()=> newGame(7))}
			</div>
		</div>
	{/if}
	{#if working}
		<div transition:fade={{duration: 1000}}>
			{#if generationError}
				<div class="errormessage">Failed to generate puzzle. Try again.</div>
			{:else}
				<Spinner message={'generating...'} />
			{/if}
		</div>
	{/if}
  
  {#if mySettings.current.fetchDefinitions}<DefinitionList />{/if}
  
  {#if myBools.debug && gameReady && game}
    {game.words}
  {/if}


</main>



<style>
	.board {
		--gap: 0.5rem;
		position: relative;
		display: flex;
		flex-wrap: wrap;
		gap: var(--gap);
		transition: all 0.3s ease-in-out;
		container-type: inline-size;
		width: 100%;
	}

	.board.failed {
		opacity: 0.5;
	}

	.row {
		display: grid;
		gap: var(--gap);
		grid-template-columns: repeat(var(--cols), 1fr);
		width: 100%;
	}

	.tile.blank {
		visibility: hidden;
	}

	.controls {
		display: flex;
		gap: 1rem;
		justify-content: center;
		margin: 1rem 0;
		align-items: center;
	}

	.myButton {
		width: 100%;
		border-radius: var(--radius);
		color: var(--ccolor);
		background-color: #fff;
		padding: 0.5rem 1rem;
		text-decoration: none;
		font-size: 1.25rem;
		font-weight: bold;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto;
	}

	.myButton:hover {
		color: #fff;
		background-color: var(--ccolor);
	}

	.myButton:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.myButton:disabled:hover {
		opacity: 0.5;
		cursor: not-allowed;
		color: var(--ccolor);
		background-color: #fff;
	}

	.errormessage {
		margin: 1rem auto;
		text-align: center;
		font-weight: bold;
		color: hsl(0, 87%, 55%);
	}

	.win-lose {
    margin: 1rem auto;
    font-size: 1.6rem;
    text-align: center;
		font-weight: bold;
  }
</style>