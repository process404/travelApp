<div style="width: 100vw; display: flex; flex-direction: column" id="app">
    <Nav ver="back"/>
    <div class="h-full max-w-[1000px] w-full flex flex-col">
        <div class="flex flex-col items-center border-[1px] rounded-md border-neutral-700 sm:ml-8 ml-4 mr-4 sm:mr-8 h-full sm:pt-6 sm:pb-6 pl-2 pr-2 sm:pl-12 sm:pr-12 pb-2">
            <h2 class="text-white text-2xl font-semibold sm:mt-1 mt-4 mb-4">Settings</h2>
            <div class="border-[1px] border-neutral-700 rounded-md w-full flex flex-col mt-4">
                <div class="flex items-center gap-6 pt-4 pb-4 pl-3 pr-3">
                    <div class="w-1/4 flex items-center justify-center">
                        <input type="checkbox" class="switch blue" bind:checked={dbStn} on:click={toggle_dbStn}>
                    </div>
                    <div>
                        <h2 class="dark:text-neutral-300 mb-2">Get all stations from database</h2>
                        <p class="dark:text-neutral-400 text-sm italic">When enabled, prompts to enter a station name will be compared to a database of all European stations in addition to your own previous entries. If not enabled, the app will only compare against only stations which you have entered previously. Please note that enabling this option will incur a time delay while the stations are loaded.</p>
                    </div>
                </div>
            </div>
            <div class="border-[1px] border-neutral-700 rounded-md w-full flex flex-col mt-4">
                <button class="w-full flex justify-between p-4 items-center group" on:click={() => {advancedDropdown = !advancedDropdown}}>
                    <h2 class="text-white text-xl font-semibold">Advanced</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill w-5 h-5 opacity-50 group-hover:opacity-100 duration-100 fill-neutral-200" viewBox="0 0 16 16" class:rotate={advancedDropdown}>
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                    </svg>
                </button>
                {#if advancedDropdown}
                <div class="border-neutral-700 border-[1px] m-4">
                    <div class="flex items-center gap-6 pt-4 pb-4 pl-3 pr-3">
                        <div class="w-3/4">
                            <h2 class="dark:text-neutral-300 mb-2">Clear parts of the database</h2>
                            <p class="dark:text-neutral-400 text-sm italic">Clear parts of the database, either to free up storage, clear old plans or because of a issue. <br><br><span class="text-yellow-300">Warning! This action is permanent and cannot be reversed.</span></p>
                        </div>
                        <div class="w-1/3 flex items-center justify-center">
                           <button class="button">Click to reveal database</button>
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

</script>

<style>
    .rotate{
        rotate: 180deg;
    }

</style>