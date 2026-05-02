		import {modeDark } from '$lib/store';
		import { themeList } from './theme-list';
		import {tick } from 'svelte';

		let dark = $state(false);
		let currentThemeIndex = $state(0);

	
	export function handleDarkMode(xTheme?:string ) {
		
		dark = !dark;
		dark = xTheme === 'dark' ? true : xTheme === 'reset' ? false : dark;
		modeDark.set(dark);
		const selectedThemeName = dark ? 'dark' : 'reset';
		const selectedTheme = themeList.find((theme) => theme.name === selectedThemeName);

		if (!selectedTheme) {
			return;
		}

		for (const [property, value] of Object.entries(selectedTheme.properties)) {
			document.documentElement.style.setProperty(property, value as string | null);
		}

		localStorage.setItem('selectedTheme', selectedThemeName);
	}

	export function handleThemeToggle() {
		if (themeList.length === 0) {
			return;
		}

		const nextIndex = (currentThemeIndex + 1) % themeList.length;
		const nextTheme : any =  themeList[nextIndex];
		currentThemeIndex = nextIndex;

		for (const [property, value] of Object.entries(nextTheme.properties)) {
			document.documentElement.style.setProperty(property, value as string | null);
		}

		dark = nextTheme.name === 'dark';
		modeDark.set(dark);
		localStorage.setItem('selectedTheme', nextTheme.name);
	}

	export function setup() {
		tick()
		const savedTheme = localStorage.getItem('selectedTheme');
		if (savedTheme) {
			const theme: any = themeList.find((t) => t.name === savedTheme);
				if(theme.name == 'reset'){
				const darkModeMql = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
				// if (darkModeMql && darkModeMql.matches) {
				// 	handleDarkMode('dark');
				// } else {
				// 	handleDarkMode('reset');
				// }
			}else {
				for (const [property, value]of Object.entries(theme.properties)) {
					document.documentElement.style.setProperty(property, value as string | null);
				}
				dark = theme.name === 'dark';
				modeDark.set(dark);
				currentThemeIndex = themeList.indexOf(theme);
			}
		}
	};
