<script lang="ts">
	import { goto } from '$app/navigation';
	import { menuOpen, contactsOpen, aboutOpen, modeDark } from '$lib/store';
	import { themeList } from '../atoms/theme-list';
	// import {page} from '$app/state'

	interface Props {
		class?: any;
		children?: import('svelte').Snippet<[]>; 
	}

	let openMenu = $derived($menuOpen)
	let openContacts = $derived($contactsOpen)
	let openAbout = $derived($aboutOpen)
	let dark = $state(false)
	let currentThemeIndex = $state(0)
	let {children, class: CLASS, ...props} : Props = $props();


	function handleViewTransition(callback: () => void) {
		if (!document.startViewTransition) {
			// Fallback for browsers that don't support View Transitions
			callback();
			return;
		}
		
		// Start a view transition
		document.startViewTransition(callback);
	}

	function toggleMenu()  {
		if( $contactsOpen == true || $aboutOpen == true){
			contactsOpen.set(false)
			aboutOpen.set(false)
			return
		}
		handleViewTransition(() => {
			menuOpen.set(!$menuOpen);
			contactsOpen.set(false);
			aboutOpen.set(false);
		})
	}

	function toggleContacts(){
		if($menuOpen == true && $contactsOpen == true){
			menuOpen.set(false)
			contactsOpen.set(false)
			return
		}
		handleViewTransition(() => {
			menuOpen.set(true);
			aboutOpen.set(false);
			contactsOpen.set(true);
		})
		return
	}

	function toggleAbout(){
		if($menuOpen == true && $aboutOpen == true){
			menuOpen.set(false)
			aboutOpen.set(false)
			return
		}
		handleViewTransition(() => {
			menuOpen.set(true);
			contactsOpen.set(false);
			aboutOpen.set(true);
		})
		return
	}

	function handleDarkMode(){
		dark = !dark
		modeDark.set(dark)
		const selectedThemeName = dark ? 'dark' : 'reset';
		const selectedTheme = themeList.find((theme) => theme.name === selectedThemeName);

		if (!selectedTheme) {
			return;
		}

		for (const [property, value] of Object.entries(selectedTheme.properties)) {
			document.documentElement.style.setProperty(property, value);
		}
	}

	function handleThemeToggle(){
		if (themeList.length === 0) {
			return;
		}

		const nextIndex = (currentThemeIndex + 1) % themeList.length;
		const nextTheme = themeList[nextIndex];
		currentThemeIndex = nextIndex;

		for (const [property, value] of Object.entries(nextTheme.properties)) {
			document.documentElement.style.setProperty(property, value);
		}

		dark = nextTheme.name === 'dark';
		modeDark.set(dark);
		console.log('Active theme:', nextTheme.name);
	}
</script>

