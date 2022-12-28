<script lang='ts'>
    import type { PageData } from './$types';
  
    export let data: PageData;
  
    let countries = data.defaultCountry;
    $: if (countries) {
      countries = data.defaultCountry;
    }

    $: console.log(countries)
  </script>
  

{#if !countries}
<p>An error occurred while loading the news</p>
{:else if data.loading}
<p>Loading articles...</p>
{:else}
<ul>
    {#each countries as article}
        <li>
            <a href={article}>{article}</a>
        </li>
    {/each}
</ul>
{/if}