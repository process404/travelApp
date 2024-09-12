<div style="width: 100vw; display: flex; flex-direction: column; overflow-y:scroll" id="app">
<Nav ver="back"/>
    <div class="flex flex-col items-center h-full justify-start overflow-y-scroll customScrollbar overflow-x-hidden">
        <div class="max-w-[1000px] w-full flex flex-col h-full">
            <div class="flex flex-col items-center border-[1px] rounded-md border-neutral-700 sm:ml-8 ml-2 mr-2 sm:mr-8 h-full sm:pt-6 sm:pb-6 pl-4 pr-4 pb-4">
                {#if plansFromDB.length == 0}
                <h2 class="text-white text-xl font-semibold sm:mt-1 mt-5 mb-7">Your Planning</h2>
                <div class="h-full flex items-center justify-center flex-col gap-4">
                    <h3 class="text-neutral-400 italic mt-2 text-md">You have no plans yet</h3>
                    <div class="flex gap-2 flex-col">
                        <button class="button blue pl-8 pr-8 xl-padding" on:click={createPlanPg}>Create a plan</button>
                        <button class="button green pl-8 pr-8 xl-padding" on:click={loadFromData}>Load from data</button>
                        <!-- <button class="fadeButton green p-2 pl-8 pr-8">Load from String</button> -->
                    </div>
                </div>
                {:else}
                <h2 class="text-white text-xl font-semibold sm:mt-1 mt-5 mb-7">Your Planning</h2>
                <div class="flex flex-col w-full h-full overflow-y-scroll customScrollbar sm:ml-0 items-center gap-3">
                        {#each plansFromDB as plan}
                        <button class="w-full border-[1px] rounded-md border-neutral-700 p-3 bg-black bg-opacity-30 text-left focus:border-white duration-100 hover:border-white hover:border-opacity-50  max-w-[700px]" on:click={() => window.location.href = '/planning/trip/' + plan.tripID}>
                            <div class="flex items-center gap-4 justify-between">
                                <h3 class="text-white italic font-semibold text-xl">{plan.name}</h3>
                                <div class="flex gap-2">
                                    {#if timeToStart(plan) < 10}
                                        {#if timeToEnd(plan) < 0}
                                            <h3 class="text-white bg-red-700 pl-2 pr-2 p-1 rounded-sm text-xs italic border-red-600 border-[1px] bg-opacity-20">Ended {timeToEnd(plan)} days ago</h3>
                                        {:else if timeToEnd(plan) < getDays(plan)}
                                            <h3 class="text-white bg-red-700 pl-2 pr-2 p-1 rounded-sm text-xs italic border-red-600 border-[1px] bg-opacity-20">Ongoing ({timeToStart(plan)} days to end)</h3>
                                        {:else}
                                            <h3 class="text-white bg-red-700 pl-2 pr-2 p-1 rounded-sm text-xs italic border-red-600 border-[1px] bg-opacity-20">Begins in {timeToStart(plan)} days</h3>
                                        {/if}
                                    {:else}
                                        <h3 class="text-white bg-neutral-800 pl-2 pr-2 p-1 rounded-sm text-xs italic">Begins in {timeToStart(plan)} days</h3>
                                    {/if}
                                </div>
                            </div>
                            <hr class="mt-2 opacity-20">
                            <div class="flex w-full mt-3 gap-2 flex-wrap">
                                <div class="bg-neutral-800 flex pl-3 pr-3 p-1 rounded-sm gap-2 items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-alarm fill-white opacity-30" viewBox="0 0 16 16">
                                    <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9z"/>
                                    <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1zm1.038 3.018a6 6 0 0 1 .924 0 6 6 0 1 1-.924 0M0 3.5c0 .753.333 1.429.86 1.887A8.04 8.04 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5M13.5 1c-.753 0-1.429.333-1.887.86a8.04 8.04 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1"/>
                                    </svg>
                                    <div>

                                        <h4 class="text-white text-sm">{getDays(plan)} days</h4>
                                    </div>
                                </div>
                                <div class="bg-neutral-800 flex pl-3 pr-3 p-1 rounded-sm gap-2 items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar fill-white opacity-30" viewBox="0 0 16 16">
                                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
                                    </svg>
                                    <h4 class="text-white text-sm">{formatDate(plan.start)} to {formatDate(plan.end)}</h4>
                                </div>
                                <div class="bg-neutral-800 flex pl-3 pr-3 p-1 rounded-sm gap-2 items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bus-front-fill fill-white opacity-30" viewBox="0 0 16 16">
                                        <path d="M16 7a1 1 0 0 1-1 1v3.5c0 .818-.393 1.544-1 2v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5V14H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2a2.5 2.5 0 0 1-1-2V8a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1V2.64C1 1.452 1.845.408 3.064.268A44 44 0 0 1 8 0c2.1 0 3.792.136 4.936.268C14.155.408 15 1.452 15 2.64V4a1 1 0 0 1 1 1zM3.552 3.22A43 43 0 0 1 8 3c1.837 0 3.353.107 4.448.22a.5.5 0 0 0 .104-.994A44 44 0 0 0 8 2c-1.876 0-3.426.109-4.552.226a.5.5 0 1 0 .104.994M8 4c-1.876 0-3.426.109-4.552.226A.5.5 0 0 0 3 4.723v3.554a.5.5 0 0 0 .448.497C4.574 8.891 6.124 9 8 9s3.426-.109 4.552-.226A.5.5 0 0 0 13 8.277V4.723a.5.5 0 0 0-.448-.497A44 44 0 0 0 8 4m-3 7a1 1 0 1 0-2 0 1 1 0 0 0 2 0m8 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m-7 0a1 1 0 0 0 1 1h2a1 1 0 1 0 0-2H7a1 1 0 0 0-1 1"/>
                                      </svg>
                                    <h4 class="text-white text-sm">{countJourneys(plan)} journeys</h4>
                                </div>
                                <div class="bg-neutral-800 flex pl-3 pr-3 p-1 rounded-sm gap-2 items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill fill-white opacity-30" viewBox="0 0 16 16">
                                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                                      </svg>
                                    <h4 class="text-white text-sm">{countLocations(plan)} locations</h4>
                                </div>
                                <div class="bg-neutral-800 flex pl-3 pr-3 p-1 rounded-sm gap-2 items-center">
                                    {#if !isMobileDevice}
                                        {#each countries as country}
                                            <img src={country.src} alt={country.code} class="w-4 h-4"/>
                                        {/each}
                                    {:else}
                                        {#each countries as country}
                                            <h4 class="">{country.emoji}</h4>
                                        {/each}
                                    {/if}
                                </div>
                            </div>
                            <!-- Stuff to go here = start / end date / days (work this out) / perhaps number of journeys within trip-->
                        </button>
                        {/each}
                    </div>
                <div class="w-full border-neutral-700 rounded-md border-[1px] p-2 max-w-[700px] flex gap-4">
                    <button class="button blue w-full p-2" on:click={createPlanPg}>Create a plan</button>
                    <button class="button green w-1/2 p-2" on:click={loadFromData}>Load from data</button>
                </div>
                {/if}
            </div>
        </div>
    </div>
    <Footer/>
</div>

<script>
    import Nav from '../../lib/components/Nav.svelte';
    import Footer from '../../lib/components/Footer.svelte';
    import { europeanCountries } from '../planning/countries.js'
    import { onMount } from 'svelte';
    import '../../global.css'
    var plansFromDB = []

    import '../siteDB.js'
    import { writePlanningData, writeLocationsData, writeJourneysData, writeLogsData, getPlanningData, getLocationsData, getJourneysData, getLogsData } from '../siteDB';

    let isMobile = false;
    let isAndroid = false;
    let isIOS = false;
    let isMobileDevice = isMobile || isAndroid || isIOS;

    onMount(() => {
        const userAgent = navigator.userAgent.toLowerCase();
        isMobile = /mobile/.test(userAgent);
        isAndroid = /android/.test(userAgent);
        isIOS = /iphone|ipad|ipod/.test(userAgent);
        isMobileDevice = isMobile || isAndroid || isIOS;
    });

    
    onMount(async () => {
        document.title = 'Planning';
        if (await getPlanningData()) {
            plansFromDB = await getPlanningData();
            getFlags();
        }
    });

    function createPlanPg() {
        window.location.href = '/planning/createPlan';
    }

    function getDays(plan) {
        let start = new Date(plan.start);
        let end = new Date(plan.end);
        let diffTime = Math.abs(end - start);
        let days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return days + 1;
    }

    function formatDate(date) {
        let d = new Date(date);
        let day = d.getDate();
        let month = d.getMonth() + 1;
        let year = d.getFullYear();
        return `${day}/${month}/${year}`;
    }

    function countJourneys(plan) {
        let count = 0;
        for (const day in plan.days) {
            for (const journey in day.journeys) {
                count++;
            }
        }
        return count;
    }

    function timeToStart(plan) {
        let start = new Date(plan.start);
        let now = new Date();
        let diffTime = Math.abs(start - now);
        let days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return days;
    }

    function timeToEnd(plan){
        let end = new Date(plan.end);
        let now = new Date();
        let diffTime = Math.abs(end - now);
        let days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return days;
    }
    

    // Not used as within individual trip instead
    // async function deletePlan(plan, event){
    //     if (confirm("Are you sure you want to delete this plan? This action is permanent.")) {
    //         let newPlans = plansFromDB.filter(p => p.tripID != plan.tripID);
    //         writePlanningData(newPlans);
    //         window.location.href = '/planning';
    //     }
    // }

    import LZString from 'lz-string';
	import { offset } from '@floating-ui/dom';

    async function loadFromData(){
        let data = prompt('Please enter the data string');
        if(data){
            var decompressed = LZString.decompressFromBase64(data);
            let parsed = JSON.parse(decompressed);

            if (plansFromDB.some(p => p.tripID === parsed.tripID)) {
                alert('Journey with tripID already exists');
                parsed.tripID = [...Array(20)].map(() => {
                    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                    return characters[Math.floor(Math.random() * characters.length)];
                }).join('');

                plansFromDB.push(parsed);
                await writePlanningData(plansFromDB);
                window.location.href = '/planning';

            } else {
                plansFromDB.push(parsed);
                await writePlanningData(plansFromDB);
                window.location.href = '/planning';
            }
        }
    }

    function countLocations(plan){
        let locations = new Set();
        for (const dayKey in plan.days) {
            const day = plan.days[dayKey];
            for (const journey of day.journeys) {
                locations.add(journey.from);
                locations.add(journey.to);
            }
        }
        // console.log(locations);
        return locations.size;
    }

    function countCountries(plan){
        let countries = new Set();
        for (const dayKey in plan.days) {
            const day = plan.days[dayKey];
            for (const journey of day.journeys) {
                countries.add(journey.fromCountry);
                countries.add(journey.toCountry);
            }
        }
        console.log(countries);
        return countries.size;
    }

    
    
    var countries = []
    

    function getFlags() {
        for (const plan in plansFromDB) {
            for (const day of plansFromDB[plan].days) {
                for (const journey of day.journeys) {
                    if (journey.fromCountry && typeof journey.fromCountry === 'string') {
                        if(!isMobileDevice){
                            const fromCountryIndex = countries.findIndex(country => country.code === journey.fromCountry);
                            if (fromCountryIndex === -1) {
                                countries.push({ "code": journey.fromCountry, "src": `https://flagsapi.com/${journey.fromCountry}/flat/64.png` });
                            }
                        }else{
                            const fromCountryIndex = europeanCountries.findIndex(country => country.code === journey.fromCountry);
                            if (fromCountryIndex === -1) {
                                const fromCountryIndex = europeanCountries.findIndex(country => country.code === journey.fromCountry);
                                if (fromCountryIndex !== -1) {
                                    countries.push({ "code": journey.fromCountry, "emoji": europeanCountries[fromCountryIndex].emoji });
                                }
                            }
                        }
                    } else {
                        console.log(journey)
                        console.log(`Invalid fromCountry code: ${journey.fromCountry}`);
                    }

                    if (journey.toCountry && typeof journey.toCountry === 'string') {
                        const toCountryIndex = countries.findIndex(country => country.code === journey.toCountry);
                        if (toCountryIndex === -1) {
                            countries.push({ "code": journey.toCountry, "src": `https://flagsapi.com/${journey.toCountry}/flat/64.png` });
                        }
                    } else {
                        console.log(`Invalid toCountry code: ${journey.toCountry}`);
                    }
                }
            }
        }
        // console.log(countries);
        return countries;
    }

    function getCountryEmoji(code) {
        if (countries.length === 0) {
            getFlags();
        }
        const country = countryFlags.find(country => country.code === code);
        if (country) {
            console.log("src", country.src);
            return country.src;
        }
        return "";
    }
    
    
</script>
