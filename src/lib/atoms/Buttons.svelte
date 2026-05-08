<script lang="ts">
	let { children, text="cc" } : ButtonProps = $props();

	interface ButtonProps {
		children?: any;
		text?: string;
	}
</script>

<button>
	{@render children()}
	{text}
</button>