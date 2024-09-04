
<div class="w-screen h-auto pb-16 flex flex-col overflow-x-hidden" style="background: rgb(255,255,255)">
    <div class="w-full h-auto p-2 flex items-center justify-between non-print mb-4">
        <div class="flex gap-2">
            <button class="fadeButton dark p-3 text-sm" on:click={() => window.history.back()}>Go Back</button>
            <button class="fadeButton green p-3 text-sm pl-6 pr-6" on:click={print}>Print</button>
        </div>
        <h3 class="text-xs w-1/2 text-right">This header will not show when you click print. <br><b>Desktop recommended.</b></h3>
    </div>
    {#if plan}
    <div class="ml-6 mr-6 mb-4 flex justify-between items-center">
        <div>
            <h2 class="font-bold text-xl">{$titleSet}</h2>
            {#if plan.description}
            <h3 class="font-regular italic text-sm mt-1">{$descriptionSet}</h3>
            {:else}
            <h3 class="font-regular italic text-sm mt-1">{GD()}</h3>
            {/if}
        </div>
        <div class="flex gap-6">
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
        </div>
    </div>
    <div class="ml-6 mr-6">
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
                            <td colspan="7" class="bg-gray-200 font-semibold italic p-1">Day {day.day}</td>
                        </tr>
                        {#each day.journeys as journey}
                            <tr>
                                <td class="border border-neutral-200 p-1">{journey.service}</td>
                                <td class="border border-neutral-200 p-1 bg-gray-100 font-bold text-center">{journey.departure}</td>
                                <td class="border border-neutral-200 p-1 bg-gray-100 font-bold text-center">{journey.arrival}</td>
                                <td class="border border-neutral-200 p-1">{journey.from}</td>
                                <td class="border border-neutral-200 p-1">{journey.to}</td>
                                <td class="border border-neutral-200 p-1 bg-gray-100 text-left">{journey.operator}</td>
                                {#if journey.description != '' && journey.description != null}
                                    <td class="border border-neutral-200 p-1">{journey.description}</td>
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
                {:else}
                    <tr>
                        <td colspan="7" class="text-center">Loading...</td>
                    </tr>
                {/if}
            </tbody>
        </table>
    </div>
    {/if}
</div>

<script>
    import { page } from '$app/stores';
    import Nav from '../../../../../lib/components/Nav.svelte';
    import Footer from '../../../../../lib/components/Footer.svelte';
    import '../../../../../global.css'
    var param = $page.params.trip;
    let calcDaysWr = writable('')
    let titleSet = writable('No title set')
    let descriptionSet = writable('No description set')
    let plan = {}

    function print(){
        window.print();
    }

    import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

    onMount(() => {
        document.title = 'Print Window';
        if (localStorage.getItem('planning')) {
            let plansFromDB = JSON.parse(localStorage.getItem('planning'));
            plan = plansFromDB.find((plan) => plan.tripID === param);
            if(plan){
                // console.log(plan)
                calcDays(plan.start, plan.end)
                titleSet.set(UC(plan.name))
                descriptionSet.set(UC(plan.description))
                document.title = "Print (" + plan.name + ")"

    
            }
        }
    });

    function UC(str) {
        if (str) {
            return str.toUpperCase();
        }
        return '';
    }

    function formatDate(date){
        let d = new Date(date);
        let day = d.getDate();
        let month = d.getMonth() + 1;
        let year = d.getFullYear();
        return `${day}/${month}/${year}`;
    }

    function calcDays(start, end){
        let startDate = new Date(start);
        let endDate = new Date(end);
        let timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
        let days = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
        calcDaysWr.set(days)        
        return days;
    }

    function GD() {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        const hours = String(today.getHours()).padStart(2, '0');
        const minutes = String(today.getMinutes()).padStart(2, '0');
        const seconds = String(today.getSeconds()).padStart(2, '0');
        return `Generated ${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }


</script>

<style>
    @media print {
        .non-print {
            display: none;
        }
    }
</style>