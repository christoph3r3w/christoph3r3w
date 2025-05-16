<script lang="ts">
  import { goto } from '$app/navigation';
  import { Window,Intro,Works } from '$lib';
  import { onMount, onDestroy } from 'svelte';
  import { menuOpen } from '$lib/store';
  import { InfiniteScroll, type ScrollState } from '$lib/system/InfiniteScroll';

  // Reactive variables using $state
  let container = $state<HTMLElement | undefined>(undefined);
  let scroller = $state<HTMLElement | undefined>(undefined);
  let progressCounter = $state<HTMLElement | any>(undefined);
  let progressBar = $state<HTMLElement | undefined>(undefined);
  let sections = $state<any[]>([]); // Using any[] as the initial type

  // Add current section tracking
  let currentSection = $state(0);
  let totalSections = $state(0);

  let infiniteScroll: InfiniteScroll;

  

  // function startViewTransition(callback: () => void) {
	// 	if (!document.startViewTransition) {
	// 		// Fallback for browsers that don't support View Transitions
	// 		callback();
	// 		return;
	// 	}
		
	// 	// Start a view transition
	// 	return document.startViewTransition(() => {
	// 		// Update the DOM within the transition
	// 		callback();
	// 	});
	// }

  function escapeKey(event: KeyboardEvent) {
        if (event.key === 'Escape' || event.code === 'Escape') { 
          menuOpen.set(false);
        } else{
          return
        }
  }

	function menuClose(){
		// startViewTransition(function() {
			menuOpen.set(false);
		// })
	}

  onMount(() => {
    if (!scroller || !progressBar || !progressCounter || !container) return;

    const scrollState: ScrollState = {
      container,
      scroller,
      progressCounter,
      progressBar,
      sections,
      currentSection,
      totalSections
    };


    infiniteScroll = new InfiniteScroll(scrollState);
    const sequenceWidth = infiniteScroll.setupScroll();
    if (!sequenceWidth) return;

    infiniteScroll.updateProgress(sequenceWidth, true);
    progressBar.style.transform = `scaleX(${0})`;

    // Set up event listeners
    const scrollerElement = scroller as HTMLElement;
    const containerElement = container as HTMLElement;

    scrollerElement.addEventListener('wheel', (e) => infiniteScroll.handleWheel(e, sequenceWidth));
    containerElement.addEventListener('touchstart', infiniteScroll.handleTouchStart);
    containerElement.addEventListener('touchmove', (e) => infiniteScroll.handleTouchMove(e, sequenceWidth));
    containerElement.addEventListener('touchend', () => infiniteScroll.handleTouchEnd(sequenceWidth));
    window.addEventListener('keydown', infiniteScroll.handleKeyDown);
    window.addEventListener('keydown', escapeKey);

    infiniteScroll.animate(sequenceWidth);

    return () => {
      scrollerElement.removeEventListener('wheel', (e) => infiniteScroll.handleWheel(e, sequenceWidth));
      containerElement.removeEventListener('touchstart', infiniteScroll.handleTouchStart);
      containerElement.removeEventListener('touchmove', (e) => infiniteScroll.handleTouchMove(e, sequenceWidth));
      containerElement.removeEventListener('touchend', () => infiniteScroll.handleTouchEnd(sequenceWidth));
      window.removeEventListener('keydown', (infiniteScroll.handleKeyDown, escapeKey));
    };
  });

  onDestroy(() => {
      infiniteScroll
  });

  // Update scrollToSection to use infiniteScroll
  const scrollToSection = (sectionIndex: number) => {
    infiniteScroll?.scrollToSection(sectionIndex);
  };

  $effect(()=>{
	  console.log(currentSection,totalSections);
  })
