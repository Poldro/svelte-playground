<script>
	export let data;
	console.log(data);
</script>

<div class="w-full flex justify-center">
	<ul class="overflow-y-auto max-h-screen w-full">
		{#each data as { question, answer }, i}
			<div class="flex justify-center w-full bg-slate-800">
				<div class="w-full max-w-2xl p-4">
					<li class="flex py-4 ">
						<img
							class="h-10 w-10 rounded-full"
							src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
							alt=""
						/>
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
						<img
							class="h-10 w-10 rounded-full"
							src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
							alt=""
						/>
						<div class="ml-3">
							<p class="text-sm font-medium">Keywords</p>
							<p class="text-slate-400">{answer}/p></p>
						</div>
					</li>
				</div>
			</div>
		{/each}
	</ul>
</div>
