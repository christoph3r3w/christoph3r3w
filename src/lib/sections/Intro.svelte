<script lang="ts">
	import { onMount, onDestroy } from "svelte";
	import { gsap } from "gsap";
	import { SplitText } from "gsap/dist/SplitText";
	import { linear } from "svelte/easing";
	gsap.registerPlugin(SplitText);

	let introSection: HTMLElement;
	let bar: HTMLElement;
	let textElement: HTMLElement;
	let split: any = null;
	let tl: gsap.core.Timeline;

	onMount(() => {
		if (textElement && introSection) {
			split = new SplitText(textElement, { 
				type: "chars, words",
				autoSplit: true,
				charsClass: "char++",
				wordsClass: "word",
				onSplit: (self)=> {
					document.documentElement.style.setProperty('--letter-total', self.chars.length.toString());
				}
			});

			tl = gsap.timeline({});

			tl.set(bar, {
				y: "40cqh",
				opacity: 0,
			}).from(bar, {
				y: "40cqh",
				opacity: 0,
				duration: 1,
			}).to(bar, {
				y: "0cqh",
				opacity: 1,
				duration: .4,
			});

			tl.from(textElement,{
				y: "100cqh",
				opacity: 0,
				duration: 1.5,
			})
			
			

			

			// tl.to(split.chars, {
			// 	stagger: {
			// 		amount: 3,
			// 		// repeat: -1,
			// 		// repeatDelay: 1,
			// 		// yoyo: true,
			// 		 grid: [23,15],
    		// 		from: "random",
			// 		ease: "power5.out",
			// 	},
			// 	y:'10cqw',
			// 	duration: 1,
			// 	// autoAlpha: 0,	
			// 	ease: linear,
			// }).to(
			// 	".text p:nth-of-type(1)",
			// 	{
			// 		stagger: {
			// 			amount: 3,
			// 			grid: [23,15],
			// 			from: "random",
			// 		},
			// 		position: "fixed",
			// 		x: "-10cqw",
			// 	},
			// 	'<0.5'
			// ).to(
			// 	".text p:nth-of-type(2)",
			// 	{
			// 		stagger: {
			// 			amount: 3,
			// 			grid: [23,15],
			// 			from: "random",
			// 		},
			// 		position: "fixed",
			// 		x: "10cqw",
			// 	},
			// 	'<0')
			// 	.to('.char',{fontSize: "5rem"},'<0.2');

			
			// tl.from(".char3,.char7", {
			// 	repeat: -1,
			// 	repeatDelay: 1,

			// 	stagger: 1,
			// 	xPercent: "random(-10, 10)",
			// 	duration:2,
			// 	outline: "solid red 1px",
			// },"-=1");


			// tl.to(split.chars.slice(0, 3), {
			// 	y: "50cqh",
			// 	stagger: 0.2,
			// });
			// tl.to(
			// 	split.chars.slice(4, 8),
			// 	{
			// 		y: "20cqh",
			// 	},
			// 	"<0.3"
			// );
			// tl.to(split.chars.slice(4, 8), {
			// 	x: "20cqw",
			// });
		}
	});

	onDestroy(() => {
		if (split) {
			split.revert();
			split = null;
		}
		if (tl) {
			tl.kill();
			tl = null as any;
		}
		// Clear DOM references
		introSection = null as any;
		textElement = null as any;
		bar = null as any;
	});

	// let name = $state(['c','h','r','i','s','t','o','p','h','e','r','.'])
	
	// $effect(() => {
	// 	if (name.length > 0) {
	// 		document.documentElement.style.setProperty('--letter-total', name.length.toString());
	// 	}
	// })


</script>
<div class="intro-section pad" bind:this={introSection}>
	<!-- <p class="text" bind:this={textElement}	>Christopher Willems</p> -->
	<div class="text" bind:this={textElement}	>
		<p>Chri</p>
		<!-- <figure class='bar' bind:this={bar}>
			<img src="25acb22a-22a3-41d5-a0eb-c91529c4c6c8.jpg" alt="">
			<section class="barControls">
				<span class="toLeft"><button>left</button></span>
				<span class="progress-counter">1234</span>
				<span class="toRight"><button>right</button></span>
			</section>
		</figure> -->
		<p>stopher</p>
	</div>
	<!-- <figure class='bar' bind:this={bar}>
		<img src="25acb22a-22a3-41d5-a0eb-c91529c4c6c8.jpg" alt="">
		<section class="barControls">
			<span class="toLeft"><button>left</button></span>
			<span class="progress-counter">1234</span>
			<span class="toRight"><button>right</button></span>
		</section>
	</figure>
	<section class="barConShadow"></section> -->
</div>

