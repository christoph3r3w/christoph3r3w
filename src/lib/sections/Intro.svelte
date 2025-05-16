<script lang="ts">
	import { onMount, onDestroy } from "svelte";
	import { gsap } from "gsap";
	import { SplitText } from "gsap/dist/SplitText";
	// import { elasticIn } from "svelte/easing";
	gsap.registerPlugin(SplitText);

	
	let textElement:any;
	let splitResult:any;

	let split:any = null;
	
	onMount(() => {
		if (textElement) {

			
			// Create split text
			// splitResult = (splitText(textElement, { type: "chars,words" }));
			
			// console.log('Text element:', textElement);
			
			split  = SplitText.create('.text',{
				type:'chars,words',
			})
			// console.log('Split result:', split);

			gsap.from(split.chars, {
				opacity:0,
				x:1000,
				duration:2,
				onComplete: () => console.log("it happend ")
			})


	
		}
	});

	onDestroy(() => {
		if (split) split.revert();
	});

	// let name = $state(['c','h','r','i','s','t','o','p','h','e','r','.'])
	
	// $effect(() => {
	// 	if (name.length > 0) {
	// 		document.documentElement.style.setProperty('--letter-total', name.length.toString());
	// 	}
	// })


</script>
<div class="intro-section pad">
	<p class="text"
		bind:this={textElement}		
	>Christopher</p>
	
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

	.intro-section{
		border-radius: inherit;
		padding: 4rem !important;
		background-origin: content-box;
		background-repeat: no-repeat;
		background-color: white;
		height: 50vh;
		position: relative;
		overflow: hidden;
	}

	p{
		width: 10rem;
		position: relative;
	}

	/* :global(.char) {
		display: inline-block;
		position: relative;
		will-change: transform;
	} */

</style>