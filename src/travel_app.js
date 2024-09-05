

import './global.css';

localStorage.theme ='dark'

// On page load or when changing themes, best to add inline in `head` to avoid FOUC
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
	document.documentElement.classList.add('dark')
  } else {
	document.documentElement.classList.remove('dark')
  }

export const travel_app = {
	name: 'travel_app',
	properties: {

	}
}

if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/service-worker.js').then(registration => {
			console.log('ServiceWorker registration successful with scope: ', registration.scope);
		}, err => {
			console.log('ServiceWorker registration failed: ', err);
		});
	});
}