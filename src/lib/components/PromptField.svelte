{#if suggestions.length != 0}
    <button class="fixed w-screen h-screen z-40 left-0 top-0 cursor-default p-0" on:click={() => {suggestions = []}}></button>
{/if}
<div class="flex gap-1 w-full">
    <div class="relative w-full gap-2">
        <!--TO-DO add precise location info and country selector-->
        <input minlength="3" placeholder="" class="input blue w-full" bind:value on:input={() => promptSuggestions()} class:inputDisabled={disabled} disbled={disabled} class:reduced={red}>
        {#if suggestions.length != 0}
        <div class="absolute bottom-100 bg-neutral-800 border-[1px] border-neutral-700  p-2 w-full rounded-md rounded-t-none pl-4 pr-4 pb-4 z-50" style="filter:drop-shadow(0px 10px 20px rgba(0,0,0,0.5))">
            {#if !loading}
                {#each suggestions.slice(0,5) as suggestion}
                    <!-- {#if name.name != value && value.length < name.name.length && value.length > 0} -->
                    {#if !isMobileDevice}
                        <button on:click={() => selectItem(suggestion)} class="text-neutral-300 w-full text-sm text-left after:absolute after:bottom-[-0.3rem] after:hover:w-[97%] after:h-[1px] after:bg-white after:left-0 after:duration-100 after:w-0 before:absolute before:w-[97%] before:left-0 before:h-[1px] before:bg-neutral-600 before:top-[-0.33rem] first:before:hidden mt-2 relative flex items-center gap-2 font-light">
                            <span>{@html highlightMatch(suggestion, value)}</span>
                            <span><img src={`https://flagsapi.com/${suggestion.country}/flat/64.png`} class="w-4 h-4" alt={suggestion.country}></span>
                        </button>
                    {:else}
                        <button on:click={() => selectItem(suggestion)} class="text-neutral-300 w-full text-sm text-left after:absolute after:bottom-[-0.3rem] after:hover:w-[97%] after:h-[1px] after:bg-white after:left-0 after:duration-100 after:w-0 before:absolute before:w-[97%] before:left-0 before:h-[1px] before:bg-neutral-600 before:top-[-0.33rem] first:before:hidden mt-2 relative flex items-center gap-2 font-light">
                            <span>{@html highlightMatch(suggestion, value)}</span>
                            <span class="w-4 h-4">{getFlag(suggestion.country)}</span>
                        </button>
                    {/if}
                    <!-- {/if} -->
                {/each}
            {:else}
                <span class="loader"></span>
            {/if}
        </div>
        {/if}
    </div>
    {#if ver === "loc"}
        <select class="input blue" bind:value={presetC} class:inputDisabled={disabled} disbled={disabled} class:selectReduced={red}>
            {#each countryList as country}
            <option value={country.code} selected={presetC === country.code}>({country.code}) - {country.name}</option>
            {/each}
        </select>
    {/if}
</div>


<script>

    // TO-DO: Add country selector when getting country from list of stations is unavailable, also use list of stations from github for stations
    // See also: https://www.reddit.com/r/openstreetmap/comments/uxfdgo/exporting_specific_railway_data/ and https://github.com/juliuste/trainline-stations

    export let ds;
    export let adDs;
    export let value;
    export let disabled;
    export let ver;
    export let presetC;
    export let red;

    let dropdownCountry = false;

    import { createEventDispatcher, onMount } from 'svelte';
	import { get } from 'svelte/store';
    const dispatch = createEventDispatcher();

    let suggestions = []
    let countryList = getCountryList()

    // console.log(presetC)

    let loading = false;
    

    // console.log(ds)
    function promptSuggestions() {
        suggestions = [];
        if (value.length > 1) {
            const lowerCaseValue = value.toLowerCase();
            if (ver == "loc") {
                const filteredStations = ds.filter(set => {
                    const lowerCaseName = set.name.toLowerCase();
                    return lowerCaseName.startsWith(lowerCaseValue) && !suggestions.some(suggestion => suggestion.name === set.name);
                });

                suggestions.push(...filteredStations.map(set => ({ name: set.name, country: set.country, short: set.short })));

                const filteredStations2 = adDs.filter(set => {
                    const lowerCaseName = set.name.toLowerCase();
                    return lowerCaseName.startsWith(lowerCaseValue) && !suggestions.some(suggestion => suggestion.name === set.name) && !filteredStations.some(suggestion => suggestion.name === set.name);
                });

                const uniqueStations = filteredStations2.filter(set => !suggestions.some(suggestion => suggestion.name === set.name));

                uniqueStations.forEach(set => {
                    if (!suggestions.some(suggestion => suggestion.name === set.name)) {
                        suggestions.push({ name: set.name, country: set.country, short: set.short });
                    }
                });
            } else {
                const filteredStations = ds.filter(set => {
                    const lowerCaseName = set.name.toLowerCase();
                    const lowerCaseShort = set.short ? set.short.toLowerCase() : '';
                    return (lowerCaseName.startsWith(lowerCaseValue) || lowerCaseShort.startsWith(lowerCaseValue)) && !suggestions.some(suggestion => suggestion.name === set.name);
                });

                suggestions.push(...filteredStations.map(set => ({ name: set.name, country: set.country, short: set.short })));
            }
        }
    }


    function selectItem(name) {
        value = name.name;
        var selectedStation
        if(adDs){
            selectedStation = adDs.find(station => station.name === name.name);
        }
        if (adDs && selectedStation) {
            console.log("test")
            value = selectedStation.name;
            presetC = selectedStation.country;
            const stationInfo = {
                name: selectedStation.name,
                country: selectedStation.country,
                id: selectedStation.id,
                lat: selectedStation.latitude,
                long: selectedStation.longitude,
            };
            console.log(stationInfo);
            value = stationInfo;
            dispatch('select', {
                text: value
            });
            value = selectedStation.name;

        }else{
            const locSearch = ds.find(station => station.name === name.name);
            if(locSearch){
                value = locSearch;
                presetC = locSearch.country;
                console.log(value)
                dispatch('select', {
                    text: value
                });
                value = locSearch.name;
            }
        }
        suggestions = [];
    }

    $: {
        if (disabled) {
            suggestions = [];
            value = ''
        }
    }

    function getCountryList(){
        return [
            { name: "Albania", code: "AL" },
            { name: "Andorra", code: "AD" },
            { name: "Armenia", code: "AM" },
            { name: "Austria", code: "AT" },
            { name: "Azerbaijan", code: "AZ" },
            { name: "Belarus", code: "BY" },
            { name: "Belgium", code: "BE" },
            { name: "Bosnia and Herzegovina", code: "BA" },
            { name: "Bulgaria", code: "BG" },
            { name: "Croatia", code: "HR" },
            { name: "Cyprus", code: "CY" },
            { name: "Czechia (Czech Republic)", code: "CZ" },
            { name: "Denmark", code: "DK" },
            { name: "Estonia", code: "EE" },
            { name: "Finland", code: "FI" },
            { name: "France", code: "FR" },
            { name: "Georgia", code: "GE" },
            { name: "Germany", code: "DE" },
            { name: "Greece", code: "GR" },
            { name: "Hungary", code: "HU" },
            { name: "Iceland", code: "IS" },
            { name: "Ireland", code: "IE" },
            { name: "Italy", code: "IT" },
            { name: "Kazakhstan", code: "KZ" },
            { name: "Kosovo", code: "XK" },
            { name: "Latvia", code: "LV" },
            { name: "Liechtenstein", code: "LI" },
            { name: "Lithuania", code: "LT" },
            { name: "Luxembourg", code: "LU" },
            { name: "Malta", code: "MT" },
            { name: "Moldova", code: "MD" },
            { name: "Monaco", code: "MC" },
            { name: "Montenegro", code: "ME" },
            { name: "Netherlands", code: "NL" },
            { name: "North Macedonia", code: "MK" },
            { name: "Norway", code: "NO" },
            { name: "Poland", code: "PL" },
            { name: "Portugal", code: "PT" },
            { name: "Romania", code: "RO" },
            { name: "Russia", code: "RU" },
            { name: "San Marino", code: "SM" },
            { name: "Serbia", code: "RS" },
            { name: "Slovakia", code: "SK" },
            { name: "Slovenia", code: "SI" },
            { name: "Spain", code: "ES" },
            { name: "Sweden", code: "SE" },
            { name: "Switzerland", code: "CH" },
            { name: "Turkey", code: "TR" },
            { name: "Ukraine", code: "UA" },
            { name: "United Kingdom", code: "GB" },
            { name: "Vatican City", code: "VA" }
        ];
    }



    $: {
       if(adDs && ds){
            if(adDs.length > 0 || adDs.length > 0 && ds.length > 0){
                loading = false;
            }
            else{
                loading = true;
            }
       }
    }

    function highlightMatch(suggestion, query) {
        const text = suggestion.short ? `${suggestion.name} (${suggestion.short})` : suggestion.name;
        const index = text.toLowerCase().indexOf(query.toLowerCase());
        if (index === -1) {
            return text;
        }
        const beforeMatch = text.slice(0, index);
        const match = text.slice(index, index + query.length);
        const afterMatch = text.slice(index + query.length);
        return `${beforeMatch}<b class="font-bold text-white">${match}</b>${afterMatch}`;
    }

    
    
    let isMobile = false;
    let isAndroid = false;
    let isIOS = false;
    let isMobileDevice = false
    var countries = []
    
    onMount(() => {
        const userAgent = navigator.userAgent.toLowerCase();
        isMobile = /mobile/.test(userAgent);
        isAndroid = /android/.test(userAgent);
        isIOS = /iphone|ipad|ipod/.test(userAgent);
        isMobileDevice = isMobile || isAndroid || isIOS;
    });

    function getFlag(country){
        const countryObj = getCountryList().find(c => c.code === country);
        return countryObj ? countryObj.emoji : '';
    }




</script>

<style>
    select{background-color: rgb(31, 31, 31) !important; color: #ddd !important;}
    .loader{margin-top:12px;width:24px;height:24px;border:3px solid rgb(50,50,50);border-bottom-color:transparent;border-radius:50%;display:inline-block;box-sizing:border-box;animation:rotation 1s linear infinite}@keyframes rotation{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
    select.selectReduced{
        @apply p-0 w-[50px]
    }

    select{
        @apply w-[65px]
    }

</style>