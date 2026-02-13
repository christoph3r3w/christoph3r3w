import { page } from '$app/state';
import { writable } from 'svelte/store';

// menu toggle
export const menuOpen = writable(false);
export const contactsOpen = writable(false);
// dark mode toggle
export const modeDark = writable(false);
// export const userAnswers = writable([]);