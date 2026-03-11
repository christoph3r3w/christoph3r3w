<script>
	import {Works,WorksList} from '$lib'
	import {fileType} from '$lib/store';
	let {data} = $props();
	
	let pagination = $state( data.dataWorks[0].pagination || { currentPage: 1, totalPages: 1 });
</script>
	
	<div class="switchFileType {pagination == 'none' ? 'disabled' : ''}">
		<button onclick={() => {fileType.set($fileType === 'files' ? 'list' : 'files')}}>
			{#if $fileType === 'files'}
				<span>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M7 9V7H21V9H7ZM7 13V11H21V13H7ZM7 17V15H21V17H7ZM4 9C3.71667 9 3.47917 8.90417 3.2875 8.7125C3.09583 8.52083 3 8.28333 3 8C3 7.71667 3.09583 7.47917 3.2875 7.2875C3.47917 7.09583 3.71667 7 4 7C4.28333 7 4.52083 7.09583 4.7125 7.2875C4.90417 7.47917 5 7.71667 5 8C5 8.28333 4.90417 8.52083 4.7125 8.7125C4.52083 8.90417 4.28333 9 4 9ZM4 13C3.71667 13 3.47917 12.9042 3.2875 12.7125C3.09583 12.5208 3 12.2833 3 12C3 11.7167 3.09583 11.4792 3.2875 11.2875C3.47917 11.0958 3.71667 11 4 11C4.28333 11 4.52083 11.0958 4.7125 11.2875C4.90417 11.4792 5 11.7167 5 12C5 12.2833 4.90417 12.5208 4.7125 12.7125C4.52083 12.9042 4.28333 13 4 13ZM4 17C3.71667 17 3.47917 16.9042 3.2875 16.7125C3.09583 16.5208 3 16.2833 3 16C3 15.7167 3.09583 15.4792 3.2875 15.2875C3.47917 15.0958 3.71667 15 4 15C4.28333 15 4.52083 15.0958 4.7125 15.2875C4.90417 15.4792 5 15.7167 5 16C5 16.2833 4.90417 16.5208 4.7125 16.7125C4.52083 16.9042 4.28333 17 4 17Z" fill="#1D1B20"/>
					</svg>
				</span>
					<p>list</p>
			{:else if $fileType === 'list'}
				<span>
					<svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H8L10 2H18C18.55 2 19.0208 2.19583 19.4125 2.5875C19.8042 2.97917 20 3.45 20 4V14C20 14.55 19.8042 15.0208 19.4125 15.4125C19.0208 15.8042 18.55 16 18 16H2ZM2 14H18V4H9.175L7.175 2H2V14Z" fill="#1D1B20"/>
					</svg>
				</span>
				<p>files</p>
			{/if}
		</button>
   </div>
   {#if $fileType === 'files'}
      <Works {data}/>
   {:else if $fileType === 'list'}
      <WorksList {data} />
   {/if}

<style>

	:global(.mainContain:has(:is(#works,#workList))){
		/* align-items: center; */
		justify-content: center;
	}
	
	/* :global(.mainContain:has(:is(#works,#workList):nth-of-type(-n + 1))){
		align-items: center;
		justify-content: start;
	} */


	:global(main:has(.menu-container.active) .contentContain:has(:is(#works,#workList))){
		transform: translateY(var(--menu-height, 0)) scale(.83);
		pointer-events:none;
		opacity: .7;
		/* filter:drop-shadow(rgba(131, 127, 107, 0.304) 0px -28px 40px); */
		box-shadow: 0 -10px 20px -9px rgba(12, 15, 23, 0.378);
		transition: 800ms linear(0, 0.012 0.9%, 0.05 2%, 0.411 9.2%, 0.517 11.8%, 0.611 14.6%, 0.694 17.7%, 0.765 21.1%, 0.824 24.8%, 0.872 28.9%, 0.91 33.4%, 0.939 38.4%, 0.977 50.9%, 0.994 68.4%, 1);

		&:hover{
			opacity: 1;
			pointer-events:fill;
			transform: translateY(calc(var(--menu-height, 0) - .5rem)) scale(.83);
		}

		&::before{
			content: '';
			position: absolute;
			inset: 0;
			opacity: 0;
			z-index: 100;
			pointer-events:fill;
			cursor:row-resize;
		}
	}

	:global(.contentContain:has(:is(#works,#workList))){
		height: var(--file-section-height);
		min-height: var(--file-section-height);
		top:calc(100% - var(--file-section-height) - 4%);
		bottom: 0 !important;
		max-width: 1700px;
		transition: 
			transform .5s linear(0, 0.012 0.9%, 0.05 2%, 0.411 9.2%, 0.517 11.8%, 0.611 14.6%, 0.694 17.7%, 0.765 21.1%, 0.824 24.8%, 0.872 28.9%, 0.91 33.4%, 0.939 38.4%, 0.977 50.9%, 0.994 68.4%, 1) 100ms, 
			opacity .5s 100ms;
	}

	:global(.contentContain:has(#works)){
		--file-section-height: 70dvh;
		--file-section-height: clamp(50dvh, 80lvw, 75dvh);
		/* transform: translateY(var(--menu-height, 0)); */
		@container (width < 900px){--file-section-height: 90%;	}
	}

	:global(.contentContain:has(#workList)){
		--file-section-height: 80%;
		height: 100%;
		top:calc(100% - var(--file-section-height) - 4%);
		@container (width < 900px){--file-section-height: 75%;	}
	}

	.switchFileType.disabled,
	:global(.mainContain:has(#works details[open])) .switchFileType {
		transform: translate(0,5rem);
		pointer-events: none;
		opacity: .3;
	}

	.switchFileType {
		position: absolute;
		right: 1rem;
		top: -3rem;
		display: flex;
		flex-flow: row nowrap;
		transition: .5s 100ms;
		z-index: 0;
  }

  .switchFileType button {
		flex: 1 0 fit-content;
		display: flex;
		flex-flow: row nowrap;
		height: 2rem;
		padding: 5px 16px;
		border: 1px solid white;
		border-radius: 10pc;
		background-color: rgba(255, 255, 255, 0.329);
		filter:drop-shadow(rgba(105, 98, 63, 0.096) 0px 28px 10px);
		cursor: pointer;
		overflow: hidden;
		
		

		& > *{
			display: flex;
			height: 100%;
			align-items: center;
			align-self: center;
		}

 		span {
			flex: 0 0 30%;
			margin-inline: 5px;
		}

		span svg {
			width: auto;
			height: auto;

			path{
				fill: var(--primary-color,green);
			}
		}

		p {
			flex: 1 0 auto;
			font-size: 1.125rem;
			white-space: nowrap;
			overflow: hidden;
			max-width: 0;
			opacity: 0;
			transition: max-width .35s ease, opacity .25s ease;
		}
  }

  .switchFileType button:is(:hover,:active,:focus-within) {
		background-color: white;
  }

  .switchFileType button:is(:hover,:active,:focus-within) p {
		max-width: 8ch;
		opacity: 1;
  }



</style>