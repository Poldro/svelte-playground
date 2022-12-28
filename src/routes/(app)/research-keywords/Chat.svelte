<script lang="ts">
	import type { PageData } from './$types';
	import { chatData } from './store';

	let photo1 = 'https://cataas.com/cat?type=siamese';
	let photo2 = 'https://cataas.com/cat?type=persian';

	let containerRef: HTMLDivElement;;
	function typewriter(node: { childNodes: string | any[]; textContent: any; }, { speed = 1 }: any) {
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



/* 		if (messageContainerRef1 && messageContainerRef2) {
			let sum = messageContainerRef1.scrollHeight + messageContainerRef2.scrollHeight;
			console.log(sum)
			containerRef.scrollTo({ top: sum, left: 0, behavior: 'smooth' });
		} */


	// Code written by ChatGPT
	function scrollIntoView() {
		const el = document.getElementById('scrollToBottom');
		if (!el) return;
		el.scrollIntoView({
			behavior: 'smooth'
		});
	}

	 $: $chatData, scrollToEnd(); 

	 function scrollToEnd() {
		if(containerRef){

			containerRef.scrollTop = containerRef.scrollHeight;
	
		}
	}
	// function written by ChatGPT
	function createKeywordArray(string: string) {
		// Find the index of the colon character
		const colonIndex = string.indexOf(':');
		// Extract the part of the string after the colon
		const keywordsString = string.substring(colonIndex + 1);
		// Split the string into an array of words
		const keywordArray = keywordsString.split(',');
		// Trim any leading or trailing whitespace from the words
		return keywordArray.map((word) => word.trim());
	}
</script>

<div class="max-h-screen h-screen bg-slate-800" 	>
	<button on:click={scrollToEnd}>scroll</button>
	<div
	bind:this={containerRef}
		class="w-full flex justify-center h-full overflow-y-scroll pt-12 md:pt-6"
	>
		<ul class="w-full ">
			{#each $chatData as { question, answer }}
				<div class="flex justify-center w-full bg-slate-800">
					<div class="flex-grow overflow-auto max-w-2xl p-4 w-full h-full py-1">
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
					</div>
				</div>
				<div class="flex justify-center w-full bg-slate-900">
					<div class="flex-grow overflow-auto max-w-2xl p-4 w-full h-full py-1">
						<li style="min-height: 100%;" class="w-full chat-messages overflow-auto flex py-4">
							<img class="h-16 w-16 md:h-24 md:w-24 rounded-full" src={photo2} alt="a random cat" />
							<div class="ml-3 md:ml-6">
								<p class="text-sm font-medium">Keywords</p>
								{#each createKeywordArray(answer) as i}
									<li class="text-slate-400 list-disc ml-6">{i}</li>
								{/each}
							</div>
						</li>
					</div>
				</div>
			{/each}
			<div class="pt-52" />
		</ul>
	</div>
</div>
