<script lang="ts">
	import {Header, Footer, Window,Menu,Menu2,StickerBed,CuttingBoard} from '$lib';
	let svg = CuttingBoard

	let {children} = $props();
</script>

<Window role='window' styleOn="">
	<Header />
	<Menu2 />
	<!-- <section>
		<StickerBed />
	</section> -->
	<!-- <CuttingBoard/> -->
	{@render children()}
</Window>
<Footer class='ftr'/>


<style>

	:root{
		/* color-scheme: light dark; */
		--H-top:5cqh;
		--Padding-genral:2cqh;
		--primary-gray: #d5d5d5e7;
		/* --primary-gray: rgb(235, 233, 219); */
		--primary-gray: var(--color-bg);
	}

	:global(body){
		display: flex;
		flex-direction: column;
		height: 100lvh;
		overflow: hidden;
		touch-action: none;
	}

	/* :global(body :nth-child(n):focus-visible){
		border: solid rgba(255, 140, 0, 0.815);
	}	 */

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
		background-attachment: fixed, fixed;
		background:url('cuttingmat55-33-2.svg'),
		radial-gradient(circle,rgba(42, 123, 155, 0) 62%, var(--color-bg) 100%) ;
		background-size: cover, cover;
		background-repeat: no-repeat;
		background-position: center, center;
		background-blend-mode:color-dodge;
		 &::after{
			/* content: ""; */
			position: fixed;
			inset: 0;
			background:	radial-gradient(circle,rgba(42, 123, 155, 0) 62%, var(--color-bg) 100%) ;
			pointer-events: none;
			z-index: -1;
		}
	}

	:global(main.contain){
		background-color: var(--primary-gray);
		/* height: 500vh; */
	}

	:global(footer){
		display: block;
		flex: 0 1 auto;
		padding-inline: var(--Padding-genral);
		/* background-color: rgba(0, 128, 0, 0); */
		display: none;
	}

	/* .noscript-notice {
		position: fixed;
		bottom: 5%;
		left: 0;
		right: 0;
		background: #ffeb3b;
		color: black;
		text-align: center;
		padding: 0.5rem;
		z-index: 1000;
	} */

	@media (width < 900px) {
		:global(html){
			height: 100lvh;
		}

		:global(body){
			height: 100lvh;
		}
		
		:global(footer){
			display: none;
		}
	}

	@media (height < 350px) {

		:global(body::after){
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