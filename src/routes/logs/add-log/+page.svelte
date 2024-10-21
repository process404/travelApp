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
                                {#if loadStns}
                                    <div class="w-full flex items-center justify-center border-neutral-700 border-[1px] rounded-sm">
                                        <span class="loader" style="margin-top:0.5rem; margin-bottom: 0.5rem"></span>
                                    </div>
                                {:else}
                                    <PromptField ds={locations} on:select={selectLocation} bind:value={location} disabled={$noLocation} ver="loc" bind:presetC={locationC} adDs={allStns}/>
                                {/if}
                            </div>
                        </div>
                        <div class="flex gap-4" class:disabledLoc={locationObj != null}>
                            <div class="mt-3 flex gap-2 items-center">
                                <input type="checkbox" class="checkbox blue" name="no_location" bind:checked={$noLocation}>
                                <label for="no_location" class="text-neutral-500 italic  text-xs">No location</label>
                            </div>
                            <div class="mt-3 flex gap-2 items-center">
                                <input type="checkbox" class="checkbox blue" name="no_location" bind:checked={$preciseLocation} on:click={() => {locationToggle()}}>
                                <label for="no_location" class="text-neutral-500 italic  text-xs">Include device location</label>
                            </div>
                            
                        </div>
                    </div>
                    <div class="border-[1px] border-neutral-700 rounded-md sm:mt-8 mt-4 w-full max-w-[500px] p-4">
                        <h3 class="text-neutral-300 italic">Date / Time</h3>
                        <div class="flex gap-1 sm:gap-3 flex-col sm:flex-row" class:opacity-50={$noDT} class:pointer-events-none={$noDT} >
                            <input type="date" class="input blue mt-2 iconEdit w-full" bind:value={inputDate}>
                            <input type="time" class="input blue mt-2 iconEdit w-full" bind:value={inputTime}>
                        </div>
                        <div class="mt-3 flex gap-2 items-center">
                            <input type="checkbox" class="checkbox blue" name="no_location" bind:checked={$noDT}>
                            <label for="no_location" class="text-neutral-500 italic  text-xs">No Date / Time</label>
                        </div>
                    </div>
                    <div class="border-[1px] border-neutral-700 rounded-md sm:mt-8 mt-4 w-full max-w-[500px] p-4">
                        <h3 class="text-neutral-300 italic">Numbers</h3>
                        <div class="mt-2 flex gap-2 items-center flex-wrap">
                            <div class="flex mb-2 rounded-md border-neutral-800 gap-1 w-full items-start">
                                <ul class="gap-1 input w-full min-h-[150px] flex-wrap" role="presentation" on:click|self={() => {document.getElementById('numberEntryInput').focus()}}>
                                    {#if logNumbers.length != 0}
                                        {#each $logNumbers as logItem}
                                            <li class="relative mb-1 inline-block">
                                                <button on:click={() => {logItem['dropdown'] = !logItem['dropdown']; document.getElementById('numberEntryInput').blur()}} class=" bg-blue-800 button blue2 textWhite pl-2 pr-2 sm s-padding mr-1">{logItem['number']} ({logItem['type']} - {logItem['variant']})</button>
                                                
                                                {#if logItem['dropdown']}
                                                    <button class="z-30 fixed w-screen h-screen hover:cursor-default left-0 top-0" on:click={closeDropdown(logItem, false)}></button>
                                                {/if}
                                                
                                                {#if logItem['dropdown']}
                                                <div class="absolute z-40 left-0 top-100 bg-[rgb(15,15,15)] p-2 w-auto min-h-8 rounded-md rounded-t-none border-[1px] border-neutral-800 min-w-[75px] max-h-[200px] overflow-y-scroll sm:max-h-[300px] pr-0 ">
                                                    {#if logItem['dropdown_2'] == ''}
                                                    <div class="flex gap-2 min-w-[180px]">
                                                        <button class="sm button red pl-2 pr-2 w-full" on:click={removeLog(logItem['id'], false)}>Remove</button>
                                                        <button class="sm button blue pl-2 pr-2 w-full" on:click={() => logItem['dropdown_2'] = "section"}>Edit type</button>
                                                    </div>
                                                    {/if}

                                                    {#if logItem.dropdown_2 === "section"}
                                                    <h3 class="text-white text-sm">Select Vehicle Type</h3>
                                                    <div class="min-w-[200px] w-full flex flex-wrap gap-1 mt-1">
                                        
                                                        <button class="button sm blue2 textWhite pl-2 pr-2" on:click={() => inputVType("Train", logItem, false)}>Train</button>
                                                        <button class="button sm blue2 textWhite pl-2 pr-2" on:click={() => inputVType("Bus / Coach", logItem, false)}>Bus / Coach</button>
                                                        <button class="button sm blue2 textWhite pl-2 pr-2" on:click={() => inputVType("Others", logItem, false)}>Other</button>
                                                    </div>
                                                    {/if}

                                                    {#if logItem.dropdown_2 === "area"}
                                                        <h3 class="text-white text-sm">Select Area</h3>
                                                        <div class="min-w-[200px] w-full flex flex-wrap gap-1 mt-1">
                                                            {#each logAreas as area}
                                                                <button class="button sm blue2 textWhite pl-2 pr-2" on:click={() => inputAreaBtn(area, logItem, false)}>{area.area}</button>
                                                            {/each}
                                                        </div>
                                                    {/if}
                                                    {#if logItem.dropdown_2 === "type"}
                                                        <h3 class="text-white text-sm">Select Type</h3>
                                                        <div class="min-w-[200px] w-full flex flex-wrap gap-1 mt-1">
                                                            {#if logItem['vehicletype'] == 'Train'}
                                                            {#each $inputArea.trainTypes as type}
                                                                    <button class="button sm blue2 textWhite pl-2 pr-2" on:click={() => inputType(type, logItem, false)}>{type.name}</button>
                                                                {/each}
                                                            {:else if logItem['vehicletype'] == "Bus / Coach"}
                                                            {#each $inputArea.busTypes as type}
                                                                    <button class="button sm blue2 textWhite pl-2 pr-2" on:click={() => inputType(type, logItem, false)}>{type.name}</button>
                                                                {/each}
                                                            {:else if logItem['vehicletype'] == "Others"}
                                                                {#each $inputArea.otherTypes as type}
                                                                <button class="button sm blue2 textWhite pl-2 pr-2" on:click={() => inputType(type, logItem, false)}>{type.name}</button>
                                                                {/each}
                                                                {/if}
                                                            <button class="button sm red textWhite pl-2 pr-2" on:click={() => logItem.dropdown_2 = 'area'}>Back</button>
                                                        </div>
                                                    {/if}
                                                    {#if logItem.dropdown_2 === "variant"}
                                                        <h3 class="text-white text-sm">Select Variant</h3>
                                                        <div class="min-w-[200px] w-full flex flex-wrap gap-1 mt-1  sm:min-w-[450px]">
                                                            {#each $inputVariant as variant}
                                                            <button class="button sm blue2 textWhite pl-2 pr-2" on:click={() => inputVariantBtn(variant, logItem, false)}>{variant.name}</button>
                                                            {/each}
                                                            <button class="button sm red textWhite pl-2 pr-2" on:click={() => logItem.dropdown_2 = 'type'}>Back</button>
                                                        </div>
                                                    {/if}
                                                </div>
                                                {/if}
                        
                                            </li>
                                        {/each}
                                    {/if}
                                    <input id="numberEntryInput" class="focus:border-white border-[1px] border-transparent bg-transparent w-auto mt-1 p-1   " on:keydown={handleKeyPressNumber} bind:value={inputNumber}/>
                                </ul>
                                <!-- <input placeholder="Enter Number" class="input w-full lighter" on:keydown={handleKeyPressNumber} bind:value={inputNumber}> -->
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
                                <!-- <button class="button p-[0.2rem] blue" on:click={() => {addNumber()}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus w-5 h-5" viewBox="0 0 16 16">
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                                </svg></button> -->
                            </div>
                    
                        </div>
                    </div>
                    <div class="border-[1px] border-neutral-700 rounded-md sm:mt-8 mt-4 w-full max-w-[500px] p-4">
                        <h3 class="text-neutral-300 italic">Photographs</h3>
                        {#if pictures.length == 0 && addPhoto == false}
                            <div class="border-neutral-700 rounded-md p-2 border-[1px] mt-2">
                                <h4 class="text-neutral-500 italic w-full text-center mb-2 border-neutral-700 border-[1px] pt-2 pb-2">No Photographs</h4>
                                <button class="button blue w-full p-2 text-sm x-padding" on:click={() => {addPhoto = true;}}>Add Photograph</button>
                            </div>
                        {:else}
                            <ul class="border-neutral-700 rounded-md p-2 border-[1px] mt-2">
                                {#if !addPhoto}
                                <li class="border-neutral-700 rounded-md pb-2">
                                    {#each pictures as picture}
                                        <div class="flex gap-4 border-neutral-700 border-[1px] justify-between p-2 mt-2 first:mt-0">
                                            <img src={picture.src} alt={picture.alt} class="w-1/2 border-[1px] border-neutral-800 outline-none">
                                            <div class="w-full flex gap-1 flex-col">
                                                <h3 class="text-neutral-300">{picture.numbers.toString().replace(",",", ")}</h3>
                                                <div class="mt-auto flex items-end justify-end w-full gap-4 mr-1">
                                                    <!-- <h3 class="text-white text-xs sm:inline-block hidden">{picture.file_name}</h3> -->
                                                    <button class="button hover:before:bg-red-700 hover:before:bg-opacity-50" on:click={() => {removePicture(picture)}}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                      </svg>
                                                      </button>
                                                </div>
                                            </div>
                            
                                        </div>
                                    {/each}
                                </li>
                                <button class="button blue w-full p-2 text-sm x-padding" on:click={() => {addPhoto = true}}>Add Photograph</button>
                                {:else}
                                <div class="border-neutral-700 rounded-md pb-2">
                                    <div class="flex gap-4 border-neutral-700 border-[1px] justify-between p-2 flex-col rounded-md">
                                        <div class="w-full overflow-hidden">
                                            <h3 class="text-neutral-300 italic">Image</h3>
                                            <input type="file" class="text-white mt-2 text-sm" on:input={() => {handlePhotoProcess()}} bind:value={selectedPhoto}>
                                        </div>
                                        {#if selectedPhotoSrc != ''}
                                            <div class="overflow-hidden">
                                                <h3 class="text-neutral-300 italic">Selected File</h3>
                                                <img alt={selectedPhotoAlt} src={selectedPhotoSrc} class="w-full mt-2 border-neutral-700 p-1 rounded-sm border-[1px]">
                                            </div>
                                        {/if}
                                        <div>
                                            <h3 class="text-neutral-300 italic">Numbers</h3>
                                            <ul class="input w-full min-h-[100px] flex-wrap mt-2" role="presentation" on:click|self={() => {document.getElementById('photoNumberAdd').focus()}}>
                                                {#if $photoLogNumbers.length > 0}
                                                    {#each $photoLogNumbers as logItem}
                                                    <li class="relative mb-1 inline-block">
                                                        <button on:click={() => {logItem['dropdown'] = !logItem['dropdown']; document.getElementById('numberEntryInput').blur()}} class=" bg-blue-800 button blue2 textWhite pl-2 pr-2 sm s-padding mr-1">{logItem['number']} ({logItem['type']} - {logItem['variant']})</button>
                                                        
                                                        {#if logItem['dropdown']}
                                                            <button class="z-30 fixed w-screen h-screen hover:cursor-default left-0 top-0" on:click={closeDropdown(logItem, true)}></button>
                                                        {/if}
                                                        
                                                        {#if logItem['dropdown']}
                                                        <div class="absolute z-40 left-0 top-100 bg-[rgb(15,15,15)] p-2 w-auto min-h-8 rounded-md rounded-t-none border-[1px] border-neutral-800 min-w-[75px] max-h-[200px] overflow-y-scroll sm:max-h-[300px] pr-0 ">
                                                            {#if logItem['dropdown_2'] == ''}
                                                            <div class="flex gap-2 min-w-[180px]">
                                                                <button class="sm button red pl-2 pr-2 w-full" on:click={removeLog(logItem['id'], true)}>Remove</button>
                                                                <button class="sm button blue pl-2 pr-2 w-full" on:click={() => logItem['dropdown_2'] = "section"}>Edit type</button>
                                                            </div>
                                                            {/if}
        
                                                            {#if logItem.dropdown_2 === "section"}
                                                            <h3 class="text-white text-sm">Select Vehicle Type</h3>
                                                            <div class="min-w-[200px] w-full flex flex-wrap gap-1 mt-1">
                                                
                                                                <button class="button sm blue2 textWhite pl-2 pr-2" on:click={() => inputVType("Train", logItem, true)}>Train</button>
                                                                <button class="button sm blue2 textWhite pl-2 pr-2" on:click={() => inputVType("Bus / Coach", logItem, true)}>Bus / Coach</button>
                                                                <button class="button sm blue2 textWhite pl-2 pr-2" on:click={() => inputVType("Others", logItem, true)}>Other</button>
                                                            </div>
                                                            {/if}
        
                                                            {#if logItem.dropdown_2 === "area"}
                                                                <h3 class="text-white text-sm">Select Area</h3>
                                                                <div class="min-w-[200px] w-full flex flex-wrap gap-1 mt-1">
                                                                    {#each logAreas as area}
                                                                        <button class="button sm blue2 textWhite pl-2 pr-2" on:click={() => inputAreaBtn(area, logItem, true)}>{area.area}</button>
                                                                    {/each}
                                                                </div>
                                                            {/if}
                                                            {#if logItem.dropdown_2 === "type"}
                                                                <h3 class="text-white text-sm">Select Type</h3>
                                                                <div class="min-w-[200px] w-full flex flex-wrap gap-1 mt-1">
                                                                    {#if logItem['vehicletype'] == 'Train'}
                                                                    {#each $inputArea.trainTypes as type}
                                                                            <button class="button sm blue2 textWhite pl-2 pr-2" on:click={() => inputType(type, logItem, true)}>{type.name}</button>
                                                                        {/each}
                                                                    {:else if logItem['vehicletype'] == "Bus / Coach"}
                                                                    {#each $inputArea.busTypes as type}
                                                                            <button class="button sm blue2 textWhite pl-2 pr-2" on:click={() => inputType(type, logItem, true)}>{type.name}</button>
                                                                        {/each}
                                                                    {:else if logItem['vehicletype'] == "Others"}
                                                                        {#each $inputArea.otherTypes as type}
                                                                        <button class="button sm blue2 textWhite pl-2 pr-2" on:click={() => inputType(type, logItem, true)}>{type.name}</button>
                                                                        {/each}
                                                                        {/if}
                                                                    <button class="button sm red textWhite pl-2 pr-2" on:click={() => logItem.dropdown_2 = 'area'}>Back</button>
                                                                </div>
                                                            {/if}
                                                            {#if logItem.dropdown_2 === "variant"}
                                                                <h3 class="text-white text-sm">Select Variant</h3>
                                                                <div class="min-w-[200px] w-full flex flex-wrap gap-1 mt-1  sm:min-w-[450px]">
                                                                    {#each $inputVariant as variant}
                                                                        <button class="button sm blue2 textWhite pl-2 pr-2" on:click={() => inputVariantBtn(variant, logItem, true)}>{variant.name}</button>
                                                                    {/each}
                                                                    <button class="button sm red textWhite pl-2 pr-2" on:click={() => logItem.dropdown_2 = 'type'}>Back</button>
                                                                </div>
                                                            {/if}
                                                        </div>
                                                        {/if}
                                
                                                    </li>
                                                    {/each}
                                                {/if}
                                                <input type="text" class="focus:border-white border-[1px] border-transparent bg-transparent w-auto mt-1 p-1 " id="photoNumberAdd" on:keydown={handleKeyPressNumberPhoto} bind:value={inputNumberPhoto}/>
                                            </ul>
                                        </div>
                                        
                                        <div class="flex gap-2">
                                            <button class="button red w-full p-2 text-sm x-padding" on:click={() => {addPhoto = false; selectedPhoto = ''; selectedPhotoSrc = ''; $photoLogNumbers = []}}>Cancel</button>
                                            <button class="button blue w-full p-2 text-sm x-padding" on:click={() => {addPhotoLog()}}>Add</button>
                                        </div>
                                    </div>
                                </div>
                                {/if}
                            </ul>
                        {/if}
                        <div>

                            
                        </div>
                    </div>
                    <div class="border-[1px] border-neutral-700 rounded-md sm:mt-8 mt-4 w-full max-w-[500px] p-4">
                        <h3 class="text-neutral-300 italic">Notes</h3>
                        <textarea class="input blue text-xs resize-none w-full mt-2" maxlength="500" rows="4" placeholder="" bind:value={inputNote}></textarea>
                    </div>
                    <div class="border-[1px] border-neutral-700 rounded-md sm:mt-16 mt-8 w-full max-w-[500px] p-4">
                    <button class="button blue w-full p-2 text-sm x-padding" on:click={confirmLog}>Submit Log</button>
                    </div>
                    
                </div>
            </div>
        </div>
        <div class="mt-auto">
            <Footer/>
        </div>
</div>

<script>
    import { getAllContexts, onMount, tick } from 'svelte';
    import Nav from '../../../lib/components/Nav.svelte';
    import Footer from '../../../lib/components/Footer.svelte';
    import CustomAlert from '../../../lib/components/Alert.svelte';
    import PromptField from '../../../lib/components/PromptField.svelte';
    import Compressor from 'compressorjs';
    import '../../siteDB.js'
    import { writePlanningData, writeLocationsData, writeJourneysData, writeLogsData, getPlanningData, getLocationsData, getJourneysData, getLogsData } from '../../siteDB';
    import '../../../global.css'

    import { writable } from 'svelte/store';
    var combinedLocations = null;
    var locationSuggestions = []
    var logNumbers = writable([])
    var photoLogNumbers = writable([]);
    var dbWriteable = writable([])

    var typeDropdown = false;
    var inputNumber = ''
    var inputNumberPhoto = ''
    var inputArea = writable([])
    var inputVariant = writable([])
    var inputDate = ''
    var inputTime = ''
    var sCountry = ''
    var pictures = [];
    var preciseLocation = writable(false)
    var preciseLat;
    var preciseLon;
    var noLocation = writable(false);
    var noDT = writable(false)
    var id = 0
    
    var alrtTxt  = writable('')
    var alrtAct = writable(false)
    var alrtMode = writable('err')
    var inputNote = ''

    var db = import ('../../../db/vehicles.json');
    var logAreas = []
    dbWriteable.set(db)
    var loadStns = true;

    var location = ''
    var locationC = ''
    var locationID = ''
    var locationObj = null;
    var locations = []

    $: if (location) {
        if(location.length < 2){
            locationObj = null;
        }
    }
    
    let selectedPhotoSrc = '';
    let selectedPhotoAlt = "Selected Photo";
    let selectedPhoto = ''
    let addPhoto = false;

    onMount(() => {
        const settings = JSON.parse(localStorage.getItem('settings'));
        if (settings.darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    });




    function handlePhotoProcess(){
        const files = event.target.files;
        if (!files || files.length === 0) {
            console.error('No file selected');
            return;
        }

        const file = files[0];
        const reader = new FileReader();
        reader.onload = () => {
            selectedPhotoSrc = reader.result;
            selectedPhotoAlt = file.name;
            tick();
        };
        reader.readAsDataURL(file);
    
        console.log(`Original file size: ${file.size} bytes`);
        new Compressor(file, {
            quality: 0.3,
            success(result) {
            console.log(`Compressed file size: ${result.size} bytes`);
            const reader = new FileReader();
            reader.onload = () => {
                selectedPhotoSrc = reader.result;
                selectedPhotoAlt = file.name;
                tick();
            };
            reader.readAsDataURL(result);
            },
            error(err) {
            console.error(err.message);
            },
        });
    }

    
    import additionalStns from '../../../db/additionalStations.json'
    import { tl_getAllData, tl_putData } from '../../tl_stationsDB';
    let allStns = null;

    // Get stations mount
    onMount(async () => {
        const module = await import('../../../db/vehicles.json');
        db = module.default; 
        locations = await getLocationsData();
        // console.log(locations)
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
                    const worker = new Worker(new URL('../../stationWorker.js', import.meta.url), { type: 'module' });
                    worker.onmessage = async (event) => {
                        // console.log(event.data)
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

        for(var area in db.vehTypes){
            // console.log(db.vehTypes)
            // console.log(db.vehTypes[area].area)
            logAreas.push(db.vehTypes[area])
        }

        // console.log(logAreas)
    });

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


    function addPhotoLog(){
        // Use the store value reactively
        
        if($photoLogNumbers.length === 0) {
            $alrtMode = 'err';
            $alrtTxt = 'No numbers added to photo';
            $alrtAct = true;
            return;
        }

        let numbers = $photoLogNumbers.map(number => number.number);

        pictures.push({
            "src": selectedPhotoSrc,
            "alt": selectedPhotoAlt,
            "numbers": numbers,
            "file_name": selectedPhotoAlt
        });


        selectedPhoto = '';
        selectedPhotoSrc = '';
        addPhoto = false;

        $alrtMode = 'success';
        $alrtTxt = 'Photo added successfully';
        $alrtAct = true;

        // Reset the store
        photoLogNumbers.set([]);


    }

    function selectLocation(o){
        locationObj = o.detail.text;
        location = o.detail.text.name;
        locationID = o.detail.text.id;
        console.log(location, locationID, locationObj);
    }
    
    function inputType(type, logItem, photo) {
        const updateNumbers = (numbers) => {
            return numbers.map(t => {
                if (t.id === logItem.id) {
                    t.type = type.name;
                    t.dropdown_2 = 'variant';
                }
                return t;
            });
        };

        inputVariant.set(type.variants);
        if (!photo) {
            logNumbers.update(updateNumbers);
        } else {
            photoLogNumbers.update(updateNumbers);
        }
    }

    
    function inputVType(type, logItem, photo){
        // console.log("ran")
        if(!photo){
            logNumbers.update(numbers => {
                return numbers.map(t => {
                    if (t.id === logItem.id) {
                        t.vehicletype = type;
                        t.dropdown_2 = 'area';
                    }
                    return t;
                });
            });
            // console.log(logNumbers)
        }else{
            photoLogNumbers.update(numbers => {
            return numbers.map(t => {
                if (t.id === logItem.id) {
                    t.vehicletype = type;
                    t.dropdown_2 = 'area';
                }
                return t;
            });
            console.log(photoLogNumbers)
        });
        }
    }


    async function inputVariantBtn(variant, logItem, photo) {
        const updateNumbers = (numbers) => {
            return numbers.map(t => {
                if (t.id === logItem.id) {
                    t.variant = variant.name;
                    t.dropdown_2 = '';
                    t.dropdown = false;
                }
                return t;
            });
        };

        if (!photo) {
            logNumbers.update(updateNumbers);
        } else {
            photoLogNumbers.update(updateNumbers);
        }

        let logs = await getLogsData();
        if (logs && logs.length > 0) {
            console.log(logs);
            const parsedLogs = logs
            parsedLogs.forEach(item => {
                if (item.number === logItem.name) {
                    item.type = logItem.type;
                    item.variant = logItem.variant;
                }
            });
        }
    }

    
    function inputAreaBtn(area, logItem, photo) {
        inputArea.set(area);
        console.log($inputArea)
        if(!photo){
            logNumbers.update(numbers => {
                return numbers.map(t => {
                    if (t.id === logItem.id && t.vehicleType === logItem.vehicleType) {
                        t.area = area.area;
                        t.dropdown_2 = 'type';
                    }
                    return t;
                });
            });
        }else{
            photoLogNumbers.update(numbers => {
                return numbers.map(t => {
                    if (t.id === logItem.id && t.vehicleType === logItem.vehicleType) {
                        t.area = area.area;
                        t.dropdown_2 = 'type';
                    }
                    return t;
                });
            });
        }
    }


    function clearLocation(){
        location = ''
        locationSuggestions = []
    }

    async function addNumber(photo){
        id++;
        let logs = await getLogsData();
        let vehFound = false;
        let veh = null;
        let input = photo ? inputNumberPhoto : inputNumber;

        if (logs && logs.length > 0) {
            vehFound = logs.some(log => log.number === input);
            if (vehFound) {
            veh = logs.find(log => log.number === input);
            }
        }

        if (!vehFound) {
            logNumbers.subscribe(numbers => {
                vehFound = numbers.some(log => log.number === input);
                if (vehFound) {
                    veh = numbers.find(log => log.number === input);
                }
            });
        }

        let newLogItem = {
            id: id,
            vehicletype: "",
            number: vehFound && veh ? veh.number : input,
            type: vehFound && veh ? veh.type : "",
            variant: vehFound && veh ? veh.variant : "",
            dropdown: false,
            dropdown_2: ""
        };

        if (!photo) {
            logNumbers.update(numbers => [...numbers, newLogItem]);
            inputNumber = '';
        } else {
            photoLogNumbers.update(numbers => [...numbers, newLogItem]);
            inputNumberPhoto = '';
        }
    };
        

    function handleKeyPressNumber(e){
        if(e.key == 'Enter'){
            if (inputNumber != '') {
                let numberExists = false;
                $logNumbers.forEach(logItem => {
                    if (logItem.number === inputNumber) {
                        numberExists = true;
                    }
                });
                if (!numberExists) {
                    addNumber(false);
                }
            }
        }
        if (e.key === 'Backspace' && inputNumber === '') {
            logNumbers.update(numbers => {
                if (numbers.length > 0) {
                    numbers.pop();
                }
                return numbers;
            });
        }
    }

    function handleKeyPressNumberPhoto(e){
        if(e.key == 'Enter'){
            if (inputNumberPhoto != '') {
                let numberExists = false;
                $photoLogNumbers.forEach(logItem => {
                    if (logItem.number === inputNumberPhoto) {
                        numberExists = true;
                    }
                });
                if (!numberExists) {
                    addNumber(true);
                }
            }
        }
        if (e.key === 'Backspace' && inputNumberPhoto === '') {
            photoLogNumbers.update(numbers => {
                if (numbers.length > 0) {
                    numbers.pop();
                }
                return numbers;
            });
        }
    }

    function removeLog(logItemId, photo){
        if(!photo){
            logNumbers.update(numbers => {
                return numbers.filter(number => number.id != logItemId);
            });
        }else{
            photoLogNumbers.update(numbers => {
            return numbers.filter(number => number.id != logItemId);
        });
        }
    }


    function removePicture(picture){
        if (confirm("Are you sure you want to remove this picture?")) {
            pictures = pictures.filter(p => p.src != picture.src);
        }
        pictures = pictures.filter(p => p.src != picture.src);
    }

    function closeDropdown(logItem, photo){
        const updateNumbers = (numbers) => {
            return numbers.map(t => {
            if (t.id === logItem.id) {
                t.dropdown = false;
                t.dropdown_2 = '';
            }
            return t;
            });
        };

        if (!photo) {
            logNumbers.update(updateNumbers);
        } else {
            photoLogNumbers.update(updateNumbers);
        }
    }

    async function confirmLog(){

        var lat;
        var lon;


        if(location == ''){
            if(!$noLocation){
            customAlertSummon("No location selected", "err");
            return;
            }
        }

        if(inputDate == '' && !$noDT){
            customAlertSummon("No date selected", "err");
            return;
        }

        if($logNumbers.length == 0){
            customAlertSummon("No numbers added", "err");
            return;
        }

        

        var loc = await getLocationsData();
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

        if($preciseLocation && preciseLat && preciseLon && locationObj == null){
            logNumbers.subscribe(async numbers => {
                const numbersWithLocation = {
                    log_location: location,
                    log_loc_id: locationObj ? locationObj.id : null,
                    log_lat: locationObj ? locationObj.lat : null,
                    log_long: locationObj ? locationObj.long : null,
                    log_date: inputDate,
                    log_time: inputTime,
                    pictures: pictures,
                    logNotes: inputNote,
                    country: locationObj ? locationObj.country : sCountry,
                    numbers: numbers.map(({ dropdown, dropdown_2, id, ...item }) => ({
                        ...item
                    }))
                };

                const addNew = logs.concat(numbersWithLocation);
                console.log(addNew);
                await writeLogsData(addNew);
                console.log("done");
            });
        }else{
            if(locationObj != null){
            
                logNumbers.subscribe(async numbers => {
                    const numbersWithLocation = {
                        log_location: location,
                        log_loc_id: locationObj ? locationObj.id : null,
                        log_lat: locationObj ? locationObj.lat : null,
                        log_long: locationObj ? locationObj.long : null,
                        log_date: inputDate,
                        log_time: inputTime,
                        pictures: pictures,
                        logNotes: inputNote,
                        country: locationObj ? locationObj.country : sCountry,
                        numbers: numbers.map(({ dropdown, dropdown_2, id, ...item }) => ({
                            ...item
                        }))
                    };

                    const addNew = logs.concat(numbersWithLocation);
                    console.log(addNew);
                    await writeLogsData(addNew);
                    console.log("done");
                });
            }else{

                logNumbers.subscribe(async numbers => {
                    const numbersWithLocation = {
                        log_location: location,
                        log_loc_id: locationObj ? locationObj.id : null,
                        log_lat: locationObj ? locationObj.lat : null,
                        log_long: locationObj ? locationObj.long : null,
                        log_date: inputDate,
                        log_time: inputTime,
                        pictures: pictures,
                        logNotes: inputNote,
                        country: locationObj ? locationObj.country : sCountry,
                        numbers: numbers.map(({ dropdown, dropdown_2, id, ...item }) => ({
                            ...item
                        }))
                    };

                    const addNew = logs.concat(numbersWithLocation);
                    console.log(addNew);
                    await writeLogsData(addNew);
                    console.log("done");
                });

        }


        let logreplace = inputDate.replace('/', '-');
        $alrtMode = 'info';
        $alrtTxt = 'Processing...';
        $alrtAct = true;
        await sleep(1500)
        window.location.href = `../overview/${logreplace}`;
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    function customAlertSummon(text, mode){
        // console.log("Summoning alert")
        $alrtTxt = text;
        $alrtMode = mode;
        $alrtAct = true;
    }

}

    
</script>

<style>
     .loader{margin-top:12px;width:24px;height:24px;border:3px solid rgb(50,50,50);border-bottom-color:transparent;border-radius:50%;display:inline-block;box-sizing:border-box;animation:rotation 1s linear infinite}@keyframes rotation{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}

     .disabledLoc{
        @apply opacity-50 pointer-events-none
     }
</style>

