<script lang=ts>
	import Menu from '$lib/molecule/Menu.svelte';
	import { menuOpen } from '$lib/store';
	let open = $state()
	interface Props {
		children?: () => import('svelte').Snippet<[]>; 
	}

	function dropMenu()  {
		document.startViewTransition(function() {
			menuOpen.set(true);
		})
	}

	$effect(()=>{
		   $: menuOpen.subscribe(value => {
			open = value
		});
	})

</script>

<header class={open == false?'down':''}>
	<ul class="headerUl">
		<li>
			<a href="/">
				
				{#if open == false}
					<figure class="profile profile-2 flower" >
						<img src="./25acb22a-22a3-41d5-a0eb-c91529c4c6c8.jpg" alt="icon of me">
					</figure>
				{/if}
			</a>
		</li>
			{#if open == false}
				<li><button onclick={dropMenu}>menu</button></li>
			{/if}
		<li class="head-extra">
			{#if open == false}
			<div><a href="/contact">Contact</a></div>
			{/if}
			<div>darkmode toggle</div>
		</li>
	</ul>
</header>

<style>
	header{
		position: relative;
		display: flex;
		flex-direction: column;
		width: 100%;
		height: var(--H-top, fit-content);
		/* height: fit-content; */
		background-color: white;
		z-index: 20;
		container-type: inline-size;
		container-name: header;

	}

	header ul{
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 100%;
		justify-content: space-between;
		
		/* outline: 1px solid ; */
	}

	header li:nth-of-type(1){
		aspect-ratio: 1;
	}

	header figure  {

	
		flex: 0 1 auto;
		position: relative;
		width: 100%;
		height: 100%;
		view-transition-name: header-figure;

		@starting-style{
			flex: 0 1 auto;
			position: relative;
			width: 100%;
			height: 100%;

		}


		& img{

			aspect-ratio: 1;
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: center;

		@starting-style{
			aspect-ratio: 1;
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: center;

		}

		}

		&.flower{
		
			--g:/25.486% 25.486% radial-gradient(#000 calc(69% - 1px),#0000 73%) no-repeat;
			mask: 100% 50% var(--g),88.302% 82.139% var(--g),58.682% 99.24% var(--g),25% 93.301% var(--g),3.015% 67.101% var(--g),3.015% 32.899% var(--g),25% 6.699% var(--g),58.682% 0.76% var(--g),88.302% 17.861% var(--g),radial-gradient(100% 100%,#000 35.01%,#0000 calc(35.01% + 1px));
			scale: 1;
			transition: .5s cubic-bezier(0.375, 0.585, 0.12, 1.091) ;
			animation: sway 10s linear infinite 5s both ;
			
			@starting-style{
				translate: 0 -16vw;

			}

			&:hover{
				rotate: 25deg;
				transition: 12s;
			}
	}


	}

	header .head-extra{
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
	}



	.down{
		box-shadow: 0 10px 5px -10px rgba(0, 0, 0, 0.278);
	}

	@keyframes sway {
		50%{
			rotate: 15deg;

		}
	}

	@container header (width < 400px) {

		/* header{
			height: 100dvh;
		} */

	}


	


</style>