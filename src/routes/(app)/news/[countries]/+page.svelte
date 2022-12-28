<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$:console.log(data)
</script>

{#if !data.news}
	<p>An error occurred while loading the news</p>
{:else if data.loading}
	<p>Loading articles...</p>
{:else}
	<ul>
		{#each data.news as article}
			<li>
				<a href={article.url}>{article.title}</a>
				<p>{article.description}</p>
			</li>
		{/each}
	</ul>
{/if}
