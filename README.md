## Travel App

An intended evolution of a simple tool created to allow the creation of physical travel planning tables which can be printed off. 

Originally this project was going to be no more than the evolution stated above, since then its been a aspiration to add to this concept as a challenge and to also incorporate a way to log journeys, aswell as logging train transportation vehicles seen / spotted. This is to be stored locally on the device and will be exportable to CSV for backup or transfer elsewhere. 

This project is supposed to be an all-in-one tool for planning, capturing and visualising journeys or vehicles spotted, *with the intention to transfer elsewhere* in the future such as to a dedicated database / other apps or systems. It can also be used standalone, depending on if the user trusts the browser to store all of the data and also if they have enough storage / within the limits of IndexedDB. 

IndexedDB was used as it did not require the extra setup as compared to other ways to store the app data while giving the abillity to store a good amount of data (depending on the space available on the user's device). Neither does this app need to have 'user accounts' both due to using IndexedDB aswell as not having a social aspect as that is outside of the purpose of the app.

Svelte was used to gain new experience aswell and to deviate from using Vue for projects, while Tailwind has been used as is preference for projects. Icons have been used from [Bootstrap](https://icons.getbootstrap.com/) and [Heroicons](https://heroicons.com/).

### Technologies
- [Svelte](https://svelte.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Dexie.js](https://dexie.org/)
- [Compressor.js](https://github.com/fengyuanchen/compressorjs)
- [Leaflet](https://leafletjs.com/index.html)
- [leaflet-providers](https://github.com/leaflet-extras/leaflet-providers)

### Data / API's
- [Flags API](https://flagsapi.com/)
- [European Station Data](https://github.com/juliuste/trainline-stations)



