<script>
	let showWorks = $state(false)
	let works = [
		{
			title: 'monytri',
			smallDescription: 'Description 1',
			description: 'Description 1',
			image: '',
			link: 'https://www.google.com',
			icon: '/pwa-64x64.png'  // Using absolute path from static directory
		},
		{
			title: 'tile shifting',
			smallDescription: 'Description 2',
			description: 'Description 2',
			image: '',
			link: 'https://www.google.com',
			icon: ''

		},
		{
			title: 'posion game',
			smallDescription: 'Description 3',
			description: 'Description 3',
			image: '',
			link: 'https://www.google.com',
			icon: ''

		},
		{
			title: 'windows',
			smallDescription: 'Description 4',
			description: 'Description 4',
			image: '',
			link: 'https://www.google.com',
			icon: ''

		},
		{
			title: 'redpers',
			smallDescription: 'Description 5',
			description: 'Description 5',
			image: '',
			link: 'https://www.google.com',
			icon: ' '
		}
	]

</script>

<div class="work-section pad" id="works">
	<!-- onclick it will close all details -->
		<details name='works' style="--index:0; --total-work:{works.length};">
			<summary>Work</summary>
			<p>Here are some of the works I have done</p>
		</details>
		{#each works as work, i}
			<details name='works' class="work-{i+1}" 
			style="
			--index:{i + 1};
			--work-icon: url('{work.icon}');
			">
				<summary>
					{#if work.icon.length > 2}
						<span>
							<img src={work.icon} alt={work.title}>
						</span>
						{:else}
					{/if}
					{work.title}
				</summary>
				<img src={work.image} alt={work.title} />
				<p class="work-description">{work.description}</p>
			</details>
		{/each}
</div>

<style>
	/* Custom variables added */
	:root{
		--transition-timing: cubic-bezier(0.62, -0.1, 0.36, 1);
		--transition-duration: 0.7s;
		--delay-factor: 0.1s;
	}
	
	.work-section{
		border-radius: inherit;
		overflow:hidden ;
		gap: 1rem;
	}
	
	
	details{
		border-radius: inherit;
		background-color: black;
		/* important */
		z-index: calc(10 - var(--index));
	}
	
	details[open]{	
		display: none;
	}

	details:nth-of-type(1) summary{
		
		display: grid;
		place-content: center;
		font-size: 20vw;
		color: black ;
		background-color: color-mix(in srgb, var(--hoverC,#2C5D98) , rgba(255, 255, 255, 0.466) 30% );
		pointer-events: none;
		cursor:none;
		
		&::marker{
			display: none;
		}
	}
	
	details > summary{
		background-color: #2C5D98;
		position: absolute;
		inset: 0;
		display: flex;
		border-radius: var(--wc-radius);
		padding: var(--Padding-genral);
		color: transparent;
		font-size: 1.5rem;
		list-style-position: outside;
		/* Enhanced transitions using the new variables */
		transition: top var(--transition-duration) var(--transition-timing) calc(var(--index) * var(--delay-factor)),
					left var(--transition-duration) var(--transition-timing) calc(var(--index) * var(--delay-factor)),
					right var(--transition-duration) var(--transition-timing) calc(var(--index) * var(--delay-factor)),
					color 0.32s ease,
					background-color 0.1s ease,
					translate 0.2s var(--transition-timing);
		
		&::-webkit-details-marker,
		&::marker {
			content: '';
			display: none;
		}

		span{
			width: 30px;
			height: fit-content;
			margin-right: 1%;
			overflow: hidden;
		}

		span img{
			width: 100%;
			aspect-ratio: 1;
			opacity: 0;
		}
	}

	/* Hover effect for the summary */

	.work-section:hover {
		details summary{
			--move:calc(25vw +  (-4.5vw  * var(--index) ) ); 
			top:var(--move) ;
			left:var(--move) ;
			color: black;
			box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;

			@container (width < 900px){
				--move:calc(45vw +  (-8.5vw  * var(--index) ) ); 
				inset-inline: 3%;
			}
		}

		details summary span img{
			opacity:1 ;
		}
	}

	details:nth-of-type(n):hover :is( summary,::details-summary){
		background-color: rgba(255, 255, 255, 0.495) ;
		/* left: 60px;  */
		translate: 0 -1%;
		transition: all var(--transition-timing);
		cursor: pointer;

	}

	details:nth-of-type(n):not(:hover) :is( summary,::details-summary){
		/* transition:
		background-color .5s,
		top 0.5s var(--transition-timing) calc(var(--index) * var(--delay-factor)),
		left 0.5s var(--transition-timing) calc(var(--index) * var(--delay-factor)),
		right 0.5s var(--transition-timing) calc(var(--index) * var(--delay-factor)),
		translate 0.2s var(--transition-timing); */
		transition:
		background-color .5s,all inherit;
	}

	/* details:nth-of-type(1):hover summary{
		background-color: rgba(225, 216, 200, 0.888) ;
		inset-inline: 1%; 
		transition: all .6s var(--transition-timing);
	} */

	/* details open state */

	.work-section:has(details:nth-of-type(n)[open]) {	
		details{
			grid-column: span 10;
			z-index: 0 ;
			display: none;
			background-color: transparent;
		}

		details[open]{
			display: block;
		}

		details > summary{
			font-size: 2rem;
			top: 2%;
			left: 5%;
			color: black;
			/* Enhanced transition for the open state */
			background-color: rgba(255, 255, 0, 0.336);
			transition: all 0.3s var(--transition-timing);

			&::-webkit-details-marker,
			&::marker {
				content: '';
				display: none;
			}

		}

		detiails::details-summary{
			background-color: rgba(255, 255, 0, 0.336);
		}

		details:nth-of-type(1) {
			display: none;
		}
		
		details[open]::details-content{
			position: absolute;
			bottom: 0;
			inset-inline: 0;
			top:10%;
			background-color: #ffffca;
			display: grid;
			grid-template-columns: repeat(56,1fr);
			grid-template-rows: repeat(38,1fr);
			z-index: 10 !important;
			
		}
		
		details[open] > :nth-child(n + 2){
			animation: content-reveal 0.4s var(--transition-timing);
		}

		details[open] > img{
			grid-column: -5/ 29;
			grid-row: 5/span 20;
			aspect-ratio: 1;
			width: 100%;
			height: 100%;
			object-fit: cover;
			outline: solid #2C5D98;
		}

		details[open] .work-description{
			grid-column: 5/ 20;
			grid-row: 5/-5;
			overflow-y: auto;
			overflow-x: hidden;
			aspect-ratio: 1;
			width: 100%;
			height: 100%;
			outline: solid #98622c;
		}
	}
	
	/* Animation for content reveal */
	@keyframes content-reveal {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>