<style>
	:root{
		
		@property --letter-index {
			syntax: "<number>";
			initial-value: 0;
			inherits: true;
		}
		
		@property --letter-total {
			syntax: "<number>";
			initial-value: 11;
			inherits: true;
		}
		
		@property --random-col {
			syntax: "<number>";
			initial-value: 1;
			inherits: true;
		}
		
		@property --random-row {
			syntax: "<number>";
			initial-value: 1;
			inherits: true;
		}
		
		@property --h {
			syntax: "<number> | <percentage>";
			initial-value: -0%;
			inherits: true;
		}
	}


	:global(.char) {
		display: inline-block;
		position: relative;
		will-change: transform;
		font-size: 2rem ;
		/* outline: solid rgba(0, 128, 0, 0.174) 1px; */
	}
	:global(.word) {
		display: inline-block;
		position: relative;
		will-change: transform;
		width: clamp(10rem, 100%, 20rem);
		/* outline: solid rgba(0, 128, 0, 0.174) 1px; */
	}

	.intro-section{
		border-radius: inherit;
		padding: 4rem !important;
		background-origin: content-box;
		background-repeat: no-repeat;
		/* background-color: white; */
		height: 70cqh;
		height: 100%;
		position: relative;
		overflow: hidden;
		display: grid;
		place-content: center;
		perspective: 80rem;

		container-type: inline-size;
	}

	/* .text{
		width: 60vw;
		height: 15cqh;
		position: relative;
		display: inline flex;
		align-items: center;
		justify-content: center;
		outline: solid red;
	} */

	/* .text p{
		display: flex;
		align-items: center;
	} */
	
	/* .bar {
		--press:0;
		--h:1;
		--d:0;

		flex: 1 0 50%;
		position: fixed; 
		inset-inline: 10%;
		inset-block: 40%;
		display: flex;
		border-radius: 10rem 10rem;
		background-color: goldenrod;
		overflow: clip;
		opacity: 0;
		z-index: 3;
		transition: .2s;
		box-shadow: rgba(0, 0, 0, 0.09) var(--press) calc(2px * var(--h)) 1px var(--d), rgba(0, 0, 0, 0.09) var(--press) calc(4px * var(--h)) 2px var(--d), rgba(0, 0, 0, 0.09) var(--press) calc(8px * var(--h)) 4px var(--d), rgba(0, 0, 0, 0.09) var(--press) 16px 8px var(--d), rgba(0, 0, 0, 0.09) 0px 32px 16px var(--d);
	} */

	/* :global(body):has(.bar:hover) .barConShadow {
		--press: 0;
		box-shadow: rgba(0, 0, 0, 0.09) var(--press) 2px 1px, rgba(0, 0, 0, 0.09) var(--press) 4px 2px, rgba(0, 0, 0, 0.09) var(--press) 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
		transition: .2s;
		transform: translateY(10%) !important;
	} */
	/* span and button left */
	/* :global(body) .bar:hover:has(span:nth-of-type(1):hover){
		--press: 10px ;
		--h:-1.2;
		--d:-5px;
		transform: rotateY(-5deg) skewY(1deg) !important;
	} */

	/* :global(body) .bar:hover:has(span:nth-of-type(1) button:active){
		--press: 10px ;
		--h:-1.2;
		--d:-5px;
		transform: rotateY(-10deg) skewY(2deg) !important;
	} */

	/* span and button right */
	/* :global(body) .bar:hover:has(span:nth-of-type(3):hover){
		--press: -10px;
		--h:-1.2;
		--d:-5px;
		transform: rotateY(5deg) skewY(-1deg) !important;
	}

	:global(body) .bar:hover:has(span:nth-of-type(3) button:active){
		--press: -10px;
		--h:-1.2;
		--d:-5px;
		transform: rotateY(10deg) skewY(-2deg) !important;
	}

	.bar img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: 75% 35%;
		border-radius: inherit;
		mix-blend-mode:overlay;
	}

	.barControls {
		position: absolute;
		inset-inline: 0;
		inset-block: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-radius: 10rem 10rem;
		z-index: 2;

	}

	.barControls span:is(:nth-of-type(1), :nth-of-type(3)) {
		display: none
	}

	.barControls span:nth-of-type(2) {
		display: flex;
		flex: 1 1 40%;
		justify-content: center;
		align-items: center;
		outline: solid rgba(119, 128, 0, 0.678);
		height: 100%;
	}

	@supports not selector(::scroll-button(*)){
	
		.barControls span {
			position: relative;
			outline: solid rgba(119, 128, 0, 0.678);
			height: 100%;
			flex: 1 1 30%;
			display: flex;
			align-items: center;

			&:nth-of-type(1) {
				display: flex;
				border-radius: 5rem 0 0 5rem;
				padding-left: 3%;
			}

			&:is(:nth-of-type(2)){
				justify-content: center;
			}

			&:nth-of-type(3){
				display: flex;
				border-radius: 0 5rem 5rem 0;
				justify-content: end;
				padding-right: 3%;
			}
		}
	}

	.barControls span:nth-child(n) button {
		position: relative;
		aspect-ratio: 1;
		border-radius: 50%;
		height: 80%;
		border: none;
		anchor-name: "button";
		
		&:active {
			outline: solid rgba(0, 128, 0, 0.174) 1px;
			background-color: rgb(0, 128, 0);
		}
	}

	.barControls span:nth-child(1) button {
		anchor-name: --button-left;
	}
	.barControls span:nth-child(3) button {
		anchor-name: --button-right;
	}

	.barConShadow {
		position: absolute;
		inset-inline: 10%;
		inset-block: 40%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-radius: 10rem 10rem;
		z-index: 1;
		background-color: rgba(94, 94, 94, 0.568);
	} */

</style>