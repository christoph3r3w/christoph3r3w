<script lang="ts">
	// I think the functionality of the menu actually can be a popover. Popovers are a bit more stable now on many browsers. If not, then it can revert to using JavaScript. But I think a popover is a better idea.
	import { menuOpen, contactsOpen, aboutOpen, aboutMoreOpen } from '$lib/store';
	import { onMount } from 'svelte';
	import { elasticOut } from 'svelte/easing';
	let openMenu = $derived($menuOpen);
	let openContacts = $derived($contactsOpen);
	let openAbout = $derived($aboutOpen);
	let openAboutMore = $derived($aboutMoreOpen);

	function startViewTransition(callback: () => void) {
		if (!document.startViewTransition) {
			// Fallback for browsers that don't support View Transitions
			callback();
			return;
		}

		// Start a view transition
		return document.startViewTransition(() => {
			// Update the DOM within the transition
			callback();
		});
	}

	function showContacts() {
		startViewTransition(function () {
			aboutMoreOpen.set(false);
			contactsOpen.set(true);
		});
	}

	function showAbout() {
		startViewTransition(function () {
			aboutOpen.set(true);
			aboutMoreOpen.set(false);
		});
	}

	function handleAboutMore() {
		aboutMoreOpen.set(!$aboutMoreOpen);
	}

	function whoo(
		node: HTMLElement,
		params: { delay?: number; duration?: number; easing?: (t: number) => number }
	) {
		const existingTransform = getComputedStyle(node).transform.replace('none', '');

		return {
			delay: params.delay || 0,
			duration: params.duration || 400,
			easing: params.easing || elasticOut,
			css: (t: any, u: any) =>
				`
				opacity: ${t * 0.2};
				blur: ${u * 10}px;	
				`
		};
	}

	onMount(() => {
		// Listen for the popstate event to handle back/forward navigation
		menuOpen.set(true);
		aboutOpen.set(true);
		window.addEventListener('popstate', () => {
			contactsOpen.set(false);
			aboutMoreOpen.set(false);
		});
	});

	$effect(() => {
		openMenu = $menuOpen;
		openContacts = $contactsOpen;
		openAbout = $aboutOpen;

		// if( openAbout == true){
		// 	document.body.style.setProperty('--menu-height','32cqh')
		// }else{
		// 	document.body.style.setProperty('--menu-height','56cqh')
		// }

		// Cleanup function for the effect
		return () => {
			// Reset to default value on cleanup
			document.body.style.removeProperty('--menu-height');
		};
	});
</script>

