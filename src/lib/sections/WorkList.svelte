<script lang="ts">
	import {OrderedList } from '$lib'
	import {fly} from 'svelte/transition';
	interface Work {
		title: string;
		slug: string;
		published: { is: boolean; date: string };
		description: string;
		assets: { image: string[]; icon?: string; color?: string };
		link: string;
		dateStart: string;
		dateEnd: string;
		status: { is: string; sticker: string };
		contentBlock?: Array<{ text?: string[]; images?: string[]; h2?: string }>;
		collaborators?: Record<string, string>;
		tags?: string[];
	}
	// throw new Error('test error');

	let {data} = $props();
	let {dataWorks,projects,delay} = $derived(data)
	let pagination = $derived(dataWorks[0].pagination)
	let works = $derived(dataWorks[1]?.works.filter((w: Work) => w.published.is === true))	


	// let pagination = $state({ currentPage: 1, totalPages: 1 });
</script>

{#snippet loadingFiles()}
	<p class="loading">...loading</p>
{/snippet}


<section class="work-section pad" id="workList" style="--file-index:0; --total-work:{works?.length || 0 };" >

	<!-- Try this concept with Svelte boundaries in the future.  -->
	{#await projects}
		{@render loadingFiles()}
	{:then dataWorks } 
	{@const works = dataWorks[1]?.works.slice(0)|| []}
	<!-- {@const works = dataWorks[1]?.works.slice(0).filter((w: Work) => w.published.is === true) || []} -->
	<ul class="big-list ">
	{#each works as work, i (work.title)}
		<li transition:fly={{ y: 200, duration: 2000 }}>
			<h2>{work.title}</h2>
		</li>
	{:else}
		<li>Seems quite here</li>
	{/each}
	</ul>
	{/await}

	<div class="asset-border b-bottom"></div>
</section>

<style>

	#workList{
		position: relative;
	}

	.big-list{
		position: absolute;	
		inset: 0;
		display: flex;
		flex-direction: column;
		gap: 1cqb;
		border-radius:inherit ;
		padding: 2cqb;
		padding-bottom: calc( 100% - var(--_section-height));
		overflow-y: auto;
	}

	.big-list li{
		border-bottom: solid rgba(0, 0, 0, 0.375);
		padding-bottom: 1%;
		font-size: 3.5rem;
	}

	.loading{
		font-size: 2rem;
		place-self: center;
	}

	.big-list{
		@container scroll-state(scrollable: y) {
		
		}
	}

	.asset-border{
		position: absolute;
		inset-block:0;
		height: 100%;
		backdrop-filter: blur(3px);
		z-index: 5;
		pointer-events: none;
	}

	.asset-border.b-bottom {
		inset-block: unset;
		bottom: 0;
		height: 47%;
		width: 100%;

		mask: linear-gradient(
			to top,
			white 0% 40%,
			transparent 70% 100%
		);
	}
</style>