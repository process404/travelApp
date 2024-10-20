<div style="width: 100vw; display: flex; flex-direction: column" class="overflow-x-hidden" id="app">
    <Nav ver="back"/>
    <div class="h-auto w-full flex flex-col items-center pl-4 pr-4">
        <div class="flex flex-col items-center border-[1px] rounded-md border-neutral-700 sm:ml-8 ml-4 mr-4 sm:mr-8 min-h-screen h-auto sm:pt-6 sm:pb-6 pl-2 pr-2 pb-2 max-w-[1500px] w-full">
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
            <div class="flex gap-4 h-full w-full mt-8 sm:flex-row flex-col">
                    <div class="w-full h-full">
                        {#if !mapVisible && !mapErr}
                            <div class="w-full flex items-center justify-center border-neutral-700 border-[1px] rounded-sm h-full">
                                <span class="loader w-6 h-6" style="margin-top:0.5rem; margin-bottom: 0.5rem"></span>
                            </div>
                        {:else if !mapErr}
                            <div id="map" class="w-full h-full rounded-md bg-black min-h-[400px]"></div>
                        {:else}
                            <div class="w-full flex items-center justify-center border-neutral-700 border-[1px] rounded-sm h-full">
                            </div>
                        {/if}
                    </div>
                    <div class="w-full h-full border-neutral-700 border-[1px] rounded-md p-4 md:overflow-y-scroll overflow-y-visible customScrollbar">
                        <h2 class="text-white text-lg font-semibold">Your Journeys</h2>
                        <div class="flex flex-col mt-4 gap-2">
                            {#each sortedJourneys as journey}
                                <button class="border-neutral-700 rounded-md border-[1px] p-2" on:click={() => {journey.dropdown = !journey.dropdown}}>
                                    <div class="length-diagram ">
                                        {#if journey.journeySecondClass && !journey.journeySleeper}
                                            <div class="flex justify-between items-center w-full mb-1">
                                                {#if !isMobileDevice}
                                                <h3 class="text-white font-semibold flex items-center gap-2">{journey.from}<img class="w-4 h-4" src={getCountryEmoji(journey.fromCountry)} alt={journey.fromCountry}></h3>
                                                    <span class="text-xs text-white italic pl-1 pr-1 bg-neutral-600 rounded-sm">2nd</span>
                                                <h2 class="text-white font-semibold flex items-center gap-2">{journey.to}<img class="w-4 h-4" src={getCountryEmoji(journey.toCountry)} alt={journey.toCountry}></h2>
                                                {:else}
                                                    <h3 class="text-white font-semibold flex items-center gap-2">{journey.from} <span>{getCountryEmoji(journey.fromCountry)}</span></h3>
                                                        <span class="text-xs text-white italic bg-neutral-600 pl-1 pr-1 rounded-sm">2nd</span>
                                                    <h3 class="text-white font-semibold flex items-center gap-2">{journey.to} <span>{getCountryEmoji(journey.toCountry)}</span></h3>
                                                {/if}
                                            </div>
                                            <hr class="w-full  h-[2px] bg-neutral-500 border-none">
                                        {:else if journey.journeyFirstClass}
                                            <div class="flex justify-between items-center w-full mb-1">
                                                {#if !isMobileDevice}
                                                    <h3 class="text-white font-semibold flex items-center gap-2">{journey.from}<img class="w-4 h-4" src={getCountryEmoji(journey.fromCountry)} alt={journey.fromCountry}></h3>
                                                    <span class="text-xs text-white italic pl-1 pr-1 bg-yellow-500 rounded-sm">1st</span>
                                                    <h2 class="text-white font-semibold flex items-center gap-2">{journey.to}<img class="w-4 h-4" src={getCountryEmoji(journey.toCountry)} alt={journey.toCountry}></h2>
                                                {:else}
                                                    <h3 class="text-white font-semibold flex items-center gap-2">{journey.from} <span>{getCountryEmoji(journey.fromCountry)}</span></h3>
                                                    <span class="text-xs text-white italic pl-1 pr-1 bg-yellow-500 rounded-sm">1st</span>
                                                    <h3 class="text-white font-semibold flex items-center gap-2">{journey.to} <span>{getCountryEmoji(journey.toCountry)}</span></h3>
                                                {/if}
                                                <hr class="w-full h-[2px] bg-yellow-500 border-none">
                                            </div>
                                        {:else if journey.journeyOvernight && !journey.journeySleeper}
                                            <div class="flex justify-between items-center w-full mb-1">
                                                {#if !isMobileDevice}
                                                    <h3 class="text-white font-semibold flex items-center gap-2">{journey.from}<img class="w-4 h-4" src={getCountryEmoji(journey.fromCountry)} alt={journey.fromCountry}></h3>
                                                        <span class="text-xs text-white italic bg-green-800 pl-1 pr-1 rounded-md">Overnight ({journey.journeyFirstClass ? '1st' : '2nd'})</span>
                                                    <h3 class="text-white font-semibold flex items-center gap-2">{journey.to}<img class="w-4 h-4" src={getCountryEmoji(journey.toCountry)} alt={journey.toCountry}></h3>
                                                {:else}
                                                    <h3 class="text-white font-semibold flex items-center gap-2">{journey.from} <span>{getCountryEmoji(journey.fromCountry)}</span></h3>
                                                        <span class="text-xs text-white italic bg-green-800 pl-1 pr-1 rounded-md">Overnight ({journey.journeyFirstClass ? '1st' : '2nd'})</span>
                                                    <h3 class="text-white font-semibold flex items-center gap-2">{journey.to} <span>{getCountryEmoji(journey.toCountry)}</span></h3>
                                                {/if}
                                            </div>
                                        
                                            <hr class="w-full  h-[2px] bg-green-800 border-none">
                                        {:else if journey.journeySleeper}
                                            <div class="flex justify-between items-center w-full mb-1">
                                                {#if !isMobileDevice}
                                                    <h3 class="text-white font-semibold flex items-center gap-2">{journey.from}<img class="w-4 h-4" src={getCountryEmoji(journey.fromCountry)} alt={journey.fromCountry}></h3>
                                                    <span class="text-xs text-white italic bg-teal-800 pl-1 pr-1 rounded-sm">Sleeper</span>
                                                    <h3 class="text-white font-semibold flex items-center gap-2">{journey.to}<img class="w-4 h-4" src={getCountryEmoji(journey.toCountry)} alt={journey.toCountry}></h3>
                                                {:else}
                                                    <h3 class="text-white font-semibold flex items-center gap-2">{journey.from} <span>{getCountryEmoji(journey.fromCountry)}</span></h3>
                                                    <span class="text-xs text-white italic bg-teal-800 pl-1 pr-1 rounded-sm">Sleeper</span>
                                                    <h3 class="text-white font-semibold flex items-center gap-2">{journey.to} <span>{getCountryEmoji(journey.toCountry)}</span></h3>
                                                {/if}
                                            </div>
                                            <hr class="w-full  h-[2px] bg-teal-800 border-none">
                                        {/if}
                                        <div class="flex justify-between items-center">
                                            <p class="text-white text-sm">{journey.start_time}</p>
                                            {#if !journey.delayHours && !journey.delayMinutes}
                                                <p class="text-white text-sm">{calcDuration(journey.start_time, journey.start_date, journey.end_date, journey.end_time, 0,0)}</p>
                                            {:else}
                                                <p class="text-white text-sm">{calcDuration(journey.start_time, journey.start_date, journey.end_date, journey.end_time, journey.delayHours, journey.delayMinutes)}</p>
                                            {/if}
                                            {#if !journey.delayHours && !journey.delayMinutes}
                                                <p class="text-white text-sm">{journey.end_time}</p>
                                            {:else}
                                            <span class="flex gap-1 items-center" class:mt-1={journey.delayHours || journey.delayMinutes}>
                                                <!-- <p class="text-green-500 text-sm">{getDiffMinutes(journey.delayHours, journey.delayMinutes)}</p> -->
                                                <span class="flex flex-col"> 
                                                    {#if getDiffMinutes(journey.delayHours, journey.delayMinutes) < 0}
                                                        <p class="text-neutral-600 line-through text-sm">{journey.end_time}
                                                            {#if new Date(journey.end_date).getTime() > new Date(journey.start_date).getTime()}
                                                                <span class="italic text-[9px]">+{workOutDays(journey.start_date, journey.end_date)}d</span>
                                                            {/if}
                                                        </p>
                                                        <p class="text-green-500 text-sm text-[10px] w-full text-center">{getDiffMinutes(journey.delayHours, journey.delayMinutes)}</p>
                                                    {:else if getDiffMinutes(journey.delayHours, journey.delayMinutes) != 0}
                                                        <p class="text-neutral-600 line-through text-sm">{journey.end_time}
                                                            {#if new Date(journey.end_date).getTime() > new Date(journey.start_date).getTime()}
                                                                <span class="italic text-[9px]">+{workOutDays(journey.start_date, journey.end_date)}d</span>
                                                            {/if}
                                                        </p>
                                                        <p class="text-red-500 text-sm text-[10px] w-full text-center">+{getDiffMinutes(journey.delayHours, journey.delayMinutes)}</p>
                                                    {/if}
                                                    <p class="text-white text-sm">{getNewArrivalTime(journey.end_time, journey.delayHours, journey.delayMinutes)}
                                                        {#if new Date(journey.end_date).getTime() > new Date(journey.start_date).getTime()}
                                                            <span class="italic text-[9px]">+{workOutDays(journey.start_date, journey.end_date)}d</span>
                                                        {/if}
                                                    </p>
                                                </span>
                                            </span>
                                            {/if}
                                        </div>
                                        <div class="border-neutral-700 border-[1px] rounded-md duration-300 delay-100 motion-reduce:duraton-0 pointer-events-none" class:p-2={journey.dropdown} class:h-0={!journey.dropdown} class:opacity-0={!journey.dropdown} class:mt-0={!journey.dropdown} class:h-full={journey.dropdown} class:mt-2={journey.dropdown} class:opacity-100={journey.dropdown}>
                                            <h3 class="text-left text-white text-sm">More Information</h3>
                                            <hr class="mt-1 mb-2 border-neutral-700">
                                            <div class="flex gap-2 justify-between">
                                                <div class="w-full">
                                                    <p class="text-left text-sm text-white"><span class="text-neutral-500 italic text-xs mr-2">Departure Date:</span>{new Date(journey.start_date).toLocaleDateString('en-GB')}</p>
                                                    {#if journey.operator}
                                                        <p class="text-left text-sm text-white"><span class="text-neutral-500 italic text-xs mr-2">OC:</span> {journey.operator}</p>
                                                    {/if}
                                                </div>
                                                {#if journey.journeyTags.length > 0}
                                                    <div class="lg:flex hidden gap-2 items-baseline w-auto">
                                                        <p class="text-left text-sm text-white"><span class="text-neutral-500 italic text-xs mr-2">Tags:</span></p>
                                                        <div class="flex gap-2  w-full mt-1">
                                                            {#each journey.journeyTags as tag}
                                                                <p class="text-left text-sm text-white bg-green-900 p-1 rounded-sm">{tag}</p>
                                                            {/each}
                                                        </div>
                                                    </div>
                                                {/if}
                                            </div>
                                            {#if checkForPictureAllTime(true,journey.numbers) != false}
                                            <div class="border-[1px] p-1 border-neutral-700 rounded-md mt-2">
                                                <p class="text-left text-sm text-white"><span class="text-neutral-500 italic text-xs mr-2">Vehicles:</span></p>
                                                <div class="flex flex-col gap-2">
                                                    {#each journey.numbers as number}
                                                        {#if checkForPictureAllTime(false, number.number) != false}
                                                            <div class="flex gap-4 mt-1 rounded-md ">
                                                                <div class="max-h-[150px] w-3/5 rounded-sm">
                                                                    <img class="object-cover w-full h-full" src={checkForPictureToday(false, number.number).src} alt={checkForPictureToday(false, number.number).alt}>
                                                                </div>
                                                                <div class="flex items-center justify-center w-2/5 flex-col gap-1 pr-2">
                                                                    <p class="text-center text-lg text-white">{number.number}</p>
                                                                    {#if number.variant && number.type}
                                                                        <p class="text-center text-xs text-neutral-300 italic">{number.variant} / {number.type} </p>
                                                                    {:else if number.variant}
                                                                        <p class="text-center text-xs text-neutral-300 italic">{number.variant}</p>
                                                                    {/if}
                                                                </div>
                                                            </div>
                                                        {:else}
                                                        <div class="flex gap-4 mt-1">
                                                                <div class="max-h-[150px] min-h-[45px] w-3/5 rounded-sm bg-neutral-600 flex items-center justify-center">
                                                                    <p class="text-neutral-800 font-semibold text-2xl">?</p>
                                                                </div>
                                                                <div class="flex items-center justify-center w-2/5">
                                                                    <p class="text-left text-lg text-white">{number.number}</p>
                                                                </div>
                                                            </div>
                                                        {/if}
                                                    {/each}
                                                </div>
                                            </div>
                                            {:else}
                                            <p class="text-left text-sm text-white"><span class="text-neutral-500 italic text-xs mr-2">Numbers:</span>{journey.numbers.map(num => num.number).join(', ')}</p>
                                            {/if}
                                            {#if journey.journeyTags.length > 0}
                                                <div class="block lg:hidden w-auto mt-2">
                                                    <p class="text-left text-sm text-white"><span class="text-neutral-500 italic text-xs mr-2">Tags:</span></p>
                                                    <div class="flex gap-2  w-full mt-1">
                                                        {#each journey.journeyTags as tag}
                                                            <p class="text-left text-sm text-white bg-green-900 p-1 rounded-sm">{tag}</p>
                                                        {/each}
                                                    </div>
                                                </div>
                                            {/if}
                                            <div class="flex gap-2 border-[1px] border-neutral-700 mt-8 p-2">
                                                <button class="button w-3/4 blue2" class:pointer-events-auto={journey.dropdown} on:click={() => {window.location.href = '/logs/edit-journey/' + journey.id}}>Edit Journey</button>
                                                <button class="button w-2/5 hover:before:bg-red-700 hover:before:bg-opacity-50 pointer-events-auto" class:pointer-events-auto={journey.dropdown} on:click={() => {deleteJourney(journey.id)}}>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            {/each}
                        </div>
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
    import { countryFlags } from "../../../db/countries.js";
    import "../../../global.css"
    import '../../siteDB.js';
    import { writeJourneysData } from '../../siteDB.js';

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
        await getFlags()
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
                let tileLayerDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}', {
                    minZoom: 0,
                    maxZoom: 20,
                    attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                    ext: 'png'
                });

                let tileLayerLight = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.{ext}', {
                    minZoom: 0,
                    maxZoom: 20,
                    attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                    ext: 'png'
                });

                if (darkMode) {
                    tileLayerDark.addTo(map);
                } else {
                    tileLayerLight.addTo(map);
                }


                let firstSrc = null;

                var blackIcon = L.icon({
                    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41]
                });

                // console.log(combined)
                for(let item of combined){
                    firstSrc = null;
                    const uniqueEndpoints = new Set();
                    combined.forEach(item => {
                        item.journeys.forEach(journey => {
                            uniqueEndpoints.add(journey.to);
                        });
                    });

                    // Add markers for each item in the combined list
                    combined.forEach(item => {
                        let firstSrc = null;
                        for (let picture of item.pictures) {
                            firstSrc = typeof picturePriority !== 'undefined' && picturePriority ? picture.src : firstSrc || picture.src;
                        }
                        const popupContent = firstSrc 
                            ? `<div class='flex gap-2 w-auto'><img src='${firstSrc}' class='rounded-sm' style='max-width: 300px; max-height: 100px;'><div class='flex ml-2 flex-col gap-2'><h3 class='text-lg text-neutral-100'>${item.location}</h3><div class="overflow-y-auto flex flex-col h-full"><h4 class="italic text-neutral-500">${Array.isArray(item.logs) && item.logs.flatMap(log => log.numbers.map(num => num.number)).join(', ')}</h4></div></div></div>`
                            : `<div class='flex gap-2 w-auto'><h3 class='text-sm font-regular text-neutral-100'>${item.location}</h3></div>`;

                        const hasJourneys = item.journeys.length > 0 || combined.some(j => j.journeys.some(journey => journey.to === item.location));
                        const markerIcon = hasJourneys ? new L.Icon.Default() : blackIcon;

                        const marker = L.marker([parseFloat(item.lat), parseFloat(item.long)], { icon: markerIcon }).addTo(map)
                            .bindPopup(popupContent);

                        marker.on('popupopen', () => {
                            setTimeout(() => {
                                marker.getPopup().update();
                            }, 100);
                        });
                    });

                    combined.forEach(item => {
                        if (item.logs.length > 0 && item.journeys.length === 0) {
                            let firstSrc = null;
                            for (let picture of item.pictures) {
                                firstSrc = typeof picturePriority !== 'undefined' && picturePriority ? picture.src : firstSrc || picture.src;
                            }
                            const popupContent = firstSrc 
                                ? `<div class='flex gap-2 w-auto'><img src='${firstSrc}' class='rounded-sm' style='max-width: 300px; max-height: 100px;'><div class='flex ml-2 flex-col gap-2'><h3 class='text-lg text-neutral-100'>${item.location}</h3><hr class="border-neutral-700 mb-2 mt-1"><div class="overflow-y-auto flex flex-col h-full"><h4 class="italic text-neutral-500 text-md">${Array.isArray(item.logs) && item.logs.flatMap(log => log.numbers.map(num => num.number)).join(', ')}</h4></div></div></div>`

                                : `<div class='flex gap-2 w-auto'><h3 class='text-sm font-regular text-neutral-100'>${item.location}</h3><hr class="border-neutral-700 mb-2 mt-1"></div>`;
                              

                            const logMarker = L.marker([parseFloat(item.lat), parseFloat(item.long)], { icon: blackIcon }).addTo(map)
                                .bindPopup(popupContent);
                            map.addLayer(logMarker);
                        }
                    });

                    // Add endpoint markers separately
                    uniqueEndpoints.forEach(endpoint => {
                        const endpointItem = combined.find(item => item.location === endpoint);
                        if (endpointItem) {
                            const marker = L.marker([parseFloat(endpointItem.lat), parseFloat(endpointItem.long)], { icon: new L.Icon.Default() }).addTo(map)
                                .bindPopup(`<div class='flex gap-2 w-auto'><h3 class='text-sm font-regular text-neutral-100'>${endpointItem.location}</h3></div>`);
                            map.addLayer(marker);
                        }
                    });
                    

                    // if (darkMode) {
                    //     const markerElement = marker.getElement();
                    //     if (markerElement) {
                    //         markerElement.style.filter = 'invert(1) hue-rotate(180deg)';
                    //     }
                    // }
                    
                    // poly lines go here
                    // in future, get railway routes to make them more accurate

                    for (let journey of item.journeys) {
                        const from = journey.from;
                        const to = journey.to;
                        const fromLat = journey.fromLat;
                        const fromLong = journey.fromLong;
                        const toLat = journey.toLat;
                        const toLong = journey.toLong;
                        const fromCountry = journey.fromCountry;
                        const toCountry = journey.toCountry;
                        const fromKey = `${from}-${fromCountry}-${fromLong}-${fromLat}`;
                        const toKey = `${to}-${toCountry}-${toLong}-${toLat}`;
                        const fromLocation = journeyLocations.find(j => `${j.location}-${j.country}-${j.long}-${j.lat}` === fromKey);
                        const toLocation = journeyLocations.find(j => `${j.location}-${j.country}-${j.long}-${j.lat}` === toKey);
                        if (fromLocation && toLocation) {
                            const points = [[fromLocation.lat, fromLocation.long]];

                            // console.log(journey)
                            if (journey.viaPoints && journey.viaPoints.length > 0) {
                                for (let viapoint of journey.viaPoints) {
                                    points.push([viapoint.lat, viapoint.long]);
                                }
                            }

                            points.push([toLocation.lat, toLocation.long]);

                            const polyline = L.polyline(points, { color: darkMode ? 'white' : '#0077b6' }).addTo(map);

                            let popupContent = isMobileDevice ? `
                                <div style="min-width: 200px;">
                                    <div class="flex items-center justify-between">
                                        <h3>Journey</h3>
                                       ${journey.journeySecondClass && !journey.journeySleeper ? '<span class="text-xs text-white italic bg-neutral-600 pl-1 pr-1 rounded-sm">2nd</span>' : journey.journeyFirstClass ? '<span class="text-xs text-white italic pl-1 pr-1 bg-yellow-500 rounded-sm">1st</span>' : journey.journeyOvernight && !journey.journeySleeper ? `<span class="text-xs text-white italic bg-green-800 pl-1 pr-1 rounded-md">Overnight (${journey.journeyFirstClass ? '1st' : '2nd'})</span>` : journey.journeySleeper ? '<span class="text-xs text-white italic bg-teal-800 pl-1 pr-1 rounded-sm">Sleeper</span>' : ''}
                                    </div>
                                    <hr class="border-neutral-700 mb-2 mt-1">
                                    <p class="flex gap-2 items-center !mt-0 !mb-0"><span class="text-neutral-500 italic text-xs">From:</span> ${journey.from} ${getCountryEmoji(journey.fromCountry)}</p>
                                    <p class="flex gap-2 items-center !mt-0 !mb-0"><span class="text-neutral-500 italic text-xs">To:</span> ${journey.to} ${getCountryEmoji(journey.toCountry)}</p>
                                    <hr class="border-neutral-700 mb-2 mt-1">
                                    <p class="flex gap-2 items-center !mt-0 !mb-0"><span class="text-neutral-500 italic text-xs w-1/2">Departure Date:</span> ${new Date(journey.start_date).toLocaleDateString('en-GB')}</p>
                                    <p class="flex gap-2 items-center !mt-1 !mb-0"><span class="text-neutral-500 italic text-xs w-1/2">Departure Time:</span> ${journey.start_time}</p>
                                     <p class="flex gap-2 items-center !mt-0 !mb-0 ${journey.delayHours || journey.delayMinutes ? '!mt-2' : ''}">
                                        <span class="text-neutral-500 italic text-xs w-1/2">Arrival Time: </span>
                                        <span class="flex gap-1">
                                            <span class="flex flex-col">
                                                <span class="${journey.delayHours || journey.delayMinutes ? 'line-through text-neutral-500' : ''}">
                                                    ${journey.end_time}
                                                    ${new Date(journey.end_date).getTime() > new Date(journey.start_date).getTime() ? `<span class=" italic text-[9px]">+${workOutDays(journey.start_date, journey.end_date)}d</span>` : ''}
                                                </span>
                                                <span>
                                                    ${journey.delayHours || journey.delayMinutes ? `<span class="text-white italic">${getNewArrivalTime(journey.end_time, journey.delayHours, journey.delayMinutes)}</span>` : ''}
                                                    ${new Date(journey.end_date).getTime() > new Date(journey.start_date).getTime() ? `<span class="text-white italic text-[9px]">+${workOutDays(journey.start_date, journey.end_date, journey.delayHours, journey.delayMinutes)}d</span>` : ''}
                                                </span>
                                                
                                            </span> 
                                            </span>
                                              ${journey.delayHours || journey.delayMinutes ? `<span class="${getDiffMinutes(journey.delayHours, journey.delayMinutes) < 0 ? 'text-green-500' : 'text-red-500'} no-underline">${getDiffMinutes(journey.delayHours, journey.delayMinutes) < 0 ? '' : '+'}${getDiffMinutes(journey.delayHours, journey.delayMinutes)}</span>` : ''}
                                    </p>
                                    <hr class="border-neutral-700 mb-2 mt-1">
                                    ${journey.numbers.length > 0 ? `
                                    ${journey.numbers.some(number => number.vehicletype && number.vehicletype.trim()) ? `<p class="flex gap-2 items-center !mt-0 !mb-0"><span class="text-neutral-500 italic text-xs">Vehicle Type:</span> ${journey.numbers.map(number => number.vehicletype).filter(vt => vt && vt.trim()).join(', ')}</p>` : ''}
                                    ${journey.numbers.some(number => number.variant && number.variant.trim()) ? `<p class="flex gap-2 items-center !mt-0 !mb-0"><span class="text-neutral-500 italic text-xs">Variant:</span> ${journey.numbers.map(number => number.variant).filter(v => v && v.trim()).join(', ')}</p>` : ''}
                                    ${journey.numbers.some(number => number.number && number.number.trim()) ? `<p class="flex gap-2 items-center !mt-0 !mb-0"><span class="text-neutral-500 italic text-xs">Number:</span> ${journey.numbers.map(number => number.number).filter(n => n && n.trim()).join(', ')}</p>` : ''}
                                    ` : ''}
                                    <p class="flex gap-2 items-center !mt-0 !mb-0">
                                        <span class="text-neutral-500 italic text-xs">OC:</span> 
                                        ${journey.operator ? journey.operator : 'Unknown'} 
                                        ${journey.trainCode ? `(${journey.trainCode})` : ''}
                                    </p>
                                    <hr class="border-neutral-700 mb-2 mt-1">
                                    <p class="flex gap-2 items-center !mt-0 !mb-0"><span class="text-neutral-500 italic text-xs">Tags:</span> ${journey.journeyTags.join(', ')}</p>
                                    
                                </div>
                            ` : `
                                <div style="min-width: 200px;">
                                    <div class="flex items-center justify-between">
                                        <h3>Journey</h3>
                                        ${journey.journeySecondClass && !journey.journeySleeper ? '<span class="text-xs text-white italic bg-neutral-600 pl-1 pr-1 rounded-sm">2nd</span>' : journey.journeyFirstClass ? '<span class="text-xs text-white italic pl-1 pr-1 bg-yellow-500 rounded-sm">1st</span>' : journey.journeyOvernight && !journey.journeySleeper ? `<span class="text-xs text-white italic bg-green-800 pl-1 pr-1 rounded-md">Overnight (${journey.journeyFirstClass ? '1st' : '2nd'})</span>` : journey.journeySleeper ? '<span class="text-xs text-white italic bg-teal-800 pl-1 pr-1 rounded-sm">Sleeper</span>' : ''}
                                    </div>
                                    <hr class="border-neutral-700 mb-2 mt-1">
                                    <p class="flex gap-2 items-center !mt-0 !mb-0"><span class="text-neutral-500 italic text-xs">From:</span> ${journey.from} <img class="w-5 h-5" src="${getCountryEmoji(journey.fromCountry)}" alt="${journey.fromCountry}"></p>
                                    <p class="flex gap-2 items-center !mt-0 !mb-0"><span class="text-neutral-500 italic text-xs">To:</span> ${journey.to} <img class="w-5 h-5" src="${getCountryEmoji(journey.toCountry)}" alt="${journey.toCountry} flag"></p>
                                    <hr class="border-neutral-700 mb-2 mt-1">
                                    <p class="flex gap-2 items-center !mt-0 !mb-0"><span class="text-neutral-500 italic text-xs w-1/2">Departure Date:</span> ${new Date(journey.start_date).toLocaleDateString('en-GB')}</p>
                                    <p class="flex gap-2 items-center !mt-0 !mb-0"><span class="text-neutral-500 italic text-xs w-1/2">Departure Time:</span> ${journey.start_time}</p>
                                    <p class="flex gap-2 items-center !mt-0 !mb-0 ${journey.delayHours || journey.delayMinutes ? '!mt-2' : ''}">
                                        <span class="text-neutral-500 italic text-xs w-1/2">Arrival Time: </span>
                                        <span class="flex gap-1">
                                            <span class="flex flex-col">
                                                <span class="${journey.delayHours || journey.delayMinutes ? 'line-through text-neutral-500' : ''}">
                                                    ${journey.end_time}
                                                    ${new Date(journey.end_date).getTime() > new Date(journey.start_date).getTime() ? `<span class=" italic text-[9px]">+${workOutDays(journey.start_date, journey.end_date)}d</span>` : ''}
                                                </span>
                                                <span>
                                                    ${journey.delayHours || journey.delayMinutes ? `<span class="text-white italic">${getNewArrivalTime(journey.end_time, journey.delayHours, journey.delayMinutes)}</span>` : ''}
                                                    ${new Date(journey.end_date).getTime() > new Date(journey.start_date).getTime() ? `<span class="text-white italic text-[9px]">+${workOutDays(journey.start_date, journey.end_date)}d</span>` : ''}
                                                </span>
                                                
                                            </span> 
                                            </span>
                                            ${journey.delayHours || journey.delayMinutes ? `<span class="${getDiffMinutes(journey.delayHours, journey.delayMinutes) < 0 ? 'text-green-500' : 'text-red-500'} no-underline">${getDiffMinutes(journey.delayHours, journey.delayMinutes) < 0 ? '' : '+'}${getDiffMinutes(journey.delayHours, journey.delayMinutes)}</span>` : ''}
                                            
            
                                    </p>
                                    <hr class="border-neutral-700 mb-2 mt-1">
                                    ${journey.numbers.length > 0 ? `
                                    ${journey.numbers.some(number => number.vehicletype && number.vehicletype.trim()) ? `<p class="flex gap-2 items-center !mt-0 !mb-0"><span class="text-neutral-500 italic text-xs">Vehicle Type:</span> ${journey.numbers.map(number => number.vehicletype).filter(vt => vt && vt.trim()).join(', ')}</p>` : ''}
                                    ${journey.numbers.some(number => number.variant && number.variant.trim()) ? `<p class="flex gap-2 items-center !mt-0 !mb-0"><span class="text-neutral-500 italic text-xs">Variant:</span> ${journey.numbers.map(number => number.variant).filter(v => v && v.trim()).join(', ')}</p>` : ''}
                                    ${journey.numbers.some(number => number.number && number.number.trim()) ? `<p class="flex gap-2 items-center !mt-0 !mb-0"><span class="text-neutral-500 italic text-xs">Number:</span> ${journey.numbers.map(number => number.number).filter(n => n && n.trim()).join(', ')}</p>` : ''}
                                    ` : ''}

                                    <p class="flex gap-2 items-center !mt-0 !mb-0">
                                        <span class="text-neutral-500 italic text-xs">OC:</span> 
                                        ${journey.operator ? journey.operator : 'Unknown'} 
                                        ${journey.trainCode ? `(${journey.trainCode})` : ''}
                                    </p>
                                    <hr class="border-neutral-700 mb-2 mt-1">
                                    <p class="flex gap-2 items-center !mt-0 !mb-0"><span class="text-neutral-500 italic text-xs">Tags:</span> ${journey.journeyTags.join(', ')}</p>
                                   
                                </div>
                            `;
                            polyline.bindPopup(popupContent);

                            const bounds = L.latLngBounds(points);
                            map.fitBounds(bounds, { padding: [50, 50] });

                            // polyline.openPopup();
                        }
                    }
                }

                    
            } else {
                console.error('Map container not found');
            }

        }

    });

    function getNewArrivalTime(at, dh, dm) {
        let [hours, minutes] = at.split(':').map(Number);
        let delayHours = parseInt(dh);
        let delayMinutes = parseInt(dm);

        minutes += delayMinutes;
        if (minutes < 0) {
            hours -= Math.ceil(Math.abs(minutes) / 60);
            minutes = (minutes % 60 + 60) % 60;
        } else {
            hours += Math.floor(minutes / 60);
            minutes = minutes % 60;
        }

        hours += delayHours;
        if (hours < 0) {
            hours = (hours % 24 + 24) % 24;
        } else {
            hours = hours % 24;
        }

        return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    }

    function getDiffMinutes(dh, dm) {
        let diffHours = parseInt(dh);
        let diffMinutes = parseInt(dm);

        if (isNaN(diffHours)) diffHours = 0;
        if (isNaN(diffMinutes)) diffMinutes = 0;

        const totalMinutes = diffHours * 60 + diffMinutes;

        return totalMinutes;
    }

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
        await sortJourneys();
        // console.log("combined", combined);  
        return journeys;
    }

    function workOutDays(sd, ed, dh, dm){
        const start = new Date(sd);
        const end = new Date(ed);
        const diffTime = Math.abs(end - start);
        let days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (dh || dm) {
            const delayInMinutes = (parseInt(dh) * 60) + parseInt(dm);
            const delayInDays = delayInMinutes / (24 * 60);
            days += Math.ceil(delayInDays);
        }

        return days;
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

    function combineLists() {
        // console.log(journeyLocations, logsToday, journeys);
        let temp = [];
        try {
            if (journeyLocations == null || journeyLocations.length == 0) {
                temp = logsToday.map(log => {
                    const { pictures, log_lat, log_long, log_location, numbers, ...rest } = log;
                    return {
                        ...rest,
                        lat: log_lat,
                        long: log_long,
                        location: log_location,
                        logs: [{ ...rest, numbers }], // Keep numbers within the logs section
                        journeys: [],
                        pictures: pictures || []
                    };
                });
            } else {
                // Create a map to store logs by location
                const logsByLocation = new Map();
                logsToday.forEach(log => {
                    if (!logsByLocation.has(log.log_location)) {
                        logsByLocation.set(log.log_location, []);
                    }
                    logsByLocation.get(log.log_location).push(log);
                });

                temp = journeyLocations.map(journeyLoc => {
                    const matchingLogs = logsByLocation.get(journeyLoc.location) || [];
                    const pictures = matchingLogs.flatMap(log => log.pictures || []);

                    return {
                        ...journeyLoc,
                        logs: matchingLogs.map(log => {
                            const { pictures, ...rest } = log;
                            return rest;
                        }),
                        journeys: journeys.filter(journey => 
                            journey.from === journeyLoc.location || journey.to === journeyLoc.location
                        ),
                        pictures: pictures
                    };
                });

                // Add logs that are not in journeyLocations
                logsToday.forEach(log => {
                    if (!journeyLocations.some(journeyLoc => journeyLoc.location === log.log_location)) {
                        const { pictures, log_lat, log_long, log_location, numbers, ...rest } = log;
                        temp.push({
                            ...rest,
                            lat: log_lat,
                            long: log_long,
                            location: log_location,
                            logs: [{ ...rest, numbers }], // Keep numbers within the logs section
                            journeys: [],
                            pictures: pictures || []
                        });
                    }
                });

                temp = temp.filter(item => item.logs.length > 0 || item.journeys.length > 0 || item.pictures.length > 0);
            }
            return temp;
        } catch (error) {
            console.error('Error combining lists:', error);
            mapErr = true;
        }
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
        const settings = JSON.parse(localStorage.getItem('settings')) || {};
        if (settings.darkMode === true) {
            darkMode = true;
            document.documentElement.classList.add('dark');
        } else {
            darkMode = false;
            document.documentElement.classList.remove('dark');
        }
    });

    let isMobileDevice = false
    let isMobile = false;
    let isAndroid = false;
    let isIOS = false;

    onMount(() => {
        const userAgent = navigator.userAgent.toLowerCase();
        isMobile = /mobile/.test(userAgent);
        isAndroid = /android/.test(userAgent);
        isIOS = /iphone|ipad|ipod/.test(userAgent);
        isMobileDevice = isMobile || isAndroid || isIOS; 
    });

    let countries = []

    function getFlags() {
        for (const journey of journeys) {
            if (journey.fromCountry && typeof journey.fromCountry === 'string') {
                if(!isMobileDevice){
                    const fromCountryIndex = countries.findIndex(country => country.code === journey.fromCountry);
                    if (fromCountryIndex === -1) {
                        countries.push({ "code": journey.fromCountry, "src": `https://flagsapi.com/${journey.fromCountry}/flat/64.png` });
                    }
                } else {
                    const fromCountryIndex = countryFlags.findIndex(country => country.code === journey.fromCountry);
                    if (fromCountryIndex !== -1 && !countries.some(country => country.code === journey.fromCountry)) {
                        countries.push({ "code": journey.fromCountry, "emoji": countryFlags[fromCountryIndex].emoji });
                    }
                }
            } else {
                // console.log(journey)
                // console.log(`Invalid fromCountry code: ${journey.fromCountry}`);
            }

            if (journey.toCountry && typeof journey.toCountry === 'string') {
                if(!isMobileDevice){
                    const toCountryIndex = countries.findIndex(country => country.code === journey.toCountry);
                    if (toCountryIndex === -1) {
                        countries.push({ "code": journey.toCountry, "src": `https://flagsapi.com/${journey.toCountry}/flat/64.png` });
                    }
                } else {
                    const toCountryIndex = countryFlags.findIndex(country => country.code === journey.toCountry);
                    if (toCountryIndex !== -1 && !countries.some(country => country.code === journey.toCountry)) {
                        countries.push({ "code": journey.toCountry, "emoji": countryFlags[toCountryIndex].emoji });
                    }
                }
            } else {
                // console.log(journey)
                // console.log(`Invalid toCountry code: ${journey.toCountry}`);
            }

        }
        // console.log(countries);
        return countries;
    }
    

    function getCountryEmoji(code) {
        if (countries.length === 0) {
            getFlags();
        }
        if(!isMobileDevice){
            const country = countries.find(country => country.code === code);
            // console.log(code)
            if (country) {
                // console.log("src", country.src);
                return country.src;
            }
            return "";
        }else{
            const country = countryFlags.find(country => country.code === code);
            if (country) {
                return country.emoji;
            }
            return "";
        }
    }

    let sortedJourneys = []
    async function sortJourneys() {
        // Sort by start time
        let uniqueJourneys = new Set();
        for (var item of combined) {
            for (var journey of item.journeys) {
            journey.dropdownOpen = false;
            uniqueJourneys.add(journey);
            }
        }
        sortedJourneys = Array.from(uniqueJourneys);
    }



    function calcDuration(st, sd, ed, et, dh, dm) {
        
        dh = dh ? dh.trim() : '00';
        dm = dm ? dm.trim() : '00';

        // Parse the start and end times
        const start = new Date(`${sd}T${st}`);
        const end = new Date(`${ed}T${et}`);
        
        let diffTime = end - start;

        const delayInMilliseconds = (parseInt(dh, 10) * 60 * 60 * 1000) + (parseInt(dm, 10) * 60 * 1000);
        diffTime += delayInMilliseconds;


        if (diffTime < 0) {
            diffTime += 24 * 60 * 60 * 1000; 
        }

        let totalMinutes = Math.floor(diffTime / (1000 * 60));

        let hours = Math.floor(totalMinutes / 60);
        let minutes = totalMinutes % 60;

        console.log("calcDuration returning:", `${hours}h ${minutes}m`);

        return `${hours}h ${minutes}m`;
    }
    

    function checkForPictureAllTime(multi, number) {
        // console.log("checkForPictureAllTime called with multi:", multi, "and number:", number);
        let picture = null;
        if (multi) {
            for (let log of logs) {
                // console.log("Checking log:", log);
                if (log.numbers.some(num => number.some(n => n.number === num.number))) {
                    picture = log.pictures[0];
                    // console.log("Picture found:", picture);
                    return picture;
                }
            }
            // If no picture found for the specific number, check for the same variant
            for (let log of logs) {
                if (log.numbers.some(num => number.some(n => n.variant === num.variant))) {
                    picture = log.pictures[0];
                    // console.log("Picture found for variant:", picture);
                    return picture;
                }
            }
        } else {
            for (let log of logs) {
                // console.log("Checking log:", log);
                if (log.numbers.some(num => num.number === number)) {
                    picture = log.pictures[0];
                    // console.log("Picture found:", picture);
                    return picture;
                }
            }
            // If no picture found for the specific number, check for the same variant
            for (let log of logs) {
                if (log.numbers.some(num => num.variant === number)) {
                    picture = log.pictures[0];
                    // console.log("Picture found for variant:", picture);
                    return picture;
                }
            }
        }
        // console.log("No picture found");
        return false;
    }

    function checkForPictureToday(multi, number) {
        // console.log("checkForPictureToday called with multi:", multi, "and number:", number);
        let picture = null;
        if (multi) {
            for (let log of logsToday) {
                // console.log("Checking log:", log);
                if (log.numbers.some(num => number.some(n => n.number === num.number))) {
                    picture = log.pictures[0];
                    // console.log("Picture found:", picture);
                    return picture;
                }
            }
        } else {
            for (let log of logsToday) {
                // console.log("Checking log:", log);
                if (log.numbers.some(num => num.number === number)) {
                    picture = log.pictures[0];
                    // console.log("Picture found:", picture);
                    return picture;
                }
            }
        }
        // console.log("No picture found");
        return false;
    }

    function deleteJourney(id){
        if (confirm('Are you sure you want to delete this journey? This action is permanent.')) {
            writeJourneysData(journeys.filter(journey => journey.id !== id));
            window.location.reload();
        }
    }


</script>

<style>
     .loader{margin-top:12px;width:24px;height:24px;border:3px solid rgb(50,50,50);border-bottom-color:transparent;border-radius:50%;display:inline-block;box-sizing:border-box;animation:rotation 1s linear infinite}@keyframes rotation{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}

    :global(.leaflet-popup-content-wrapper) {
       @apply bg-white text-black border border-gray-300 rounded-md p-1 dark:bg-[#131313] dark:text-[#f9fafb] dark:border-[#2c2c2c];
    }

    :global(.leaflet-popup-tip){
       @apply bg-white border border-gray-300 dark:bg-[#131313] dark:border-[#2c2c2c] !important;
    }

    .customScrollbar{
        scrollbar-width: thin;
        scrollbar-color: #575757 #202020;
    }

    .leaflet-popup-content{
        min-width: 300px;
    }
</style>


