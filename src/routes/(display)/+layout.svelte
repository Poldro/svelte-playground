<script>
	import Header from './Header.svelte';
	import '../styles.css';
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<footer>
		<p class="mt-2 text-xl text-center font-bold underline">
			visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit
		</p>
	</footer>
</div>
