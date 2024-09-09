
<div class="flex gap-1 w-full">
    <div class="relative w-full gap-2">
        <!--TO-DO add precise location info and country selector-->
        <input minlength="3" placeholder="" class="input blue w-full" bind:value on:input={() => promptSuggestions()} class:inputDisabled={disabled} disbled={disabled}>
        {#if locationSuggestions.length != 0}
        <div class="absolute bottom-100 bg-neutral-800 border-[1px] border-neutral-700  p-2 w-full rounded-md rounded-t-none pl-4 pr-4 pb-4 z-30" style="filter:drop-shadow(0px 10px 20px rgba(0,0,0,0.5))">
            {#each locationSuggestions.slice(0,6) as name}
            {#if name.name != value}
            <button on:click={selectLocationFrom(name)} class="text-white w-full text-sm text-left after:absolute after:bottom-[-0.3rem] after:hover:w-[97%] after:h-[1px] after:bg-white after:left-0 after:duration-100 after:w-0 before:absolute before:w-[97%] before:left-0 before:h-[1px] before:bg-neutral-600 before:top-[-25%] first:before:hidden  mt-2 relative flex items-center gap-3">{name.name} <span><img src={`https://flagsapi.com/${name.country}/flat/64.png`} class="w-4 h-4" alt={name.country}></span></button>
            {/if}
            {/each}
        </div>
        {/if}
    </div>
    {#if ver === "loc"}
        <select class="input blue w-[65px] h-[38px]" bind:value={presetC}>
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
    export let value;
    export let disabled;
    export let ver;
    export let presetC;

    let dropdownCountry = false;

    import { createEventDispatcher, onMount } from 'svelte';
    const dispatch = createEventDispatcher();

    let locationSuggestions = []
    let countryList = getCountryList()

    // console.log(presetC)

    // console.log(ds)
    function promptSuggestions(){
        locationSuggestions = []
        if(ver == "loc"){
            if(value.length > 1){
                ds.forEach(set => {
                    if(set.name.toLowerCase().includes(value.toLowerCase())){
                        if(value != set.name){
                            locationSuggestions.push({ name: set.name, country: set.country })
                        }
                    }
                })
            }
        }
        else{
            if(value.length > 1){
                ds.forEach(set => {
                    if(set.name.toLowerCase().includes(value.toLowerCase())){
                        if(value != set.name){
                            locationSuggestions.push({ name: set.name, country: set.country })
                        }
                    }
                })
            }
        }
    }

    function selectLocationFrom(name) {
        value = name.name;
        presetC = name.country;
        locationSuggestions = []
        dispatch('select', {
            text: value
        });
    }

    $: {
        if (disabled) {
            locationSuggestions = [];
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


</script>

<style>
    select{background-color: rgb(31, 31, 31) !important; color: #ddd !important;}
</style>