{#snippet footerLogo()}
			<li class="footer-logo">
			<a href="/" data-sveltekit-reload>
				{#if $menuOpen === false}
					<figure class=" flower" >
						<picture>
						{#key openMenu}
							<img src="./25acb22a-22a3-41d5-a0eb-c91529c4c6c8 (Custom).jpg" alt="icon of me" width="10" height="10" loading="lazy">
						{/key}
							<!-- {#if openAbout == true}
								<img src="./photos/2533cde4-1781-47d6-a605-089cc54dfa8e2.JPG" alt="me">
							{:else}
								<img class="" src="./25acb22a-22a3-41d5-a0eb-c91529c4c6c8 (Custom).jpg" alt="icon of my face me">
							{/if} -->
						</picture>
					</figure>
				{/if}
			</a>
		</li>
{/snippet}

{#snippet buttonNav()}
	<li class="D-menu">
		<button onmouseup={toggleContacts}  class="contact-btn">Contact</button>
		<button onmouseup={toggleMenu}  class="menu-btn" aria-label="menu button">
			<svg width="" height="" viewBox="0 0 77 62" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M25 31.25L25 30.75" stroke="black" stroke-width="5" stroke-linecap="round"/>
				<path d="M39 31.25L39 30.75" stroke="black" stroke-width="5" stroke-linecap="round"/>
				<path d="M52 31.25L52 30.75" stroke="#555555"  stroke-width="5" stroke-linecap="round"/>
			</svg>
		</button>
		<button onmouseup={toggleAbout}  class="about-btn">About</button>
		{#if $menuOpen == true}
		<button class="themes icon-btn" title="theme toggle" aria-label="theme toggle" onclick={handleThemeToggle}>
			<svg width="25" height="32" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M19.25 29.75C19.25 31.6065 18.5125 33.387 17.1997 34.6997C15.887 36.0125 14.1065 36.75 12.25 36.75C10.3935 36.75 8.61301 36.0125 7.30025 34.6997C5.9875 33.387 5.25 31.6065 5.25 29.75V8.75C5.25 7.82174 5.61875 6.9315 6.27513 6.27513C6.9315 5.61875 7.82174 5.25 8.75 5.25H15.75C16.6783 5.25 17.5685 5.61875 18.2249 6.27513C18.8812 6.9315 19.25 7.82174 19.25 8.75V29.75Z"  style="stroke-opacity:1;" stroke-width="3" stroke-miterlimit="11.4737"/>
				<path d="M29.225 22.75H33.25C34.1783 22.75 35.0685 23.1187 35.7249 23.7751C36.3812 24.4315 36.75 25.3217 36.75 26.25V33.25C36.75 34.1783 36.3812 35.0685 35.7249 35.7249C35.0685 36.3812 34.1783 36.75 33.25 36.75H12.25"  style="stroke-opacity:1;" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M12.25 29.75H12.2667"  style="stroke-opacity:1;" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M19.2502 14.0001L23.2752 9.97508C23.666 9.58293 24.1304 9.27191 24.6418 9.05991C25.1533 8.8479 25.7015 8.7391 26.2552 8.73975C26.8088 8.7404 27.3568 8.85049 27.8677 9.0637C28.3786 9.2769 28.8423 9.58902 29.2322 9.98208L32.5502 13.3001C32.9537 13.6882 33.2756 14.1532 33.4968 14.6676C33.7181 15.1819 33.8342 15.7353 33.8385 16.2952C33.8427 16.8552 33.7349 17.4103 33.5215 17.9279C33.3081 18.4456 32.9933 18.9153 32.5957 19.3096L17.3252 34.6501"  style="stroke-opacity:1;" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</button>
		{/if}
		<button class="dark-mode icon-btn" title="theme toggle" aria-label="theme toggle" onclick={handleDarkMode} >
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
				<path style="fill:var(--primary-color);" d="M12.133 3C12.136 3 12.14 3 12.143 3C12.462 3 12.6 3.39301 12.36 3.60001C10.679 5.04701 9.755 7.32199 10.226 9.77399C10.749 12.495 12.988 14.566 15.773 14.938C17.532 15.173 19.161 14.728 20.456 13.839C20.719 13.658 21.068 13.897 20.989 14.203C19.885 18.519 15.626 21.595 10.767 20.902C6.73098 20.326 3.54399 17.087 3.06599 13.095C2.81599 11.013 3.28897 9.05101 4.26997 7.42001C5.85997 4.77401 8.78598 3 12.133 3Z" fill="#121212"/>
			</svg>
		</button>
	</li>
{/snippet}

<footer class={$menuOpen === false?'down':''}>
	<ul class="footerUl">
		<!-- {@render footerLogo()} -->
		{@render buttonNav()}
		<li class="foot-extra">
			<noscript>
				<button title="warning" aria-label="warning" interestfor="noscript-notice" >
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-triangle-alert-icon lucide-triangle-alert"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
				</button>
				
				<div id="noscript-notice" class="noscript-notice" popover="hint">
					Note: JavaScript is disabled. For the best experience, please enable JavaScript.
				</div>
			</noscript>
		</li>
	</ul>
</footer>


<style>
	:root{
		--btn-shadow-color: color-mix(in srgb, var(--color-bg,#ffffff), rgba(105, 98, 63, 0.181) 50%);
		--icon-shadow-color: color-mix(in srgb, var(--color-bg,#ffffff), rgba(105, 98, 63, 0.181) 50%);
		--footer-element-shadow: 0 10px 20px -10px rgba(12, 15, 23, 0.378); /* footer-element-shadow → footer-element-shadow */
	}

	footer{ 
		position: fixed;
		bottom: 0;
		/* position: relative; */
		display: flex;
		flex-direction: column;
		width: 100%;
		min-height: var(--H-top, fit-content);
		z-index: 200;
		container-type: inline-size;
		container-name: footer; 
	display: none;
	}

	footer:is(:not(.down)){ 
		transition: .5s ease-out;

		&:hover .foot-extra{ 
			box-shadow: 0 10px 5px -10px rgba(0, 0, 0, 0);
		}
	}

	footer:hover{ 
		transition: .5s ease-out;
	}

	footer ul{ 
		display: flex;
		flex-direction: row;
		width: 100%;
		height: fit-content;

		@container (width < 800px){
			margin-top: 1rem;
		}
	}

	footer li{ 
		position: relative;
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		align-items: center;
		flex:1 3 30%;
		min-height: 4rem;
		width: 100%;
		color: var(--color-text);
	}

	/* //////////////////////// */
	/* logo - face icon section */
	/* //////////////////////// */
	li.footer-logo{ 
		transition: .5s ease-out;
		justify-content: end;
		filter: drop-shadow(var(--icon-shadow-color) 0px 28px 10px);

		@container (width < 800px){
			justify-content: start;
		}
	}

	.footer-logo figure{ 
		flex: 0 1 auto;
		position: relative;
		aspect-ratio: 1;
		width: 100%;
		min-width: 50px;
		max-width: 50px;
		height: 100%;
		max-height: 50px;
		margin-inline: 20px;
		view-transition-name: footer-figure; 

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
			animation: sway 5s linear infinite 15s both ;
			view-transition-name: footer-figure; 

			contain: paint layout;

			@starting-style{
				translate: 0 -16vw;
			}

			&:hover{
				rotate: 25deg;
				transition: 12s;
			}

		}
	}

	/* //////////////////////////////////// */
	/* button menu section - middle section */
	/* //////////////////////////////////// */
	li.D-menu{
		flex: 0 2 fit-content;
		position: relative;
		justify-content:center;		
		transition: .6s ease-out;
		gap: 3rem;
		gap: 1rem;
		padding: 1rem 0;
		height: fit-content;
		width: 19rem;
		z-index: 200;
	}

	/* button styling */
	li.D-menu button{
		--_btn-shadow-color: color-mix(in srgb, var(--color-bg,#ffffff), rgba(65, 60, 39, 0.181) 70%);
		position: relative;
		display: grid;
		place-content: center;
		text-wrap: nowrap;
		padding-inline: 10px;
		border: none;
		border-radius: 25px;
		width: auto;
		height: 3rem;
		font-size: clamp(var(--text-size-s),50dvw - 1rem , 1.3rem );
		line-height: 1rem;
		background-color: color-mix(in srgb,var(--color-bg,#ffffff) , rgba(255, 255, 255, 0.61) 80% );
		filter: drop-shadow(var(--_btn-shadow-color) 0px 28px 10px);
		color:inherit;
		cursor: pointer;
		z-index: 5;

		&::after{
			content: '';
			position: absolute;
			inset-inline: -25%;
			inset-block: 0 -2rem;
			border-radius:15px;
			z-index: -1;
			user-select: none;
		}

		svg path{
			fill: transparent;
			stroke: var(--color-text,#000000);	
		}
	}

	/* button.menu-btn{
		width: 6vw;
		height: 3rem;
		background-color: white;
		z-index: 2;
		padding: 0 !important;
	} */

	/* button.menu-btn svg{
		max-width: 80px;
		height: auto;
		transition: 2s;
	} */

	li button:hover{
		filter: drop-shadow(var(--_btn-shadow-color) 0px 23px 10px);
	}

	li button:active{
		filter: drop-shadow(var(--_btn-shadow-color) 0px 15px 10px);
		scale: .97;
	}

	li button.icon-btn{
		aspect-ratio: 1;
	}

	li button.menu-btn{
		display: none;

		@container (width < 990px){
			display: block;
		}

		svg path{
			fill: transparent;
			stroke: var(--color-text,#000000);	
		}
	}

	li button.dark-mode svg path{
		fill: var(--color-text);
		stroke: var(--color-text);
		background-color: black;
		stroke-width:2px ;
	}

	/* ///////////////////////// */
	/* right side footer section */
	/* ///////////////////////// */
	
	li.foot-extra{
		position: relative;
		padding-inline: 20px;
	}

	li.foot-extra noscript{
		display: flex;
		justify-content: end;
		width: 60%;
	}

	li.foot-extra button{
		border-radius:50%;
		transition: .5s ease-out;
		transform: translate( 0,0rem);
		cursor: help;
		@starting-style{
			translate: 0 -5rem;
		}

		svg path{
				fill: rgba(192, 158, 24, 0.9);	
		}
	}

	li.foot-extra #noscript-notice{
		position: absolute;
		top: 30%;
		background-color: rgb(237, 192, 10);
		padding: 1rem;
		border-radius: 10px;
		font-size: 2.1rem;
		width: 100%;
		max-width: 500px;
		text-align: center;
		z-index: 10;
	}

	/* :global(main:has(button.close-btn:is(:active,:focus-within)) article.active) { */
	:global(main:has(button:is(.close-btn,.about-btn,.contact-btn):is(:active)) article.active) {
		height: calc(var(--menu-height) + 18px);
		transition: .4s cubic-bezier(0.375, 0.685, 0.32, 1.275);
	}

	:global(main:has(button.open-menu-btn:is(:active)) article.close) {
		translate: 0 -175vh !important;
		filter: blur(1px);
		transition: translate .8s 1s !important ;
	}

	
	@keyframes sway {
		50%{rotate: 15deg;}
	}

	@media (max-width: 1000px){
		footer:hover{
			.footer-logo{
				transform: none;
				scale: 1;
			}
		}

		li button:is(.contact-btn,.about-btn){
			display: none;
		}
	}


</style>