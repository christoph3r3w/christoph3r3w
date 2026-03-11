import { page } from '$app/state';
import { writable } from 'svelte/store';

// menu toggle
export const menuOpen = writable(false);
export const contactsOpen = writable(false);
export const aboutOpen = writable(false);
export const aboutMoreOpen = writable(false);
// dark mode toggle
export const modeDark = writable(false);
// export const userAnswers = writable([]);
export const fileType = writable('files');
