<script lang="ts">
	import type { PageData } from './$types';
	import Button from '$lib/components/Button.svelte'

	export let data: PageData;

	let articles = data.news || [];
	let index = 0;
	let displayedArticles = articles.slice(index, index + 6);
	let showLoadMoreButton = articles.length > displayedArticles.length;

	function loadMore() {
		index += 6;
		displayedArticles = articles.slice(index, index + 6);
		showLoadMoreButton = articles.length > displayedArticles.length;
	}

	function loadPrevious() {
		index -= 6;
		displayedArticles = articles.slice(index, index + 6);
		showLoadMoreButton = articles.length > displayedArticles.length;
	}
</script>

<svelte:head>
	<title>News</title>
	<meta name="description" content="An updated news media collection, translated." />
</svelte:head>

{#if !data.news}
	<p>An error occurred while loading the news</p>
{:else}
	<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 p-2">
		{#each displayedArticles as article}
			<div class="border rounded-md shadow-sm mb-4 p-4 hover:-translate-y-1 ease-in-out duration-200">
				<h2
					class="text-xl lg:text-2xl font-bold text-red-900 hover:text-red-800 leading-tight mb-2"
				>
					<a href={article.url} target="_blank" rel="noreferrer">{article.title}</a>
				</h2>
				<p class="text-gray-800 mb-4">{article.description}</p>
			</div>
		{/each}
	</div>
	<div class="flex justify-between mt-4">
		{#if index > 0}
		<Button on:click={loadPrevious} text={"Indietro"}/>
		{:else}
			<div />
		{/if}
		{#if showLoadMoreButton}
		<Button on:click={loadMore} text={"Avanti"}/>
		{/if}
	</div>
{/if}
