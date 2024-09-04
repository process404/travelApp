<button class="fixed w-full h-screen bg-black z-30 bg-opacity-10 backdrop-blur-xl flex items-center justify-center" on:click|self={close}>
    <div class="bg-neutral-900 w-[90%] max-w-[800px] h-[90%] rounded-md p-4 z-40 cursor-default border-[1px] border-neutral-700">
        <div class="flex justify-between items-center">
            <h2 class="text-white text-2xl font-semibold text-left">Add Journey <h4 class="text-neutral-500 italic text-xs inline-block ml-2">( Day {day} )</h4></h2>
            <button class="fadeButton red p-1 pl-3 pr-3" on:click={close}>Cancel</button>
        </div>
        <hr class="mt-2 mb-2 border-neutral-700">
        <div class="flex gap-3 mt-4 border-[1px] border-neutral-700 rounded-md p-2 pb-3">
            <div class="w-full">
                <h3 class="text-neutral-300 italic text-left mb-1">From</h3>
                <PromptField ds="{locations}" on:select={selectFrom}/>
            </div>
            <div class="w-full">
                <h3 class="text-neutral-300 italic text-left mb-1">To</h3>
                <PromptField ds="{locations}" on:select={selectTo}/>
            </div>
        </div>
    </div>
</button>

<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    export let day;

    import PromptField from '../../../../lib/components/PromptField.svelte';

    let journeyInfo = [];
    let from;
    let to;


    function close(){
        dispatch('message', {
            text: 'close'
        });
    }


    function submit(){
        dispatch('message', {
            text: journeyInfo
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


</script>
