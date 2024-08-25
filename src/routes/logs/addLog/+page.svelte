<Nav ver="back"/>
    <div class="flex flex-col items-center h-screen justify-start">
        <div class="h-full max-w-[1000px] w-full flex flex-col">
            <div class="flex flex-col items-center border-[1px] rounded-md border-neutral-700 sm:ml-8 ml-4 mr-4 sm:mr-8 h-full sm:pt-6 sm:pb-6 pl-4 pr-4 pb-2 overflow-y-scroll customScrollbar">
                <h2 class="text-white text-xl font-semibold sm:mt-1 mt-3">Add Log</h2>
                <div class="border-[1px] border-neutral-700 rounded-md sm:mt-8 mt-4 w-full max-w-[500px] p-4">
                    <h3 class="text-neutral-300 italic">Location</h3>
                    <div class="relative">
                        <div class="flex items-center justify-center gap-3 mr-1">
                            <div class="relative w-full">
                                <input minlength="3" placeholder="Enter location" class:non-empty={location.length > 0} class="mt-2 standardInput" bind:value={location} on:keyup={() => promptSuggestions()}>
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
                                <button class="p-2 fadeButton" on:click={() => clearLocation()}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg w-3 h-3" viewBox="0 0 16 16">
                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                                  </svg></button>
                            {/if}
                        </div>
                    </div>
                </div>
                <div class="border-[1px] border-neutral-700 rounded-md sm:mt-8 mt-4 w-full max-w-[500px] p-4">
                    <h3 class="text-neutral-300 italic">Numbers</h3>
                    <div class="mt-2 flex gap-2 items-center flex-wrap">
                        <div class="flex border-[1px] p-1 rounded-md border-neutral-800 gap-1 w-full">
                            <input placeholder="Enter Number" class="standardInput" on:keydown={handleKeyPressNumber} >
                            <button class="fadeButton p-1" on:click={() => typeDropdown = !typeDropdown}>
                            {#if !typeDropdown}
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-short w-5 h-5" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4"/>
                              </svg>
                            {/if}
                            {#if typeDropdown}
                              
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-short w-5 h-5" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5"/>
                              </svg>
                            {/if}
                            </button>
                            <button class="fadeButton p-[0.2rem] blue" on:click={() => {addBlankNumber()}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus w-5 h-5" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                            </svg></button>
                        </div>
                        {#if trainNumbers.length != 0}
                            <ul>
                                {#each $trainNumbers as train}
                                    <li>
                                    </li>
                                {/each}
                            </ul>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    </div>
<Footer/>

<script>
    import { onMount, tick } from 'svelte';
    import Nav from '../../../lib/components/Nav.svelte';
    import Footer from '../../../lib/components/Footer.svelte';
	import { writable } from 'svelte/store';
    var combinedLocations = null;
    var locationSuggestions = []
    var trainNumbers = writable([])
    var dbWriteable = writable([])
    var typeDropdown = false;

    var db = import ('../../../db/database.json');
    dbWriteable.set(db)

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
        // console.log(combinedLocations)
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
        // console.log(location)
        // console.log(locationSuggestions)
    }

    function selectLocation(name){
        location = name
        locationSuggestions = []
    }

    function clearLocation(){
        location = ''
        locationSuggestions = []
    }

    function addBlankNumber(){
        trainNumbers.update(numbers => {
            return [...numbers, {"name":"train","type":"","variant":"", "dropdown":false}];
        });
        
    }

    function handleKeyPressNumber(e){
        console.log(e)
        if(e.key == 'Enter'){
            addBlankNumber()
        }
        tick().then(() => {
            if (newInput) {
                newInput.focus();
            }
        });
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
        @apply text-neutral-300 before:w-0 before:h-full  before:bg-neutral-500 before:bg-opacity-30 before:absolute before:left-1/2 before:top-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:z-[-1] bg-white bg-opacity-[0.02] rounded-sm;
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

    .fadeButton.blue{
        @apply bg-blue-700  before:bg-blue-300 before:bg-opacity-20
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

    .standardInput{
        @apply bg-opacity-30 text-sm rounded-sm w-full p-2 bg-neutral-700 border-0 border-b-[2px] border-neutral-600 text-white placeholder:text-neutral-600 outline-none focus:border-b-blue-600 duration-100 invalid:border-b-red-600
    }

    .standardInput.reduced{
        @apply bg-opacity-30 text-xs rounded-sm w-full p-1 bg-neutral-700 border-0 border-b-[2px] border-neutral-600 text-white placeholder:text-neutral-600 outline-none focus:border-b-blue-600 duration-100 invalid:border-b-red-600
    }

            /* width */
            ::-webkit-scrollbar {
    width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        @apply bg-neutral-900
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
    @apply bg-black
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
    background: #555;
    }
    



</style>