</script>

  <div class="container" bind:this={container}>
  <!-- the progress bar -->
  <div class="progress-bar" bind:this={progressBar}></div>

  <div class="progress-counter" bind:this={progressCounter}>
    <h2>0</h2>
  </div>

  <!-- Optional navigation buttons -->
  <button class="nav-btn prev" onclick={() => scrollToSection(currentSection - 1)}>←</button>
  <button class="nav-btn next" onclick={() => scrollToSection(currentSection + 1)}>→</button>

  <!-- the section -->
  <section class="mainContain scroller" bind:this={scroller} onclick={menuClose}  >
    <Window role="child" class="contentContain" color="white" style="--hoverC:white" bind:this={sections[0]}>
     <Intro/>
    </Window>

    <Window role="child" class="contentContain" color="transparent" bind:this={sections[1]}>
      <p>no yoo</p>
    </Window>

    <Window role="child" class="contentContain" color="transparent" style="--hoverC:#DCA256" bind:this={sections[2]}>
      <Works/>
    </Window>
    
    <Window role="child" class="contentContain" color="transparent" style="--hoverC:#3B6E25" bind:this={sections[3]}>
      <p>no y443</p>
    </Window>
  </section>

  <noscript>
    <section class="mainContain"  onclick={menuClose}>
      x111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
    </section>
  </noscript>
</div>

<style>
  :root, * {
    --scale: 0;
    will-change: transform, scale, background-color;
  }

  :global(body:has(noscript .mainContain)) {
    .container:has(.scroller){
    background-color: aqua !important;
    display: none;
    }
    header{
     background-color: red;
    }
  } 
  .container {
    position: relative;
    inset: 0;
    width: 100vw;
    height: 100%;
	  overflow: hidden;

  }
  .progress-bar {
    position: fixed;
    bottom: 0;
    inset-inline: 0;
    width: 100vw;
    height: 10px;
    transform: scaleX(var(--scale));
    transform-origin: center left;
    background-color: #2c5d9859;
    z-index: 2;
  }
  .progress-counter {
    position: fixed;
    height: fit-content;
    bottom: 3%;
    right: 10%;
    color: blue;
    z-index: 2;
    outline: solid #2C5D98;
  }
  .mainContain {
    position: relative;
    display: flex;
	  gap: 10px;
    flex-direction: row;
	/* justify-content: space-evenly; */
    overflow-y: hidden;
    overflow-x: hidden;
    height: 99.8%;
    width: auto;
  }

  :global(.contentContain) {
    margin-top: 1px !important;
    position: relative;
    top: 10px;
    flex: 0 0 89vw;
    flex-basis: clamp(60vw,100%,90vw);
    height: 97.5%;
	  translate:clamp(-4% ,-5vw, -10%) 0;
	  background-color: color-mix(in srgb, var(--hoverC,#2C5D98) , rgba(255, 255, 255, 0.466) 70% );
	  transition: .5s ease-out;
    display: grid;
    grid-template-columns: repeat(60,1fr);
    grid-template-rows: repeat(40,1fr);

    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    box-shadow: rgba(224, 224, 238, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.177) 0px -2px 6px 0px inset,rgba(212, 211, 203, 0.505) 0px 30px 60px -12px inset, rgba(211, 188, 131, 0.3) 0px 18px 36px -18px inset;
    box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;
    /* box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset; */
    box-shadow: rgba(0, 0, 0, 0.1) -4px 9px 25px -6px;
    /* box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset; */

  }

  :global(.contentContain:hover){
    background-color: color-mix(in srgb, var(--hoverC,#2C5D98) , rgba(255, 255, 255, 0.466) 30% );
    transition: 1s ease-out;
  }

  :global(.contentContain :is(.pad)) {
    display: grid;
    /* grid-template-columns: subgrid;
    grid-template-rows: subgrid; */
    position: relative;
		grid-column: 1/-1;
		grid-row: 1/-1;
    padding-inline: var(--Padding-genral) !important;

  }

  /* Add navigation button styles */
  .nav-btn {
    position: fixed;
    bottom: 3%;
    transform: translateY(0%);
    background: rgba(0, 0, 0, 0.2);
    color: white;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 20px;
    cursor: pointer;
    z-index: 10;
    transition: background 0.3s;
  }
  
  .nav-btn:hover {
    background: rgba(0, 0, 0, 0.5);
  }
  
  .prev {
    left: 20px;
  }
  
  .next {
    right: 20px;
  }
</style>