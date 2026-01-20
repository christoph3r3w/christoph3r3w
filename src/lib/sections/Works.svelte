<script>
	import { onMount } from 'svelte';
	import {OrderedList} from '$lib';

	let showWorks = $state(false)
	let works = [
		// {
		// 	title: 'tile shifting',
		// 	smallDescription: 'Description 2',
		// 	description: 'Description 2',
		// 	assets:{image: ['']},
		// 	link: 'https://www.google.com',
		// 	icon: '',
		// 	dateStart: '2023',
		// 	dateEnd: '2023',
		// 	status: {is:'',sticker:''}

		// },
		{
			title: 'posion game',
			smallDescription: 'Description 3',
			description: 'Description 3',
			assets:{image: ['']},
			link: 'https://proof-of-concept-for-merlin.vercel.app/',
			icon: '',
			color:'orange',
			dateStart: '',
			dateEnd: '',
			status:{is:'completed',sticker:''}

		},
		{
			title: 'windows',
			smallDescription: 'Description 4',
			description: 'Description 4',
			assets:{
				image: [
					'works-assets/windows 2233 2026-01-18 030014.png',
					'works-assets/windows 2 2233 2026-01-18 030014.png',
					'works-assets/windows 3 2233 2026-01-18 030014.png'
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
							'works-assets/monytri 2233 2026-01-18 025839.png',
							'works-assets/Arc_jwNAJXUzVf.gif'
							]
					},
			link: 'https://www.monytri.app/',
			icon: '/pwa-64x64.png',  // Using absolute path from static directory
			color:'#497951',
			dateStart: '2023',
			dateEnd: '',
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
		// {
		// 	title: 'redpers',
		// 	smallDescription: 'Description 5',
		// 	description: 'Description 5',
		// 	assets:{image: ['']},
		// 	link: 'https://www.google.com',
		// 	icon: ' ',
		// 	dateStart: '2024',
		// 	dateEnd: '2024',
		// 	status: {is:'',sticker:''}
		// }
	]	

	// needs work
// 	function workStatus(y){
//     y = y.map((x)=>{
//         if(x.dateStart && x.dateEnd){
//             x.status = {is:'completed', sticker:'✅'}; 
//         } else if(x.dateStart && !x.dateEnd){
//             x.status = {is:'in progress',sticker:'🚧'}; 
//         } else if(!(x.dateStart && x.dateEnd)){
//             x.status = {is:'an experiment',sticker:'🧪'}; 
//         }
//         return x;
//     });
// }

	onMount(()=>{
		// workStatus(works)
		// console.log(works.map((x) => x.status.sticker));
		
	})

</script>

<div class="work-section pad" id="works">

	<section class="Orderedlist-container">
		<OrderedList />
	</section>
	<!-- onclick it will close all details -->
		<details class="work-cover" name='works' style="--index:0; --total-work:{works.length};">
			<summary>
				<p class="cover-content">Portfolio</p>
				<p class="cover-content sticker-label">Here are some of the works I have done</p>
				<span class="cover-content sticker-label"><img src="/chris icon lowlowres.png" alt="chris icon"></span>
			</summary>
		</details>
		{#each works as work, i}
			<details name='works' class="file file-{i+1}" style="--index:{i + 1}; --work-icon: url('{work.icon}'); {work.color? `--file-color:${work?.color}`:''}">
				<summary>
					{#if work.icon.length > 2}
						<span class="work-icon-span">
							<img src={work.icon} alt={work.title}>
						</span>
					{/if}
					<span class="file-title">{work.title}</span>
					<div class="side-description"><span class="date-start">{work.dateStart || ''}</span> <span class="small-description">{work.smallDescription}</span> <span class="status">{work.status.is}</span> </div>
					<div class="close-file"></div>
				</summary>
				<article class="work-description">
					<p>{work.smallDescription}</p>
					<p>{work.description}</p>
				</article>
				<article class="work-assets">
					{#each work.assets.image as img}
						<img src={img} alt={work.title} />
					{/each}
				</article>
			</details>
		{/each}
</div>

<style>
	/* Custom variables added */
	:root{
		--move:0;
		--file-color:#3e84d9;

		--transition-timing: cubic-bezier(0.62, -0.1, 0.36, 1);
		--transition-timing: cubic-bezier(0.294, -0.291, 0.247, 1.056);
		--transition-duration: 0.7s;
		--delay-factor: 0.1s;

		--sticker-color:hsla(21, 79%, 51%, 0.974);
		--sticker-width: 0;
		--sticker-height: 0;
		--sticker-rotation: 0deg;

		@property --file-hue {
			syntax: "<color>";
			inherits: false;
			initial-value: 0;
		}

		@property --index {
			syntax: "<integer>" | "<number>";
			inherits: false;
			initial-value: 0;
		}
	}

	:global(.contentContain:has(#works)){
		height: 80%;
		top:18%;
		bottom: 0;

		@container (width < 900px){
			height: 90%;
			top:8%;
			bottom: 0;
		}
	}

	.Orderedlist-container,:global(.Orderedlist-container){
		position: relative;
		width: 4dvw ;
		height: 100%;
		margin-top: 5dvh;
		opacity: .2;
		pointer-events: none;
	}
	
	.work-section{
		border-radius: inherit;
		gap: 1rem;
		container-type: inline-size;
		will-change: transform,filter,top,left;
		
		/*testing */
		/* overflow:hidden ; */
	}

	/* Hover effect for the summary */
	.work-section details.file summary{
		--move:calc(25vw +  (-4.5vw  * var(--index) ) ); 
		top:var(--move) ;
		/* left:0 ; */
		right: 0;
		color: black;
		box-shadow: rgba(20, 27, 33, 0.126) 0px 2px 4px -28px, rgba(0, 0, 0, 0.207) 0px 7px 13px -7px, rgba(0, 0, 0, 0.075) 0px -3px 0px inset;
		/* box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset; */
		/* max-width: 900px; */

		@container (width < 900px){
			--move:calc(65vw +  (-8.5vw  * var(--index) ) ); 
			inset-inline: 2%;
		}
	}

	/* initial animation for files and folder and cover element */
	/* .work-section { */
	.work-section:is(:hover,:focus-within) {
		--move-all:calc(15dvw +  (-26.5vw / 1.5  * var(--total-work) ) );
		--move-all:calc(11dvw);

		/* folder cover animation */
		details.work-cover summary{
			--move:calc(30dvw +  (-4.5vw / 1.5  * var(--index) ) ); 
			top:var(--move) ;
			left:var(--move-all) ;
			color: black;
			box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -8px, rgba(0, 0, 0, 0.2) 0px -2px 0px inset;

			@container (width < 900px){
				--move:calc(55vh +  (-8.5vh  * var(--index) ) / 3.5  ); 
				inset-inline: 2%;
			}
		}

		/* content on cover animation */
		details.work-cover .cover-content:nth-child(1) ~ .sticker-label{
			filter: blur(2px);
			/* transform: translate(0, 31rem) rotate(5deg) ; */
			transform: translate(-35rem, 11rem) rotate(5deg);
		}
	
		details.file summary{
			--move:calc(25vw +  (-4.5vw  * var(--index) ) ); 
			top:calc(var(--move) - var(--hover-file-top,0px)) ;
			left:var(--move-all) ;
			color: black;
			box-shadow: rgba(0, 0, 0, 0.259) 0px 2px 4px -4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -5			px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;

			@container (width < 900px){
				--move:calc(55vw +  (-10.5vw  * var(--index) ) ); 
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
	}
	
	details[open]{	
		display: none;
	}

	details.work-cover .cover-content{
		transition: .4s var(--transition-timing) ;

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
			corner-shape: scoop;
			top: 30%;
			left: 3%;
		}
	}

	/* folder cover */
	details.work-cover summary{
		font-size: clamp(2rem, 20vw, 10rem);
		color: black ;
		background-color: color-mix(in oklch, var(--hoverC,hsl(calc(213 - 90 / var(--index)), 55%, 38%)) , rgba(255, 255, 255, 0.466) 30% );
		pointer-events: none;
		cursor:none;
		overflow: hidden;
		border-radius: var(--wc-radius);
		
		&::marker{
			display: none;
		}
	}
	/* file cover */
	details.file summary {
		--file-hue:color-mix(in oklch, hsl(calc(213 * 700 / var(--index)), 55%, 38%) , var(--file-color) 90%);
		/* background-color: color-mix(in oklch, var(--hoverC,rgb(44, 92, 150)) , rgba(255, 255, 255, 0.466) 30% ); */
		background-color: color-mix(in oklch, var(--file-hue) , rgba(255, 255, 255, 0.466) 10% );
		/* background-color: #2C5D98; */
		border-radius: var(--wc-radius) var(--wc-radius) var(--wc-radius) 0;
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
		z-index: calc(10 - var(--index));

		background-image: url('works-assets/material-assets/paper 1 black&white transparent cropped.png');
		background-size: 100% 100%;
		background-attachment: fixed;
		background-origin: border-box;
		background-repeat: no-repeat;
		background-position: 100% 100% ;
		/* for dark backgrounds */
		background-blend-mode:screen;
		background-blend-mode:lighten;
		/* for light backgrounds */
		background-blend-mode:exclusion;
		/* for both */
		background-blend-mode:soft-light;
		background-blend-mode:color-dodge;

		/* Enhanced transitions using the new variables */
		transition: 
			top var(--transition-duration) var(--transition-timing) calc(var(--index) * var(--delay-factor)),
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

		> span{
			flex: 0 1 fit-content;
			width: 30px;
			height: fit-content;
			margin-right: 1%;
			overflow: hidden;
			color: color-mix(in oklch, var(--file-hue), rgb(14, 14, 14) 45%);
			font-size: 2rem;
			font-weight: 700;
			text-shadow: 3px 2px 3px rgba(255,255,255,.2);
			/* outline: solid; */
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

	/* each file's styling */
	details.file:nth-of-type(n):hover :is( summary,::details-summary){
		--hover-file-top:(2rem);

		backdrop-filter: blur(50px);
		rotate:calc(-2deg + .5deg * var(--index));
		transition: 200ms var(--transition-timing);
		transition-property: top,left, rotate, height;
		cursor: pointer;
		left: calc(60px - (var(--index) * 10px)); 
		/* background-color: rgba(255, 255, 255, 0.495) ; */
		/* background-color: rgba(255, 255, 255, 0.951) ; */
		/* background-color: rgba(128, 128, 128, 0.577) ; */

		@container (width < 900px){
			transform-origin: bottom left ;
			left:calc(3.5dvw - (var(--index) * 5px));
		}
	}

	details:nth-of-type(n):not(:hover) :is( summary,::details-summary){
		/* transition:
		background-color .5s,
		top 0.5s var(--transition-timing) calc(var(--index) * var(--delay-factor)),
		left 0.5s var(--transition-timing) calc(var(--index) * var(--delay-factor)),
		right 0.5s var(--transition-timing) calc(var(--index) * var(--delay-factor)),
		translate 0.2s var(--transition-timing); */
		/* transition:background-color .5s,all inherit; */
		transition: 400ms var(--transition-timing);
	}

	/* The content of the file - open state */

	.work-section:has(details:nth-of-type(n)[open]) {	
		details{
			grid-column: span 10;
			z-index: 0 ;
			display: none;
			background-color: transparent; 
		}

		details.file > summary{
			font-size: 2rem;
			top: 2%;
			left: 5%;
			rotate: 0deg;
			background-color: var(--file-hue);
			/* color: color-mix(in oklch, var(--file-hue), black 60%); */
			color: var(--file-hue,black);

			transition: all 0.3s var(--transition-timing);

			&::-webkit-details-marker,
			&::marker {
				content: '';
				display: none;
			}
		}

		details[open]{
			display: block;
		}

		/* where the content of each project is */
		details[open]::details-content{
			position: absolute;
			bottom: 0;
			inset-inline: 0;
			top:10%;
			display: grid;
			grid-template-columns: repeat(56,1fr);
			grid-template-rows: repeat(38,1fr);
			z-index: 10 !important;
			overflow-y: auto;
			border-radius: 0 0 var(--wc-radius) var(--wc-radius) ;

			/* need to be tested */
			background-color: color-mix(in oklch, hsl(60, 11%, 88%), var(--file-color) 9%);
			background-color: color-mix(in oklch, hsl(59, 23%, 63%), var(--file-color) 9%);
			/* background-color: hsl(60, 11%, 88%); */
			/* background-color: hsl(59, 23%, 63%); */
		}

		details[open] .work-assets{
			display: grid;
			grid-column: 1/-1;
			grid-row: 1/-1;
			grid-template-columns: subgrid ;
			grid-template-rows: subgrid;
		}
		
		/* fade in aniamtion for each section  */
		details[open] > :nth-child(n + 2){
			animation: content-reveal 0.4s var(--transition-timing);
		}

		/* large content scroll section */
		details[open] .work-assets {
			--file-hue:color-mix(in oklch, hsl(calc(213 * 680 / var(--index)), 0%, 80%) , var(--file-color) 20%);

			grid-column: -5/ 25;
			grid-row: 1/-1;
			aspect-ratio: 1;
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			container-type: inline-size;
			/* testing */
			/* background-color: #2C5D98;
			background-color: color-mix(in oklch, hsla(0, 0%, 100%, 0.197), var(--file-color) 69%); */
			background-color: color-mix(in oklch, var(--file-hue) , rgba(255, 255, 255, 0.073) 85% );

			/* outline: 1px solid #5a5a5a; */
		}

		/* work description section */
		details[open] .work-description{
			grid-column: 5/ 20;
			grid-row: 5/-5;
			overflow-y: auto;
			overflow-x: hidden;
			aspect-ratio: 1;
			width: 100%;
			height: 100%;

			/* testting */
			background-color: #98622c;
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

	.work-assets img{
		max-width: 500px;
		width: 100%;
		height: auto;
		aspect-ratio: 16/9;
		object-fit: fill;
		object-position: center;
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
</style>