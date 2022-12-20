<script lang="ts">
	import { enhance } from '$app/forms';
	import Chat from './Chat.svelte';
	import TutorialChat from './TutorialChat.svelte';
	import { inputTextChat, chatData } from './store';

	let formError = '';
	$: if (!$inputTextChat.length) {
		formError = '';
	}
</script>

<svelte:head>
	<title>ChatGPT</title>
	<meta name="description" content="A ChatGPT clone written in SvelteKit" />
</svelte:head>

{#if $chatData.length}
	<Chat />
{:else}
	<TutorialChat />
{/if}

<div class="w-full ">
	<div class="absolute bottom-0 left-0 w-full">
		{#if formError.length}<p class="text-red-800 text-center">{formError}</p>{/if}
		{#if $chatData.length >= 3}<p class="text-red-800 text-center">
				Don't make more then 3 calls, please
			</p>{/if}
		<form
			method="POST"
			action="?/openai_api"
			use:enhance={() => {
				return async ({ result, update }) => {
					let data = result.data;
					formError = '';
					if (data.success) {
						$chatData = [
							...$chatData,
							{
								question: data.question ?? 'no question',
								answer: data.answer.choices[0].text ?? 'no answer'
							}
						];
					}
					if (result.type === 'failure') {
						formError = data.error;
					}

					update();
				};
			}}
			class="stretch mx-2 flex flex-row gap-3 pt-2 last:mb-2 md:last:mb-6 lg:mx-auto lg:max-w-3xl lg:pt-6"
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

				<button
					disabled={$chatData.length >= 3}
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
			</div>
		</form>
	</div>
</div>
