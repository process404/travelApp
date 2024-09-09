<CustomAlert mode={$alrtMode} active={$alrtAct} text={$alrtTxt} on:close={() => $alrtAct = false} />
<button class="fixed w-full h-screen bg-black z-30 bg-opacity-10 backdrop-blur-xl flex items-center justify-center overflow-y-scroll" on:mousedown|self={close}>
    <div class="bg-neutral-900 w-[90%] max-w-[800px] h-[90%] overflow-y-scroll rounded-md p-4 ml-3 pl-6 z-40 cursor-default border-[1px] border-neutral-700 flex flex-col">
        <div class="flex justify-between items-center">
            <h2 class="text-white text-2xl font-semibold text-left">Edit Journey <h4 class="text-neutral-500 italic text-xs inline-block sm:ml-2">( Day {day} )</h4></h2>
            <button class="button red p-1 pl-3 pr-3" on:click={close}>Cancel</button>
        </div>
        <hr class="mt-2 mb-4 border-neutral-700">
        <div class="flex gap-2 mt-4 border-[1px] border-neutral-700 rounded-md p-2 pb-3 sm:flex-row flex-col">
            <div class="w-full">
                <h3 class="text-neutral-300 italic text-left mb-1">From</h3>
                <PromptField ds="{locations}" on:select={selectFrom} bind:value={from} ver="loc" bind:presetC={fromCountry}/>
            </div>
            <div class="w-full">
                <h3 class="text-neutral-300 italic text-left mb-1">To</h3>
                <PromptField ds="{locations}" on:select={selectTo} bind:value={to} ver="loc" bind:presetC={toCountry}/>
            </div>
        </div>
        <div class="flex gap-3 mt-4 border-[1px] border-neutral-700 rounded-md p-2 pb-3 items-center md:flex-row flex-col">
            <div class="w-full flex gap-3">
                <div class="md:w-2/4 w-full">
                    <h3 class="text-neutral-300 italic text-left mb-1 text-sm">Departure Time</h3>
                    <input class="input blue iconEdit w-full" type="time" bind:value={departure}/>
                </div>
                <div class="md:w-2/4 w-full">
                    <h3 class="text-neutral-300 italic text-left mb-1 text-sm">Arrival Time</h3>
                    <input class="input blue iconEdit w-full" type="time" bind:value={arrival}/>
                </div>
            </div>
            <div class="md:w-1/2 w-full">
                <h3 class="text-neutral-300 italic text-left mb-1 text-sm">Service</h3>
                <input class="input blue w-full"  bind:value={service}/>
            </div>
            <div class="w-full">
                <h3 class="text-neutral-300 italic text-left mb-1 text-sm">Operator</h3>
                <input class="input blue w-full"  bind:value={operator}/>
            </div>
        </div>
        <div class="flex gap-3 mt-4 border-[1px] border-neutral-700 rounded-md p-2 pb-3 items-center md:flex-row flex-col">
            <div class="w-full">
                <h3 class="text-neutral-300 italic text-left mb-1 w-full">Description</h3>
                <textarea class="input blue text-xs resize-none w-full" maxlength="500" rows="4" placeholder="" bind:value={description}></textarea>
            </div>
        </div>
        <div class="flex gap-3 mt-auto border-[1px] border-neutral-700 rounded-md p-2 pb-2 items-center md:flex-row flex-col">
            <div class="w-full flex">
                <button class="button green w-full p-2" on:click={addJourneyConfirm}>Edit</button>
            </div>
        </div>
    </div>
</button>

<script>
import { createEventDispatcher, onMount } from "svelte";
const dispatch = createEventDispatcher();

export let day;
export let journey;

import PromptField from "../../../../lib/components/PromptField.svelte";
import CustomAlert from "../../../../lib/components/Alert.svelte";
import { writable } from "svelte/store";

let from = journey.from,
fromCountry = journey.fromCountry,
    to = journey.to,
    toCountry = journey.toCountry,
    arrival = journey.arrival,
    departure = journey.departure,
    service = journey.service,
    operator = journey.operator,
    description = journey.description,
    code = journey.code,
    alrtMode = writable("err"),
    alrtTxt = writable(""),
    alrtAct = writable(false);

function close(o) {
    dispatch("message", { text: "close" });
}

function submit(o) {
    dispatch("message", { text: o });
}

let locations = [];
try {
    const o = localStorage.getItem("locations");
    locations = JSON.parse(o) || [];
} catch (o) {}

function selectFrom(o) {
    from = o.detail.text;
    console.log(from, to);
}

function selectTo(o) {
    to = o.detail.text;
    console.log(from, to);
}

function cLS(o) {
    if (localStorage.getItem("locations")) {
        locations.find((e) => e.toLowerCase() === o.toLowerCase())
            ? console.log("Location already exists")
            : (locations.push(o),
                localStorage.setItem("locations", JSON.stringify(locations)),
                console.log("Location added"));
    } else
        (locations.push(o),
        localStorage.setItem("locations", JSON.stringify(locations)),
        console.log("Location added"));
}

function addJourneyConfirm() {
    if (
        null == from ||
        null == to ||
        null == arrival ||
        null == departure
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
                to: to,
                toCountry: toCountry,
                arrival: arrival,
                departure: departure,
                service: service,
                operator: operator,
                description: description,
            },
        };
        console.log("JI: ", o);
        submit(o);
        cLS(from);
        cLS(to);
    }
}
</script>
