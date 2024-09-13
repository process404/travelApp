export function openDB(name, version, upgradeCallback) {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(name, version);
        request.onupgradeneeded = (event) => {
            upgradeCallback(event.target.result, event.oldVersion, event.newVersion, event.target.transaction);
        };
        request.onsuccess = (event) => {
            resolve(event.target.result);
        };
        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
}

export function getObjectStore(db, storeName, mode) {
    return db.transaction(storeName, mode).objectStore(storeName);
}

export function getAllData(db, storeName) {
    return new Promise((resolve, reject) => {
        const store = getObjectStore(db, storeName, 'readonly');
        const request = store.getAll();
        request.onsuccess = (event) => {
            resolve(event.target.result);
        };
        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
}

export function putData(db, storeName, data) {
    return new Promise((resolve, reject) => {
        const store = getObjectStore(db, storeName, 'readwrite');
        const request = store.put(data);
        request.onsuccess = () => {
            resolve();
        };
        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
}