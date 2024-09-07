<Nav ver="back" class="w-full"/>
<div class="flex flex-col items-center h-screen justify-start">
    <div class="h-full max-w-[1000px] w-full flex flex-col">
        {#if currentPage === 'home'}
        <div class="flex flex-col items-center border-[1px] rounded-md border-neutral-700 sm:ml-8 ml-4 mr-4 sm:mr-8 h-full sm:pt-6 sm:pb-6 pl-2 pr-2 pb-2">
            <h2 class="text-white text-3xl font-semibold mt-4">Add Records</h2>
            <h3 class="text-neutral-400 italic mt-2">Please select an option</h3>
            <div class="border-[1px] rounded-md border-neutral-700 w-full sm:p-4 p-2 mt-4 sm:mt-8 flex justify-center gap-2 h-full flex-col max-w-[600px]">
                <div class="border-[0px] rounded-md border-neutral-700 w-full h-full flex gap-2">
                    <button class="button blue2 w-full" on:click={() => goInnerPage('addJourney')}>Add Journey</button>
                    <button class="button blue2 w-full" on:click={() => goInnerPage('addLog')}>Add Log</button>
                </div>
                <div class="border-[0px] rounded-md border-neutral-700 w-full h-full flex flex-col gap-2">
                    <button class="button blue3 h-full" on:click={() => goInnerPage('addLocation')}>Add Location</button>
                    <button class="button blue3 h-full" on:click={() => goInnerPage('addNote')}>Add Note</button>
                </div>
            </div>
            <!-- <div class="border-[1px] rounded-md border-neutral-700 w-full sm:p-4 p-2 mt-4 flex justify-center gap-2 h-full">
                <div class="border-[1px] rounded-md border-neutral-700 p-2 w-full h-full max-w-[400px] flex flex-col">
                    <button class="bg-green-700 text-white w-full p-1 rounded-sm hover:bg-green-800 h-full pt-2 pb-2">View Logs</button>
                    <button class="bg-green-700 text-white w-full p-1 rounded-sm hover:bg-green-800 h-full pt-2 pb-2 mt-2">View Journeys</button>
                </div>
            </div> -->
        </div>
        {/if}
        
    </div>
</div>
<Footer/>

<script>
    import '../../global.css'


    import Nav from '../../lib/components/Nav.svelte';
    import Footer from '../../lib/components/Footer.svelte';

    import { onMount } from 'svelte';

    var currentPage = 'home'

    onMount(() => {
        document.title = 'Logs';
    });

    function goInnerPage(page){
        const basePath = window.location.pathname.endsWith('/') ? window.location.pathname : `${window.location.pathname}/`;
        const fullPath = `${basePath}${page}`;
        window.location.href = fullPath;
    }
</script>
