import staticStations from 'trainline-stations/src/static.js';

self.onmessage = async (event) => {
    try {
        if (event.data === 'fetchStations') {
            const allStations = staticStations;
            self.postMessage(allStations);
        }
    } catch (error) {
        console.error('Error fetching stations:', error);
        self.postMessage({ error: 'Failed to fetch stations' });
    }
};