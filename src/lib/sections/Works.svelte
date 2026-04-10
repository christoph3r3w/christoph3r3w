<script lang="ts">
	import { onMount } from 'svelte';
	import { OrderedList, ContactForm, StickerBed } from '$lib';
	import { fade, fly } from 'svelte/transition';
	import QRCode from 'qrcode';
	import { ListCollapse, ListIndentDecrease, QrCode, XIcon } from '@lucide/svelte';

	interface Work {
		title: string;
		slug: string;
		published: { is: boolean; date: string };
		description: string;
		assets: { image: string[]; icon?: string; color?: string };
		link: { src: string; showType: '' | 'mobile' | 'desktop' };
		dateStart: string;
		dateEnd: string;
		status: { is: string; sticker: string };
		contentBlock?: Array<{
			text?: string[];
			images?: string[];
			h2?: string;
			html?: string;
			video?: string;
		}>;
		collaborators?: Record<string, string>;
		tags?: string[];
	}

	// throw new Error('test error');
	let { data } = $props();
	let { dataWorks, projects, delay } = $derived(data);
	let firstLoad: boolean = $state(true);

	let pagination = $derived(dataWorks[0].pagination);
	let openDetailsIndex = $state<number | null>(null);
	let m4 = $derived(openDetailsIndex);
	let works = $derived(dataWorks[1]?.works.filter((w: Work) => w.published.is === true));
	let fileLinks = $derived(works[m4 ?? 0]?.link.src);

	let qrTimeout: ReturnType<typeof setTimeout> | null = $state(null);
	let qrURL = $state('');
	let showQr: boolean = $state(false);
	let showDescription: boolean = $state(false);

	const toggleQR = () => {
		showQr = !showQr;
	};

	async function generateQRCode(text: string): Promise<string> {
		if (!text) {
			qrURL = '';
			return qrURL;
		}
		try {
			qrURL = await QRCode.toDataURL(text, {
				width: 200,
				margin: 1,
				color: { dark: showQr ? '#000000' : '#00000010', light: '#00000000' }
			});
		} catch (err) {
			console.error(err);
		}
		return qrURL;
	}

	function clearQRTimeoutOnUnmount() {
		if (qrTimeout !== null) {
			clearTimeout(qrTimeout);
			qrTimeout = null;
		}
	}

	function handleClose(e: MouseEvent) {
		e.preventDefault();
		const details = e.currentTarget as HTMLElement;
		const detailsElement = details.closest('details');
		if (!detailsElement) return;

		// Blur active element inside the details content before closing
		if (document.activeElement && detailsElement.contains(document.activeElement)) {
			(document.activeElement as HTMLElement).blur();
		}

		detailsElement.open = false;
	}

	function moveDescription(e: MouseEvent) {
		const parentDetails = (e.currentTarget as HTMLElement).closest('details');

		if (parentDetails) {
			const descriptions = parentDetails.querySelectorAll('.work-description');
			descriptions.forEach((desc) => {
				desc.classList.toggle('move-description');
			});

			// Only toggle the description in the current details element
			const currentDetails = (e.currentTarget as HTMLElement).closest('details');
			if (currentDetails) {
				const currentDescription = currentDetails.querySelector('.work-description');
				if (currentDescription && currentDescription.classList.contains('move-description')) {
					showDescription = true;
				} else {
					showDescription = false;
				}
			}
		}
		return showDescription;
	}

	function clearLoadAnimation() {
		setTimeout(() => {
			firstLoad = false;
		}, delay ?? 2000);
	}

	onMount(() => {
		// let m3 = document.querySelector('.file-1')?.setAttribute('open','');
		return () => {
			clearQRTimeoutOnUnmount();
			works = [];
			fileLinks = '';
		};
	});

	$effect(() => {
		// loading animation clear after project is loaded
		projects.then(() => {
			clearLoadAnimation();
			// let m3 = document.querySelector('.file-4')?.setAttribute('open','');
		});

		// Only generate QR code when fileLinks changes
		generateQRCode(fileLinks);

		// Clear qr timeout
		if (m4 === null) {
			showQr = false;
			if (qrTimeout !== null) {
				clearTimeout(qrTimeout);
				qrTimeout = null;
			}
		}

		// set timeout to hide QR code after x seconds
		if (showQr) {
			qrTimeout = setTimeout(() => {
				showQr = false;
				qrTimeout = null;
			}, 9000);
		}

		return () => {
			clearQRTimeoutOnUnmount();
		};
	});
</script>

