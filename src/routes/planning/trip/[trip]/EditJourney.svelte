<CustomAlert mode={$alrtMode} active={$alrtAct} text={$alrtTxt} on:close={() => $alrtAct = false} />
<div role="button" tabindex="0" class="fixed w-full h-screen dark:bg-black bg-neutral-500 z-30 bg-opacity-70 sm:backdrop-blur-md backdrop-blur-none flex items-center justify-center p-0" on:mousedown|self={close}>
    <main class="dark:bg-neutral-900 bg-neutral-200 w-[90%] max-w-[800px] h-[95%] overflow-y-scroll rounded-md p-4 z-40 cursor-default border-[1px] border-neutral-700 flex flex-col"  in:fade={{duration:100}} out:fade={{duration:100}}>
        <section class="flex justify-between items-center">
            <div>
                <h2 class="dark:text-white text-2xl font-semibold text-left">Edit Journey <h4 class="text-neutral-500 italic text-xs inline-block sm:ml-2 sm:inline-block hidden">( Day {day} )</h4></h2>
                <h4 class="text-neutral-500 italic text-xs sm:ml-2 inline-block sm:hidden">( Day {day} )</h4>
            </div>
            <button class="button red" style="padding-left:1rem; padding-right:1rem" on:click={close}>Cancel</button>
        </section>
        <hr class="mt-4 mb-2 border-neutral-700">
        <section class="flex gap-2 mt-4 border-[1px] border-neutral-700 rounded-md p-2 pb-3 sm:flex-row flex-col">
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
        </section>
        <section class="flex gap-3 mt-4 border-[1px] border-neutral-700 rounded-md p-2 pb-3 items-center md:flex-row flex-col">
            <div class="w-full flex gap-4">
                <div class="md:w-2/4 w-full">
                    <h3 class="dark:text-neutral-300 italic text-left mb-1 text-sm">Departure Date</h3>
                    <input class="input blue dark:iconEdit w-full" type="date" bind:value={departureDate}/>
                    <h3 class="dark:text-neutral-300 italic text-left mb-2  mt-2 text-sm">Departure Time</h3>
                    <input class="input blue dark:iconEdit w-full" type="time" bind:value={departureTime}/>
                </div>
                <div class="md:w-2/4 w-full">
                    <h3 class="dark:text-neutral-300 italic text-left mb-1 text-sm">Arrival Date</h3>
                    <input class="input blue dark:iconEdit w-full" type="date" bind:value={arrivalDate}/>
                    <h3 class="dark:text-neutral-300 italic text-left mb-2 mt-2 text-sm">Arrival Time</h3>
                    <input class="input blue dark:iconEdit w-full" type="time" bind:value={arrivalTime}/>                
                </div>
            </div>
            <div class="md:w-1/2 w-full sm:ml-3 ml-0">
                <h3 class="dark:text-neutral-300 italic text-left mb-1 text-sm">Service</h3>
                <input class="input blue w-full"  bind:value={service}/>
            </div>
            <div class="w-full">
                <h3 class="dark:text-neutral-300 italic text-left mb-1 text-sm">Operator</h3>
                <input class="input blue w-full"  bind:value={operator}/>
            </div>
        </section>
        <section class="flex gap-3 mt-4 border-[1px] border-neutral-700 rounded-md p-2 pb-3 items-center md:flex-row flex-col">
            <div class="w-full">
                <h3 class="dark:text-neutral-300 italic text-left mb-1 w-full">Description</h3>
                <textarea class="input blue text-xs resize-none w-full" maxlength="500" rows="4" placeholder="" bind:value={description}></textarea>
            </div>
        </section>
        <article class="flex gap-3 mt-4 border-[1px] border-neutral-700 rounded-md p-2 pb-3 items-center md:flex-row flex-col">
            <div class="w-full">
            <h3 class="dark:text-neutral-300 italic text-left mb-1 text-sm">E-Ticket Link</h3>
            <input class="input blue w-full" type="url" bind:value={eTicketLink} placeholder="Enter e-ticket link"/>
            </div>
            <div class="w-full">
            <h3 class="dark:text-neutral-300 italic text-left mb-1 text-sm">Upload Files</h3>
            <input class="input blue w-full" type="file" accept=".pdf,.jpg,.png" multiple on:change={handleFilesUpload}/>
            </div>
        </article>
        <article class="flex gap-3 mt-4 border-[1px] border-neutral-700 rounded-md p-2 pb-3 items-center md:flex-row flex-col">
            <div class="w-full">
            <h3 class="dark:text-neutral-300 italic text-left mb-1 text-sm">Uploaded Files</h3>
            <ul>
                {#each Object.values($uploadedFiles) as file}
                <button type="button" class=" button text-white italic flex justify-between items-center w-full" on:click={() => deleteFile(file.name)} on:keydown={(e) => e.key === 'Enter' && deleteFile(file.name)}>
                    <span class="w-full block">{file.name.slice(0,15)}</span>
                </button>
                {/each}
            </ul>
            </div>
        </article>
        
        <section class="flex gap-3 sm:mt-auto mt-4 border-[1px] border-neutral-700 rounded-md p-2 pb-2 items-center md:flex-row flex-col">
            <div class="w-full flex">
                <button class="button green w-full taller" on:click={addJourneyConfirm}>Edit Journey</button>
            </div>
        </section>
    </main>
</div>

<script>
import { fade, fly } from 'svelte/transition';
import { createEventDispatcher, onMount } from "svelte";
const dispatch = createEventDispatcher();

export let day;
export let journey;
export let allStns;

let loading = true;

import '../../../siteDB.js';
import { writePlanningData, writeLocationsData, writeJourneysData, writeLogsData, getPlanningData, getLocationsData, getJourneysData, getLogsData } from '../../../siteDB';
import extraStationsNonDs from '../../../../db/additionalStations.json'

import PromptField from "../../../../lib/components/PromptField.svelte";
import CustomAlert from "../../../../lib/components/Alert.svelte";
import { writable } from "svelte/store";

let uploadedFile = null;

function handleFilesUpload(event) {
    const files = event.target.files;
    uploadedFiles.update(currentFiles => {
        const newFiles = { ...currentFiles };
        for (let i = 0; i < files.length; i++) {
            newFiles[files[i].name] = files[i];
        }
        return newFiles;
    });
    console.log("Files uploaded:", get(uploadedFiles));
}

function deleteFile(name) {
    uploadedFiles.update(files => {
        delete files[name];
        return files;
    });
    console.log("Files uploaded:", get(uploadedFiles));
}


let from = journey.from, fromId = null, toId = null,
fromCountry = journey.fromCountry,
    to = journey.to,
    toCountry = journey.toCountry,
    arrivalDate = journey.arrivalDate,
    departureDate = journey.departureDate,
    arrivalTime = journey.arrivalTime,
    departureTime = journey.departureTime,
    service = journey.service,
    operator = journey.operator,
    description = journey.description,
    code = journey.code,
    alrtMode = writable("err"),
    alrtTxt = writable(""),
    alrtAct = writable(false),
    eTicketLink = journey.eTicketLink,
    uploadedFiles = writable(journey.uploadedFiles)

    onMount(() => {
        arrivalDate = arrivalDate.split("T")[0];
        departureDate = departureDate.split("T")[0];
    });

function close(o) {
    dispatch("message", { text: "close" });
}

function submit(o) {
    dispatch("message", { text: o });
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
    // console.log(from, to);
}

function selectTo(o) {
    to = o.detail.text.name;
    toId = o.detail.id;
    // console.log(from, to);
}

async function addLocation(location, country) {
    // console.log(locations);
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

async function addJourneyConfirm() {
    // console.log(from, to, fromId, toId, arrivalTime, departureTime, arrivalDate, departureDate);
    if (
        null == from ||
        null == to ||
        null == arrivalTime ||
        null == departureTime ||
        null == arrivalDate ||
        null == departureDate 
    ) {
        alrtTxt.set("Please fill in all fields");
        alrtAct.set(true);
        console.log("Please fill in all fields");
        return;
    }

    if (
        confirm("Please confirm you would like to edit this journey.")
    ) {
        let o = {
            day: day,
            journey: {
                code: code,
                from: from,
                fromCountry: fromCountry,
                fromId: fromId,
                to: to,
                toCountry: toCountry,
                toId: toId,
                arrivalTime: arrivalTime,
                departureTime: departureTime,
                arrivalDate: arrivalDate,
                departureDate: departureDate,
                service: service,
                operator: operator,
                description: description,
            },
        };
        console.log("JI: ", o);
        await addLocation(from, fromCountry);
        await addLocation(to, toCountry);
        submit(o);
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