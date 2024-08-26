<CustomAlert mode="err" active={true} />
<div class="flex flex-col h-screen">
    <Nav ver="back"/>
        <div class="flex flex-col items-center h-full justify-start overflow-y-scroll customScrollbar overflow-x-hidden">
            <div class="max-w-[1000px] w-full flex flex-col">
                <div class="flex flex-col items-center border-[1px] rounded-md border-neutral-700 sm:ml-8 ml-4 mr-2 sm:mr-4 sm:mr-8 h-full sm:pt-6 sm:pb-6 pl-4 pr-4 pb-4">
                    <h2 class="text-white text-xl font-semibold sm:mt-1 mt-3">Add Log</h2>
                    <div class="border-[1px] border-neutral-700 rounded-md sm:mt-8 mt-4 w-full max-w-[500px] p-4">
                        <h3 class="text-neutral-300 italic">Location</h3>
                        <div class="relative mt-2">
                            <div class="flex items-center justify-center gap-3 mr-1">
                                <div class="relative w-full">
                                    <!--TO-DO add precise location info and country selector-->
                                    <input minlength="3" placeholder="Enter location" class:non-empty={location.length > 0} class:inputDisabled={$noLocation} class="standardInput" bind:value={location} on:keyup={() => promptSuggestions()} disabled={$noLocation}>
                                    {#if locationSuggestions.length > 0}
                                    <div class="absolute bottom-100 bg-neutral-700 border-[1px] border-neutral-800 00 p-2 w-full rounded-md rounded-t-none pl-4 pr-4 pb-4 z-30">
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
                        <div class="mt-3 flex gap-2 items-center">
                            <input type="checkbox" class="fadeCheckbox" name="no_location" bind:checked={$noLocation}>
                            <label for="no_location" class="text-neutral-500 italic  text-xs">No location</label>
                        </div>
                    </div>
                    <div class="border-[1px] border-neutral-700 rounded-md sm:mt-8 mt-4 w-full max-w-[500px] p-4">
                        <h3 class="text-neutral-300 italic">Numbers</h3>
                        <div class="mt-2 flex gap-2 items-center flex-wrap">
                            <div class="flex  mb-2 rounded-md border-neutral-800 gap-1 w-full">
                                <input placeholder="Enter Number" class="standardInput" on:keydown={handleKeyPressNumber} bind:value={inputNumber}>
                                <!-- <button class="fadeButton p-1" on:click={() => typeDropdown = !typeDropdown}>
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
                                </button> -->
                                <button class="fadeButton p-[0.2rem] blue" on:click={() => {addNumber()}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus w-5 h-5" viewBox="0 0 16 16">
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                                </svg></button>
                            </div>
                            {#if trainNumbers.length != 0}
                                <ul class="border-[1px] border-neutral-800 w-full h-auto  p-2 flex md:flex-wrap gap-1 flex-nowrap flex-col md:flex-row">
                                    {#each $trainNumbers as train}
                                        <li class="relative inline-block p-0 m-0 h-6">
                                            <button on:click={() => {train['dropdown'] = !train['dropdown']}} class=" bg-blue-800 fadeButton blue2 textWhite pl-2 pr-2 h-6">{train['name']} ({train['type']} - {train['variant']})</button>
                                            {#if train['dropdown']}
                                                <button class="z-30 fixed w-screen h-screen hover:cursor-default" on:click={closeDropdown(train)}></button>
                                            {/if}
                                            {#if train['dropdown']}
                                            <div class="absolute z-40 left-0 top-100 bg-[rgb(15,15,15)] p-2 w-auto min-h-8 rounded-md rounded-t-none border-[1px] border-neutral-800 min-w-[75px]">
                                                {#if train['dropdown_2'] == ''}
                                                <div class="flex gap-2 min-w-[180px]">
                                                    <button class="text-white text-sm fadeButton red pl-2 pr-2 w-full" on:click={removeLog(train['id'])}>Remove</button>
                                                    <button class="text-white text-sm fadeButton blue pl-2 pr-2 w-full" on:click={() => train['dropdown_2'] = "area"}>Edit type</button>
                                                </div>
                                                {/if}

                                                {#if train.dropdown_2 === "area"}
                                                    <h3 class="text-white text-sm">Select Area</h3>
                                                    <div class="min-w-[200px] w-full flex flex-wrap gap-1 mt-1">
                                                        {#each trainAreas as area}
                                                            <button class="fadeButton text-sm blue2 textWhite pl-2 pr-2" on:click={() => inputAreaBtn(area, train)}>{area.area}</button>
                                                        {/each}
                                                    </div>
                                                {/if}
                                                {#if train.dropdown_2 === "type"}
                                                    <h3 class="text-white text-sm">Select Type</h3>
                                                    <div class="min-w-[200px] w-full flex flex-wrap gap-1 mt-1">
                                                        {#each $inputArea.trainTypes as type}
                                                            <button class="fadeButton text-sm blue2 textWhite pl-2 pr-2" on:click={() => inputType(type, train)}>{type.name}</button>
                                                        {/each}
                                                    </div>
                                                {/if}
                                                {#if train.dropdown_2 === "variant"}
                                                    <h3 class="text-white text-sm">Select Variant</h3>
                                                    <div class="min-w-[200px] w-full flex flex-wrap gap-1 mt-1">
                                                        {#each $inputVariant as variant}
                                                            <button class="fadeButton text-sm blue2 textWhite pl-2 pr-2" on:click={() => inputVariantBtn(variant, train)}>{variant.name}</button>
                                                        {/each}
                                                    </div>
                                                {/if}
                                            </div>
                                            {/if}
                                        </li>
                                    {/each}
                                </ul>
                            {/if}
                        </div>
                    </div>
                    <div class="border-[1px] border-neutral-700 rounded-md sm:mt-8 mt-4 w-full max-w-[500px] p-4">
                        <h3 class="text-neutral-300 italic">Date / Time</h3>
                        <div class="flex gap-1 sm:gap-3 flex-col sm:flex-row">
                            <input type="date" class="standardInput mt-2 iconEdit" bind:value={inputDate}>
                            <input type="time" class="standardInput mt-2 iconEdit" bind:value={inputTime}>
                        </div>
                    </div>
                    <div class="border-[1px] border-neutral-700 rounded-md sm:mt-16 mt-8 w-full max-w-[500px] p-4">
                    <button class="fadeButton blue w-full p-2 text-sm" on:click={confirmLog}>Submit Log</button>
                    </div>
                    
                </div>
            </div>
        </div>
    <Footer/>
</div>

<script>
    import { onMount, tick } from 'svelte';
    import Nav from '../../../lib/components/Nav.svelte';
    import Footer from '../../../lib/components/Footer.svelte';
    import CustomAlert from '../../../lib/components/Alert.svelte';

    import { writable } from 'svelte/store';
    var combinedLocations = null;
    var locationSuggestions = []
    var trainNumbers = writable([])
    var dbWriteable = writable([])

    var typeDropdown = false;
    var inputNumber = ''
    var inputArea = writable([])
    var inputVariant = writable([])
    var inputDate = ''
    var inputTime = ''
    var noLocation = writable(false);
    var id = 0

    var db = import ('../../../db/database.json');
    var trainAreas = []
    dbWriteable.set(db)

    var location = ''

    onMount(async () => {
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
    
        const dbData = await db;
        const resolvedDbData = await dbData.default;
        trainAreas = resolvedDbData.trainTypes;
        console.log(trainAreas)

        inputDate = new Date().toISOString().split('T')[0];

    });

    function promptSuggestions(){
        locationSuggestions = []
        console.log(combinedLocations)
        if(location != '' && combinedLocations){
            for(const item in combinedLocations){
                console.log(combinedLocations[item])
                if (combinedLocations[item] && combinedLocations[item].toLowerCase().includes(location)) {
                    locationSuggestions.push(combinedLocations[item]);
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
    
    function inputType(type, train) {
        console.log(type)
        inputVariant.set(type.variants);
        console.log("variants");
        console.log(inputVariant);
    
        trainNumbers.update(numbers => {
            return numbers.map(t => {
                if (t.id === train.id) {
                    t.type = type.name;
                    t.dropdown_2 = 'variant';
                }
                return t;
            });
        });
    }

    function inputVariantBtn(variant, train) {
        trainNumbers.update(numbers => {
            return numbers.map(t => {
                if (t.id === train.id) {
                    t.variant = variant.name
                    t.dropdown_2 = '';
                    t.dropdown = false;
                }
                return t;
            });
        });

        let logs = localStorage.getItem('logs')
        console.log(logs)
        if (logs) {
            const parsedLogs = JSON.parse(logs);
            parsedLogs.forEach(item => {
                if(item.number === train.name){
                    item.type = train.type;
                    item.variant = train.variant;
                }
            });
            localStorage.setItem('logs', JSON.stringify(parsedLogs));
        }
    }
    
    function inputAreaBtn(area, train) {
        inputArea.set(area)
        console.log(area)
        trainNumbers.update(numbers => {
            return numbers.map(t => {
                if (t.id === train.id) {
                    t.area = area.area;
                    t.dropdown_2 = 'type';
                }
                return t;
            });
        });
    }

    function clearLocation(){
        location = ''
        locationSuggestions = []
    }

    function addNumber(){
        id++;
        // check local storage to see if train is already in logs
        let logs = localStorage.getItem('logs')
        let trainFound = false
        let train = null;
        console.log(logs)
        if (logs) {
            const parsedLogs = JSON.parse(logs);
            trainFound = parsedLogs.some(log => log.number === inputNumber);
            if (trainFound) {
                train = parsedLogs.find(log => log.number === inputNumber);
            }
        }

        if(trainFound){
            trainNumbers.update(numbers => {
                return [...numbers, {"id": id, "name":inputNumber,"type":train.type,"variant":train.variant, "dropdown":false, "dropdown_2":""}];
            });
        }else{
            trainNumbers.update(numbers => {
                return [...numbers, {"id": id, "name":inputNumber,"type":"","variant":"", "dropdown":false, "dropdown_2":""}];
            });
        }


        inputNumber = ''
    };
        

    function handleKeyPressNumber(e){
        if(e.key == 'Enter'){
            if(inputNumber != ''){
                addNumber()
            }
        }
    }

    function removeLog(trainId){
        trainNumbers.update(numbers => {
            return numbers.filter(number => number.id != trainId);
        });
    }

    function closeDropdown(train){
        trainNumbers.update(numbers => {
            return numbers.map(t => {
                if (t.id === train.id) {
                    t.dropdown = false;
                    t.dropdown_2 = '';
                }
                return t;
            });
        });
    }

    function confirmLog(){
        // stuff here

        if(location == ''){
            if(!$noLocation){
                
                return;
            }
        }

        var loc = localStorage.getItem('locations');
        if(loc != null){
            const parsedLoc = JSON.parse(loc);
            if(!parsedLoc.includes(location)){
                var newloc = parsedLoc.concat(location);
                localStorage.setItem('locations', JSON.stringify(newloc));
            }
        }

        let logs = localStorage.getItem('logs');
        if (!logs) {
            logs = JSON.stringify([]);
        }

        trainNumbers.subscribe(numbers => {
            const numbersWithLocation = numbers.map(({ dropdown, dropdown_2, id, ...train }) => ({
                ...train,
                log_location: location,
                log_date: inputDate,
                log_time: inputTime
            }));
            console.log(numbersWithLocation)

            console.log(numbers)
            const addNew = JSON.parse(logs).concat(numbersWithLocation);
            localStorage.setItem('logs', JSON.stringify(addNew));
            console.log(addNew);
        })();

        let logreplace = inputDate.replace('/', '-');
        console.log(logreplace)
        window.location.href = `../overview/${logreplace}`;
    }



    function customAlertSummon(){

    }



    
</script>

<style>

    .non-empty{
        @apply border-b-blue-600 valid:border-blue-600 invalid:border-red-600 hover:invalid:border-red-600
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
       animation-timing-function: ease-in-out;
    }

    .fadeButton:active:before{
        animation: boxFill 0.1s forwards;
        animation-timing-function: ease-in-out;
    }

    .fadeButton:hover{
        @apply text-white
    }

    .fadeButton.blue{
        @apply bg-blue-700  before:bg-blue-300 before:bg-opacity-20
    }

    .fadeButton.red{
        @apply bg-red-700  before:bg-red-300 before:bg-opacity-20
    }

    .fadeButton.blue2{
        @apply bg-blue-800  before:bg-blue-300 before:bg-opacity-20
    }

    .fadeButton.textWhite{
        @apply text-white
    }
    
    
    @keyframes boxFillIn{
        0%{
            width: 0%;
            border-radius: 100%;
        }
        100%{
            width: 100%;
            border-radius: 0%;
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

    @keyframes boxFillOut2{
        0%{
            width: 100%;
            left: -50%;
            border-radius: 0;
        }
        100%{
            width: 100%;
            left: 0%;
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
        @apply bg-transparent pt-8
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
    @apply bg-black bg-opacity-20 h-1/4
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
    background: #555;
    }

    .iconEdit::-webkit-calendar-picker-indicator {
        filter: invert(1);
    }

    .fadeCheckbox {
        @apply appearance-none bg-transparent border-[2px] border-neutral-700 w-5 h-5 rounded-sm relative duration-100 hover:cursor-pointer
    }

    .fadeCheckbox:checked {
        @apply bg-blue-600
    }

    .fadeCheckbox::before{
        @apply bg-blue-700 bg-opacity-0 duration-100
    }

    .fadeCheckbox:not(:checked):not(:focus)::before{
        @apply hover:bg-opacity-20
    }

    .fadeCheckbox:checked::before{
        @apply hover:bg-opacity-10
    }

    .fadeCheckbox::before{
        content: '';
        position: absolute;
        width: 200%;
        height: 200%;
        top: -50%;
        left: -50%;
        z-index: -1;
        border-radius: 50%;
    }


    .fadeCheckbox:checked::after{
        position: absolute;
        width: 100%;
        height: 100%;
        content: url('../../../lib/images/check.svg');
        filter: invert(100);
        top: 0;
        transform: translateY(-2px);
    }


    .standardInput.inputDisabled{
        opacity:0.2;
    }

    .standardInput.inputDisabled:hover{
        cursor: not-allowed;
    }


    



</style>
