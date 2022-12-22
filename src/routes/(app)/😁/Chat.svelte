<script lang="ts">
	import { afterUpdate } from 'svelte';
	import { chatData } from './store';

	export let successMessages;
	let photo1 = 'https://cataas.com/cat?type=siamese';
	let photo2 = 'https://cataas.com/cat?type=persian';

	let containerRef: HTMLDivElement;

	afterUpdate(() => {
		if ($chatData) scrollToBottom(containerRef);
	});

	$: if ($chatData && containerRef) {
		scrollToBottom(containerRef);
	}
	const scrollToBottom = async (node: HTMLDivElement) => {
		node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
	};

	function typewriter(node: { childNodes: string | any[]; textContent: any }, { speed = 1 }: any) {
		const valid = node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE;

		if (!valid) {
			throw new Error(`This transition only works on elements with a single text node child`);
		}

		const text = node.textContent;
		const duration = text.length / (speed * 0.01);

		return {
			duration,
			tick: (t: number) => {
				const i = ~~(text.length * t);
				node.textContent = text.slice(0, i);
			}
		};
	}


</script>

<div class="max-h-screen h-screen bg-slate-800">
	<div class="w-full flex justify-center h-full">
		<div class="w-full h-full overflow-y-scroll pt-12 md:pt-6" bind:this={containerRef}>
			{#each $chatData as { question, answer, type }}
				<div class="flex justify-center w-full bg-slate-800">
					<div class="flex-grow overflow-auto max-w-2xl p-4 w-full py-1">
						<ul>
							<li class="flex py-4">
								<img
									class="flex-0 h-16 w-16 md:h-24 md:w-24 rounded-full"
									src={photo1}
									alt="a random cat"
								/>
								<div class="flex-1 ml-3 md:ml-6">
									<p class="text-sm font-medium">Testo Input</p>
									<p class=" text-slate-400">{question}</p>
								</div>
							</li>
						</ul>
					</div>
				</div>
				<div class="flex justify-center w-full bg-slate-900">
					<div class="flex-grow overflow-auto max-w-2xl p-4 w-full h-full py-1">
						<ul>
							<li style="min-height: 100%;" class="w-full chat-messages overflow-auto flex py-4">
								<img
									class="h-16 w-16 md:h-24 md:w-24 rounded-full"
									src={photo2}
									alt="a random cat"
								/>
								<div class="ml-3 md:ml-6">
									<p class="text-sm font-medium">Keywords</p>
									{#each answer as i}
										<li
											in:typewriter
											class={type === 'failure'
												? 'text-red-400 list-disc ml-6'
												: 'text-slate-400 list-disc ml-6'}
										>
											{i}
										</li>
									{/each}
								</div>
							</li>
						</ul>
					</div>
				</div>
			{/each}
			{#if successMessages.length >= 3}<p class="text-red-400 text-center py-6">
					Don't make more then 3 calls, please
				</p>
			{/if}
			<div class="pt-52" />
		</div>
	</div>
</div>
