<script>

	import { OpenAIApi } from "openai";
  /** @type {import('./$types').ActionData} */
  export let form;
</script>




<svelte:head>
	<title>OpenAI</title>
	<meta name="description" content="OpenAI API" />
</svelte:head>

{#if form?.success }
  <!-- this message is ephemeral; it exists because the page was rendered in
       response to a form submission. it will vanish if the user reloads -->
  <p>{form.response.choices.map(i => i.text)}</p>
{/if}
<section>
	<h1>
		<form method="POST">
			<label>
				add a todo:
				<input name="description" />
			</label>
		</form>

		to your new<br />SvelteKit app
	</h1>

	<h2>
		try editing <strong>src/routes/+page.svelte</strong>
	</h2>

</section>
