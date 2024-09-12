import Dexie from 'dexie';

import LZString from 'lz-string';

export const db = new Dexie('siteDB');
db.version(1).stores({
  planning: '++id, data', // Store for planning JSON data
  locations: '++id, data', // Store for locations JSON data
  journeys: '++id, data', // Store for journeys JSON data
  logs: '++id, data' // Store for logs JSON data
});



export async function writePlanningData(newData) {
    try {
        const compressedData = LZString.compress(JSON.stringify(newData));
        await db.planning.put({ id: 1, data: compressedData });
        console.log("New data written to planning store");
    } catch (error) {
        console.error("Failed to write data to planning store:", error);
    }
}

export async function writeLocationsData(newData) {
    try {
        const compressedData = LZString.compress(JSON.stringify(newData));
        await db.locations.put({ id: 1, data: compressedData });
        console.log("New data written to locations store");
    } catch (error) {
        console.error("Failed to write data to locations store:", error);
    }
}

export async function writeJourneysData(newData) {
    try {
        const compressedData = LZString.compress(JSON.stringify(newData));
        await db.journeys.put({ id: 1, data: compressedData });
        console.log("New data written to journeys store");
    } catch (error) {
        console.error("Failed to write data to journeys store:", error);
    }
}

// Function to write new data to the 'logs' store
export async function writeLogsData(newData) {
    try {
        const compressedData = LZString.compress(JSON.stringify(newData));
        await db.logs.put({ id: 1, data: compressedData });
        console.log("New data written to logs store");
    } catch (error) {
        console.error("Failed to write data to logs store:", error);
    }
}


export async function getPlanningData() {
    try {
        const record = await db.planning.get(1);
        if (record) {
            const data = record.data;
            const decompressedData = LZString.decompress(data);
            return JSON.parse(decompressedData);
        } else {
            console.log("No data found in planning store");
            return null;
        }
    } catch (error) {
        console.error("Failed to get data from planning store:", error);
        return null;
    }
}


export async function getLocationsData() {
    try {
        const record = await db.locations.get(1);
        if (record) {
            const data = record.data;
            const decompressedData = LZString.decompress(data);
            return JSON.parse(decompressedData);
        } else {
            console.log("No data found in locations store");
            return null;
        }
    } catch (error) {
        console.error("Failed to get data from locations store:", error);
        return null;
    }
}

export async function getJourneysData() {
    try {
        const record = await db.journeys.get(1);
        if (record) {
            const data = record.data;
            const decompressedData = LZString.decompress(data);
            return JSON.parse(decompressedData);
        } else {
            console.log("No data found in journeys store");
            return null;
        }
    } catch (error) {
        console.error("Failed to get data from journeys store:", error);
        return null;
    }
}

export async function getLogsData() {
    try {
        const record = await db.logs.get(1);
        if (record) {
            const data = record.data;
            const decompressedData = LZString.decompress(data);
            return JSON.parse(decompressedData);
        } else {
            console.log("No data found in logs store");
            return null;
        }
    } catch (error) {
        console.error("Failed to get data from logs store:", error);
        return null;
    }
}

async function compressAllData() {
    try {
        const planningData = await getPlanningData();
        const locationsData = await getLocationsData();
        const journeysData = await getJourneysData();
        const logsData = await getLogsData();

        if (planningData) {
            const compressedPlanningData = LZString.compress(JSON.stringify(planningData));
            await db.planning.put({ id: 1, data: compressedPlanningData });
            console.log("Planning data compressed and updated");
        }

        if (locationsData) {
            const compressedLocationsData = LZString.compress(JSON.stringify(locationsData));
            await db.locations.put({ id: 1, data: compressedLocationsData });
            console.log("Locations data compressed and updated");
        }

        if (journeysData) {
            const compressedJourneysData = LZString.compress(JSON.stringify(journeysData));
            await db.journeys.put({ id: 1, data: compressedJourneysData });
            console.log("Journeys data compressed and updated");
        }

        if (logsData) {
            const compressedLogsData = LZString.compress(JSON.stringify(logsData));
            await db.logs.put({ id: 1, data: compressedLogsData });
            console.log("Logs data compressed and updated");
        }
    } catch (error) {
        console.error("Failed to compress and update data:", error);
    }
}
