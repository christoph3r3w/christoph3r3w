<script lang="ts">
	let {children} = $props();
	import {Header, Footer, Window,Menu} from '$lib';
	// import '../app.css' with { type: "css" };
	
</script>

<Window role='window' >
	<Header />
	<Menu />

	{@render children()}
	
</Window>

<Footer class='ftr'/>


<style>

	:root{
		--H-top:5cqh;
		--Padding-genral:2cqh;
	}

	:global(body){
		display: flex;
		flex-direction: column;
		height: 100dvh;
		overflow-y: hidden;
    	overflow-x: hidden;


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
		overflow-y: hidden;
    	overflow-x: hidden;

	}


	:global(main.contain){
		background-color: rgba(213, 213, 213, 0.904) ;
	}

	:global(.mainContain){
		/* padding-inline: var(--Padding-genral); */
		/* margin: var(--Padding-genral); */

	}

	:global(footer){
		flex: 0 1 auto;
		padding-inline: var(--Padding-genral);

	}

</style>