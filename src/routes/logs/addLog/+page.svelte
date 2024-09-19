<CustomAlert mode={$alrtMode} active={$alrtAct} text={$alrtTxt} on:close={() => $alrtAct = false} />
<div style="width: 100vw; display: flex; flex-direction: column" id="app">
    <Nav ver="back"/>
        <div class="flex flex-col items-center h-full justify-start overflow-y-scroll customScrollbar overflow-x-hidden">
            <div class="max-w-[1000px] w-full flex flex-col">
                <div class="flex flex-col items-center border-[1px] rounded-md border-neutral-700 sm:ml-8 ml-4 mr-2 sm:mr-4 h-full sm:pt-6 sm:pb-6 pl-4 pr-4 pb-4">
                    <h2 class="text-white text-xl font-semibold sm:mt-1 mt-3">Add Log</h2>
                    <div class="border-[1px] border-neutral-700 rounded-md sm:mt-8 mt-4 w-full max-w-[500px] p-4">
                        <h3 class="text-neutral-300 italic">Location</h3>
                        <div class="relative mt-2">
                            <div class="flex items-center w-full gap-3 mr-1">
                                <PromptField ds={locations} bind:location on:select={selectLocation} disabled={$noLocation} ver="loc" class="w-full" bind:presetC={sCountry}/>
                            </div>
                        </div>
                        <div class="flex gap-4">
                            <div class="mt-3 flex gap-2 items-center">
                                <input type="checkbox" class="checkbox blue" name="no_location" bind:checked={$noLocation}>
                                <label for="no_location" class="text-neutral-500 italic  text-xs">No location</label>
                            </div>
                            <div class="mt-3 flex gap-2 items-center">
                                <input type="checkbox" class="checkbox blue" name="no_location" bind:checked={$preciseLocation} on:click={locationToggle}>
                                <label for="no_location" class="text-neutral-500 italic  text-xs">Include device location</label>
                            </div>
                            
                        </div>
                    </div>
                    <div class="border-[1px] border-neutral-700 rounded-md sm:mt-8 mt-4 w-full max-w-[500px] p-4">
                        <h3 class="text-neutral-300 italic">Date / Time</h3>
                        <div class="flex gap-1 sm:gap-3 flex-col sm:flex-row">
                            <input type="date" class="input blue mt-2 iconEdit w-full" bind:value={inputDate}>
                            <input type="time" class="input blue mt-2 iconEdit w-full" bind:value={inputTime}>
                        </div>
                    </div>
                    <div class="border-[1px] border-neutral-700 rounded-md sm:mt-8 mt-4 w-full max-w-[500px] p-4">
                        <h3 class="text-neutral-300 italic">Numbers</h3>
                        <div class="mt-2 flex gap-2 items-center flex-wrap">
                            <div class="flex  mb-2 rounded-md border-neutral-800 gap-1 w-full">
                                <input placeholder="Enter Number" class="input blue w-full lighter" on:keydown={handleKeyPressNumber} bind:value={inputNumber}>
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
                                    {#each $logNumbers as logItem}
                                        <li class="relative inline-block p-0 m-0 h-6">
                                            <button on:click={() => {logItem['dropdown'] = !logItem['dropdown']}} class=" bg-blue-800 button blue2 textWhite pl-2 pr-2 sm s-padding">{logItem['number']} ({logItem['type']} - {logItem['variant']})</button>
                                            {#if logItem['dropdown']}
                                                <button class="z-30 fixed w-screen h-screen hover:cursor-defaulleft-0 top-0" on:click={closeDropdown(logItem)}></button>
                                            {/if}
                                            
                                            {#if logItem['dropdown']}
                                            <div class="absolute z-40 left-0 top-100 bg-[rgb(15,15,15)] p-2 w-auto min-h-8 rounded-md rounded-t-none border-[1px] border-neutral-800 min-w-[75px] max-h-[200px] overflow-y-scroll sm:max-h-[300px] pr-0 ">
                                                {#if logItem['dropdown_2'] == ''}
                                                <div class="flex gap-2 min-w-[180px]">
                                                    <button class="sm button red pl-2 pr-2 w-full" on:click={removeLog(logItem['id'])}>Remove</button>
                                                    <button class="sm button blue pl-2 pr-2 w-full" on:click={() => logItem['dropdown_2'] = "section"}>Edit type</button>
                                                </div>
                                                {/if}

                                                {#if logItem.dropdown_2 === "section"}
                                                <h3 class="text-white text-sm">Select Vehicle Type</h3>
                                                <div class="min-w-[200px] w-full flex flex-wrap gap-1 mt-1">
                                        
                                                    <button class="button sm blue2 textWhite pl-2 pr-2" on:click={() => inputVType("Train", logItem)}>logItem</button>
                                                    <button class="button sm blue2 textWhite pl-2 pr-2" on:click={() => inputVType("Bus / Coach", logItem)}>Bus / Coach</button>
                                                    <button class="button sm blue2 textWhite pl-2 pr-2" on:click={() => inputVType("Others", logItem)}>Other</button>
                                                </div>
                                                {/if}

                                                {#if logItem.dropdown_2 === "area"}
                                                    <h3 class="text-white text-sm">Select Area</h3>
                                                    <div class="min-w-[200px] w-full flex flex-wrap gap-1 mt-1">
                                                        {#each logAreas as area}
                                                            <button class="button sm blue2 textWhite pl-2 pr-2" on:click={() => inputAreaBtn(area, logItem)}>{area.area}</button>
                                                        {/each}
                                                    </div>
                                                {/if}
                                                {#if logItem.dropdown_2 === "type"}
                                                    <h3 class="text-white text-sm">Select Type</h3>
                                                    <div class="min-w-[200px] w-full flex flex-wrap gap-1 mt-1">
                                                        {#if logItem['vehicletype'] == 'logItem'}
                                                        {#each $inputArea.logItemTypes as type}
                                                                <button class="button sm blue2 textWhite pl-2 pr-2" on:click={() => inputType(type, logItem)}>{type.name}</button>
                                                            {/each}
                                                        {:else if logItem['vehicletype'] == "Bus / Coach"}
                                                        {#each $inputArea.busTypes as type}
                                                                <button class="button sm blue2 textWhite pl-2 pr-2" on:click={() => inputType(type, logItem)}>{type.name}</button>
                                                            {/each}
                                                        {:else if logItem['vehicletype'] == "Others"}
                                                            {#each $inputArea.otherTypes as type}
                                                            <button class="button sm blue2 textWhite pl-2 pr-2" on:click={() => inputType(type, logItem)}>{type.name}</button>
                                                            {/each}
                                                            {/if}
                                                        <button class="button sm red textWhite pl-2 pr-2" on:click={() => logItem.dropdown_2 = 'area'}>Back</button>
                                                    </div>
                                                {/if}
                                                {#if logItem.dropdown_2 === "variant"}
                                                    <h3 class="text-white text-sm">Select Variant</h3>
                                                    <div class="min-w-[200px] w-full flex flex-wrap gap-1 mt-1  sm:min-w-[450px]">
                                                        {#each $inputVariant as variant}
                                                        <button class="button sm blue2 textWhite pl-2 pr-2" on:click={() => inputVariantBtn(variant, logItem)}>{variant.name}</button>
                                                        {/each}
                                                        <button class="button sm red textWhite pl-2 pr-2" on:click={() => logItem.dropdown_2 = 'type'}>Back</button>
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
    import { getAllContexts, onMount, tick } from 'svelte';
    import Nav from '../../../lib/components/Nav.svelte';
    import Footer from '../../../lib/components/Footer.svelte';
    import CustomAlert from '../../../lib/components/Alert.svelte';
    import PromptField from '../../../lib/components/PromptField.svelte';
    import '../../siteDB.js'
    import { writePlanningData, writeLocationsData, writeJourneysData, writeLogsData, getPlanningData, getLocationsData, getJourneysData, getLogsData } from '../../siteDB';
    import '../../../global.css'

    import { writable } from 'svelte/store';
    var combinedLocations = null;
    var locationSuggestions = []
    var logNumbers = writable([])
    var dbWriteable = writable([])

    var typeDropdown = false;
    var inputNumber = ''
    var inputArea = writable([])
    var inputVariant = writable([])
    var inputDate = ''
    var inputTime = ''
    var sCountry = ''
    var preciseLocation = writable(false)
    var preciseLat;
    var preciseLon;
    var noLocation = writable(false);
    var id = 0
    
    var alrtTxt  = writable('')
    var alrtAct = writable(false)
    var alrtMode = writable('err')

    var db = import ('../../../db/vehicles.json');
    var logAreas = []
    dbWriteable.set(db)

    var location = ''
    var locations = []

    
    onMount(async () => {
        locations = await getLocationsData();
        document.title = 'Add Log';
        const loc = locations
        if(loc != null){
            let joined = JSON.parse(loc);
            combinedLocations = joined;
        }
    
        const dbData = await db;
        const resolvedDbData = await dbData.default;
        logAreas = resolvedDbData.logItemTypes;
        // console.log(logAreas)

        inputDate = new Date().toISOString().split('T')[0];

    });

    function promptSuggestions(){
        locationSuggestions = []
        // console.log(combinedLocations)
        if(location != '' && combinedLocations){
            for(const item in combinedLocations){
                // console.log(combinedLocations[item])
                if (combinedLocations[item] && combinedLocations[item].toLowerCase().includes(location)) {
                    locationSuggestions.push(combinedLocations[item]);
                }
            }
        }
        // console.log(location)
        // console.log(locationSuggestions)
    }

    function selectLocation(o){
        location = o.detail.text
        locationSuggestions = []
    }
    
    function inputType(type, logItem) {
        // console.log(type)
        inputVariant.set(type.variants);
        // console.log("variants");
        // console.log(inputVariant);
    
        logNumbers.update(numbers => {
            return numbers.map(t => {
                if (t.id === logItem.id) {
                    t.type = type.name;
                    t.dropdown_2 = 'variant';
                }
                return t;
            });
        });
    }

    async function inputVariantBtn(variant, logItem) {
        logNumbers.update(numbers => {
            return numbers.map(t => {
                if (t.id === logItem.id) {
                    t.variant = variant.name
                    t.dropdown_2 = '';
                    t.dropdown = false;
                }
                return t;
            });
        });

        let logs = await getLogsData();
        // console.log(logs)
        if (logs && logs.length > 0) {
            const parsedLogs = JSON.parse(logs);
            parsedLogs.forEach(item => {
                if(item.number === logItem.name){
                    item.type = logItem.type;
                    item.variant = logItem.variant;
                }
            });
           await writeLogsData(parsedLogs);
        }
    }
    
    function inputAreaBtn(area, logItem) {
        inputArea.set(area);
        // console.log(area);
        logNumbers.update(numbers => {
            return numbers.map(t => {
                if (t.id === logItem.id && t.vehicleType === logItem.vehicleType) {
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
        // check local storage to see if logItem is already in logs
        let logs = await getLogsData()
        let vehFound = false
        let veh = null;
        if (logs && logs.length > 0) {
            console.log("woop2")
            console.log(logs)
            vehFound = logs.some(log => log.number === inputNumber);
            if (vehFound) {
                veh = logs.find(log => log.number === inputNumber);
            }
        }else{
            console.log("no log");
        }

        if(vehFound && veh){
            logNumbers.update(numbers => {
                return [...numbers, {"id": id, "vehicletype":"","number":veh.number,"type":veh.type,"variant":veh.variant, "dropdown":false, "dropdown_2":""}];
            });
        }else{
            logNumbers.update(numbers => {
                return [...numbers, {"id": id, "vehicletype":"","number":veh.number,"type":"","variant":"", "dropdown":false, "dropdown_2":""}];
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

    function removeLog(logItemId){
        logNumbers.update(numbers => {
            return numbers.filter(number => number.id != logItemId);
        });
    }

    function closeDropdown(logItem){
        logNumbers.update(numbers => {
            return numbers.map(t => {
                if (t.id === logItem.id) {
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


        if(location == ''){
            if(!$noLocation){
                customAlertSummon("No location selected", "err");
                return;
            }
        }

        if(inputDate == ''){
            customAlertSummon("No date selected", "err");
            return;
        }

        if($logNumbers.length == 0){
            customAlertSummon("No numbers added", "err");
            return;
        }

        var loc = await getAllLocations();
        if(loc != null){
            const parsedLoc = JSON.parse(loc);
            var found = false;
            for(var locs in parsedLoc){
                if(locs == from){
                    found = true;
                }
            }
            if(found = false){
                parsedLoc.push({"name":location, "country":sCountry})
            }
        }

        let logs = await getLogsData();
        if (!logs) {
            logs = JSON.stringify([]);
        }

        if($preciseLocation && preciseLat && preciseLon){
            logNumbers.subscribe(async numbers => {
            const numbersWithLocation = numbers.map(({ dropdown, dropdown_2, id, ...item }) => ({
                ...item,
                log_location: location,
                log_date: inputDate,
                log_time: inputTime,
                log_lat: preciseLat,
                log_lon: preciseLon
            }));
            console.log(numbersWithLocation)

            console.log(numbers)
            const addNew = JSON.parse(logs).concat(numbersWithLocation);
            await writeLogsData(addNew);
            console.log(addNew);
        });
        }else{
            logNumbers.subscribe(async numbers => {
                const numbersWithLocation = numbers.map(({ dropdown, dropdown_2, id, ...item }) => ({
                    ...item,
                    log_location: location,
                    log_date: inputDate,
                    log_time: inputTime
                }));

                console.log(numbers)
                const addNew = JSON.parse(logs).concat(numbersWithLocation);
                await writeLogsData(addNew);
                console.log(addNew);
            });

        }


        let logreplace = inputDate.replace('/', '-');
        console.log(logreplace)
        window.location.href = `../overview/${logreplace}`;
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

        function inputVType(type, logItem){
            logNumbers.update(numbers => {
                return numbers.map(t => {
                    if (t.id === logItem.id) {
                        t.vehicletype = type;
                        t.dropdown_2 = 'area';
                    }
                    return t;
                });
            });
        }




    
</script>

