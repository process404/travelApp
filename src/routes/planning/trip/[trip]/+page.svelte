{#if tooltip || tooltip2}   
<button class="w-screen h-screen fixed z-10 hover:cursor-default" on:click={() => {tooltip = false; tooltip2 = false}}></button>
{/if}
{#if addJourney}
<AddJourney on:message={addJourneyFinal} day={addJourneyDay}/>
{/if}
{#if editJourney}
<EditJourney on:message={editJourneyFinal} day={editJourneyDay} journey={journeyToEdit}/>
{/if}
<div class="flex flex-col h-screen">
    <Nav ver="back"/>
        <div class="flex flex-col items-center h-full justify-start overflow-y-scroll customScrollbar overflow-x-hidden">
            <div class="max-w-[1000px] w-full flex flex-col h-full">
                <div class="flex flex-col items-center border-[1px] rounded-md border-neutral-700 sm:ml-8 ml-4 mr-2 sm:mr-8 sm:pt-4 sm:pb-6 pl-4 pr-3 pb-4 overflow-y-scroll customScrollbar h-full">
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
                            <div class="absolute top-[125%] left-0 bg-black p-2 rounded-md z-20 min-w-[150px]">
                                <div class="triangle w-4 h-2 bg-black absolute bottom-[99%]"></div>
                                <input class="standardInput non-empty" bind:value={editName} placeholder="Edit name" on:keyup={callEdit} on:input={submitChanges} maxlength="20" minlength="3">
                                <button class="fadeButton red text-md pl-2 pr-2 w-full mt-2" on:click={deletePlan}>Delete Plan</button>
                            </div>
                        {/if}
                        <div class="relative">
                            {#if $tripDescription == ''}
                                <button class="text-neutral-500 italic text-xs hover:border-white border-[1px] border-transparent" on:click={() => {tooltip2 = !tooltip2}}>[No Description]</button>
                            {:else}
                                <button class="text-neutral-500 italic text-xs hover:border-white border-[1px] border-transparent" on:click={() => {tooltip2 = !tooltip2}}>{$tripDescription}</button>
                            {/if}
                            {#if tooltip2}
                                <div class="absolute top-[125%] left-0 bg-black p-2 rounded-md z-20 min-w-[150px]">
                                    <div class="triangle w-4 h-2 bg-black absolute bottom-[99%]"></div>
                                    <input class="standardInput non-empty" bind:value={editDescription} placeholder="Edit description" on:keyup={callEditDesc} on:input={submitChangesDesc} maxlength="20" minlength="3">
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
                        <div class="w-full pl-1 flex-col justify-center items-center  max-w-[600px]">
                            {#each thisTrip.days as day}
                                <div class="border-[1px] border-neutral-700 rounded-md w-full p-2 h-auto min-h-[150px] first:mt-0 mt-4">
                                    <div class="flex justify-between w-full items-center flex-wrap">
                                        <h2 class="text-white italic">Day {day.day}</h2>
                                        <button class="fadeButton blue p-1 text-sm" on:click={addJourneyFn(day)}>Add</button>
                                    </div>
                                    <hr class="mt-2 border-neutral-700 mb-2">
                                    <div class="flex flex-col gap-3 mt-3">
                                        {#each day.journeys as journey}
                                            <div class="border-[1px] bg-black bg-opacity-30 border-neutral-800 rounded-md p-2 flex flex-col gap-2">
                                                <div class="flex justify-between items-center">
                                                    <div class="flex flex-col gap-1 items-start">
                                                        <h3 class="text-white text-md"><span class="w-full inline-block sm:w-auto">{journey.from}</span> <span class="text-sm italic sm:ml-2 sm:mr-2 mr-1 opacity-30">to</span> {journey.to}</h3>
                                                        <div class="flex gap-2 flex-wrap mt-1">
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
                                                                  <h4 class="text-white text-sm">{journey.departure} <span class="opacity-50 italic ml-1 mr-1">to</span> {journey.arrival}</h4>
                                                            </div>
                                                            <div class="flex gap-2 items-center bg-neutral-800 rounded-md p-1 pl-2 pr-2">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock fill-white opacity-30" viewBox="0 0 16 16">
                                                                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
                                                                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
                                                                  </svg>
                                                                  <h4 class="text-white text-sm">{calcTime(journey.departure, journey.arrival)}</h4>
                                                            </div>
                                                            <div class="flex gap-2 items-center bg-neutral-800 rounded-md p-1 pl-2 pr-2">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sticky fill-white opacity-30" viewBox="0 0 16 16">
                                                                    <path d="M2.5 1A1.5 1.5 0 0 0 1 2.5v11A1.5 1.5 0 0 0 2.5 15h6.086a1.5 1.5 0 0 0 1.06-.44l4.915-4.914A1.5 1.5 0 0 0 15 8.586V2.5A1.5 1.5 0 0 0 13.5 1zM2 2.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .5.5V8H9.5A1.5 1.5 0 0 0 8 9.5V14H2.5a.5.5 0 0 1-.5-.5zm7 11.293V9.5a.5.5 0 0 1 .5-.5h4.293z"/>
                                                                  </svg>
                                                                  <h4 class="text-white text-sm">{journey.description}</h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="w-1/2 flex flex-col gap-2 sm:flex-row sm:w-1/5">
                                                        <button class="fadeButton blue2 p-1 text-xs w-full" on:click={callEditJourney(journey, day.day)}>Edit</button>
                                                        <button class="fadeButton red p-1 text-xs w-full" on:click={deleteJourney(journey)}>Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        {/each}
                                    </div>
                                </div>
                            {/each} 
                            <div class="mt-8 border-neutral-700 border-[1px] p-2 flex rounded-md gap-2">
                                <button class="fadeButton green p-2 w-full">Copy plan data</button>
                                <button class="fadeButton blue p-2 w-full" on:click={goPrint}>Print</button>
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
    var param = $page.params.trip;
    var tooltip = false;
    var tooltip2 = false;
    var addJourney = false;
    var editJourney = false;

    var editName = ''
    var editDescription = ''

    var tripName = writable('');
    var tripDescription = writable('');
    var thisTrip = null;
    var addJourneyDay = ''
    var editJourneyDay = ''
    let storage = []


    // Check if running in the browser before accessing localStorage
    if (typeof window !== 'undefined') {
        storage = JSON.parse(localStorage.getItem('planning')) || [];
    }

    function getPlan(){
        for(const plan in storage){
            console.log(storage[plan])
            if(storage[plan].tripID == param){
                tripName.set(storage[plan].name);
                tripDescription.set(storage[plan].description);
                thisTrip = storage[plan];
                editName = storage[plan].name;
                editDescription = storage[plan].description;
            }
        }
    }

    onMount(() => {
        document.title = 'Trip';
        getPlan();
    });

    function callEdit(){
        tripName.set(editName);
    }

    function callEditDesc(){
        tripDescription.set(editDescription);
    }


    function deletePlan(){
        var plan = thisTrip;
        if(confirm("Are you sure you would like to delete plan '" + plan.name  + "'? THIS IS A PERMANENT ACTION AND CANNOT BE UNDONE.")){
            var storage = JSON.parse(localStorage.getItem('planning'));
            for(const plan in storage){
                if(storage[plan].tripID == param){
                    storage.splice(plan, 1);
                    localStorage.setItem('planning', JSON.stringify(storage));
                    window.location.href = '/planning';
                }
            }
        }
    }

    function submitChanges(){
        var storage = JSON.parse(localStorage.getItem('planning'));
        for(const plan in storage){
            if(storage[plan].tripID == param){
                storage[plan].name = editName;
                localStorage.setItem('planning', JSON.stringify(storage));
            }
        }
    }

    function submitChangesDesc(){
        var storage = JSON.parse(localStorage.getItem('planning'));
        for(const plan in storage){
            if(storage[plan].tripID == param){
                storage[plan].name = editDescription;
                localStorage.setItem('planning', JSON.stringify(storage));
            }
        }
    }

    let addDay = ''

    function addJourneyFn(day){
        addJourney = true;
        addJourneyDay = day.day;
        addDay = day;
    }


    function addJourneyFinal(data){
        console.log(data.detail.text);
        addJourney = false;
        for(const plan in storage){
            if(storage[plan].tripID == param){
                for(const day in storage[plan].days){
                    if(storage[plan].days[day].day == data.detail.text.day){
                        storage[plan].days[day].journeys.push(data.detail.text.journey);
                        localStorage.setItem('planning', JSON.stringify(storage));
                        getPlan();
                    }
                }
            }
        }
    }

    let journeyToEdit

    function callEditJourney(journey, day){
        editJourney = true;
        journeyToEdit = journey;
        console.log(day);
        editJourneyDay = day;
    }

    function editJourneyFinal(data){
        console.log(data.detail.text);
        editJourney = false;
        for(const plan in storage){
            if(storage[plan].tripID == param){
                for(const day in storage[plan].days){
                    console.log("A", storage[plan].days[day].day, data.detail.text.day)
                    if(storage[plan].days[day].day == data.detail.text.day){
                        console.log("B", storage[plan].days[day].journeys)
                        for(const journey in storage[plan].days[day].journeys){
                            console.log("C", storage[plan].days[day].journeys[journey])
                            if(storage[plan].days[day].journeys[journey].code = data.detail.text.journey.code){
                                console.log("D", storage[plan].days[day].journeys[journey])
                                storage[plan].days[day].journeys[journey] = data.detail.text.journey;
                                localStorage.setItem('planning', JSON.stringify(storage));
                                getPlan();
                            }
                        }
                    }
                }
            }
        }
    }

    function calcTime(departure, arrival){
        var dep = new Date();
        var arr = new Date();
        var [depHour, depMinute] = departure.split(':');
        var [arrHour, arrMinute] = arrival.split(':');
        dep.setHours(depHour, depMinute);
        arr.setHours(arrHour, arrMinute);
        var diff = arr - dep;
        var hours = Math.floor(diff / 1000 / 60 / 60);
        diff -= hours * 1000 * 60 * 60;
        var minutes = Math.floor(diff / 1000 / 60);
        return `${hours}h ${minutes}m`;
    }

    function deleteJourney(journey){
        if(confirm("Are you sure you would like to delete this journey?")){
            for(const plan in storage){
                if(storage[plan].tripID == param){
                    for(const day in storage[plan].days){
                        if(storage[plan].days[day].day == addJourneyDay){
                            storage[plan].days[day].journeys = storage[plan].days[day].journeys.filter(j => j !== journey);
                            localStorage.setItem('planning', JSON.stringify(storage));
                            getPlan();
                        }
                    }
                }
            }
        }
    }

    function goPrint(){
        window.location.href = '/planning/trip/' + param + '/print';
    }


</script>

<style>
    .loader{margin-top:12px;width:24px;height:24px;border:3px solid rgb(50,50,50);border-bottom-color:transparent;border-radius:50%;display:inline-block;box-sizing:border-box;animation:rotation 1s linear infinite}@keyframes rotation{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}

    .triangle{
        clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    }
</style>