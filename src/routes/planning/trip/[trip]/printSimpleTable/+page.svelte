
<main style="width: 100vw; display: flex; flex-direction: column; overflow-y:scroll; background: rgb(255,255,255)" class="pb-16" id="app">
    <section class="w-full h-auto p-2 flex items-center justify-between non-print mb-4">
        <div class="flex gap-2">
            <button class="button dark p-3 text-sm wider2 taller" on:click={() => window.history.back()}>Go Back</button>
            <button class="button green p-3 text-sm pl-6 pr-6 wider2 taller" on:click={print}>Print</button>
        </div>
        <h3 class="text-xs w-1/2 text-right">This header will not show when you click print. <br><b>Desktop recommended.</b></h3>
    </section>
    {#if plan}
    <section class="ml-6 mr-6 mb-4 flex justify-between items-center">
        <article>
            <h2 class="font-bold text-xl">{$titleSet}</h2>
            {#if plan.description}
            <h3 class="font-regular italic text-sm mt-1">{$descriptionSet}</h3>
            {:else}
            <h3 class="font-regular italic text-sm mt-1">{GD()}</h3>
            {/if}
        </article>
        <article class="flex gap-6">
            <div class="flex items-center">
                {#if plan.days && plan.days.length > 1}
                    <h2 class="font-bold text-xl">{$calcDaysWr} DAYS</h2>
                {:else if plan.days && plan.days.length === 1}
                    <h2 class="font-bold text-xl">1 DAY</h2>
                {/if}
            </div>
            <div>
                <h2 class="font-semibold text-md text-right">{formatDate(plan.start)}</h2>
                <h3 class="font-semibold text-md mt-1 text-right">{formatDate(plan.end)}</h3>
            </div>
        </article>
    </section>
    <section class="ml-6 mr-6">
        <table class="table-auto w-full">
            <thead class="bg-black">
                <th class="text-white w-[7%] text-left">ID</th>
                <th class="text-white w-[3%]  text-left">DEP</th>
                <th class="text-white w-[3%] text-left">ARR</th>
                <th class="text-white w-[15%] text-left">FROM</th>
                <th class="text-white w-[15%] text-left">TO</th>
                <th class="text-white text-left w-[5%]">OP</th>
                <th class="text-white w-[20%] text-left">NOTE</th>
            </thead>
            <tbody class="border-[1px]">
                {#if plan.days && plan.days.length > 0}
                    {#each plan.days as day}
                        <tr class="border-[1px] border-neutral-200">
                            <td colspan="7" class="bg-gray-200 font-semibold italic p-1 text-sm">Day {day.day}</td>
                        </tr>
                        {#each sortJourneys(day.journeys) as journey}
                            <tr>
                                <td class="border border-neutral-200 p-1 text-xs">{journey.service}</td>
                                <td class="border border-neutral-200 p-1 bg-gray-100 font-bold text-center text-xs">{journey.departureTime}</td>
                                <td class="border border-neutral-200 p-1 bg-gray-100 font-bold text-center text-xs">{journey.arrivalTime}</td>
                                <td class="border border-neutral-200 p-1 text-xs">{journey.from} ({journey.fromCountry})</td>
                                <td class="border border-neutral-200 p-1 text-xs">{journey.to} ({journey.toCountry})</td>
                                <td class="border border-neutral-200 p-1 bg-gray-100 text-left text-xs">{journey.operator}</td>
                                {#if journey.description != '' && journey.description != null}
                                    <td class="border border-neutral-200 p-1 text-xs">{journey.description}</td>
                                {:else}
                                    <td class="border border-neutral-200 p-1"></td>
                                {/if}
                                {#if journey.eTicketLink}
                                    <td class="border border-neutral-200 p-1 text-xs">
                                        <a href={journey.eTicketLink} target="_blank">eTicket</a>
                                    </td>
                                {:else}
                                    <td class="border border-neutral-200 p-1"></td>
                                {/if}
                            </tr>
                        {/each}
                        {#if day.journeys.length === 0}
                            <tr>
                                <td colspan="7" class="text-center">No journeys for this day</td>
                            </tr>
                        {/if}
                    {/each}
                    <tr class="border-[1px] border-neutral-200">
                        <td colspan="7" class="bg-gray-200 font-semibold italic p-1">Spare Row</td>
                    </tr>
                    {#each {length: 12} as _, i}
                        <tr>
                            <td class="border border-neutral-200 p-1 h-[25px]"></td>
                            <td class="border border-neutral-200 p-1 bg-gray-100 font-bold text-center h-[25px]"></td>
                            <td class="border border-neutral-200 p-1 bg-gray-100 font-bold text-center h-[25px]"></td>
                            <td class="border border-neutral-200 p-1 h-[20px]"></td>
                            <td class="border border-neutral-200 p-1 h-[25px]"></td>
                            <td class="border border-neutral-200 p-1 bg-gray-100 text-left h-[25px]"></td>
                            <td class="border border-neutral-200 p-1 h-[25px]"></td>
                        </tr>
                        {/each}
                    <!-- New section for uploaded files -->
                    {#if allUploadedFiles.length > 0}
                        <section>
                            <h2>Uploaded Files</h2>
                            <ul>
                                {#each allUploadedFiles as [fileName, file]}
                                    <li><a href={URL.createObjectURL(file)} target="_blank">{fileName}</a></li>
                                {/each}
                            </ul>
                        </section>
                    {/if}
                    {:else}
                    <tr>
                        <td colspan="7" class="text-center">Loading...</td>
                    </tr>
                {/if}
            </tbody>
        </table>
    </section>
    {/if}
</main>

<script>
    import { page } from "$app/stores";
    import "../../../../../global.css";
    import { get } from 'svelte/store';
    import { writable } from "svelte/store";
    import { onMount } from "svelte";
    import '../../../../siteDB.js';
	import { getPlanningData } from "../../../../siteDB.js";

    var param = $page.params.trip;
    let calcDaysWr = writable(""),
        titleSet = writable("No title set"),
        descriptionSet = writable("No description set"),
        plan = {};

    let allUploadedFiles = [];

    function print() {
        window.print();
    }

    function UC(t) {
        return t ? t.toUpperCase() : "";
    }

    function formatDate(t) {
        let e = new Date(t);
        return `${e.getDate()}/${e.getMonth() + 1}/${e.getFullYear()}`;
    }

    function calcDays(t, e) {
        let a = new Date(t),
            n = new Date(e),
            r = Math.abs(n.getTime() - a.getTime()),
            i = Math.ceil(r / 864e5) + 1;
        return calcDaysWr.set(i), i;
    }

    function GD() {
        const t = new Date();
        return `Generated ${String(t.getDate()).padStart(2, "0")}/${String(t.getMonth() + 1).padStart(2, "0")}/${t.getFullYear()} ${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}:${String(t.getSeconds()).padStart(2, "0")}`;
    }

    function collectUploadedFilesAndETickets() {
        allUploadedFiles = [];
        allETicketLinks = [];
        plan.days.forEach(day => {
            day.journeys.forEach(journey => {
                if (journey.uploadedFiles) {
                    allUploadedFiles.push(...Object.entries(journey.uploadedFiles));
                }
                if (journey.eTicketLink) {
                    allETicketLinks.push(journey.eTicketLink);
                }
            });
        });
    }

    onMount(async () => {
        let t = await getPlanningData();
        console.log(t)
        plan = t.find(t => t.tripID === param),
        console.log(t)
        collectUploadedFilesAndETickets(),
        plan && (calcDays(plan.start, plan.end), titleSet.set(UC(plan.name)), descriptionSet.set(UC(plan.description)), document.title = "Print (" + plan.name + ")");
    });

    function sortJourneys(journeys) {
        journeys.sort((a, b) => {
            const departureTimeA = new Date(`2000-01-01 ${a.departureTime}`);
            const departureTimeB = new Date(`2000-01-01 ${b.departureTime}`);
            return departureTimeA - departureTimeB;
        });
        return journeys;
    }
</script>

<style>
    @media print {.non-print {display: none;}}
</style>