<script lang=ts>
	import { menuOpen } from '$lib/store';
	let open = $state()
	interface Props {
		children?: () => import('svelte').Snippet<[]>; 
	}

	function handleViewTransition(callback: () => void) {
		if (!document.startViewTransition) {
			// Fallback for browsers that don't support View Transitions
			callback();
			return;
		}
		
		// Start a view transition
		document.startViewTransition(callback);
	}

	function dropMenu()  {
		handleViewTransition(() => {
			menuOpen.set(true);
		})
	}

	function menuClose(){
		handleViewTransition(() => {
			menuOpen.set(false);
		})
	}

	$effect(() => {
		// This will automatically track menuOpen changes
		open = $menuOpen;
	})

</script>

<header class={open == false?'down':''}>
	<ul class="headerUl">
		<li>
			<a href="/">
				{#if open == false}
					<figure class="profile profile-2 flower" >
						<img src="./25acb22a-22a3-41d5-a0eb-c91529c4c6c8.jpg" alt="icon of me" width="10" height="10">
					</figure>
				{/if}
			</a>
		</li>
		<li class="D-menu">
			{#if open == false}
				<button class="openMenuBtn" onmouseup={dropMenu}>menu</button>
			{:else}
				<button class="closeBtn" onmouseup={menuClose} onkeypress={menuClose}>close menu</button>
			{/if}
		</li>
		<li class="head-extra">
			{#if open == false}
			<div><a href="/contact">Contact</a></div>
			{/if}
			<button class="dark-mode">darkmode toggle</button>
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
		background-color: white;
		z-index: 200;
		container-type: inline-size;
		container-name: header;
	}

	header ul{
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 100%;
		justify-content: space-between;
	}

	header li{
		justify-content: center;
	}

	/* face icon section */
	header li:nth-of-type(1){
		aspect-ratio: 1;
	}

	header figure  {
		flex: 0 1 auto;
		position: relative;
		width: 100%;
		height: 100%;
		view-transition-name: header-figure;
		isolation: isolate;

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
			view-transition-name: header-figure;
			
			@starting-style{
				translate: 0 -16vw;
			}

			&:hover{
				rotate: 25deg;
				transition: 12s;
			}
		}
	}

	/* menu button section */
	header li:nth-of-type(2).D-menu{
		flex: 0 0 10%;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 15px;
		background-color: color-mix(in srgb,#2C5D98 , rgba(255, 255, 255, 0.466) 80% );
		transition: .6s ease-out;
		z-index: 200;
	}

	header:hover li:nth-of-type(2).D-menu:hover{
		background-color: color-mix(in srgb, var(--hoverC,#2C5D98) , rgba(255, 255, 255, 0.466) 30% );
	}

	header  li:nth-of-type(2).D-menu button{
		position: relative;
		background: none;
		border: none;
		width: 100%;
		height: 100%;

		&::after{
			content: '';
			position: absolute;
			inset-inline: -15%;
			inset-block: 0 -58%;
			border-radius:15px;

		}
	}

	header  li:nth-of-type(2) button:active{
		scale: .95;
	}

	:global(main:has(button.closeBtn:is(:active,:focus-within)) article.active) {
		height: calc(var(--H-menu) + 12px);
		transition: .4s cubic-bezier(0.375, 0.685, 0.32, 1.275);
	}

	/* :global(main:has(button.openMenuBtn:is(:active,:focus-within)) article.close) {
		translate: 0 -45vh !important;
		filter: blur(1px);
		transition: translate .8s 1s !important ;
	} */

	header li:nth-of-type(3) {
		flex: 0 1 10%;
		flex-wrap: nowrap;
		height: 100%;
		align-items: center;
	}


	header .head-extra{
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
	}

	header .head-extra .dark-mode{
		view-transition-name: darkmode;
	}

	.down{
		box-shadow: 0 10px 5px -10px rgba(0, 0, 0, 0.278);
	}

	@keyframes sway {
		50%{rotate: 15deg;}
	}

</style>