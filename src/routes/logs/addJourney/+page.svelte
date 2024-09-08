<Nav ver="back"/>
    <div class="flex flex-col items-center h-screen justify-start">
        <div class="h-full max-w-[1000px] w-full flex flex-col">
            <div class="flex flex-col items-center border-[1px] rounded-md border-neutral-700 sm:ml-8 ml-4 mr-4 sm:mr-8 h-full sm:pt-6 sm:pb-6 pl-2 pr-2 pb-2">
                <h2 class="text-white text-xl font-semibold sm:mt-1 mt-3">Add Journey</h2>
                <div class="border-[1px] border-neutral-700 rounded-md sm:mt-8 mt-4 w-full max-w-[800px] p-4 flex gap-4">
                    <div class="w-full">
                        <h3 class="text-neutral-300 italic text-left mb-1">From</h3>
                        <PromptField ds="{locations}" on:select={selectFrom} bind:value={from}/>
                    </div>
                    <div class="w-full">
                        <h3 class="text-neutral-300 italic text-left mb-1">To</h3>
                        <PromptField ds="{locations}" on:select={selectTo} bind:value={to}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
<Footer/>

<script>
    import { onMount } from 'svelte';
    import Nav from '../../../lib/components/Nav.svelte';
    import Footer from '../../../lib/components/Footer.svelte';
    import '../../../global.css'
    import PromptField from '../../../lib/components/PromptField.svelte';
	import AddJourney from '../../planning/trip/[trip]/AddJourney.svelte';

    let locations;

    let from;
    let to;
    onMount(() => {
        document.title = 'Add Journey';
        locations = JSON.parse(localStorage.getItem('locations')) || [];
    });

    function selectFrom(o){from=o.detail.text,console.log(from,to)}

    function selectTo(o){to=o.detail.text,console.log(from,to)}

    
</script>

