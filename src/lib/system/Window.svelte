<!-- componnet description -->
<!-- what it is   -->
<!-- how to use -->
<!-- what are the properties  -->
<script lang=ts>
	import type { HTMLAreaAttributes } from 'svelte/elements';


// defining property type
interface Props {
	title?: string;
	context?: string;
	role: string;
	class?: string;
	color?:string;
	style?: HTMLAreaAttributes ['style'];
	
	children?: import('svelte').Snippet<[]>; 
}
// props
let {title,context,role,children, class: CLASS,color, style, ...props} : Props = $props(); 

</script>

<!-- layout A -->
{#snippet A()}
	{#if title}
		<h2>{title}</h2>
	{/if}
	{#if context}
		<p>{context}</p>
	{/if}
	{#if children}
		{@render children()}
	{/if}
{/snippet}

<!-- layout B -->
{#snippet B()}

	{#if title}
	<!-- maybe can be a header  -->
	<div class="header">
		<h1>{title}</h1>
		<p>{context}</p>
	</div>
	{/if}

	{#if children}
	<section>
		{@render children()}
	</section>
	{/if}
{/snippet}

<!-- logic for all the types of containers  -->
{#if role == 'window'}
	<!-- window container -->
	<main class="contain {CLASS}" style="background-color:{color}; {style}" {...props} >
		{@render B()}
	</main>
{:else if role == 'child'}
	<!-- any container inside the main container -->
	<div class="contain child-container {CLASS}" style="background-color:{color}; {style}" {...props}>
		{@render A()}
	</div>
{/if}
<!--  create a backup template for if there is no input for a role -->

<style>
:root{
	--wc-radius:clamp(0.5rem, 2vw, 1.8pc);
	--wc-bg:rgb(108, 108, 255);
	/* --wc-bg:var(--D-base-bk); */
	--wc-bg:var(--D-t-support);
	--cc-bg:rgb(250, 255, 114);
	--cc-radius:var(--wc-radius);
}

.contain{
	container-type:inline-size;
	position: relative;
}

	/* window container is by default a grid  */
main{
	width: 100%;
	height: 100%;
	container-name:window-container;
	background-color:var(--wc-bg,white) ;
	color: var(--wc-text,black);
	& > :is(:nth-child(n)){
		grid-column: context;
	}
}

/* all content should be in the middle grids */
main >:nth-child(n){
	grid-column: context;
	border-radius: var(--cc-radius,inherit);
}

main >:nth-child(1):is(.header),.header:nth-of-type(1){
	grid-column: context;
	height: fit-content;
	text-align: center;
	border-radius: var(--cc-radius,inherit);

	&:is(:focus-visible,:focus-within){
		outline: dotted rgba(255, 0, 0, 0.112);
	}
}

main > section:nth-of-type(1){
	height: 100%;
	width: 100%;
	border-radius: var(--cc-radius,inherit);
	display: flex;
	flex-direction: column;
}


/* child containers */
.child-container{
	container-name:child-contianer;
	color: var(--cc-text,black);
	border-radius: var(--cc-radius,inherit);
	margin-block:2%;
}

	@media(min-width: 700px){
		main{
			grid-template-columns:[full-start] minmax(1px, .1fr) [context-start] repeat(8,1fr) [context-end] minmax(1px, .1fr) [full-end];
		}
		main >:nth-child(n){
			grid-column: span auto;
		}

		main >:nth-child(1):is(.header),.header{
			grid-column: context;
		}
	}

	@container child-contianer (width){
		
	}
</style>