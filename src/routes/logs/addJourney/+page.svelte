<CustomAlert mode={$alrtMode} active={$alrtAct} text={$alrtTxt} on:close={() => $alrtAct = false} />
<div style="width: 100vw; display: flex; flex-direction: column" id="app">
    <Nav ver="back"/>
        <div class="flex flex-col items-center h-full justify-start overflow-y-scroll customScrollbar overflow-x-hidden">
            <div class="max-w-[1000px] w-full flex flex-col">
                <div class="flex flex-col items-center border-[1px] rounded-md border-neutral-700 sm:ml-8 ml-4 mr-2 sm:mr-4 h-full sm:pt-6 sm:pb-6 pl-4 pr-4 pb-4">
                    <h2 class="text-white text-xl font-semibold sm:mt-1 mt-3">Add Journey</h2>
                    <div class="border-[1px] border-neutral-700 rounded-md sm:mt-8 mt-4 w-full max-w-[500px] p-4">
                        <div class="flex items-center justify-center gap-3 mr-1 flex-col mb-3 sm:mb-1">
                            <div class="w-full">
                                <!--TO-DO - country selector ?-->
                                <h3 class="text-neutral-300 italic mb-2">From</h3>
                                {#if loadStns}
                                    <div class="w-full flex items-center justify-center border-neutral-700 border-[1px] rounded-sm">
                                        <span class="loader" style="margin-top:0.5rem; margin-bottom: 0.5rem"></span>
                                    </div>
                                {:else}
                                    <PromptField ds={locations} on:select={selectFrom} bind:value={from} disabled={$noLocation} ver="loc" bind:presetC={fromC} adDs={allStns}/>
                                {/if}
                            </div>
                            <div class="w-full">
                                <h3 class="text-neutral-300 italic mb-2">To</h3>
                                {#if loadStns}
                                    <div class="w-full flex items-center justify-center border-neutral-700 border-[1px] rounded-sm">
                                        <span class="loader" style="margin-top:0.5rem; margin-bottom: 0.5rem"></span>
                                    </div>
                                {:else}
                                    <PromptField ds={locations} on:select={selectTo} bind:value={to} disabled={$noLocation} ver="loc" bind:presetC={toC} adDs={allStns}/>
                                {/if}
                
                            </div>
                        </div>
                        <!-- <div class="flex gap-4"> -->
                            <!-- <div class="mt-3 flex gap-2 items-center">
                                <input type="checkbox" class="checkbox blue" name="no_location" bind:checked={$noLocation}>
                                <label for="no_location" class="text-neutral-500 italic  text-xs">No location</label>
                            </div> -->
                            <!-- <div class="mt-3 flex gap-2 items-center">
                                <input type="checkbox" class="checkbox blue" name="no_location" bind:checked={$preciseLocation} on:click={locationToggle}>
                                <label for="no_location" class="text-neutral-500 italic  text-xs">Include device location</label>
                            </div> -->
        
                        <!-- </div> -->
                    </div>
                    <div class="border-[1px] border-neutral-700 rounded-md sm:mt-8 mt-4 w-full max-w-[500px] p-4">
                        <div class="flex gap-4">
                            <div class="w-full">
                                <h3 class="text-neutral-300 italic">Departure</h3>
                                <div class="flex gap-1 sm:gap-3 flex-col sm:flex-row">
                                    <input type="date" class="input blue mt-2 iconEdit w-full" style="font-size: 0.75rem" bind:value={inputDateStart}>
                                    <input type="time" class="input blue mt-2 iconEdit w-full" style="font-size: 0.75rem" bind:value={inputTimeStart}>
                                </div>
                            </div>
                            <div class="w-full">
                                <h3 class="text-neutral-300 italic">Arrival</h3>
                                <div class="flex gap-1 sm:gap-3 flex-col sm:flex-row">
                                    <input type="date" class="input blue mt-2 iconEdit w-full" style="font-size: 0.75rem" bind:value={inputDateEnd}>
                                    <input type="time" class="input blue mt-2 iconEdit w-full" style="font-size: 0.75rem" bind:value={inputTimeEnd}>
                                </div>
                            </div>
                        </div>
                        <div class="border-[1px] border-neutral-700 rounded-md p-2 mt-6 bg-neutral-800 bg-opacity-30 hover:border-neutral-400 duration-50">
                            <button class="flex justify-between w-full items-center" on:click={() => extraJourneyDropdown = !extraJourneyDropdown}>
                                <h2 class="dark:text-neutral-300 italic">Extra Details</h2>
                                {#if extraJourneyDropdown}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-short fill-white w-7 h-7" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5"/>
                                    </svg>
                                {:else}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-short fill-white w-7 h-7 rotate-180" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5"/>
                                    </svg>
                                {/if}
                            </button>
                            {#if extraJourneyDropdown}
                                <hr class="w-full mt-2 mb-2 border-neutral-700">
                                <div class="flex gap-4 sm:flex-row flex-col mt-3">
                                    <div class="w-full">
                                        <h3 class="text-neutral-300 italic mb-2  text-sm">Operator</h3>
                                        <PromptField red="true" ds={operators}/>
                                    </div>
                                    <div class="flex gap-4">
                                        <div class="w-full">
                                            <h3 class="text-neutral-300 italic mb-2  text-sm ">Train Code</h3>
                                            <input class="input blue w-full reduced h-auto"/>
                                        </div>
                                        <div class="w-full sm:hidden">
                                            <h3 class="text-neutral-300 italic mb-2 text-sm">Delay (<b>HH:MM</b>)</h3>
                                            <div class="flex gap-1">
                                                <select class="input reduced iconEdit w-full" bind:value={delayHours}>
                                                    {#each Array.from({ length: 13 }, (_, i) => i) as hour}
                                                        <option>{hour < 10 ? `0${hour}` : hour}</option>
                                                    {/each}
                                                </select>
                                                <select class="input reduced iconEdit w-full" bind:value={delayMinutes}>
                                                    {#each Array.from({ length: 60 }, (_, i) => i) as minutes}
                                                        <option>{minutes < 10 ? `0${minutes}` : minutes}</option>
                                                    {/each}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex gap-4 mt-4 mb-3">
                                    <div class="hidden sm:block w-full">
                                        <h3 class="text-neutral-300 italic mb-2 text-sm">Delay (<b>HH:MM</b>)</h3>
                                        <div class="flex gap-1">
                                            <select class="input reduced iconEdit w-full" bind:value={delayHours}>
                                                {#each Array.from({ length: 13 }, (_, i) => i) as hour}
                                                    <option>{hour < 10 ? `0${hour}` : hour}</option>
                                                {/each}
                                            </select>
                                            <select class="input reduced iconEdit w-full" bind:value={delayMinutes}>
                                                {#each Array.from({ length: 60 }, (_, i) => i) as minutes}
                                                    <option>{minutes < 10 ? `0${minutes}` : minutes}</option>
                                                {/each}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            {/if}
                        </div>
                    </div>




                    <!-- more journey info needs to go here-->





                    <div class="border-[1px] border-neutral-700 rounded-md sm:mt-8 mt-4 w-full max-w-[500px] p-4">
                        <h3 class="text-neutral-300 italic">Numbers</h3>
                        <div class="mt-2 flex gap-2 items-center flex-wrap">
                            <div class="flex  mb-2 rounded-md border-neutral-800 gap-1 w-full">
                                <input placeholder="Enter Number" class="input blue w-full" on:keydown={handleKeyPressNumber} bind:value={inputNumber}>
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
                                <button class="button p-[0.2rem] blue" on:click={() => {addNumber()}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus w-5 h-5" viewBox="0 0 16 16">
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                                </svg></button>
                            </div>
                            {#if logNumbers.length != 0}
                                <ul class="border-[1px] border-neutral-800 w-full h-auto  p-2 flex md:flex-wrap gap-1 flex-nowrap flex-col md:flex-row min-h-[47px]">
                                    {#each $logNumbers as train}
                                        <li class="relative inline-block p-0 m-0 h-6">
                                            <button on:click={() => {train['dropdown'] = !train['dropdown']}} class=" bg-blue-800 button blue2 textWhite pl-2 pr-2 sm s-padding">{train['name']} ({train['type']} - {train['variant']})</button>
                                            {#if train['dropdown']}
                                                <button class="z-30 fixed w-screen h-screen hover:cursor-defaulleft-0 top-0" on:click={closeDropdown(train)}></button>
                                            {/if}
                                            
                                            {#if train['dropdown']}
                                            <div class="absolute z-40 left-0 top-100 bg-[rgb(15,15,15)] p-2 w-auto min-h-8 rounded-md rounded-t-none border-[1px] border-neutral-800 min-w-[75px] max-h-[200px] overflow-y-scroll sm:max-h-[300px] pr-0 ">
                                                {#if train['dropdown_2'] == ''}
                                                <div class="flex gap-2 min-w-[180px]">
                                                    <button class="sm button red pl-2 pr-2 w-full" on:click={removeLog(train['id'])}>Remove</button>
                                                    <button class="sm button blue pl-2 pr-2 w-full" on:click={() => train['dropdown_2'] = "section"}>Edit type</button>
                                                </div>
                                                {/if}

                                                {#if train.dropdown_2 === "section"}
                                                <h3 class="text-white text-sm">Select Vehicle Type</h3>
                                                <div class="min-w-[200px] w-full flex flex-wrap gap-1 mt-1">
                                                    <button class="button sm blue2 textWhite pl-2 pr-2" on:click={() => inputVType("Train", train)}>Train</button>
                                                    <button class="button sm blue2 textWhite pl-2 pr-2" on:click={() => inputVType("Bus / Coach", train)}>Bus / Coach</button>
                                                    <button class="button sm blue2 textWhite pl-2 pr-2" on:click={() => inputVType("Others", train)}>Other</button>
                                                </div>
                                                {/if}

                                                {#if train.dropdown_2 === "area"}
                                                    <h3 class="text-white text-sm">Select Area</h3>
                                                    <div class="min-w-[200px] w-full flex flex-wrap gap-1 mt-1">
                                                        {#each logAreas as area}
                                                            <button class="button sm blue2 textWhite pl-2 pr-2" on:click={() => inputAreaBtn(area, train)}>{area.area}</button>
                                                        {/each}
                                                    </div>
                                                {/if}
                                                {#if train.dropdown_2 === "type"}
                                                    <h3 class="text-white text-sm">Select Type</h3>
                                                    <div class="min-w-[200px] w-full flex flex-wrap gap-1 mt-1">
                                                        {#if train['vehicletype'] == 'Train'}
                                                            {#each $inputArea.trainTypes as type}
                                                                <button class="button sm blue2 textWhite pl-2 pr-2" on:click={() => inputType(type, train)}>{type.name}</button>
                                                            {/each}
                                                        {:else if train['vehicletype'] == "Bus / Coach"}
                                                            {#each $inputArea.busTypes as type}
                                                                <button class="button sm blue2 textWhite pl-2 pr-2" on:click={() => inputType(type, train)}>{type.name}</button>
                                                            {/each}
                                                        {:else if train['vehicletype'] == "Others"}
                                                            {#each $inputArea.otherTypes as type}
                                                                <button class="button sm blue2 textWhite pl-2 pr-2" on:click={() => inputType(type, train)}>{type.name}</button>
                                                            {/each}
                                                        {/if}
                                                    </div>
                                                {/if}
                                                {#if train.dropdown_2 === "variant"}
                                                    <h3 class="text-white text-sm">Select Variant</h3>
                                                    <div class="min-w-[200px] w-full flex flex-wrap gap-1 mt-1  sm:min-w-[450px]">
                                                        {#each $inputVariant as variant}
                                                            <button class="button sm blue2 textWhite pl-2 pr-2" on:click={() => inputVariantBtn(variant, train)}>{variant.name}</button>
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
                    <div class="border-[1px] border-neutral-700 rounded-md sm:mt-16 mt-8 w-full max-w-[500px] p-4">
                    <button class="button blue w-full p-2 text-sm x-padding" on:click={confirmLog}>Submit Log</button>
                    </div>
                </div>
            </div>
        </div>
    <Footer/>
</div>

<script>
    // TO-DO
    // Add VIA points for journey (as the app will not be fetching timetable data unless a way is found with minimal / no api usage)
    // Start / End Date AND time
    // Select Operator
    // Add fields such as class, ticket costs, delay, train code, leisure / commute, tags (wifi, dining car, sleeper train, cycling)
    



    import { onMount, tick } from 'svelte';
    import Nav from '../../../lib/components/Nav.svelte';
    import Footer from '../../../lib/components/Footer.svelte';
    import CustomAlert from '../../../lib/components/Alert.svelte';
    import '../../../global.css'
    import PromptField from '../../../lib/components/PromptField.svelte';

    import '../../siteDB.js'
    import { writePlanningData, writeLocationsData, writeJourneysData, writeLogsData, getPlanningData, getLocationsData, getJourneysData, getLogsData } from '../../siteDB';
    
    import operators from '../../../db/operators.json';
    
    import { get, writable } from 'svelte/store';
    var combinedLocations = null;
    var locationSuggestions = []
    var logNumbers = writable([])
    var dbWriteable = writable([])

    var typeDropdown = false;
    var inputNumber = ''
    var inputArea = writable([])
    var inputVariant = writable([])
    var inputDateStart = ''
    var inputTimeStart = ''
    var inputDateEnd = ''
    var inputTimeEnd = ''
    var preciseLocation = writable(false)
    var preciseLat;
    var preciseLon;
    var noLocation = writable(false);
    var id = 0
    var toC = ''
    var fromC = ''
    var delayMinutes;
    var delayHours; 
    
    var alrtTxt  = writable('')
    var alrtAct = writable(false)
    var alrtMode = writable('err')

    var db = import ('../../../db/vehicles.json');
    import additionalStns from '../../../db/additionalStations.json'
    import { tl_getAllData, tl_putData } from '../../tl_stationsDB';
	import { add } from 'dexie';
    var logAreas = []
    dbWriteable.set(db)

    var from = ''
    var to = ''
    var fromId = null;
    var toId = null;
    let locations = ''

    var extraJourneyDropdown = false;

    
    let allStns = null
    let loadStns = true;
    onMount(async () => {
        locations = await getLocationsData();
        if (locations != null) {
            locations = locations.concat(additionalStns);
        }else{
            locations = additionalStns;
        }

        if (typeof window !== 'undefined') {
            const settings = JSON.parse(localStorage.getItem('settings'));
            if (settings && settings.dbStn) {
                // Check if stations are already cached
                const cachedStations = await tl_getAllData();
                if (cachedStations.length > 0) {
                    allStns = cachedStations[0].data;
                    loadStns = false;
                } else {
                    // Use a web worker to fetch stations
                    const worker = new Worker(new URL('../../../stationWorker.js', import.meta.url), { type: 'module' });
                    worker.onmessage = async (event) => {
                        allStns = event.data;
                        await tl_putData(allStns);
                        loadStns = false;
                    };
                    worker.onerror = (error) => {
                        console.error('Error in worker:', error);
                        loadStns = false; 
                    };
                    worker.postMessage('fetchStations');
                }
            } else {
                loadStns = false;
            }
        }
    });


    
    function inputType(type, train) {
        // console.log(type)
        inputVariant.set(type.variants);
        // console.log("variants");
        // console.log(inputVariant);
    
        logNumbers.update(numbers => {
            return numbers.map(t => {
                if (t.id === train.id) {
                    t.type = type.name;
                    t.dropdown_2 = 'variant';
                }
                return t;
            });
        });
    }

    async function inputVariantBtn(variant, train) {
        logNumbers.update(numbers => {
            return numbers.map(t => {
                if (t.id === train.id) {
                    t.variant = variant.name
                    t.dropdown_2 = '';
                    t.dropdown = false;
                }
                return t;
            });
        });

        let logs = await getAllLogs();
        // console.log(logs)
        if (logs) {
            const parsedLogs = JSON.parse(logs);
            parsedLogs.forEach(item => {
                if(item.number === train.name){
                    item.type = train.type;
                    item.variant = train.variant;
                }
            });
            await writeLogsData(parsedLogs);
        }
    }
    
    function inputAreaBtn(area, train) {
        inputArea.set(area);
        // console.log(area);
        logNumbers.update(numbers => {
            return numbers.map(t => {
                if (t.id === train.id && t.vehicleType === train.vehicleType) {
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

    async function addNumber(){
        id++;
        // check local storage to see if train is already in logs
        let logs = await getAllLogs();
        let vehFound = false
        let veh = null;
        // console.log(logs)
        if (logs) {
            const parsedLogs = JSON.parse(logs);
            vehFound = parsedLogs.some(log => log.name === inputNumber);
            if (vehFound) {
                veh = parsedLogs.find(log => log.name === inputNumber);
            }
        }

        if(vehFound && veh){
            logNumbers.update(numbers => {
                return [...numbers, {"id": id, "vehicletype":"","name":inputNumber,"type":train.type,"variant":train.variant, "dropdown":false, "dropdown_2":""}];
            });
        }else{
            logNumbers.update(numbers => {
                return [...numbers, {"id": id, "vehicletype":"","name":inputNumber,"type":"","variant":"", "dropdown":false, "dropdown_2":""}];
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
        logNumbers.update(numbers => {
            return numbers.filter(number => number.id != trainId);
        });
    }

    function closeDropdown(train){
        logNumbers.update(numbers => {
            return numbers.map(t => {
                if (t.id === train.id) {
                    t.dropdown = false;
                    t.dropdown_2 = '';
                }
                return t;
            });
        });
    }

    async function confirmLog(){
        // stuff here

        var lat;
        var lon;


        if(from === '' || to === ''){
            if(!$noLocation){
            console.log(from,to)
            customAlertSummon("No location selected", "err");
            return;
            }
        }

        if(inputDateStart == '' || inputDateEnd == ''){
            customAlertSummon("No date selected", "err");
            return;
        }

        if($logNumbers.length == 0){
            customAlertSummon("No numbers added", "err");
            return;
        }

        if(fromC == '' || toC == ''){
            if(!$noLocation){
                customAlertSummon("No country selected", "err");
                return;
            }
        }

        var loc = await getAllLocations()
        if(loc != null){
            const parsedLoc = JSON.parse(loc);
            var found = false;
            for(var locs in parsedLoc){
                if(locs == from){
                    found = true;
                }
            }
            if(found = false){
                parsedLoc.push({"name":from, "country":fromCountry})
            }

            found = false
            for(var locs in parsedLoc){
                if(locs == to){
                    found = true;
                }
            }
            if(found = false){
                parsedLoc.push({"name":to, "country":toCountry})
            } 
        }

        let journeys = await getAllJourneys();
        if (!journeys) {
            journeys = JSON.stringify([]);
        }

        if($preciseLocation && preciseLat && preciseLon){
            logNumbers.subscribe(async numbers => {
            const numbersWithLocation = numbers.map(({ dropdown, dropdown_2, id, ...train }) => ({
                ...train,
                from: from,
                fromCountry: fromC,
                to: to,
                toCountry: toC,
                start_date: inputDateStart,
                start_time: inputTimeStart,
                end_date: inputDateEnd,
                end_time: inputTimeEnd,
                log_lat: preciseLat,
                log_lon: preciseLon
            }));

            const addNew = JSON.parse(journeys).concat(numbersWithLocation);
            await writeAllJourneys(addNew);
        });
        }else{
            logNumbers.subscribe(async numbers => {
                const numbersWithLocation = numbers.map(({ dropdown, dropdown_2, id, ...train }) => ({
                    ...train,
                    from: from,
                    to: to,
                    start_date: inputDateStart,
                    start_time: inputTimeStart,
                    end_date: inputDateEnd,
                    end_time: inputTimeEnd,
                }));

                const addNew = JSON.parse(journeys).concat(numbersWithLocation);
                await writeAllJourneys(addNew);
            });
        }


        window.location.href = `../overview/` + inputDateStart; 
    }



    function customAlertSummon(text, mode){
        console.log("Summoning alert")
        $alrtTxt = text;
        $alrtMode = mode;
        $alrtAct = true;
    }

    function locationToggle() {
        if($preciseLocation){
            $preciseLocation = false;
        }else{
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const latitude = position.coords.latitude;
                        const longitude = position.coords.longitude;
                        preciseLat = latitude;
                        preciseLon = longitude;
                        console.log(`Latitude: ${preciseLat}, Longitude: ${preciseLon}`);
                        $preciseLocation = true;
                    },
                    (error) => {
                        switch (error.code) {
                            case error.PERMISSION_DENIED:
                                console.log("User denied the request for Geolocation.");
                                customAlertSummon("User denied the request for Geolocation", "err");
                                break;
                            case error.POSITION_UNAVAILABLE:
                                console.log("Location information is unavailable.");
                                customAlertSummon("Location information is unavailable", "err");
                                break;
                            case error.TIMEOUT:
                                console.log("The request to get user location timed out.");
                                customAlertSummon("The request to get user location timed out", "err");
                                break;
                            case error.UNKNOWN_ERROR:
                                console.log("An unknown error occurred.");
                                customAlertSummon("An unknown error occurred", "err");
                                break;
                        }
                        $preciseLocation = false;
                    }
                );
            } else {
                console.log("Geolocation is not supported by the browser.");
                $preciseLocation = false;
            }
        }
        }

        function inputVType(type, train){
            logNumbers.update(numbers => {
                return numbers.map(t => {
                    if (t.id === train.id) {
                        t.vehicletype = type;
                        t.dropdown_2 = 'area';
                    }
                    return t;
                });
            });
        }

        function selectFrom(o){
            from = o.detail.text.name;
            fromId = o.detail.text.id;
        }

        function selectTo(o){
            to = o.detail.text.name;
            toId = o.detail.text.id;
            console.log(from, to, fromId, toId);
        }



    
</script>

<style>
    .loader{margin-top:12px;width:24px;height:24px;border:3px solid rgb(50,50,50);border-bottom-color:transparent;border-radius:50%;display:inline-block;box-sizing:border-box;animation:rotation 1s linear infinite}@keyframes rotation{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
    select{background-color: rgb(31, 31, 31) !important; color: #ddd !important;}
</style>

