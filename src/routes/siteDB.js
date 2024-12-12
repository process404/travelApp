import Dexie from 'dexie';

import LZString from 'lz-string';

export const db = new Dexie('siteDB');
db.version(1).stores({
  planning: '++id, data',
  locations: '++id, data', 
  journeys: '++id, data', 
  logs: '++id, data' ,
  details: '++id, ind, groups',
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
        // console.log("Doing")
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
            if (decompressedData) {
                try {
                    const parsedData = JSON.parse(decompressedData);
                    // console.log("Parsed journeys data:", parsedData);
                    return Array.isArray(parsedData) ? parsedData : [];
                } catch (jsonError) {
                    console.error("Failed to parse JSON data:", jsonError);
                    return [];
                }
            } else {
                console.log("Decompressed data is empty");
                return [];
            }
        } else {
            console.log("No data found in journeys store");
            return [];
        }
    } catch (error) {
        console.error("Failed to get data from journeys store:", error);
        return [];
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

export async function getIndividualDetails() {
    try {
        const record = await db.details.get(1);
        if (record && record.ind) {
            const decompressedData = LZString.decompress(record.individual);
            return JSON.parse(decompressedData);
        } else {
            console.log("No individual data found in details store");
            return null;
        }
    } catch (error) {
        console.error("Failed to get individual data from details store:", error);
        return null;
    }
}

export async function getGroupsData() {
    try {
        const record = await db.details.get(1);
        if (record && record.groups) {
            const decompressedData = LZString.decompress(record.groups);
            return JSON.parse(decompressedData);
        } else {
            console.log("No groups data found in details store");
            return null;
        }
    } catch (error) {
        console.error("Failed to get groups data from details store:", error);
        return null;
    }
}


export async function writeIndData(data) {
    try {
        const compressedData = LZString.compress(JSON.stringify(data));
        const existingRecord = await db.details.get(1);
        const updatedRecord = {
            id: 1,
            ind: compressedData,
            groups: existingRecord ? existingRecord.groups : null
        };
        await db.details.put(updatedRecord);
        console.log("New data written to individual store");
    } catch (error) {
        console.error("Failed to write data to individual store:", error);
    }
}

export async function writeGroupsData(data) {
    try {
        const compressedData = LZString.compress(JSON.stringify(data));
        const existingRecord = await db.details.get(1);
        const updatedRecord = {
            id: 1,
            ind: existingRecord ? existingRecord.ind : null,
            groups: compressedData
        };
        await db.details.put(updatedRecord);
        console.log("New data written to groups store");
    } catch (error) {
        console.error("Failed to write data to groups store:", error);
    }
}

export async function clearJourneysData() {
    try {
        await db.journeys.clear();
        console.log("Journeys store cleared");
    } catch (error) {
        console.error("Failed to clear journeys store:", error);
    }
}

export async function clearLogsData() {
    try {
        await db.logs.clear();
        console.log("Logs store cleared");
    } catch (error) {
        console.error("Failed to clear logs store:", error);
    }
}

export async function clearPlanningData() {
    try {
        await db.planning.clear();
        console.log("Planning store cleared");
    } catch (error) {
        console.error("Failed to clear planning store:", error);
    }
}

export async function clearLocationsData() {
    try {
        await db.locations.clear();
        console.log("Locations store cleared");
    } catch (error) {
        console.error("Failed to clear locations store:", error);
    }
}

