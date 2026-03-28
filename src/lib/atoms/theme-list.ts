type Theme = {
	name: string;
	properties: Record<string, string>;
};

export const themeList: Theme[] = [
{
		name: 'reset',
		properties: {
			'--color-bg': '',
			'--color-bg-muted': 'var(--gray-bg)',
			'--color-text': 'var(--black)',
			'--primary-color': '',
			'--secondary-color': '',
			'--tritary-color': '',
			'--accent-color': '',
			'--color-border': '',
			// '--color-border-hover': '#fff',
			'--color-heading': '',
			
		}
	},
	// {
	// 	name: 'light',
	// 	properties: {
	// 		'--color-bg': 'rgb(235, 233, 219)',
	// 		'--color-bg-muted': 'rgba(213, 213, 213, 0.904)',
	// 		'--color-text': '#000000',
	// 		'--primary-color': '#007bff',
	// 		'--secondary-color': '#6c757d',
	// 		'--accent-color': '#17a2b8',
	// 		'--color-border': '#dee2e6',
	// 		'--color-border-hover': '#fff',
	// 		'--color-heading': '#202122',
	// 	}
	// },
	{
		name: 'dark',
		properties: {
			// '--color-bg': '#1a0a00',
			'--color-bg': 'var(--dark-subtle)',
			'--color-bg-muted': 'rgb(39, 37, 33)',
			'--color-text': '#ffffff',
			'--color-text-mute': '#000000',
			'--primary-color': '#ffe91e9e',
			'--secondary-color': '#6c757d',
			// '--tritary-color': '#A8A390',
			'--tritary-color': 'var(--tan-light)',
			// '--accent-color': '#17a2b8',
			'--accent-color': '#e7c75e',
			'--color-border': '#495057',
			'--color-border-hover': '#fff',
			'--color-heading': '#dee2e6',
		}
	},
	{
		name: 'sunset',
		properties: {
			'--color-bg': '#1a0a00',
			'--color-bg-muted': '#1a0a00',
			'--color-text': '#ffe4c4',
			'--primary-color': '#ff6b35',
			'--secondary-color': '#ff9e40',
			'--accent-color': '#ffcc5c',
			'--color-border': '#8b3a00',
			'--color-border-hover': '#fff',
			'--color-heading': '#dee2e6',
		}
	},
	{
		name: 'ocean',
		properties: {
			'--color-bg': '#001f3f',
			'--color-bg-muted': '#002b55',
			'--color-text': '#f5f5f5',
			'--primary-color': '#00b4d8',
			'--secondary-color': '#0077b6',
			'--accent-color': '#90e0ef',
			'--color-border': '#023e8a',
			'--color-border-hover': '#90e0ef',
			'--color-heading': '#caf0f8',
		}
	},
	{
		name: 'forest',
		properties: {
			'--color-bg': '#1E2B10',
			'--color-bg-muted': '#1e2b10cc',
			'--color-text': '#f5f5f5',
			'--primary-color': '#FFF000',
			'--secondary-color': '#544B47',
			'--tritary-color': '#FBFAF0',
			'--accent-color': '#FFF000',
			'--color-border': '#023e8a',
			'--color-border-hover': '#90e0ef',
			'--color-heading': '#1e2b10cc',
		}
	},
	
];
