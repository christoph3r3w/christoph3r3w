<script lang="ts">
	import { onMount } from 'svelte';
	import {OrderedList} from '$lib';

	interface Work {
		title: string;
		smallDescription: string;
		description: string;
		assets: { image: string[] };
		link: string;
		icon: string;
		color?: string;
		dateStart: string;
		dateEnd: string;
		status: { is: string; sticker: string };
		contentBlock?: Array<{ text?: string[]; images: string[] }>;
	}

	let dataWorks : any[]  = $state([
		{pagination: 'none'},
		{works:[
			{
				title: 'tile shifting',
				smallDescription: 'Description 2',
				description: 'Description 2',
				assets:{image: ['']},
				link: 'https://www.google.com',
				icon: '',
				dateStart: '2023',
				dateEnd: '2023',
				status: {is:'an experiment',sticker:''}
			},
			{
				title: 'posion game',
				smallDescription: 'Description 3',
				description: 'Description 3',
				assets:{
						image: [
							'works-assets/8a92efbb8245058d9558606619b4ba46.jpg'
						]
				},
				link: 'https://proof-of-concept-for-merlin.vercel.app/',
				icon: '',
				color:'orange',
				dateStart: '2024',
				dateEnd: '',
				status:{is:'',sticker:''}

			},
			{
				title: 'windows',
				smallDescription: 'Description 4',
				description: 'Description 4',
				assets:{
					image: [
						'25acb22a-22a3-41d5-a0eb-c91529c4c6c8.jpg',
						'chris icon lowlowres.png',
						'works-assets/chris landing page portfolio ideas-02.jpg'
					]
					},
				link: 'https://brilletjes-squad-page.vercel.app/',
				icon: '',
				color:'skyblue',
				dateStart: '',
				dateEnd: '',
				status:{is:'',sticker:''}

			},
			{
				title: 'monytri',
				smallDescription: 'PWA MVP',
				description: `An MVP designed to showcase the services, capabilities, and adaptability of the Monytri financial platform to stakeholders and investors. It is a progressive web app that centralizes stock gifting, asset transfers, and payment requests, while also allowing users to practice and learn about financial literacy.
									The platform encourages users to stay up to date with their personal portfolios, learn from curated educational content on portfolio management, and exchange assets through built-in services.`,
				assets:{
						image: [
								'/works-assets/monytri/monytri 2233 2026-01-18 025839.png',
								'/works-assets/monytri/Arc_jwNAJXUzVf.gif'
								]
						},
				link: 'https://www.monytri.app/',
				icon: '/pwa-64x64.png',  // Using absolute path from static directory
				color:'#497951',
				dateStart: '2024',
				dateEnd: '2026',
				status:{is:'',sticker:''}
			},
			{
				title: 'monytri',
				smallDescription: 'PWA MVP',
				description: `An MVP designed to showcase the services, capabilities, and adaptability of the Monytri financial platform to stakeholders and investors. It is a progressive web app that centralizes stock gifting, asset transfers, and payment requests, while also allowing users to practice and learn about financial literacy.
									The platform encourages users to stay up to date with their personal portfolios, learn from curated educational content on portfolio management, and exchange assets through built-in services.`,
				assets:{
						image: [
								'/works-assets/monytri/monytri 2233 2026-01-18 025839.png',
								'/works-assets/monytri/Arc_jwNAJXUzVf.gif'
								]
						},
				contentBlock:[
					{
						text: ['test content block 1'],
						images:['/works-assets/monytri/monytri 2233 2026-01-18 025839.png']
					},
					{
						text: ['test content block 2',
								'another line in block'
						],
						images:['/works-assets/monytri/Arc_jwNAJXUzVf.gif']
					},
					{
						text: ['test content block 3'],
						
					},
					{
						// text: ['test content block 4'],
						images:[
								'/works-assets/monytri/Arc_jwNAJXUzVf.gif',
								'/works-assets/monytri/monytri 2233 2026-01-18 025839 (Custom).png',
								'/works-assets/monytri/Vector 6.png',
								'/works-assets/monytri/Screenshot 2026-01-23 224045.jpg'
								]
					},
					{
						text: ['test content block 5',
								'another line in block'
						],
						images:['/works-assets/monytri/Arc_jwNAJXUzVf.gif']
					},
					{
						text: ['test content block 6'],
						
					},
					{
						// text: ['test content block 4'],
						images:[
								'/works-assets/monytri/Arc_jwNAJXUzVf.gif',
								'/works-assets/monytri/monytri 2233 2026-01-18 025839 (Custom).png',
								'/works-assets/monytri/Vector 6.png',
								'/works-assets/monytri/Screenshot 2026-01-23 224045.jpg'
								]
					},
				],
				link: 'https://www.monytri.app/',
				icon: '/pwa-64x64.png', 
				color:'#497951',
				dateStart: '2024',
				dateEnd: '2026',
				status:{is:'',sticker:''}
			},
			{
				title: 'zuza website',
				smallDescription: 'Portfolio',
				description: 'a portfolio website for a designer named zuza',
				assets:{image: ['']},
				link: 'https://www.google.com',
				icon: '',
				dateStart: '2026',
				dateEnd: '',
				status:{is:'',sticker:''}

			},
			{
				title: 'redpers',
				smallDescription: 'Description 5',
				description: 'Description 5',
				assets:{image: ['']},
				link: 'https://www.google.com',
				icon: ' ',
				dateStart: '2024',
				dateEnd: '2024',
				status: {is:'',sticker:''}
			}
		]}
	])	

	let works = $derived(dataWorks[1].works)
	

	
	let files: string[] = $state([])
	let pagination = $derived(dataWorks[0].pagination)

	onMount(()=>{	

		const workStatus = (works : any[])=>{
			return works.map((work)=>{
				let updatedWork = {...work};

				if(updatedWork.status.is && updatedWork.status.is != ''){
					return updatedWork;
				} else if(work.dateStart && work.dateEnd){
					updatedWork.status.is = 'completed'; 
					updatedWork.status.sticker = '✅'; 
				}else if(work.dateStart && !work.dateEnd){
					const startYear = parseInt(work.dateStart);
					const currentYear = new Date().getFullYear();
					if(currentYear > startYear){
						updatedWork.status.is = 'in progress';
						updatedWork.status.sticker = '🚧'; 
					}else{
						updatedWork.status.is = 'planned';
					}
				}else{
					updatedWork.status.is = 'an experiment';
					updatedWork.status.sticker = '🧪'; 
				}
				return updatedWork;
			});
		};
		
		works = workStatus(works);
		files = works.map((work: Work) => work.title);

		const m3 = document.body.querySelector('.file-5')?.setAttribute('open','');	
	});

	$effect(()=>{
		// Update files array when works change
		files = works.map((work: Work) => work.title);
		// requestAnimationFrame(files);
	});

