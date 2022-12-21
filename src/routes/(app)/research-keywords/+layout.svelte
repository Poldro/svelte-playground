<script lang="ts">
	import '../../styles.css';
	import { fade, fly } from 'svelte/transition';
	import { inputTextChat, chatData } from './store';

	let visible: boolean = false;

	function handleReset() {
		($inputTextChat = ''), chatData.set([]);
	}
</script>

<div class="text-slate-300">
	{#if visible}
		<!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
		<div class="relative z-40 md:hidden" role="dialog" aria-modal="true">
			<div class="fixed inset-0 bg-neutral-900 bg-opacity-75" transition:fade={{ duration: 300 }} />

			<div class="fixed inset-0 z-40 flex">
				<div
					class="relative flex w-full max-w-xs flex-1 flex-col bg-neutral-900"
					transition:fly={{ x: -200, duration: 300 }}
				>
					<div class="absolute top-0 right-0 -mr-12 pt-2" transition:fade={{ duration: 300 }}>
						<button
							on:click={() => (visible = !visible)}
							type="button"
							class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
						>
							<span class="sr-only">Close sidebar</span>
							<!-- Heroicon name: outline/x-mark -->
							<svg
								class="h-6 w-6 text-white"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>

					<div class="h-0 flex-1 overflow-y-auto pt-5 pb-4">
						<nav class="mt-5 space-y-1 px-2">
							<button
								on:click={handleReset}
								type="reset"
								class="w-full inline-flex items-center rounded-md border border-slate-500 px-4 py-3 text-sm font-medium text-white shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:slate-indigo-500 focus:ring-offset-2"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="mr-2 -ml-1 h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
								>
									<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
								</svg>

								New Chat
							</button>
						</nav>
					</div>

					<div class="flex flex-shrink-0 p-4">
						<a href="/" class="group block flex-shrink-0">
							<p class="text-base font-medium text-white">Home</p>
						</a>
					</div>
				</div>

				<div class="w-14 flex-shrink-0">
					<!-- Force sidebar to shrink to fit close icon -->
				</div>
			</div>
		</div>
	{/if}

	<!-- Static sidebar for desktop -->
	<div class="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
		<!-- Sidebar component, swap this element with another sidebar if you like -->
		<div class="flex min-h-0 flex-1 flex-col bg-neutral-900">
			<div class="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
				<nav class="mt-5 flex-1 space-y-1 px-2">
					<button
						on:click={handleReset}
						type="reset"
						class="w-full inline-flex items-center rounded-md border border-slate-500 px-4 py-3 text-sm font-medium text-white shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:slate-indigo-500 focus:ring-offset-2"
					>
						<!-- Heroicon name: mini/envelope -->
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="mr-2 -ml-1 h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
						</svg>
						New Chat
					</button>
				</nav>
			</div>
			<div class="flex flex-shrink-0 divide-slate-500 divide-y-2 p-4">
				<a href="/" class="group block w-full flex-shrink-0">
					<p class="text-base font-medium text-white">Home</p>
				</a>
			</div>
		</div>
	</div>
	<div class="flex flex-1 flex-col md:pl-64">
		<div class="sticky top-0 z-10 bg-slate-800 pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
			<button
				on:click={() => (visible = !visible)}
				type="button"
				class="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-slate-500 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
			>
				<span class="sr-only">Open sidebar</span>
				<!-- Heroicon name: outline/bars-3 -->
				<svg
					class="h-6 w-6"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					aria-hidden="true"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
					/>
				</svg>
			</button>
		</div>
		<main class="flex-1 bg-slate-800 w-full  h-screen -mt-12 md:my-0">
			<div class="h-full relative ">
				<!-- Children -->
				<slot />
			</div>
		</main>
	</div>
</div>
