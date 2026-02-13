<script lang="ts">
  import { goto } from '$app/navigation';
  import { Window,Intro,Intro2,Works, OrderedList } from '$lib';
  import { onMount, onDestroy } from 'svelte';
  import { menuOpen } from '$lib/store';

  let {data} = $props();


  // Reactive variables using $state
  let container = $state<HTMLElement | undefined>(undefined);
  let scroller = $state<HTMLElement | undefined>(undefined);
  let progressCounter = $state<HTMLElement | any>(undefined);
  let progressBar = $state<HTMLElement | undefined>(undefined);
  let sections = $state<any[]>([]); // Using any[] as the initial type

  // Add current section tracking
  let currentSection = $state(0);
  let totalSections = $state(0);
 
 $effect(() => {
  if (!scroller) return;
  
  const handleClick = () => {
    if($menuOpen == true){
      menuOpen.set(false);
    }
  };
  
  scroller.onclick = handleClick;
  
  return () => {
    if (scroller) {
      scroller.onclick = null;
    }
  };
 })

onMount(() => {
  function debounce(func: Function, timeout = 300) {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func(...args); }, timeout);
    };
  }

  if (!scroller) return;
  
  function checkScrollButtons(el: HTMLElement) {
    if (!el || !el.isConnected) return; // Safety check for destroyed elements
    const atStart = el.scrollLeft === 0;
    const atEnd = Math.ceil(el.scrollLeft + el.clientWidth) >= el.scrollWidth;

    // Optional: add classes if needed
    if (atStart) {
      el.classList.add('at-start');
    } else {
      el.classList.remove('at-start');
    }

    if (atEnd) {
      el.classList.add('at-end');
    } else {
      el.classList.remove('at-end');
    }
  }

  const debouncedScrollCheck = debounce(() => checkScrollButtons(scroller!));
  const debouncedResizeCheck = debounce(() => checkScrollButtons(scroller!));

  scroller.addEventListener('scroll', debouncedScrollCheck);
  window.addEventListener('resize', debouncedResizeCheck);
  checkScrollButtons(scroller); // Initial check
  
  // Return cleanup function properly
  return () => {
    if (scroller) {
      scroller.removeEventListener('scroll', debouncedScrollCheck);
      window.removeEventListener('resize', debouncedResizeCheck);
    }
  };
});

onDestroy(() => {
  // Clear DOM references to prevent memory leaks
  container = undefined;
  scroller = undefined;
  progressCounter = undefined;
  progressBar = undefined;
  sections = [];
});


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

  
</script>

  <div class="container" bind:this={container}>

  <!-- the section -->
  <section class="mainContain scroller" bind:this={scroller} >
    <Window role="child" class="contentContain" color="white" style="--hoverC:white" bind:this={sections[0]}>
      <Intro2 {data}/>
    </Window>

    <!-- <Window role="child" class="contentContain" color="red" style="--hoverC:white" bind:this={sections[0]}>
      <Intro2 {data}/>
    </Window> -->

    <!-- <Window role="child" class="contentContain" color="white" style="--hoverC:white" bind:this={sections[0]}>
     <Intro/>
    </Window> -->

    <!-- <Window role="child" class="contentContain" color="transparent" bind:this={sections[1]}>
      <p>no yoo</p>
    </Window> -->

    <!-- <Window role="child" class="contentContain" color="transparent" style="--hoverC:#DCA256" bind:this={sections[2]}>
      <Works {data}/>
    </Window> -->
    
    <!-- <Window role="child" class="contentContain" color="transparent" style="--hoverC:#3B6E25" bind:this={sections[3]}>
      <p>no y443</p>
    </Window> -->
  </section>

</div>

<style>
  :root, * {
    --scale: 0;

    @property --padding-genral {
        syntax: "<length>";
        initial-value: 1rem;
        inherits: true;
    }   
  }

  :global(body:has(noscript .mainContain)) {
    .container:has(.scroller){
      background-color: aqua !important;
      display: none;
    }
  } 

  .container {
    position: relative;
    inset: 0;
    width: 100vw;
    height: 100%;
	  overflow: hidden; 
  }

  .mainContain {
    position: relative;
    display: flex;
	  gap: 5dvw;
    flex-direction: row;
    overflow-y: hidden;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    height: 99.8%;
    width: auto;
    padding-inline: 5dvw;
    will-change: transform, scale, background-color;
  }

  /* carousel control logic and animation */
  .scroller {
    
    &::scroll-button(*){
      position: fixed;
      /* top: anchor(top);
      left: anchor(left);
      right: anchor(right);
      bottom: anchor(bottom); */
      bottom: 4%;
      margin-inline: 6%;
      background: rgba(197, 197, 197, 0.762);
      color: rgb(178, 67, 67);
      border: none;
      border-radius: 50%;
      width: 40px;
      aspect-ratio: 1;
      font-size: 20px;
      cursor: pointer;
      z-index: 10;
      transition: width .8s cubic-bezier(0,1.47,0.28,0.97),opacity .9s ease-in-out;
    }

    &::scroll-button(*):disabled {
      visibility: hidden;
      opacity: 0;
    }

    &::scroll-button(left) {
      content: "<" / "Scroll Left";
      position-anchor: --button-left;
      left: calc(var(--end2) * 1%);
    }

    &::scroll-button(right) {
      content: ">" / "Scroll Right";
      position-anchor: --button-right;
      right: calc(var(--end1,0) * 1%);
    }
  }

  /* button grow animation */
  :global(body:has(.at-start, .at-end)) {
    .scroller::scroll-button(*):not(:disabled) {
      width: 5rem;
    }
  }
  /* :global(body:has(.at-end)) {
    .scroller::scroll-button(left){
      width: 6rem;
    }
  } */

  :global(.contentContain) {
    margin-top: 1px !important;
    position: relative;
    top: 10px;
    flex: 0 0 89vw;
    flex-basis: clamp(60vw,100%,90vw);
    height: 97.5%;
	  /* translate:clamp(-2% ,-2vw, -8%) 0; */
	  background-color: color-mix(in srgb, var(--hoverC,#2C5D98) , rgba(255, 255, 255, 0.466) 70% );
	  transition: 200ms ease-out;
    transition-property: top,height;
    display: grid;
    grid-template-columns: repeat(60,1fr);
    grid-template-rows: repeat(40,1fr);
    scroll-snap-align: center;

    /* box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset; */
    /* box-shadow: rgba(224, 224, 238, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.177) 0px -2px 6px 0px inset,rgba(212, 211, 203, 0.505) 0px 30px 60px -12px inset, rgba(211, 188, 131, 0.3) 0px 18px 36px -18px inset; */
    /* box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset; */
    /* box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset; */
    box-shadow: rgba(0, 0, 0, 0.1) -4px 9px 25px -6px;
    /* box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset; */

  }

  :global(.contentContain:hover){
    background-color: color-mix(in srgb, var(--hoverC,#2C5D98) , rgba(255, 255, 255, 0.466) 30% );
    transition: .1s ease-out;
  }

  :global(.contentContain :is(.pad)) {
    display: grid;
    position: relative;
		grid-column: 1/-1;
		grid-row: 1/-1;
    padding-inline: var(--padding-genral) !important;

  }

  @media (width < 900px) {
    .mainContain.scroller {
    display: block;
      padding-inline: 3%;
      width: 100dvw;
    }
  }
</style>