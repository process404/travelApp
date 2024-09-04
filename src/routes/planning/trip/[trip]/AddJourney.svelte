<CustomAlert mode={$alrtMode} active={$alrtAct} text={$alrtTxt} on:close={() => $alrtAct = false} />
<button class="fixed w-full h-screen bg-black z-30 bg-opacity-10 backdrop-blur-xl flex items-center justify-center overflow-y-scroll" on:mousedown|self={close}>
    <div class="bg-neutral-900 w-[90%] max-w-[800px] h-[90%] overflow-y-scroll rounded-md p-4 ml-3 pl-6 z-40 cursor-default border-[1px] border-neutral-700 flex flex-col">
        <div class="flex justify-between items-center">
            <h2 class="text-white text-2xl font-semibold text-left">Add Journey <h4 class="text-neutral-500 italic text-xs inline-block sm:ml-2">( Day {day} )</h4></h2>
            <button class="fadeButton red p-1 pl-3 pr-3" on:click={close}>Cancel</button>
        </div>
        <hr class="mt-2 mb-4 border-neutral-700">
        <div class="flex gap-2 mt-4 border-[1px] border-neutral-700 rounded-md p-2 pb-3 sm:flex-row flex-col">
            <div class="w-full">
                <h3 class="text-neutral-300 italic text-left mb-1">From</h3>
                <PromptField ds="{locations}" on:select={selectFrom} bind:value={from}/>
            </div>
            <div class="w-full">
                <h3 class="text-neutral-300 italic text-left mb-1">To</h3>
                <PromptField ds="{locations}" on:select={selectTo} bind:value={to}/>
            </div>
        </div>
        <div class="flex gap-3 mt-4 border-[1px] border-neutral-700 rounded-md p-2 pb-3 items-center md:flex-row flex-col">
            <div class="w-full flex gap-3">
                <div class="md:w-2/4 w-full">
                    <h3 class="text-neutral-300 italic text-left mb-1 text-sm">Departure Time</h3>
                    <input class="standardInput iconEdit" type="time" bind:value={departure}/>
                </div>
                <div class="md:w-2/4 w-full">
                    <h3 class="text-neutral-300 italic text-left mb-1 text-sm">Arrival Time</h3>
                    <input class="standardInput iconEdit" type="time" bind:value={arrival}/>
                </div>
            </div>
            <div class="md:w-1/2 w-full">
                <h3 class="text-neutral-300 italic text-left mb-1 text-sm">Service</h3>
                <input class="standardInput"  bind:value={service}/>
            </div>
            <div class="w-full">
                <h3 class="text-neutral-300 italic text-left mb-1 text-sm">Operator</h3>
                <input class="standardInput"  bind:value={operator}/>
            </div>
        </div>
        <div class="flex gap-3 mt-4 border-[1px] border-neutral-700 rounded-md p-2 pb-3 items-center md:flex-row flex-col">
            <div class="w-full">
                <h3 class="text-neutral-300 italic text-left mb-1 w-full">Description</h3>
                <textarea class="standardInput text-xs resize-none" maxlength="500" rows="4" placeholder="" bind:value={description}></textarea>
            </div>
        </div>
        <div class="flex gap-3 mt-auto border-[1px] border-neutral-700 rounded-md p-2 pb-2 items-center md:flex-row flex-col">
            <div class="w-full flex">
                <button class="fadeButton green w-full p-2" on:click={addJourneyConfirm}>Add Journey</button>
            </div>
        </div>
    </div>
</button>

<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    export let day;

    import PromptField from '../../../../lib/components/PromptField.svelte';
    import CustomAlert from '../../../../lib/components/Alert.svelte';
	import { writable } from 'svelte/store';

    let from;
    let to;
    let arrival;
    let departure;
    let service;
    let operator;
    let description;

    let alrtMode = writable('err');
    let alrtTxt = writable('');
    let alrtAct = writable(false);



    function close(e){
        dispatch('message', {
            text: 'close'
        });
    }


    function submit(JI){
        dispatch('message', {
            text: JI
        });
    }

    // Safely parse locations from localStorage
    let locations = [];
    try {
        const locationsData = localStorage.getItem('locations');
        // console.log('Raw locations data from localStorage:', locationsData);
        locations = JSON.parse(locationsData) || [];
        // console.log('Parsed locations:', locations);
    } catch (error) {
        // console.error('Error parsing locations from localStorage:', error);
    }

    function selectFrom(e){
        from = e.detail.text;
        console.log(from, to);
    }

    function selectTo(e){
        to = e.detail.text;
        console.log(from, to);
    }

    function cLS(loc){
        if(localStorage.getItem('locations')){
            const existingLocation = locations.find(l => l.toLowerCase() === loc.toLowerCase());
            if (!existingLocation) {
                locations.push(loc);
                localStorage.setItem('locations', JSON.stringify(locations));
                console.log('Location added');
            } else {
                console.log('Location already exists');
            }
        } else {
            locations.push(loc);
            localStorage.setItem('locations', JSON.stringify(locations));
            console.log('Location added');
        }
    }

    function genCode(){
        let code = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
        for (let i = 0; i < 6; i++) {
            code += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return code;
    }

    function addJourneyConfirm(){
        if(from == undefined || to == undefined || arrival == undefined || departure == undefined){
            alrtTxt.set('Please fill in all fields');
            alrtAct.set(true);
            console.log('Please fill in all fields');
            console.log(from, to, arrival, departure);
            return
        }else{
            if(confirm("Please confirm you would like to enter this journey.")){
                let journeyInfo = {
                    day: day,
                    journey: {      
                        code: genCode(),              
                        from: from,
                        to: to,
                        arrival: arrival,
                        departure: departure,
                        service: service,
                        operator: operator,
                        description: description
                    }
                }
                console.log("JI: ", journeyInfo);
                submit(journeyInfo);
                cLS(from);
                cLS(to)
            }
        }
    }


</script>
