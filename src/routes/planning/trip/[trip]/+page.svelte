<CustomAlert mode={$alrtMode} active={$alrtAct} text={$alrtTxt} on:close={() => $alrtAct = false} />
{#if tooltip || tooltip2}   
<button class="w-screen h-screen fixed z-10 hover:cursor-default backdrop-blur-sm" on:click={() => {tooltip = false; tooltip2 = false}}></button>
{/if}
{#if addJourney && !loadStns}
<AddJourney on:message={addJourneyFinal} day={addJourneyDay} allStns={allStns} tripDateStart={thisTripDateStart} tripDateEnd={thisTripDateEnd}/>
{/if}
{#if editJourney && !loadStns}
<EditJourney on:message={editJourneyFinal} day={editJourneyDay} journey={journeyToEdit} tripDateStart={thisTripDateStart} tripDateEnd={thisTripDateEnd}/>
{/if}
<div style="width: 100vw; display: flex; flex-direction: column" id="app">
    <Nav ver="back"/>
        <div class="flex flex-col items-center h-full justify-start overflow-y-scroll customScrollbar overflow-x-hidden mb-4 mt-2">
            <div class="max-w-[1000px] w-full flex flex-col h-full">
                <div class="flex flex-col items-center border-[1px] rounded-md border-neutral-700 sm:ml-8 ml-2 mr-3 sm:mr-8 sm:pt-4 sm:pb-6 pl-4 pr-3 pb-4  customScrollbar h-auto">
                    {#if tripName == ''}
                        <h1 class="text-2xl text-white">Loading...</h1>
                        <span class="loader"></span>
                    {/if}
                    <div class="flex  items-center mt-5 sm:mt-0 mb-5 relative flex-col">
                        {#if $tripName.length != 0}
                            <button class="text-white text-2xl font-semibold sm:mt-1 border-[1px] border-transparent hover:border-white rounded-md p-1" on:click={() => {tooltip = !tooltip}}>{$tripName}</button>
                        {:else}
                        <button class="text-white text-2xl font-semibold sm:mt-1 border-[1px] border-transparent hover:border-white rounded-md p-1" on:click={() => {tooltip = !tooltip}}>[No Trip Name]</button>
                        {/if}
                        {#if tooltip}
                            <div in:fade={{duration:50}} class="absolute top-[100%] translate-x-[-50%] left-[50%] bg-black p-2 rounded-md z-30 min-w-[150px]">
                                <div class="triangle w-4 h-2 bg-black absolute bottom-[99%] translate-x-[-50%] left-[50%]"></div>
                                <input class="input darker non-empty" bind:value={editName} placeholder="Edit name" on:keyup={callEdit} on:input={submitChanges} maxlength="20" minlength="3">
                                <button class="button red text-md pl-2 pr-2 w-full mt-2" on:click={deletePlan}>Delete Plan</button>
                            </div>
                        {/if}
                        <div class="relative">
                            {#if $tripDescription == ''}
                                <button class="text-neutral-500 italic text-xs hover:border-white border-[1px] border-transparent" on:click={() => {tooltip2 = !tooltip2}}>[No Description]</button>
                            {:else}
                                <button class="text-neutral-500 italic text-xs hover:border-white border-[1px] border-transparent" on:click={() => {tooltip2 = !tooltip2}}>{$tripDescription}</button>
                            {/if}
                            {#if tooltip2}
                                <div in:fade={{duration:50}} class="absolute top-[160%] translate-x-[-50%] left-[50%]  bg-black p-2 rounded-md z-30 min-w-[150px] ">
                                    <div class="triangle w-4 h-2 bg-black absolute bottom-[99%] translate-x-[-50%] left-[50%]"></div>
                                    <input class="input darker non-empty" bind:value={editDescription} placeholder="Edit description" on:keyup={callEditDesc} on:input={submitChangesDesc} maxlength="20" minlength="3">
                                </div>
                            {/if}
                        </div>
                    </div>
                    <hr class="w-[50%] mb-8 border-neutral-700">
                    {#if thisTrip == null}
                    <div class="w-full h-full flex items-center justify-center">
                        <span class="loader"></span>
                    </div>
                    {:else}
                        <div class="w-full pl-1 flex-col justify-center items-center  max-w-[800px]">
                            {#each thisTrip.days as day}
                                <div class="border-[1px] border-neutral-700 rounded-md w-full p-2 h-auto min-h-[150px] first:mt-0 mt-4">
                                    <div class="flex justify-between w-full items-center flex-wrap">
                                        <h2 class="text-white italic">Day {day.day}</h2>
                                        {#if !loadStns}
                                            <button class="button blue p-1 text-sm pl-3 pr-3 wider2" on:click={addJourneyFn(day, thisTrip.start, thisTrip.end)}>Add</button>
                                        {:else}
                                            <span class="loader" style="margin-top:0px"></span>
                                        {/if}
                                    </div>
                                    <hr class="mt-2 border-neutral-700 mb-2">
                                    <div class="flex flex-col gap-3 mt-3">
                                        {#each day.journeys as journey}
                                            <div class="border-[1px] bg-black bg-opacity-30 border-neutral-800 rounded-md p-2 flex flex-col gap-2">
                                                <div class="flex justify-between items-center sm:flex-row flex-col">
                                                    <div class="flex flex-col gap-1 items-start w-full">
                                                        <h3 class="text-white text-md w-full flex sm:gap-2 gap-0 sm:items-center items-start mb-2 sm:mb-1 sm:flex-row flex-col">
                                                            {#if isMobileDevice}
                                                                <span class="flex gap-2 items-center">
                                                                    {journey.from}
                                                                   <span>{getCountryEmoji(journey.fromCountry)}</span>
                                                                </span>
                                                                <span class="flex gap-2 items-center">
                                                                    <span class="text-sm italic sm:ml-2 sm:mr-2 mr-1 opacity-30">to</span>
                                                                    <span class="flex gap-2 items-center">
                                                                        {journey.to}
                                                                        <span>{getCountryEmoji(journey.toCountry)}</span>
                                                                    </span>
                                                                </span>
                                                            {:else}
                                                                <span class="flex gap-2 items-center">
                                                                    {journey.from}
                                                                    <img class="w-5 h-5" src={getCountryEmoji(journey.fromCountry)} alt={journey.fromCountry}>
                                                                </span>
                                                                <span class="flex gap-2 items-center">
                                                                    <span class="text-sm italic sm:ml-2 sm:mr-2 mr-1 opacity-30">to</span>
                                                                    <span class="flex gap-2 items-center">
                                                                        {journey.to}
                                                                        <img class="w-5 h-5" src={`https://flagsapi.com/${journey.toCountry}/flat/64.png`} alt={journey.toCountry}>
                                                                    </span>
                                                                </span>
                                                            {/if}
                                                        </h3>
                                                        <div class="flex gap-2 flex-wrap mt-1 max-w-[400px]">
                                                            <div class="flex gap-2 items-center bg-neutral-800 rounded-md p-1 pl-2 pr-2">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle fill-white opacity-30" viewBox="0 0 16 16">
                                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                                                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                                                                  </svg>
                                                                  {#if journey.operator != '' && journey.service != ''}
                                                                        <h4 class="text-white text-sm">{journey.service}<span class="ml-1 mr-1 opacity-30">/</span>{journey.operator}</h4>
                                                                  {:else if journey.operator != ''}
                                                                        <h4 class="text-white text-sm">{journey.operator}</h4>
                                                                  {:else if journey.service != ''}
                                                                        <h4 class="text-white text-sm">{journey.service}</h4>
                                                                  {/if}
                                                                </div>
                                                            <div class="flex gap-2 items-center bg-neutral-800 rounded-md p-1 pl-2 pr-2">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock fill-white opacity-30" viewBox="0 0 16 16">
                                                                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
                                                                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
                                                                  </svg>
                                                                  <h4 class="text-white text-sm">{journey.departureTime} <span class="opacity-50 italic ml-1 mr-1">to</span> {journey.arrivalTime}</h4>
                                                            </div>
                                                            <div class="flex gap-2 items-center bg-neutral-800 rounded-md p-1 pl-2 pr-2">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock fill-white opacity-30" viewBox="0 0 16 16">
                                                                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
                                                                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
                                                                  </svg>
                                                                  {#if journey.departureDate != journey.arrivalDate}
                                                                    {#if calcDays(journey.departureDate, journey.arrivalDate) > 1}
                                                                        <h4 class="text-white text-sm">{calcTime(journey.departureTime, journey.arrivalTime, journey.departureDate, journey.arrivalDate)} <span class="text-xs text-neutral-400">+ {calcDays(journey.departureDate, journey.arrivalDate)} days</span></h4>
                                                                    {:else}
                                                                        <h4 class="text-white text-sm">{calcTime(journey.departureTime, journey.arrivalTime, journey.departureDate, journey.arrivalDate)} <span class="text-xs text-neutral-400">+ {calcDays(journey.departureDate, journey.arrivalDate)} day</span></h4>
                                                                    {/if}
                                                                  {:else}
                                                                    <h4 class="text-white text-sm">{calcTime(journey.departureTime, journey.arrivalTime, journey.departureDate, journey.arrivalDate)}</h4>
                                                                  {/if}
                                                                </div>
                                                            {#if journey.description != '' && journey.description != null}
                                                                <div class="flex gap-2 items-center bg-neutral-800 rounded-md p-1 pl-2 pr-2">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sticky fill-white opacity-30 min-w-3" viewBox="0 0 16 16">
                                                                        <path d="M2.5 1A1.5 1.5 0 0 0 1 2.5v11A1.5 1.5 0 0 0 2.5 15h6.086a1.5 1.5 0 0 0 1.06-.44l4.915-4.914A1.5 1.5 0 0 0 15 8.586V2.5A1.5 1.5 0 0 0 13.5 1zM2 2.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .5.5V8H9.5A1.5 1.5 0 0 0 8 9.5V14H2.5a.5.5 0 0 1-.5-.5zm7 11.293V9.5a.5.5 0 0 1 .5-.5h4.293z"/>
                                                                    </svg>
                                                                    <h4 class="text-white text-sm">{journey.description}</h4>
                                                                </div>
                                                            {/if}
                                                        </div>
                                                    </div>
                                                    <div class="sm:ml-4 ml-2 mr-2 flex sm:flex-col flex-row gap-2 mt-4 sm:mt-0 sm:w-1/5 w-full">
                                                        {#if !loadStns}
                                                            <button class="button blue2 p-1 text-xs w-full" on:click={callEditJourney(journey, day.day, thisTrip.start, thisTrip.end)}>Edit</button>
                                                        {:else}
                                                            <div class="w-full flex items-center justify-center h-[24px]">
                                                                <span class="loader" style="margin-top:0px"></span>
                                                            </div>
                                                        {/if}
                                                        <button class="button red p-1 text-xs w-full" on:click={deleteJourney(journey, day.day)}>Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        {/each}
                                    </div>
                                </div>
                            {/each} 
                            <div class="mt-8 border-neutral-700 border-[1px] p-2 flex rounded-md gap-2">
                                <button class="button green p-2 w-full taller" on:click={copyData}>Copy plan data</button>
                                <button class="button blue p-2 w-full taller" on:click={goPrint}>Print</button>
                            </div>
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    <Footer/>
</div>

<script>
    import { onMount } from 'svelte';
    import Nav from '../../../../lib/components/Nav.svelte';
    import Footer from '../../../../lib/components/Footer.svelte';
    import AddJourney from './AddJourney.svelte';
    import EditJourney from './EditJourney.svelte';
    import '../../../../global.css';
    import { page } from '$app/stores';
	import { writable } from 'svelte/store';
    import { openDB, getAllData, putData } from '../../../stationsDB.js';
    import '../../../siteDB.js';
    import { writePlanningData, writeLocationsData, writeJourneysData, writeLogsData, getPlanningData, getLocationsData, getJourneysData, getLogsData } from '../../../siteDB';
    import { countryFlags } from '../../countries.js'
    var param = $page.params.trip;
    var tooltip = false;
    var tooltip2 = false;
    var addJourney = false;
    var editJourney = false;
    import { fade } from 'svelte/transition';

    var editName = ''
    var editDescription = ''

    var tripName = writable('');
    var tripDescription = writable('');
    var tripStart = writable('');
    var tripEnd = writable('');
    var thisTrip = null;
    var addJourneyDay = ''
    var editJourneyDay = ''
    let storage = []
    
    onMount(async () => {
        document.title = 'Trip';
        storage = await getPlanningData();
        getFlags();
        getPlan();
    });



    let isMobile = false;
    let isAndroid = false;
    let isIOS = false;
    let isMobileDevice = false

    onMount(() => {
        const userAgent = navigator.userAgent.toLowerCase();
        isMobile = /mobile/.test(userAgent);
        isAndroid = /android/.test(userAgent);
        isIOS = /iphone|ipad|ipod/.test(userAgent);
        isMobileDevice = isMobile || isAndroid || isIOS; 
    });


    async function getPlan(){
        storage = await getPlanningData();
        for(const plan in storage){
            // console.log(storage[plan])
            if(storage[plan].tripID == param){
                tripName.set(storage[plan].name);
                tripDescription.set(storage[plan].description);
                tripStart.set(storage[plan].startDate);
                tripEnd.set(storage[plan].endDate);
                thisTrip = storage[plan];
                editName = storage[plan].name;
                editDescription = storage[plan].description;
            }
        }
    }

    
    function callEdit(){
        tripName.set(editName);
    }
    
    function callEditDesc(){
        tripDescription.set(editDescription);
    }
    
    
    async function deletePlan(){
        var plan = thisTrip;
        if(confirm("Are you sure you would like to delete plan '" + plan.name  + "'? THIS IS A PERMANENT ACTION AND CANNOT BE UNDONE.")){
            for(const plan in storage){
                if(storage[plan].tripID == param){
                    storage.splice(plan, 1);
                    await writePlanningData(storage)
                    window.location.href = '/planning';
                }
            }
        }
    }
    
    async function submitChanges(){
        var storage = await getPlanningData();
        for(const plan in storage){
            if(storage[plan].tripID == param){
                storage[plan].name = editName;
                await writePlanningData(storage);
            }
        }
    }
    
    async function submitChangesDesc(){
        for(const plan in storage){
            if(storage[plan].tripID == param){
                storage[plan].name = editDescription;
                await writePlanningData(storage);
            }
        }
    }

    let addDay = ''
    var thisTripDateStart = ''
    var thisTripDateEnd = ''
    
    function addJourneyFn(day, sd, ed){

        const startDate = new Date(sd);

        // Calculate the target date by adding (day - 1) days to the start date
        const targetDate = new Date(startDate);
        targetDate.setDate(startDate.getDate() + (day.day - 1));

        // Format the target date as a string (e.g., "YYYY-MM-DD")
        const year = targetDate.getFullYear();
        const month = String(targetDate.getMonth() + 1).padStart(2, '0');
        const date = String(targetDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${date}`;
        console.log(formattedDate);

        thisTripDateStart = formattedDate;
        thisTripDateEnd = formattedDate;

        addJourney = true;
        addJourneyDay = day.day;
        addDay = day;
    }
    
    
    async function addJourneyFinal(data){
        // console.log(data.detail.text);
        addJourney = false;
        for(const plan in storage){
            if(storage[plan].tripID == param){
                for(const day in storage[plan].days){
                    if(storage[plan].days[day].day == data.detail.text.day){
                        storage[plan].days[day].journeys.push(data.detail.text.journey);
                        await writePlanningData(storage);
                        getPlan();
                    }
                }
            }
        }
    }
    
    let journeyToEdit
    
    function callEditJourney(journey, day,sd, ed){
        if(journey.departureDate == '' || journey.arrivalDate == ''){
            console.log(sd, ed, day)
            const startDate = new Date(sd);
            
            // Calculate the target date by adding (day - 1) days to the start date
            const targetDate = new Date(startDate);
            targetDate.setDate(startDate.getDate() + (day - 1));
            
            // Format the target date as a string (e.g., "YYYY-MM-DD")
            const year = targetDate.getFullYear();
            const month = String(targetDate.getMonth() + 1).padStart(2, '0');
            const date = String(targetDate.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${date}`;
            console.log(formattedDate);
            
            thisTripDateStart = formattedDate;
            thisTripDateEnd = formattedDate;
            console.log("gen")
        }else{
            thisTripDateStart = journey.departureDate;
            thisTripDateEnd = journey.arrivalDate;
            console.log("preset")
        }

        editJourney = true;
        journeyToEdit = journey;
        // console.log(day);
        editJourneyDay = day;
    }
    
    async function editJourneyFinal(data){
        // console.log(data.detail.text);
        editJourney = false;
        for(const plan of storage){
            if(plan.tripID === param){
            for(const day of plan.days){
                if(day.day === data.detail.text.day){
                const journeyIndex = day.journeys.findIndex(journey => journey.code === data.detail.text.journey.code);
                if(journeyIndex !== -1){
                    day.journeys[journeyIndex] = data.detail.text.journey;
                    await writePlanningData(storage);
                    getPlan();
                }
                }
            }
            }
        }
    }
    
    function calcTime(departureTime, arrivalTime){
        try{
            var dep = new Date(`2000-01-01 ${departureTime}`);
            var arr = new Date(`2000-01-01 ${arrivalTime}`);
            if (arr < dep) {
                arr.setDate(arr.getDate() + 1); // Add 1 day to arrival date
            }
            var diff = arr - dep;
            var hours = Math.floor(diff / (1000 * 60 * 60));
            diff -= hours * 1000 * 60 * 60;
            var minutes = Math.floor(diff / (1000 * 60));
            return `${hours}h ${minutes}m`;
        }catch(e){
            return 'Error';
        }
    } 

    function calcDays(departureDate, arrivalDate){
        try{
            var dep = new Date(departureDate);
            var arr = new Date(arrivalDate);
            var diff = arr - dep;
            var days = Math.floor(diff / (1000 * 60 * 60 * 24));
            return days;
        }catch(e){
            return 'Error';
        }
    }
    
    async function deleteJourney(journey, dayImport){
        if(confirm("Are you sure you would like to delete this journey?")){
            for (const plan of storage) {
                // console.log(plan.tripID, param)
                if (plan.tripID === param) {
                    for (const day of plan.days) {
                        // console.log(day.day, dayImport)
                        if (day.day === dayImport) {
                            day.journeys = day.journeys.filter(j => j !== journey);
                            await writePlanningData(storage);
                            getPlan();
                            return; 
                        }
                    }
                }
            }
        }
    }
    
    function goPrint(){
        window.location.href = '/planning/trip/' + param + '/print';
    }
    
    
    import LZString from 'lz-string'
    import CustomAlert from '../../../../lib/components/Alert.svelte'


    var alrtTxt = writable('')
    var alrtAct = writable(false)
    var alrtMode = writable('success')
    
    function copyData(){
        var data = JSON.stringify(thisTrip);
        var compressed = LZString.compressToBase64(data);
        console.log(compressed);
        navigator.clipboard.writeText(compressed); 
        $alrtTxt = 'Data copied to clipboard';
        $alrtAct = true;
        
    }
    
    
    var countries = []
    
    function getFlags() {
        for (const plan in storage) {
            for (const day of storage[plan].days) {
                for (const journey of day.journeys) {
                    if (journey.fromCountry && typeof journey.fromCountry === 'string') {
                        if(!isMobileDevice){
                            const fromCountryIndex = countries.findIndex(country => country.code === journey.fromCountry);
                            if (fromCountryIndex === -1) {
                                countries.push({ "code": journey.fromCountry, "src": `https://flagsapi.com/${journey.fromCountry}/flat/64.png` });
                            }
                        }else{
                            const fromCountryIndex = countryFlags.findIndex(country => country.code === journey.fromCountry);
                            if (fromCountryIndex === -1) {
                                const fromCountryIndex = countryFlags.findIndex(country => country.code === journey.fromCountry);
                                if (fromCountryIndex !== -1) {
                                    countries.push({ "code": journey.fromCountry, "emoji": countryFlags[fromCountryIndex].emoji });
                                }
                            }
                        }
                    } else {
                        // console.log(journey)
                        // console.log(`Invalid fromCountry code: ${journey.fromCountry}`);
                    }

                    // if (journey.toCountry && typeof journey.toCountry === 'string') {
                    //     const toCountryIndex = countries.findIndex(country => country.code === journey.toCountry);
                    //     if (toCountryIndex === -1) {
                    //         countries.push({ "code": journey.toCountry, "src": `https://flagsapi.com/${journey.toCountry}/flat/64.png` });
                    //     }
                    // } else {
                    //     // console.log(`Invalid toCountry code: ${journey.toCountry}`);
                    // }
                }
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

    
    let allStns = null
    let loadStns = true;
    onMount(async () => {
        if (typeof window !== 'undefined') {
            const settings = JSON.parse(localStorage.getItem('settings'));
            if (settings.dbStn) {
                const db = await openDB('stationsDB', 1, (db) => {
                    if (!db.objectStoreNames.contains('stations')) {
                        db.createObjectStore('stations', { keyPath: 'id' });
                    }
                });

                // Check if stations are already cached
                const cachedStations = await getAllData(db, 'stations');
                if (cachedStations.length > 0) {
                    allStns = cachedStations[0].data;
                    loadStns = false;
                } else {
                    // Use a web worker to fetch stations
                    const worker = new Worker(new URL('../../../stationWorker.js', import.meta.url), { type: 'module' });
                    worker.onmessage = async (event) => {
                        allStns = event.data;
                        await putData(db, 'stations', { id: 1, data: allStns });
                        loadStns = false;
                    };
                    worker.onerror = (error) => {
                        console.error('Error in worker:', error);
                        loadStns = false; 
                    };
                    worker.postMessage('fetchStations');
                }
            } else {
                loadStns = false;
            }
        }
    });

    
    
    
</script>

<style>
    .loader{margin-top:12px;width:24px;height:24px;border:3px solid rgb(50,50,50);border-bottom-color:transparent;border-radius:50%;display:inline-block;box-sizing:border-box;animation:rotation 1s linear infinite}@keyframes rotation{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
    
    .triangle{
        clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    }
</style>