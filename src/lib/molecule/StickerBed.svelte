<script lang="ts">
import {onMount} from 'svelte';
import {fade, fly} from 'svelte/transition';
	interface Props {
		total?: number;
	}
	interface StickerListItem {
		id: string;
		content: string;
		type: 'image' | 'text' | 'shape';
		alt?: string;
		visible: boolean;
		offsetX?: number;
		offsetY?: number;
		rotation?: number;
	}

	let {total} : Props = $props()

	let stickerList: StickerListItem[] = [
		{id: 'hero', visible: false, content: '/stickers/stickerrr-light.png', type: 'image', alt: 'tutorial sticker'},
		{id: 'chris-icon', visible: false, content: '/chris icon lowlowres.png', type: 'shape', alt: 'chris icon'},
		{id: 'hero2', visible: false, content: 'Here are some selected projects I have done', type: 'text'},
		{id: 'triangle', visible: false, content: 'In progress', type: 'text', alt: 'in progress'},	
		{id: 'pixel-c',visible: false, content: '/stickers/pixel-c-star.png', type: 'image', alt: 'pixel sticker'},	
		{id: 'in-progress', visible: true, content: '/stickers/in progress-texture.png', type: 'image', alt: 'tutorial sticker'},
		{id: 'flag', visible: true, content: '/stickers/korsou sticker.png', type: 'image', alt: 'tutorial sticker'},
		{id: 'vue', visible: true, content: '/stickers/vue.png', type: 'image', alt: 'tutorial sticker'},
		{id: 'JS', visible: true, content: '/stickers/js sticker (2).png', type: 'image', alt: 'tutorial sticker'},
		{id: 'figma', visible: true, content: '/stickers/figma sticker.png', type: 'image', alt: 'tutorial sticker'},
		{id: 'svelte', visible: true, content: '/stickers/svelte.png', type: 'image', alt: 'tutorial sticker'},
		{id: 'c-name', visible: true, content: '/stickers/c-name free.png', type: 'image', alt: 'tutorial sticker'},
	];

	let visibleStickers = $state(stickerList.filter(sticker => sticker.visible).slice(0,total?total: stickerList.length));
	let moveX = $state(0);
	let moveY = $state(0);
	let rotate = $state(0);

	function shuffleStickers(){
		visibleStickers = visibleStickers.map(sticker => ({
			...sticker,
			offsetX: (Math.random() - 0.5) * 100,
			offsetY: (Math.random() - 0.9) * 200,
			rotation:  50
		}));
	}

	onMount(() => {
		const handleMouseMove = (event: MouseEvent) => {
			moveX = event.clientX;
			moveY = event.clientY;
			visibleStickers = visibleStickers.map((sticker, index) => {
				// add slight variation per sticker based on its index
				const variationX = (index % 3) * 0.01 + 0.02;
				const variationY = (index % 3) * 0.01 + 0.09;
				return {
					...sticker,
					offsetX: (moveX - window.innerWidth / 2) * Math.random() * variationX,
					offsetY: (moveY - window.innerHeight / 2) * Math.random() * variationY,
					rotation: (Math.random() - 0.5) * 20
				};
			});
		};

		shuffleStickers();

		window.addEventListener('mousemove', handleMouseMove);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};
	});

</script>

