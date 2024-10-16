<div style="width: 100vw; display: flex; flex-direction: column" id="app">
    <Nav ver="back"/>
    <div class="h-full w-full flex flex-col items-center">
        <div class="max-w-[1000px] flex flex-col items-center border-[1px] rounded-md border-neutral-700 sm:ml-8 ml-4 mr-4 sm:mr-8 h-full sm:pt-6 sm:pb-6 pl-2 pr-2 sm:pl-12 sm:pr-12 pb-2">
            <h2 class="text-white text-2xl font-semibold sm:mt-1 mt-4 mb-4">Settings</h2>
            <div class="border-[1px] border-neutral-700 rounded-md w-full flex flex-col mt-4">
                <div class="flex items-center gap-6 pt-4 pb-4 pl-3 pr-3">
                    <div class="w-1/4 flex items-center justify-center">
                        <input type="checkbox" class="switch blue" bind:checked={dbStn} on:click={toggle_dbStn}>
                    </div>
                    <div>
                        <h2 class="dark:text-neutral-300 mb-2">Get all stations from the database</h2>
                        <p class="dark:text-neutral-400 text-sm italic">When enabled, prompts to enter a station name will be compared to a database of all European stations in addition to your own previous entries. If not enabled, the app will only compare against only stations which you have entered previously. Please note that enabling this option will incur a time delay while the stations are loaded.</p>
                    </div>
                </div>
            </div>
            <div class="border-[1px] border-neutral-700 rounded-md w-full flex flex-col mt-4">
                <button class="w-full flex justify-between p-4 items-center group" on:click={() => {advancedDropdown = !advancedDropdown; if(advancedDropdown == false){understood = false}}}>
                    <h2 class="text-white text-xl font-semibold">Advanced</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill w-5 h-5 opacity-50 group-hover:opacity-100 duration-100 fill-neutral-200" viewBox="0 0 16 16" class:rotate={advancedDropdown}>
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                    </svg>
                </button>
                {#if advancedDropdown}
                <div class="border-neutral-700 border-[1px] m-4">
                    <div class="flex items-center gap-6 pt-4 pb-4 pl-3 pr-3">
                        <div class="w-3/4">
                            <h2 class="dark:text-neutral-300 mb-2">Clear Database</h2>
                            <p class="dark:text-neutral-400 text-sm italic">Clear parts of or all of the data stored. Either to free up storage, clear old plans or because of a technical issue. <br><br><span class="text-yellow-300">Warning! These actions are permanent and cannot be reversed (except getting stations from the database).</span></p>
                        </div>
                        <div class="w-1/3 flex items-center justify-center" class:widthAdj={understood}>
                            {#if understood}
                                <div class="w-full flex justify-end items-end flex-col gap-2">
                                    <button class="button hover:before:bg-red-700 hover:before:bg-opacity-50 w-[70%]" on:click={() => {clearJourneys()}}>Clear Journeys</button>
                                    <button class="button hover:before:bg-red-700 hover:before:bg-opacity-50 w-[70%]" on:click={() => {clearUserLocations()}}>Clear User Locations</button>
                                    <button class="button hover:before:bg-red-700 hover:before:bg-opacity-50 w-[70%]" on:click={() => {clearDBLocations()}}>Clear Database Locations</button>
                                    <button class="button hover:before:bg-red-700 hover:before:bg-opacity-50 w-[70%]" on:click={() => {clearLogPhotos()}}>Clear Log Photos</button>
                                    <button class="button hover:before:bg-red-700 hover:before:bg-opacity-50 w-[70%]" on:click={() => {clearLogsGeneral()}}>Clear Logs</button>
                                    <button class="button hover:before:bg-red-700 hover:before:bg-opacity-50 w-[70%]" on:click={() => {clearPlanning()}}>Clear Planning</button>
                                </div>
                            {:else}
                                <button class="button" on:click={() => {understood = true}}>Click to reveal options<br><span class="text-xs">(Acknowledge warning)</span></button>
                            {/if}
                        </div>
                    </div>
                </div>
                {/if}
            </div>
        </div>
    
    
    </div>
    <Footer/>
</div>

<script>
    import { onMount } from 'svelte';
    import Nav from '../../lib/components/Nav.svelte';
    import Footer from '../../lib/components/Footer.svelte';
    import '../../global.css';
    import '../siteDB.js';

    let dbStn = false;
    let advancedDropdown = false;
    let understood = false;

    onMount(() => {
        document.title = 'Settings';
        if (typeof localStorage === 'undefined') {
            console.error('localStorage is not supported');
        } else {
            if (localStorage.getItem('settings') == null) {
                localStorage.setItem('settings', JSON.stringify([]));
            }else{
                var settings = JSON.parse(localStorage.getItem('settings'));
                if (settings.length === 0) {
                    settings = {dbStn: false};
                    localStorage.setItem('settings', JSON.stringify(settings));
                }
                dbStn = settings.dbStn;
            }
        }
    });

    function toggle_dbStn(){
        dbStn = !dbStn;
        const settings = JSON.parse(localStorage.getItem('settings'));
        settings.dbStn = dbStn;
        localStorage.setItem('settings', JSON.stringify(settings));
    }
    
    function clearJourneys(){
        if (confirm('Are you sure you want to clear all journeys? This action cannot be undone.')) {
            console.log('Journeys cleared');
        } else {
            console.log('Action cancelled');
        }
    }

    function clearUserLocations(){
        if (confirm('Are you sure you want to clear all user locations? This action cannot be undone.')) {
            console.log('Journeys cleared');
        } else {
            console.log('Action cancelled');
        }
    }

    function clearDBLocations(){
        if (confirm('Are you sure you want to clear all database locations? If "Get stations from the Database" is enabled then station names will be regenerated unless this is disabled')) {
            console.log('Journeys cleared');
        } else {
            console.log('Action cancelled');
        }
    }

    function clearLogPhotos(){
        if (confirm('Are you sure you want to clear all photos within logs? This action cannot be undone.')) {
            console.log('Journeys cleared');
        } else {
            console.log('Action cancelled');
        }
    }

    function clearLogsGeneral(){
        if (confirm('Are you sure you want to clear all logs? This action cannot be undone.')) {
            console.log('Journeys cleared');
        } else {
            console.log('Action cancelled');
        }
    }

    function clearPlanning(){
        if (confirm('Are you sure you want to clear all plans? This action cannot be undone.')) {
            console.log('Journeys cleared');
        } else {
            console.log('Action cancelled');
        }
    }

</script>

<style>
    .rotate{
        rotate: 180deg;
    }

    .widthAdj{
        width: 70%;
    }
</style>