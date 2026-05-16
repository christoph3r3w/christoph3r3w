<script lang="ts">
	import { Header, Window, Menu2} from '$lib';
	import {setup} from '$lib/atoms/themeToggleFn.svelte';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		setup();
	});
</script>

<svelte:head>
	<link rel="preload" fetchpriority="high" as="image" href="/cuttingmat55-33-2.svg" />
</svelte:head>


<Window role="window" styleOn="">
	<Header />
	<Menu2 />
	{@render children()}
</Window>

<style>
	:root {
		--H-top: 5cqh;
		--Padding-genral: 2cqh;
		/* --primary-gray: #d5d5d5e7; */
		/* --primary-gray: #ebe9db; */
		--primary-gray: var(--color-bg,  #ebe9db);
		--color-space: oklch
	}

	:global(html) {
		height: 100lvh;
	}

	:global(body) {
		display: flex;
		flex-direction: column;
		height: 100lvh;
		padding-top: calc(0 - env(titlebar-area-width));
		padding-top: calc(0 - env(safe-area-inset-top));
		padding-bottom: calc(0 - env(safe-area-inset-bottom));
		padding-bottom: calc(0 - env(titlebar-area-y, 40px));
		overflow: hidden;
		touch-action: none;
	}

	:global(body :nth-child(n):focus-visible){
		border-color: #ffe91e;
		outline-color: #ffe91e;
		background-color: #ffe91e;
	}	

	:global(header) {
		padding-inline: var(--Padding-genral);
		padding-block: 0.5%;
	}

	:global(main) {
		flex: 1 ;
		display: flex;
		flex-direction: column;
		margin: 0;
		padding: 0;
		overflow: hidden;
		background-attachment: fixed, fixed;
		background:
			url('/cuttingmat55-33-2.svg'),
			radial-gradient(circle, rgba(42, 123, 155, 0) 69%, var(--color-bg) 100%);
		background-size: cover, cover;
		background-repeat: no-repeat;
		background-position: center, center;
		background-blend-mode: color-dodge;
		&::after {
			content: '';
			position: fixed;
			inset: 0;
			background: radial-gradient(circle, rgba(42, 123, 155, 0) 82%, var(--color-bg) 100%);
			pointer-events: none;
			z-index: -1;
		}
	}

	:global(main.contain) {
		background-color: var(--primary-gray);
	}



	@media (width < 900px) {
		:global(html) {
			height: 100lvh;
		}

		:global(body) {
			min-height: 100lvh;
			min-height: calc(100lvh - env(safe-area-inset-top, 40px));
		}
		
		:global(main::after) {
			content: none;
			display: none;
		}

		:global(footer) {
			display: none;
		}
	}

	@media (height < 350px) {
		:global(body::after) {
			content: 'oops, screen is too small';
			position: fixed;
			inset: 0;
			backdrop-filter: blur(10px);
			display: grid;
			place-content: center;
			font-size: 2rem;
			z-index: 200;
		}
	}
</style>
