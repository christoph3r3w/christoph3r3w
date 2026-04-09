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
			'--color-text-invert': 'var(--white)',
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
		// name: 'dark',
		name: 'mist',
		properties: {
			// '--color-bg': '#1a0a00',
			// '--color-bg': 'var(--dark-subtle)',
			'--color-bg': 'var(--dark-brown)',
			'--color-bg-muted': 'rgb(39, 37, 33)',
			'--color-text': '#ffffff',
			'--color-text-invert': 'rgb(39, 37, 33)',
			'--color-text-mute': '#000000',
			'--primary-color': '#7575719e',
			'--secondary-color': '#6c757d53',
			// '--tritary-color': '#A8A390',
			'--tritary-color': 'var(--tan-light)',
			'--accent-color': '#e7c75e',
			'--color-border': '#495057',
			'--color-border-hover': '#fff',
			'--color-heading': '#dee2e6',
		}
	},
	{
		// name: 'sunset',
		name: 'dark',
		properties: {
			'--color-bg': '#1a0a00',
			'--color-bg-muted': '#1a0a00',
			'--color-text': '#ffe4c4',
			'--color-text-invert': 'var(--black)',
			'--primary-color': '#ff6b35',
			'--secondary-color': '#ff9e40',
			// '--tritary-color': '#381a16',
			'--tritary-color': 'var(--tan-light)',
			// '--tritary-color': '#544b47',
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
			'--color-text-invert': 'var(--color-bg)',
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
			'--color-text-invert': 'var(--black)',
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
