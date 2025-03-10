<script>
 	import { menuOpen } from "$lib/store";
	let open = $state()

	
	function menuClose(event){

		if(event.key == 'h'){
			menuOpen.set(false)

		}
		 menuOpen.set(false)
	}

	function dropMenu()  {
		menuOpen.set(true);

	}


	$effect(()=>{
		   $: menuOpen.subscribe(value => {
			open = value
		});
	})

</script>

{#snippet menuContent()}
	<section>
		<button class="closebtn" onmouseup={menuClose} onkeypress="{menuClose}">close menu</button>
		{@render headerC()}

	</section>
{/snippet}

{#snippet headerC()}
	<ul class="headerUl">
		<li>
			<a href="/">
				<figure class="profile profile-2 flower" >
					<img src="/25acb22a-22a3-41d5-a0eb-c91529c4c6c8.jpg" alt="icon of my face me">
				</figure>
			</a>
		</li>
		<!-- {#if open == true}
			<li><button onclick={dropMenu}>menu</button></li>
		{/if} -->
		<li class="head-routes">
			<span> <a href="/">work</a></span>
			<span> <a href="/">about</a></span>
			<span> <a href="/">workshops,events</a></span>
		</li>
		<li class="head-extra">
			<span>darkmode toggle</span>
			<h3>Contact</h3>
			<span><img src="" alt="insta"> <a href="/">insta</a></span>
			<span><img src="" alt="github"> <a href="/">github</a></span>
			<span><img src="" alt="bluesky"> <a href="/">bluesky</a></span>
			<span><img src="" alt="linkedin"> <a href="/">linkedin</a></span>
		</li>
	</ul>
{/snippet}


{#if open == true}
	<article class="active">
		{@render menuContent()}
	</article>

{:else if open == false}
	<article class="close">		
		{@render menuContent()}
	</article>
{/if}

<style>
	:root{
		--H-menu:50cqh;
		/* --H-top:0; */
	}

	article{
		position: relative;
		z-index: 10;
		height:var(--H-menu);
		
		background-color: rgba(0, 119, 255, 0.495);
		background-color: rgb(255, 255, 255);
		backdrop-filter: blur(5px);
		padding-inline: var(--Padding-genral);
		container-type: inline-size;
		container-name: menu;

		@starting-style{
			background-color:blue;
			translate: 0 -100%;
		}
	}

	.active{
		position:absolute;
		display: block;
		inset: 0;
		top: calc(var(--H-top) - .1%);
		/* outline: solid rgba(0, 119, 255, 0.548); */
		box-shadow: 0 10px 5px -10px rgba(0, 0, 0, 0.278);

		animation: block .6s linear 0s alternate both;


	}

	.active:has(button:is(:active,:focus-within)) {
		height: calc(var(--H-menu) + 12px);
		transition: .4s cubic-bezier(0.375, 0.685, 0.32, 1.275);
	}

	/* :global(article):has(.closebtn):active {
		height: calc(var(--H-menu) + 0%);
		transition: .4s cubic-bezier(0.375, 0.685, 0.32, 1.275) ;

	} */

	/* pull down animation before retriving - needs to fixed  */
	
	/* article {
		.active:has(button.closebtn:active,:focus-within) .active{
			background-color: chartreuse;
			height: calc(var(--H-menu) + 12px);
			transition: .5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
			
		}
		.active:has(button.closebtn:hover) button:focus-within{
			translate: 0px 12px;
			transition: .2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
	
		}


	} */

	
	.close{
		position: absolute;
		inset: 0;
		/* background-color: rgba(0, 119, 255, 0.548); */
		/* background-color: chartreuse; */
		animation: launch .2s forwards cubic-bezier(0.175, 0.885, 0.32, 1.275);
		
		
		@starting-style{
			translate: 0 100%;
			opacity:0;
		}
		.flower{
			animation: none !important;
		}
	}

	
	section{
		display: block;
		position: relative;
		width: 100%;
		height: 100%;
	}

	section button.closebtn{
		position: absolute;
		bottom: 4cqh;
		right: 2%;
		width: 6rem;
		aspect-ratio: 1;
		border-radius: 50%;
		border: none;
		z-index: 100;
	}
	
	section button.closebtn:active{
		scale: .95;

	}

	/* ////////////// */
	/* header content */
	/* ////////////// */

	.headerUl{
		display: flex;
		flex-direction: row;
		position: relative;
		width: 100%;
		height: 90%;
		justify-content: space-evenly;
		bottom: 0;
		/* outline: 1px solid ; */
	}

	.headerUl li{
		outline: solid 1px rgba(207, 82, 82, 0.525);
	}

	/* home, main icon  */

	.headerUl li:nth-of-type(1){
		--w:calc-size(fit-content , size + clamp(1rem , 0.05vw + 10cqw ,10cqw));
		width: var(--w);
		height: 60cqh;
		max-height: 100%;
		/* outline: solid blue; */
		/* flex: .5 0 ; */
	}

	.headerUl li:nth-of-type(1) a {
		overflow: hidden;
		display: block;
		aspect-ratio: 1;

		width: fit-content;
		height: 100%;
	}


	/* make the flower face a component that has a custom event, when theis event is truggered then moved it to the menu   */
	.headerUl figure{
		flex: 0 1 auto;

		position: relative;
		width: 100%;
		/* height: 100%; */
		aspect-ratio: 1;
		view-transition-name: header-figure;

		& img{

		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
		animation: sway 10s linear infinite .2s backwards ;
			

		}

		&.flower{
			aspect-ratio: 1;
			--g:/25.486% 25.486% radial-gradient(#000 calc(71% - 1px),#0000 71%) no-repeat;
			mask: 100% 50% var(--g),88.302% 82.139% var(--g),58.682% 99.24% var(--g),25% 93.301% var(--g),3.015% 67.101% var(--g),3.015% 32.899% var(--g),25% 6.699% var(--g),58.682% 0.76% var(--g),88.302% 17.861% var(--g),radial-gradient(100% 100%,#000 35.01%,#0000 calc(35.01% + 1px));
			scale: 1;
			transition: .8s cubic-bezier(0.175, 0.885, 0.32, 1.275) ;
			animation: sway 10s linear infinite .5s backwards ;
			

			

			/* &::after{
				content: '';
				position: absolute;
				display: inline-grid;
				place-content: center;
				inset: 23%;
				background-color: #2e2d2de4;
				outline: solid 10px;
				color: aliceblue;
				z-index: 4;
				isolation: isolate;

				&:hover{
					transform: rotateY(0.5turn);
					background-color: aquamarine !important;

				}
				
			} */
	


		}

		

	}

	.headerUl:has(li:nth-of-type(n) a:hover)  .flower{
		--g:/27.486% 27.486% radial-gradient(#000 calc(71% - 1px),#0000 71%) no-repeat;

		transition: all 1s .1s ;
		transform: rotateY(.5turn);
		/* animation:flip 1s alternate forwards .1s   ; */
	}

	.headerUl:has(li:nth-of-type(1) a:not(:hover)) .flower {
		transition: .9s cubic-bezier(0.175, 0.885, 0.32, 1.275)  1s ;
		/* animation: sway 10s backwards infinite .1s; */
	}


	.headerUl li:is(:nth-of-type(n + 2)){
		/* background-color: greenyellow; */
		/* outline: solid greenyellow; */
		display: flex;
		flex-direction: column;
		justify-content:flex-end;
		padding-bottom: 2cqh;
		padding-inline: var(--Padding-genral);
		gap: 4%;

	}

	.headerUl .head-routes{
		flex: 2 1 auto;
		font-size: clamp(1rem, -2.1304rem + 5.6522cqw, 4.25rem);
	}

	.headerUl .head-extra{
		flex: 1 1 20%;
	}



	@keyframes sway {
		/* 0%,100%{
			rotate: inherit;
		} */
		50%{rotate: 15deg;}
		90%{rotate: 2deg;}
	}


	@keyframes block {
		0% { transform: translate(0, -100%); } 
		30% { transform: translate(0, 0%); animation-timing-function: linear; filter: blur(1.4px); } 
		37% { transform: translate(0, -15%);animation-timing-function: ease-out; } 
		55% { transform: translate(0, -20%);animation-timing-function: linear; } 
		/* 60% { transform: translate(0, 0%);animation-timing-function: ease-out;  filter: blur(1px);}  */
		76% { transform: translate(0, -8.51%);animation-timing-function: ease-out; }
		83% { transform: translate(0, 0); animation-timing-function: ease;}
		
		/* | 7 | 0.04117715 | 8.24%  | */
		85% { transform: translate(0, -3.24%); }
		
		95% { transform: translate(0, 1.03%); }
		
		/* | 9 | 0.0201768035 | 4.03%  | */
		96% { 
			transform: translate(0, 0.9%); 
			animation-timing-function: cubic-bezier(0.68, -3.55, 0.265, 3.55);
		}
		
		100% { 
			transform: translate(0, 0); 
			animation-timing-function: cubic-bezier(0.68, -1.55, 0.265, 1.55);
			animation-duration:1s ;
		} 
	}

	@keyframes launch {
		from{
			
		}

		50%{
			filter: blur(2px);
		}

		100%{
			translate: 0 -100%;
		}
}

@keyframes flip{
		to{
			transform: rotateY(2turn);
		}
	}


	@media (width < 520px) {
		:root{
			--H-menu:fit-content;
		}
		
		/* article{
			height:100%;
			background-color: red;

		} */

		.headerUl{
			flex-direction: column-reverse;
			height: 100%;

		}

		.headerUl li:nth-of-type(1) {
			aspect-ratio: none;
			width: fit-content

		}

		.headerUl{
			width: 100%;
			
		}

		.headerUl li:nth-of-type(1){
			width: 100%;

		}

		.headerUl li:nth-of-type(1) a {
			/* display:grid;
			place-content: center; */
			align-items: center;
			width: 100%;
			width: clamp(1rem , 0.5vw + 100cqw ,100%);
			height: 100%;
			flex: 0 1 30%;

			& figure{
				width: 100%;
			}
			
		}


		.headerUl figure.flower{
			animation: sway 10s linear infinite .5s, flip 12s ease-out 3s both;

		}

		.headerUl:has(li:nth-of-type(n) a:hover)  .flower{
			/* --g:/28.486% 28.486% radial-gradient(#000 calc(71% - 1px),#0000 71%) no-repeat; */
			transition: all 1s .1s ;
			transform: rotateY(0deg) !important;
		
		/* animation:flip 1s alternate forwards .1s   ; */
	
		}

		.headerUl .head-routes{
			line-height: 1.5;

		}



	}

	@media (min-width: 700px){
		
	}



</style>
