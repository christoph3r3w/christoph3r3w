<script lang="ts">
 import {onDestroy,tick, onMount} from 'svelte';
 import type {Snippet}  from 'svelte';
 import {audioAction} from '$lib/audio/audio.action.js';
 
import { Play, Pause, Maximize2, Minimize2, ChevronLeft, ChevronRight, CircleDashed, Dot } from '@lucide/svelte';

interface CarouselProps {
	imageBlock: any[] | string[] | undefined,
	controls?: 'all'| '' | ( | 'dots' | 'buttons' | 'pause' | 'bigBtn'| 'base')[],
	blockIndex: number,
	children: Snippet<[]>,
}


 let {imageBlock, controls = [],blockIndex, children} : CarouselProps = $props();

 let currentIndex = $state(0);
 let paused = $state(false);
 let totalImages = $derived(imageBlock?.length || 1);
 let isBig = $state<Boolean>(false);

let trackContainer = $state<HTMLElement | null>(null);
let track = $state<HTMLElement | null>(null);
let rangeValue = $derived(0);
 
const iconSize = 21;

let isMobile = $state(false);

function goTo(index: number) {
  currentIndex = (index + totalImages) % totalImages;
  if (!track) return;
  const slide = track.children[index] as HTMLElement;
  slide?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center', });
}

 export function nextImage(){ goTo(currentIndex + 1) }
 export function prevImage(){ goTo(currentIndex - 1) }

 export function togglePause() {
 	paused = !paused;
 }

 export function bigPicture(e: MouseEvent, i: number) {
	const imgBtn = e.currentTarget as HTMLElement;
	const parentBlock = imgBtn.closest(`.block-${i}`);
	parentBlock?.querySelectorAll('.asset-img-ctnr').forEach((btn) => {
		btn.classList.toggle('big-asset');
	});
	isBig = !isBig;
}

 let interval = setInterval(()=>{
	if(isBig) return;
	if(!controls.includes('pause')) return;
	if(!paused ){
		nextImage()
	}
 }, 1000);


let observer: IntersectionObserver;

$effect(() => {
  if (!trackContainer || !track) return;
	const trackElement = track;

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
				const slides = Array.from(trackElement.children);
        currentIndex = slides.indexOf(entry.target as HTMLElement);
      }
    });
  }, {
    root: trackContainer,
    rootMargin: '0px -45% 0px -46%', // Watches the middle 2% section
    threshold: 0.1, // trigger as soon as it enters this middle section
  });

	Array.from(trackElement.children).forEach(slide => {
    observer.observe(slide);
  });

  return () => observer.disconnect();
});

onMount(() => {
	isMobile = window.innerWidth < 768;  
	if (!isMobile) {return} 
	else {
		controls = ['buttons','bigBtn']
	}
});

 onDestroy(() => { 
 	clearInterval(interval); 
	observer?.disconnect();
});
</script>
<div class="track-container" bind:this={trackContainer}>
	<button 	
		class="track" 	
		onclick={(e) => {bigPicture(e,blockIndex)}}
		bind:this={track}
		use:audioAction={{
			sounds: {
				pointerdown: 'scroll',
			},volume: 0.2
		}}
		>
		{@render children()}
	</button>
