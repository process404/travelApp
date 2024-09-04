{#if tooltip}
<button class="w-screen h-screen fixed z-10 hover:cursor-default" on:click={() => {tooltip = false}}></button>
{/if}
{#if addJourney}
<AddJourney on:message={addJourneyToDay} day={addJourneyDay}/>
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
                    <div class="flex gap-3 items-center mt-5 sm:mt-0 mb-5 relative">
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
                                        <button class="fadeButton blue p-1 text-sm" on:click={addJourneyFn(day)}>Add Journey</button>
                                    </div>
                                    <hr class="mt-2 border-neutral-700 mb-2">
                                </div>
                            {/each} 
                            <div class="mt-8 border-neutral-700 border-[1px] p-2 flex rounded-md gap-2">
                                <button class="fadeButton green p-2 w-full">Copy plan data</button>
                                <button class="fadeButton blue p-2 w-full">Print</button>
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
    import '../../../../global.css';
    import { page } from '$app/stores';
	import { writable } from 'svelte/store';
    var param = $page.params.trip;
    var tooltip = false;
    var addJourney = true;

    var editName = ''

    var tripName = writable('');
    var thisTrip = null;
    var addJourneyDay = ''
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
                thisTrip = storage[plan];
                editName = storage[plan].name;
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

    let addDay = ''

    function addJourneyFn(day){
        addJourney = true;
        addJourneyDay = day.day;
        addDay = day;
    }


    function addJourneyToDay(data){
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


</script>

<style>
    .loader{margin-top:12px;width:24px;height:24px;border:3px solid rgb(50,50,50);border-bottom-color:transparent;border-radius:50%;display:inline-block;box-sizing:border-box;animation:rotation 1s linear infinite}@keyframes rotation{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}

    .triangle{
        clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    }
</style>