{#snippet Contacts()}
	<!-- <li class="head-contacts"> -->
	<p>you can contact me at:</p>
	<span>
		<a href="mailto:masmesa.studio@gmail.com">masmesa.studio@gmail.com</a>
	</span>
	<p>or find me on:</p>
	<span>
		<a href="/" target="_blank" data-title="LinkedIn" aria-label="link to my linkedin">
			<svg
				width="52"
				height="53"
				viewBox="0 0 52 53"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g clip-path="url(#clip0_1040_190)">
					<path
						d="M48.1508 0H3.83906C1.71641 0 0 1.70801 0 3.81973V49.1699C0 51.2816 1.71641 53 3.83906 53H48.1508C50.2734 53 52 51.2816 52 49.1803V3.81973C52 1.70801 50.2734 0 48.1508 0ZM15.4273 45.1639H7.70859V19.8646H15.4273V45.1639ZM11.568 16.4176C9.08984 16.4176 7.08906 14.3783 7.08906 11.8629C7.08906 9.34746 9.08984 7.3082 11.568 7.3082C14.0359 7.3082 16.0367 9.34746 16.0367 11.8629C16.0367 14.368 14.0359 16.4176 11.568 16.4176ZM44.3117 45.1639H36.6031V32.8662C36.6031 29.9367 36.5523 26.1584 32.5914 26.1584C28.5797 26.1584 27.9703 29.357 27.9703 32.6592V45.1639H20.2719V19.8646H27.6656V23.3221H27.7672C28.793 21.3346 31.3117 19.2332 35.0594 19.2332C42.8695 19.2332 44.3117 24.4711 44.3117 31.2824V45.1639Z"
						fill="#141414"
						style="fill:#141414;fill:color(display-p3 0.0784 0.0784 0.0784);fill-opacity:1;"
					/>
				</g>
				<defs>
					<clipPath id="clip0_1040_190">
						<rect width="52" height="53" fill="white" style="fill:white;fill-opacity:1;" />
					</clipPath>
				</defs>
			</svg>
			<p>linkedin</p>
		</a>
		<a href="/" target="_blank" data-title="are.na" aria-label="link to my Arena">
			<svg width="12" height="53" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150.38 88.986"
				><path
					d="M148.93 62.356l-20.847-16.384c-1.276-1-1.276-2.642 0-3.645l20.848-16.38c1.28-1.002 1.815-2.695 1.19-3.76-.626-1.062-2.374-1.44-3.88-.84l-24.79 9.874c-1.507.606-2.927-.22-3.153-1.83L114.57 2.926C114.34 1.317 113.13 0 111.877 0c-1.247 0-2.456 1.317-2.68 2.925l-3.73 26.467c-.228 1.61-1.646 2.434-3.155 1.83l-24.38-9.71c-1.512-.602-3.975-.602-5.483 0l-24.384 9.71c-1.508.604-2.928-.22-3.154-1.83L41.186 2.925C40.956 1.317 39.748 0 38.5 0c-1.252 0-2.463 1.317-2.688 2.925l-3.73 26.467c-.226 1.61-1.645 2.434-3.153 1.83L4.14 21.35c-1.507-.603-3.252-.223-3.878.838-.625 1.066-.092 2.76 1.184 3.76l20.85 16.38c1.277 1.003 1.277 2.645 0 3.646L1.446 62.356C.166 63.358-.364 65.152.26 66.34c.627 1.19 2.372 1.668 3.877 1.064l24.567-9.866c1.51-.603 2.914.218 3.125 1.828l3.544 26.696c.214 1.607 1.618 2.923 3.12 2.923 1.5 0 2.905-1.315 3.12-2.923l3.55-26.696c.21-1.61 1.62-2.43 3.122-1.828l24.164 9.698c1.506.606 3.97.606 5.477 0l24.16-9.698c1.504-.603 2.91.218 3.125 1.828l3.55 26.696c.212 1.607 1.617 2.923 3.115 2.923 1.502 0 2.907-1.315 3.12-2.923l3.55-26.696c.216-1.61 1.62-2.43 3.124-1.828l24.57 9.866c1.5.604 3.25.125 3.876-1.063.627-1.186.094-2.98-1.185-3.982zM95.89 46.18L77.53 60.315c-1.285.99-3.393.99-4.674 0L54.49 46.18c-1.284-.99-1.294-2.62-.02-3.625l18.4-14.493c1.274-1.005 3.363-1.005 4.638 0l18.4 14.493c1.277 1.004 1.267 2.634-.02 3.626z"
				></path></svg
			>
			<p>are.na</p>
		</a>
		<a href="/" target="_blank" data-title="GitHub" aria-label="link to my github">
			<svg
				width="52"
				height="52"
				viewBox="0 0 52 52"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g clip-path="url(#clip0_1040_192)">
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M26 0C11.6402 0 0 11.6584 0 26.0442C0 37.5492 7.449 47.3122 17.7814 50.7546C19.0814 50.9938 19.5546 50.1904 19.5546 49.4988C19.5546 48.8826 19.5338 47.242 19.5208 45.071C12.2876 46.644 10.7614 41.5792 10.7614 41.5792C9.581 38.5684 7.8754 37.7676 7.8754 37.7676C5.5146 36.1556 8.0548 36.1868 8.0548 36.1868C10.6626 36.3688 12.0354 38.87 12.0354 38.87C14.3546 42.848 18.122 41.6988 19.6014 41.0332C19.8406 39.351 20.5114 38.2044 21.255 37.5544C15.483 36.8966 9.412 34.6606 9.412 24.6818C9.412 21.84 10.426 19.513 12.0874 17.693C11.8196 17.0352 10.9278 14.3858 12.3422 10.803C12.3422 10.803 14.5262 10.101 19.4922 13.4706C21.6132 12.8921 23.8015 12.5975 26 12.5944C28.21 12.6048 30.433 12.8934 32.5104 13.4706C37.4738 10.101 39.6526 10.8004 39.6526 10.8004C41.0722 14.3858 40.1778 17.0352 39.9126 17.693C41.5766 19.513 42.5854 21.84 42.5854 24.6818C42.5854 34.6866 36.504 36.8888 30.7138 37.5336C31.6472 38.337 32.4766 39.9256 32.4766 42.3566C32.4766 45.8354 32.4454 48.646 32.4454 49.4988C32.4454 50.1956 32.9134 51.0068 34.2342 50.752C39.4116 49.0155 43.9123 45.6958 47.1002 41.2621C50.2882 36.8285 52.0022 31.505 52 26.0442C52 11.6584 40.3572 0 26 0Z"
						fill="black"
						style="fill:black;fill-opacity:1;"
					/>
				</g>
				<defs>
					<clipPath id="clip0_1040_192">
						<rect width="52" height="52" fill="white" style="fill:white;fill-opacity:1;" />
					</clipPath>
				</defs>
			</svg>
			<p>GitHub</p>
		</a>
		<a href="/" target="_blank" data-title="Instagram" aria-label="link to my instagram">
			<svg
				width="52"
				height="53"
				viewBox="0 0 52 53"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g clip-path="url(#clip0_1040_191)">
					<path
						d="M26 4.77207C32.9469 4.77207 33.7695 4.80312 36.5016 4.92734C39.0406 5.04121 40.4117 5.47598 41.3258 5.83828C42.5344 6.31445 43.4078 6.89414 44.3117 7.81543C45.2258 8.74707 45.7844 9.62695 46.2516 10.8588C46.607 11.7904 47.0336 13.1982 47.1453 15.7758C47.2672 18.5707 47.2977 19.4092 47.2977 26.4793C47.2977 33.5598 47.2672 34.3982 47.1453 37.1828C47.0336 39.7707 46.607 41.1682 46.2516 42.0998C45.7844 43.3316 45.2156 44.2219 44.3117 45.1432C43.3977 46.0748 42.5344 46.6441 41.3258 47.1203C40.4117 47.4826 39.0305 47.9174 36.5016 48.0312C33.7594 48.1555 32.9367 48.1865 26 48.1865C19.0531 48.1865 18.2305 48.1555 15.4984 48.0312C12.9594 47.9174 11.5883 47.4826 10.6742 47.1203C9.46563 46.6441 8.59219 46.0645 7.68828 45.1432C6.77422 44.2115 6.21563 43.3316 5.74844 42.0998C5.39297 41.1682 4.96641 39.7604 4.85469 37.1828C4.73281 34.3879 4.70234 33.5494 4.70234 26.4793C4.70234 19.3988 4.73281 18.5604 4.85469 15.7758C4.96641 13.1879 5.39297 11.7904 5.74844 10.8588C6.21563 9.62695 6.78438 8.73672 7.68828 7.81543C8.60234 6.88379 9.46563 6.31445 10.6742 5.83828C11.5883 5.47598 12.9695 5.04121 15.4984 4.92734C18.2305 4.80312 19.0531 4.77207 26 4.77207ZM26 0C18.9414 0 18.0578 0.0310547 15.2852 0.155273C12.5227 0.279492 10.6234 0.734961 8.97813 1.38711C7.26172 2.07031 5.80938 2.9709 4.36719 4.45117C2.91484 5.92109 2.03125 7.40137 1.36094 9.14043C0.721094 10.8277 0.274219 12.7531 0.152344 15.5687C0.0304688 18.4051 0 19.3057 0 26.5C0 33.6943 0.0304688 34.5949 0.152344 37.4209C0.274219 40.2365 0.721094 42.1723 1.36094 43.8492C2.03125 45.5986 2.91484 47.0789 4.36719 48.5488C5.80938 50.0187 7.26172 50.9297 8.96797 51.6025C10.6234 52.2547 12.5125 52.7102 15.275 52.8344C18.0477 52.9586 18.9313 52.9896 25.9898 52.9896C33.0484 52.9896 33.932 52.9586 36.7047 52.8344C39.4672 52.7102 41.3664 52.2547 43.0117 51.6025C44.718 50.9297 46.1703 50.0187 47.6125 48.5488C49.0547 47.0789 49.9484 45.5986 50.6086 43.8596C51.2484 42.1723 51.6953 40.2469 51.8172 37.4313C51.9391 34.6053 51.9695 33.7047 51.9695 26.5104C51.9695 19.316 51.9391 18.4154 51.8172 15.5895C51.6953 12.7738 51.2484 10.8381 50.6086 9.16113C49.9688 7.40137 49.0852 5.92109 47.6328 4.45117C46.1906 2.98125 44.7383 2.07031 43.032 1.39746C41.3766 0.745312 39.4875 0.289844 36.725 0.165625C33.9422 0.0310547 33.0586 0 26 0Z"
						fill="#000100"
						style="fill:#000100;fill:color(display-p3 0.0000 0.0039 0.0000);fill-opacity:1;"
					/>
					<path
						d="M26 12.8877C18.6266 12.8877 12.6445 18.9848 12.6445 26.5C12.6445 34.0152 18.6266 40.1123 26 40.1123C33.3734 40.1123 39.3555 34.0152 39.3555 26.5C39.3555 18.9848 33.3734 12.8877 26 12.8877ZM26 35.3299C21.2164 35.3299 17.3367 31.3756 17.3367 26.5C17.3367 21.6244 21.2164 17.6701 26 17.6701C30.7836 17.6701 34.6633 21.6244 34.6633 26.5C34.6633 31.3756 30.7836 35.3299 26 35.3299Z"
						fill="#000100"
						style="fill:#000100;fill:color(display-p3 0.0000 0.0039 0.0000);fill-opacity:1;"
					/>
					<path
						d="M43.0016 12.3494C43.0016 14.1092 41.6 15.5274 39.8836 15.5274C38.157 15.5274 36.7656 14.0989 36.7656 12.3494C36.7656 10.5897 38.1672 9.17151 39.8836 9.17151C41.6 9.17151 43.0016 10.6 43.0016 12.3494Z"
						fill="#000100"
						style="fill:#000100;fill:color(display-p3 0.0000 0.0039 0.0000);fill-opacity:1;"
					/>
				</g>
				<defs>
					<clipPath id="clip0_1040_191">
						<rect width="52" height="53" fill="white" style="fill:white;fill-opacity:1;" />
					</clipPath>
				</defs>
			</svg>
			<p>instagram</p>
		</a>
	</span>
	<!-- </li> -->
{/snippet}

{#snippet About()}
	<!-- <li class="head-about {openAboutMore?'read-more':''}"> -->
	<p>Hi Christopher here</p>
	{#key openAboutMore}
		<p in:whoo={{ duration: 200 }}>
			I'm a web developer in Amsterdam, focused on accessible interfaces and scalable systems that
			adapt to real user needs.
		</p>
	{/key}
	{#if openAboutMore == true}
		<p in:whoo={{ duration: 300, delay: 400 }} out:whoo={{ duration: 400 }}>
			Curiosity and experimentation drive my practice. Through studies and client work, I developed
			a structural approach to applying these principles across different user needs and content.
		</p>
		<h2 in:whoo={{ duration: 300, delay: 400 }} out:whoo={{ duration: 400 }}>Approach</h2>
		<p in:whoo={{ duration: 300, delay: 400 }} out:whoo={{ duration: 400 }}>
			The projects I've enjoyed most began as thoughtful conversations — with clients,
			collaborators, or users themselves. These conversations shape how I approach the work:
			researching new tools and techniques, questioning assumptions about interface design, and
			building systems flexible enough to adapt to both visual needs and the data that flows through
			them.
		</p>
		<p in:whoo={{ duration: 300, delay: 400 }} out:whoo={{ duration: 400 }}>
			I draw on web fundamentals as a creative material — experimenting with what's possible,
			staying curious about emerging features, and always thinking about who will actually use what
			I'm making. Whether it's a custom solution for a specific stakeholder or a system built to
			scale, the goal remains the same: work that's thoughtful, accessible, and genuinely useful.
		</p>
		<!-- <div class="previous-roles" in:whoo={{ duration: 300, delay: 400 }} out:whoo={{ duration: 200 }}>
					<h2 in:whoo={{ duration: 300, delay: 400 }} out:whoo={{ duration: 200 }}>
						Stack:
					</h2>
					<ul>
						<li>Frontend Developer </li>
						<li>Frontend Engineer</li>
						<li>UI Designer</li>
						<li>UI Consultant</li>
						<li>Junior backend Developer</li>
					</ul>	
				</div> -->
		<div
			class="previous-roles"
			in:whoo={{ duration: 200, delay: 400 }}
			out:whoo={{ duration: 200 }}
		>
			<h2 in:whoo={{ duration: 200, delay: 400 }} out:whoo={{ duration: 200 }}>Previous roles:</h2>
			<ul>
				<li>Frontend Developer</li>
				<li>Frontend Engineer</li>
				<li>UI Designer</li>
				<li>UI Consultant</li>
				<!-- <li>Junior backend Developer</li> -->
			</ul>
		</div>
	{/if}
	<button class="read-more-btn" onclick={handleAboutMore}>
		{#if openAboutMore == false}
			Read more
		{:else}
			Read less
		{/if}
	</button>
	<!-- </li> -->
{/snippet}

{#snippet headerC()}
	<ul class="headerUl">
		<li class="header-logo">
			<a href="/">
				<picture class="profile profile-2 flower">
					{#if openAboutMore == true}
						<img
							class="face-2"
							src="./25acb22a-22a3-41d5-a0eb-c91529c4c6c8 (Custom).avif"
							alt="icon of my face me"
						/>
						<img src="./photos/2533cde4-1781-47d6-a605-089cc54dfa8e2.avif" alt="me" />
					{:else}
						<img
							class=""
							src="./25acb22a-22a3-41d5-a0eb-c91529c4c6c8 (Custom).avif"
							alt="icon of my face me"
						/>
					{/if}
				</picture>

				<!-- <picture class="profile profile-2 flower" >
					<img src="./25acb22a-22a3-41d5-a0eb-c91529c4c6c8 (Custom).avif" alt="icon of my face me">
				</picture> -->
			</a>
		</li>
		<li
			class:head-contacts={openContacts}
			class:head-about={openAbout}
			class:read-more={openAbout && openAboutMore}
			class:menu-routes={!openContacts && !openAbout}
		>
			{#if openContacts == true}
				{@render Contacts()}
			{:else if openAbout == true}
				{@render About()}
			{:else}
				<!-- <span> <button onclick={() => showAbout()}>About</button></span>
				<span> <button onclick={() => showContacts()}>Contact</button></span>
				<span> <a class="noLink" href="/">Masmesa studio</a></span>
				<span> <a class="noLink" href="/">Workshops,events</a></span> -->
				<!-- <li class="menu-routes">
				<span> <button onclick={() => showAbout()}>About</button></span>
				<span> <button onclick={() => showContacts()}>Contact</button></span>
				<span> <a class="noLink" href="/">Masmesa studio</a></span>
				<span> <a class="noLink" href="/">Workshops,events</a></span>
			</li> -->
			{/if}
		</li>
	</ul>
{/snippet}

{#snippet menuContent()}
	<section class="close-menu-container">
		{@render headerC()}
	</section>
{/snippet}

{#if openMenu == true}
	<article class="menu-container active">
		{@render headerC()}
	</article>
{:else if openMenu == false}
	<article class=" menu-container close">
		{@render menuContent()}
	</article>
{/if}

<!-- {#key menuOpen}
	<article class="menu-container {openMenu == true?'active':'close'}">
		{#if openMenu == true}
			{@render headerC()}
		{:else if openMenu == false}
		{@render menuContent()}
		{/if}
	</article>
{/key} -->

<style>
	:root {
		--menu-height: 50cqh;
		--icon-shadow-color: color-mix(in srgb, var(--color-bg, #ffffff), rgba(105, 98, 63, 0.181) 50%);

		@property --menu-height {
			syntax: '<length>';
			initial-value: 46cqh;
			inherits: true;
		}
	}

	/* menu contaiter styling and logic */

	.menu-container {
		position: relative;
		height: var(--menu-height);
		padding-inline: var(--Padding-genral);
		/* background-color: rgba(255, 255, 255, 0.342);
		background-color: color-mix(in srgb, var(--color-bg, rgba(255, 255, 255, 0.781)), rgba(255, 255, 255, 0.342) 80%);
		background-color: color-mix(in srgb, var(--tritary-color, rgba(255, 255, 255, 0.781)), rgba(255, 255, 255, 0.342) 20%);
		background-color: color-mix(in srgb, var(--tritary-color, rgba(255, 255, 255, 0.781)),color-mix(in srgb, var(--color-bg), rgba(255, 255, 255, 0.595) 50% ) 90%); */
		background-color: inherit;

		backdrop-filter: blur(5px);
		z-index: 1;

		container-type: inline-size;
		container-name: menu;
		/* view-transition-name: menu; */

		@starting-style {
			translate: 0 -100%;
		}
	}

	.close-menu-container {
		display: block;
		position: relative;
		width: 100%;
		height: 100%;
	}

	.active {
		position: absolute;
		display: block;
		inset: 0;
		top: calc(0 - 10%);
		/* background-color: rgba(255, 255, 255, 0.801);
		background-color: color-mix(in hsl, var(--color-bg)60%, transparent );
		background-color: color-mix(in srgb, var(--color-bg, rgba(255, 255, 255, 0.511)) 60%, rgba(255, 255, 255, 0.199) 80%);
		background-color: color-mix(in srgb, var(--tritary-color, rgba(255, 255, 255, 0.781)), rgba(255, 255, 255, 0.595) 60%); */
		/* background-color: color-mix(in srgb, var(--tritary-color, rgba(255, 255, 255, 0.781)),color-mix(in srgb, var(--color-bg), rgba(255, 255, 255, 0.595) 50% ) 90%); */
		/* box-shadow: rgba(27, 21, 14, 0.041) 0px 50px 50px -20px, rgba(0, 0, 0, 0.15) 0px 10px 60px -30px, rgba(10, 37, 64, 0.35) 0px -1.7px 3px 0px inset; */

		z-index: 1;
		animation: block 0.65s linear 100ms alternate both;
		/* view-transition-name: menu; */
	}

	.close {
		position: absolute;
		inset: 0;
		animation: launch 0.4s forwards cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.01s;
		z-index: 3;

		@starting-style {
			/* view-transition-name: menu; */
			translate: 0 100%;
			opacity: 0;
		}
	}

	/* ////////////// */
	/* header/menu content */
	/* ////////////// */

	.headerUl {
		display: flex;
		flex-direction: row;
		position: relative;
		width: 100%;
		height: 100%;
		bottom: 0;
		padding-inline: 6rem;
		container-type: inline-size;
		/* outline: solid red; */
	}

	.headerUl > li {
		flex: 1 1 inherit;
		container-type: inline-size;
	}

	/* home, main icon  */

	.headerUl li.header-logo {
		--logo-width: calc-size(fit-content, size + clamp(1rem, 0.05vw + 40cqw, 35cqw));
		--logo-width: clamp(20cqw, -0.1rem + 87cqw, 39cqw);
		width: var(--logo-width);
		height: 60cqh;
		max-height: 100%;
		z-index: 30;
		/* outline: solid red; */
	}

	li.header-logo a {
		display: grid;
		place-content: center;
		position: relative;
		align-self: center;
		justify-self: center;
		aspect-ratio: 1;
		height: 100%;
		width: 100%;
		overflow: visible;
	}

	/* make the flower face a component that has a custom event,
	 when theis event is triggered then moved it to the menu   */
	li.header-logo .profile {
		flex: 0 1 auto;
		position: relative;
		width: 100%;
		max-width: clamp(3rem, 93% - 2rem, 100%);
		min-width: 5rem;
		height: 100%;
		min-height: 5rem;
		/* view-transition-name: header-figure; */
		isolation: isolate;

		& img {
			position: relative;
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: center;
			animation: sway 10s linear infinite 0.2s backwards;
		}

		&.flower {
			position: relative;
			aspect-ratio: 1;
			--g: /25.486% 25.486% radial-gradient(#000 calc(71% - 1px), #0000 71%) no-repeat;
			mask:
				100% 50% var(--g),
				88.302% 82.139% var(--g),
				58.682% 99.24% var(--g),
				25% 93.301% var(--g),
				3.015% 67.101% var(--g),
				3.015% 32.899% var(--g),
				25% 6.699% var(--g),
				58.682% 0.76% var(--g),
				88.302% 17.861% var(--g),
				radial-gradient(100% 100%, #000 35.01%, #0000 calc(35.01% + 1px));
			scale: 1;
			transition: 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
			/* animation: sway 10s linear infinite .5s backwards ; */
			view-transition-name: header-figure;
			z-index: 3;

			&::after {
				background-color: #2c5d98;
				mix-blend-mode: color;

				--g: /26.486% 26.486% radial-gradient(#000 calc(71% - 1px), #0000 71%) no-repeat;
				mask:
					100% 50% var(--g),
					88.302% 82.139% var(--g),
					58.682% 99.24% var(--g),
					25% 93.301% var(--g),
					3.015% 67.101% var(--g),
					3.015% 32.899% var(--g),
					25% 6.699% var(--g),
					58.682% 0.76% var(--g),
					88.302% 17.861% var(--g),
					radial-gradient(100% 100%, #000 35.01%, #0000 calc(35.01% + 1px));
				scale: 1;
				transition: 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
				animation: sway 30s linear 9s backwards;
			}
		}
	}

	.headerUl:has(li:nth-of-type(n) a:hover) .flower {
		--g: /27.486% 27.486% radial-gradient(#000 calc(71% - 1px), #0000 71%) no-repeat;
		transition: transform 1s 0.1s;
		transform: rotateY(0.5turn);
		/* animation:flip 1s alternate forwards .1s   ; */
	}

	.headerUl:has(li:nth-of-type(1) a:not(:hover)) .flower {
		transition: 0.9s cubic-bezier(0.175, 0.885, 0.32, 1.275) 1s;
		/* animation: sway 10s backwards infinite .1s; */
	}

	li:not(.header-logo) {
		display: flex;
		flex-direction: column;
		padding-inline: var(--Padding-genral);
		flex: 1 1 auto;
		gap: 4%;
		/* outline: solid red; */
	}

	/* contacts menu */
	li.head-contacts {
		display: flex;
		flex-direction: column;
		justify-content: end;
		align-items: start;
		color: var(--color-text);
		margin-block: 2rem;

		::first-letter {
			text-transform: uppercase;
		}
	}

	li.head-contacts > p {
		font-size: var(--text-size-m);
		color: var(--color-heading);
		margin-top: 2%;
	}

	li.head-contacts span {
		display: inline-flex;
		flex-flow: row nowrap;
		font-size: var(--text-size-l);
		gap: 4cqw;
	}

	li.head-contacts span a {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: clamp(1.5rem, -1.1304rem + 5.6522cqw, var(--text-size-l));
		font-weight: 600;
		gap: min(1rem, 1cqh);
		color: var(--color-text);
		overflow: hidden;

		&:hover {
			color: var(--accent-color);
			fill: var(--accent-color);

			svg path {
				fill: var(--accent-color) !important ;
			}
		}

		p {
			font-size: var(--text-size-s);
			opacity: 0;
			display: none;
		}

		&[data-title]:hover::after {
			content: attr(data-title);
			position: absolute;
			bottom: -20px;
			width: fit-content;
			font-size: var(--text-size-s);
			display: none;
		}

		svg {
			width: clamp(40px, -0.2rem + 19cqw, 3cqw);
			aspect-ratio: 1;
			fill: var(--color-text);
		}

		svg path {
			fill: var(--color-text) !important ;
		}
	}

	/* about menu */

	:global(.menu-container:has(.head-about)) {
		/* --menu-height: 20cqh ; */
		background-color: transparent;
		box-shadow: none;
		transition: 0.5s cubic-bezier(0.575, 0.005, 0.32, 1.175) 100ms;

		.header-logo {
			animation: none !important;
			height: auto;
			width: clamp(20cqw, -0.1rem + 87cqw, 39cqw);
		}

		.header-logo a {
			max-width: 500px;
			width: 100%;
		}

		.header-logo a .profile::after {
			content: '';
			position: absolute;
			display: inline-grid;
			place-content: center;
			inset: 0%;
			z-index: 0;
			isolation: isolate;
			background-color: color-mix(in srgb, #2c5d98, var(--primary-color) 40%);
			mix-blend-mode: color;

			--g: /26.486% 26.486% radial-gradient(#000 calc(71% - 1px), #0000 71%) no-repeat;
			mask:
				100% 50% var(--g),
				88.302% 82.139% var(--g),
				58.682% 99.24% var(--g),
				25% 93.301% var(--g),
				3.015% 67.101% var(--g),
				3.015% 32.899% var(--g),
				25% 6.699% var(--g),
				58.682% 0.76% var(--g),
				88.302% 17.861% var(--g),
				radial-gradient(100% 100%, #000 35.01%, #0000 calc(35.01% + 1px));
			scale: 1;
			transition: 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
			animation: sway 30s linear 9s backwards;
		}

		img {
			animation-duration: 90s !important;
			animation-delay: 9s !important;
		}
	}

	:global(.menu-container:has(.read-more)) {
		--menu-height: 100cqh;
		background-color: color-mix(in hsl, var(--color-bg) 60%, transparent);

		.read-more {
			/* position: absolute;
			top: 10cqh;
			right: 10cqw; */
			height: 95cqh;
			overflow-y: scroll;
		}

		.header-logo a .profile {
			--g: /27.486% 27.486% radial-gradient(#000 calc(71% - 1px), #0000 71%) no-repeat;
			aspect-ratio: 1;
			max-width: 55cqw;
			min-height: 20cqh;
			animation: none;
			/* view-transition-name: header-figure; */
		}

		.header-logo a .profile::after {
			background-color: color-mix(in srgb, #2c5d98, var(--primary-color) 40%);
			--g: /29.486% 26.486% radial-gradient(#000 calc(71% - 1px), #0000 71%) no-repeat;
			animation: sway 30s linear 9s backwards;
		}

		img {
			position: absolute;
			inset: 0;
			animation: inherit;
			object-view-box: inset(0 10px);
		}
		img.face-2 {
			display: none;
		}
	}

	li.head-about {
		position: relative;
		display: flex;
		align-items: bottom;
		font-size: clamp(1.2rem, -0.3006rem + 2.8522cqw, var(--text-size-l));
		padding: unset;
		max-width: 700px;
		margin-top: var(--H-top);
		overflow-y: auto;
		scrollbar-color: color-mix(in srgb, #2c5d98, var(--primary-color, var(--black)) 40%) transparent;
	}

	li.head-about.read-more {
		position: relative;
		font-size: clamp(1.2rem, -0.3006rem + 2.8522cqw, 2rem);
		max-width: 900px;
		max-height: 98%;
		/* height: 100cqh; */
		overflow-y: auto;
		padding-bottom: 7rem;
		/* outline: solid red; */
		/* background-color: rgba(255, 255, 255, 0.801); */
		/* background-color: color-mix(in hsl, var(--color-bg)60%, transparent ); */
	}

	/* li.head-about.read-more .asset-border{
			position: sticky;
			position: absolute;
			position: fixed;
			inset-block:0;
			height: 100%;
			backdrop-filter: blur(5px);
			z-index: 0;
			pointer-events: none;
			contain: style paint;
			background-color:  rgba(0, 0, 0, 0.359);
	}

	li.head-about.read-more .asset-border.b-bottom {
			inset-block: unset;
			bottom: 0;
			height: 10%;
			width: 100%;
			mask: linear-gradient(
				to top,
				var(--file-primary-hue) 0% 5%,
				transparent 50% 100%
			);
	} */

	li.head-about :nth-child(n) {
		max-width: 43ch;
	}

	li.head-about > :nth-child(1) {
		margin-top: 10rem;
	}

	li.head-about button.read-more-btn {
		display: none;
		place-content: center;
		justify-self: end;
		padding-inline: 10px;
		margin-bottom: 1rem;

		background-color: color-mix(
			in srgb,
			var(--primary-color, rgba(255, 255, 255, 0.781)),
			color-mix(in srgb, var(--color-bg), rgba(255, 255, 255, 0.595) 50%) 90%
		);
		color: color-mix(
			in srgb,
			var(--color-text, #ffffff) 70%,
			var(--primary-color, var(--black)) 90%
		);
		border: solid 2px;
		border-color: color-mix(
			in srgb,
			var(--primary-color, rgba(255, 255, 255, 0.781)),
			color-mix(in srgb, var(--color-bg), rgba(255, 255, 255, 0.595) 50%) 90%
		);
		border-radius: 25px;

		max-width: fit-content;
		min-height: 3rem;
		text-wrap: nowrap;
		font-size: var(--text-size-s);
		cursor: pointer;
		z-index: 3;
		transition: 500ms ease;

		@starting-style {
			opacity: 0;
			scale: 0.8;
		}
	}

	li.head-about h2 {
		font-size: clamp(1.5rem, -0.1304rem + 3.6522cqw, var(--text-size-xl));
		height: fit-content;
		color: color-mix(in hsl, var(--color-text), var(--color-bg) 60%);
	}

	li.head-about p {
		max-width: 45ch;
		height: fit-content;
		color: color-mix(in hsl, var(--color-text), var(--color-bg) 30%);
	}

	li.head-about .previous-roles {
		display: flex;
		align-items: top;
		justify-content: top;
		margin-block: 2rem;

		h2 {
			flex: 1 1 50%;
			font-size: clamp(1.5rem, -0.1304rem + 3.6522cqw, var(--text-size-xl));
			min-width: fit-content;
			height: fit-content;
		}

		ul {
			flex: 1 1 auto;
			display: inherit;
			flex-direction: column;
			gap: 0.5rem;
		}

		li {
			all: unset;
			color: color-mix(in hsl, var(--color-text), var(--color-bg) 30%);
			font-size: var(--text-size-m);
			font-weight: 200;
		}
	}

	/* main menu navigation */
	li.menu-routes {
		flex: 2 1 auto;
		justify-content: center;
		font-size: clamp(1.5rem, -1.1304rem + 5.6522cqw, 3rem);
		color: var(--color-text);
		height: 100%;
	}

	li.menu-routes span :is(a, button) {
		border: none;
		background: none;
		font-size: inherit;
		color: currentColor;
		cursor: pointer;
	}

	li.menu-routes .noLink {
		pointer-events: none;
		cursor: default;
		opacity: 0.6;
		color: gray;
	}

	@keyframes sway {
		0%,
		100% {
			rotate: inherit;
		}
		50% {
			rotate: 15deg;
		}
		90% {
			rotate: 2deg;
		}
	}

	@keyframes block {
		0% {
			transform: translate(0, -100%);
		}
		30% {
			transform: translate(0, 0%);
			animation-timing-function: linear;
			filter: blur(1.4px);
		}
		35% {
			transform: translate(0, 5%);
			animation-timing-function: linear;
			filter: blur(0);
		}
		37% {
			transform: translate(0, -15%);
			animation-timing-function: ease-out;
		}
		55% {
			transform: translate(0, -20%);
			animation-timing-function: linear;
		}
		/* 60% { transform: translate(0, 0%);animation-timing-function: ease-out;  filter: blur(1px);}  */
		76% {
			transform: translate(0, -8.51%);
			animation-timing-function: ease-out;
		}
		83% {
			transform: translate(0, 0);
			animation-timing-function: ease;
		}

		/* | 7 | 0.04117715 | 8.24%  | */
		85% {
			transform: translate(0, -3.24%);
		}

		95% {
			transform: translate(0, 1.03%);
		}

		/* | 9 | 0.0201768035 | 4.03%  | */
		96% {
			transform: translate(0, 0.9%);
			animation-timing-function: cubic-bezier(0.68, -3.55, 0.265, 3.55);
		}

		100% {
			transform: translate(0, 0);
			/* animation-timing-function: cubic-bezier(0.68, -1.55, 0.265, 1.55); */
			animation-timing-function: linear(
				0,
				0.029 1.6%,
				0.123 3.5%,
				0.651 10.6%,
				0.862 14.1%,
				1.002 17.7%,
				1.046 19.6%,
				1.074 21.6%,
				1.087 23.9%,
				1.086 26.6%,
				1.014 38.5%,
				0.994 46.3%,
				1
			);
			animation-duration: 1s;
		}
	}

	@keyframes launch {
		50% {
			filter: blur(2px);
		}
		100% {
			translate: 0 -100%;
			filter: opacity(5%);
		}
	}

	@keyframes flip {
		to {
			transform: rotateY(2turn);
		}
	}

	@media (width < 1000px) {
		li.head-about button.read-more-btn {
			display: grid;
		}
	}

	@media (width < 650px) {
		.menu-container {
			--menu-height: 70cqh;
			min-height: var(--menu-height);
			/* background-color: rgba(255, 255, 255, 0.37); */
		}

		.headerUl {
			flex-direction: column;
			height: 100%;
			padding-inline: 2%;
		}

		.headerUl li.header-logo {
			margin-top: calc(var(--H-top) + 12cqh);
			aspect-ratio: unset;
			width: 50%;
			width: clamp(1rem, 0.5vw + 100cqw, 100%);
			height: fit-content;
			max-height: 20dvh;
		}

		.headerUl li.header-logo a {
			align-items: center;
			align-self: center;
			width: clamp(1rem, 0.5vw + 100cqw, 100%);

			& .profile {
				width: auto;
				height: 40%;
				height: clamp(1rem, -0.5rem + 20cqh, 100%);
			}
		}

		li:nth-of-type(n + 2) {
			width: 100%;
			justify-self: end;
			padding-top: 7cqh;
			padding-inline: var(--Padding-genral);
			gap: 2cqh;
		}

		:global(.menu-container:has(.head-contacts)) {
			.head-contacts {
				max-height: fit-content;
				margin: 0;
				padding-top: 5%;
				align-items: top;
				justify-content: start;
			}
		}

		:global(.menu-container:has(.head-about)) {
			.headerUl .header-logo {
				width: 100%;
			}
		}

		:global(.menu-container:has(.read-more)) {
			--menu-height: 100cqh;
			.headerUl .header-logo a .profile {
				width: 100%;
			}

			.read-more {
				min-height: 10cqh;
				overflow-y: scroll;
			}
		}

		.headerUl .head-contacts span {
			gap: 12cqw;
		}

		.headerUl li.head-about {
			margin-top: 2rem;
		}

		li.head-about p {
			max-width: 100%;
			height: fit-content;
			&:nth-of-type(1) {
				margin-top: 0;
			}
		}

		/* :global(main:has(button:is(.close-btn,.about-btn,.contact-btn):hover) article.active) {
			height: calc-size(fit-content, size + 2%) !important;
			transition: .4s cubic-bezier(0.375, 0.685, 0.32, 1.275);
		} */

		.headerUl .profile.flower {
			animation:
				sway 10s linear infinite 0.5s,
				flip 12s ease-out 3s both;
			isolation: isolate;
			/* view-transition-name: header-figure; */
		}

		.headerUl:has(li:nth-of-type(n) a:hover) .flower {
			transition: all 1s 0.1s;
			transform: rotateY(0deg) !important;
			/* animation:flip 1s alternate forwards .1s   ; */
		}

		.headerUl .menu-routes {
			line-height: 1.5;
		}
	}

	@media (height < 500px) {
		.menu-container {
			--menu-height: 100cqh;
			min-height: var(--menu-height);
			background-color: rgba(255, 255, 255, 0.551);
		}

		.headerUl li.header-logo {
			margin-top: calc(var(--H-top) + 12cqh);
			aspect-ratio: unset;
			width: 50%;
			width: clamp(1rem, 0.5vw + 100cqw, 40%);
			height: fit-content;
			max-height: 10dvh;
		}
	}
</style>
