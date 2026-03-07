type Theme = {
	name: string;
	properties: Record<string, string>;
};

export const themeList: Theme[] = [
{
		name: 'reset',
		properties: {
			'--color-bg': 'var(--tan-gray-bg)',
			'--color-bg-muted': 'var(--gray-bg)',
			'--color-text': 'var(--black)',
			'--primary-color': 'inherit',
			'--secondary-color': 'inherit',
			'--accent-color': 'inherit',
			'--color-border': 'inherit',
			// '--color-border-hover': '#fff',
			'--color-heading': 'inherit',
			
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
			'--color-bg': '#1a0a00',
			'--color-bg-muted': 'rgb(39, 37, 33)',
			'--color-text': '#ffffff',
			'--primary-color': '#ffe91e',
			'--secondary-color': '#6c757d',
			'--accent-color': '#17a2b8',
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
	
];
