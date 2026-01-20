<script lang=ts>
	import { menuOpen } from '$lib/store';
	let open = $state()
	let dark = $state(true)

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

	function handleDarkMode(){
		dark = !dark
		console.log(dark)
	}

	$effect(() => {
		open = $menuOpen;
	})

</script>

<header class={open == false?'down':''}>
	<ul class="headerUl">
		<li class="header-logo">
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
				<button class="openMenuBtn" onmouseup={dropMenu} aria-label="menu button">
					<svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M0.5 12.5L16.5 12.5" stroke="black" stroke-linecap="round"/>
						<path d="M0.5 8.5L16.5 8.5" stroke="black" stroke-linecap="round"/>
						<path d="M0.5 0.5L16.5 0.499999" stroke="black" stroke-linecap="round"/>
						<path d="M0.5 4.5L16.5 4.5" stroke="black" stroke-linecap="round"/>
					</svg>
				</button>
			{:else}
				<button class="closeBtn" onmouseup={menuClose} onkeypress={menuClose}>
					<svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M3.5 12.5L13.5 12.5" stroke="black" stroke-linecap="round"/>
						<path d="M0.5 0.5L16.5 0.499999" stroke="black" stroke-linecap="round"/>
						<path d="M0.5 4.5L16.5 4.5" stroke="black" stroke-linecap="round"/>
					</svg>
				</button>
			{/if}
		</li>
		<li class="head-extra">
			{#if open == false}
			<div><a href="/contact">Contact</a></div>
			{/if}
			<button class="dark-mode" title="darkmode toggle" aria-label="darkmode toggle" onclick={handleDarkMode}>
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M12.133 3C12.136 3 12.14 3 12.143 3C12.462 3 12.6 3.39301 12.36 3.60001C10.679 5.04701 9.755 7.32199 10.226 9.77399C10.749 12.495 12.988 14.566 15.773 14.938C17.532 15.173 19.161 14.728 20.456 13.839C20.719 13.658 21.068 13.897 20.989 14.203C19.885 18.519 15.626 21.595 10.767 20.902C6.73098 20.326 3.54399 17.087 3.06599 13.095C2.81599 11.013 3.28897 9.05101 4.26997 7.42001C5.85997 4.77401 8.78598 3 12.133 3Z" fill="#121212"/>
				</svg>
			</button>
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
		background-color: rgba(230, 239, 250, 0.064);
		z-index: 200;
		container-type: inline-size;
		container-name: header;
	}

	header:is(:not(.down)){
		transition: .5s ease-out;
		background-color: rgba(255, 255, 255, 0.959);

		&:hover .head-extra{
			box-shadow: 0 10px 5px -10px rgba(0, 0, 0, 0);
		}
	}

	/* .down:hover{
		box-shadow: 0 10px 5px -10px rgba(0, 0, 0, 0.278);
	} */

	header:hover{
		transition: .5s ease-out;

		.head-extra{
			background-color: rgba(255, 255, 255, 0.959);
			box-shadow: 0 10px 5px -10px rgba(0, 0, 0, 0.278);
		}

		.header-logo{
			transform: translate(0 , 15%);
			scale: 1.6;
		}
	}

	header:not(:hover){
		ul li:nth-child(n){
			filter:drop-shadow(rgba(105, 98, 63, 0.181) 0px 28px 10px)
		}
	
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
	header li.header-logo{
		aspect-ratio: 1;
		border-radius: 50%;
		transition: .5s ease-out;
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

	header li:nth-of-type(2).D-menu button{
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

		svg path {
			fill: rgb(176, 176, 176);
			stroke: rgb(91, 91, 91);
		}
	}

	header li:nth-of-type(2) button:active{
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
		transition: .5s ease-out;
		border-radius: 15px;
	}

	:global(header .head-extra .dark-mode){
		display:grid;
		place-content: center;
		background-color: transparent;
		border: 1px solid;
		border: none;
		border-radius: 50%;
		cursor: pointer;
		/* view-transition-name: darkmode; */


		svg path{
			fill: yellow;
			stroke: #000;
		}
	}

	

	@keyframes sway {
		50%{rotate: 15deg;}
	}

</style>