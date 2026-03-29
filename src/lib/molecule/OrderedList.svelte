<script>
	// import  {next} from '../../routes/work.remote'
	// import {y} from '../molecule/pagination.svelte'
	let {pagination,works} = $props()
	
	let tFolders = $derived(
		works.map(({title, published,dateStart,dateEnd}) => ({
			year: dateStart.split('-')[0] || dateEnd.split('-')[0] || 'on going',
			title,
			published: published
		}))
	) 

	const grouped = Object.values(
		tFolders.reduce((acc, {title, published, year }) => {

			if (!acc[year]) {
				acc[year] = { year, files: [], published };
			}

			acc[year].files.push(title);

			return acc;
		}, {})
	);

	let mfolders = $state(grouped.reverse() ||[
		{
			year: 2026,
			files: [	'zuza']
		},
		{
			year: 2025,
			files: [
				'project-proposal.docx',
				'final-report.pdf',
				'presentation.pptx'
			]
		},
		{
			year: 2024,
			files: [
				'project-proposal.docx',
				'final-report.pdf',
				'presentation.pptx',
				'design-sketch.psd',
				'user-research.csv',
				'roadmap.md'
			]
		},
		{
			year: 2023,
			files: [
				'budget.xlsx',
				'meeting-notes.txt'
			]
		},
	]);

	const minYear = mfolders.reduce((min, item) => item.year < min.year && item.year !== '' ? item : min);
	const maxYear = mfolders.reduce((max, item) => item.year > max.year && item.year !== '' ? item : max);
	let maxPagination = $state(()=>{
		let max = 7;
		return typeof pagination === 'number' && pagination > max ? pagination : max
	});
	const paginationToggle = $derived(()=>{
		if(tFolders.length <= maxPagination()){
			return ''
		} 
		if(pagination != 'none'){
			return ''
		}
		return 'no-pagination'
	});

	const handleReset = async () => {
		// next()
		// y.value = 'reset y';
		// const x = await y.f();
		// console.log('me',y.value,y.f());	
		return('reset');
	}

</script>
	<!-- needs to send a post to the server na dupdtae the works component -->
	<!-- or -->
	<!-- trigger specific showing with svlte and css  -->

	{#snippet mList()}
		<button type="reset" onclick={() => {handleReset()}} tabindex={pagination != 'none'? undefined : -1}>Recent</button>
		{#each mfolders as folder}
			<ol class="main-list">
				<li>
					<a href="/" tabindex={pagination != 'none'? undefined : -1}>
						{folder.year}
					</a>
				</li>
				<ol>
					{#each folder.files as file}				
						<li>
							<svg width="5" height="1" viewBox="0 0 5 1" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M0.5 0.5L4.5 0.5" stroke="black" stroke-linecap="round"/>
							</svg>
						</li>
					{/each}
				</ol>
			
			</ol> 	
		{/each}
		<button onclick={()=> {console.log('all has been clicked')}} tabindex={pagination != 'none'? undefined : -1}>All</button>
	{/snippet}

	{#snippet sList()}
		<p>Now</p>
		<!-- <p>{maxYear.year}</p> -->
		<ol class="main-list">
			<!-- <li>
				<p>{maxYear.year}</p>
			</li> -->
			{#each mfolders as folder}
				{#each folder.files as file}				
					<li>
						<svg width="5" height="1" viewBox="0 0 5 1" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M0.5 0.5L4.5 0.5" stroke="var(--list-color)" stroke-linecap="round"/>
						</svg>
						<p>{folder.year}</p>
					</li>
					<!-- <hr> -->
					<!-- <br> -->
				{/each}
					<!-- <br> -->
			{/each}
				<br>
			<li>
				<p>{minYear.year}</p>
			</li>
		</ol> 			
	{/snippet}

	<div id="ol" class={paginationToggle()} >
		{#if tFolders.length > maxPagination()}
			{@render mList()}
		{:else}
			{@render sList()}
		{/if}
	</div>

	<style>
		:root{
			--list-color:color-mix(in oklch, var(--hoverC,var(--tritary-color)) 65%, var(--dark-subtle));
			--line-color:color-mix(in oklch, var(--list-color), rgba(200, 196, 123, 0.21) );
			--line-gap:1svh;
		}

		:global(.Orderedlist-container){
			position: relative;
			width: 100%;
			max-width: 25dvw;
			height: 70cqh;
			max-height: 100%;
			margin-top: 5dvh;
			overflow-y: auto;
			color: var(--list-color);
		}

		#ol{
			display: flex;
			flex-direction: column;
			gap: var(--line-gap);
			z-index: auto;
			text-shadow: 0px 3px 3px rgba(255,255,255,0.5);
			padding-left: 1rem;
		}

		#ol > button{
			position: relative;
			display: grid;
			place-content: start;
			width: fit-content;
			height: auto;
			background-color: color-mix(in srgb, var(--hoverC,black) , rgba(255, 255, 255, 0) 100%);
			color: var(--list-color);
			padding-block: .1rem;
			border: none;
			border-radius: 50%;
			corner-shape:superellipse(3);
			cursor: pointer;
		}

		ol.main-list{
			position: relative;
			margin-block: var(--line-gap);
			max-width: fit-content;
			min-height: auto;
			
			&:nth-last-of-type(1){
				min-width:1.8rem ;
			}
			&:nth-of-type(n)::after{
				content: '';
				position: absolute;
				inset-inline: -50%;
				height: 1px;
				width: 180%;
			}
			&:nth-of-type(1)::after{
				top: calc(-1 * var(--line-gap));
				background-color: var(--line-color);
			}
			&:nth-last-of-type(1)::after{
				bottom: calc(-1 * var(--line-gap));
				background-color: var(--line-color);
			}
		}

		.main-list > li{
			width: 100%;
			min-height: 1rem;
			display: flex;
			gap: var(--line-gap);
			align-items: center;
			/* outline: solid red; */
			a{color: var(--list-color);}
			svg ~ p{display:none;}
			&:hover{
				p{display:block;}
			}
		}

		.main-list ol{
			display: flex;
			flex-direction: column;
			align-items: end;

			li {
				display: flex;
				height: 10px;
				padding-top:5px ;
			}
		}

		.main-list ol li svg path{
			stroke: var(--line-color);		
		}
	
		#ol :is(button,a,svg):nth-last-of-type(n):hover{
			--list-color:color-mix(in oklch, var(--hoverC,rgba(255, 255, 255, 0.677)), black 80%);
			text-decoration: underline wavy;
		}

		.no-pagination{
			filter: opacity(.3);
			pointer-events: none;

			&::selection{
				background: transparent;
			}
		}
	
	</style>
