

import './global.css';

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