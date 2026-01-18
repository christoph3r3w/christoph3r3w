<script lang="ts">
	import {Header, Footer, Window,Menu} from '$lib';
	let {children} = $props();
	// import { gsap } from "gsap"

</script>

<Window role='window' >
	<Header />
	<Menu />
	{@render children()}
</Window>

<Footer class='ftr'/>

<noscript>
  <div class="noscript-notice">
    Note: JavaScript is disabled. Basic navigation functionality is available, but for the best experience, please enable JavaScript.
  </div>
</noscript>

<style>

	:root{
		--H-top:5cqh;
		--Padding-genral:2cqh;
	}

	:global(body){
		display: flex;
		flex-direction: column;
		height: 100dvh;
		overflow: hidden;
	}

	:global(body :nth-child(n):focus-visible){
		/* background-color: red !important; */
		/* outline: solid rgb(30, 255, 0) !important; */
		/* border: solid rgb(93, 0, 255); */
	}

	:global(header){
		padding-inline: var(--Padding-genral);
		padding-block: .5%;
	}


	:global(main){
		flex: 1 !important;
		display: flex;
		flex-direction: column;
		margin: 0;
		padding: 0;
		overflow: hidden;
	}


	:global(main.contain){
		background-color: rgba(213, 213, 213, 0.904) ;
		/* height: 500vh; */
	}

	:global(.mainContain){
		/* padding-inline: var(--Padding-genral); */
		/* margin: var(--Padding-genral); */

	}

	:global(footer){
		display: block;
		background-color: rgba(0, 128, 0, 0);
		flex: 0 1 auto;
		padding-inline: var(--Padding-genral);

	}

	.noscript-notice {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		background: #ffeb3b;
		color: black;
		text-align: center;
		padding: 0.5rem;
		z-index: 1000;
	}

	@media (width < 900px) {
		:global(footer){
			display: none;
		}
	}

</style>