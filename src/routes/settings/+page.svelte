<Alert mode={$alrtMode} active={$alrtAct} text={$alrtTxt} on:close={() => $alrtAct = false} />

<div style="width: 100vw; height: 100vh; display: flex; flex-direction: column; overflow-x:hidden" id="app">
    <Nav ver="back"/>
    <div class="h-auto w-full flex flex-col items-center">
        <div class="max-w-[1000px] h-auto flex flex-col items-center border-[1px] rounded-md border-neutral-700 sm:ml-8 ml-4 mr-4 sm:mr-8 sm:pt-6 sm:pb-6 pl-2 pr-2 sm:pl-12 sm:pr-12 pb-2">
            <h2 class="dark:text-white text-2xl font-semibold sm:mt-1 mt-4 mb-4">Settings</h2>
            <div class="border-[1px] border-neutral-700 rounded-md w-full flex flex-col mt-4">
                <div class="flex items-center gap-6 pt-4 pb-4 pl-3 pr-3">
                    <div class="w-[125px] flex items-center justify-center">
                        <input type="checkbox" class="switch blue" bind:checked={darkMode} on:click={toggle_darkMode}>
                    </div>
                    <div class="w-full">
                        <h2 class="dark:text-neutral-300 mb-2">Dark Mode</h2>
                        <p class="dark:text-neutral-400 text-sm italic">Change website appearance between Dark and Light modes.</p>
                    </div>
                </div>
                <div class="flex items-center gap-6 pt-4 pb-4 pl-3 pr-3">
                    <div class="w-[125px] flex items-center justify-center">
                        <input type="checkbox" class="switch blue" bind:checked={dbStn} on:click={toggle_dbStn}>
                    </div>
                    <div class="w-full">
                        <h2 class="dark:text-neutral-300 mb-2">Get all stations from the database</h2>
                        <p class="dark:text-neutral-400 text-sm italic">When enabled, prompts to enter a station name will be compared to a database of all European stations in addition to your own previous entries. If not enabled, the app will only compare against only stations which you have entered previously. Please note that enabling this option will incur a time delay while the stations are loaded.</p>
                    </div>
                </div>
            </div>
            <div class="border-[1px] border-neutral-700 rounded-md w-full flex flex-col mt-4">
                <button class="w-full flex justify-between p-4 items-center group" on:click={() => {advancedDropdown = !advancedDropdown; if(advancedDropdown == false){understood = false; understood2 = false}}}>
                    <h2 class="dark:text-white text-xl font-semibold">Advanced</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill w-5 h-5 opacity-50 group-hover:opacity-100 duration-100 dark:fill-neutral-200" viewBox="0 0 16 16" class:rotate={advancedDropdown}>
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                    </svg>
                </button>
                {#if advancedDropdown}
                <div class="border-neutral-700 border-[1px] m-4">
                    <div class="flex items-center gap-6 pt-4 pb-4 pl-3 pr-3 md:flex-row flex-col">
                        <div class="md:w-3/4 w-full">
                            <h2 class="dark:text-neutral-300 mb-2">Print decompressed database data to console</h2>
                            <p class="dark:text-neutral-400 text-sm italic">Print decompressed data from database to console to check or store elsewhere</p>
                        </div>
                        <div class="md:w-1/3 w-full flex items-center justify-center flex-col gap-2">
                            <button class="button w-full hover:before:bg-blue-800 hover:before:bg-opacity-80 md:max-w-[170px]" on:click={() => {printData("jou")}}>Print Journeys</button>
                            <button class="button w-full hover:before:bg-blue-800 hover:before:bg-opacity-80 md:max-w-[170px]" on:click={() => {printData("loc")}}>Print Locations</button>
                            <button class="button w-full hover:before:bg-blue-800 hover:before:bg-opacity-80 md:max-w-[170px]" on:click={() => {printData("logs")}}>Print Logs</button>
                            <button class="button w-full hover:before:bg-blue-800 hover:before:bg-opacity-80 md:max-w-[170px]" on:click={() => {printData("planning")}}>Print Planning</button>
                        </div>
                    </div>
                    <div class="flex items-center gap-6 pt-4 pb-4 pl-3 pr-3 md:flex-row flex-col">
                        <div class="md:w-3/4 w-full">
                            <h2 class="dark:text-neutral-300 mb-2">Export database as CSV</h2>
                            <p class="dark:text-neutral-400 text-sm italic">Export all database data as a CSV file, this may take a considerable time duration to generate.</p>
                        </div>
                        <div class="md:w-1/3 w-full flex items-center justify-center">
                            <button class="button w-full hover:before:bg-blue-800 hover:before:bg-opacity-80 md:max-w-[170px] opacity-50 cursor-not-allowed" on:click={() => {exportCSV("all")}}>Export as CSV</button>
                        </div>
                    </div>
                    <div class="flex items-center gap-6 pt-4 pb-4 pl-3 pr-3 md:flex-row flex-col">
                        <div class="md:w-3/4 w-full">
                            <h2 class="dark:text-neutral-300 mb-2">Manage Data</h2>
                            <p class="dark:text-neutral-400 text-sm italic">Clear parts of or all of the data stored. Either to free up storage, clear old plans or because of a technical issue. <br><br><span class="dark:text-yellow-300 text-yellow-800 font-semibold dark:font-normal">Warning! These actions are permanent and cannot be reversed (except getting stations from the database).</span></p>
                        </div>
                        <div class="md:w-1/3 w-full flex items-center justify-center">
                            {#if understood}
                                <div class="w-full flex justify-end items-center flex-col gap-2">
                                    <button class="button red md:max-w-[170px] darkbefore w-full text-sm" on:click={() => {clearJourneys()}}>Clear Journeys</button>
                                    <button class="button red md:max-w-[170px] darkbefore w-full text-sm" on:click={() => {clearUserLocations()}}>Clear User Locations</button>
                                    <button class="button red md:max-w-[170px] darkbefore w-full text-sm" on:click={() => {clearDBLocations()}}>Clear Database Locations</button>
                                    <button class="button red md:max-w-[170px] darkbefore w-full text-sm" on:click={() => {clearLogPhotos()}}>Clear Photos</button>
                                    <button class="button red md:max-w-[170px] darkbefore w-full text-sm" on:click={() => {clearLogsGeneral()}}>Clear Logs</button>
                                    <button class="button red md:max-w-[170px] darkbefore w-full text-sm" on:click={() => {clearPlanning()}}>Clear Planning</button>
                                </div>
                            {:else}
                                <button class="button w-full md:max-w-[200px]" on:click={() => {understood = true}}>Click to reveal options<br><span class="text-xs">(Acknowledge warning)</span></button>
                            {/if}
                        </div>
                    </div>
                    <div class="flex items-center gap-6 pt-4 pb-4 pl-3 pr-3 md:flex-row flex-col">
                        <div class="md:w-3/4 w-full">
                            <h2 class="dark:text-neutral-300 mb-2">Clear logs, journeys and photographs over 1, 3, 6 or 12 months old or those with no date</h2>
                            <p class="dark:text-neutral-400 text-sm italic">Clears all logs, journeys and associated photographs which are older than a certain time ago such as 1, 3, 6 or 12 months. <br><br><span class="dark:text-yellow-300 text-yellow-800 font-semibold dark:font-normal">Warning! This action is permenant and cannot be reversed.</span></p>
                        </div>
                        <div class="md:w-1/3 w-full flex items-center justify-center">
                            {#if understood2}
                                <div class="w-full flex justify-end items-center flex-col gap-2">
                                    <button class="button red md:max-w-[170px] darkbefore w-full text-sm" on:click={() => {clearTimePeriod("30")}}>Clear older than 1 month</button>
                                    <button class="button red md:max-w-[170px] darkbefore w-full text-sm" on:click={() => {clearTimePeriod("60")}}>Clear older than 3 months</button>
                                    <button class="button red md:max-w-[170px] darkbefore w-full text-sm" on:click={() => {clearTimePeriod("182")}}>Clear older than 6 months</button>
                                    <button class="button red md:max-w-[170px] darkbefore w-full text-sm" on:click={() => {clearTimePeriod("365")}}>Clear older than 12 months</button>
                                    <button class="button red md:max-w-[170px] darkbefore w-full text-sm" on:click={() => {clearTimePeriod("no_date")}}>Clear items with no date</button>
                                </div>
                            {:else}
                                <button class="button md:max-w-[200px] w-full" on:click={() => {understood2 = true}}>Click to reveal options<br><span class="text-xs">(Acknowledge warning)</span></button>
                            {/if}
                        </div>
                    </div>
                </div>
                {/if}
            </div>
        </div>
        
        
    </div>
    <div class="mt-auto">
        <Footer/>
    </div>
</div>

<script>
    import { onMount } from 'svelte';
    import Nav from '../../lib/components/Nav.svelte';
    import Footer from '../../lib/components/Footer.svelte';
    import '../../global.css';
    import '../siteDB.js';
    import { getJourneysData, getLocationsData, getLogsData, getPlanningData, writeJourneysData, writeLocationsData, writeLogsData, writePlanningData } from '../siteDB';
    import '../tl_stationsDB.js';
    import { tl_wipeAllData } from '../tl_stationsDB.js'
    import Alert from '../../lib/components/Alert.svelte';
	import { writable } from 'svelte/store';

    let dbStn = false;
    let advancedDropdown = false;
    let understood = false;
    let understood2 = false;

    let alrtAct = writable(false);
    let alrtTxt = writable('');
    let alrtMode = writable('success');

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
    
    async function clearJourneys(){
        if (confirm('Are you sure you want to clear all journeys? This action cannot be undone.')) {
            var journeys = await getJourneysData();
            journeys = [];
            await writeJourneysData(journeys);
            console.log('%c Journeys cleared', 'color:lime;background:black;');
            alrtAct.set(true);
            alrtTxt.set('Journeys cleared');
            alrtMode.set('success');
        } else {
            console.log('%c Action cancelled', 'color:red;background:black;');
            alrtAct.set(true);
            alrtTxt.set('Action cancelled');
            alrtMode.set('error');
        }
        sleep(3000)
        location.reload();
        understood = false;
    }

    async function clearUserLocations(){
        if (confirm('Are you sure you want to clear all user locations? This action cannot be undone.')) {
            var locations = await getLocationsData();
            locations = [];
            await writeLocationsData(locations);
            console.log('%c User Locations cleared', 'color:lime;background:black;');
            alrtAct.set(true);
            alrtTxt.set('User Locations cleared');
            alrtMode.set('success');
        } else {
            console.log('%c Action cancelled', 'color:red;background:black;');
            alrtAct.set(true);
            alrtTxt.set('Action cancelled');
            alrtMode.set('error');
        }
        sleep(3000)
        location.reload();
        understood = false;
    }

    async function clearDBLocations(){
        if (confirm('Are you sure you want to clear all database locations? If "Get stations from the Database" is enabled then station names will be regenerated unless this is disabled')) {
            await tl_wipeAllData();
            console.log('%c DB Locations cleared', 'color:lime;background:black;');
            alrtAct.set(true);
            alrtTxt.set('DB Locations cleared');
            alrtMode.set('success');
        } else {
            console.log('%c Action cancelled', 'color:red;background:black;');
            alrtAct.set(true);
            alrtTxt.set('Action cancelled');
            alrtMode.set('error');
        }
        sleep(3000)
        location.reload();
    }

    async function clearLogPhotos(){
        if (confirm('Are you sure you want to clear all photos within logs? This action cannot be undone.')) {
            var logs = await getLogsData();
            logs.forEach(log => {
                log.pictures = [];
            });
            await writeLogsData(logs);
            console.log('%c Photos cleared', 'color:lime;background:black;');
            alrtAct.set(true);
            alrtTxt.set('Photos cleared');
            alrtMode.set('success');
        } else {
            console.log('%c Action cancelled', 'color:red;background:black;');
            alrtAct.set(true);
            alrtTxt.set('Action cancelled');
            alrtMode.set('error');
        }
        sleep(3000)
        location.reload();
        understood = false;
    }

    async function clearLogsGeneral(){
        if (confirm('Are you sure you want to clear all logs? This action cannot be undone.')) {
            var logs = await getLogsData();
            logs = [];
            await writeLogsData(logs);
            console.log('%c Logs cleared', 'color:lime;background:black;');
            alrtAct.set(true);
            alrtTxt.set('Logs cleared');
            alrtMode.set('success');
        } else {
            console.log('%c Action cancelled', 'color:red;background:black;');
            alrtAct.set(true);
            alrtTxt.set('Action cancelled');
            alrtMode.set('error');
        }
        sleep(3000)
        location.reload();
        understood = false;
        
    }

    async function clearPlanning(){
        if (confirm('Are you sure you want to clear all plans? This action cannot be undone.')) {
            var planning = await getPlanningData();
            planning = [];
            await writePlanningData(planning);
            console.log('%c Planning cleared', 'color:lime;background:black;');
            alrtAct.set(true);
            alrtTxt.set('Planning cleared');
            alrtMode.set('success');
            sleep(3000)
            location.reload();
        } else {
            console.log('%c Action cancelled', 'color:red;background:black;');
            alrtAct.set(true);
            alrtTxt.set('Action cancelled');
            alrtMode.set('error');
        }
        sleep(3000)
        location.reload();
        understood = false;
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function clearTimePeriod(timeInDays){
        if (confirm(`Are you sure you want to clear all logs, journeys and associated photographs older than ${timeInDays} days? This action cannot be undone.`)) {
            var logs = await getLogsData();
            var journeys = await getJourneysData();
            if(timeInDays == "no_date"){
                logs = logs.filter(log => log.log_date == null);
                journeys = journeys.filter(journey => journey.journey_date == null);
            }else{
                logs = logs.filter(log => {
                    const logDate = new Date(log.log_date);
                    const currentDate = new Date();
                    const timeDiff = Math.abs(currentDate - logDate);
                    const diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
                    return diffDays > timeInDays;
                });
                journeys = journeys.filter(journey => {
                    const journeyDate = new Date(journey.journey_date);
                    const currentDate = new Date();
                    const timeDiff = Math.abs(currentDate - journeyDate);
                    const diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
                    return diffDays > timeInDays;
                });
            }
            console.log('%c Data cleared', 'color:lime;background:black;');
            alrtAct.set(true);
            alrtTxt.set('Data cleared');
            alrtMode.set('success');
        } else {
            console.log('%c Action cancelled', 'color:red;background:black;');
            alrtAct.set(true);
            alrtTxt.set('Action cancelled');
            alrtMode.set('error');
        }
        sleep(3000)
        location.reload();
        understood2 = false;
    }

    async function printData(arg){
        if(arg == "logs"){
            let logs = await getLogsData();
            console.log("%c Your logs data", 'color:lime;background:black;');
            logs.forEach(log => {
                delete log.pictures;
            });
            console.log(logs);
        }
        if(arg == "jou"){
            let journeys = await getJourneysData();
            console.log("%c Your journeys data", 'color:lime;background:black;');
            console.log(journeys);
        }
        if(arg == "loc"){
            let locations = await getLocationsData();
            console.log("%c Your locations data", 'color:lime;background:black;');
            console.log(locations);
        }
        if(arg == "planning"){
            let planning = await getPlanningData();
            console.log("%c Your planning data", 'color:lime;background:black;');
            console.log(planning);
        }
    }

    let darkMode = false;

    onMount(() => {
        document.title = 'Settings';
        if (typeof localStorage === 'undefined') {
            console.error('localStorage is not supported');
        } else {
            if (localStorage.getItem('settings') == null) {
                localStorage.setItem('settings', JSON.stringify({ dbStn: false, darkMode: false }));
            } else {
                var settings = JSON.parse(localStorage.getItem('settings'));
                if (settings.length === 0) {
                    settings = { dbStn: false, darkMode: false };
                    localStorage.setItem('settings', JSON.stringify(settings));
                }
                dbStn = settings.dbStn;
                darkMode = settings.darkMode;
                if (darkMode) {
                    document.documentElement.classList.add('dark');
                }
            }
        }
    });

    onMount(() => {
        const settings = JSON.parse(localStorage.getItem('settings'));
        if (settings.darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    });

    function toggle_darkMode(){
        darkMode = !darkMode;
        if(darkMode){
            document.documentElement.classList.add('dark');
        }else{
            document.documentElement.classList.remove('dark');
        }
        const settings = JSON.parse(localStorage.getItem('settings'));
        settings.darkMode = darkMode;
        localStorage.setItem('settings', JSON.stringify(settings));
    }

    async function exportCSV(mode){
        // export all journeys, locations, logs and planning as a CSV file
        var journeys = await getJourneysData();
        var locations = await getLocationsData();
        var logs = await getLogsData();
        var planning = await getPlanningData();
        var csvContent = "data:text/csv;charset=utf-8,";

        csvContent += "Journeys\n";
        csvContent += "Start Date,Start Time,End Date,End Time,From,From Country,From Lat,From Long,To,To Country,To Lat,To Long,Operator,Service Code,Delay Hours,Delay Minutes,Miles,Reason,Notes,First Class,Second Class,Sleeper,Wifi,Restauraunt,Cycles,Overnight,Tags,Via Points\n";
        if (journeys) {
            journeys.forEach(journey => {
            let viaPoints = journey.viaPoints.map(point => `"${point.name} (${point.country})"`).join(" -> ");
            csvContent += `"${journey.start_date}","${journey.start_time}","${journey.end_date}","${journey.end_time}","${journey.from}","${journey.fromCountry}","${journey.fromLat}","${journey.fromLong}","${journey.to}","${journey.toCountry}","${journey.toLat}","${journey.toLong}","${journey.operator}","${journey.serviceCode}","${journey.delayHours}","${journey.delayMinutes}","${journey.miles}","${journey.journeyReason}","${journey.journeyNotes}","${journey.journeyFirstClass}","${journey.journeySecondClass}","${journey.journeySleeper}","${journey.journeyWifi}","${journey.journeyRestauraunt}","${journey.journeyCycles}","${journey.journeyOvernight}","${journey.journeyTags.join(",")}","${viaPoints}"\n`;
            });
        }

        csvContent += "\nLocations\n";
        csvContent += "Name,Type,Lat,Long,Notes\n";
        if (locations) {
            locations.forEach(location => {
            csvContent += `"${location.name}","${location.type}","${location.lat}","${location.long}","${location.notes}"\n`;
            });
        }

        csvContent += "\nLogs\n";
        csvContent += "Date,Location,Lat,Long,Time,Country,Notes,Numbers\n";
        if (logs) {
            logs.forEach(log => {
            let numbers = log.numbers.map(num => `"${num.number} (${num.type} - ${num.variant})"`).join(", ");
            csvContent += `"${log.log_date}","${log.log_location}","${log.log_lat}","${log.log_long}","${log.log_time}","${log.country}","${log.logNotes}","${numbers}"\n`;
            });
        }

        csvContent += "\nPlanning\n";
        csvContent += "Date,From,To,Mode,Distance,Duration,Notes\n";
        if (planning) {
            planning.forEach(plan => {
            csvContent += `"${plan.date}","${plan.from}","${plan.to}","${plan.mode}","${plan.distance}","${plan.duration}","${plan.notes}"\n`;
            });
        }
        if(mode == "all"){
            var encodedUri = encodeURI(csvContent);
            var link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "all.csv");
            document.body.appendChild(link);
            link.click();
        }
        var csvContentJourneys = "data:text/csv;charset=utf-8,";
        var csvContentLocations = "data:text/csv;charset=utf-8,";
        var csvContentLogs = "data:text/csv;charset=utf-8,";
        var csvContentPlanning = "data:text/csv;charset=utf-8,";

        if(mode == "all" || mode == "journeys"){
            csvContentJourneys += "Journeys\n";
            csvContentJourneys += "Start Date,Start Time,End Date,End Time,From,From Country,From Lat,From Long,To,To Country,To Lat,To Long,Operator,Service Code,Delay Hours,Delay Minutes,Miles,Reason,Notes,First Class,Second Class,Sleeper,Wifi,Restauraunt,Cycles,Overnight,Tags,Via Points\n";
            if (journeys) {
            journeys.forEach(journey => {
            let viaPoints = journey.viaPoints.map(point => `"${point.name} (${point.country})"`).join(" -> ");
            csvContentJourneys += `"${journey.start_date}","${journey.start_time}","${journey.end_date}","${journey.end_time}","${journey.from}","${journey.fromCountry}","${journey.fromLat}","${journey.fromLong}","${journey.to}","${journey.toCountry}","${journey.toLat}","${journey.toLong}","${journey.operator}","${journey.serviceCode}","${journey.delayHours}","${journey.delayMinutes}","${journey.miles}","${journey.journeyReason}","${journey.journeyNotes}","${journey.journeyFirstClass}","${journey.journeySecondClass}","${journey.journeySleeper}","${journey.journeyWifi}","${journey.journeyRestauraunt}","${journey.journeyCycles}","${journey.journeyOvernight}","${journey.journeyTags.join(",")}","${viaPoints}"\n`;
            });
            }
        }

        csvContentLocations += "Locations\n";
        csvContentLocations += "Name,Type,Lat,Long,Notes\n";
        if (locations) {
        locations.forEach(location => {
        csvContentLocations += `"${location.name}","${location.type}","${location.lat}","${location.long}","${location.notes}"\n`;
        });
        }

        csvContentLogs += "Logs\n";
        csvContentLogs += "Date,Location,Lat,Long,Time,Country,Notes,Numbers\n";
        if (logs) {
        logs.forEach(log => {
        let numbers = log.numbers.map(num => `"${num.number} (${num.type} - ${num.variant})"`).join(", ");
        csvContentLogs += `"${log.log_date}","${log.log_location}","${log.log_lat}","${log.log_long}","${log.log_time}","${log.country}","${log.logNotes}","${numbers}"\n`;
        });
        }

        csvContentPlanning += "Planning\n";
        csvContentPlanning += "Date,From,To,Mode,Distance,Duration,Notes\n";
        if (planning) {
            planning.forEach(plan => {
            csvContentPlanning += `"${plan.date}","${plan.from}","${plan.to}","${plan.mode}","${plan.distance}","${plan.duration}","${plan.notes}"\n`;
            });
        }

        var encodedUriJourneys = encodeURI(csvContentJourneys);
        var encodedUriLocations = encodeURI(csvContentLocations);
        var encodedUriLogs = encodeURI(csvContentLogs);
        var encodedUriPlanning = encodeURI(csvContentPlanning);


        if(mode == "all" || mode == "journeys"){
            var linkJourneys = document.createElement("a");
            linkJourneys.setAttribute("href", encodedUriJourneys);
            linkJourneys.setAttribute("download", "journeys.csv");
            document.body.appendChild(linkJourneys);
            linkJourneys.click();
        }
        if(mode == "all" || mode == "locations"){
            var linkLocations = document.createElement("a");
            linkLocations.setAttribute("href", encodedUriLocations);
            linkLocations.setAttribute("download", "locations.csv");
            document.body.appendChild(linkLocations);
            linkLocations.click();
        }

        if(mode == "all" || mode == "logs"){
            var linkLogs = document.createElement("a");
            linkLogs.setAttribute("href", encodedUriLogs);
            linkLogs.setAttribute("download", "logs.csv");
            document.body.appendChild(linkLogs);
            linkLogs.click();
        }

        if(mode == "all" || mode == "planning"){
            var linkPlanning = document.createElement("a");
            linkPlanning.setAttribute("href", encodedUriPlanning);
            linkPlanning.setAttribute("download", "planning.csv");
            document.body.appendChild(linkPlanning);
            linkPlanning.click();
        }
    }
</script>

<style>
    .rotate{
        rotate: 180deg;
    }

    .widthAdj{
        width: 40%;
    }
</style>