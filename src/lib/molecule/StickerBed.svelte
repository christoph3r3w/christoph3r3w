<script lang="ts">
	import { onMount, tick } from 'svelte'
	import { firstLoad } from '$lib/store';
	import { elasticOut } from 'svelte/easing';

	interface Props {
		total?: number;
		patern?: 'random' | 'grid';
	}

	interface StickerListItem {
		id: string;
		content: string;
		type: 'image' | 'text' | 'shape' | 'svg';
		alt?: string;
		visible: boolean;
		canMove: boolean;
		offsetX?: number;
		offsetY?: number;
		rotation?: number;
	}

	let { total, patern }: Props = $props();

	let stickerList: StickerListItem[] = [
		{
			id: 'hero',
			visible: false,
			content: '/stickers/stickerrr-light.avif',
			type: 'image',
			alt: 'tutorial sticker',
			canMove: true
		},
		{
			id: 'chris-icon',
			visible: false,
			content: '/chris icon lowlowres.avif',
			type: 'shape',
			alt: 'chris icon',
			canMove: true
		},
		{
			id: 'hero2',
			visible: false,
			content: 'Here are some selected projects I have done',
			type: 'text',
			canMove: true
		},
		{
			id: 'triangle',
			visible: false,
			content: 'In progress',
			type: 'text',
			alt: 'in progress',
			canMove: true
		},
		{
			id: 'pixel-c',
			visible: true,
			content: 'https://res.cloudinary.com/dkemfwmvh/image/upload/f_auto,q_auto/c-icon-pixeled_pedsph?_a=BAMAPqhK0',
			type: 'image',
			alt: 'pixel sticker',
			canMove: true
		},
		{
			id: 'flag',
			visible: false,
			content: 'https://res.cloudinary.com/dkemfwmvh/image/upload/f_auto,q_auto/korsou_sticker_couv62?_a=BAMAPqhK0',
			type: 'image',
			alt: 'tutorial sticker',
			canMove: true
		},
		{
			id: 'vue',
			visible: true,
			content: 'https://res.cloudinary.com/dkemfwmvh/image/upload/f_auto,q_auto/vue_jbfvmb?_a=BAMAPqhK0',
			type: 'image',
			alt: 'tutorial sticker',
			canMove: true
		},
		{
			id: 'nextJs',
			visible: true,
			content: '/stickers/nextjs-icon-svgrepo-com.svg',
			type: 'image',
			alt: 'next sticker',
			canMove: true
		},
		{
			id: 'JS',
			visible: true,
			content: 'https://res.cloudinary.com/dkemfwmvh/image/upload/js_sticker_2_egl5je?_a=BAMAPqhK0',
			type: 'image',
			alt: 'tutorial sticker',
			canMove: true
		},
		{
			id: 'figma',
			visible: true,
			content: 'https://res.cloudinary.com/dkemfwmvh/image/upload/f_auto,q_auto/figma_sticker_jkhxt7?_a=BAMAPqhK0',
			type: 'image',
			alt: 'tutorial sticker',
			canMove: true
		},
		{
			id: 'svelte',
			visible: true,
			content: 'https://res.cloudinary.com/dkemfwmvh/image/upload/f_auto,q_auto/svelte_kzwxx3?_a=BAMAPqhK0',
			type: 'image',
			alt: 'tutorial sticker',
			canMove: true
		},
		{
			id: 'c-name',
			visible: true,
			content: 'https://res.cloudinary.com/dkemfwmvh/image/upload/f_auto,q_auto/c-name_free_oknivz?_a=BAMAPqhK0',
			type: 'image',
			alt: 'tutorial sticker',
			canMove: false
		},
		{
			id: 'c-pixel-icon',
			visible: true,
			content: 'https://res.cloudinary.com/dkemfwmvh/image/upload/f_auto,q_auto/c-icon-pixeled_pedsph?_a=BAMAPqhK0',
			type: 'image',
			alt: 'c-pixel-icon',
			canMove: false
		},
		{
			id: 'in-progress clear',
			visible: true,
			content: 'https://res.cloudinary.com/dkemfwmvh/image/upload/f_auto,q_auto/in_progresss-texture-clear_croc0l?_a=BAMAPqhK0',
			type: 'image',
			alt: 'in progress',
			canMove: true
		},
		{
			id: 'in-progress',
			visible: true,
			content: 'https://res.cloudinary.com/dkemfwmvh/image/upload/f_auto,q_auto/in_progress-texture_ahgqwn?_a=BAMAPqhK0',
			type: 'image',
			alt: 'tutorial sticker',
			canMove: true
		},
		{
			id: 'A11y',
			visible: true,
			content: '/stickers/idCZJhQ0tS_1778840910867.svg',
			type: 'svg',
			alt: 'A11y-sticker',
			canMove: true
		},
		{
			id: 'Cc',
			visible: true,
			content:'/stickers/closed-caption.svg',
			type: 'svg',
			alt: 'Cc-sticker',
			canMove: true
		}
	];

	let visibleStickers = $derived(
		stickerList.filter((sticker) => sticker.visible).slice(0, total !== undefined ? total : stickerList.length)
	);
	let moveX = $state(0);
	let moveY = $state(0);
	let rotate = $state(0);

	function shuffleStickers() {
		visibleStickers = visibleStickers.map((sticker) => ({
			...sticker,
			...(sticker.canMove
				? {
						offsetX: (Math.random() - 0.6) * 120,
						offsetY: (Math.random() - 0.5) * 70,
						rotation: 50 * (Math.random() - 0.5)
					}
				: {})
		}));
	}

	function stick(
		node: HTMLElement,
		params: { delay?: number; duration?: number; easing?: (t: number) => number; sticker?: any }
		) {

		if ($firstLoad == true) {
			return { delay: 0, duration: 0, css: () => 'display: none; opacity: 0;' };
		}

		const existingTransform = getComputedStyle(node).transform.replace('none', '');
		const sticker = (params as any)?.sticker;
		tick()
		return {
			delay: params.delay || 0,
			duration: params.duration || 400,
			easing: params.easing || elasticOut,
			css: (t: any, u: any) =>
				`
				display: block;
				opacity: ${t * 0.6};
				blur: ${u * 10}px;	
				filter: saturate(0.3);
				scale: 1.1;
				border:red solid 1px;
				${(() => {
					const extra = `translate(${sticker?.offsetX || 0}px, ${sticker?.offsetY || 0}px) rotate(${sticker?.rotation || 0}deg)`;
					return `transform: ${existingTransform ? existingTransform + ' ' : ''}${extra} translate(0, ${u * 3}rem) rotate(${u * 4}deg);`;
				})()}
			`
		};
	}

	onMount(() => {
		tick()
		// const handleMouseMove = (event: MouseEvent) => {
		// 	moveX = event.clientX;
		// 	moveY = event.clientY;
		// 	visibleStickers = visibleStickers.map((sticker, index) => {
		// 		// add slight variation per sticker based on its index
		// 		const variationX = (index % 3) * 0.01 + 0.02;
		// 		const variationY = (index % 3) * 0.01 + 0.09;
		// 		return {
		// 			...sticker,
		// 			offsetX: (moveX - window.innerWidth / 2) * Math.random() * variationX,
		// 			offsetY: (moveY - window.innerHeight / 2) * Math.random() * variationY,
		// 			rotation: (Math.random() - 0.5) * 20
		// 		};
		// 	});
		// };

		shuffleStickers();

		// window.addEventListener('mousemove', handleMouseMove);

		return () => {
			// window.removeEventListener('mousemove', handleMouseMove);
		};
	});
