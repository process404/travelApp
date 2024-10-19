import { join } from 'path'

import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			transitionProperty: {
				'dropdown': 'height, opacity, margin',
			  }
		},
	},
	plugins: [

	],
};
