<script lang="ts">
	import { onMount,tick } from 'svelte';
	import { OrderedList, ContactForm, StickerBed,Carousel } from '$lib';
	import {firstLoad} from '$lib/store';
	import { fade} from 'svelte/transition';
	import QRCode from 'qrcode';
	import { ListCollapse, ListIndentDecrease, QrCode, XIcon,ArrowUpRight,BookText } from '@lucide/svelte';
	import {audioAction} from '../../audio/audio.action';
	import { audio } from '$lib/audio/audio.js'

	interface Props {
		works?: Work;
		index?: number;
		children?: () => any;
	}

	interface Work {
		title?: string;
		slug?: string;
		published?: { is: boolean; date: string };
		description?: string;
		assets?: { image?: string[]; icon?: string; color?: string };
		link?: { src?: string; showType?: '' | 'mobile' | 'desktop' | 'none' };
		dateStart?: string;
		dateEnd?: string;
		status?: { is?: string; sticker?: string };
		contentBlock?: Array<{
			text?: string[];
			images?: string[];
			h2?: string;
			html?: string;
			video?: string;
		}>;
		collaborators?: Record<string, string>;
		tags?: string[];
		m5?:(filenumber : number) => void;
	}

	let { works ,index, children } : Props = $props();


	let contentLoad = $state<boolean[]>([]);
	let openDetailsIndex = $state<number | null>(null);
	let m4 = $derived(openDetailsIndex);

	// let works = $derived(dataWorks2[1]?.works?.filter((w: any) => w?.published?.is === true).slice(0, 6) || []);
	let fileLinks = $derived(works[m4 ?? 0]?.link.src || '');
	let qrTimeout: ReturnType<typeof setTimeout> | null = $state(null);
	let qrURL = $state('');
	let showQr: boolean = $state(false);
	let showDescription: boolean = $state(false);

</script>

