<script lang="ts">
	import { onMount } from 'svelte';
	import {OrderedList,ContactForm} from '$lib';
	import {fade} from 'svelte/transition';
	import QRCode from 'qrcode';	
	
	interface Work {
		title: string;
		slug: string;
		description: string;
		assets: { image: string[]; icon?: string; color?: string };
		link: string;
		dateStart: string;
		dateEnd: string;
		status: { is: string; sticker: string };
		contentBlock?: Array<{ text?: string[]; images?: string[]; h2?: string }>;
		collaborators?: Record<string, string>;
		tags?: string[];
	}
	// throw new Error('test error');

	let {data} = $props();
	let {dataWorks,project,delay} = $derived(data)
	let openDetailsIndex = $state<number | null>(null);
	let m4 = $derived(openDetailsIndex)

	let pagination = $derived(dataWorks[0].pagination)
	let works = $derived(dataWorks[1]?.works)	
	
	let fileLinks = $derived(works[m4 ?? 0]?.link);
	let showQr: boolean = $state(false);
	let qrTimeout: ReturnType<typeof setTimeout> | null = $state(null);
	let qrURL = $state('')
	let firstLoad:boolean = $state(true);
	
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
			})
		} 
		catch (err) {
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
		project.then(() => {
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
	<summary class="{work.status.is == 'an experiment'? 'experiment' : ''}" onmouseenter={() => {handleClose}}>
		{#if work.assets.icon?.trim()}
			<span class="work-icon-span">
				<img src={work.assets.icon} alt={work.title}>
			</span>
		{/if}
		<span class="file-title">{work.title}</span>
		<span class="small-description">{work.slug}</span> 
		<div class="side-description">
			<span class="date-start">{work.dateEnd ||work.dateStart || ''}</span> 
			<span class="status">{work.status.sticker || work.status.is}</span> 
		</div>
		<div class="close-file-icon">
			<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M23.2396 21.8955C23.7523 22.4204 23.7523 23.2715 23.2396 23.7965C22.9841 24.0581 22.6481 24.1906 22.3121 24.1906C21.9761 24.1906 21.6401 24.0599 21.3846 23.7965L11.8121 13.996L2.23956 23.7965C1.98406 24.0581 1.64806 24.1906 1.31206 24.1906C0.97606 24.1906 0.640063 24.0599 0.384563 23.7965C-0.128187 23.2715 -0.128187 22.4204 0.384563 21.8955L9.95706 12.0951L0.384563 2.29474C-0.128187 1.76978 -0.128187 0.918677 0.384563 0.393719C0.897313 -0.13124 1.72857 -0.13124 2.24132 0.393719L11.8138 10.1942L21.3863 0.393719C21.899 -0.13124 22.7303 -0.13124 23.2431 0.393719C23.7558 0.918677 23.7558 1.76978 23.2431 2.29474L13.6706 12.0951L23.2396 21.8955Z" />
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
		{#each work.contentBlock as block}
		<article class="content-block">
			{#if block.text && block.text.length > 1}
				<h2>{block?.h2}</h2>
				{#each block.text as textLine}
					<p>{textLine}</p>			
				{/each}
			{:else if block.text}
				<p>{block.text}</p>	
			{/if}
			{#if block.images}
				{#each block.images as img}
					<img src={img} alt='' />
				{/each}
			{/if}
		</article>
		{/each}
		{/if}
	</article>
{/snippet}

{#snippet workDescription(work: Work)}
	<article id={`${work.title}-file`} class="work-description {showQr? 'show-qr-links' : ''}">
		<h2>{work.slug}</h2>
		<div class="description-space"></div> 
		<div class="description-info">
			<ul class="collaborators">
				{#if work?.collaborators }
					{#each Object.entries(work.collaborators) as [role, name] (role)}
						<li><p class="collaborator-role">{role}</p><span class="list-line"></span><p class='collaborator-name'>{name}</p></li>
					{/each}
				{/if}
			</ul>
			<ul class="tools stamp">
			<li class="tags">HTML</li>
			<li class="tags">CSS</li>
			<li class="tags">JavaScript</li>
				{#each  work.tags as tag, i}
					<li class="tags" style="--tag-id:{i + 3 + tag.length}">{tag}</li>
				{/each}
			</ul>
		</div>
	</article>

	<article class="work-description note stamp {showQr? 'show-qr-qr' : ''}">
		<div class="description-space"></div> 
		<div class="qr-container">
			{#if work.link}
				{#if showQr}
				<p>Scan the QR code to visit the site</p>
				{/if}
				<img src='{qrURL}' alt="QR Code" class="qr-code" />
			{:else}
				<p>No link available for this project</p>
			{/if}
		</div> 
		<div class="description-links">
			<a class={{disabled:!work.link}} href={work?.link}>
			{showQr ? 'Link' : 'Visit site'}
			</a>
			<button class={{disabled:!work.link}} onclick={toggleQR}>
				{showQr ? 'Hide qr code' : 'QR code'}
			</button>
		</div>
	</article>
{/snippet}

{#snippet loadingFiles()}
		{@const t = 4}
		{#each {length: t}, i }	
		<details 
			transition:fade
			class="file loading"
			style="--file-index:{i + 1}; --file-primary-color:rgba(213, 213, 213, 0.904); --total-work:{t}">
			<summary tabindex="-1" class="experiment">
				<span class="work-title ">...loading</span>
			</summary>
		</details>
		{/each}
{/snippet}

{#snippet contactForm()}
		<details 
		transition:fade
		class="file file-{works.length} file-contact"
		style="--file-index:calc(var(--total-work) ); --work-icon: url('/works-assets/material-assets/Chris website14.png'); --file-primary-color:green;">
		<summary tabindex="-1" class="experiment">
			<span class="file-title">
				your project here ???
			</span>
			<span class="cover-content sticker-label"><img src="/chris icon lowlowres.png" alt="chris icon"></span>
			<div class="close-file-icon">
				<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M23.2396 21.8955C23.7523 22.4204 23.7523 23.2715 23.2396 23.7965C22.9841 24.0581 22.6481 24.1906 22.3121 24.1906C21.9761 24.1906 21.6401 24.0599 21.3846 23.7965L11.8121 13.996L2.23956 23.7965C1.98406 24.0581 1.64806 24.1906 1.31206 24.1906C0.97606 24.1906 0.640063 24.0599 0.384563 23.7965C-0.128187 23.2715 -0.128187 22.4204 0.384563 21.8955L9.95706 12.0951L0.384563 2.29474C-0.128187 1.76978 -0.128187 0.918677 0.384563 0.393719C0.897313 -0.13124 1.72857 -0.13124 2.24132 0.393719L11.8138 10.1942L21.3863 0.393719C21.899 -0.13124 22.7303 -0.13124 23.2431 0.393719C23.7558 0.918677 23.7558 1.76978 23.2431 2.29474L13.6706 12.0951L23.2396 21.8955Z" />
				</svg>
			</div>
		</summary>
		<article class="work-description">
			<h2>Lets get in contact </h2>
			<!-- <div class="description-space"></div>  -->
			<div class="description-info">
				<form action="/contactForm" method="post">
					<fieldset>
						<input type="text" name="name" placeholder="full Name" required>
						<input type="email" name="email" placeholder="Your Email" required>
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
	<details class="work-cover " style="--file-index:4">
			<summary tabindex="-1" class="experiment">
				<p class="cover-content ">it seems quite here</p>
			<span class="cover-content sticker-label"><img src="/chris icon lowlowres.png" alt="chris icon"></span>
		</summary>
	</details>
{/snippet}

<div class="work-section pad" id="works" style="--file-index:0; --total-work:{works.length};">

	<section class="Orderedlist-container" >
		<OrderedList {pagination} />
	</section>

	<!-- onclick it will close all details -->
	<details class="work-cover" id="folder-cover">
		<summary tabindex="-1">
			<p class="cover-content">Portfolio</p>
			<p class="cover-content sticker-label">Here are some of the works I have done</p>
			<span class="cover-content sticker-label"><img src="/chris icon lowlowres.png" alt="chris icon"></span>
			<p class="cover-content sticker-label">In progress</p>
		</summary>
	</details>
	{#await project}
		{@render loadingFiles()}
	{:then dataWorks } 
	{@const works = dataWorks[1]?.works || []}
	{#each works.slice(0) as work, i (work.title)}
		<details 
			class="file file-{i+1} {firstLoad? 'jump' : ''}" 
			style="--file-index:{i + 1}; --work-icon: url('{work.assets.icon}'); {work.assets.color? `--file-primary-color:${work?.assets.color}`:''}"
			ontoggle={(e) => {
				if (e.currentTarget.open) {
					openDetailsIndex = i;
				} else if (openDetailsIndex === i) {
					openDetailsIndex = null;
				}}
			}>
			{@render summaryContent(work)}
			{@render workDescription(work)}
			{@render workAssets(work)}
		</details>
		{:else}
		{@render noFiles()}
	{/each}
	<!-- {@render contactForm()} -->
	{:catch error}
		<details class="work-cover">
			<summary tabindex="-1" class="experiment">
				<p class="cover-content sticker-label">something went wrong</p>
				<span class="cover-content sticker-label"><img src="/chris icon lowlowres.png" alt="chris icon"></span>
			</summary>
		</details>
	{/await}
</div>

<style>
	/* Custom variables added */
	:root{
		--total-work:0;
		/* --file-index:1; */
		--move:0;
		--file-primary-color:#df3188;
		/* --file-primary-color:oklab(82.281% -0.10253 0.16777); */
		--file-primary-color-amount:71%;
		--hue-number:913;

		--file-primary-hue:color-mix(in oklch longer hue, hsl(calc(213 * 700 / var(--file-index)), 55%, 38%) , var(--file-primary-color) 90%);
		
		--transition-timing: cubic-bezier(0.62, -0.1, 0.36, 1);
		--transition-timing: cubic-bezier(0.294, -0.291, 0.247, 1.056);
		--transition-duration: 0.7s;
		--delay-factor: 0.1s;

		--sticker-color:hsla(21, 79%, 51%, 0.974);
		--sticker-width: 0;
		--sticker-height: 0;
		--sticker-rotation: 0deg;
		font-family: "Geist Sans", sans-serif;

		@property --file-primary-hue {
			syntax: "<color>";
			inherits: false;
			initial-value: 0;
		}

		@property --file-index {
			syntax: "<integer>" ;
			inherits: false;
			initial-value: 0;
		}

	}
/* 
	:global(.mainContain:has(#works details[open])) {
		background-color: blue;
		padding-inline: 1dvw;

		.contentContain.contain{
			width: 100dvw !important;
			align-self: center !important;
			max-width: 2000px !important;
			width: 100% !important;
			flex-basis: 100cqw !important;
		}
	} */

	:global(.contentContain:has(#works)){
		--_section-height: 80%;

		height: var(--_section-height);
		top:calc(100% - var(--_section-height) - 4%);
		bottom: 0;
		max-width: 1700px;

		@container (width < 900px){--_section-height: 90%;	}
	}

	:global(.contentContain:has(#works)):has(details.file[open]:nth-of-type(n)){	--_section-height: 90%;	}

	.Orderedlist-container,:global(.Orderedlist-container){
		position: relative;
		width: 100%;
		max-width: 25dvw;
		height: 70cqh;
		max-height: 100%;
		margin-top: 5dvh;
		overflow-y: auto;
	}

	.work-section:has(details[open]) .Orderedlist-container{
		filter: opacity(.2);
		pointer-events: none;
	}
	
	.work-section{
		border-radius: inherit;
		gap: 1rem;
		container-type: inline-size;
		will-change: transform,filter,top,left;		
	}

	/* Hover effect for the summary */
	/* .work-section, */
	.work-section:where(:focus-within,:focus-visible,:hover,.Orderedlist-container:is(:hover,:focus-within)),
	.work-section:where(:focus-within,:focus) {
		--move-all:17dvw;

		.Orderedlist-container:is(:hover,:focus-within){
			--move:calc(46vh + (-43vh  * var(--file-index) / var(--total-work,1) ) ); 
		}

		/* folder cover animation */
		details.work-cover :is(summary,::details-summary),
		details.work-cover summary{
			--transition-duration: 200ms;
			--move:calc(40dvh + 1dvw * var(--total-work) ); 

			top:var(--move) ;
			left:calc(var(--move-all) - 2rem) ;
			color: black;
			pointer-events: none;
			z-index: 11;
			transition: top var(--transition-duration) 100ms, left var(--transition-duration) 200ms;

			@container (width < 900px){
				--move:calc(53vh - var(--total-work)); 
				inset-inline: 2%;
			}

			&::after{
				pointer-events: none;
			}
		}

		/* content on cover animation */
		details.work-cover .cover-content:nth-child(1) ~ .sticker-label{
			filter: blur(2px);
			transform: translate(-35rem, 11rem) rotate(5deg);
		}

		/* files animation */
		details.file :is(summary,::details-summary),
		details.file:is(:focus-within) summary
		{
			--move:calc(46vh + (-43vh  * (var(--file-index) / var(--total-work,1)))); 
			--shadow-1-radius:calc(-4px + .5px * (var(--file-index)));
			--shadow-1-color:color-mix(in oklch, var(--file-primary-hue) , rgba(0, 0, 0, 0.259) 30% );
			top:calc(var(--move) - var(--hover-file-top,0px)) ;
			left:calc(.1dvw * var(--total-work) + 10px * tan(var(--file-index) ) + var(--move-all));
			
			color: black;
			/* box-shadow: 
				var(--shadow-1-color) 0px 2px 5px -4px,
				var(--shadow-1-color) 0px 6px 10px -5px,
				rgba(0, 0, 0, 0.2) 0px -3px 0px inset
			  ; */
			/* transition-property:box-shadow none,filter none,background-color none; */
			transition-property: color, top, left, rotate;
			@starting-style {
				/* --move:calc(46vh + (-9vh  * (var(--file-index) / var(--total-work,1))));  */
				opacity: 0;
			}

			@container (width < 900px){
				--move:calc(53dvh - 45vh * (var(--file-index) / var(--total-work))); 
				inset-inline: 2%;
			}
		}

		details.file summary span > img{
			opacity:1 ;
		}
	}

	/* the details component */
	details{	
		border-radius: inherit;
		user-select: text;

		&[open]{
			display: none;
		}
	}

	/* file and folder styling */
	details:nth-of-type(n) > summary{
		position: absolute;
		inset: 0;
		display: flex;
		padding: var(--Padding-genral);
		font-size: 1.5rem;
		list-style-position: outside;
		z-index: calc(10 - var(--file-index));

		background-size: 100% 100%;
		background-attachment: fixed;
		background-origin: border-box;
		background-repeat: no-repeat;
		background-position: 100% 100% ;		

		/* Enhanced transitions using the new variables */
		will-change: top, left,right, color, background-color, translate;
		backface-visibility: hidden;
  		perspective: 1000px;
		transition: 
			top var(--transition-duration) var(--transition-timing) calc(var(--file-index) * var(--delay-factor)),
			left var(--transition-duration) var(--transition-timing) calc(var(--file-index) * var(--delay-factor)),
			right var(--transition-duration) var(--transition-timing) calc(var(--file-index) * var(--delay-factor)),
			color 0.32s ease,
			background-color 0s,
			translate 0.2s var(--transition-timing);

		@supports (corner-shape: superellipse(0)){
			&{
				corner-shape: superellipse(1.2);
			}
		}
		
		&::-webkit-details-marker,
		&::marker {
			content: '';
			display: none;
		}

		&:nth-of-type(n){
			background-image: url('/works-assets/material-assets/paper 1 black&white transparent cropped (Custom).png');
			background-blend-mode:color-dodge;
		}

		&:nth-of-type(n).experiment{
			background-image: url('/works-assets/material-assets/Chris website14.png');
			background-blend-mode:soft-light;
		}

		/* every section in the summary close state */
		> span{
			flex: 0 1 fit-content;
			width: 30px;
			height: fit-content;
			margin-right: 1%;
			overflow: hidden;
			color: color-mix(in oklch, var(--file-primary-hue), rgb(14, 14, 14) 45%);
			font-size: 2rem;
			font-weight: 700;
			text-shadow: 3px 2px 3px rgba(255,255,255,.2);
		}

		.file-title{
			flex: 2 1 auto;
			text-wrap: nowrap;
		}

		.close-file-icon{
			height: 2rem;
			width: 2rem;
			text-align: end;
			opacity: 0;
		}

		.small-description{
			flex: 0 2 fit-content;
			white-space: nowrap;
			font-size: 1rem;
			height: 2rem;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.work-icon-span{
			flex: 0 0 auto;
		}

		.work-icon-span > img{
			width: 100%;
			aspect-ratio: 1;
			opacity: 0.3;
		}

		.side-description{
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

			> span{
				font-size: 1rem;
			}
		}

		@container (width < 500px){
			.small-description{
				display: none;
			}
		}
	}	

	/* folder cover */
	details:is(#folder-cover,.work-cover) summary{
		font-size: clamp(2rem, 20vw, 10rem);
		color: black ;
		background-color: color-mix(in oklch longer hue, var(--hoverC,hsl(calc(213 - 90 / var(--file-index)), 55%, 38%)) , rgba(255, 255, 255, 0.466) 30% );
		background-image: 
						url('/works-assets/material-assets/paper 1 black&white transparent cropped (Custom).png')	;
		background-attachment:fixed  !important ;
		background-size:none, cover;
		backdrop-filter: blur(2px);
		pointer-events: none;
		cursor:none;
		overflow: hidden;
		border-radius: var(--wc-radius);
		box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -8px, rgba(0, 0, 0, 0.2) 0px -2px 0px inset;
		
		&::marker{
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
	}

	/* initial general animation for files and folder and cover element */
	/* files covers */
	details.file summary {
		--file-primary-hue:color-mix(in oklch, hsl(calc( var(--hue-number,213) / var(--file-index)), 55%, 38%) , var(--file-primary-color) var(--file-primary-color-amount));
		--move:calc(50vh +  (-6.9svh  * var(--file-index) ) ); 
		top:var(--move) ;
		right: 0;
		color: black;

		background-color: color-mix(in oklch, var(--file-primary-hue) , rgba(255, 255, 255, 0.466) 10% );
		border-radius: var(--wc-radius) var(--wc-radius) var(--wc-radius) 0;
		backdrop-filter: blur(50px);

		/* testing */
		&:nth-of-type(1){
		/* box-shadow: rgba(0, 0, 0, 0) 0px 2px 4px, rgba(28, 30, 31, 0.493) 0px -3px 8px -7px, rgba(0, 0, 0, 0.178) 0px -2px 2px inset; */
			/* box-shadow: rgba(20, 27, 33, 0.126) 0px 2px 4px -28px, rgba(0, 0, 0, 0.207) 0px 7px 13px -7px, rgba(0, 0, 0, 0.075) 0px -3px 0px inset;		 */
		}

		@container (width < 900px){
			--move:calc(65vw +  (-8.5vw  * var(--file-index) ) ); 
			border-radius: var(--wc-radius) ;
			inset-inline: 2%;
		}

	}

		/* files background overlay */
	details.file summary:nth-of-type(n)::before{
		content: '';
		position: absolute;
		background-position: 100% 100%;
		background-repeat: no-repeat;
		background-size: cover;
		background-attachment:local;
		
		inset: 1rem;
		top: 4rem;
		left: 3rem;
		background-color: rgba(238, 130, 238, 0.462);
		background-color: color-mix(in oklch, var(--file-primary-hue) , hsla(204, 93%, 33%, 0.566) 60% );
		border-radius: inherit;
		z-index: 100;
		contain: paint content;
	}

	/* files background textures  */
	details.file:nth-of-type(odd) summary::before,
	details.file summary.experiment::before{
		/* background-image: url('/works-assets/material-assets/vertical-illustration-orange-graph-paper.jpg'); */
		background-image: url('/works-assets/material-assets/Chris website1.png');
		/* background-image: url('/works-assets/material-assets/Chris website20.png'); */
		/* for dark backgrounds */
		background-blend-mode:lighten;
		background-blend-mode:soft-light;
		/* for both */
		/* background-blend-mode:saturation; */
		background-size: cover;
		background-position: 90% 0%;
		filter:opacity(.5) contrast(150%) grayscale(.8);
	}

	details.file:nth-of-type(even) summary::before{
		background-image: url('/works-assets/material-assets/27e9691d-e326-425b-a06f-f7efc3dc8a2f.jpg');

		/* for dark backgrounds */
		background-blend-mode:lighten;
		/* for both */
		background-blend-mode:saturation;
		filter:opacity(.5) contrast(150%) grayscale(.8);
	}

	/* files styling and animation*/
	details.file:nth-of-type(n):is(:hover,:focus) :is(summary,::details-summary){
		--hover-file-top:2rem;
		--hover-file-right:6svw;

		left: calc(var(--hover-file-right) - (var(--file-index) * 10px)); 
		transform : rotate(calc(-2deg + .5deg * var(--file-index)));
		transition-property: top,left, transform, height; 
		transform-origin: top;
		transition: 100ms var(--transition-timing),box-shadow 0s,filter 0s,background-color 200ms 100ms,transform-origin 0s;
		cursor: pointer;
		background-color: color-mix(in oklch, var(--file-primary-hue) , rgba(255, 255, 255, 0.466) 20% );

		@container (width < 900px){
			transform-origin: bottom left ;
			left:calc(3.5dvw - (var(--file-index) * 5px));
		}
	}

	/* when hover or focus stops */
	details:is(.file,.work-cover):not(:hover,:focus,:active) :is( summary,::details-summary){
		transition: 200ms var(--transition-timing);
	}

	/* The content of the file - open state */
	.work-section:has(details:nth-of-type(n)[open]) details{
			grid-column: span 10;
			z-index: 0 ;
			display: none;
			background-color: transparent; 
			
			&[open]{
				display: block;
			}
	}

	.work-section:has(details:nth-of-type(n)[open])	details.file > summary{
			font-size: 2rem;
			top: -2%;
			left: 5%;
			transform: rotate(0deg);
			background-color: var(--file-primary-hue);
			color: var(--file-primary-hue,black);
			border-radius: var(--wc-radius) 30px var(--wc-radius) 0;
			transition: 0.3s var(--transition-timing), border-radius 100ms,box-shadow none,filter none,background-color none;
			
			@supports (corner-shape: superellipse(0)){
				&{
					corner-shape: round superellipse(0) round round ;
				}
			}
			
			&::-webkit-details-marker,
			&::marker {
				content: '';
				display: none;
			}

			.close-file-icon{
				opacity: 1;
				color: black;
				right: 0;
				padding-bottom: 7%;

				svg{
					position: absolute;
					width: 10px;
					height: auto;
					aspect-ratio: 1;
					top: 1.3rem;
					right: 1.2rem;
				}

				svg path{
					stroke:color-mix(in oklch, var(--file-primary-hue) , rgba(0, 0, 0, 0.848) 80% );
				}
			}

			.close-file-icon::after{
				content: '';
				position: absolute;
				top: 0;
				right: 0;
				width: 2.5rem;
				height: 2.7rem;
				background-color: burlywood;
				border-radius: 10px 40px 10px var(--wc-radius);
				background-color: color-mix(in oklch,var(--file-primary-hue),rgba(25, 25, 31, 0.503) 10%);
				filter:drop-shadow(rgba(50, 47, 30, 0.921) 0px 2px 1px);
				z-index: -1;

				@supports (corner-shape: superellipse(0)){
					&{
						corner-shape: round superellipse(0) round round ;
					}
				}
			}

	}

	/* where the content of each project is */
	details[open]::details-content{
		/* --hue-number: calc(213 * 39 / var(--file-index)); */
		/* --file-primary-hue:color-mix(in oklch , hsl(calc(var(--hue-number) / var(--file-index)), 55%, 98%) , var(--file-primary-color) 85%); */
		/* --file-primary-hue:color-mix(in hsl longer hue, hsl(calc(var(--hue-number) / var(--file-index)), 5%, 98%) , var(--file-primary-color) 27%); */
		/* --file-primary-hue:color-mix(in oklch longer hue, hsl(calc(213 * 700 / var(--file-index)), 55%, 38%) , var(--file-primary-color) 90%); */
		/* --bg-test:color-mix(in oklch, var(--file-primary-hue) , rgba(255, 255, 255, 0.073) 85% ); */
		
		/* --file-primary-hue:color-mix(in oklch, hsl(calc( var(--hue-number,213) / var(--file-index)),25%, 68%) , var(--file-primary-color) var(--file-primary-color-amount)); */
		/* --bg-test:color-mix(in oklch, var(--file-primary-hue2) 90% , var(--file-primary-hue,var(--primary-gray-bg)) 90%); */
		--file-primary-hue:color-mix(in oklch, var(--file-primary-hue2) 90% , var(--file-primary-color) 90% );
		--file-primary-hue2:color-mix(in oklch, hsl(calc( var(--hue-number,213) / var(--file-index)),25%, 68%) , var(--file-primary-color) var(--file-primary-color-amount));
		--bg-test:color-mix(in oklch, var(--file-primary-hue2) 90% , var(--file-primary-color) 90% );

		position: absolute;
		bottom: 0;
		inset-inline: 0;
		top:8%;
		display: grid;
		grid-template-columns: repeat(56,1fr);
		grid-template-rows: repeat(38,1fr);
		z-index: 10 !important;
		overflow-x: hidden;
		border-radius: 0 0 var(--wc-radius) var(--wc-radius);
	/* display: none; */
		/* need to be tested */
		/* background-color: color-mix(in oklch, hsl(60, 11%, 88%), var(--file-primary-color) 9%); */
		/* background-color: color-mix(in oklch, hsl(59, 23%, 63%), var(--file-primary-color) 9%); */
		/* background-color: hsl(60, 11%, 88%); */
		/* background-color: hsl(59, 23%, 63%); */
		/* background-color: var(--bg-test); */
		/* background-color: color-mix(in oklch, var(--file-primary-hue) , rgba(255, 255, 255, 0.466) 50% ); */
		/* background-color: color-mix(in oklch, var(--file-primary-hue) , white 20% ); */
		
		background-color: color-mix(in oklch, var(--bg-test) 90% , rgba(255, 255, 255, 0.719) 70% );
	}
		
	/* work description section */
	details[open] .work-description{
		--description-bg:#e5e5f7f4;
		--_line-color:color-mix(in oklch, var(--file-primary-hue,black) , rgb(0, 0, 0) 40% );
		--_line-color2:color-mix(in oklch, var(--file-primary-hue,var(--primary-gray-bg)) , rgb(206, 44, 44) 15% );
		grid-column: 5/ 18;
		grid-row: 5/-3;
		overflow-y: auto;
		overflow-x: hidden;
		display: flex;
		/* test */
		/* display: none; */
		flex-direction: column;
		width: 100%;
		height: 80%;
		padding: 1rem;
		border-radius: 5px;
		z-index: 4;
		resize:both;
		background-color: var(--description-bg);
		box-shadow: rgba(68, 63, 43, 0.064) 0px 22px 10px;

		transition:	transform 200ms linear(0, 0.297 6.8%, 0.515 13.8%, 0.686 22%, 0.812 31.6%, 0.895 42.6%, 0.949 56.4%, 1);
		animation: content-reveal 0.4s var(--transition-timing);
		container-type: inline-size;

		background-blend-mode:overlay;
		background-position:center;
		background-repeat: repeat,no-repeat, repeat;

		/* testting */
		/* background-color: #ffffff; */
		/* background-size:cover, cover, cover; */
		/* background-size: 14px 14px , 100% 100%, 14px 14px; */
		/* background-size: 14px 14px , 100% 100%, contain; */
		/* background-image:  
			linear-gradient(var(--_line-color) 0.7000000000000001px, transparent 0.7000000000000001px), 
			url('/works-assets/material-assets/Chris website16.png') ,
			url('/works-assets/material-assets/Chris website10.png'),
			linear-gradient(to right, var(--_line-color2) 0.7000000000000001px, #e5e5f700 0.7000000000000001px)
			; */

		@supports (corner-shape: superellipse(0)){
			&{
				corner-shape: superellipse(-2);
			}
		}
	}	

	.work-description h2{
		flex: 0 1 fit-content;
		font-size: clamp(1.3rem,5vw, 2.5rem);
		text-align: end;
		margin-bottom: 1rem;
	}

	.work-description .description-space{
		flex: 1 1 30%;
		outline: solid 9px rgba(131, 131, 131, 0.045);
		outline-style: double;
		outline-offset: -1rem;
	}

	.work-description .description-info{
		flex: 1 1 30%;
		display: flex;
		flex-direction: column;
		gap: 2%;
		margin-top: 1rem;
		justify-content: end;
	}

	.work-description .description-info ul{
		display: flex;
		flex-direction: column;
		width: 100%;
		border-bottom: 1px solid var(--_line-color) ;
		container-type: inline-size;
		max-width: 400px;
	}
	
	.work-description .description-info ul.collaborators li{
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		margin-bottom: 2%;

		&> * {
			flex-basis: fit-content;
			text-transform: capitalize;
		}

		.collaborator-role{
			font-size: 0.88rem;
			font-weight: 200;
		}

		.collaborator-name{
		 text-align: end;
		 font-size: 1rem;
		}

		.list-line{
			flex: 1 1 auto;
			background-color: #000;
			background: #b3b39c;
			background: var(--_line-color);
			margin-inline: 2%;
			border-radius: 10pc;
			height: 1%;
			align-self: center;
			justify-self: center;
		}

		@container (width < 200px){
			
			justify-content: start;
			flex-direction: row-reverse;
			
			:nth-child(n){
				align-items: end;
				text-align: end;
			}

			:nth-child(-n + 2){
				display: none;
			}
		}
	}

	.work-description .description-info ul.tools{
		display: flex;
		flex-flow: row wrap;
		margin-top: 1%;
		background-color: color-mix(in oklch, var(--file-primary-hue,var(--primary-gray-bg)) , rgba(80, 80, 80, 0.167) 20% );
	}

	.description-info .tools.stamp {
		--r: 20px; 

		height: fit-content;
		padding: var(--r);
		background: var(--primary-gray-bg);
		
		contain: paint layout;
		border: 2px solid var(--_line-color2) !important;
		/* border: unset !important; */
		mask: 
			radial-gradient(40% 40%,#0000 50%,#000 3%) round 
			var(--r) var(--r)/calc(2*var(--r)) calc(2*var(--r)), 
			conic-gradient(#000 0 0) content-box
	}

	.work-description .description-info ul.tools .tags{
		--hue-number: calc(213 * 900 * var(--tag-id,13));
		--file-primary-hue:  color-mix(in oklch, hsl(calc(var(--hue-number, 213) / var(--file-index)), calc(25% + 1% * var(--tag-id,1)), 48%), var(--file-primary-color) var(--file-primary-color-amount));
		flex: 0 1 fit-content;
		height: fit-content;
		width: fit-content;
		white-space: nowrap;
		font-size: 0.88rem;
		color: color-mix(in oklch, var(--_line-color)60%, black 45%);
		padding: 0.3rem 0.8rem;
		border-radius: 50px;
		background-color: color-mix(in oklch, var(--file-primary-hue) , rgba(255, 255, 255, 0.566) 60% );
		margin-inline: 1%;
		margin-bottom: 2%;

		&:nth-child(-n + 3){
			background-color: color-mix(in oklch, var(--file-primary-hue) , rgba(214, 60, 60, 0.566) 80% );
			background-color: color-mix(in oklch longer hue, var(--file-primary-hue) , color-mix(in hsl longer hue, hsl(calc(var(--hue-number) / var(--file-index)), 45%, 28%) , var(--file-primary-color) 98%) 96% );
			background-color: var(--file-primary-hue);
		}
	}

	/* the section behind the work description */
	details[open]:has(.note .disabled) .work-description:not(.note){
		min-height: 89% ;
	}

	details[open] .work-description:where(.note){
		--description-bg:#c9c9e3c9;
		/* --description-bg:#c9c9e34e; */
		grid-column: 5/ 18;
		grid-row: 5/-5;
		display: flex;
		width: 100%;
		height: 100% !important;
		border-radius: 5px;
		overflow: visible;
		z-index: 3;
		animation: content-reveal 0.4s var(--transition-timing);
		container-type: inline-size;
		/* testting */
		box-shadow: rgba(68, 63, 43, 0.064) 0px 22px 10px;
		background-color: #e5e5f71a;
		background-image: none;

			@supports (corner-shape: superellipse(0)){
				&{
					corner-shape: superellipse(-2);
				}
			}

	}	

	.work-description:where(.note).stamp {
		--r: 11px; 
		position: relative;
		height: fit-content;
		z-index: 3;
		padding: var(--r);
		contain: paint layout;
				
		&::after{
			content: '';
			position: absolute;
			inset: 0;
			border-radius: inherit;
			z-index: -1;
			background-color: var(--description-bg);
			overflow: visible;
			padding: 1px;
			mask: 
				radial-gradient(50% 50%,#0000 46%,#000 27%) round 
				var(--r) var(--r)/calc(2*var(--r)) calc(2*var(--r)), 
				conic-gradient(#000 0 0) content-box;
			mask-composite: intersect;
		}
	}

	details[open] .work-description:where(.note):has(.disabled).stamp::after {
		pointer-events: none;
		background-color: color-mix(in oklch, var(--file-primary-hue,black) , var(--description-bg) 80% );
	}

	.work-description.note .qr-container{
		flex: 0 1 fit-content;
		display: flex;
		align-items: end;
		justify-content: end;
		height: 1rem;
		gap: 1rem;
		padding: 1%;
		margin-bottom: 2px;
		border-radius: 10px;
		background-color: color-mix(in oklch, var(--file-primary-hue,var(--primary-gray-bg)) , rgba(255, 255, 255, 0.566) 60% );

		img{
			width: 7.6rem;
			height: auto;
			aspect-ratio: 1;
		}

		p{
			font-size: 0.88rem;
			padding: 2%;
		}
	}

	details[open] .work-description:where(.note) .description-links{
		--_white-toggle:color-mix(in oklch, white 100%, var(--file-primary-hue,white) 100%);
		flex: 0 1 10%;
		display: flex;
		gap: 1rem;
		align-items: end;
		justify-content: end;

		& > * {
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 1.125rem;
			font-weight: 500;
			text-wrap: nowrap;
			color: color-mix(in oklch, var(--file-primary-hue) 10% , rgba(33, 15, 15, 0.932) 100% );
			border: solid 1px rgba(0, 0, 0, 0.179);
			height: 100%;
			padding: 0.5rem 1rem;
		}

		a{
			flex: 1 1 60%;
			border-radius: 10px ;
			/* background-color: color-mix(in oklch, var(--file-primary-hue) , rgba(214, 60, 60, 0.722) 20% ); */
			/* background-color: color-mix(in oklch, var(--file-primary-hue,var(--description-bg)) , var(--_white-toggle,rgba(214, 60, 60, 0.722)) 20% ); */
			/* background-color: color-mix(in oklch, var(--file-primary-hue,var(--description-bg)) , var(--file-primary-hue,var(--_white-toggle)) 20% ); */
			background-color: color-mix(in oklch longer hue, var(--file-primary-hue,var(--description-bg)) , color-mix(in hsl longer hue, hsl(calc(var(--hue-number) / var(--file-index)), 45%, 68%) , var(--file-primary-color) 98%) 63% );

			@supports (corner-shape: superellipse(0)){
				&{
					border-radius: 100%;
					corner-shape: superellipse(3);
				}
			}
		}

		button{
			flex: 0 1 fit-content;
			border-radius: 50pc;
			background-color: color-mix(in oklch, var(--file-primary-hue) , rgba(214, 60, 60, 0.811) 60% );
			/* background-color: color-mix(in oklch, var(--file-primary-hue) , rgba(227, 220, 21, 0.811) 60% ); */
			/* background-color: color-mix(in hsl decreasing hue, hsl(calc(797 / var(--file-index)), 99%, 88%) , var(--file-primary-color) 9%); */
			background-color: color-mix(in oklch, var(--file-primary-hue,var(--description-bg)) , var(--_white-toggle,white) 60% );

			/* color: color-mix(in oklch, var(--file-primary-hue) , rgb(255, 255, 255) 95% ); */
			cursor: pointer;

			@supports (corner-shape: superellipse(0)){
				&{
					corner-shape: superellipse(2.5);
				}
			}
		}

		.disabled{
			opacity: 0;
			pointer-events: none;
		}
	}


	/* work assets */
	/* large content scroll section */
	details[open] .work-assets {
		--file-primary-hue:color-mix(in oklch, hsl(calc(213 * 680 / var(--file-index)), 0%, 80%) , var(--file-primary-color) 20%);
		--file-primary-hue2:color-mix(in oklch , hsl(calc(213 * 701 / var(--file-index)), 55%, 98%) , var(--file-primary-color) 75%);
		--file-assets-background: color-mix(in oklch, var(--file-primary-hue) , rgba(255, 255, 255, 0.073) 85% );

		grid-column: 1/ -3;
		grid-row: 1/-1;
		display: grid;
		
		grid-template-columns: subgrid ;
		grid-template-rows: subgrid;
		width: 100%;
		height: 100%;
		padding-block: 30cqh 7cqh;
		overflow-y: auto;
		overflow-x: hidden;
		container-type: inline-size;
		/* testing */
		/* background-color: var(--file-assets-background); */
		background: 
			linear-gradient( 	
				90deg, 
				transparent 25%,
				color-mix(in oklch longer hue, var(--file-primary-hue) , rgba(255, 255, 255, 0.126) 88% ) 53%, 
				color-mix(in oklch longer hue, var(--file-primary-hue) , rgba(255, 255, 255, 0.092) 77% ) , 
				color-mix(in oklch longer hue, var(--file-primary-hue) , rgba(255, 255, 255, 0.074) 88% ) 73%, 
				transparent 85%);

		scrollbar-color: color-mix(in oklch, var(--file-primary-color), transparent 55%) transparent;
		scrollbar-color: color-mix(in oklch, var(--file-assets-background), white 15%) transparent;
		/* scrollbar-color: white transparent ; */
		/* scrollbar-width:none; */
		/* scroll-snap-type: both mandatory; */
		scroll-margin-bottom: 5rem ;

		scroll-timeline: --work-assets-timeline ;
		/* scroll-timeline: view(); */

		& .asset-border{
			position: absolute;
			inset-block:0;
			height: 100%;
			backdrop-filter: blur(3px);
			z-index: 2;
			pointer-events: none;
		}

		& .asset-border.b-left {
			left: 0;
			border-radius: 0 var(--wc-radius) var(--wc-radius) 0;
			contain: style paint;
			mask: linear-gradient(
				to right,
				var(--file-primary-hue) -2% 50%,
				transparent 70% 100%
			);
		}
		
		& .asset-border.b-right {
			right: 0;
			border-radius: var(--wc-radius) 0 0 var(--wc-radius);
			contain: style paint;
			mask: linear-gradient(
				to left,
				var(--file-primary-hue) -2% 10%,
				transparent 30% 100%
			);
		}

		& .asset-border.b-bottom {
			inset-block: unset;
			bottom: 0;
			height: 10%;
			width: 100%;
			contain: style paint;
			mask: linear-gradient(
				to top,
				var(--file-primary-hue) 0% 10%,
				transparent 30% 100%
			);
		}

		& > *{
			padding-left: 45cqw;
			scrollbar-width:none;
			animation: content-reveal 0.4s var(--transition-timing);
		}
	}
	
	/* content block styling */
	.work-assets .content-block:nth-of-type(n){
		position: relative;
		display: flex;
		flex-direction: column;
		grid-row: auto;
		margin-bottom : 2rem;

		container-type: inline-size;
	
		scroll-snap-align: center;
  		scroll-snap-stop: normal;
		
		&:nth-of-type(1),
		&:nth-last-of-type(1){
			margin: 0;
			padding-block: 0;
		}
	}

	.work-assets .content-block img{
		max-width: 500px;
		width: 100%;
		border-radius: 1pc;
		height: auto;
		aspect-ratio: 16/9;
		object-fit: fill;
		object-position: center;

		@supports (corner-shape: superellipse(0)){
			&{
				border-radius: 100%;
				corner-shape: superellipse(3);
			}	
		}
	}	

	.work-assets .content-block h2{
		font-weight: bold;
		margin-bottom: 1rem;
	}
	.work-assets .content-block p{
		line-height: 1.5;
		max-width: 80cqw;
		width: 80ch;
		margin-bottom: 1rem;
		transition: background-color 200ms ease 2s;

		/* &:where(:focus-within,:focus-visible,:hover){
			color: rgb(0, 0, 0);
			background-color: rgba(255, 255, 255, 0.459);
		} */

		&::selection{
			color: rgb(0, 0, 0);
			background-color: rgba(255, 255, 255, 0.459);
		}
	}	

	/* has no img */
	.work-assets .content-block:has(p:nth-child(1)):has(p:nth-last-child(1)){
		p{color: rgb(0, 0, 0);	}
	} 

	/* block has text and image */
	.work-assets .content-block:has(p ~ img){
		width: 100%;
		padding-block: 2%;
		flex-direction: unset !important;
		flex-wrap: wrap;

		/* &>*{
			border: #34df31 solid;
		} */
		p{
			flex: 0 1 fit-content;
			max-width: 35ch;
			margin-bottom: 2%;
			margin-right: 1%;
		}

		p ~ img{
			flex-basis:90% ;
			align-self: end;
			justify-self: end;
		}

		p:nth-of-type(n) + p ~ img{
			flex: 1 2 100%;
		} 
	}

	/* block has only image */
	.work-assets .content-block:nth-of-type(n):has(img:nth-child(1)):has(img:nth-last-child(1)){
		position: relative !important;
		min-height:20cqh ;
		height: 30cqh;
		width: auto;
		flex-flow: row nowrap;;
	 	gap: 1rem;
		padding-block: 0;
		margin-block: 4cqb ;
    
    	overflow-y: hidden;
    	overflow-x: auto;
		anchor-name: --block;

    	/* scroll-snap-type: x proximity; */
		/* overscroll-behavior-x: contain; */

		img{
			scroll-snap-stop: always;
			scroll-snap-align: start;
			outline: #ffffff4a 2px solid;
			outline-offset: -2px;
		}

		img:nth-last-of-type(1){
			/* scroll-snap-align: start; */
			margin-right: 24%;
		}

		&::scroll-button(*){
			display: grid;
			place-content: center;
			position: fixed;
			position-anchor: --block;
			width: 20px;
			height: auto;
			aspect-ratio: 1;
			bottom: calc(anchor(bottom) - 2cqh);
			right: calc(anchor(right) + 1cqi) ;
			border-radius: 50%;
			border: 1px;
			z-index: 2;
			pointer-events: auto;
			cursor: pointer;
			animation: work-assets-button linear both;
			animation-timeline: view();
			animation-range-start: contain ;
			animation-range-end: 75cqh;
			background-color: color-mix(in oklch longer hue, var(--file-primary-hue,var(--description-bg)) , color-mix(in hsl longer hue, hsl(calc(var(--hue-number) / var(--file-index)), 45%, 88%) , var(--file-primary-color) 98%) 95% );
			background-color: rgb(255, 255, 255);	
		}
		&::scroll-button(*):disabled{
			/* animation-play-state: paused; */
			z-index: 0;
			opacity: 0.2 !important;
			pointer-events: none;
		}

		&::scroll-button(left){
			content: ''/"Scroll Left";
			background-image:url('/works-assets/arrow-left.png') ;
			background-image:url('/works-assets/chevrons-left.png') ;
			background-size: cover;
			background-position: center;
			cursor: pointer;
		}
		&::scroll-button(right){
			content: ''/"Scroll Right";
			background-image:url('/works-assets/arrow-right.png') ;
			background-image:url('/works-assets/chevrons-right.png') ;
			background-size: cover;
			background-position: center;
			/* bottom: calc(anchor(bottom) + 5cqh); */
			cursor: pointer;
		}

		@supports not selector(::scroll-button(*)){
			scroll-snap-type: none;
			scrollbar-width:thin ;
			outline: springgreen solid;
		}
	}

	@keyframes work-assets-button{
		from{
			opacity: 0;
			transform: translate(0, -50%) scale(0.8);
		}
		30%,90%{
			opacity: 1;
			transform: translate(0, -50%) scale(1.2);
		}
		to{
			opacity: 0;
			transform: translate(0, -50%) scale(0.8);
		}
	}

	/* sticker styling */

	details.work-cover .cover-content{
		transition: .4s var(--transition-timing), box-shadow 0s, filter 0s, background-color 0s;

		&:nth-child(1){
			position: absolute;
			text-shadow: 3px 2px 3px rgba(255,255,255,.2);
			text-shadow: 0px 3px 3px rgba(255,255,255,0.5);
			color: rgba(0, 0, 0, 0.156);
			font-size: clamp(4rem, 15vw, 5rem);
			bottom: 5%;
			right: 5%;
		}

		&:nth-child(2){
			--sticker-color: hsl(201, 100%, 59%);
			--sticker-width: 30cqw;
			--sticker-height: 20cqh;
			--sticker-rotation: -0.6deg;
			position: relative;
			z-index: 0;
			/* display: none; */
			font-size: clamp(1rem, 15vw, 1.2rem);
		}

		&:nth-child(3){
			--sticker-color: hsla(84, 75%, 50%, 0.897);
			--sticker-width: 8rem;
			--sticker-height: 8rem;
			--sticker-rotation: -15deg;
			display: grid;
			place-content: center;
			border-radius: 50%;
			outline: 1.5px inset color-mix(in oklab, var(--sticker-color) 10% , rgba(0, 0, 0, 0.707) );
			top: 30%;
			left: 3%;

			@supports (corner-shape: superellipse(0)){
				&{
					corner-shape: scoop;
				}
			}
		}

		&:nth-child(4){
			--sticker-color: hsla(61, 75%, 50%, 0.945);
			--sticker-width: 8rem;
			--sticker-height: 8rem;
			--sticker-rotation: 12deg;
			display: grid;
			font-size: 1.2rem;
			place-content: center;
			border-radius: 50% 50% 5px 5px;
			outline: 8px solid color-mix(in oklab, var(--sticker-color) 80% , rgba(0, 0, 0, 0.579) );
			outline-offset: -5px;
			outline-style: double ;
			top: 20%;
			left: 23%;

			@supports (corner-shape: superellipse(0)){
				&{
					corner-shape: superellipse(0.2);
				}
			}

		}
	}

	/* ///// */
	/* utils */
	/* //// */

	.sticker-label{
		font-size: 1rem;
		color: color-mix(in oklch, rgb(0, 0, 0), var(--sticker-color,transparent) 10%);
		border-radius: 15px;
		background-color: var(--sticker-color);
		padding: 3ex 2ex;
		margin: 10px 30px;
		min-width: var(--sticker-width, 30cqw);
		min-height: var(--sticker-height, 20cqh);
		height: var(--sticker-height, 20cqh);
		transform: rotate(var(--sticker-rotation, 0deg));
		position: absolute;
		top: 5%;
		font-weight: lighter;

			@supports (corner-shape: superellipse(0)){
				&{
					corner-shape: superellipse(3);
				}
			}
	}

	.show-qr-links{
		transform: translate(-3cqw, -7cqh);
		filter: blur(0px) brightness(.8);
		contain: paint;
	}

	.show-qr-qr{
		transform: translate( 0, 7cqh);
		filter: brightness(1.1);
		contain: paint;
	}

	.file.jump.jump.jump{
		--_delay: calc(2s / var(--total-work,1) * var(--file-index));
		--_delay: calc(1s / var(--total-work,1) * ( var(--file-index)));
		z-index: calc(10 - var(--file-index));
		opacity: 0;
		/* animation: jump 2s ease var(--_delay) infinite ; */
		animation: jump 450ms var(--_delay) forwards steps(3,end) ;	
		animation-timing-function: linear(0, 0.029 1.6%, 0.123 3.5%, 0.651 10.6%, 0.862 14.1%, 1.002 17.7%, 1.046 19.6%, 1.074 21.6%, 1.087 23.9%, 1.086 26.6%, 1.014 38.5%, 0.994 46.3%, 1);

	}

	.loading{
		--_delay: calc(3s / var(--total-work,6) * ( var(--file-index)));
		opacity: 0;
		pointer-events: none;
		animation: 
			loading 
			3s 
			var(--_delay) 
			infinite 
			steps(4,end); 

			animation-timing-function: linear(0, 0.029 1.6%, 0.123 3.5%, 0.651 10.6%, 0.862 14.1%, 1.002 17.7%, 1.046 19.6%, 1.074 21.6%, 1.087 23.9%, 1.086 26.6%, 1.014 38.5%, 0.994 46.3%, 1);
			&*:hover{
				animation-play-state: paused;
				animation-name: none;
			}
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
		0%,30% {
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
		0%,50%{
			opacity: 1;
		}
		100% {
			z-index: calc(10 - var(--file-index));
		}
	}

	@media screen and (max-width: 1000px) {
		details.file:nth-of-type(n):is(:hover,:focus) :is(summary,::details-summary){
			--hover-file-top:0px;
			background-color: color-mix(in oklch, var(--file-primary-hue) , rgba(255, 255, 255, 0.466) 40% );
		}

		details.file:nth-of-type(n):is(:focus) :is(summary,::details-summary){
		
			rotate:calc(-2deg + .1deg * var(--file-index));
			transition-property: top,left, rotate, height; 
			transition: 100ms var(--transition-timing),box-shadow 0s,filter 0s,transform-origin 0s;
			cursor: pointer;

			@container (width < 950px){
				transform-origin: bottom left ;
				left:calc(3.5dvw - (var(--file-index) * 5px));
			}
		}

		.work-section:has(details:nth-of-type(n)[open]) details.file > summary {
			top: 0;

			.small-description,
			.side-description {
				display: none;
			}
		}

		details[open]::details-content{
			top: 6%;
			overflow: visible;
		}

		details[open] .work-description{
			grid-column: 3/ -3;
			grid-row: 2/span 12;
		}

		.work-description h2{
			text-align: center;
		}

		details[open] .work-description:not(.note) .description-space{
			flex: 0 1 5%;
		}

		.work-description .description-info ul.collaborators li{
			margin-bottom: 3px;
		}

		.work-description ul.tools.stamp{
			display: none;
		}

		details[open] .work-description.note{
			grid-row: 3/span 12;
			flex-flow: row;
			gap: 2%;
		}

		.work-description.note.stamp .description-space{
			display: none;
		}

		.work-description.note.stamp .description-links{
			flex: 1 1 5rem;
			align-self: end;
			gap: 2%;
			min-height: fit-content;
			height: 20%;
			margin-top: 1cqh;
			:is(a, button){flex: 0 1 100%;	}
		}

		.work-description.note.stamp::after{
			--r:5px;
			padding: var(--r);
		}

		.work-description.note .qr-container {
			flex: 1 2 20%;
			width: 100%;
			height: fit-content;
			justify-self: end;
			align-self: end;
			justify-content: start;
			align-items: center;
			img{		
				width: 12cqh;
			}
			p{display: none;}
		}

		/* main content */
		details[open] .work-assets {
			grid-column: 1/ -1;
			grid-row: 3/-1;
			scroll-snap-type: none;
			padding-block: 10cqh 7cqh;

		
			& > *.content-block{
			--content-padding: 10cqw;
				padding-left: var(--content-padding);
				scrollbar-width:none;
				animation: content-reveal 0.4s var(--transition-timing);
			}

			& > .content-block:nth-of-type(1){
				padding-top: 25cqh;
			}
		}

		.work-assets .content-block p{
			max-width: calc(100cqw - 2 * var(--content-padding));
		}

		.work-assets .content-block img{
			max-width: 200px;
			height: auto;
		}

		details[open] .work-assets .b-left.b-left{
			mask: linear-gradient(
				to right,
				var(--file-primary-hue) -2% 7%,
				transparent 15% 100%
			);
			contain: style paint;
		}

		details[open] .work-assets .b-right.b-right{ 
			mask: linear-gradient( to left, 
				var(--file-primary-hue) -2% 2%, 
				transparent 20% 100% 
			); 
			contain: style paint;
		}


		/* utils */

		.show-qr-links{
			transform: translate(0, -4cqh);
			filter: blur(0px) brightness(.8);
		}

		.show-qr-qr{
			transform: translate( 0, 5cqh);
		}

	}
</style>