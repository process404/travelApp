<Nav ver="back"/>
    <div class="flex flex-col items-center h-screen justify-start">
        <div class="h-full max-w-[1000px] w-full flex flex-col">
            <div class="flex flex-col items-center border-[1px] rounded-md border-neutral-700 sm:ml-8 ml-4 mr-4 sm:mr-8 h-full sm:pt-6 sm:pb-6 pl-4 pr-4 pb-2">
                <h2 class="text-white text-xl font-semibold sm:mt-1 mt-3">Add Log</h2>
                <div class="border-[1px] border-neutral-700 rounded-md sm:mt-8 mt-4 w-full max-w-[500px] p-4">
                    <h3 class="text-neutral-300 italic">Location</h3>
                    <div class="relative">
                        <div class="flex items-center justify-center gap-3 mr-1">
                            <div class="relative w-full">
                                <input minlength="3" placeholder="Enter location" class:non-empty={location.length > 0} class=" bg-opacity-30 text-sm rounded-sm w-full p-2 bg-neutral-700 border-0 border-b-[2px] border-neutral-600 mt-2 text-white placeholder:text-neutral-600 outline-none focus:border-b-blue-600 duration-100 " bind:value={location} on:keyup={() => promptSuggestions()}>
                                {#if locationSuggestions.length > 0}
                                <div class="absolute bottom-100 bg-neutral-700 border-[1px] border-neutral-800 00 p-2 w-full rounded-md rounded-t-none pl-4 pr-4 pb-4">
                                    {#each locationSuggestions.slice(0,6) as name}
                                        {#if name != location}
                                            <button on:click={selectLocation(name)} class="text-white w-full text-xs text-left after:absolute after:bottom-[-0.2rem] after:hover:w-[97%] after:h-[1px] after:bg-white after:left-0 after:duration-100 after:w-0 before:absolute before:w-[97%] before:left-0 before:h-[1px] before:bg-neutral-600 before:top-1 first:before:hidden  pt-2 relative">{name}</button>
                                        {/if}
                                    {/each}
                                </div>
                                {/if}
                            </div>
                            {#if location.length > 0}
                                <button class="text-neutral-300 text-xs p-2 fadeButton" on:click={() => {location = ''}}>X</button>
                            {/if}
                        </div>
                    </div>
                </div>
                <div class="border-[1px] border-neutral-700 rounded-md sm:mt-8 mt-4 w-full max-w-[500px] p-4">
                    <h3 class="text-neutral-300 italic">Numbers</h3>
                </div>
            </div>
        </div>
    </div>
<Footer/>

<script>
    import { onMount } from 'svelte';
    import Nav from '../../../lib/components/Nav.svelte';
    import Footer from '../../../lib/components/Footer.svelte';
    var combinedLocations = null;
    var locationSuggestions = []

    var location = ''

    onMount(() => {
        document.title = 'Add Log';
        const stn = localStorage.getItem('stations');
        const loc = localStorage.getItem('locations');
        if(loc != null && stn != null){
            let joined = null
            if(stn.length == 0){
                joined = JSON.parse(loc);
            }else if(loc.length == 0){
                joined = JSON.parse(stn)
            }else{
                joined = JSON.parse(stn).concat(JSON.parse(loc));
            }
            combinedLocations = joined;
        }
        console.log(combinedLocations)
    });

    function promptSuggestions(){
        locationSuggestions = []
        if(location != ''){
            for(const item in combinedLocations){
                console.log(combinedLocations[item]['name'])
                if (combinedLocations[item]['name'].toLowerCase().includes(location)) {
                    locationSuggestions.push(combinedLocations[item]['name']);
                }
            }
        }
        console.log(location)
        console.log(locationSuggestions)
    }

    function selectLocation(name){
        location = name
        locationSuggestions = []
    }
</script>

<style>
    .non-empty{
        @apply border-b-blue-600 valid:border-blue-600 invalid:border-red-600
    }
    
    .fadeButton{
        @apply relative z-20
    }

    .fadeButton::before{
        border-radius: 50%;
    }

    .fadeButton{
        @apply before:w-0 before:h-full  before:bg-neutral-500 before:bg-opacity-30 before:absolute before:left-1/2 before:top-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:z-[-1] bg-white bg-opacity-[0.02] rounded-sm;
    }

    .fadeButton:hover:before{
       animation: boxFillIn 0.1s forwards;
    }

    .fadeButton:active:before{
        animation: boxFill 0.1s forwards;
    }

    .fadeButton:hover{
        @apply text-white
    }

    
    @keyframes boxFillIn{
        0%{
            width: 0%;
            border-radius: 100%;
        }
        100%{
            width: 100%;
            border-radius: 10%;
        }
    }
    
    @keyframes boxFillOut{
        0%{
            width: 100%;
            border-radius: 0;
        }
        100%{
            width: 100%;
            border-radius: 100%;
        }
    }
    



</style>
