<script lang="ts">
	class Theme {
		name: string;
		properties: Record<string, string>;

		constructor(name: string, properties: Record<string, string>) {
			this.name = name;
			this.properties = properties;
		}
	}

	export const themeList = $state([
		new Theme('light', {
			' --color-bg': '#ffffff',
			'--color-text': '#000000',
			'--primary-color': '#007bff',
			'--secondary-color': '#6c757d',
			'--accent-color': '#17a2b8',
			'--color-border': '#dee2e6'
		}),
		new Theme('dark', {
			' --color-bg': '#121212',
			'--color-text': '#ffffff',
			'--primary-color': '#1e90ff',
			'--secondary-color': '#6c757d',
			'--accent-color': '#17a2b8',
			'--color-border': '#495057'
		})
	]);
</script>
