<script lang="ts">
	import {Header, Footer, Window,Menu} from '$lib';
	let {children} = $props();

</script>

<Window role='window' color='#d5d5d5e7'>
	<Header />
	<Menu />
	{@render children()}
</Window>

<Footer class='ftr'/>

<noscript>
  <div class="noscript-notice">
    Note: JavaScript is disabled. For the best experience, please enable JavaScript.
  </div>
</noscript>

<style>

	:root{
		--H-top:5cqh;
		--Padding-genral:2cqh;
		--primary-gray: #d5d5d5e7;
	}

	:global(body){
		display: flex;
		flex-direction: column;
		height: 100lvh;
		overflow: hidden;
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
	}

	:global(main.contain){
		background-color: var(--primary-gray);
		/* height: 500vh; */
	}

	:global(footer){
		display: block;
		background-color: rgba(0, 128, 0, 0);
		flex: 0 1 auto;
		padding-inline: var(--Padding-genral);
		display: none;
	}

	.noscript-notice {
		position: fixed;
		top: 5%;
		left: 0;
		right: 0;
		background: #ffeb3b;
		color: black;
		text-align: center;
		padding: 0.5rem;
		z-index: 1000;
	}

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

</style>