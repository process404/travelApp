<CustomAlert mode={$alrtMode} active={$alrtAct} text={$alrtTxt} on:close={() => $alrtAct = false} />
<div role="button" tabindex="0" class="fixed w-full h-screen dark:bg-black bg-neutral-500 z-30 bg-opacity-80 sm:backdrop-blur-md backdrop-blur-none flex items-center justify-center p-0" on:mousedown|self={close}>
    <section class="dark:bg-neutral-900 bg-neutral-200 w-[90%] max-w-[800px] h-[90%] overflow-y-scroll rounded-md p-4 z-40 cursor-default border-[1px] border-neutral-700 flex flex-col" in:fade={{duration:100}} out:fade={{duration:100}}>
        <article class="flex justify-between items-center">
            <div>
                <h2 class="dark:text-white text-2xl font-semibold text-left">Add Journey <h4 class="text-neutral-500 italic text-xs sm:ml-2 sm:inline-block hidden">( Day {day} )</h4></h2>
                <h4 class="text-neutral-500 italic text-xs sm:ml-2 inline-block sm:hidden">( Day {day} )</h4>
            </div>
            <button class="button red" style="padding-left:1rem; padding-right:1rem" on:click={close}>Cancel</button>
        </article>
        <hr class="mt-4 mb-2 border-neutral-700">
        <article class="flex gap-2 mt-4 border-[1px] border-neutral-700 rounded-md p-2 pb-3 sm:flex-row flex-col">
            <div class="w-full">
                <h3 class="dark:text-neutral-300 italic text-left mb-1">From</h3>
                {#if !loading}
                    <PromptField ds="{locations}" on:select={selectFrom} bind:value={from} ver="loc" bind:presetC={fromCountry} adDs={allStns}/>
                {:else}
                    <span class="loader"></span>
                {/if}
                </div>
            <div class="w-full">
                <h3 class="dark:text-neutral-300 italic text-left mb-1">To</h3>
                {#if !loading}
                    <PromptField ds="{locations}" on:select={selectTo} bind:value={to} ver="loc" bind:presetC={toCountry} adDs={allStns}/>
                {:else}
                    <span class="loader"></span>
                {/if}
            </div>
        </article>
        <article class="flex gap-3 mt-4 border-[1px] border-neutral-700 rounded-md p-2 pb-3 items-center md:flex-row flex-col">
            <div class="w-full flex gap-3">
                <div class="md:w-2/4 w-full">
                    <h3 class="dark:text-neutral-300 italic text-left mb-1 text-sm">Departure Date</h3>
                    <input class="input blue dark:iconEdit w-full" type="date" bind:value={tripDateStart}/>
                    <h3 class="dark:text-neutral-300 italic text-left mb-2  mt-2 text-sm">Departure Time</h3>
                    <input class="input blue dark:iconEdit w-full" type="time" bind:value={departureTime}/>
                </div>
                <div class="md:w-2/4 w-full">
                    <h3 class="dark:text-neutral-300 italic text-left mb-1 text-sm">Arrival Date</h3>
                    <input class="input blue dark:iconEdit w-full" type="date" bind:value={tripDateEnd}/>
                    <h3 class="dark:text-neutral-300 italic text-left mb-2 mt-2 text-sm">Arrival Time</h3>
                    <input class="input blue dark:iconEdit w-full" type="time" bind:value={arrivalTime}/>                
                </div>
            </div>
            <div class="md:w-1/2 w-full">
                <h3 class="dark:text-neutral-300 italic text-left mb-1 text-sm">Service</h3>
                <input class="input blue w-full"  bind:value={service}/>
            </div>
            <div class="w-full">
                <h3 class="dark:text-neutral-300 italic text-left mb-1 text-sm">Operator</h3>
                <input class="input blue w-full"  bind:value={operator}/>
            </div>
        </article>
        <article class="flex gap-3 mt-4 border-[1px] border-neutral-700 rounded-md p-2 pb-3 items-center md:flex-row flex-col">
            <div class="w-full">
                <h3 class="dark:text-neutral-300 italic text-left mb-1 w-full">Description</h3>
                <textarea class="input blue text-xs resize-none w-full" maxlength="500" rows="4" placeholder="" bind:value={description}></textarea>
            </div>
        </article>
        <article class="flex gap-3 mt-4 border-[1px] border-neutral-700 rounded-md p-2 pb-3 items-center md:flex-row flex-col">
            <div class="w-full">
            <h3 class="dark:text-neutral-300 italic text-left mb-1 text-sm">E-Ticket Link</h3>
            <input class="input blue w-full" type="url" bind:value={eTicketLink} placeholder="Enter e-ticket link"/>
            </div>
        </article>
        <article class="flex gap-3 sm:mt-8 border-[1px] border-neutral-700 rounded-md p-2 pb-2 items-center md:flex-row flex-col mt-8">
            <div class="w-full flex">
                <button class="button green w-full taller" on:click={addJourneyConfirm}>Add Journey</button>
            </div>
        </article>
    </section>
</div>

<script>
import { createEventDispatcher, onMount } from "svelte";
const dispatch = createEventDispatcher();
import { fade } from "svelte/transition";

export let day;
export let allStns;
export let tripDateStart;
export let tripDateEnd;

console.log(tripDateStart, tripDateEnd);



import PromptField from "../../../../lib/components/PromptField.svelte";
import CustomAlert from "../../../../lib/components/Alert.svelte";
import '../../../siteDB.js';
import { writePlanningData, writeLocationsData, writeJourneysData, writeLogsData, getPlanningData, getLocationsData, getJourneysData, getLogsData } from '../../../siteDB';
import extraStationsNonDs from '../../../../db/additionalStations.json'

import { writable, get } from "svelte/store";
var loading = true;

let from, to, arrivalDate, departureDate, service, operator, description, departureTime, arrivalTime, fromId, toId, eTicketLink;
let alrtMode = writable("err");
let alrtTxt = writable("");
let alrtAct = writable(false);

let fromCountry = "GB"
let toCountry = "GB"

let uploadedFile = null;
let uploadedFiles = writable({});

function close() {
    dispatch("message", { text: "close" });
}

function submit(text) {
    dispatch("message", { text });
}

let locations = [];

async function getLocations(){
    loading = true;
    let locationsGet = await getLocationsData();
    if(locationsGet != null){
        locations = locationsGet.concat(extraStationsNonDs);
        loading = false;
    }else{
        locations = extraStationsNonDs;
        loading = false;
    }
}

onMount(() => {
    getLocations();
}); 

function selectFrom(o) {
    from = o.detail.text.name;
    fromId = o.detail.id;
    console.log(from, to);
}

function selectTo(o) {
    to = o.detail.text.name;
    toId = o.detail.id;
    console.log(from, to);
}

async function addLocation(location, country) {
    console.log(locations);
    await getLocations();
    if(locations == null){
        locations = [];
        locations.push({ name: location, country: country });
        await writeLocationsData(locations);
        await getLocations();
        console.log("Location added");
    }else{
        const existingLocation = locations.find(loc => loc.name.toLowerCase() === location.toLowerCase());
        if (existingLocation) {
            console.log("Location already exists");
        } else {
            locations.push({ name: location, country: country });
            await writeLocationsData(locations);
            await getLocations();
            console.log("Location added");
        }
    }
}

function generateCode() {
    let code = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    for (let i = 0; i < 6; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}

async function addJourneyConfirm() {
    if (from === null || to === null || tripDateEnd === null || tripDateStart === null) {
        alrtTxt.set("Please fill in all fields");
        alrtAct.set(true);
        console.log("Please fill in all fields");
        console.log(from, to, arrival, departure);
        return;
    }

    if (confirm("Please confirm you would like to enter this journey.")) {
        console.log(get(uploadedFiles));
        const journey = {
            day: day,
            journey: {
                code: generateCode(),
                from: from,
                fromCountry: fromCountry,
                fromId: fromId,
                to: to,
                toCountry: toCountry,
                toId: toId,
                arrivalTime: arrivalTime,
                departureTime: departureTime,
                departureDate: tripDateStart,
                arrivalDate: tripDateEnd,
                service: service,
                operator: operator,
                description: description,
                eTicketLink: eTicketLink,
            },
        };
        console.log("JI: ", journey);
        await addLocation(from, fromCountry);
        await addLocation(to, toCountry);
        submit(journey);
    }
}

onMount(() => {
        const settings = JSON.parse(localStorage.getItem('settings'));
        if (settings.darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    });

    
</script>

<style>
    .loader{margin-top:12px;width:24px;height:24px;border:3px solid rgb(50,50,50);border-bottom-color:transparent;border-radius:50%;display:inline-block;box-sizing:border-box;animation:rotation 1s linear infinite}@keyframes rotation{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
    </style>