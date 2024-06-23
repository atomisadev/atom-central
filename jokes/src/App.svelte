<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { onMount } from "svelte";

  let joke = "";

  async function fetchJoke() {
    const response = await fetch(
      "https://official-joke-api.appspot.com/random_joke"
    );
    const data = await response.json();
    joke = `${data.setup} ${data.punchline}`;
  }

  onMount(() => {
    fetchJoke();
  });
</script>

<div class="container mx-auto px-4 py-8">
  <h1 class="text-4xl font-bold mb-4 text-center">Random Joke Generator</h1>
  <p class="text-xl mb-8 text-center">{joke}</p>
  <div class="flex justify-center">
    <Button
      on:click={fetchJoke}
      class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >Generate New Joke</Button
    >
  </div>
</div>
