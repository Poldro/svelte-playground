<script lang="ts">
	import { enhance } from '$app/forms';
	import Chat from './Chat.svelte';
	import TutorialChat from './TutorialChat.svelte';
	import { inputTextChat, chatData } from './store';

	let isLoading: boolean = false;
	$: successMessages = $chatData.filter((i) => i.type === 'success');
</script>

<svelte:head>
	<title>Research Keywords</title>
	<meta name="description" content="A ChatGPT clone written in SvelteKit" />
</svelte:head>

{#if $chatData.length}
	<Chat {successMessages} />
{:else}
	<TutorialChat />
{/if}

<div class="w-full ">
	<div class="absolute bottom-0 left-0 w-full">
		<form
			method="POST"
			action="?/openai_api"
			use:enhance={() => {
				isLoading = true;
				return async ({ result, update }) => {
					if (result.type === 'success' && result.data) {
						$chatData = [
							...$chatData,
							{
								question: result.data.question ?? 'no question',
								answer: result.data.answer.choices[0].text ?? 'no answer',
								type: 'success'
								/* answer: data.answer.choices[0].text ?? 'no answer' */
							}
						];
					}
					if (result.type === 'failure' && result.data) {
						$chatData = [
							...$chatData,
							{
								question: result.data.question ?? 'no question',
								answer: result.data.error ?? 'generic error',
								type: 'failure'
							}
						];
					}
					update();
					isLoading = false;
				};
			}}
			class="stretch mx-2 md:mx-6 flex flex-row gap-3 pt-2 last:mb-2 md:last:mb-6 lg:mx-auto lg:max-w-3xl lg:pt-6"
		>
			<label
				for="text-to-formulate-keywords-onr"
				class="block text-sm font-medium text-slate-700 sr-only">Ask</label
			>
			<div class="relative w-full rounded-md ">
				<textarea
					bind:value={$inputTextChat}
					type="text"
					rows="1"
					name="text-to-formulate-keywords-on"
					id="text-to-formulate-keywords-on"
					class="w-full rounded-md p-4 bg-slate-700 border-slate-700 pr-10 focus:border-slate-700 focus:ring-slate-700 sm:text-sm"
					placeholder="Insert your text and click the button"
					style="max-height:400px"
				/>
				{#if !isLoading}
					<button
						disabled={successMessages.length >= 3}
						type="submit"
						class="absolute inset-y-0 right-0 flex items-center pr-3 "
					>
						<!-- Heroicon name: mini/question-mark-circle -->
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							class="w-6 h-6 text-slate-500 hover:text-slate-800"
						>
							<path
								d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z"
							/>
						</svg>
					</button>
				{:else}
					<p class="text-slate-500 text-sm">Loading</p>
				{/if}
			</div>
		</form>
	</div>
</div>
