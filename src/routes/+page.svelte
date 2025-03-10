<script lang="ts">
  import { goto } from '$app/navigation';
  import { Window } from '$lib';
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';

  // Reactive variables using $state
  let container = $state<HTMLElement | undefined>(undefined);
  let scroller = $state<HTMLElement | undefined>(undefined);
  let sections = $state<any[]>([]); // Using any[] as the initial type

  // Add current section tracking
  let currentSection = $state(0);
  let totalSections = $state(0);

  const smoothFactor = 0.06;
  const touchSensitivity = 2.5;
  const bufferSize = 3;

  let targetScrollX = $state(0);
  let currentScrollX = $state(0);
  let isAnimating = $state(false);
  let currentProgressScale = $state(0);
  let targetProgressScale = $state(0);
  let lastPercentage = $state(0);

  let isDown = $state(false);
  let lastTouchX = $state(0);
  let touchVelocity = $state(0);
  let lastTouchTime = $state(0);

  // Kept the lerp function untouched
  const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

  const setupScroll = (): number | undefined => {
    if (!scroller) return undefined;
    const scrollerElement = scroller as HTMLElement;

    const cloneSections = scrollerElement.querySelectorAll('.clone-section');
    cloneSections.forEach((clone) => clone.remove());

    const originalSections = Array.from(
      scrollerElement.querySelectorAll('.contentContain:not(.clone-section)')
    ) as HTMLElement[];

    const templateSections = originalSections.length > 0 ? originalSections : sections;

    let sequenceWidth = 0;
    templateSections.forEach((section: HTMLElement) => {
      sequenceWidth += parseFloat(window.getComputedStyle(section).width);
    });

    for (let i = -bufferSize; i < 0; i++) {
      templateSections.forEach((section: HTMLElement, index: number) => {
        const clone = section.cloneNode(true) as HTMLElement;
        clone.classList.add('clone-section');
        clone.setAttribute('data-clone-index', `${i - index}`);
        scrollerElement.appendChild(clone);
      });
    }

    if (originalSections.length === 0) {
      templateSections.forEach((section, index) => {
        const clone = section.cloneNode(true) as HTMLElement;
        clone.setAttribute('data-clone-index', `${0 - index}`);
        scrollerElement.appendChild(clone);
      });
    }

    for (let i = 1; i <= bufferSize; i++) {
      templateSections.forEach((section: HTMLElement, index: number) => {
        const clone = section.cloneNode(true) as HTMLElement;
        clone.classList.add('clone-section');
        clone.setAttribute('data-clone-index', `${i - index}`);
        scrollerElement.appendChild(clone);
      });
    }

    scrollerElement.style.width = `${sequenceWidth * (1 + bufferSize * 2)}px`;

    targetScrollX = sequenceWidth * bufferSize;
    currentScrollX = targetScrollX;
    scrollerElement.style.transform = `translateX(-${currentScrollX}px)`;

    // Set total sections count
    totalSections = sections.length;

    return sequenceWidth;
  };

  const checkBoundryAndReset = (sequenceWidth: number): boolean => {
    if (!scroller || !sequenceWidth) return false;

    // If we've scrolled past the right boundary
    if (currentScrollX > (bufferSize + 1) * sequenceWidth) {
      currentScrollX -= sequenceWidth;
      targetScrollX -= sequenceWidth;
      (scroller as HTMLElement).style.transform = `translateX(-${currentScrollX}px)`;
      return true;
    }
    // If we've scrolled past the left boundary
    if (currentScrollX < (bufferSize - 0.5) * sequenceWidth) {
      currentScrollX += sequenceWidth;
      targetScrollX += sequenceWidth;
      (scroller as HTMLElement).style.transform = `translateX(-${currentScrollX}px)`;
      return true;
    }

    return false;
  };

  const updateProgress = (sequenceWidth: number, forceReset = false) => {
    if (!progressCounter || !progressBar) return;
    const basePosition = sequenceWidth * bufferSize;
    const currentPosition = (currentScrollX - basePosition) % sequenceWidth;
    let percentage = (currentPosition / sequenceWidth) * 100;

    if (percentage < 0) {
      percentage = 100 + percentage;
    }

    const isWrapping =
      (lastPercentage > 90 && percentage < 10) ||
      (lastPercentage < 10 && percentage > 90) ||
      forceReset;

    // Calculate section from percentage (assuming equal width sections)
    const sectionPercentage = 100 / totalSections;
    // Calculate relative section index including negative values for clones
    const absoluteSection = Math.floor(percentage / sectionPercentage);
    const relativeSection = ((absoluteSection % totalSections) + totalSections) % totalSections;
    
    // Calculate buffer offset
    const bufferOffset = Math.floor(currentScrollX / sequenceWidth) - bufferSize;
    currentSection = relativeSection + (bufferOffset * totalSections);
    
    // Update progress display
    // Show the relative section number (normalized to positive range)
    const displaySection = ((relativeSection + 1 + totalSections) % totalSections) || totalSections;
    progressCounter.textContent = `${displaySection}/${totalSections}`;
    targetProgressScale = percentage / 100;

    if (isWrapping) {
      currentProgressScale = targetProgressScale;
      (progressBar as HTMLElement).style.transform = `scaleX(${currentProgressScale})`;
    }

    lastPercentage = percentage;
  };

  const animate = (sequenceWidth: number, forceProgressReset = false) => {
    if (!scroller || !progressBar) return;

    currentScrollX = lerp(currentScrollX, targetScrollX, smoothFactor);
    (scroller as HTMLElement).style.transform = `translateX(-${currentScrollX}px)`;

    updateProgress(sequenceWidth, forceProgressReset);

    if (!forceProgressReset) {
      currentProgressScale = lerp(currentProgressScale, targetProgressScale, smoothFactor);
      (progressBar as HTMLElement).style.transform = `scaleX(${currentProgressScale})`;
    }

    if (Math.abs(targetScrollX - currentScrollX) < 0.01) {
      isAnimating = false;
      
      // When animation stops, check if we need to snap to a section
      const basePosition = sequenceWidth * bufferSize;
      const currentPosition = (currentScrollX - basePosition) % sequenceWidth;
      const percentage = (currentPosition / sequenceWidth) * 100;
      const sectionPercentage = 100 / totalSections;
      const exactSection = percentage / sectionPercentage;
      const roundedSection = Math.round(exactSection);
      
      // If we're not close to a section boundary, snap to nearest section
      if (Math.abs(exactSection - roundedSection) > 0.05) {
        snapSectionToStart();
      }
    } else {
      requestAnimationFrame(() => {
        animate(sequenceWidth);
      });
    }
  };

  // Replace the existing snapSectionToStart function with this implementation
  const snapSectionToStart = (sectionIndex?: number): void => {
    if (!scroller || !progressCounter || !progressBar || totalSections === 0) return;
    
    const scrollerElement = scroller as HTMLElement;
    const sequenceWidth = parseFloat(scrollerElement.style.width) / (1 + bufferSize * 2);
    const sectionWidth = sequenceWidth / totalSections;
    
    // If no section index is provided, calculate based on current position
    if (sectionIndex === undefined) {
      // Calculate current percentage
      const basePosition = sequenceWidth * bufferSize;
      const currentPosition = (currentScrollX - basePosition) % sequenceWidth;
      let percentage = (currentPosition / sequenceWidth) * 100;
      
      if (percentage < 0) {
        percentage = 100 + percentage;
      }
      
      // Calculate which section we're closest to
      const sectionPercentage = 100 / totalSections;
      const currentSectionFloat = percentage / sectionPercentage;
      
      // Round to nearest section
      sectionIndex = Math.round(currentSectionFloat);
      
      // Handle edge cases
      if (sectionIndex >= totalSections) {
        sectionIndex = 0;
      } else if (sectionIndex < 0) {
        sectionIndex = totalSections - 1;
      }
    } else {
      // Normalize provided section index
      sectionIndex = ((sectionIndex % totalSections) + totalSections) % totalSections;
    }
    
    // Update current section
    currentSection = sectionIndex;
    
    // Calculate target position
    const targetPercentage = (sectionIndex * 100) / totalSections;
    const targetPosition = (targetPercentage / 100) * sequenceWidth;
    
    // Set target scroll position with buffer offset
    targetScrollX = (bufferSize * sequenceWidth) + targetPosition;
    
    // Update progress display
    progressCounter.textContent = `${currentSection + 1}/${totalSections}`;
    targetProgressScale = targetPercentage / 100;
    
    // Start animation if not already running
    if (!isAnimating) {
      isAnimating = true;
      requestAnimationFrame(() => animate(sequenceWidth));
    }
  };

  // Add a scrollToSection function that uses snapSectionToStart
  const scrollToSection = (sectionIndex: number): void => {
    snapSectionToStart(sectionIndex);
  };

  $effect(()=>{
	console.log(currentSection);
	
  })

  onMount(() => {
    if (!scroller || !progressBar || !progressCounter || !container) return;

    const scrollerElement = scroller as HTMLElement;
    const containerElement = container as HTMLElement;

    const sequenceWidth = setupScroll();
    if (!sequenceWidth) return;
    updateProgress(sequenceWidth, true);
    (progressBar as HTMLElement).style.transform = `scaleX(${currentProgressScale})`;

    // Set up IntersectionObserver to detect which section is visible
    const sectionWidth = sequenceWidth / totalSections;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !isDown) {
            const section = entry.target as HTMLElement;
            const originalIndex = parseInt(section.getAttribute('data-original-index') || '0');
            
            // Update current section without changing scroll position
            currentSection = originalIndex;
            progressCounter.textContent = `${currentSection + 1}/${totalSections}`;
          }
        });
      },
      { 
        root: scrollerElement,
        threshold: 0.1
      }
    );
    
    // Add index data and observe all section elements including clones
    const allSections = scrollerElement.querySelectorAll('.contentContain');
    allSections.forEach((section) => {
      const cloneIndex = section.getAttribute('data-clone-index');
      const originalIndex = cloneIndex ? 
        parseInt(cloneIndex) % totalSections :
        Array.from(sections).indexOf(section);
        
      section.setAttribute('data-original-index', originalIndex.toString());
      observer.observe(section);
    });

    const wheelHandler = (e: WheelEvent) => {
      e.preventDefault();
      targetScrollX += e.deltaY * 1.5 || e.deltaX;

      const needsReset = checkBoundryAndReset(sequenceWidth);

      if (!isAnimating) {
        isAnimating = true;
        requestAnimationFrame(() => animate(sequenceWidth, needsReset));
      }
    };

    const touchStartHandler = (e: TouchEvent) => {
      isDown = true;
      lastTouchX = e.touches[0].clientX;
      lastTouchTime = Date.now();
      targetScrollX = currentScrollX;
    };

    const touchMoveHandler = (e: TouchEvent) => {
      if (!isDown) return;
      e.preventDefault();

      const currentTouchX = e.touches[0].clientX;
      const touchDelta = lastTouchX - currentTouchX;

      targetScrollX += touchDelta * touchSensitivity;

      const currentTime = Date.now();
      const timeDelta = currentTime - lastTouchTime;
      if (timeDelta > 0) {
        touchVelocity = (touchDelta / timeDelta) * 15;
      }

      lastTouchX = currentTouchX;
      lastTouchTime = currentTime;

      const needsReset = checkBoundryAndReset(sequenceWidth);
      if (!isAnimating) {
        requestAnimationFrame(() => {
          animate(sequenceWidth, needsReset);
        });
      }
    };

    const touchEndHandler = () => {
      isDown = false;

      if (Math.abs(touchVelocity) > 0.1) {
        targetScrollX += touchVelocity * 20;

        const decayVelocity = () => {
          touchVelocity *= 0.95;

          if (Math.abs(touchVelocity) > 0.1) {
            targetScrollX += touchVelocity;
            const needsReset = checkBoundryAndReset(sequenceWidth);

            if (needsReset) {
              updateProgress(sequenceWidth, true);
            }
            requestAnimationFrame(decayVelocity);
          } else {
            // When velocity is low enough, snap to nearest section
            snapSectionToStart();
          }
        };
        
        requestAnimationFrame(decayVelocity);
      } else {
        // If no significant velocity, snap immediately
        snapSectionToStart();
      }
    };

    // Add keyboard navigation
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        scrollToSection(currentSection + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        scrollToSection(currentSection - 1);
      }
    };

    scrollerElement.addEventListener('wheel', wheelHandler);
    containerElement.addEventListener('touchstart', touchStartHandler);
    containerElement.addEventListener('touchmove', touchMoveHandler);
    containerElement.addEventListener('touchend', touchEndHandler);
    window.addEventListener('keydown', keyHandler);

    isAnimating = true;
    animate(sequenceWidth);

    return () => {
      scrollerElement.removeEventListener('wheel', wheelHandler);
      containerElement?.removeEventListener('touchstart', touchStartHandler);
      containerElement?.removeEventListener('touchmove', touchMoveHandler);
      containerElement?.removeEventListener('touchend', touchEndHandler);
      window.removeEventListener('keydown', keyHandler);
      observer.disconnect();
    };
  });
