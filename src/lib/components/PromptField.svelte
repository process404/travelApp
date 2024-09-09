<div class="relative w-full">
    <!--TO-DO add precise location info and country selector-->
    <input minlength="3" placeholder="" class="input blue" bind:value on:input={() => promptSuggestions()} class:inputDisabled={disabled} disbled={disabled}>
    {#if locationSuggestions.length != 0}
    <div class="absolute bottom-100 bg-neutral-700 border-[1px] border-neutral-800 00 p-2 w-full rounded-md rounded-t-none pl-4 pr-4 pb-4 z-30">
        {#each locationSuggestions.slice(0,6) as name}
            {#if name != value}
                <button on:click={selectLocationFrom(name)} class="text-white w-full text-xs text-left after:absolute after:bottom-[-45%] after:hover:w-[97%] after:h-[1px] after:bg-white after:left-0 after:duration-100 after:w-0 before:absolute before:w-[97%] before:left-0 before:h-[1px] before:bg-neutral-600 before:top-[-25%] first:before:hidden  mt-2 relative">{name}</button>
            {/if}
        {/each}
    </div>
    {/if}
</div>


<script>

    // TO-DO: Add country selector when getting country from list of stations is unavailable, also use list of stations from github for stations
    // See also: https://www.reddit.com/r/openstreetmap/comments/uxfdgo/exporting_specific_railway_data/ and https://github.com/juliuste/trainline-stations



    export let ds;
    export let value;
    export let disabled;
    export let ver;

    import { createEventDispatcher, onMount } from 'svelte';
    const dispatch = createEventDispatcher();

    let locationSuggestions = []


    function promptSuggestions(){
        locationSuggestions = []
        if(ver == "loc"){
            if(value.length > 1){
            ds.forEach(set => {
                // console.log(set)
                if(set.name.toLowerCase().includes(value.toLowerCase())){
                    if(value != set.name){
                        locationSuggestions.push(set.name)
                    }
                }
            })
        }
        }
        else{
            if(value.length > 1){
            ds.forEach(set => {
                // console.log(set)
                if(set.toLowerCase().includes(value.toLowerCase())){
                    if(value != set){
                        locationSuggestions.push(set)
                    }
                }
            })
        }
        }
    }

    function selectLocationFrom(name) {
        value = name;
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


</script>