<script lang="ts">
	/** @type {import('./$types').PageData} */
	export let data;

	let photo1 = "https://cataas.com/cat?type=siamese";
	let photo2 = "https://cataas.com/cat?type=persian";

	$: console.log(photo1);

	//ChatGPT function
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

<div class="w-full flex justify-center bg-slate-800  max-h-screen overflow-y-scroll scrollbar-hide">
	<ul class="w-full">
		{#each data as { question, answer }, i}
			<div class="flex justify-center w-full bg-slate-800">
				<div class="w-full max-w-2xl p-4">
					<li class="flex py-4 ">
						<img class="h-16 w-16 md:h-24 md:w-24 rounded-full" src={photo1} alt="a random cat" />
						<div class="ml-3">
							<p class="text-sm font-medium">Testo</p>
							<p class=" text-slate-400">{question}</p>
						</div>
					</li>
				</div>
			</div>
			<div class="flex justify-center w-full bg-slate-900">
				<div class="w-full max-w-2xl p-4">
					<li class="flex py-4">
						<img class="h-16 w-16 md:h-24 md:w-24 rounded-full" src={photo2} alt="a random cat" />
						<div class="ml-3">
							<p class="text-sm font-medium">Keywords</p>
							{#each createKeywordArray(answer) as i}
								<li class="text-slate-400 list-disc ml-6">{i}</li>
							{/each}
						</div>
					</li>
				</div>
			</div>
		{/each}
	</ul>
</div>