{#snippet summaryContent(work: Work)}
	<summary
		class={work.status.is == 'experiment' ? 'experiment' : ''}
		onmouseenter={() => {
			handleClose;
		}}
	>
		{#if work.assets.icon?.trim()}
			<span class="work-icon-span">
				<img src={work.assets.icon} alt={work.title} width="auto" height="30" />
			</span>
		{/if}
		<span class="file-title">{work.title}</span>
		<span class="small-description">{work.slug}</span>
		<div class="side-description">
			<span class="date-start">{work.dateEnd || work.dateStart || ''}</span>
			<span class="status">{work.status.sticker || `an ${work.status.is}`}</span>
		</div>
		<div class="close-file-icon">
			<svg
				width="24"
				height="25"
				viewBox="0 0 24 25"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M23.2396 21.8955C23.7523 22.4204 23.7523 23.2715 23.2396 23.7965C22.9841 24.0581 22.6481 24.1906 22.3121 24.1906C21.9761 24.1906 21.6401 24.0599 21.3846 23.7965L11.8121 13.996L2.23956 23.7965C1.98406 24.0581 1.64806 24.1906 1.31206 24.1906C0.97606 24.1906 0.640063 24.0599 0.384563 23.7965C-0.128187 23.2715 -0.128187 22.4204 0.384563 21.8955L9.95706 12.0951L0.384563 2.29474C-0.128187 1.76978 -0.128187 0.918677 0.384563 0.393719C0.897313 -0.13124 1.72857 -0.13124 2.24132 0.393719L11.8138 10.1942L21.3863 0.393719C21.899 -0.13124 22.7303 -0.13124 23.2431 0.393719C23.7558 0.918677 23.7558 1.76978 23.2431 2.29474L13.6706 12.0951L23.2396 21.8955Z"
				/>
			</svg>
		</div>
	</summary>
{/snippet}

{#snippet workAssets(work: Work)}
	<article class="work-assets">
		<div class="asset-border b-left"></div>
		<div class="asset-border b-right"></div>
		<div class="asset-border b-bottom"></div>
		{#if work.contentBlock}
			{#if work.description}
				<article class="content-block">
					<p>{work.description}</p>
				</article>
			{/if}
			{#each work.contentBlock as block, i}
				<article class="content-block block-{i}">
					{#if block.text && block.text.length > 1}
						<h2>{block?.h2}</h2>
						{#each block.text as textLine}
							<p>{@html textLine}</p>
						{/each}
					{:else if block.text}
						<p>{@html block.text}</p>
					{/if}
					{#if block.images}
						{#each block.images as img}
							<button
								class="asset-img-ctnr"
								onclick={(e) => {
									const parentBlock = e.currentTarget.closest(`.block-${i}`);
									parentBlock?.querySelectorAll('.asset-img-ctnr').forEach((btn) => {
										btn.classList.toggle('big-asset');
									});
								}}
							>

								<picture>
								
									<img src={img} alt="" />
								</picture>
							</button>
						{/each}
					{/if}
					{#if block.video}
						<video class="asset-video" autoplay muted loop poster="/works-assets/redpers/Group.avif">
							<source src={block.video} type="video/mp4" />
							Your browser does not support the video tag.
						</video>
					{/if}
					{#if block.html}
						{@html block.html}
					{/if}
					<!-- {#each block.images as img}
					<input type="radio" name="toggle" id="toggle-{i}" style="position:absolute;">
				{/each} -->
				</article>
			{/each}
		{/if}
	</article>
{/snippet}

{#snippet workDescription(work: Work)}
	<article id={`${work.title}-file`} class="work-description {showQr ? 'show-qr-links' : ''}">
		<h2>{work.slug}</h2>
		<div class="description-space"></div>
		<div class="description-info">
			<ul class="collaborators">
				{#if work?.collaborators}
					{#each Object.entries(work.collaborators) as [role, name] (role)}
						<li>
							<p class="collaborator-role">{role}</p>
							<span class="list-line"></span>
							<p class="collaborator-name">{name}</p>
						</li>
					{/each}
				{/if}
			</ul>
			<ul class="tools stamp">
				<li class="tags">HTML</li>
				<li class="tags">CSS</li>
				<li class="tags">JavaScript</li>
				{#each work.tags as tag, i}
					<li class="tags" style="--tag-id:{i + 3 + tag.length}">{tag}</li>
				{/each}
			</ul>
		</div>
	</article>

	<article class="work-description note stamp {showQr ? 'show-qr-qr' : ''}">
		<div class="description-space">
			<button onclick={moveDescription}>
				{#if showDescription}
					<ListCollapse size="20" />
				{:else}
					<ListIndentDecrease size="20" />
				{/if}
			</button>
		</div>
		<div class="qr-container">
			{#if work.link}
				{#if showQr}
					<p>Scan the QR code to visit the site</p>
				{/if}
				<img src={qrURL} alt="QR Code" class="qr-code" />
				{#if work.link.showType != 'desktop'}
					<button class="{{ disabled: !work.link.src }} qr-btn" onclick={toggleQR}>
						{showQr ? 'Hide QR' : 'QR'}
					</button>
				{/if}
			{:else}
				<p>No link available for this project</p>
			{/if}
		</div>
		<div class="description-links">
			<a
				class="{{ disabled: !work.link.src }} link-btn"
				href={work?.link.src}
				target="_blank"
				rel="noopener noreferrer"
			>
				{showQr ? 'Link →' : 'Visit site'}
			</a>
			{#if work.link.showType != 'desktop'}
				<button
					class="{{ disabled: !work.link.src }} qr-btn"
					onclick={toggleQR}
					title={showQr ? 'close QR' : 'Qr code'}
				>
					<!-- {showQr ? 'X' : 'QR'} -->
					{#if showQr}
						<XIcon />
					{:else}
						<QrCode />
					{/if}
				</button>
			{/if}
		</div>
	</article>
{/snippet}

{#snippet loadingFiles()}
	{@const t = 4}
	{#each { length: t }, i}
		<details
			transition:fade
			class="file loading"
			style="--file-index:{i +
				1}; --file-primary-color:rgba(213, 213, 213, 0.904); --total-work:{t}"
		>
			<summary tabindex="-1" class="experiment">
				<span class="work-title">...loading</span>
			</summary>
		</details>
	{/each}
{/snippet}

{#snippet contactForm()}
	<details
		transition:fade
		class="file file-{works.length} file-contact"
		style="--file-index:calc(var(--total-work) ); --work-icon: url('/works-assets/material-assets/Chris website14.avif'); --file-primary-color:green;"
	>
		<summary tabindex="-1" class="experiment">
			<span class="file-title"> your project here ??? </span>
			<span class="cover-content sticker-label"
				><img src="/chris icon lowlowres.avif" alt="chris icon" /></span
			>
			<div class="close-file-icon">
				<svg
					width="24"
					height="25"
					viewBox="0 0 24 25"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M23.2396 21.8955C23.7523 22.4204 23.7523 23.2715 23.2396 23.7965C22.9841 24.0581 22.6481 24.1906 22.3121 24.1906C21.9761 24.1906 21.6401 24.0599 21.3846 23.7965L11.8121 13.996L2.23956 23.7965C1.98406 24.0581 1.64806 24.1906 1.31206 24.1906C0.97606 24.1906 0.640063 24.0599 0.384563 23.7965C-0.128187 23.2715 -0.128187 22.4204 0.384563 21.8955L9.95706 12.0951L0.384563 2.29474C-0.128187 1.76978 -0.128187 0.918677 0.384563 0.393719C0.897313 -0.13124 1.72857 -0.13124 2.24132 0.393719L11.8138 10.1942L21.3863 0.393719C21.899 -0.13124 22.7303 -0.13124 23.2431 0.393719C23.7558 0.918677 23.7558 1.76978 23.2431 2.29474L13.6706 12.0951L23.2396 21.8955Z"
					/>
				</svg>
			</div>
		</summary>
		<article class="work-description">
			<h2>Lets get in contact</h2>
			<!-- <div class="description-space"></div>  -->
			<div class="description-info">
				<form action="/contactForm" method="post">
					<fieldset>
						<input type="text" name="name" placeholder="full Name" required />
						<input type="email" name="email" placeholder="Your Email" required />
					</fieldset>
					<fieldset>
						<textarea name="message" placeholder="Your Message" required></textarea>
					</fieldset>
					<button type="submit">Send</button>
				</form>
			</div>
			<div class="mail-preview">
				<h2>x</h2>
			</div>
		</article>
	</details>
{/snippet}

{#snippet noFiles()}
	<details class="work-cover" style="--file-index:4">
		<summary tabindex="-1" class="experiment">
			<p class="cover-content">it seems quite here</p>
			<span class="cover-content sticker-label"
				><img src="/chris icon lowlowres.avif" alt="chris icon" /></span
			>
		</summary>
	</details>
{/snippet}

<div class="work-section pad" id="works" style="--file-index:0; --total-work:{works.length};">
	<section class="Orderedlist-container">
		<OrderedList {pagination} {works} />
	</section>

	<!-- onclick it will close all details -->
	<details class="work-cover" id="folder-cover">
		<summary tabindex="-1">
			<p class="cover-content">Portfolio</p>
			<StickerBed />
		</summary>
	</details>
	{#await projects}
		{@render loadingFiles()}
	{:then dataWorks}
		{@const works = dataWorks[1]?.works.slice(0).filter((w: Work) => w.published.is === true) || []}
		{#each works as work, i}
			{#key work.slug}
				<details
					class="file file-{i + 1} {firstLoad ? 'jump' : ''}"
					style="--file-index:{i + 1}; --work-icon: url('{work.assets.icon}'); {work.assets.color
						? `--file-primary-color:${work?.assets.color}`
						: ''}"
					ontoggle={(e) => {
						if (e.currentTarget.open) {
							openDetailsIndex = i;
						} else if (openDetailsIndex === i) {
							openDetailsIndex = null;
						}
					}}
				>
					{@render summaryContent(work)}
					{@render workDescription(work)}
					{@render workAssets(work)}
				</details>
			{/key}
		{:else}
			{@render noFiles()}
		{/each}
		<!-- {@render contactForm()} -->
	{:catch error}
		<details class="work-cover">
			<summary tabindex="-1" class="experiment">
				<p class="cover-content sticker-label">something went wrong</p>
				<span class="cover-content sticker-label"
					><img src="/chris icon lowlowres.avif" alt="chris icon" /></span
				>
			</summary>
		</details>
	{/await}
</div>

<style>
	:root {
		--total-work: 0;
		/* --file-index:1; */
		--move: 0;
		/* --file-primary-color:#df3188; */
		/* --file-primary-color:oklab(82.281% -0.10253 0.16777); */
		--file-primary-color-amount: 99%;
		--hue-number: 913;

		--file-primary-hue: color-mix(
			in oklch longer hue,
			hsl(calc(213 * 700 / var(--file-index)), 55%, 38%),
			var(--file-primary-color) 90%
		);
		--file-primary-hue: var(---primary-color);
		--file-cover-color: color-mix(in oklch, #f5e5b9, rgba(255, 255, 255, 0.466) 30%);
		--file-cover-color: rgba(255, 255, 255, 0.834);
		--file-cover-color: var(--tritary-color);

		--transition-timing: cubic-bezier(0.62, -0.1, 0.36, 1);
		--transition-timing: cubic-bezier(0.294, -0.291, 0.247, 1.056);
		--transition-duration: 0.7s;
		--delay-factor: 0.1s;

		--sticker-color: hsla(21, 79%, 51%, 0.974);
		--sticker-width: 0;
		--sticker-height: 0;
		--sticker-rotation: 0deg;
		font-family: 'Geist Sans', sans-serif;

		@property --file-primary-hue {
			syntax: '<color>';
			inherits: false;
			initial-value: 0;
		}

		@property --file-index {
			syntax: '<integer>';
			inherits: false;
			initial-value: 0;
		}
	}

	.work-section:has(details[open]) .Orderedlist-container {
		filter: opacity(0.3) blur(1px);
		pointer-events: none;
	}

	.work-section {
		border-radius: inherit;
		gap: 1rem;
		container-type: inline-size;
		will-change: transform, filter, top, left;
	}

	/* Hover effect for the summary */
	/* .work-section, */
	.work-section:where(
		:focus-within,
		:focus-visible,
		:hover,
		.Orderedlist-container:is(:hover, :focus-within)
	),
	.work-section:where(:focus-within, :focus) {
		--move-all: 17dvw;

		.Orderedlist-container:is(:hover, :focus-within) {
			--move: calc(46vh + (-43vh * var(--file-index) / var(--total-work, 1)));
		}

		/* folder cover animation */
		details.work-cover :is(summary, ::details-summary),
		details.work-cover summary {
			--transition-duration: 900ms;
			--move: calc(40dvh + 1dvw * var(--total-work));

			top: var(--move);
			left: calc(var(--move-all) - 2rem);
			color: var(--color-text);
			filter: blur(0) opacity(0.45);
			backdrop-filter: blur(9px);
			pointer-events: none;
			transition:
				top var(--transition-duration) 100ms,
				left var(--transition-duration) 200ms;
			z-index: 11;

			@container (width < 900px) {
				--move: calc(53vh - var(--total-work));
				inset-inline: 2%;
			}

			&::after {
				pointer-events: none;
			}
		}

		/* files animation */
		details.file :is(summary, ::details-summary),
		details.file:is(:focus-within) summary {
			--move: calc(46vh + (-43vh * (var(--file-index) / var(--total-work, 1))));
			--shadow-1-radius: calc(-4px + 0.5px * (var(--file-index)));
			--shadow-1-color: color-mix(in oklch, var(--file-primary-hue), rgba(0, 0, 0, 0.259) 30%);
			top: calc(var(--move));
			left: calc(0.1dvw * var(--total-work) + 10px * tan(var(--file-index)) + var(--move-all));

			box-shadow:
				var(--shadow-1-color) 0px 5px 8px -5px,
				rgba(0, 0, 0, 0.2) 0px -3px 0px inset;

			transition-property: color, top, left, rotate;

			@starting-style {
				--move: calc(46vh + (-9vh * (var(--file-index) / var(--total-work, 1))));
				opacity: 0;
			}

			@container (width < 900px) {
				/* --move:calc(53dvh - 45vh * (var(--file-index) / var(--total-work)));  */
				inset-inline: 2%;
			}
		}

		/* content on cover animation */
		:global(details.work-cover .cover-content:nth-child(1) ~ .sticker-label) {
			filter: saturate(0.3);
			scale: 1.1;
			opacity: 0;
			/* transform: translate(0, 3rem ) rotate(4deg); */
			/* transform: translate(0) rotate(4deg); */
			transition: all 500ms ease;
		}

		details.file summary span > img {
			opacity: 1;
		}

		&::selection {
			color: var(--color-text);
			background-color: yellow;
		}
	}

	/* the details component */
	details {
		border-radius: inherit;
		user-select: text;

		&[open] {
			display: none;
		}
	}

	/* file and folder styling */
	details:nth-of-type(n) > summary {
		position: absolute;
		inset: 0;
		display: flex;
		padding: var(--Padding-genral);
		font-size: 1.5rem;
		list-style-position: outside;
		z-index: calc(10 - var(--file-index));

		background-attachment: fixed;
		background-origin: border-box;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-position: 100% 100%;
		background-blend-mode: color-dodge;

		/* Enhanced transitions using the new variables */
		will-change: top, left, right, color, background-color, translate;
		backface-visibility: hidden;
		perspective: 1000px;
		transition:
			top var(--transition-duration) var(--transition-timing)
				calc(var(--file-index) * var(--delay-factor)),
			left var(--transition-duration) var(--transition-timing)
				calc(var(--file-index) * var(--delay-factor)),
			right var(--transition-duration) var(--transition-timing)
				calc(var(--file-index) * var(--delay-factor)),
			color 0.32s ease,
			background-color 0s,
			translate 0.2s var(--transition-timing);

		@supports (corner-shape: superellipse(0)) {
			& {
				corner-shape: superellipse(1.2);
			}
		}

		&::-webkit-details-marker,
		&::marker {
			content: '';
			display: none;
		}

		&:nth-of-type(1n) {
			background-image: url('/works-assets/material-assets/paper 1 black&white transparent cropped (Custom).avif');
		}

		&:nth-of-type(n).experiment {
			background-image: url('/works-assets/material-assets/Chris website14.avif');
			background-blend-mode: soft-light;
		}

		/* every section in the summary close state */
		> span {
			flex: 0 1 fit-content;
			width: 30px;
			height: fit-content;
			margin-right: 1%;
			overflow: hidden;
			color: color-mix(in oklch, var(--file-primary-hue), rgb(14, 14, 14) 45%);
			color: color-mix(
				in oklch,
				var(--file-primary-hue),
				var(--color-text-mute, var(--color-text)) 45%
			);
			font-size: 2rem;
			font-weight: 700;
			text-shadow: 3px 2px 3px rgba(255, 255, 255, 0.2);
			/* outline: solid; */
		}

		.file-title {
			flex: 2 1 auto;
			flex: 1 1 30%;
			text-wrap: nowrap;
			/* margin-left: 1rem; */
			/* display: none; */
			/* color: color-mix(in oklch, var(--file-primary-hue), rgb(14, 14, 14) 55%); */
			/* color: color-mix(in oklch, var(--file-primary-hue), var(--color-text) 95%); */
		}

		.close-file-icon {
			height: 2rem;
			width: 2rem;
			text-align: end;
			opacity: 0;
		}

		.small-description {
			flex: 0 2 fit-content;
			white-space: nowrap;
			font-size: 1rem;
			height: 2rem;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.work-icon-span {
			flex: 0 1;
			flex-basis: clamp(2.5%, 100%, 30px);
			position: relative;
			width: fit-content;
			width: 100%;
			/* max-width: max(30px,3%); */
			height: fit-content;
			/* aspect-ratio: 1; */
			/* outline: solid red; */
		}

		.work-icon-span > img {
			/* outline: solid rgb(0, 255, 0); */
			/* width: 100%; */
			width: clamp(2.5%, 100%, 30px);
			height: 100%;
			aspect-ratio: 1;
			object-fit: cover;
			object-position: start;
			opacity: 0.3;
		}

		.side-description {
			position: absolute;
			transform-origin: left;
			bottom: 1rem;
			left: 2rem;
			rotate: -90deg;
			display: flex;
			height: fit-content;
			width: fit-content;
			flex-wrap: nowrap;
			gap: 10px;

			> span {
				font-size: 1rem;
			}
		}

		@container (width < 500px) {
			.small-description {
				display: none;
			}
		}
	}

	/* folder cover */
	details:is(#folder-cover, .work-cover) summary {
		font-size: clamp(2rem, 20vw, 10rem);
		color: var(--color-text);
		/* background-color: color-mix(in oklch longer hue, var(--hoverC,hsl(calc(213 - 90 / var(--file-index)), 55%, 38%)) , var(--primary-color,rgba(255, 255, 255, 0.466)) 30% ); */
		/* background-color: color-mix(in oklch longer hue, var(--hoverC,var(--primary-color,hsl(calc(213 - 90 / var(--file-index)), 55%, 38%))) , rgba(255, 255, 255, 0.466) 30% ); */
		/* background-color: var(--file-cover-color, color-mix(in oklch longer hue, var(--hoverC,var(--primary-color,hsl(calc(213 - 90 / var(--file-index)), 55%, 38%))) , rgba(255, 255, 255, 0.466) 30% )); */
		/* background-color: var(--file-cover-color); */
		background-color: color-mix(
			in oklch,
			var(--hoverC, var(--primary-color, hsl(calc(213 - 90 / var(--file-index)), 55%, 38%))) 60%,
			rgba(255, 255, 255, 0.466) 33%
		);

		background-image: url('/works-assets/material-assets/paper 1 black&white transparent cropped again (Custom flipped).avif');
		background-attachment: fixed !important ;
		background-size: none, cover;
		backdrop-filter: blur(2px);
		pointer-events: none;
		cursor: none;
		overflow: hidden;
		border-radius: var(--wc-radius);
		box-shadow:
			rgba(0, 0, 0, 0.4) 0px 2px 4px,
			rgba(0, 0, 0, 0.3) 0px 7px 13px -8px,
			rgba(0, 0, 0, 0.2) 0px -2px 0px inset;

		&::marker {
			display: none;
		}

		/* &::after{
			content: '';
			position: absolute;
			inset: 0;
			opacity: 0;
			pointer-events:none;
			cursor: pointer;
			z-index: 100;
		} */

		@container (width < 900px) {
			background-size: cover;
			background-position: 100% 100%;
			--move: calc(53dvh + 1dvw * var(--total-work));
			top: var(--move);
		}
	}

	/* initial general animation for files and folder and cover element */
	/* ///////////////////// */
	/* files covers */
	details.file summary {
		--file-primary-hue: color-mix(
			in oklch,
			hsl(calc(var(--hue-number, 213) / var(--file-index)), 55%, 38%),
			var(--file-primary-color) var(--file-primary-color-amount)
		);
		--move: calc(50vh + (-6.9svh * var(--file-index)));
		top: var(--move);
		right: 0;
		color: black;

		background-color: color-mix(in oklch, var(--file-primary-hue), rgba(255, 255, 255, 0.466) 10%);
		background-color: color-mix(in lab, var(--file-primary-hue), var(--color-bg) 20%);
		border-radius: var(--wc-radius) var(--wc-radius) var(--wc-radius) 0;
		border-radius: var(--wc-radius);
		border-radius: var(--wc-radius) var(--wc-radius) var(--wc-radius) 5px;
		backdrop-filter: blur(50px);

		@container (width < 900px) {
			--move: calc(65vw + (-8.5vw * var(--file-index)));
			border-radius: var(--wc-radius);
			inset-inline: 2%;
		}
	}

	/* files background overlay */
	details.file summary:nth-of-type(n)::before {
		content: '';
		background-color: color-mix(in oklch, var(--file-primary-hue), hsla(204, 93%, 33%, 0.566) 60%);
		background-color: color-mix(in oklch, var(--file-primary-hue), rgba(238, 130, 238, 0.462) 60%);
		background-color: color-mix(in lab, var(--file-primary-hue), rgba(173, 130, 238, 0.462) 55%);
		/* background-color: rgba(238, 130, 238, 0.462); */

		position: absolute;
		inset: 1rem;
		top: 4rem;
		left: 3rem;
		border-radius: inherit;
		z-index: 100;
		contain: paint content;
	}

	/* files background textures  */
	details.file:nth-of-type(odd) summary::before,
	details.file summary.experiment::before {
		/* background-image: url('/works-assets/material-assets/vertical-illustration-orange-graph-paper.avif'); */
		/* background-image: url('/works-assets/material-assets/Chris website20.avif'); */
		/* background-image: url('/works-assets/material-assets/Chris website1.avif'); */
		/* for dark backgrounds */
		background-blend-mode: lighten;
		background-blend-mode: soft-light;
		/* for both */
		/* background-blend-mode:saturation; */
		background-size: cover;
		background-position: 90% 0%;
		filter: opacity(0.5) contrast(150%) grayscale(0.8);
	}

	details.file:nth-of-type(even) summary::before {
		/* background-image: url('/works-assets/material-assets/27e9691d-e326-425b-a06f-f7efc3dc8a2f.avif'); */

		/* for dark backgrounds */
		background-blend-mode: lighten;
		/* for both */
		background-blend-mode: saturation;
		filter: opacity(0.5) contrast(150%) grayscale(0.8);
	}

	/* files styling and animation - hover or focus*/
	details.file:nth-of-type(n):is(:hover, :focus) :is(summary, ::details-summary) {
		--hover-file-top: -2rem;
		--hover-file-right: 6svw;

		left: calc(var(--hover-file-right) - (var(--file-index) * 2px));
		transform: rotate(calc(-2deg + 0.5deg * var(--file-index))) translateY(var(--hover-file-top));
		/* transform : rotate(calc(-2deg + .5deg * var(--file-index))) translateX(var(--hover-file-right)) translateY(var(--hover-file-top)); */
		transition-property: top, left, transform, height;
		transform-origin: top;
		transition:
			100ms var(--transition-timing),
			box-shadow 0s,
			filter 0s,
			background-color 200ms 100ms,
			transform-origin 0s;
		cursor: pointer;
		background-color: color-mix(in oklch, var(--file-primary-hue), rgba(255, 255, 255, 0.466) 20%);

		@container (width < 900px) {
			--move: calc(46vh + (-43vh * (var(--file-index) / var(--total-work, 1))));
			--hover-file-right: 0vw;
			--hover-file-top: -1rem;
			transform-origin: bottom left;
			transform: unset;
			left: 0;
		}
	}

	/* when hover or focus stops */
	details.work-cover:not(:hover, :focus, :active) :is(summary, ::details-summary) {
		transition: 600ms var(--transition-timing);
	}

	details.file:not(:hover, :focus, :active) :is(summary, ::details-summary) {
		transition: 200ms var(--transition-timing);
	}

	/* The content of the file - open state */
	/* /////////////////////////////////// */
	.work-section:has(details:nth-of-type(n)[open]) details {
		grid-column: span 10;
		z-index: 0;
		display: none;
		background-color: transparent;

		&[open] {
			display: block;
		}
	}

	.work-section:has(details:nth-of-type(n)[open]) details.file > summary {
		top: -2%;
		left: 5%;
		transform: rotate(0deg);
		color: var(--file-primary-hue, black);
		background-color: var(--file-primary-hue);
		background-color: color-mix(in lab, var(--file-primary-hue), var(--color-bg) 10%);
		border-radius: var(--wc-radius) 30px var(--wc-radius) 0;
		transition:
			0.3s var(--transition-timing),
			border-radius 100ms,
			box-shadow none,
			filter none,
			background-color none;

		@supports (corner-shape: superellipse(0)) {
			& {
				corner-shape: round superellipse(0) round round;
			}
		}

		&::-webkit-details-marker,
		&::marker {
			content: '';
			display: none;
		}

		.close-file-icon {
			opacity: 1;
			color: black;
			right: 0;
			padding-bottom: 7%;

			svg {
				position: absolute;
				width: 10px;
				height: auto;
				aspect-ratio: 1;
				top: 1.3rem;
				right: 1.2rem;
			}

			svg path {
				stroke: color-mix(in oklch, var(--file-primary-hue), rgba(0, 0, 0, 0.848) 80%);
			}
		}

		.close-file-icon::after {
			content: '';
			position: absolute;
			top: 0;
			right: 0;
			width: 2.5rem;
			height: 2.7rem;
			border-radius: 10px 40px 10px var(--wc-radius);
			background-color: burlywood;
			background-color: color-mix(in oklch, var(--file-primary-hue), rgba(25, 25, 31, 0.503) 10%);
			filter: drop-shadow(rgba(50, 47, 30, 0.921) 0px 2px 1px);
			z-index: -1;

			@supports (corner-shape: superellipse(0)) {
				& {
					corner-shape: round superellipse(0) round round;
				}
			}
		}
	}

	/* ////////////////////////////// */
	/* The content of each project is */
	/* ////////////////////////////// */
	details[open]::details-content {
		--file-primary-hue: color-mix(
			in oklch,
			var(--file-primary-hue2) 90%,
			var(--file-primary-color) 90%
		);
		--file-primary-hue2: color-mix(
			in oklch,
			hsl(calc(var(--hue-number, 213) / var(--file-index)), 25%, 68%),
			var(--file-primary-color) var(--file-primary-color-amount)
		);
		--file-line-color: color-mix(in oklch, var(--file-primary-hue, black), rgb(0, 0, 0) 40%);
		--file-line-color2: color-mix(
			in oklch,
			var(--file-primary-hue, var(--primary-gray-bg)),
			rgb(206, 44, 44) 15%
		);

		--bg-test: color-mix(in oklch, var(--file-primary-hue2) 90%, var(--file-primary-color) 90%);
		--bg-test: color-mix(in oklch, var(--file-primary-hue2) 90%, var(--file-primary-color) 90%);

		position: absolute;
		bottom: 0;
		inset-inline: 0;
		top: 8%;
		display: grid;
		grid-template-columns: repeat(56, 1fr);
		grid-template-rows: repeat(38, 1fr);
		z-index: 10 !important;
		contain: layout size style;
		border-radius: var(--wc-radius);

		background-color: color-mix(in oklch, var(--file-primary-hue), rgba(255, 255, 255, 0.466) 50%);
		/* background-color: color-mix(in oklch, var(--file-primary-hue) , white 20% ); */
		background-color: color-mix(in lab, var(--file-primary-hue), var(--color-bg) 30%);
		/* background-color: color-mix(in oklch, var(--bg-test) 90% , rgba(255, 255, 255, 0.719) 70% ); */
	}

	details[open]:has(.experiment)::details-content {
		background-color: transparent;
	}

	/* ////////////////////// */
	/* work description section */
	/* //////////////////////// */
	details[open] .work-description {
		--_description-bg: #e5e5f7f4;

		grid-column: 5/ 18;
		grid-row: 5/-3;
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 80%;
		padding: 1rem;
		border-radius: 5px;
		overflow-y: auto;
		overflow-x: hidden;
		z-index: 4;
		resize: both;
		box-shadow: rgba(68, 63, 43, 0.064) 0px 22px 10px;

		transition: transform 200ms
			linear(0, 0.297 6.8%, 0.515 13.8%, 0.686 22%, 0.812 31.6%, 0.895 42.6%, 0.949 56.4%, 1);
		animation: content-reveal 0.4s var(--transition-timing);
		container-type: inline-size;

		background-color: var(--_description-bg);
		background-blend-mode: overlay;
		background-position: center;
		background-repeat: repeat, no-repeat, repeat;

		/* testting */
		/* background-color: #ffffff; */
		/* background-size:cover, cover, cover; */
		/* background-size: 14px 14px , 100% 100%, 14px 14px; */
		/* background-size: 14px 14px , 100% 100%, contain; */
		/* background-image:  
			linear-gradient(var(--file-line-color) 0.7000000000000001px, transparent 0.7000000000000001px), 
			url('/works-assets/material-assets/Chris website16.avif') ,
			url('/works-assets/material-assets/Chris website10.avif'),
			linear-gradient(to right, var(--file-line-color2) 0.7000000000000001px, #e5e5f700 0.7000000000000001px)
			; */

		@supports (corner-shape: superellipse(0)) {
			& {
				corner-shape: superellipse(-2);
			}
		}
	}

	.work-description h2 {
		flex: 0 1 fit-content;
		font-size: clamp(1.3rem, 5vw, 2.5rem);
		text-align: end;
		margin-bottom: 1rem;
	}

	.work-description .description-space {
		position: relative;
		flex: 1 1 30%;
		outline: solid 9px rgba(131, 131, 131, 0.045);
		outline-style: double;
		outline-offset: -1rem;
	}

	.work-description .description-info {
		flex: 1 1 30%;
		display: flex;
		flex-direction: column;
		gap: 2%;
		margin-top: 1rem;
		justify-content: end;
	}

	.work-description .description-info ul {
		display: flex;
		flex-direction: column;
		width: 100%;
		border-bottom: 1px solid var(--file-line-color);
		container-type: inline-size;
		max-width: 400px;
	}

	.work-description .description-info ul.collaborators li {
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		margin-bottom: 2%;

		& > * {
			flex-basis: fit-content;
			text-transform: capitalize;
		}

		.collaborator-role {
			font-size: 0.88rem;
			font-weight: 200;
			align-self: center;
		}

		.collaborator-name {
			text-align: end;
			font-size: 1rem;
		}

		.list-line {
			flex: 1 1 auto;
			background-color: #000;
			background: #b3b39c;
			background: var(--file-line-color);
			margin-inline: 2%;
			border-radius: 5pc;
			height: 1%;
			min-width: 10px;
			align-self: center;
			justify-self: center;
		}

		@container (width < 200px) {
			justify-content: start;
			flex-direction: row-reverse;

			:nth-child(n) {
				align-items: end;
				text-align: end;
			}

			:nth-child(-n + 2) {
				display: none;
			}
		}
	}

	.work-description .description-info ul.tools {
		display: flex;
		flex-flow: row wrap;
		margin-top: 1%;
		background-color: color-mix(
			in oklch,
			var(--file-primary-hue, var(--primary-gray-bg)),
			rgba(80, 80, 80, 0.167) 20%
		);
	}

	.description-info .tools.stamp {
		--stamp-radius: 20px;

		height: fit-content;
		padding: var(--stamp-radius);
		background-color: var(--primary-gray-bg);
		background-image: url('/works-assets/material-assets/Chris website12-2.avif');
		background-blend-mode: color-dodge;
		background-blend-mode: lighten;

		contain: paint layout;
		border: 2px solid var(--file-line-color2);
		mask:
			radial-gradient(40% 40%, #0000 50%, #000 3%) round var(--stamp-radius) var(--stamp-radius) /
				calc(2 * var(--stamp-radius)) calc(2 * var(--stamp-radius)),
			conic-gradient(#000 0 0) content-box;
	}

	.work-description .description-info ul.tools .tags {
		--hue-number: calc(213 * 900 * var(--tag-id, 13));
		--file-primary-hue: color-mix(
			in oklch,
			hsl(calc(var(--hue-number, 213) / var(--file-index)), calc(25% + 1% * var(--tag-id, 1)), 48%),
			var(--file-primary-color) var(--file-primary-color-amount)
		);
		flex: 0 1 fit-content;
		height: fit-content;
		width: fit-content;
		white-space: nowrap;
		font-size: 0.88rem;
		font-weight: 500;
		color: color-mix(in oklch, var(--file-line-color) 60%, var(--color-text) 45%);
		color: color-mix(in oklch, var(--file-line-color) 60%, black 45%);
		padding: 0.3rem 0.8rem;
		border-radius: 50px;
		background-color: color-mix(in oklch, var(--file-primary-hue), rgba(255, 255, 255, 0.566) 60%);
		margin-inline: 1%;
		margin-bottom: 2%;

		&:nth-child(-n + 3) {
			/* mix-blend-mode: multiply; */
			mix-blend-mode: overlay;
			/* mix-blend-mode:hard-light; */
			background-color: color-mix(in oklch, var(--file-primary-hue), rgba(214, 60, 60, 0.566) 80%);
			background-color: color-mix(
				in oklch longer hue,
				var(--file-primary-hue),
				color-mix(
						in hsl longer hue,
						hsl(calc(var(--hue-number) / var(--file-index)), 45%, 28%),
						var(--file-primary-color) 98%
					)
					96%
			);
			background-color: var(--file-primary-hue);
			color: color-mix(in oklch, var(--file-primary-hue), var(--color-text) 80%);
			border: solid 2px color-mix(in oklch, var(--file-primary-hue), rgba(255, 255, 255, 0.566) 60%);
		}
	}

	/* ////////////////////////////////////// */
	/* the section behind the work description */
	/* /////////////////////////////////////// */
	details[open]:has(.note .disabled) .work-description:not(.note) {
		min-height: 89%;
		overflow: visible;
	}

	details[open]:has(.work-description:not(.description-links):hover, .move-description)
		.work-description.note {
		translate: 0.5rem;
		/* overflow: visible; */
		contain: none;
		transition: 200ms
			linear(0, 0.297 6.8%, 0.515 13.8%, 0.686 22%, 0.812 31.6%, 0.895 42.6%, 0.949 56.4%, 1);
		.description-space {
			overflow: visible;
			transform: translateX(4.5rem);
			outline: none;
			/* transition:	transform 250ms linear(0, 0.297 6.8%, 0.515 13.8%, 0.686 22%, 0.812 31.6%, 0.895 42.6%, 0.949 56.4%, 1); */
		}
	}

	details[open] .work-description.note {
		--description-bg: #c9c9e3c9;
		grid-column: 5/ 18;
		grid-row: 5/-5;
		display: flex;
		/* width: 100%; */
		height: 100%;
		border-radius: 5px;
		overflow: visible;
		z-index: 3;
		transition: translate 200ms
			linear(0, 0.297 6.8%, 0.515 13.8%, 0.686 22%, 0.812 31.6%, 0.895 42.6%, 0.949 56.4%, 1);

		animation: content-reveal 0.4s var(--transition-timing);
		container-type: inline-size;
		/* testting */
		box-shadow: rgba(68, 63, 43, 0.064) 0px 22px 10px;
		background-color: #e5e5f71a;
		background-image: none;

		@supports (corner-shape: superellipse(0)) {
			& {
				corner-shape: superellipse(-2);
			}
		}
	}

	.work-description.note .description-space {
		transition: transform 250ms
			linear(0, 0.297 6.8%, 0.515 13.8%, 0.686 22%, 0.812 31.6%, 0.895 42.6%, 0.949 56.4%, 1);
	}

	.work-description.note .description-space button {
		position: absolute;
		top: 0;
		right: 0;
		display: grid;
		place-items: center;
		background-color: color-mix(
			in oklch,
			var(--file-primary-hue, var(--primary-gray-bg)),
			rgba(255, 255, 255, 0.566) 80%
		);
		color: currentColor;
		width: 2rem;
		height: 2rem;
		border: none;
		border-radius: 50%;
		cursor: pointer;
		&:hover {
			background-color: color-mix(
				in oklch,
				var(--file-primary-hue, var(--primary-gray-bg)),
				rgba(255, 255, 255, 0.566) 60%
			);
		}
	}

	.work-description:where(.note).stamp {
		--stamp-radius: 11px;
		position: relative;
		height: fit-content;
		z-index: 3;
		padding: var(--stamp-radius);
		contain: layout;

		&::after {
			content: '';
			position: absolute;
			inset: 0;
			border-radius: inherit;
			z-index: -1;
			background-color: var(--description-bg);
			overflow: visible;
			padding: 1px;
			mask:
				radial-gradient(50% 50%, #0000 46%, #000 27%) round var(--stamp-radius)
					var(--stamp-radius) / calc(2 * var(--stamp-radius)) calc(2 * var(--stamp-radius)),
				conic-gradient(#000 0 0) content-box;
			mask-composite: intersect;
		}
	}

	.work-description:where(.note):has(.disabled).stamp::after {
		pointer-events: none;
		background-color: color-mix(
			in oklch,
			var(--file-primary-hue, black),
			var(--description-bg) 80%
		);
	}

	.work-description.note .qr-container {
		flex: 0 1 fit-content;
		display: flex;
		align-items: end;
		justify-content: end;
		height: auto;
		gap: 1rem;
		min-width: fit-content;
		padding: 1%;
		margin-bottom: calc(var(--stamp-radius) / 2);
		border: solid 1px rgba(0, 0, 0, 0.179);
		border-radius: var(--stamp-radius) var(--stamp-radius) 0 var(--stamp-radius);
		background-color: color-mix(
			in oklch,
			var(--file-primary-hue, var(--primary-gray-bg)),
			rgba(255, 255, 255, 0.566) 60%
		);

		img {
			width: 7.6rem;
			height: auto;
			aspect-ratio: 1;
		}

		p {
			font-size: 0.88rem;
			padding: 2%;
		}

		.qr-btn {
			display: none;
		}
	}

	.work-description:where(.note) .description-links {
		--_white-toggle: color-mix(in oklch, white 100%, var(--file-primary-hue, white) 100%);
		flex: 0 1 10%;
		display: flex;
		gap: 1rem;
		align-items: end;
		justify-content: end;

		@container (width < 200px) {
			justify-content: start;
		}

		& :nth-child(n) {
			/* outline:solid red; */
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 1.125rem;
			font-weight: 500;
			text-wrap: nowrap;
			color: color-mix(in oklch, var(--file-primary-hue) 10%, rgba(33, 15, 15, 0.932) 100%);
			border: solid 1px rgba(0, 0, 0, 0.179);
			padding: 0.5rem 1rem;
		}

		a.link-btn {
			flex: 1 1 60%;
			height: 100%;
			border-radius: 10px;
			background-color: color-mix(
				in oklch longer hue,
				var(--file-primary-hue, var(--description-bg)),
				color-mix(
						in hsl longer hue,
						hsl(calc(var(--hue-number) / var(--file-index)), 45%, 68%),
						var(--file-primary-color) 98%
					)
					63%
			);

			@supports (corner-shape: superellipse(0)) {
				& {
					border-radius: 100%;
					corner-shape: superellipse(3);
				}
			}
		}

		button.qr-btn {
			flex: 0 1 fit-content;
			border-radius: 0 0 var(--stamp-radius) var(--stamp-radius);
			background-color: color-mix(
				in oklch,
				var(--file-primary-hue, var(--description-bg)),
				var(--_white-toggle, white) 60%
			);
			background-color: color-mix(
				in oklch,
				var(--file-primary-hue, var(--primary-gray-bg)),
				rgba(255, 255, 255, 0.566) 60%
			);
			height: 111.5%;
			min-width: 20%;
			border-top: none;
			/* color: color-mix(in oklch, var(--file-primary-hue) , rgb(255, 255, 255) 95% ); */
			cursor: pointer;
			z-index: 4;

			@supports (corner-shape: superellipse(0)) {
				& {
					border-radius: 0 0 10pc 10pc;
					corner-shape: superellipse(2.5);
				}
			}
		}

		.disabled {
			opacity: 0;
			pointer-events: none;
		}
	}

	/* //////////// */
	/* work assets */
	/* large content scroll section */
	/* //////////////////////////// */

	details[open] .work-assets {
		--file-primary-hue: color-mix(
			in oklch,
			hsl(calc(213 * 680 / var(--file-index)), 0%, 80%),
			var(--file-primary-color) 20%
		);
		--file-primary-hue2: color-mix(
			in oklch,
			hsl(calc(213 * 701 / var(--file-index)), 55%, 98%),
			var(--file-primary-color) 75%
		);
		--file-assets-background: color-mix(
			in oklch,
			var(--file-primary-hue),
			rgba(255, 255, 255, 0.073) 85%
		);
		--s: 60px; /* control the size of the grid */
		--t: 2px; /* the thickness */
		--grid-line-color: color-mix(in oklch, var(--file-line-color2), var(--color-text) 20%);
		--grid-color:
			transparent 25%, color-mix(in oklch, var(--grid-line-color) 10%, transparent 70%) 0%;

		grid-column: 1/ -3;
		grid-row: 1/-1;
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		padding-block: 30cqh 7cqh;
		overflow-y: auto;
		overflow-x: hidden;
		contain: style;
		border-radius: var(--wc-radius);
		container-type: inline-size;
		background:
			conic-gradient(from 90deg at var(--t) var(--t), var(--grid-color)) 0 0 / var(--s) var(--s),
			linear-gradient(
				90deg,
				transparent 25%,
				color-mix(in oklch longer hue, var(--file-primary-hue), rgba(255, 255, 255, 0.126) 88%) 53%,
				color-mix(in oklch longer hue, var(--file-primary-hue), rgba(255, 255, 255, 0.092) 77%),
				color-mix(in oklch longer hue, var(--file-primary-hue), rgba(255, 255, 255, 0.074) 88%) 73%,
				transparent 85%
			);

		scrollbar-color: color-mix(in oklch, var(--file-primary-color), transparent 55%) transparent;
		scrollbar-color: color-mix(in oklch, var(--file-assets-background), white 15%) transparent;
		scroll-timeline: --work-assets-timeline;

		& > * {
			padding-left: 43cqw;
			scrollbar-width: none;
			animation: content-reveal 0.4s var(--transition-timing);
		}
	}

	details[open]:has(.move-description) .work-assets > * {
		padding-left: 33cqw;
		transition: 200ms 100ms
			linear(0, 0.297 6.8%, 0.515 13.8%, 0.686 22%, 0.812 31.6%, 0.895 42.6%, 0.949 56.4%, 1);
	}

	details[open] .asset-border {
		position: absolute;
		inset-block: 0;
		height: 100%;
		width: auto;
		backdrop-filter: blur(3px);
		z-index: 2;
		pointer-events: none;
		contain: style paint;

		&.b-left {
			left: 0;
			backdrop-filter: blur(6px);
			border-radius: var(--wc-radius) 0 0 var(--wc-radius);
			border-color: peru;
			mask: linear-gradient(to right, var(--file-primary-hue) -2% 50%, transparent 70% 100%);
		}

		&.b-right {
			padding-left: 0;
			right: 0;
			border-radius: 0 var(--wc-radius) var(--wc-radius) 0;
			border-color: yellow;
			left: 75dvw;
			mask: linear-gradient(to left, var(--file-primary-hue) -2% 70%, transparent 85% 100%);
		}

		&.b-bottom {
			inset-block: unset;
			bottom: 0;
			height: 10%;
			width: 100%;
			border-radius: 0 0 var(--wc-radius) var(--wc-radius);
			border-color: blue;
			mask: linear-gradient(to top, var(--file-primary-hue) -2% 10%, transparent 50% 100%);
		}
	}

	details[open]:has(.move-description) .b-left {
		transition: inherit;
		mask: linear-gradient(to right, var(--file-primary-hue) -2% 10%, transparent 25% 100%);
	}

	details[open]:has(.experiment) .work-assets {
		--s: 110px; /* control the size of the grid */
		--n: 2; /* control the granularity */
		--t: 1.6px; /* the thickness */
		--g: 20px;
		--grid-color:
			color-mix(in oklch, var(--grid-line-color) 20%, transparent 70%) 25%, transparent 25%;

		background:
			conic-gradient(at var(--g) var(--t), var(--grid-color))
				calc((var(--s) / var(--n) - var(--g) + var(--t)) / 2) 0 / calc(var(--s) / var(--n)) var(--s),
			conic-gradient(from 180deg at var(--t) var(--g), var(--grid-color)) 0
				calc((var(--s) / var(--n) - var(--g) + var(--t)) / 2) / var(--s) calc(var(--s) / var(--n));
	}

	/* ///////////////////// */
	/* content block styling */
	/* //////////////////// */
	.work-assets .content-block:nth-of-type(n) {
		position: relative;
		display: flex;
		flex-direction: column;
		margin-bottom: 2rem;

		contain: layout style paint;
		container-type: inline-size;

		scroll-snap-align: center;
		scroll-snap-stop: normal;

		&:nth-of-type(1),
		&:nth-last-of-type(1) {
			margin: 0;
			padding-block: 0;
		}
	}

	.work-assets .content-block h2 {
		font-weight: bold;
		margin-bottom: 1rem;
	}

	.work-assets .content-block p {
		line-height: 1.5;
		font-size: clamp(0.9rem, 4vw, var(--text-size-s));
		font-size: clamp(0.9rem, 4vw, 1.3rem);

		max-width: 80cqw;
		width: 80ch;
		margin-bottom: 1rem;
		transition: background-color 200ms ease 2s;

		&:not(a)::selection {
			color: rgb(0, 0, 0);
			/* background-color: rgba(255, 255, 255, 0.459); */
		}
	}

	.work-assets .content-block:nth-of-type(1) > p:nth-child(1) {
		/* outline: solid red; */
		margin-bottom: 5rem;
	}

	.work-assets :global(.content-block a) {
		color: color-mix(in oklch, var(--file-primary-hue), rgba(255, 255, 255, 0.566) 60%);
		/* text-decoration: underline; */
		cursor: pointer;

		&::selection {
			color: rgb(0, 0, 0);
			background-color: rgba(255, 255, 255, 0.459);
		}
	}

	/* has no img */
	.work-assets .content-block:has(p:nth-child(n)):has(p:nth-last-child(1)) {
		p {
			color: var(--color-text);
		}
	}

	/* block has text and image */
	.work-assets .content-block:has(p ~ .asset-img-ctnr) {
		width: 100%;
		padding-block: 2%;
		flex-direction: unset !important;
		flex-wrap: wrap;

		/* &>*{
			border: #34df31 solid;
		} */
		p {
			flex: 0 1 fit-content;
			max-width: 35ch;
			margin-bottom: 2%;
			margin-right: 1%;
		}

		p ~ .asset-img-ctnr {
			flex-basis: 90%;
			align-self: end;
			justify-self: end;
		}

		p:nth-of-type(n) + p ~ .asset-img-ctnr {
			flex: 1 2 100%;
		}
	}

	/* block withimage container */
	.work-assets .content-block .asset-img-ctnr {
		position: relative;
		display: flex;
		place-content: center;
		justify-content: center;
		align-items: center;
		min-width: 60cqw;
		min-height: 40cqh;
		border-radius: 1pc;
		aspect-ratio: 16/9;
		background: transparent;
		border: none;
		transition: 0.4s linear(0, 1.098 20.8%, 0.99 54.8%, 1);

		overflow: hidden;
		container-type: inline-size;

		img {
			object-fit: cover;
			object-position: 100% 100%;
			width: 100cqw;
			/* max-width:fit-content; */
			/* max-width:700px; */

			height: auto;
			/* outline:solid yellow; */
		}

		@supports (corner-shape: superellipse(0)) {
			& {
				border-radius: 90%;
				corner-shape: superellipse(3);
			}
		}
	}

	/* block has only one image */
	.content-block:nth-of-type(n):has(.asset-img-ctnr:first-child:nth-last-of-type(1)) {
		.asset-img-ctnr {
			max-width: 100%;
			width: 90cqw;
			height: auto;
			outline: #ffffff93 2px solid;
			outline-offset: -2px;
			margin-bottom: 3rem;
			margin-right: 24%;
		}
	}

	/* block has multiple images */
	.content-block:has(.asset-img-ctnr:nth-child(2n)):has(.asset-img-ctnr:nth-last-child(1)) {
		position: relative;
		min-height: 50cqh;
		min-height: fit-content;
		flex-flow: row nowrap;
		gap: 1rem;
		padding-block: 0;
		margin-bottom: 4rem;

		overflow-y: hidden;
		overflow-x: auto;
		anchor-name: --block;

		/* scroll-snap-type: x proximity; */
		/* overscroll-behavior-x: contain; */
		/* outline: solid red; */

		.asset-img-ctnr {
			scroll-snap-stop: always;
			scroll-snap-align: start;
			outline: #ffffff93 2px solid;
			outline-offset: -2px;
			min-height: 4rem;
			width: 30cqw;
			width: 20cqw;
			cursor: nw-resize;
			cursor: zoom-in;
		}

		.asset-img-ctnr:nth-last-of-type(1) {
			margin-right: 24%;
		}

		&::scroll-button(*) {
			display: grid;
			place-content: center;
			position: fixed;
			position-anchor: --block;
			width: 20px;
			height: auto;
			aspect-ratio: 1;
			bottom: calc(anchor(bottom) - 2cqh);
			right: calc(anchor(right) + 1cqi);
			border-radius: 50%;
			border: 1px;
			z-index: 2;
			pointer-events: auto;
			cursor: pointer;
			animation: assets-scroll-button linear both;
			animation-timeline: view();
			animation-range-start: contain;
			animation-range-end: 75cqh;
			background-color: color-mix(
				in oklch longer hue,
				var(--file-primary-hue, var(--description-bg)),
				color-mix(
						in hsl longer hue,
						hsl(calc(var(--hue-number) / var(--file-index)), 45%, 88%),
						var(--file-primary-color) 98%
					)
					95%
			);
			background-color: rgb(255, 255, 255);
		}
		&::scroll-button(*):disabled {
			z-index: 0;
			opacity: 0.2 !important;
			pointer-events: none;
		}
		&::scroll-button(left) {
			content: ''/'Scroll Left';
			background-image: url('/works-assets/arrow-left.avif');
			background-image: url('/works-assets/chevrons-left.avif');
			background-size: cover;
			background-position: center;
			cursor: pointer;
		}
		&::scroll-button(right) {
			content: ''/'Scroll Right';
			background-image: url('/works-assets/arrow-right.avif');
			background-image: url('/works-assets/chevrons-right.avif');
			background-size: cover;
			background-position: center;
			/* bottom: calc(anchor(bottom) + 5cqh); */
			cursor: pointer;
		}

		@supports not selector(::scroll-button(*)) {
			scroll-snap-type: none;
			scrollbar-width: thin;
			padding-bottom: 2rem;
		}
	}

	@keyframes assets-scroll-button {
		from {
			opacity: 0;
			transform: translate(0, -50%) scale(0.8);
		}
		30%,
		90% {
			opacity: 1;
			transform: translate(0, -50%) scale(1.2);
		}
		to {
			opacity: 0;
			transform: translate(0, -50%) scale(0.8);
		}
	}

	/* sticker styling */

	.cover-content {
		transition:
			0.4s var(--transition-timing) 1s,
			box-shadow 0s,
			filter 0.4s,
			background-color 0s;

		&:not(.text) {
			display: grid;
			place-content: center;
			padding: 0;
		}

		&:nth-child(1) {
			position: absolute;
			text-shadow: 3px 2px 3px rgba(255, 255, 255, 0.2);
			text-shadow: 0px 3px 3px rgba(255, 255, 255, 0.5);
			color: rgba(0, 0, 0, 0.156);
			font-size: clamp(4rem, 15vw, 5rem);
			bottom: 5%;
			right: 5%;
		}
	}

	/* //////////////// */
	/* utility classes */
	/* /////////////// */

	.sticker-label {
		--sticker-shadow-color: color-mix(
			in oklab,
			var(--tritary-color) 30%,
			rgba(21, 20, 20, 0.501) 80%
		);
		--sticker-shadow-color2: color-mix(
			in oklab,
			var(--tritary-color) 60%,
			rgba(21, 20, 20, 0.216) 50%
		);

		position: absolute;
		font-size: 1rem;
		font-weight: lighter;
		color: color-mix(in oklch, rgb(0, 0, 0), var(--sticker-color, transparent) 10%);
		background-color: var(--sticker-color);
		border-radius: 15px;
		padding: 3ex 2ex;
		margin: 10px 30px;
		min-width: var(--sticker-width, 30cqw);
		min-height: var(--sticker-height, 20cqh);
		/* height: var(--sticker-height, 20cqh); */
		top: var(--sticker-top, 5%);
		transform: rotate(var(--sticker-rotation, 0deg));
		transform-origin: top center;
		filter: drop-shadow(0.5px 12px 10px var(--sticker-shadow-color));
		filter: drop-shadow(0.5px 0.5px 1px black);
		filter: drop-shadow(0.5px 0.5px 1px var(--sticker-shadow-color))
			drop-shadow(0.5px 12px 10px var(--sticker-shadow-color2));

		@supports (corner-shape: superellipse(0)) {
			& {
				corner-shape: superellipse(3);
			}
		}
	}

	.show-qr-links {
		transform: translate(-3cqw, -7cqh);
		filter: blur(0px) brightness(0.8);
		contain: paint;
	}

	.show-qr-qr {
		transform: translate(0, 7cqh);
		filter: brightness(1.1);
		contain: paint;
	}

	.file.jump.jump.jump {
		--_delay: calc(2s / var(--total-work, 1) * var(--file-index));
		--_delay: calc(1s / var(--total-work, 1) * (var(--file-index)));
		z-index: calc(10 - var(--file-index));
		opacity: 0;
		/* animation: jump 2s ease var(--_delay) infinite ; */
		animation: jump 450ms var(--_delay) forwards steps(3, end);
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
	}

	.loading {
		--_delay: calc(3s / var(--total-work, 6) * (var(--file-index)));
		opacity: 0;
		pointer-events: none;
		animation: loading 3s var(--_delay) infinite steps(4, end);

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
		&*:hover {
			animation-play-state: paused;
			animation-name: none;
		}
	}

	.big-asset.big-asset.big-asset.big-asset {
		min-height: 40cqh;
		min-width: 100%;
		aspect-ratio: 16/9;

		article.asset-img-ctnr {
			cursor: zoom-out !important;
		}

		:nth-child(1) {
			/* opacity:0.5; */
			/* scale: 2; */
		}
	}

	.move-description {
		transform: translate(-25cqw, 0) rotate(-5deg) !important;
	}

	.grid-lines {
		--s: 40px; /* control the size of the grid */
		--t: 2px; /* the thickness */

		background: conic-gradient(from 90deg at var(--t) var(--t), #0000 25%, #556270 0) 0 0 / var(--s)
			var(--s) !important;
	}

	.grid-dotted-lines {
		--s: 80px; /* control the size of the grid */
		--n: 4; /* control the granularity */
		--t: 2px; /* the thickness */
		--g: 10px; /* the gap between dashes */

		--grid-color: #556270 25%, #0000 0;
		background:
			conic-gradient(at var(--g) var(--t), var(--grid-color))
				calc((var(--s) / var(--n) - var(--g) + var(--t)) / 2) 0 / calc(var(--s) / var(--n)) var(--s),
			conic-gradient(from 180deg at var(--t) var(--g), var(--grid-color)) 0
				calc((var(--s) / var(--n) - var(--g) + var(--t)) / 2) / var(--s) calc(var(--s) / var(--n));
	}

	/* Animation for content reveal */
	@keyframes content-reveal {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes jump {
		0%,
		30% {
			opacity: 0;
			pointer-events: none;
		}
		80% {
			pointer-events: none;
		}
		100% {
			opacity: 1;
			z-index: calc(10 - var(--file-index));
		}
	}

	@keyframes loading {
		0%,
		50% {
			opacity: 1;
		}
		100% {
			z-index: calc(10 - var(--file-index));
		}
	}

	@media screen and (max-width: 950px) {
		:global(.mainContain:has(#works details[open])) {
			padding-inline: 1dvw;
		}

		.work-section:where(:focus-within, :focus, :active) {
			all: unset;
		}

		.work-section details.work-cover :is(summary, ::details-summary) {
			--move: calc(50dvh + 1dvw * var(--total-work));
			top: var(--move);

			@starting-style {
				--move: calc(20dvh + 1dvw * var(--total-work));
			}
		}

		.work-section details.file :is(summary, ::details-summary) {
			--move: calc(46vh + (-43vh * (var(--file-index) / var(--total-work, 1))));
		}

		details.file:nth-of-type(n):is(:active, :focus) :is(summary, ::details-summary) {
			--hover-file-top: 0px;
			background-color: color-mix(
				in oklch,
				var(--file-primary-hue),
				rgba(255, 255, 255, 0.466) 40%
			);
			/* rotate:calc(-2deg + .1deg * var(--file-index)); */
			/* transform : rotate(calc(-2deg + .5deg * var(--file-index))) translate(0); */
			transform: rotate(0deg) translate(0);
			transition-property: top, left, rotate, height;
			transition:
				300ms var(--transition-timing),
				box-shadow 0s,
				filter 0s,
				transform-origin 0s;
			cursor: pointer;

			@container (width < 950px) {
				transform-origin: bottom left;
				left: calc(3.5dvw - (var(--file-index) * 5px));
			}
		}

		.work-section:has(details:nth-of-type(n)[open]) details.file > summary {
			top: -2%;
			left: 0%;

			.small-description {
				display: none;
			}
		}

		details[open]::details-content {
			top: 6%;
			right: 2%;
			overflow: visible;
			/* background-color: transparent ; */
		}

		details[open] .work-description {
			grid-column: 3/ -3;
			grid-row: 2 / span 10;
		}

		.work-description h2 {
			text-align: center;
		}

		.work-description .description-info {
			padding: 0;
			flex: 0;
		}

		.work-description .description-info ul.collaborators li {
			margin-bottom: 3px;
		}

		.work-description ul.tools.stamp {
			display: none;
		}

		details[open] .work-description:not(.note) .description-space {
			flex: 0 1 5%;
		}

		details[open] .work-description.note {
			grid-column: 3/ -3;
			grid-row: 3 / span 10;
			flex-flow: row;
			gap: 2%;
		}
		details[open]:has(.work-description:not(.description-links):hover, .move-description)
			.work-description.note {
			translate: 0;
			overflow: visible;
			contain: none;
			transition: 200ms
				linear(0, 0.297 6.8%, 0.515 13.8%, 0.686 22%, 0.812 31.6%, 0.895 42.6%, 0.949 56.4%, 1);
			.description-space {
				transform: none;
				outline: none;
				/* transition:	transform 250ms linear(0, 0.297 6.8%, 0.515 13.8%, 0.686 22%, 0.812 31.6%, 0.895 42.6%, 0.949 56.4%, 1); */
			}
		}

		.work-description.note.stamp .description-space {
			/* display: none; */
			flex-basis: 100%;
			order: 3;
		}

		.work-description.note.stamp .description-links {
			flex: 1 1 5rem;
			align-self: end;
			flex-direction: row-reverse;
			gap: 2%;
			min-height: fit-content;
			height: 20%;
			margin-top: 1cqh;
			:is(a, button) {
				flex: 0 1 100%;
				max-width: 30cqw;
			}
			.qr-btn {
				border-radius: var(--stamp-radius);
				display: none;
			}

			.link-btn {
				min-width: fit-content;
			}
		}

		.work-description.note.stamp::after {
			--stamp-radius: 5px;
			padding: var(--stamp-radius);
		}

		.work-description.note .qr-container {
			flex: 1 2 20%;
			justify-self: end;
			align-self: end;
			justify-content: start;
			align-items: bottom;
			width: 10%;
			max-width: 250px;
			height: fit-content;
			padding-right: 0;
			translate: 0% 12px;
			img {
				width: 12cqh;
			}
			p {
				display: none;
			}
		}

		.work-description.note .qr-container .qr-btn {
			display: flex;
			font-size: 1.125rem;
			text-wrap: nowrap;
			border: none;
			padding: 0.5rem 1rem;
			color: color-mix(in oklch, var(--file-primary-hue) 10%, rgba(33, 15, 15, 0.932) 100%);
			background-color: transparent;
		}

		/* main content */
		details[open] .work-assets {
			grid-column: 1/ -1;
			grid-row: 3/-1;
			scroll-snap-type: none;
			padding-block: 10cqh 7cqh;

			& > *.content-block {
				--content-padding: 10cqw;
				padding-left: var(--content-padding);
				scrollbar-width: none;
				animation: content-reveal 0.4s var(--transition-timing);
			}

			& > .content-block:nth-of-type(1) {
				padding-top: 25cqh;
			}
		}

		.work-assets .content-block p {
			max-width: calc(100cqw - 2 * var(--content-padding));
		}

		.work-assets .content-block img {
			min-width: 100%;
			width: 400px;
			height: auto;
			border-radius: 50px;
		}

		details[open] .work-assets :is(.b-left.b-left, .b-right.b-right) {
			mask: none;
			backdrop-filter: blur(0);
		}

		/* utils */

		.show-qr-links {
			transform: translate(0, -4cqh);
			filter: blur(0px) brightness(0.8);
		}

		.show-qr-qr {
			transform: translate(0, 5cqh);
		}
	}
</style>