{#each  visibleStickers as sticker}
	{#if sticker.type === 'text'}
		<p class="cover-content sticker-label {sticker.id} text" style=" transform: translate({sticker.offsetX || 0}px, {sticker.offsetY || 0}px);--sticker-rotation: {sticker.rotation || 0}deg;">{sticker.content}</p>
	{:else if sticker.type === 'shape'}
		<span class="cover-content sticker-label {sticker.id}" style="transform: translate({sticker.offsetX || 0}px, {sticker.offsetY || 0}px); --sticker-rotation: {sticker.rotation || 0}deg;">
			<img src={sticker.content} alt={sticker.alt}>
		</span>
	{:else}
		<img src={sticker.content} alt={sticker.alt} class="cover-content sticker-label {sticker.id}" style="transform: translate({sticker.offsetX || 0}px, {sticker.offsetY || 0}px); --sticker-rotation: {sticker.rotation || 0}deg;">
	{/if}
{/each}
	<!-- {#key total}
    <p in:fly|global={{duration: 500}}>{total ?? stickerList.length}</p>
	{/key} -->

<style>

	/* sticker styling */

	.cover-content{
		transition: .4s var(--transition-timing) 1s, box-shadow 0s, filter .4s, background-color 0s;

		&:not(.text){
			display: grid;
			place-content: center;
			padding: 0;
		}

		&:nth-child(1){
			position: absolute;
			text-shadow: 3px 2px 3px rgba(255,255,255,.2);
			text-shadow: 0px 3px 3px rgba(255,255,255,0.5);
			color: rgba(0, 0, 0, 0.156);
			font-size: clamp(4rem, 15vw, 5rem);
			bottom: 5%;
			right: 5%;
		}

		&.hero2{
			--sticker-color: hsl(201, 100%, 59%);
			--sticker-width: 30cqw;
			--sticker-height: 20cqh;
			--sticker-rotation: -0.6deg;
			position: relative;
			z-index: 0;
			font-size: clamp(1rem, 15vw, 1.2rem);
		}
		&.chris-icon{
			--sticker-color: hsla(84, 75%, 50%, 0.897);
			--sticker-width: 8rem;
			--sticker-height: 8rem;
			--sticker-rotation: -15deg;
			display: grid;
			place-content: center;
			border-radius: 50%;
			outline: 1.5px inset color-mix(in oklab, var(--sticker-color) 10% , rgba(0, 0, 0, 0.707) );
			top: 30%;
			left: 3%;

			@supports (corner-shape: superellipse(0)){
				&{
					corner-shape: scoop;
				}
			}
		}
		&.triangle{
			--sticker-color: hsla(61, 75%, 50%, 0.945);
			--sticker-width: 8rem;
			--sticker-height: 8rem;
			--sticker-rotation: 12deg;
			--sticker-top: 20%;
			left: 23%;
			font-size: 1.2rem;
			outline: 8px solid color-mix(in oklab, var(--sticker-color) 80% , rgba(0, 0, 0, 0.579) );
			outline-offset: -5px;
			outline-style: double ;

			@supports (corner-shape: superellipse(0)){
				&{corner-shape: superellipse(0.2);}
			}
		}
		&.hero{
			--sticker-color: hsla(0, 75%, 50%, 0);
			--sticker-width: 10rem;
			--sticker-height: 9rem;
			--sticker-rotation: -0deg;
			--sticker-top: 68%;
			left: 5%;
			opacity: 0;
			/* filter: drop-shadow(.5px .5px 1px black); */

		}
		&.in-progress{
			--sticker-color: hsla(0, 75%, 50%, 0);
			--sticker-width: auto;
			--sticker-height: 14rem;
			--sticker-rotation: 7deg;
			--sticker-top: 6%;
			left: 5%;
			/* filter: drop-shadow(.5px .5px 1px black); */
			z-index: 2;
		}
		&.flag{
			--sticker-color: hsla(0, 75%, 50%, 0);
			--sticker-width: auto;
			--sticker-height: 6rem;
			--sticker-rotation: 3deg;
			--sticker-top:-4%;
			right: 5%;
			/* filter: drop-shadow(.5px .5px 1px black); */
		}
		&.vue{
			--sticker-color: hsla(0, 75%, 50%, 0);
			--sticker-width: auto;
			--sticker-height: 6rem;
			--sticker-rotation: -6deg;
			--sticker-top: 43%;
			left: 12%;
			/* filter: drop-shadow(.5px .5px 1px black); */
		}
		&.svelte{
			--sticker-color: hsla(0, 75%, 50%, 0);
			--sticker-width: auto;
			--sticker-height: 7rem;
			--sticker-rotation: -6deg;
			--sticker-top: 48%;
			left: 15%;
			/* filter: drop-shadow(.5px .5px 1px black); */
		}
		&.JS{
			--sticker-color: hsla(0, 75%, 50%, 0);
			--sticker-width: auto;
			--sticker-height: 6rem;
			--sticker-rotation: -6deg;
			--sticker-top: 58%;
			left: 7%;
			/* filter: drop-shadow(.5px .5px 1px black); */
		}
		&.figma{
			--sticker-color: hsla(0, 75%, 50%, 0);
			--sticker-width: auto;
			--sticker-height: 6rem;
			--sticker-rotation: 6deg;
			--sticker-top: 65%;
			left: 35%;
		}
		&.c-name{
			--sticker-color: hsla(0, 75%, 50%, 0);
			--sticker-width: auto;
			--sticker-height: 2rem;
			--sticker-rotation: -0deg;
			--sticker-top: auto;
			bottom: 15%;
			right: 7%;
			opacity: .2;
		}
		&.pixel-c{
			--sticker-color: hsla(0, 75%, 50%, 0);
			--sticker-width: auto;
			--sticker-height: 12rem;
			--sticker-rotation: -0deg;
			--sticker-top: auto;
			bottom: 0;
			left: 0%;
			/* opacity: 0; */
		}
	}

	/* //////////////// */
	/* utility classes */
	/* /////////////// */

	.sticker-label{
		--sticker-shadow-color: color-mix(in oklab, var(--tritary-color) 30% , rgba(21, 20, 20, 0.501) 80% );
		--sticker-shadow-color2: color-mix(in oklab, var(--tritary-color) 60% , rgba(21, 20, 20, 0.216) 50% );

		position: absolute;
		font-size: 1rem;
		font-weight: lighter;
		color: color-mix(in oklch, rgb(0, 0, 0), var(--sticker-color,transparent) 10%);
		background-color: var(--sticker-color);
		border-radius: 15px;
		padding: 3ex 2ex;
		margin: 10px 30px;
		min-width: var(--sticker-width, 30cqw);
		min-height: var(--sticker-height, 20cqh);
		height: var(--sticker-height, 20cqh);
		top: var(--sticker-top, 5%);
		transform: rotate(var(--sticker-rotation, 0deg));
		transform-origin: top center;
		filter: drop-shadow(.5px .5px 1px var(--sticker-shadow-color)) drop-shadow(.5px 12px 10px var(--sticker-shadow-color2));
		opacity: .88;
		/* filter: drop-shadow(.5px 12px 10px var(--sticker-shadow-color)); */
		/* filter: drop-shadow(.5px .5px 1px black); */



			@supports (corner-shape: superellipse(0)){
				&{
					corner-shape: superellipse(3);
				}
			}
	}




</style>