</script>

<svelte:head>
	{#each visibleStickers as sticker}
		{#if (sticker.type === 'image' || sticker.type === 'shape') && sticker.visible === true}
			<link rel="preload" fetchpriority="high" as="image" href={sticker.content} />
		{/if}
	{/each}
</svelte:head>

<!-- for later add a patern option, it will toggle a pattern based on a selected sticker or all in a specific grid area -->
{#key total}
	{#each visibleStickers as sticker}
		{#if sticker.type === 'text'}
			<p
				class="cover-content sticker-label {sticker.id} text"
				in:stick={{ duration: 800}}
				style=" transform: translate({sticker.offsetX || 0}px, {sticker.offsetY ||
					0}px) rotate({sticker.rotation || 0}deg);"
			>
				{sticker.content}
			</p>
		{:else if sticker.type === 'shape'}
			<span
				class="cover-content sticker-label {sticker.id}"
				in:stick={{ duration: 800}}
				style="transform: translate({sticker.offsetX || 0}px, {sticker.offsetY ||
					0}px) rotate({sticker.rotation || 0}deg);"
			>
				<img src={sticker.content} alt={sticker.alt} loading="eager" />
			</span>
			{:else if sticker.type === 'svg'}
				<div	class="cover-content sticker-label {sticker.id}"
					in:stick={{ duration: 800}}
					style="transform: translate({sticker.offsetX || 0}px, {sticker.offsetY ||
						0}px) rotate({sticker.rotation || 0}deg);"
				>
					<svg 
					width="90" 
					height="90"
					style="transform: translate({sticker.offsetX || 0}px, {sticker.offsetY ||
						0}px) rotate({sticker.rotation || 0}deg);">   
					    
						<image xlink:href={sticker.content} />    
					</svg>
				</div>
				
		{:else}
			<img
				src={sticker.content}
				alt={sticker.alt}
				class="cover-content sticker-label {sticker.id}"
				in:stick={{ duration: 800}}
				style="transform: translate({sticker.offsetX || 0}px, {sticker.offsetY ||
					0}px) rotate({sticker.rotation || 0}deg);"
			/>
		{/if}
	{/each}

