<div style="width: 100vw; display: flex; flex-direction: column; justify-items: center; align-items: center" id="app">
    <Nav ver="back"/>
    <div class="h-auto max-w-[1400px] w-full flex flex-col gap-4 h-full">
        <!-- nav menu goes here to navigate between the different sections-->
        <!-- see this: https://assets.justinmind.com/wp-content/uploads/2021/02/top-navigation-bar-mobile-apps.png-->
        <!-- have a line that moves when you click on any one-->

        {#if page == 'stats'}
            <div in:fade={{duration:200}} out:fade={{duration:100}} class="flex flex-col border-[1px] rounded-md border-neutral-700 sm:ml-8 ml-4 mr-4 sm:mr-8 h-full sm:pt-6 sm:pb-6 pl-4 pr-4 pt-4 pb-4">
                <div class="flex gap-6 justify-between items-center">
                    <h2 class="text-white font-semibold text-2xl w-full text-left">Statistics</h2>

                </div>
            </div>
        {/if}
        {#if page == 'logs'}
            <div in:fade={{duration:200}} out:fade={{duration:100}} class="flex flex-col border-[1px] rounded-md border-neutral-700 sm:ml-8 ml-4 mr-4 sm:mr-8 h-full pt-4 sm:pb-6 pl-4 pr-4 pb-4">
                <div class="flex gap-6 justify-between items-center">
                    <h2 class="dark:text-white font-semibold text-2xl w-full text-left">Overviews by date</h2>
                    <div class="flex gap-2 w-full justify-end">
                        <select class="input blue reduced"   bind:value={sortBy}>
                            <option>All Time</option>
                            {#each Object.keys(logsBeforeUpd) as year}
                                <option>{year}</option>
                            {/each}
                        </select>
                        <button class="button blue2 text-sm" on:click={() => addGroupOpen()}>
                            Add Group
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                              </svg>
                              
                        </button>
                    </div>
                </div>
                {#if logsByYear.length == 0}
                    <div class="w-full flex items-center justify-center border-neutral-700 border-[1px] rounded-sm h-full mt-8">
                        <span class="loader w-6 h-6" style="margin-top:0.5rem; margin-bottom: 0.5rem"></span>
                    </div>
                {:else}
                    <div class="flex gap-2 flex-col mt-4">
                        {#each Object.keys(logsByYear) as year}
                            <ul class="flex-wrap w-full">
                            {#each Object.keys(logsByYear[year]) as month}
                                {#if month != 'Unknown'}
                                    <h3 class="dark:text-neutral-400 italic text-lg">{year} <span class="text-xs">- {month}</span></h3>
                                {:else}
                                    <h3 class="dark:text-neutral-400 italic text-lg">No Date</h3>
                                {/if}
                                {#each Object.keys(logsByYear[year][month]) as date}
                                    <div class="flex flex-col mb-4 mt-2">
                                        <ul class="flex flex-wrap gap-2">
                                            {#if getPicture(logsByYear[year][month][date]) == null}
                                                <button class="w-1/2 h-[100px] overflow-hidden relative rounded-md max-w-[300px] border-neutral-700 border-[1px] hover:border-neutral-400 duration-100" on:click={() => {window.location.href = '/overview/' + date}}>
                                                    <span class="dark:bg-neutral-800 bg-neutral-600 block absolute w-full h-full bg-opacity-100 p-2 top-0">
                                                        {#if date != 'Unknown'}
                                                            <h4 class="text-white drop-shadow-sm text-xl font-semibold text-left mb-1">{formatDate(date)}</h4>
                                                        {:else}
                                                            <h4 class="text-white drop-shadow-sm text-xl font-semibold text-left mb-1">No Date</h4>
                                                        {/if}
                                                        {#each getFirstLogs(logsByYear[year][month][date]) as log}
                                                            <p class="text-neutral-300 text-sm text-left italic">{log.log_location}</p>
                                                        {/each}
                                                    </span>
                                                </button>
                                            {:else}
                                            <button class="w-1/2 h-[125px] overflow-hidden relative rounded-md max-w-[300px] border-neutral-700 border-[1px] hover:border-neutral-400 duration-100" on:click={() => {window.location.href = '/overview/' + date.toLowerCase()}} class:w-full={date == 'Unknown'} class:max-w-none={date == 'Unknown'}>
                                                <span class="bg-black block absolute w-full h-full bg-opacity-60 p-2 top-0">
                                                    {#if date != 'Unknown'}
                                                        <h4 class="text-white drop-shadow-sm text-xl font-semibold text-left mb-1">{formatDate(date)}</h4>
                                                    {:else}
                                                        <h4 class="text-white drop-shadow-sm text-xl font-semibold text-left mb-1">All Items</h4>
                                                    {/if}
                                                    {#each getFirstLogs(logsByYear[year][month][date]) as log}
                                                        <p class="text-neutral-300 text-sm text-left italic">{log.log_location}</p>
                                                    {/each}
        
                                                </span>
                                                <img src={getPicture(logsByYear[year][month][date]).src} class="rounded-md object-cover w-full h-full" alt="background"/>
                                            </button>
                                            {/if}
                                        </ul>
                                    </div>
                                {/each}
                            {/each}
                            </ul>
                        {/each}
                    </div>
                {/if}
            </div>
        {/if}
    </div>
    <div class="mt-auto w-full">
        <Footer/>
    </div>
</div>


<script>
    import { onMount } from 'svelte';
    import Nav from '../../lib/components/Nav.svelte';
    import Footer from '../../lib/components/Footer.svelte';
    import '../../global.css'
    import '../siteDB.js'
    import { getJourneysData, getLocationsData, getLogsData, getPlanningData, getGroupsData } from '../siteDB';
    import { fade } from 'svelte/transition';
    var sortBy = 'All Time';
    let logsBeforeUpd = []
    let logsByYear = [];
    var logs = null;
    let groups = null;
    var page = 'logs'
    

    onMount(async () => {
        document.title = 'Overview';
        await generateLogs();
    });

    async function generateLogs() {
        logs = await getLogsData();
        groups = await getGroupsData();
        logsByYear = logs.reduce((acc, log) => {
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

        // Combine months if groups contain 'startDate' and 'endDate' that span multiple months
        if(groups != null && groups.length != 0){
            groups.forEach(group => {
                if (group.startDate && group.endDate) {
                    const startDate = new Date(group.startDate);
                    const endDate = new Date(group.endDate);
                    if (startDate.getFullYear() === endDate.getFullYear() && startDate.getMonth() !== endDate.getMonth()) {
                        const year = startDate.getFullYear();
                        const startMonth = startDate.toLocaleString('default', { month: 'long' });
                        const endMonth = endDate.toLocaleString('default', { month: 'long' });
                        const combinedMonth = `${startMonth} / ${endMonth}`;
                        if (!logsByYear[year]) {
                            logsByYear[year] = {};
                        }
                        logsByYear[year][combinedMonth] = {
                            ...logsByYear[year][startMonth],
                            ...logsByYear[year][endMonth]
                        };
                        delete logsByYear[year][startMonth];
                        delete logsByYear[year][endMonth];
                    }
                }
            });
        }

        logsBeforeUpd = logsByYear;

        console.log(logsByYear);
    }

    function getPicture(logs){
        for (let log of logs) {
            if (log.pictures && log.pictures.length > 0) {
            const priorityPicture = log.pictures.find(picture => picture.picturePriority === true);
            if (priorityPicture) {
                return priorityPicture;
            }
            return log.pictures[0];
            }
        }
        return null;
    }

    function getFirstLogs(logs) {
        const uniqueLogs = [];
        const seenLocations = new Set();

        for (const log of logs) {
            if (!seenLocations.has(log.log_location)) {
                uniqueLogs.push(log);
                seenLocations.add(log.log_location);
            }
            if (uniqueLogs.length >= 3) {
                break;
            }
        }

        // console.log(uniqueLogs);
        return uniqueLogs;
    }

    $: if(sortBy != 'All Time'){
        sortByYear();
    }else{
        logsByYear = logsBeforeUpd;
    }

    function sortByYear() {
        // console.log(sortBy);
        if (sortBy === "All Time") {
            logsByYear = logs.reduce((acc, log) => {
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
        } else {
            logsByYear = logs.reduce((acc, log) => {
                const logDate = new Date(log.log_date);
                const year = isNaN(logDate.getTime()) ? 'Unknown' : logDate.getFullYear();
                const month = isNaN(logDate.getTime()) ? 'Unknown' : logDate.toLocaleString('default', { month: 'long' });
                const date = isNaN(logDate.getTime()) ? 'Unknown' : logDate.toISOString().split('T')[0];
                if (year == sortBy) {
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
                }
                return acc;
            }, {});
        }
    }

    function formatDate(date) {
        const d = new Date(date);
        const day = d.getDate();
        const month = d.toLocaleString('default', { month: 'long' });
        const suffix = (day) => {
            if (day > 3 && day < 21) return 'th';
            switch (day % 10) {
                case 1: return 'st';
                case 2: return 'nd';
                case 3: return 'rd';
                default: return 'th';
            }
        };
        return `${month} ${day}${suffix(day)}`;
    }

    onMount(() => {
        const settings = JSON.parse(localStorage.getItem('settings'));
        if (settings.darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    });

    import AddGroup from './components/AddGroup.svelte'

    function addGroupOpen(){

    }

</script>

<style>
     .loader{margin-top:12px;width:24px;height:24px;border:3px solid rgb(50,50,50);border-bottom-color:transparent;border-radius:50%;display:inline-block;box-sizing:border-box;animation:rotation 1s linear infinite}@keyframes rotation{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
</style>