{#snippet workAssets(work: Work, index: number)}
	<article class="work-assets" >
		<div class="asset-border b-left"></div>
		<div class="asset-border b-right"></div>
		<div class="asset-border b-bottom"></div>
		{@render workDescription(work)}
		
		{#if work.contentBlock}
			{#if work.contentBlock.length === 0 && work.description}
				<article class="content-block">
					<p>{work.description}</p>
				</article>
			{/if}
			{#each work.contentBlock as block, i}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
				<article class="content-block block-{i}" onclick={(e) => handleProjectToggle(e)} >
					{#if block.h2}	<h2>{block?.h2}</h2>{/if}
					{#if block.text && block.text.length > 1}
						{#each block.text as textLine}
							<p>{@html textLine}</p>
						{/each}
					{:else if block.text}
						<p>{@html block.text}</p>
					{/if}
					{#if block.images || block.video }
					{#if contentLoad[index]}
						{#await projects then dataWorks} 
						<Carousel imageBlock={block.images} blockIndex={i} controls={['base']} >
						{#each block.images as img}
							<span	class="asset-img-ctnr" >
								<picture >	
									<img src={img} alt={'Image'} loading="lazy"
									 sizes="(min-width:1920px) 1280px, (min-width:1080px) 640px, (min-width:768px) 400px"
									/>
								</picture>
							</span>
							{/each}
						</Carousel>
						{:catch error}
							<p>Error loading images: {error.message}</p>
						{/await}
						{/if}
					{/if}
					{#if block.html}
						{@html block.html}
					{/if}
				</article>
			{/each}
		{/if}
		<button class="show-info" onclick={moveDescription}>
				{#if showDescription}
					<ListIndentDecrease size="20" />
				{:else}
					<BookText size="20" />
				{/if}
			</button>
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
	<!-- the section behind the description -->
	<article class="work-description note stamp {showQr ? 'show-qr-qr' : ''}">
		<div class="description-space">
			<button class="wavyBox" onclick={moveDescription}>
				{#if showDescription}
					<ListCollapse size="20" />
				{:else}
					<ListIndentDecrease size="20" />
				{/if}
			</button>
		</div>
		<div class="qr-container">
			{#if work.link}
				{@const isDisabled = !work.link.src?.trim() || work.link.showType == 'desktop' }
				{#if showQr}
					<p>Scan the QR code to visit the site</p>
				{/if}
				{#if work.link.showType != 'desktop'}
				<img src={qrURL} alt="QR Code" class="qr-code" />
					<button class="{{ disabled: isDisabled }} qr-btn" onclick={() => toggleQR()} style={showQr ? 'opacity: 0' : 'opacity: 1'} >
						{#if !showQr}
							<QrCode size="50" color="var(--black)" />
						{/if}
					</button>
				{/if}
			{:else}
				<p>No link available for this project</p>
			{/if}
		</div>
		<div class="description-links">
			{#if work?.link?.showType != 'none'}			
				{#if work.link?.showType != 'mobile' && work?.link?.src?.trim()}
					<a
						class="{{ disabled: !work?.link?.src }} link-btn"
						href={work?.link?.src}
						target="_blank"
						rel="noopener noreferrer"
					>
						{#if showQr}
							Link <ArrowUpRight size="16" />
						{:else}
							Visit site
						{/if}
					</a>
				{/if}
				{#if work?.link?.showType != 'desktop' }
					<button
						class="{{ disabled: !work?.link?.src?.trim() }} qr-btn"
						onclick={() => toggleQR()}
						title={showQr ? 'close QR' : 'Qr code'}
					>
						{#if showQr}
							<XIcon />
						{:else}
							<QrCode />
						{/if}
					</button>
				{/if}
			{/if}
		</div>
	</article>
{/snippet}

{#snippet summaryContent(work: Work, i: number)}
	<summary
		class={work?.status?.is == 'experiment' ? 'experiment' : work?.status?.is == 'small'? 'small experiment' : ''}
		onmouseenter={() => {
			handleClose;
			// contentLoad = true;
		}}
		use:audioAction={{
			sounds: {
				mouseenter: 'hover',
				// focus: 'hover',
			}, volume: 0.25 + i * 0.1, playbackRate: (work?.status?.is == 'experiment' || work?.status?.is == 'small') ? 1.3 : Math.max(.35, Math.min(.55, 0.8 + Math.tan(i * 0.8) * 0.12))
		}}
		
	>
		{#if work?.assets?.icon?.trim()}
			<span class="work-icon-span">
				<img src={work?.assets?.icon} alt={work.title} width="auto" height="30" />
			</span>
		{/if}
		<span class="file-title">{work.title}</span>
		<span class="small-description">{work.slug}</span>
		<div class="side-description">
			<span class="date-start">{work?.dateEnd || work.dateStart || ''}</span>
			<span class="status">{work?.status?.sticker || (work?.status?.is && work.status.is !== 'small' ? work.status.is : '') || ''}</span>
		</div>
		<div class="close-file-icon">
			<XIcon />
		</div>
	</summary>
{/snippet}

{#snippet files(work: Work, i: number)}
	{#key work.slug}
		<details
			class="file file-{i + 1} {$firstLoad ? 'jump' : ''}"
			style="--file-index:{i + 1}; --work-icon: url('{work?.assets?.icon}'); 
				{work?.assets?.color ? `--file-primary-color:${work?.assets?.color}`: ''}"
			ontoggle={(e) => {
				if (e.currentTarget.open) {
					openDetailsIndex = i;
					contentLoad[i] = true;
					audio.play('clickIn');
				} else if (openDetailsIndex === i) {
					openDetailsIndex = null;
					contentLoad[i] = false;
					audio.play('clickOut');
				}
			}}
		>
			{@render summaryContent(work, i)}
			{@render workDescription(work)}
			{@render workAssets(work, i)}
		</details>
	{/key}
{/snippet}