<script lang="ts">
	// I think the functionality of the menu actually can be a popover. Popovers are a bit more stable now on many browsers. If not, then it can revert to using JavaScript. But I think a popover is a better idea.
	import { menuOpen, contactsOpen, aboutOpen, aboutMoreOpen } from '$lib/store';
	import { onMount } from 'svelte';
	import { elasticOut } from 'svelte/easing';
	import { CornerDownRight, ArrowBigDown,Mail } from '@lucide/svelte';
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
				opacity: ${t * 0.6};
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

		// Cleanup function for the effect
		return () => {
			document.body.style.removeProperty('--menu-height');
		};
	});
</script>

{#snippet Contacts()}
	<div class="text-bubble">
		<p>Contact me at:</p>
		<span class="email">
			<a href="mailto:masmesa.studio@gmail.com">masmesa.studio@gmail.com</a>
			<a href="mailto:masmesa.studio@gmail.com">  <Mail /></a>
		</span>
	</div>
	<div class="text-bubble">
		<!-- <p>or find me on:</p> -->
		<span class="contact-links">
			<a class="mail-to" href="mailto:masmesa.studio@gmail.com">  
				<Mail/>
			</a>
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
			<!-- <a href="/" target="_blank" data-title="Instagram" aria-label='link to my instagram'> 
						<svg width="52" height="53" viewBox="0 0 52 53" fill="none" xmlns="http://www.w3.org/2000/svg">
							<g clip-path="url(#clip0_1040_191)">
							<path d="M26 4.77207C32.9469 4.77207 33.7695 4.80312 36.5016 4.92734C39.0406 5.04121 40.4117 5.47598 41.3258 5.83828C42.5344 6.31445 43.4078 6.89414 44.3117 7.81543C45.2258 8.74707 45.7844 9.62695 46.2516 10.8588C46.607 11.7904 47.0336 13.1982 47.1453 15.7758C47.2672 18.5707 47.2977 19.4092 47.2977 26.4793C47.2977 33.5598 47.2672 34.3982 47.1453 37.1828C47.0336 39.7707 46.607 41.1682 46.2516 42.0998C45.7844 43.3316 45.2156 44.2219 44.3117 45.1432C43.3977 46.0748 42.5344 46.6441 41.3258 47.1203C40.4117 47.4826 39.0305 47.9174 36.5016 48.0312C33.7594 48.1555 32.9367 48.1865 26 48.1865C19.0531 48.1865 18.2305 48.1555 15.4984 48.0312C12.9594 47.9174 11.5883 47.4826 10.6742 47.1203C9.46563 46.6441 8.59219 46.0645 7.68828 45.1432C6.77422 44.2115 6.21563 43.3316 5.74844 42.0998C5.39297 41.1682 4.96641 39.7604 4.85469 37.1828C4.73281 34.3879 4.70234 33.5494 4.70234 26.4793C4.70234 19.3988 4.73281 18.5604 4.85469 15.7758C4.96641 13.1879 5.39297 11.7904 5.74844 10.8588C6.21563 9.62695 6.78438 8.73672 7.68828 7.81543C8.60234 6.88379 9.46563 6.31445 10.6742 5.83828C11.5883 5.47598 12.9695 5.04121 15.4984 4.92734C18.2305 4.80312 19.0531 4.77207 26 4.77207ZM26 0C18.9414 0 18.0578 0.0310547 15.2852 0.155273C12.5227 0.279492 10.6234 0.734961 8.97813 1.38711C7.26172 2.07031 5.80938 2.9709 4.36719 4.45117C2.91484 5.92109 2.03125 7.40137 1.36094 9.14043C0.721094 10.8277 0.274219 12.7531 0.152344 15.5687C0.0304688 18.4051 0 19.3057 0 26.5C0 33.6943 0.0304688 34.5949 0.152344 37.4209C0.274219 40.2365 0.721094 42.1723 1.36094 43.8492C2.03125 45.5986 2.91484 47.0789 4.36719 48.5488C5.80938 50.0187 7.26172 50.9297 8.96797 51.6025C10.6234 52.2547 12.5125 52.7102 15.275 52.8344C18.0477 52.9586 18.9313 52.9896 25.9898 52.9896C33.0484 52.9896 33.932 52.9586 36.7047 52.8344C39.4672 52.7102 41.3664 52.2547 43.0117 51.6025C44.718 50.9297 46.1703 50.0187 47.6125 48.5488C49.0547 47.0789 49.9484 45.5986 50.6086 43.8596C51.2484 42.1723 51.6953 40.2469 51.8172 37.4313C51.9391 34.6053 51.9695 33.7047 51.9695 26.5104C51.9695 19.316 51.9391 18.4154 51.8172 15.5895C51.6953 12.7738 51.2484 10.8381 50.6086 9.16113C49.9688 7.40137 49.0852 5.92109 47.6328 4.45117C46.1906 2.98125 44.7383 2.07031 43.032 1.39746C41.3766 0.745312 39.4875 0.289844 36.725 0.165625C33.9422 0.0310547 33.0586 0 26 0Z" fill="#000100" style="fill:#000100;fill:color(display-p3 0.0000 0.0039 0.0000);fill-opacity:1;"/>
							<path d="M26 12.8877C18.6266 12.8877 12.6445 18.9848 12.6445 26.5C12.6445 34.0152 18.6266 40.1123 26 40.1123C33.3734 40.1123 39.3555 34.0152 39.3555 26.5C39.3555 18.9848 33.3734 12.8877 26 12.8877ZM26 35.3299C21.2164 35.3299 17.3367 31.3756 17.3367 26.5C17.3367 21.6244 21.2164 17.6701 26 17.6701C30.7836 17.6701 34.6633 21.6244 34.6633 26.5C34.6633 31.3756 30.7836 35.3299 26 35.3299Z" fill="#000100" style="fill:#000100;fill:color(display-p3 0.0000 0.0039 0.0000);fill-opacity:1;"/>
							<path d="M43.0016 12.3494C43.0016 14.1092 41.6 15.5274 39.8836 15.5274C38.157 15.5274 36.7656 14.0989 36.7656 12.3494C36.7656 10.5897 38.1672 9.17151 39.8836 9.17151C41.6 9.17151 43.0016 10.6 43.0016 12.3494Z" fill="#000100" style="fill:#000100;fill:color(display-p3 0.0000 0.0039 0.0000);fill-opacity:1;"/>
							</g>
							<defs>
							<clipPath id="clip0_1040_191">
							<rect width="52" height="53" fill="white" style="fill:white;fill-opacity:1;"/>
							</clipPath>
							</defs>
						</svg>
						<p>instagram</p>
			</a>					 -->
		</span>
	</div>
{/snippet}

{#snippet About()}
	<article class="text-bubble">
		<p>Hello Christopher here</p>
		{#key openAboutMore}
			<p in:whoo={{ duration: 200 }}>A web developer in Amsterdam</p>
		{/key}
		{#if openAboutMore == true}
			<div
				class="previous-roles"
				in:whoo={{ duration: 200, delay: 400 }}
				out:whoo={{ duration: 200 }}
			>
				<h2 in:whoo={{ duration: 200, delay: 400 }} out:whoo={{ duration: 200 }}>
					Previous roles:
				</h2>
				<ul>
					<li>Frontend Developer</li>
					<li>Frontend Engineer</li>
					<li>UI Designer</li>
					<li>UI Consultant</li>
				</ul>
			</div>
			<p in:whoo={{ duration: 300, delay: 400 }} out:whoo={{ duration: 400 }}>
				Curiosity and experimentation drive my practice. Through studies and client work, I
				developed a structural approach to applying these principles across different user needs and
				content.
			</p>
			<h2 in:whoo={{ duration: 300, delay: 400 }} out:whoo={{ duration: 400 }}>Approach</h2>
			<p in:whoo={{ duration: 300, delay: 400 }} out:whoo={{ duration: 400 }}>
				The projects I've enjoyed most began as thoughtful conversations, with clients,
				collaborators, or users themselves. These conversations shape how I approach the work:
			</p>
			<ul class="approaches" in:whoo={{ duration: 300, delay: 400 }} out:whoo={{ duration: 400 }}>
				<!-- <li>Considering the needs of the stakeholders</li> -->
				<!-- <li>Researching (new) tools and techniques that uniquely address user needs</li> -->
				<!-- <li>Designing how the content and data that flows through the system</li> -->
				<!-- <li>Designing the data flows </li> -->
				<!-- <li>Laying out the content system</li> -->
				<!-- <li>building systems flexible to adapt to both visual needs and the data that flows through them.</li> -->
				<!-- <li>building flexible systems that adapts to both visual needs and the data flows .</li> -->
				<li>
					<p class="apr-pill">Considering stakeholder needs</p>
					<p class="apr-pill">Researching tools and techniques that address user needs</p>
				</li>
				<!-- <CornerDownRight /> -->
				<ArrowBigDown />
				<li>
					<p class="apr-pill">Designing the data flows</p>
					<p class="apr-pill">Laying out the content system</p>
				</li>
				<!-- <CornerDownRight /> -->
				<ArrowBigDown />
				<li class="apr-pill">
					Building flexible systems that adapt to visual needs and data flows
				</li>
				<li class="apr-pill">Automated and user testing</li>
				<!-- <CornerDownRight/ /> -->
				<ArrowBigDown />
				<li class="apr-pill">Iterating until the project meets the criteria to go live</li>
			</ul>
			<p in:whoo={{ duration: 300, delay: 400 }} out:whoo={{ duration: 400 }}>
				I draw on web fundamentals as a creative material, experimenting with what's possible,
				staying curious about emerging features, while always thinking about the person using the
				product.
			</p>
			<p in:whoo={{ duration: 300, delay: 400 }} out:whoo={{ duration: 400 }}>
				Whether it's a custom solution for a specific stakeholder or a system built to scale, the
				goal remains the same: work that's thoughtful, accessible, and genuinely fun.
			</p>
		{:else}
			<p
				style="margin-top: 1rem;"
				in:whoo={{ duration: 200, delay: 400 }}
				out:whoo={{ duration: 200 }}
			>
				intrested in accessible interfaces and scalable systems that adapt to real user needs.
			</p>
		{/if}
		<div class="rm-btn-container">
			<button class="read-more-btn" onclick={handleAboutMore}>
				{#if openAboutMore == false}
					Read more
				{:else}
					Read less
				{/if}
			</button>
		</div>
	</article>
	{#if openAboutMore !== true}
		<article class="text-bubble" in:whoo={{ duration: 200 }}>
			here below im hightlighting some projects that I have done.
		</article>
	{/if}
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
							src="./25acb22a-22a3-41d5-a0eb-c91529c4c6c8 (Custom).webp"
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
			class=""
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
				<span> <button onclick={() => showAbout()}>About</button></span>
				<span> <button onclick={() => showContacts()}>Contact</button></span>
				<span> <a class="noLink" href="/">Masmesa studio</a></span>
				<span> <a class="noLink" href="/">Workshops,events</a></span>
			{/if}
		</li>
	</ul>
{/snippet}

{#snippet menuContent()}
	<section class="close-menu-container">
		{@render headerC()}
	</section>
{/snippet}

<article class="menu-container {openMenu ? 'active' : 'close'}">
	{@render headerC()}
</article>

<style>
	:root {
		--menu-height: 40cqh;
		--icon-shadow-color: color-mix(in srgb, var(--color-bg, #ffffff), rgba(105, 98, 63, 0.181) 50%);
		--logo-img-min-size: 4.5rem;
		--logo-width: clamp(4cqw, -0.1rem + 67cqw, 5cqw);
		--intro-element-displacement: calc(var(--H-top) + 11cqb);
		--intro-element-transition: 0.9s cubic-bezier(0.175, 0.885, 0.32, 1.275) 100ms;
		--pill-radius: 107.59px;
		--pill-padding: 21.5px;

		@property --menu-height {
			syntax: '<length>';
			initial-value: 46cqh;
			inherits: true;
		}
	}

	/* menu contaiter styling and logic */

	.menu-container {
		position: relative;
		display: flex;
		justify-content: center;
		min-height: var(--menu-height);
		height: fit-content;
		padding-inline: var(--Padding-genral);
		background-color: inherit;
		background-color: transparent;

		backdrop-filter: blur(5px);
		z-index: 2;

		container-type: inline-size;
		container-name: menu;

		@starting-style {
			translate: 0 -100%;
		}
	}

	.close-menu-container {
		display: flex;
		position: relative;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.active {
		position: absolute;
		min-height: var(--menu-height);
		inset: 0;
		z-index: 1;
	}

	.close {
		display: none;
		min-height: 0;
		z-index: 3;
		/* translate:0 calc(-1.2 * var(--H-top)); */

		@starting-style {
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
		margin-left: 22cqw;
		container-type: inline-size;
		/* outline: solid rgb(81, 255, 0); */
	}

	.headerUl > li {
		flex: 1 1 inherit;
		container-type: inline-size;
	}

	/* //////////////// */
	/* home, main icon  */
	/* //////////////// */
	.headerUl li.header-logo {
		/* --logo-width:calc-size(fit-content , size + clamp(1rem , 0.05vw + 40cqw ,35cqw)); */
		/* --logo-width: clamp(20cqw, -.1rem + 87cqw, 39cqw); */
		flex: 0 1;
		position: relative;
		display: flex;
		justify-content: end;
		margin-top: calc(1rem + 0.5%);
		min-width: 21cqw;
		width: var(--logo-width, 0);
		z-index: 30;
	}

	li.header-logo a {
		display: grid;
		place-content: center;
		overflow: visible;
		min-width: var(--logo-img-min-size);
		max-width: 60px;
		max-width: clamp(3rem, 93% - 2rem, 100%);
		max-width: var(--logo-img-min-size);
		height: fit-content;
		transition: var(--intro-element-transition);

	}

	/* make the flower face a component that has a custom event,
	 when theis event is triggered then moved it to the menu   */
	li.header-logo .profile {
		flex: 0 1 auto;
		position: relative;
		/* max-width: clamp(3rem, 93% - 2rem, 100%); */
		min-width: var(--logo-img-min-size, 0);
		min-height: var(--logo-img-min-size, 0);
		view-transition-name: header-figure;
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
			animation: sway 50s linear infinite 0.5s backwards;
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

	/* .headerUl > li:not(.header-logo){ */
	li:is(.head-contacts, .head-about, .read-more) {
		display: flex;
		flex-direction: column;
		padding-inline: var(--Padding-genral);
		margin-top: var(--intro-element-displacement);
		max-width: 700px;
		color: var(--color-text);
		transition: top var(--intro-element-transition);

		flex: 1 1 auto;
	}

	.text-bubble {
		/* --_btn-shadow-color: color-mix(in srgb, var(--color-bg,#ffffff), rgba(65, 60, 39, 0.181) 70%); */
		/* --_btn-shadow-color: color-mix(in srgb, var(--accent-color,#ffffff), rgba(90, 86, 70, 0.181) 95%); */
		--_btn-shadow-color: color-mix(
			in srgb,
			var(--color-bg-muted, #ffffff),
			rgba(90, 86, 70, 0.181) 95%
		);
		--_btn-border-color: color-mix(
			in srgb,
			var(--accent-color, #ffffff),
			var(--tritary-color-muted) 65%
		);

		padding: clamp(1rem, 1.5cqw, 2rem) clamp(1.5rem, 3cqw, 4rem);
		border-radius: 10px 23.7px 23.7px 23.7px;
		border: solid 2px var(--color-bg-muted);
		border: solid 2px var(--tritary-color-muted);
		border: solid 2px var(--_btn-border-color);
		/* border-style: solid groove groove solid; */
		width: fit-content;
		min-height: 3rem;
		height: fit-content;
		margin-bottom: 2%;
		background-color: #ffffff;
		background-color: color-mix(
			in srgb,
			var(--tritary-color, #ffffffc7) 5%,
			color-mix(in srgb, var(--color-bg), #ffffff60 90%) 90%
		);
		/* background-color: color-mix(in lab, var(--accent-color, #ffffffc7)50% ,color-mix(in srgb, var(--color-bg), #ffffff60 90% ) 90%); */

		filter: drop-shadow(var(--_btn-shadow-color) 0px 28px 10px);
		animation: buble-text-in 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;

		@starting-style {
			opacity: 0;
			translate: -50% 0;
		}
	}

	.text-bubble p:nth-child(1) {
		font-size: 1.3rem;
		line-height: 1.5;
	}

	/* contacts menu */
	/* ///////////// */
	.head-contacts {
		flex-direction: column;
		align-items: start;

		::first-letter {
			text-transform: uppercase;
		}
	}

	.head-contacts .text-bubble > p {
		color: var(--color-heading);
	}

	.head-contacts .text-bubble > span {
		color: var(--color-heading);
	}

	.head-contacts .text-bubble span {
		display: inline-flex;
		flex-flow: row nowrap;
		font-size: var(--text-size-l);
		gap: 4cqw;
	}

	.head-contacts .text-bubble span.contact-links > .mail-to {
		display: none;
	}

	.head-contacts .text-bubble span a {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: clamp(1.5rem, -1.1304rem + 5.6522cqw, var(--text-size-l));
		font-weight: 600;
		gap: min(1rem, 1cqh);
		color: var(--color-text);
		transition: 500ms ease;
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

		svg {
			width: clamp(25px, -0.2rem + 12cqw, 4cqw);
			aspect-ratio: 1;
			fill: var(--color-text);
		}

		svg path {
			fill: var(--color-text) !important ;
		}
	}

	/* about menu */
	/* ////////// */
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
			scale: 1;
			transition: 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
			animation: sway 30s linear 9s backwards;
		}

		img {
			animation-duration: 90s !important;
			animation-delay: 9s !important;
		}

		.text-bubble > p:not(:nth-of-type(n + 3)) {
			color: color-mix(in srgb,var(--color-text,#ffffff) 70% , var(--accent-color ,var(--black)) 90% );
			max-width: 37ch;
		}

		.text-bubble > p:nth-of-type(1) {
			line-height: 2;
		}
	}

	li.head-about {
		position: relative;
		display: flex;
		font-size: clamp(1.2rem, -0.9606rem + 2.8522cqw, var(--text-size-l));
		scrollbar-color: color-mix(in srgb, #2c5d98, var(--primary-color, var(--black)) 40%) transparent;
		scrollbar-color: color-mix(
				in srgb,
				var(--color-bg, #2c5d98),
				var(--primary-color, var(--black)) 26%
			)
			transparent;
	}

	.head-about .text-bubble > :nth-child(n) {
		max-width: 43ch;
		font-size: inherit;
	}


	.head-about .rm-btn-container {
		display: flex;
		align-items: end;
		justify-content: end;
		height: fit-content;
		margin-top: 2rem;
	}

	.head-about button.read-more-btn {
		--_btn-hue: var(--accent-color);
		--_btn-color2: color-mix(
			in srgb,
			var(--_btn-hue, #ffffffc7),
			color-mix(in lab, var(--color-bg), #ffffff98 50%) 90%
		);
		place-content: center;
		padding-inline: var(--pill-padding);

		background-color: var(--_btn-color2);
		color: color-mix(in srgb, var(--color-text, #ffffff) 70%, var(--_btn-hue, var(--black)) 90%);
		border: solid 2px;
		border-color: var(--_btn-color2);
		border-radius: var(--pill-radius);

		max-width: fit-content;
		min-height: 3rem;
		text-wrap: nowrap;
		font-size: var(--text-size-s);
		cursor: pointer;
		transition: 500ms ease;

		@starting-style {
			opacity: 0;
			scale: 0.8;
		}
	}

	/* read more */
	/* ///////// */

	:global(.menu-container:has(.read-more)) {
		--menu-height: 100cqh;
		background-color: color-mix(in hsl, var(--color-bg) 60%, transparent);

		.read-more {
			margin-top: calc(var(--intro-element-displacement) - 7cqh);
			height: 90cqh;
			overflow-y: scroll;
			overflow-x: visible;
		}

		.headerUl {
			margin-left: 0;
			justify-content: center;
		}

		.header-logo {
			--logo-width: clamp(20cqw, -0.1rem + 87cqw, 29cqw);
			min-width: var(--logo-width);
		}

		.header-logo a {
			max-width: 100%;
			aspect-ratio: 1;
			width: 100%;
			translate: 0 9rem;
		}

		.header-logo a .profile {
			--g: /27.486% 27.486% radial-gradient(#000 calc(71% - 1px), #0000 71%) no-repeat;
			aspect-ratio: 1;
			max-width: 75cqw;
			min-height: 20cqh;
			animation: none;
		}

		.header-logo a .profile::after {
			--g: /29.486% 26.486% radial-gradient(#000 calc(71% - 1px), #0000 71%) no-repeat;
			background-color: color-mix(in srgb, #2c5d98, var(--primary-color) 40%);
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

		.text-bubble {
			display: flex;
			flex-direction: column;
			width: 100%;
			padding-left: 5cqw;
			background-color: transparent;
			border: none;
			gap: 1rem;
			filter: none;
		}

		.text-bubble > p:nth-child(1) {
			font-size: inherit;
			line-height: 1.5;
		}
	}

	li.read-more {
		position: relative;
		flex-direction: row;
		font-size: clamp(1.2rem, -0.3006rem + 2.8522cqw, 2rem);
		max-width: 900px;
		padding-top: 7rem;
		overflow-y: auto;
		overflow-x: visible;
	}

	.read-more h2 {
		font-size: clamp(1.5rem, -0.1304rem + 3.6522cqw, var(--text-size-l));
		height: fit-content;
		color: color-mix(in hsl, var(--color-text), var(--color-bg) 60%);
		margin-block: 2rem 1rem;
	}

	.read-more .text-bubble {
		--_ct: oklch;
	}
	.read-more .text-bubble > p {
		max-width: 45ch;
		height: fit-content;
		color: color-mix(in var(--_ct), var(--color-text), var(--color-bg) 30%);
		color: color-mix(in var(--_ct), var(--color-text) 100%, var(--accent-color) 10%);

		&:nth-of-type(n + 3) {
			line-height: 1.3;
			font-size: clamp(1.3rem, -0.96rem + 2.8522dvw, var(--text-size-l));
		}
	}


	.read-more .previous-roles:nth-of-type(1) {
		display: flex;
		align-items: top;
		justify-content: top;
		margin-block: 2rem 1rem;
		flex-direction: column;

		h2 {
			flex: 1 1 50%;
			font-size: clamp(1.5rem, -0.1304rem + 3.6522cqw, var(--text-size-l));
			min-width: fit-content;
			height: fit-content;
			margin-block: 2rem 2rem;
		}

		ul {
			flex: 1 1 auto;
			display: inherit;
			flex-flow: row wrap;
			gap: 0.5rem;
		}

		li {
			--_pill-hue: var(--accent-color);
			--_pill-color2: color-mix(
				in var(--_ct),
				var(--_pill-hue, #ffffffc7),
				color-mix(in lab, var(--color-bg), #ffffff98 50%) 90%
			);
			--_pill-color2: color-mix(
				in xyz,
				var(--_pill-hue, #ffffffc7),
				color-mix(in lab, var(--color-bg), #ffffff98 50%) 90%
			);
			place-content: center;
			padding-inline: var(--pill-padding);
			margin-bottom: 1rem;
			border-radius: var(--pill-radius);

			background-color: var(--_pill-color2);
			color: color-mix(
				in var(--_ct),
				var(--color-text, #ffffff) 70%,
				var(--_pill-hue, var(--black)) 90%
			);
			border: solid 2px;
			border-color: var(--_pill-color2);
			filter: drop-shadow(var(--_btn-shadow-color) 0px 10px 15px);

			max-width: fit-content;
			min-height: 3rem;
			text-wrap: nowrap;
		}
	}

	.read-more .approaches {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-block: 2rem 1rem;

		li {
			all: unset;
		}

		.apr-pill.apr-pill {
			--_ct: oklch;
			--_pill-hue: var(--accent-color);
			--_pill-color2: color-mix(
				in var(--_ct),
				var(--_pill-hue, #ffffffc7),
				color-mix(in lab, var(--color-bg), #ffffff98 50%) 90%
			);

			all: unset !;
			font-size: var(--text-size-m);
			font-weight: 200;
			text-align: center;
			align-items: center;

			place-content: center;
			padding-inline: var(--pill-padding);
			margin-bottom: 1rem;
			border-radius: var(--pill-radius);

			color: color-mix(
				in var(--_ct),
				var(--color-text, #ffffff) 70%,
				var(--_pill-hue, var(--black)) 90%
			);
			border: solid 3px var(--_pill-hue);
			border-color: color-mix(
				in var(--_ct),
				var(--_pill-hue, #ffffffc7) 70%,
				color-mix(in srgb, var(--color-bg), #ffffff98 50%) 50%
			);
			background-color: color-mix(
				in var(--_ct),
				var(--_pill-hue, #ffffffc7),
				color-mix(in srgb, var(--color-bg), #ffffff98 50%) 90%
			);

			max-width: fit-content;
			min-height: 3rem;
		}

		/* li:has(p){
			background-color: transparent;
			border: none;
			padding: none;

			p{
				all: unset;
				place-content: center;
				padding-inline: var(--pill-padding);
				margin-bottom: 1rem;
				border-radius: var(--pill-radius);
				background-color: inherit;
				color: color-mix(in srgb,var(--color-text,#ffffff) 70% , var(--_btn-hue ,var(--black)) 90% );

				max-width: fit-content !important;
				width: fit-content;
				min-height: 3rem;
				text-wrap: nowrap;
			}
		}
	}

	.read-more :global(.lucide:nth-of-type(n)) {
		--_lucide-c: color-mix(in var(--_ct), var(--color-text) 80%, var(--color-bg) 60%);
		color: color-mix(
			in var(--_ct),
			var(--_lucide-c, #2c5d98),
			var(--primary-color, var(--color-heading)) 36%
		);
		margin-left: 1rem;
		transition:
			color 300ms ease,
			fill 300ms ease;
		fill: currentColor;
	}

	.read-more .rm-btn-container {
		display: flex;
		position: sticky;
		bottom: 2rem;
		left: -3rem;
		height: fit-content;
	}

	.read-more button.read-more-btn {
		place-content: center;
		font-size: var(--text-size-s);
		transition: 500ms ease;

		@starting-style {
			opacity: 0;
			scale: 0.8;
		}
	}

	/* main menu navigation */
	/* //////////////////// */
	:global(.menu-container:has(.menu-routes)) {

		.menu-routes {
			flex: 2 1 auto;
			justify-content: center;
			display: flex;
			flex-flow: column;
			margin-top: 15%;
			line-height: 1.7;
			font-size: clamp(1.8rem, -0.1304rem + 3.6522cqw, 3rem);
			color: var(--color-text);
			height: 100%;
		}

		.header-logo a {
			translate: -2rem calc(var(--intro-element-displacement) - 1rem);
		}
	}

	.menu-routes span :is(a, button) {
		border: none;
		background: none;
		font-size: inherit;
		color: currentColor;
		cursor: pointer;
	}

	.menu-routes .noLink {
		pointer-events: none;
		cursor: default;
		opacity: 0.6;
		color: gray;
	}

	.headerUl:has(li:nth-of-type(n) a:hover) .flower {
		--g: /27.486% 27.486% radial-gradient(#000 calc(71% - 1px), #0000 71%) no-repeat;
		transition: transform 1s 100ms;
		transform: rotateY(0.5turn);
		/* animation:flip 1s alternate forwards .1s   ; */
	}

	.headerUl:has(li:nth-of-type(1) a:not(:hover)) .flower {
		transition: 0.9s cubic-bezier(0.175, 0.885, 0.32, 1.275) 100ms;
		/* animation: sway 10s backwards infinite .1s; */
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

	@keyframes launch {
		50% {
			filter: blur(1px);
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

	@keyframes buble-text-in {
		0%,12% {
			opacity: 0.2;
			translate: -3% 0 ;
			scale: .99;
		}
		to {
			opacity: 1;
			translate: 0;
		}
	}

	@media (width < 1000px) {
		li.head-about button.read-more-btn {
			display: grid;
		}

		:global(.menu-container:has(.menu-routes)) {


			.headerUl .menu-routes {
				display: flex;
				flex-flow: column;
				margin-top: 20%;
				line-height: 1.7;
			}
		}
	}

	@media (width < 650px) {
		.menu-container {
			--container-block-padding: calc(var(--H-top) + 12cqh);
		}

		.active {
			flex: 1 1 auto;
			min-height: min(60lvh,var(--menu-height));
			min-height: clamp(60cqh, var(--menu-height), 95lvh);
			height: fit-content;
			background-color: color-mix(in oklch, var(--color-bg, #ffffff82) 60%, #ffffff33 80%);
			border-bottom: solid 5px color-mix(in oklch, var(--color-bg, #ffffff82) 50%, #ffffff33 80%);
		}

		.active ul.headerUl {
			flex-direction: column;
			height: 100%;
			padding: 0;
			margin-left: 0;
		}

		.headerUl > li:nth-of-type(n + 2) {
			width: 100%;
			height: 100%;
			justify-self: end;
			padding-top: 4cqh;
			padding-inline: var(--Padding-genral);
			gap: 2cqh;
		}

		/* .headerUl > li{
			outline: solid red;
		} */

		.headerUl li.header-logo {
			margin-block: var(--container-block-padding) 0;
			aspect-ratio: 1;
			width: clamp(1rem, 0.5vw + 100cqw, 100%);
			height: fit-content;
			justify-content: center;
			max-height: 20dvh;
		}

		.headerUl li.header-logo a {
			align-items: center;
			align-self: center;
			width: clamp(1rem, 0.5vw + 100cqw, 100%);
			max-height: 100%;
			translate: unset !important;

			& .profile {
				height: 100% ;
				aspect-ratio: 1;
				width: auto !important;
			}
		}

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

		:global(.menu-container:has(.head-contacts)) {
			.head-contacts {
				max-height: fit-content;
				margin: 0;
				padding-top: 5%;
				padding-inline: 0;
				align-items: top;
				justify-content: start;
			}

			.text-bubble {
				padding: 4%;
				line-height: 1.5;
				border-radius: 13.7px;
				width: 100%;
			}

			.contact-links {
				width: 100%;
				justify-content: space-around;
			}

			.contact-links a {
				aspect-ratio: 1;
			}
			.contact-links a.mail-to {
				display: block;
			}
			.contact-links svg {
				width: clamp(40px, -0.2rem + 12cqw, 4cqw);
			}
		}

		.headerUl .head-contacts span {
			gap: 12cqw;
		}

		.head-contacts	.text-bubble:has(.mail-to) {
			display: flex;
			margin-top: 2rem;

			:global(.lucide){
				width: 100%;
				height: 100%;
			}
		}

		.head-contacts	.text-bubble:has(.email) {
			display: none;
		}

		:global(.menu-container:has(.head-about)) {
			
			.headerUl .header-logo {
				width: 100%;
			}

			.head-about .text-bubble:nth-of-type(2){
				display: none;
			}
		}


		li.head-about p {
			max-width: 100%;
			height: fit-content;
			&:nth-of-type(1) {
				margin-top: 0;
			}
		}

		:global(.menu-container:has(.read-more)) {
			--menu-height: 100lvh;

			.headerUl {
				overflow: auto;
				max-height: fit-content;
			}

			.headerUl .header-logo a .profile {
				width: 100%;
			}

			.read-more {
				flex-direction: column;
				overflow-y: scroll;
				height: 60cqh;

				margin: 0;
				padding: 0;
			}

			.text-bubble {
				width: 100%;
				height: 340svh;
				padding-bottom: var(--container-block-padding);
			}

			.approaches {
				align-items: center;

				.apr-pill {
					border-radius: 10px;
					line-height: 1.5;
					text-align: left;
				}

				:global(.lucide:nth-of-type(n)) {
					margin-left: 0;
				}
			}

			.previous-roles:nth-of-type(1) {
				margin: 0;
			}
		}

		:global(main:has(button:is(.close-btn,.about-btn,.contact-btn):hover) article.active) {
			height: calc-size(fit-content, size + 2%) !important;
			transition: .4s cubic-bezier(0.375, 0.685, 0.32, 1.275);
		}

		.headerUl .menu-routes {
			display: flex;
			flex-flow: column;
			line-height: 1.7;
		}
	}

	@media (height < 500px) {
		.menu-container {
			--menu-height: 100cqh;
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
