<div style="width: 100vw; display: flex; flex-direction: column" class="overflow-x-hidden" id="app">
    <Nav ver="back"/>
    <div class="h-full w-full flex flex-col items-center pl-4 pr-4">
        <div class="flex flex-col items-center border-[1px] rounded-md border-neutral-700 sm:ml-8 ml-4 mr-4 sm:mr-8 h-screen sm:pt-6 sm:pb-6 pl-2 pr-2 pb-2 max-w-[1500px] w-full">
            {#if param != "unknown"}
                <h2 class="text-white text-xl font-semibold sm:mt-1 mt-3">Overview for <span>{formatDate(param)}</span></h2>
            {:else}
            <h2 class="text-white text-xl font-semibold sm:mt-1 mt-3">Overview for No Date</h2>
            {/if}
            {#if logsToday == null || logsToday == null}
                <div class="w-full flex items-center justify-center border-neutral-700 border-[1px] rounded-sm h-full mt-8">
                    <span class="loader w-6 h-6" style="margin-top:0.5rem; margin-bottom: 0.5rem"></span>
                </div>
            {:else}
            <div class="flex gap-4 h-full w-full mt-8">
                    <div class="w-full h-full">
                        {#if !mapVisible && !mapErr}
                            <div class="w-full flex items-center justify-center border-neutral-700 border-[1px] rounded-sm h-full">
                                <span class="loader w-6 h-6" style="margin-top:0.5rem; margin-bottom: 0.5rem"></span>
                            </div>
                        {:else if !mapErr}
                            <div id="map" class="w-full h-full rounded-md bg-black" class:invert={darkMode} class:hue-rotate-180={darkMode} class:brightness-[95%]={darkMode} class:contrast-[90%]={darkMode}></div>
                        {:else}
                            <div class="w-full flex items-center justify-center border-neutral-700 border-[1px] rounded-sm h-full">
                            </div>
                        {/if}
                    </div>
                    <div class="w-full h-full border-neutral-700 border-[1px] rounded-md p-4">
                        <h2 class="text-white text-lg font-semibold">Your Journeys</h2>
                    </div>
                </div>
            {/if}
        </div>
    </div>
    <div class="h-full w-full flex flex-col items-center pl-4 pr-4 mt-4">
        <div class="flex flex-col items-center border-[1px] rounded-md border-neutral-700 sm:ml-8 ml-4 mr-4 sm:mr-8 h-screen pl-4 pr-4 pb-4 pt-4 max-w-[1500px] w-full">
            <h2 class="text-white text-xl font-semibold sm:mt-1 mt-3 w-full text-left">Your Logs</h2>
        </div>
    </div>
    <Footer/>
</div>
<script>
    import { onMount} from 'svelte';
    import { page } from '$app/stores';
    import Nav from '../../../lib/components/Nav.svelte';
    import Footer from '../../../lib/components/Footer.svelte';
    import '../../siteDB.js';
    import { getJourneysData, getLogsData } from '../../siteDB.js';

    let map;


    
    let param = $page.params.date;
    let formatParam = param.replace(/(\d{4})-(\d{2})-(\d{2})/g, '$3/$2/$1');
    let logs = null;
    let logsToday = null;
    let logsSorted = null;
    let uniqueLocs = null;

    let mapVisible = false;
    let mapErr = true;

    onMount(async () => {
        param = param.replace(/-/g, '/');
        document.title = 'Overview for ' + formatParam;
        logs = await getLogsData();
        logsSorted = logs.reduce((acc, log) => {
            const logDate = new Date(log.log_date);
            const year = isNaN(logDate.getTime()) ? 'Unknown' : logDate.getFullYear();
            const month = isNaN(logDate.getTime()) ? 'Unknown' : logDate.toLocaleString('default', { month: 'long' });
            const date = isNaN(logDate.getTime()) ? 'Unknown' : logDate.toISOString().split('T')[0];
            if (!acc[year]) {
                acc[year] = {};
            }
            if (!acc[year][month]) {
                acc[year][month] = {};
            }
            if (!acc[year][month][date]) {
                acc[year][month][date] = [];
            }
            acc[year][month][date].push(log);
            return acc;
        }, {});

        logsToday = logsSorted
        getDaysLogs(logsSorted);

        journeys = await getJourneysLogs();
        journeyLocations = await getUniqueJourneyLocations();
        mapVisible = true;
        mapErr = false;

        // console.log(journeys, journeyLocations);

        if (typeof window !== 'undefined') {
            const L = await import('leaflet');
            await import('leaflet/dist/leaflet.css');

            const mapContainer = document.getElementById('map');
            if (mapContainer) {
                map = L.map('map').fitBounds([
                    [54.635, -10.854], 
                    [47.270, 16.979]  
                ]).setZoom(5);

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);


                let firstSrc = null;

                var blackIcon = L.icon({
                    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41]
                });

                for(let item of combined){
                    firstSrc = null;
                    for(let picture of item.pictures){
                        firstSrc = typeof picturePriority !== 'undefined' && picturePriority ? picture.src : firstSrc || picture.src;
                    }
                    const popupContent = firstSrc 
                        ? `<div class='flex gap-2 w-auto'><img src='${firstSrc}' class='invert hue-rotate-180 rounded-sm' style='max-width: 300px; max-height: 100px;'><div class='flex ml-2 flex-col gap-2'><h3 class='text-lg text-neutral-100 invert'>${item.location}</h3><div class="overflow-y-auto flex flex-col h-full"><h4 class="italic text-neutral-500 invert">${Array.isArray(item.logs) && item.logs.flatMap(log => log.numbers.map(num => num.number)).join(', ')}</h4></div></div></div>`
                        : `<div class='flex gap-2 w-auto'><h3 class='text-sm font-regular text-neutral-100 invert'>${item.location}</h3></div>`;
                    
                    const hasJourneys = item.journeys.length > 0 || combined.some(j => j.journeys.some(journey => journey.to === item.location));
                    const markerIcon = hasJourneys ? new L.Icon.Default() : blackIcon;
                    
                    L.marker([item.lat, item.long], { icon: markerIcon }).addTo(map)
                    .bindPopup(popupContent);
                    
                    // poly lines go here
                    // in future, get railway routes to make them more accurate
                }


                    
            } else {
                console.error('Map container not found');
            }

        }

    });

    function formatDate(date){
        const d = new Date(date);
        return d.toLocaleDateString('en-GB', {month: 'long', day: 'numeric'});
    }

    function getDaysLogs(logs){
        // console.log(logs);
        const [year, month, day] = param.split('/');
        // console.log(year, month, day);
        if (logs[year] && logs[year][new Date(year, month - 1).toLocaleString('default', { month: 'long' })] && logs[year][new Date(year, month - 1).toLocaleString('default', { month: 'long' })][`${year}-${month}-${day}`]) {
            logsToday = logs[year][new Date(year, month - 1).toLocaleString('default', { month: 'long' })][`${year}-${month}-${day}`];
            uniqueLocs = getUniqueLoc();
            // console.log(logsToday, "logsToday");
        }
    }

    let journeys = null;
    let journeyLocations = null;

    
    async function getJourneysLogs() {
        journeys = await getJourneysData();
        // console.log(journeys, "journeys")
        journeys = journeys.filter(journey => {
            const journeyDate = new Date(journey.start_date);
            const [year, month, day] = param.split('/');
            return journeyDate.getFullYear() === parseInt(year) &&
               journeyDate.getMonth() + 1 === parseInt(month) &&
               journeyDate.getDate() === parseInt(day);
        });

        // console.log(journeys, "output")
        journeyLocations = await getUniqueJourneyLocations();
        combined = await combineLists();
        // console.log("combined", combined);  
        return journeys;
    }

    async function getUniqueJourneyLocations() {
        let uniqueLocations = [];
        let locationSet = new Set();
        for (let journey of journeys) {
            const fromKey = `${journey.from}-${journey.fromCountry}-${journey.fromLong}-${journey.fromLat}`;
            const toKey = `${journey.to}-${journey.toCountry}-${journey.toLong}-${journey.toLat}`;
            
            if (!locationSet.has(fromKey)) {
                locationSet.add(fromKey);
                uniqueLocations.push({
                    location: journey.from,
                    country: journey.fromCountry,
                    lat: journey.fromLat,
                    long: journey.fromLong
                });
            }
            
            if (!locationSet.has(toKey)) {
                locationSet.add(toKey);
                uniqueLocations.push({
                    location: journey.to,
                    country: journey.toCountry,
                    lat: journey.toLat,
                    long: journey.toLong
                });
            }
        }
        // console.log("unique", uniqueLocations);
        return uniqueLocations;
    }

    let combined = [];

    function combineLists(){
        let temp = null;
        try {
            temp = journeyLocations.map(journeyLoc => {
                const matchingLogs = logsToday.filter(log => 
                    log.log_location === journeyLoc.location
                ).map(log => {
                    const { pictures, ...rest } = log;
                    return rest;
                });

                const pictures = logsToday
                    .filter(log => log.log_location === journeyLoc.location)
                    .flatMap(log => log.pictures || []);

                return {
                    ...journeyLoc,
                    logs: matchingLogs,
                    journeys: journeys.filter(journey => 
                        journey.from === journeyLoc.location
                    ),
                    pictures: pictures
                };
            });
        } catch (error) {
            console.error('Error combining lists:', error);
            mapErr = true;
        }
        return temp;
    }

    function getUniqueLoc(){
        let locs = [];
        for (let log of logsToday) {
            if (locs.includes(log.log_location) && locs.includes(log.log_lat) && locs.includes(log.log_long)) {
                locs.push({location: log.log_location, lat: log.log_lat, lon: log.log_long, log_loc_id: log.log_loc_id});
            }
        }
        return locs;
    }

    let darkMode = false;
    onMount(() => {
        const settings = JSON.parse(localStorage.getItem('settings'));
        if (settings.darkMode) {
            darkMode = true;
            document.documentElement.classList.add('dark');
        } else {
            darkMode = false;
            document.documentElement.classList.remove('dark');
        }
    });
</script>

<style>
     .loader{margin-top:12px;width:24px;height:24px;border:3px solid rgb(50,50,50);border-bottom-color:transparent;border-radius:50%;display:inline-block;box-sizing:border-box;animation:rotation 1s linear infinite}@keyframes rotation{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}

</style>


