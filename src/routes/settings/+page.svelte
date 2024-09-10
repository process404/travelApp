<Nav ver="back"/>
<div class="flex flex-col items-center h-screen justify-start">
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
        </div>
    </div>
</div>
<Footer/>

<script>
    import { onMount } from 'svelte';
    import Nav from '../../lib/components/Nav.svelte';
    import Footer from '../../lib/components/Footer.svelte';
    import '../../global.css';

    let dbStn = false;

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
