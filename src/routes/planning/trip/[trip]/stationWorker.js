import staticStations from 'trainline-stations/src/static.js';

self.onmessage = async (event) => {
    if (event.data === 'fetchStations') {
        const allStations = staticStations;
        self.postMessage(allStations);
    }
};