{/key}

<style>
	.cover-content {
		transition:
			0.4s var(--transition-timing) 1s,
			box-shadow 0s,
			filter 0.4s,
			background-color 0s;

		&:not(.text) {
			display: grid;
			place-content: center;
			padding: 0;
		}

		&:nth-child(1) {
			position: absolute;
			text-shadow: 3px 2px 3px rgba(255, 255, 255, 0.2);
			text-shadow: 0px 3px 3px rgba(255, 255, 255, 0.5);
			color: rgba(0, 0, 0, 0.156);
			font-size: clamp(4rem, 15vw, 5rem);
			bottom: 5%;
			right: 5%;
		}
		&.hero2 {
			--sticker-color: hsl(201, 100%, 59%);
			--sticker-width: 30cqw;
			--sticker-height: 20cqh;
			--sticker-rotation: -0.6deg;
			position: relative;
			z-index: 0;
			font-size: clamp(1rem, 15vw, 1.2rem);
		}
		&.chris-icon {
			--sticker-color: hsla(84, 75%, 50%, 0.897);
			--sticker-width: 8rem;
			--sticker-height: 8rem;
			--sticker-rotation: -15deg;
			display: grid;
			place-content: center;
			border-radius: 50%;
			outline: 1.5px inset color-mix(in oklab, var(--sticker-color) 10%, rgba(0, 0, 0, 0.707));
			top: 30%;
			left: 3%;

			@supports (corner-shape: superellipse(0)) {
				& {
					corner-shape: scoop;
				}
			}
		}
		&.triangle {
			--sticker-color: hsla(61, 75%, 50%, 0.945);
			--sticker-width: 8rem;
			--sticker-height: 8rem;
			--sticker-rotation: 12deg;
			--sticker-top: 20%;
			left: 23%;
			font-size: 1.2rem;
			outline: 8px solid color-mix(in oklab, var(--sticker-color) 80%, rgba(0, 0, 0, 0.579));
			outline-offset: -5px;
			outline-style: double;

			@supports (corner-shape: superellipse(0)) {
				& {
					corner-shape: superellipse(0.2);
				}
			}
		}
		&.hero {
			--sticker-color: hsla(0, 75%, 50%, 0);
			--sticker-width: 10rem;
			--sticker-height: 9rem;
			--sticker-rotation: -0deg;
			--sticker-top: 68%;
			left: 5%;
			opacity: 0;
			/* filter: drop-shadow(.5px .5px 1px black); */
		}
		&.in-progress {
			--sticker-color: hsla(0, 75%, 50%, 0);
			--sticker-width: auto;
			--sticker-height: 10rem;
			--sticker-rotation: 7deg;
			--sticker-top: 6%;
			left: 5%;
			/* filter: drop-shadow(.5px .5px 1px black); */
			z-index: 0;
		}
		&.clear {
			--sticker-color: hsla(0, 75%, 50%, 0);
			--sticker-width: auto;
			--sticker-height: 10rem;
			--sticker-rotation: 307deg !important;
			--sticker-top: auto;
			rotate: 119deg !important;
			left: auto;
			right: 28%;
			bottom: -35%;
			filter: sepia(.2);
			z-index: 0;
		}
		&.flag {
			--sticker-color: hsla(0, 75%, 50%, 0);
			--sticker-width: auto;
			--sticker-height: 6rem;
			--sticker-rotation: 3deg;
			--sticker-top: 0%;
			right: 5%;
			/* filter: drop-shadow(.5px .5px 1px black); */
		}
		&.vue {
			--sticker-color: hsla(0, 75%, 50%, 0);
			--sticker-width: auto;
			--sticker-height: 6rem;
			--sticker-rotation: -6deg;
			--sticker-top: 43%;
			left: 12%;
			/* filter: drop-shadow(.5px .5px 1px black); */
		}
		&.nextJs {
			--sticker-color: hsla(111, 75%, 50%, 0);
			--sticker-width: auto;
			--sticker-height: 3rem;
			--sticker-rotation: -0deg;
			--sticker-top: 40%;
			left: 20%;
			/* filter: drop-shadow(.5px .5px 1px black); */
		}
		&.svelte {
			--sticker-color: hsla(0, 75%, 50%, 0);
			--sticker-width: auto;
			--sticker-height: 9rem;
			--sticker-rotation: -6deg;
			--sticker-top: 48%;
			left: 15%;
			/* filter: drop-shadow(.5px .5px 1px black); */
		}
		&.JS {
			--sticker-color: hsla(0, 75%, 50%, 0);
			--sticker-width: auto;
			--sticker-height: 8rem;
			--sticker-rotation: -6deg;
			--sticker-top: 3%;
			/* left: 7%; */
			right: 5%;

			/* filter: drop-shadow(.5px .5px 1px black); */
		}
		&.figma {
			--sticker-color: hsla(0, 75%, 50%, 0);
			--sticker-width: auto;
			--sticker-height: 6rem;
			--sticker-rotation: 6deg;
			--sticker-top: 65%;
			left: 35%;
		}
		&.c-name {
			--sticker-color: hsla(0, 75%, 50%, 0);
			--sticker-width: auto;
			--sticker-height: 2rem;
			--sticker-rotation: -0deg;
			--sticker-top: auto;
			bottom: 15%;
			right: 7%;
			opacity: 0.2;
		}
		&.pixel-c {
			--sticker-color: hsla(0, 75%, 50%, 0);
			--sticker-width: auto;
			--sticker-height: 2rem;
			--sticker-rotation: 50deg;
			--sticker-top: auto;
			rotate: 50deg;
			bottom: 40%;
			left: 90%;
		}
		&.c-pixel-icon {
			--sticker-color: hsla(0, 75%, 50%, 0);
			--sticker-width: auto;
			--sticker-height: 2rem;
			--sticker-rotation: -0deg;
			--sticker-top: auto;
			bottom: 0%;
			left: 0%;
		}
		&.A11y {
			--sticker-color: hsla(0, 75%, 50%, 0);
			--sticker-width: auto;
			--sticker-height: 2rem;
			--sticker-rotation: -0deg;
			--sticker-top: auto;
			top: 19%;
			right: 8%;
		}
		&.Cc {
			--sticker-color: hsla(0, 75%, 50%, 0);
			--sticker-width: auto;
			--sticker-height: 3rem;
			--sticker-rotation: -0deg;
			--sticker-top: auto;
			top: 25%;
			right: 8%;
		}
	}

	/* //////////////// */
	/* utility classes */
	/* /////////////// */

	.sticker-label {
		--sticker-shadow-color: color-mix(
			in oklab,
			var(--tritary-color) 30%,
			rgba(21, 20, 20, 0.501) 80%
		);
		--sticker-shadow-color2: color-mix(
			in oklab,
			var(--tritary-color) 60%,
			rgba(21, 20, 20, 0.216) 50%
		);

		position: absolute;
		font-size: 1rem;
		font-weight: lighter;
		color: color-mix(in var(--color-space), rgb(0, 0, 0), var(--sticker-color, transparent) 10%);
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
		filter: drop-shadow(0.5px 0.5px 1px var(--sticker-shadow-color))
			drop-shadow(0.5px 12px 10px var(--sticker-shadow-color2));
		opacity: 0.88;
		/* filter: drop-shadow(.5px 12px 10px var(--sticker-shadow-color)); */
		/* filter: drop-shadow(.5px .5px 1px black); */

		@supports (corner-shape: superellipse(0)) {
			& {
				corner-shape: superellipse(3);
			}
		}
	}
</style>