</div>

	
	{#if controls != '' && imageBlock && imageBlock.length > 1 }
		<div class="controls">
			<div class="ctrl-sections pill">
			{#if controls === 'all' || controls.includes('dots') || controls.includes('base')}
			<fieldset class=" ctrl-dots">
				{#each imageBlock as _, i}
					{@render radioRange(blockIndex, i)}
				{/each}
			</fieldset>
			{/if}
			
			{#if controls === 'all' || controls.includes('buttons')}
				{@render prevBtn()}
				{@render nextBtn()}
			{/if}
			</div>
			{#if controls === 'all' || controls.includes('pause')}
				{@render pauseBtn()}
			{/if}
			{#if controls === 'all' || controls.includes('bigBtn') || controls.includes('base')}
				{@render big(blockIndex)}
			{/if}
				
		</div>
	{/if}

	{#snippet nextBtn()}
		<span class=" ctrl-next">
			<button 
			class="shift-btn" 
			onclick={nextImage}
			use:audioAction={{
			sounds: {
				pointerdown: 'clickOut',
			},volume: 0.2
		}}>
			<ChevronRight size={20} />
			</button>
		</span>
	{/snippet}

	{#snippet prevBtn()}
		<span class="ctrl-prev">
			<button 
				class="shift-btn" 
				onclick={prevImage}
				use:audioAction={{
					sounds: {
						pointerdown: 'clickOut',
					},volume: 0.2
				}}
			>
				<ChevronLeft size={20} />
			</button>
		</span>
	{/snippet}

  	{#snippet pauseBtn()}
		<span class="ctrl-sections ctrl-pause">
		<button onclick={togglePause}>
			{#if paused}
			<Play size={iconSize} />
			{:else}
			<Pause size={iconSize} />
			{/if}
		</button>
		</span>
	{/snippet}

	{#snippet big(x: number)}
		<span class="ctrl-sections ctrl-big pill">
			<button 	onclick={(e) => {bigPicture(e, x)}}	
				use:audioAction={{
				sounds: {
					pointerdown: 'scroll',
				},volume: 0.2
			}}>
				{#if !isBig }
				<Maximize2 size={iconSize}/>
				{:else }
				<Minimize2 size={iconSize}/>
				{/if}
			</button>
		</span>
	{/snippet}

	{#snippet radioRange(blockI: number, index: number)}
		<label
			use:audioAction={{
				sounds: {
					pointerdown: 'clickIn',
					pointerup: 'clickOut'
				},
				volume: 0.2
			}}
		>
			<input
				type="radio"
				name="carousel-{blockI}"
				checked={index === currentIndex}
				onchange={() => goTo(index)}
				style="display:none"
			/>
			<Dot size={26}/>
		</label>
	{/snippet}

	{#snippet range(total: number,blockI?: number,index?: number)}
		<label for="temp-{blockI}" class="ctrl-sections range">
		<input 
			type="range" 
			id="temp-{blockI}" 
			name="temp" 
			list="markers-{blockI}" 
			step={1}
			min={0}
			max={total - 1}
			onchange={() =>{
				rangeValue = currentIndex
				goTo(rangeValue)
			 }}
			bind:value={currentIndex}
			class="pill"
		/>
		</label>	
		<datalist id="markers-{blockI}" class="rangedata">
			{#each Array(total) as _, i}
				<option value={i}></option>
			{/each}		
		</datalist>
	{/snippet}

	<style>


		.track-container{
			position: relative;
			overflow: hidden;
			display: flex;
			overflow-x: scroll;
			/* overflow-x: auto; */
			scroll-snap-type: none ;
  			scrollbar-width: none;
			width:100% ;
		}

		:global(.track) {
			all: unset;
			display: flex;
			min-height: fit-content;
			height: fit-content;
			flex-flow: row nowrap;
			gap: 1rem;
			overflow: visible;
			max-width: fit-content;
			width: fit-content;
		}

		:global(.track > *) {
			/* scroll-snap-align: center; */
			max-width: 90%;
		}

		:global(.controls) {
			--controls-bg: color-mix(in var(--color-space), var(--_pill-hue, #ffffffc7), color-mix(in var(--color-space), var(--file-primary-hue), #ffffff67 90%) 90%);
			--controls-bg: color-mix(in var(--color-space), var(--_pill-hue, #ffffffc7),  #ffffff0e 90%);

			isolation: isolate;
			display: flex ;
			flex-flow: row nowrap;
			align-items: center;
			position: relative;
			/* top: auto;
			left:0;
			right: 0 ;
			bottom: 0; */
			translate:0 var(--carousel-bottom-gap, 0);
			min-width: fit-content;
			max-width: fit-content;
			align-self:end;
			height: fit-content;
			z-index: 2;
			padding: 7px 19px;
			border-radius: 25px;

		}

		*.ctrl-sections {
			flex: 1 1 100%;
			position: relative;
			display: grid;
			place-content: center;
			/* min-height: 100%; */
			max-height:3rem ;
			min-height: 2.2rem !important;
			width: fit-content;				
		}

		.ctrl-sections button{
			all:unset;
			min-height: 100%;
			width: 100%;
			cursor: pointer;
			display: grid;
			place-content: center;
		}

		.ctrl-sections.ctrl-pause{
			margin-right: .5rem;
			order: -5;
		}

		div.controls div.ctrl-sections.pill{
			--carousel-pill-btn-color:var(--file-primary-color);
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			justify-content: space-around;
			padding-inline: 0 ;
			background-color: var(--controls-bg);
			box-shadow: rgba(0, 0, 0, 0.637) 0 4px 13px -11px;

		}

		.controls:has(button.shift-btn) div.ctrl-sections.pill{
			justify-content: space-between;
			gap: .5rem;

			&:hover{
				box-shadow: black 0 5px 11px -10px, inset 0 0 9px -5px 
				color-mix(in var(--color-space), var(--file-pill-color, var(--black)) 30%, transparent 40%);
			}

			button{
				background-color: var(--color-text);

			}

			button :global(.lucide){
				color:var(--color-text);
				color: var(--carousel-pill-btn-color);
			}

		}

		div.ctrl-sections span button.shift-btn{
			/* padding: 0 5px; */
			min-width: 2.3rem;
			min-height: 2rem;
			border-radius: 15px;
		}

		.ctrl-sections .ctrl-next{
			margin-inline: .5rem;
		}

		.ctrl-sections .ctrl-prev{
			margin-inline: .5rem;
			order: -4;
		}

		.ctrl-sections .ctrl-dots {
			flex: 2 0 auto;
			display: flex;
			flex-flow: row nowrap;
			gap: 1rem;
			align-items: center;
			margin-inline:1rem;
		}

		.ctrl-sections.ctrl-big{
			margin-left: 1rem;
			border-radius: var(--pill-radius);
			border: solid 3px var(--_pill-hue);
			border-color: 
				color-mix(in var(--color-space), var(--_pill-hue, #ffffffc7) 70%, 
				color-mix(in srgb, var(--color-bg), #ffffff98 50%) 80%);
			background-color: var(--controls-bg) !important;
			aspect-ratio: 1;
			padding: 0 !important;
			margin-bottom: 0 !important;
			height: 2rem;

			:global(.lucide) {
				padding: 2px;
			}
		}

		.ctrl-dots label {
			display: grid;
			place-content: center;
			cursor: pointer;

			&:has(input:checked) {
				background-color: var(--color-text);
				border-radius: 50%;
				box-shadow: rgba(0, 0, 0, 0.541) 0 5px 5px -3px;
				scale: 1;
			}

			&:not(:has(input:checked)) {
				opacity: 0.5;
				transition: opacity 0.3s ease;

				&:hover {
					opacity: 1;
				}
			}
		}

		.controls :global(.lucide){
			color: var(--color-text);
		}

		@media screen and (max-width: 950px) {
			:root{
				--carousel-bottom-gap: 30px;
			}

			.controls{
				align-self: center;
			}

			.ctrl-sections.pill{
				padding: 5px ;
			}

			.ctrl-sections.pill .ctrl-dots {

				gap: 10px;
			
				label :global(.lucide){
					width: 5rem;
					height: 5rem;
				}

				label:has(input:checked) {
					width: 2.5rem;
					height: 2.5rem;
				}
			}

			.ctrl-sections:is(.ctrl-pause, .ctrl-big){
				height: 2.7rem;
				:global(.lucide) {
					padding: 2px;
				}
			}

			.ctrl-sections .ctrl-next{
				margin-inline: 1rem;
			}

			.ctrl-sections .ctrl-prev{
				margin-inline: 1rem;
				order: -4;
			}

			
		}

	
	</style>
