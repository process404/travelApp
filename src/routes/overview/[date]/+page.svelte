<div style="width: 100vw; display: flex; flex-direction: column" id="app">
    <Nav ver="back"/>
    <div class="h-full w-full flex flex-col items-center pl-4 pr-4">
        <div class="flex flex-col items-center border-[1px] rounded-md border-neutral-700 sm:ml-8 ml-4 mr-4 sm:mr-8 h-full sm:pt-6 sm:pb-6 pl-2 pr-2 pb-2 max-w-[1500px] w-full">
            {#if param != "unknown"}
                <h2 class="text-white text-xl font-semibold sm:mt-1 mt-3">Overview for <span>{formatDate(param)}</span></h2>
            {:else}
            <h2 class="text-white text-xl font-semibold sm:mt-1 mt-3">Overview for No Date</h2>
            {/if}
        </div>
    </div>
    <Footer/>
</div>

<script>
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import Nav from '../../../lib/components/Nav.svelte';
    import Footer from '../../../lib/components/Footer.svelte';
    import '../../siteDB.js';
    import { getLogsData } from '../../siteDB.js';
    
    let param = $page.params.date;
    let formatParam = param.replace(/(\d{4})-(\d{2})-(\d{2})/g, '$3/$2/$1');
    let logs = null;
    let logsToday = null;
    let logsSorted = null;
    let uniqueLocs = null;

    onMount(async () => {
        param = param.replace(/-/g, '/');
        document.title = 'Overview for ' + formatParam;
        logs = await getLogsData();
        logsSorted = logs.reduce((acc, log) => {
            const logDate = new Date(log.log_date);
            const year = isNaN(logDate.getTime()) ? 'Unknown' : logDate.getFullYear();
            const month = isNaN(logDate.getTime()) ? 'Unknown' : logDate.toLocaleString('default', { month: 'long' });
            const date = isNaN(logDate.getTime()) ? 'Unknown' : logDate.toISOString().split('T')[0];
            if (!acc[year]) {
                acc[year] = {};
            }
            if (!acc[year][month]) {
                acc[year][month] = {};
            }
            if (!acc[year][month][date]) {
                acc[year][month][date] = [];
            }
            acc[year][month][date].push(log);
            return acc;
        }, {});

        logsToday = logsSorted
        getDaysLogs(logsSorted);
    });

    function formatDate(date){
        const d = new Date(date);
        return d.toLocaleDateString('en-GB', {month: 'long', day: 'numeric'});
    }

    function getDaysLogs(logs){
        console.log(logs);
        const [year, month, day] = param.split('/');
        console.log(year, month, day);
        if (logs[year] && logs[year][new Date(year, month - 1).toLocaleString('default', { month: 'long' })] && logs[year][new Date(year, month - 1).toLocaleString('default', { month: 'long' })][`${year}-${month}-${day}`]) {
            logsToday = logs[year][new Date(year, month - 1).toLocaleString('default', { month: 'long' })][`${year}-${month}-${day}`];
            console.log(logsToday);
            uniqueLocs = getUniqueLoc();
            console.log(uniqueLocs);
        }
    }

    function getUniqueLoc(){
        let locs = [];
        for (let log of logsToday) {
            if (locs.includes(log.log_location) && locs.includes(log.log_lat) && locs.includes(log.log_long)) {
                locs.push({location: log.log_location, lat: log.log_lat, lon: log.log_long, log_loc_id: log.log_loc_id});
            }
        }
        return locs;
    }
</script>

<style>
     .loader{margin-top:12px;width:24px;height:24px;border:3px solid rgb(50,50,50);border-bottom-color:transparent;border-radius:50%;display:inline-block;box-sizing:border-box;animation:rotation 1s linear infinite}@keyframes rotation{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
</style>