</script>

<div class="container" bind:this={container}>
  <div class="progress-bar" bind:this={progressBar}></div>

  <div class="progress-counter" bind:this={progressCounter}>
    <h2>0</h2>
  </div>

  <!-- Optional navigation buttons -->
  <button class="nav-btn prev" onclick={() => scrollToSection(currentSection - 1)}>←</button>
  <button class="nav-btn next" onclick={() => scrollToSection(currentSection + 1)}>→</button>

  <section class="mainContain scroller" bind:this={scroller}>
    <Window role="child" class="contentContain" color="transparent" style="--hoverC:white" bind:this={sections[0]}>
      <p>no yoo</p>
    </Window>
    <Window role="child" class="contentContain" color="transparent" bind:this={sections[1]}>
      <p>no yoo</p>
    </Window>
    <Window role="child" class="contentContain" color="transparent" style="--hoverC:beige" bind:this={sections[2]}>
      <p>no ya</p>
    </Window>
    <Window role="child" class="contentContain" color="transparent" style="--hoverC:#ffffca" bind:this={sections[3]}>
      <p>no y333</p>
    </Window>
    <Window role="child" class="contentContain" color="transparent" style="--hoverC:#3B6E25" bind:this={sections[4]}>
      <p>no y443</p>
    </Window>
  </section>
</div>
