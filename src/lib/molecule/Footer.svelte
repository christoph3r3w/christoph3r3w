<script lang="ts">
	import { goto } from '$app/navigation';

	interface Props {
		class?: any;
		children?: import('svelte').Snippet<[]>; 
	}

	let {children, class: CLASS, ...props} : Props = $props();

</script>

<footer>
	<a href="/">Home</a>
	<a href="/about">About</a>
	<a href="/contact">Contact</a>
</footer>

<style>
	footer {
		
	}

</style>