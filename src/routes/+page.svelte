<script lang="ts">
  import { goto } from "$app/navigation";
  import { myBools } from "$lib/utils.svelte";
	import Header from "$lib/components/Header.svelte";
  import MyButton from "$lib/components/MyButton.svelte";

  const handleKeyDown = (e: KeyboardEvent) => {
		console.log('handleKeyDown', e.key);
		if (e.key == '-') {
			myBools.debug = !myBools.debug;
		}
		if (e.key == '5') {
			goto('/5/');
		}
		if (e.key == '7') {
			goto('/7/');
		}
		if (e.key == '?') {
			console.log('???');
			myBools.showPopup = !myBools.showPopup;
		}
	};

</script>


<svelte:window onkeydown={handleKeyDown} />
<main>
  <Header title="Waffleclone" showDef={false} />
  <h2>choose a size</h2>
  <div class="choices">
    <MyButton t="5x5 Puzzle" mystyle="" func={() => goto('/5/')} />
    <MyButton t="7x7 Puzzle" mystyle="" func={() => goto('/7/')} />
  </div>

</main>


