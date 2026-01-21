export interface ScrollState {
  container: HTMLElement | undefined;
  scroller: HTMLElement | undefined;
  progressCounter: HTMLElement | any;
  progressBar: HTMLElement | undefined;
  sections: any[];
  currentSection: number;
  totalSections: number;
}

export class InfiniteScroll {
  private smoothFactor = 0.06;
  private touchSensitivity = 2.5;
  private bufferSize = 3;
  private isAnimating = false;
  private currentScrollX = 0;
  private targetScrollX = 0;
  private currentProgressScale = 0;
  private targetProgressScale = 0;
  private lastPercentage = 0;
  private isDown = false;
  private lastTouchX = 0;
  private touchVelocity = 0;
  private lastTouchTime = 0;

  constructor(private state: ScrollState) {
    this.state = state;
  }

  private lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

  setupScroll = (): number | undefined => {
    if (!this.state.scroller) return undefined;
    const scrollerElement = this.state.scroller as HTMLElement;

    const cloneSections = scrollerElement.querySelectorAll('.clone-section');
    cloneSections.forEach((clone) => clone.remove());

    const originalSections = Array.from(
      scrollerElement.querySelectorAll('.contentContain:not(.clone-section)')
    ) as HTMLElement[];

    const templateSections = originalSections.length > 0 ? originalSections : this.state.sections;

    let sequenceWidth = 0;
    templateSections.forEach((section: HTMLElement) => {
      sequenceWidth += parseFloat(window.getComputedStyle(section).width);
    });

    for (let i = -this.bufferSize; i < 0; i++) {
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

    for (let i = 1; i <= this.bufferSize; i++) {
      templateSections.forEach((section: HTMLElement, index: number) => {
        const clone = section.cloneNode(true) as HTMLElement;
        clone.classList.add('clone-section');
        clone.setAttribute('data-clone-index', `${i - index}`);
        scrollerElement.appendChild(clone);
      });
    }

    scrollerElement.style.width = `${sequenceWidth * (1 + this.bufferSize * 2)}px`;

    this.targetScrollX = sequenceWidth * this.bufferSize;
    this.currentScrollX = this.targetScrollX;
    scrollerElement.style.transform = `translateX(-${this.currentScrollX}px)`;

    this.state.totalSections = this.state.sections.length;

    return sequenceWidth;
  };

  checkBoundryAndReset = (sequenceWidth: number): boolean => {
    if (!this.state.scroller || !sequenceWidth) return false;

    if (this.currentScrollX > (this.bufferSize + 1) * sequenceWidth) {
      this.currentScrollX -= sequenceWidth;
      this.targetScrollX -= sequenceWidth;
      this.state.scroller.style.transform = `translateX(-${this.currentScrollX}px)`;
      return true;
    }

    if (this.currentScrollX < (this.bufferSize - 0.5) * sequenceWidth) {
      this.currentScrollX += sequenceWidth;
      this.targetScrollX += sequenceWidth;
      this.state.scroller.style.transform = `translateX(-${this.currentScrollX}px)`;
      return true;
    }

    return false;
  };

  updateProgress = (sequenceWidth: number, forceReset = false) => {
    if (!this.state.progressCounter || !this.state.progressBar) return;
    const basePosition = sequenceWidth * this.bufferSize;
    const currentPosition = (this.currentScrollX - basePosition) % sequenceWidth;
    let percentage = (currentPosition / sequenceWidth) * 100;

    if (percentage < 0) {
      percentage = 100 + percentage;
    }

    const isWrapping =
      (this.lastPercentage > 80 && percentage < 20) ||
      (this.lastPercentage < 20 && percentage > 80) ||
      forceReset;

    const sectionPercentage = 100 / this.state.totalSections;
    const absoluteSection = Math.floor(percentage / sectionPercentage);
    const relativeSection = ((absoluteSection % this.state.totalSections) + this.state.totalSections) % this.state.totalSections;
    
    const bufferOffset = Math.floor(this.currentScrollX / sequenceWidth) - this.bufferSize;
    this.state.currentSection = relativeSection + (bufferOffset * this.state.totalSections);
    
    const displaySection = ((relativeSection + 1 + this.state.totalSections) % this.state.totalSections) || this.state.totalSections;
    this.state.progressCounter.textContent = `${displaySection}/${this.state.totalSections}`;
    this.targetProgressScale = percentage / 100;

    if (isWrapping) {
      this.currentProgressScale = this.targetProgressScale;
      this.state.progressBar.style.transform = `scaleX(${this.currentProgressScale})`;
    }

    this.lastPercentage = percentage;
  };

  animate = (sequenceWidth: number, forceProgressReset = false) => {
    if (!this.state.scroller || !this.state.progressBar) return;

    this.currentScrollX = this.lerp(this.currentScrollX, this.targetScrollX, this.smoothFactor);
    this.state.scroller.style.transform = `translateX(-${this.currentScrollX}px)`;

    this.updateProgress(sequenceWidth, forceProgressReset);

    if (!forceProgressReset) {
      this.currentProgressScale = this.lerp(this.currentProgressScale, this.targetProgressScale, this.smoothFactor);
      this.state.progressBar.style.transform = `scaleX(${this.currentProgressScale})`;
    }

    if (Math.abs(this.targetScrollX - this.currentScrollX) < 0.01) {
      this.isAnimating = false;
      
      const basePosition = sequenceWidth * this.bufferSize;
      const currentPosition = (this.currentScrollX - basePosition) % sequenceWidth;
      const percentage = (currentPosition / sequenceWidth) * 100;
      const sectionPercentage = 100 / this.state.totalSections;
      const exactSection = percentage / sectionPercentage;
      const roundedSection = Math.round(exactSection);
      
      if (Math.abs(exactSection - roundedSection) > 0.0) {
        this.snapSectionToStart();
      }
    } else {
      requestAnimationFrame(() => {
        this.animate(sequenceWidth);
      });
    }
  };

  snapSectionToStart = (sectionIndex?: number): void => {
    if (!this.state.scroller || !this.state.progressCounter || !this.state.progressBar || this.state.totalSections === 0) return;
    
    const scrollerElement = this.state.scroller as HTMLElement;
    const sequenceWidth = parseFloat(scrollerElement.style.width) / (1 + this.bufferSize * 2);
    const sectionWidth = sequenceWidth / this.state.totalSections;
    
    if (sectionIndex === undefined) {
      const basePosition = sequenceWidth * this.bufferSize;
      const currentPosition = (this.currentScrollX - basePosition) % sequenceWidth;
      let percentage = (currentPosition / sequenceWidth) * 100;
      
      if (percentage < 0) {
        percentage = 100 + percentage;
      }
      
      const sectionPercentage = 100 / this.state.totalSections;
      const currentSectionFloat = percentage / sectionPercentage;
      
      sectionIndex = Math.round(currentSectionFloat);
      
      if (sectionIndex >= this.state.totalSections) {
        sectionIndex = 0;
      } else if (sectionIndex < 0) {
        sectionIndex = this.state.totalSections - 1;
      }
    } else {
      sectionIndex = ((sectionIndex % this.state.totalSections) + this.state.totalSections) % this.state.totalSections;
    }
    
    this.state.currentSection = sectionIndex;
    
    const targetPercentage = (sectionIndex * 100) / this.state.totalSections;
    const targetPosition = (targetPercentage / 100) * sequenceWidth;
    
    this.targetScrollX = (this.bufferSize * sequenceWidth) + targetPosition;
    
    this.state.progressCounter.textContent = `${this.state.currentSection + 1}/${this.state.totalSections}`;
    this.targetProgressScale = targetPercentage / 100;
    
    if (!this.isAnimating) {
      this.isAnimating = true;
      requestAnimationFrame(() => this.animate(sequenceWidth));
    }
  };

  scrollToSection = (sectionIndex: number): void => {
    this.snapSectionToStart(sectionIndex);
  };

  // Event handlers
  handleWheel = (e: WheelEvent, sequenceWidth: number) => {
    e.preventDefault();
    this.targetScrollX += e.deltaY * 1.5 || e.deltaX;

    const needsReset = this.checkBoundryAndReset(sequenceWidth);

    if (!this.isAnimating) {
      this.isAnimating = true;
      requestAnimationFrame(() => this.animate(sequenceWidth, needsReset));
    }
  };

  handleTouchStart = (e: TouchEvent) => {
    this.isDown = true;
    this.lastTouchX = e.touches[0].clientX;
    this.lastTouchTime = Date.now();
    this.targetScrollX = this.currentScrollX;
  };

  handleTouchMove = (e: TouchEvent, sequenceWidth: number) => {
    if (!this.isDown) return;
    e.preventDefault();

    const currentTouchX = e.touches[0].clientX;
    const touchDelta = this.lastTouchX - currentTouchX;

    this.targetScrollX += touchDelta * this.touchSensitivity;

    const currentTime = Date.now();
    const timeDelta = currentTime - this.lastTouchTime;
    if (timeDelta > 0) {
      this.touchVelocity = (touchDelta / timeDelta) * 15;
    }

    this.lastTouchX = currentTouchX;
    this.lastTouchTime = currentTime;

    const needsReset = this.checkBoundryAndReset(sequenceWidth);
    if (!this.isAnimating) {
      requestAnimationFrame(() => {
        this.animate(sequenceWidth, needsReset);
      });
    }
  };

  handleTouchEnd = (sequenceWidth: number) => {
    this.isDown = false;

    if (Math.abs(this.touchVelocity) > 0.1) {
      this.targetScrollX += this.touchVelocity * 20;

      const decayVelocity = () => {
        this.touchVelocity *= 0.95;

        if (Math.abs(this.touchVelocity) > 0.1) {
          this.targetScrollX += this.touchVelocity;
          const needsReset = this.checkBoundryAndReset(sequenceWidth);

          if (needsReset) {
            this.updateProgress(sequenceWidth, true);
          }
          requestAnimationFrame(decayVelocity);
        } else {
          this.snapSectionToStart();
        }
      };
      
      requestAnimationFrame(decayVelocity);
    } else {
      this.snapSectionToStart();
    }
  };
  
  // needs to be fixed

  // handleKeyDown = (e: KeyboardEvent) => {
  //   if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
  //     this.scrollToSection(this.state.currentSection + 1);
  //   } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
  //     this.scrollToSection(this.state.currentSection - 1);
  //   }
  // };
} 