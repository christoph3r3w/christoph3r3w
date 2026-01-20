<script>
	// let {data} = $props()
	// let {folders} = data

	let mfolders =  $state([
		{
			year: 2024,
			files: [
				'project-proposal.docx',
				'final-report.pdf',
				'presentation.pptx'
			]
		},
		{
			year: 2023,
			files: [
				'budget.xlsx',
				'meeting-notes.txt'
			]
		},
		{
			year: 2022,
			files: [
				'design-sketch.psd',
				'user-research.csv',
				'roadmap.md'
			]
		}
	]);

	let folderLength = $derived(mfolders.length);


</script>
	<!-- needs to send a post to the server na dupdtae the works component -->
	<!-- or -->
	<!-- trigger specific showing with svlte and css  -->
	<div id="ol">
		<button type="reset" onclick={() => {console.log('recent clicked')}}>Recent</button>
		<!-- <button onclick={()=> {console.log('all has been clicked')}}>All</button> -->

		{#each mfolders as folder}
			<ol class="main-list">
				<li>
					<a href="/">
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
					{/each }
				</ol>
			
			</ol> 	
		{/each}

		

		{#each {length: folderLength} as _, i}
			<ol class="main-list">
				<li><a href="/">{mfolders[i].year}</a></li>
				<ol class="file-dots">
					{#each mfolders[i].files as file}				
						<li>
							<svg width="5" height="1" viewBox="0 0 5 1" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M0.5 0.5L4.5 0.5" stroke="black" stroke-linecap="round"/>
							</svg>
						</li>
					{/each }
				</ol>
			
			</ol> 	
		{/each}
		<button onclick={()=> {console.log('all has been clicked')}}>All</button>

	</div>

	<style>
		:root{
			--list-color:color-mix(in oklch, var(--hoverC,rgba(255, 255, 255, 0.677)), black);
			--line-color:color-mix(in oklch, var(--list-color), rgba(200, 196, 123, 0.21) );
			--line-gap:15%;
		}

		#ol{
			display: flex;
			flex-direction: column;
			gap: 1dvh;
			z-index: 4;
			text-shadow: 0px 3px 3px rgba(255,255,255,0.5);
		}

		#ol > button{
			position: relative;
			display: grid;
			place-content: start;
			width: stretch;
			height: auto;
			background-color: color-mix(in srgb, var(--hoverC,black) , rgba(255, 255, 255, 0) 100%);
			color: var(--list-color);
			padding-block: .1rem;
			border: none;
			border-radius: 50%;
			corner-shape:superellipse(3);
			cursor: pointer;

			/* &::after{
				content: '';
				position: absolute;
				bottom: 0;
				height: 1px;
				width: 100%;
				background-color:rgb(0, 58, 128);
				right: 30%;
			} */
		}

		ol.main-list{
			position: relative;
			margin-block: 10%;
			max-width: fit-content;
			
			&:nth-of-type(1)::after{
				content: '';
				position: absolute;
				top: calc(-1 * var(--line-gap));
				inset-inline: -30%;
				width: 160%;
				height: 1px;
				background-color: var(--line-color);
				/* padding-top: var(--line-gap); */
			}
			&:nth-last-of-type(1)::after{
				content: '';
				position: absolute;
				bottom: calc(-1 * var(--line-gap));
				inset-inline: -30%;
				width: 160%;
				height: 1px;
				background-color: var(--line-color);
			}
		}

		.main-list > li{
			width: 100%;
			a{color: var(--list-color);}
		}

		.main-list ol{
			display: flex;
			flex-direction: column;
			align-items: end;
		}

		.main-list ol li svg path{
				stroke: var(--line-color);		
		}
	
	#ol :is(button,a,svg):nth-last-of-type(n):hover{
		--list-color:color-mix(in oklch, var(--hoverC,rgba(255, 255, 255, 0.677)), black 80%);
		text-decoration: underline wavy;
	}
	
	</style>
