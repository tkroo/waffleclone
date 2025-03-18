<script>
  import { goto } from "$app/navigation";
	import Header from "$lib/components/Header.svelte";
  import MyButton from "$lib/components/MyButton.svelte";

</script>



<main>
  <Header title="Waffleclone" showDef={false} />
  <h2>choose a size</h2>
  <div class="choices">
    <MyButton t="5x5 Puzzle" mystyle="" func={() => goto('/5/')} />
    <MyButton t="7x7 Puzzle" mystyle="" func={() => goto('/7/')} />
  </div>

</main>


