
import Dexie from 'dexie';

const db = new Dexie('stationsDB');
db.version(1).stores({
    stations: 'id'
});

export async function tl_getAllData() {
    return await db.stations.toArray();
}

export async function tl_putData(data) {
    await db.stations.put({ id: 1, data });
}

export async function tl_wipeAllData(){
    await db.stations.clear();
}