</script>

{#snippet workAssets(work: Work)}
	<article class="work-assets">
	<div class="asset-border b-left"></div>
	<div class="asset-border b-right"></div>
	<div class="asset-border b-bottom"></div>
				<!-- {#each work.assets.image as img}
					<img src={img} alt={work.title} />
				{/each} -->
				{#each work.contentBlock as block}
					<article class="content-block">
					{#if block.text && block.text.length > 1}
							{#each block.text as textLine}
								<p>{textLine}</p>			
							{/each}
						{:else if block.text}
							<p>{block.text}</p>	
					{/if}
						{#if block.images}
							{#each block.images as img}
								<img src={img} alt='' />
							{/each}
						{/if}
					</article>
					{/each}
			</article>
{/snippet}

<div class="work-section pad" id="works" style="--file-index:0; --total-work:{works.length};">

	<section class="Orderedlist-container" >
		<OrderedList {pagination} />
	</section>
	<!-- onclick it will close all details -->
	<details class="work-cover" name='works' >
		<summary tabindex="-1">
			<p class="cover-content">Portfolio</p>
			<p class="cover-content sticker-label">Here are some of the works I have done</p>
			<span class="cover-content sticker-label"><img src="/chris icon lowlowres.png" alt="chris icon"></span>
			<p class="cover-content sticker-label">In progress</p>
		</summary>
	</details>
	{#each works as work, i}
		<details name='works' class="file file-{i+1}" style="--file-index:{i + 1}; --work-icon: url('{work.icon}'); {work.color? `--file-primary-color:${work?.color}`:''}">
			<summary draggable="true" class="{work.status.is == 'an experiment'? 'experiment' : ''}">
				{#if work.icon?.trim()}
					<span class="work-icon-span">
						<img src={work.icon} alt={work.title}>
					</span>
				{/if}
				<span class="file-title">{work.title}</span>
				<span class="small-description">
					{work.smallDescription}
				</span> 
				<div class="side-description">
					<span class="date-start">{work.dateStart || ''}</span> 
					<span class="status">{work.status.sticker || work.status.is}</span> 
				</div>
				<div class="close-file-icon">
					<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M23.2396 21.8955C23.7523 22.4204 23.7523 23.2715 23.2396 23.7965C22.9841 24.0581 22.6481 24.1906 22.3121 24.1906C21.9761 24.1906 21.6401 24.0599 21.3846 23.7965L11.8121 13.996L2.23956 23.7965C1.98406 24.0581 1.64806 24.1906 1.31206 24.1906C0.97606 24.1906 0.640063 24.0599 0.384563 23.7965C-0.128187 23.2715 -0.128187 22.4204 0.384563 21.8955L9.95706 12.0951L0.384563 2.29474C-0.128187 1.76978 -0.128187 0.918677 0.384563 0.393719C0.897313 -0.13124 1.72857 -0.13124 2.24132 0.393719L11.8138 10.1942L21.3863 0.393719C21.899 -0.13124 22.7303 -0.13124 23.2431 0.393719C23.7558 0.918677 23.7558 1.76978 23.2431 2.29474L13.6706 12.0951L23.2396 21.8955Z" />
					</svg>
				</div>
			</summary>
			<article class="work-description">
				<p>{work.smallDescription}</p>
				<p>{work.description}</p>
			</article>
			{@render workAssets(work)}
		</details>
		{:else}
		<details class="work-cover" name='works' >
		<summary tabindex="-1" draggable="true" class="experiment">
			<p class="cover-content sticker-label">it seems quite here</p>
			<span class="cover-content sticker-label"><img src="/chris icon lowlowres.png" alt="chris icon"></span>
		</summary>
	</details>
	{/each}
</div>

<style>
	/* Custom variables added */
	:root{
		--total-work:0;
		/* --file-index:1; */
		--move:0;
		--file-primary-color:#317fdf;
		--file-primary-color:oklab(82.281% -0.10253 0.16777);
		--file-primary-color-amount:21%;
		--hue-number:814;

		--file-primary-hue:color-mix(in oklch longer hue, hsl(calc(213 * 700 / var(--file-index)), 55%, 38%) , var(--file-primary-color) 90%);
		
		--transition-timing: cubic-bezier(0.62, -0.1, 0.36, 1);
		--transition-timing: cubic-bezier(0.294, -0.291, 0.247, 1.056);
		--transition-duration: 0.7s;
		--delay-factor: 0.1s;

		--sticker-color:hsla(21, 79%, 51%, 0.974);
		--sticker-width: 0;
		--sticker-height: 0;
		--sticker-rotation: 0deg;

		@property --file-primary-hue {
			syntax: "<color>";
			inherits: false;
			initial-value: 0;
		}

		@property --file-index {
			syntax: "<integer>" | "<number>";
			inherits: false;
			initial-value: 0;
		}

		font-family: "Geist Sans", sans-serif;
	}

	:global(.contentContain:has(#works)){
		height: 80%;
		top:16%;
		bottom: 0;
		max-width: 1700px;

		@container (width < 900px){
			height: 90%;
			top:8%;
			bottom: 0;
		}
	}

	.Orderedlist-container,:global(.Orderedlist-container){
		position: relative;
		width: 100%;
		max-width: 25dvw;
		height: 70cqh;
		max-height: 100%;
		margin-top: 5dvh;
	}

	.work-section:has(details[open]) .Orderedlist-container{
		filter: opacity(.2);
		pointer-events: none;
	}
	
	.work-section{
		border-radius: inherit;
		gap: 1rem;
		container-type: inline-size;
		will-change: transform,filter,top,left;		
	}

	/* Hover effect for the summary */
	.work-section,
	/* .work-section:is(:hover,:focus-within), */
	/* .work-section:has(.Orderedlist-container:is(:hover,:focus-within)), */
	.work-section:where(:focus-within,:focus) {
		--move-all:calc(17dvw);

		.Orderedlist-container:is(:hover,:focus-within){
			--move:calc(46vh + (-43vh  * var(--file-index) / var(--total-work,1) ) ); 
		}

		/* folder cover animation */
		details.work-cover :is(summary,::details-summary),
		details.work-cover summary{
		--transition-duration: 100ms;
		--move:calc(40dvh + 1dvw * var(--total-work) ); 

			pointer-events: none;
			top:var(--move) ;
			left:calc(var(--move-all) - 2rem) ;
			color: black;
			z-index: 11;

			@container (width < 900px){
				--move:calc(53vh - var(--total-work)); 
				inset-inline: 2%;
			}

			&::after{
				pointer-events: none;
			}
		}

		/* content on cover animation */
		details.work-cover .cover-content:nth-child(1) ~ .sticker-label{
			filter: blur(2px);
			transform: translate(-35rem, 11rem) rotate(5deg);
		}

		/* files animation */
		details.file :is(summary,::details-summary),
		details.file:is(:focus-within) summary
		{
			--move:calc(46vh + (-43vh  * var(--file-index) / var(--total-work,1))); 
			--shadow-1-radius:calc(-4px + .5px * (var(--file-index)));
			--shadow-1-color:color-mix(in oklch, var(--file-primary-hue) , rgba(0, 0, 0, 0.259) 30% );
			top:calc(var(--move) - var(--hover-file-top,0px)) ;
			left:calc(.05dvw * var(--total-work) * tan(var(--file-index) ) + var(--move-all));
			
			color: black;
			box-shadow: 
				var(--shadow-1-color) 0px 2px 5px -4px,
				var(--shadow-1-color) 0px 6px 10px -5px,
				rgba(0, 0, 0, 0.2) 0px -3px 0px inset
			  ;
			/* transition-property:box-shadow none,filter none,background-color none; */
			transition-property: color, top, left, rotate;

			@container (width < 900px){
				--move:calc(53dvh - 45vh * (var(--file-index) / var(--total-work))); 
				inset-inline: 2%;
			}
		}

		details.file summary span > img{
			opacity:1 ;
		}
	}
	
	details{	
		border-radius: inherit;
		user-select: text;
		width: 0;

		&[open]{
			display: none;
		}
	}

	
	/* file and folder styling */
	details > summary{
		position: absolute;
		inset: 0;
		display: flex;
		corner-shape: superellipse(1.2);
		padding: var(--Padding-genral);
		font-size: 1.5rem;
		list-style-position: outside;
		z-index: calc(10 - var(--file-index));

		background-size: 100% 100%;
		background-attachment: fixed;
		background-origin: border-box;
		background-repeat: no-repeat;
		background-position: 100% 100% ;		

		/* Enhanced transitions using the new variables */
		will-change: top, left,right, color, background-color, translate;
		contain: layout style paint;
		backface-visibility: hidden;
  		perspective: 1000px;
		transition: 
			top var(--transition-duration) var(--transition-timing) calc(var(--file-index) * var(--delay-factor)),
			left var(--transition-duration) var(--transition-timing) calc(var(--file-index) * var(--delay-factor)),
			right var(--transition-duration) var(--transition-timing) calc(var(--file-index) * var(--delay-factor)),
			color 0.32s ease,
			background-color 0s,
			translate 0.2s var(--transition-timing);
		
		&::-webkit-details-marker,
		&::marker {
			content: '';
			display: none;
		}

		&:nth-of-type(n){
			background-image: url('/works-assets/material-assets/paper 1 black&white transparent cropped (Custom).png');
			background-blend-mode:color-dodge;
		}

		&:nth-of-type(n).experiment{
			background-image: url('/works-assets/material-assets/Chris website14.png');
			background-blend-mode:soft-light;
		}

		/* every section in the summary close state */
		> span{
			flex: 0 1 fit-content;
			width: 30px;
			height: fit-content;
			margin-right: 1%;
			overflow: hidden;
			color: color-mix(in oklch, var(--file-primary-hue), rgb(14, 14, 14) 45%);
			font-size: 2rem;
			font-weight: 700;
			text-shadow: 3px 2px 3px rgba(255,255,255,.2);
		}

		.file-title{
			flex: 1;
		}

		.close-file-icon{
			height: 2rem;
			width: 2rem;
			text-align: end;
			opacity: 0;
		}

		.small-description{
			font-size: 1rem;
			height: 2rem;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.work-icon-span{
			flex: 0 0 auto;
		}

		.work-icon-span > img{
			width: 100%;
			aspect-ratio: 1;
			opacity: 0.3;
		}

		.side-description{
			position: absolute;
			transform-origin: left;
			bottom: 1rem;
			left: 2rem;
			rotate: -90deg;
			display: flex;
			height: fit-content;
			width: fit-content;
			flex-wrap: nowrap;
			gap: 10px;

			> span{
				font-size: 1rem;
			}
		}

		@container (width < 900px){
			.side-description{
				bottom: unset;
				right: 2%;
				left: auto;
				rotate: 0deg;
				flex-direction: row-reverse;
				:is(.date-start,.small-description){ display: none;}
			}
		}
	}	

	/* folder cover */
	details.work-cover summary{
		font-size: clamp(2rem, 20vw, 10rem);
		color: black ;
		background-color: color-mix(in oklch longer hue, var(--hoverC,hsl(calc(213 - 90 / var(--file-index)), 55%, 38%)) , rgba(255, 255, 255, 0.466) 30% );
		pointer-events: none;
		cursor:none;
		overflow: hidden;
		border-radius: var(--wc-radius);
		box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -8px, rgba(0, 0, 0, 0.2) 0px -2px 0px inset;
		
		&::marker{
			display: none;
		}

		&::after{
			content: '';
			position: absolute;
			inset: 0;
			opacity: 0;
			pointer-events:fill;
			cursor: pointer;
			z-index: 100;
		}
	}

	/* initial general animation for files and folder and cover element */
	/* files covers */
	details.file summary {
		--file-primary-hue:color-mix(in oklch, hsl(calc( var(--hue-number,213) / var(--file-index)), 55%, 38%) , var(--file-primary-color) var(--file-primary-color-amount));
		--move:calc(50vh +  (-6.9svh  * var(--file-index) ) ); 
		top:var(--move) ;
		right: 0;
		color: black;

		background-color: color-mix(in oklch, var(--file-primary-hue) , rgba(255, 255, 255, 0.466) 10% );
		border-radius: var(--wc-radius) var(--wc-radius) var(--wc-radius) 0;
		backdrop-filter: blur(50px);

		/* testing */
		/* box-shadow: rgba(20, 27, 33, 0.126) 0px 2px 4px -28px, rgba(0, 0, 0, 0.207) 0px 7px 13px -7px, rgba(0, 0, 0, 0.075) 0px -3px 0px inset; */
		box-shadow: rgba(0, 0, 0, 0) 0px 2px 4px, rgba(28, 30, 31, 0.493) 0px -3px 8px -7px, rgba(0, 0, 0, 0.178) 0px -2px 2px inset;

		@container (width < 900px){
			--move:calc(65vw +  (-8.5vw  * var(--file-index) ) ); 
			border-radius: var(--wc-radius) ;
			inset-inline: 2%;
		}

	}

		/* files background overlay */
	details.file summary:nth-of-type(n)::before{
		content: '';
		position: absolute;
		background-position: 100% 100%;
		background-repeat: no-repeat;
		background-size: cover;
		background-attachment:local;
		
		inset: 1rem;
		top: 4rem;
		left: 3rem;
		background-color: rgba(238, 130, 238, 0.462);
		background-color: color-mix(in oklch, var(--file-primary-hue) , hsla(204, 93%, 33%, 0.566) 60% );
		border-radius: inherit;
		z-index: 100;
	}

	/* files background textures  */
	details.file:nth-of-type(odd) summary::before{
		background-image: url('/works-assets/material-assets/vertical-illustration-orange-graph-paper.jpg');
		background-image: url('/works-assets/material-assets/Chris website4.png');
		/* for dark backgrounds */
		background-blend-mode:lighten;
		/* for both */
		background-blend-mode:saturation;
		filter:opacity(.5) contrast(150%) grayscale(.8);
	}

	details.file:nth-of-type(even) summary::before{
		background-image: url('/works-assets/material-assets/27e9691d-e326-425b-a06f-f7efc3dc8a2f.jpg');

		/* for dark backgrounds */
		background-blend-mode:lighten;
	/* for both */
		background-blend-mode:saturation;
		filter:opacity(.5) contrast(150%) grayscale(.8);
	}


	/* files styling and animation*/
	details.file:nth-of-type(n):is(:hover,:focus) :is(summary,::details-summary){
		--hover-file-top:2rem;
		--hover-file-right:6svw;

		left: calc(var(--hover-file-right) - (var(--file-index) * 10px)); 
		transform : rotate(calc(-2deg + .5deg * var(--file-index)));
		transition-property: top,left, transform, height; 
		transform-origin: top;
		transition: 100ms var(--transition-timing),box-shadow 0s,filter 0s,background-color 0s 1s;
		cursor: pointer;
		background-color: color-mix(in oklch, var(--file-primary-hue) , rgba(255, 255, 255, 0.466) 20% );

		@container (width < 900px){
			transform-origin: bottom left ;
			left:calc(3.5dvw - (var(--file-index) * 5px));
		}
	}

	/* when hover or focus stops */
	details:is(.file,.work-cover):not(:hover,:focus,:active) :is( summary,::details-summary){
		transition: 200ms var(--transition-timing);
	}

	/* The content of the file - open state */
	.work-section:has(details:nth-of-type(n)[open]) {	
		details{
			grid-column: span 10;
			z-index: 0 ;
			display: none;
			background-color: transparent; 
			
			&[open]{
				display: block;
			}
		}

		details.file > summary{
			font-size: 2rem;
			top: -2%;
			left: 5%;
			transform: rotate(0deg);
			background-color: var(--file-primary-hue);
			color: var(--file-primary-hue,black);
			border-radius: var(--wc-radius) 30px var(--wc-radius) 0;
			corner-shape: round superellipse(0) round round ;
			transition: 0.3s var(--transition-timing), border-radius 100ms,box-shadow none,filter none,background-color none;
			&::-webkit-details-marker,
			&::marker {
				content: '';
				display: none;
			}

			/* .file-title{

			} */

			.close-file-icon{
				opacity: 1;
				color: black;
				right: 0;
				padding-bottom: 7%;

				svg{
					position: absolute;
					width: 10px;
					height: auto;
					aspect-ratio: 1;
					top: 1.3rem;
					right: 1.2rem;
				}

				svg path{
					stroke:color-mix(in oklch, var(--file-primary-hue) , rgba(0, 0, 0, 0.848) 80% );
				}
			}

			.close-file-icon::after{
				content: '';
				position: absolute;
				top: 0;
				right: 0;
				width: 2.5rem;
				height: 2.7rem;
				background-color: burlywood;
				border-radius: 10px 40px 10px var(--wc-radius);
				corner-shape: round superellipse(0) round round ;
				background-color: color-mix(in oklch,var(--file-primary-hue),rgba(25, 25, 31, 0.503) 10%);
				filter:drop-shadow(rgba(50, 47, 30, 0.921) 0px 2px 1px);
				z-index: -1;
			}
		}

		@container (width < 900px){
			details[open] .work-assets {
				grid-column: 5/ -5;
				grid-row: 11/-1;
			}

			details[open] .work-description{
				grid-column: 5/ -5;
				grid-row: 3/span 7;
			}
		}
	}

	/* where the content of each project is */
	details[open]::details-content{
		--file-primary-hue:color-mix(in oklch , hsl(calc(213 * 701 / var(--file-index)), 55%, 98%) , var(--file-primary-color) 85%);
		--file-primary-hue:color-mix(in oklch , hsl(calc(var(--hue-number) / var(--file-index)), 55%, 98%) , var(--file-primary-color) 85%);

		position: absolute;
		bottom: 0;
		inset-inline: 0;
		top:12%;
		display: grid;
		grid-template-columns: repeat(56,1fr);
		grid-template-rows: repeat(38,1fr);
		z-index: 10 !important;
		overflow-y: auto;
		border-radius: 0 0 var(--wc-radius) var(--wc-radius) ;

		/* need to be tested */
		background-color: color-mix(in oklch, hsl(60, 11%, 88%), var(--file-primary-color) 9%);
		background-color: color-mix(in oklch, hsl(59, 23%, 63%), var(--file-primary-color) 9%);
		/* background-color: hsl(60, 11%, 88%); */
		background-color: hsl(59, 23%, 63%);
		background-color: color-mix(in oklch, var(--file-primary-hue) , rgb(255, 255, 255) 10% );

	}
		
	/* work description section */
	details[open] .work-description{
	--_line-color:color-mix(in oklch, hsl(59, 23%, 63%), var(--file-primary-color) 1%);
	--_line-color2:color-mix(in oklch, var(--file-primary-hue) , rgb(255, 255, 255) 15% );
		grid-column: 5/ 20;
		grid-row: 5/-5;
		overflow-y: auto;
		overflow-x: hidden;
		width: 100%;
		height: 100%;
		padding: 1rem;
		z-index: 3;
		animation: content-reveal 0.4s var(--transition-timing);

		/* testting */
		/* background-color: #bea892; */
		/* background-color: #ffffff; */
	
		background-size:cover, cover, cover;
		background-repeat: repeat,no-repeat, repeat;
		background-position:center;
		/* background-attachment: fixed; */
		background-blend-mode:overlay;

		background-color: #e5e5f7d5;
		background-image:  
			linear-gradient(var(--_line-color) 0.7000000000000001px, transparent 0.7000000000000001px), 
			url('/works-assets/material-assets/Chris website16.png') ,
			linear-gradient(to right, var(--_line-color2) 0.7000000000000001px, #e5e5f700 0.7000000000000001px)
			/* url('/works-assets/material-assets/Chris website10.png') */
			;
		background-size: 14px 14px;
	}

	/* large content scroll section */
	details[open] .work-assets {
		--file-primary-hue:color-mix(in oklch, hsl(calc(213 * 680 / var(--file-index)), 0%, 80%) , var(--file-primary-color) 20%);
		--file-primary-hue2:color-mix(in oklch , hsl(calc(213 * 701 / var(--file-index)), 55%, 98%) , var(--file-primary-color) 75%);
		--file-assets-background: color-mix(in oklch, var(--file-primary-hue) , rgba(255, 255, 255, 0.073) 85% );

		grid-column: 1/ -3;
		grid-row: 1/-1;
		display: grid;
		
		grid-template-columns: subgrid ;
		grid-template-rows: subgrid;
		width: 100%;
		height: 100%;
		padding-block: 7cqh;
		overflow-y: auto;
		overflow-x: hidden;
		container-type: inline-size;
		/* testing */
		background-color: var(--file-assets-background);
		background: 
			linear-gradient( 	
				90deg, 
				transparent 25%,
				color-mix(in oklch longer hue, var(--file-primary-hue) , rgba(255, 255, 255, 0.126) 78% ) 47%, 
				color-mix(in oklch longer hue, var(--file-primary-hue) , rgba(255, 255, 255, 0.092) 75% ) , 
				color-mix(in oklch longer hue, var(--file-primary-hue) , rgba(255, 255, 255, 0.074) 78% ) 63%, 
				transparent 85%),
			100px 0px / 100px 100% linear-gradient(180deg, 
				var(--file-primary-hue2) 10%, 
				transparent 20%, 
				transparent , 
				transparent 85%, 
				var(--file-primary-hue2) 95%);

				 scrollbar-color: color-mix(in oklch, var(--file-primary-color), transparent 55%) transparent;
				 scrollbar-width:none;
				 scroll-snap-type: both mandatory;
				 scroll-margin-bottom: 5rem ;
		
		& .asset-border{
			position: absolute;
			inset-block:0;
			height: 100%;
			backdrop-filter: blur(3px);
			z-index: 2;
			pointer-events: none;
		}

		& .asset-border.b-left {
			left: 0;
			border-radius: 0 var(--wc-radius) var(--wc-radius) 0;
			mask-image: linear-gradient(
				to right,
				var(--file-primary-hue) -2% 50%,
				transparent 70% 100%
			);
		}
		
		& .asset-border.b-right {
			right: 0;
			border-radius: var(--wc-radius) 0 0 var(--wc-radius);
			mask-image: linear-gradient(
				to left,
				var(--file-primary-hue) -2% 10%,
				transparent 30% 100%
			);
		}

		& .asset-border.b-bottom {
			inset-block: unset;
			bottom: 0;
			height: 10%;
			width: 100%;
			mask-image: linear-gradient(
				to top,
				var(--file-primary-hue) 0% 10%,
				transparent 30% 100%
			);
		}

		& > *{
			padding-left: 45cqw;
			scrollbar-width:none;
			animation: content-reveal 0.4s var(--transition-timing);
		}
	}
	
	

	.work-assets .content-block:nth-of-type(n){
		position: relative;
		display: flex;
		flex-direction: column;
		grid-row: auto;
		margin-bottom : 2rem;
		padding-block: 3%;
		/* scroll-snap-align: center; */
  		/* scroll-snap-stop: normal; */
		anchor-name: --block;
		
		&:nth-of-type(1),
		&:nth-last-of-type(1){
			margin: 0;
			padding-block: 0;
		}
	}

	.work-assets .content-block img{
		max-width: 500px;
		width: 100%;
		height: auto;
		aspect-ratio: 16/9;
		object-fit: fill;
		object-position: center;
	}	
	

	/* has no img */
	.work-assets .content-block:has(p:nth-child(1)):has(p:nth-last-child(1)){
		/* background-color:  rgb(210, 140, 180) ; */
		p{
			/* border: #3d31df solid; */
			grid-column: auto / span auto;
		}
	} 

	/* block has text and image */
	.work-assets .content-block:has(p ~ img){
		/* background-color:  rgb(211, 127, 18) ; */
		p{
			/* border: #34df31 solid; */
			grid-column: auto / span auto;
		}
	}

	/* block has no text but has image */
	.work-assets .content-block:has(img:nth-child(1)):has(img:nth-last-child(1)){
		/* background-color:  #cedf31 ; */
		min-height:20cqh ;
		height: 30cqh;
		width: auto;
		position: relative;
		flex-flow: row nowrap;
	 	gap: 1rem;
    
    	overflow-y: hidden;
    	overflow-x: auto;
    	scroll-snap-type: x proximity;

		img{
			/* scroll-snap-align: end; */
			scroll-snap-stop: always;
			outline: #ffffff4a 2px solid;
			outline-offset: -2px;
		}

		img:nth-last-of-type(1){
			scroll-snap-align: start;
			margin-right: 24%;
		}
	}


	/* sticker styling */
	details.work-cover .cover-content{
		transition: .4s var(--transition-timing), box-shadow 0s, filter 0s, background-color 0s;

		&:nth-child(1){
			position: absolute;
			text-shadow: 3px 2px 3px rgba(255,255,255,.2);
			text-shadow: 0px 3px 3px rgba(255,255,255,0.5);
			color: rgba(0, 0, 0, 0.156);
			font-size: clamp(4rem, 15vw, 5rem);
			bottom: 5%;
			right: 5%;
		}

		&:nth-child(2){
			--sticker-color: hsl(201, 100%, 59%);
			--sticker-width: 30cqw;
			--sticker-height: 20cqh;
			--sticker-rotation: -0.6deg;
			position: relative;
			z-index: 0;
			/* display: none; */
			font-size: clamp(1rem, 15vw, 1.2rem);
		}

		&:nth-child(3){
			--sticker-color: hsla(84, 75%, 50%, 0.897);
			--sticker-width: 8rem;
			--sticker-height: 8rem;
			--sticker-rotation: -15deg;
			display: grid;
			place-content: center;
			border-radius: 50%;
			outline: 1.5px inset color-mix(in oklab, var(--sticker-color) 10% , rgba(0, 0, 0, 0.707) );
			corner-shape: scoop;
			top: 30%;
			left: 3%;
		}

		&:nth-child(4){
			--sticker-color: hsla(61, 75%, 50%, 0.945);
			--sticker-width: 8rem;
			--sticker-height: 8rem;
			--sticker-rotation: 12deg;
			display: grid;
			font-size: 1.2rem;
			place-content: center;
			border-radius: 50% 50% 5px 5px;
			outline: 8px solid color-mix(in oklab, var(--sticker-color) 80% , rgba(0, 0, 0, 0.579) );
			outline-offset: -5px;
			outline-style: double ;
			corner-shape: superellipse(0.2);
			top: 20%;
			left: 23%;

		}
	}

	.sticker-label{
		font-size: 1rem;
		color: color-mix(in oklch, rgb(0, 0, 0), var(--sticker-color,transparent) 10%);
		border-radius: 15px;
		corner-shape: superellipse(3);
		background-color: var(--sticker-color);
		padding: 3ex 2ex;
		margin: 10px 30px;
		min-width: var(--sticker-width, 30cqw);
		min-height: var(--sticker-height, 20cqh);
		height: var(--sticker-height, 20cqh);
		transform: rotate(var(--sticker-rotation, 0deg));
		position: absolute;
		top: 5%;
		font-weight: lighter;
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

	@media screen and (max-width: 900px) {
		details.file:nth-of-type(n):is(:hover,:focus) :is(summary,::details-summary){
			--hover-file-top:0px;
			background-color: color-mix(in oklch, var(--file-primary-hue) , rgba(255, 255, 255, 0.466) 40% );
		}

		details.file:nth-of-type(n):is(:focus) :is(summary,::details-summary){
		
			rotate:calc(-2deg + .1deg * var(--file-index));
			transition-property: top,left, rotate, height; 
			transition: all 100ms var(--transition-timing),box-shadow 0s,filter 0s;
			cursor: pointer;

			@container (width < 900px){
				transform-origin: bottom left ;
				left:calc(3.5dvw - (var(--file-index) * 5px));
			}
		}
	}
</style>