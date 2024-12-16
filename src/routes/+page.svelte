<main style="width: 100vw; display: flex; flex-direction: column" id="app" class="items-center justify-center">
	<Nav ver="main"/>
	{#if currentPage == 'main'}
	<section class="h-full max-w-[1000px] w-full flex flex-col flex-grow lg:justify-center">
		<article class="flex flex-col items-center border-[1px] rounded-md border-neutral-700 sm:ml-8 ml-4 mr-4 sm:mr-8 h-full lg:max-h-[700px] sm:pt-6 sm:pb-6 sm:pl-2 sm:pr-2 flex-grow">
			<div class="flex flex-col gap-4 w-full h-full mt-4 sm:mt-2 sm:pl-8 sm:pr-8 pl-4 pr-4 flex-grow mb-4 sm:mb-2">
				<HomeButton clickRoute="overview" buttonName="Overview" imgTitle="" imgTitle2="" imgHref="" />
				<HomeButton clickRoute="logs" buttonName="Add New" imgTitle="" imgTitle2="" imgSrc="" imgHref="" />
				<HomeButton clickRoute="planning" buttonName="Planning" imgTitle="" imgTitle2="" imgSrc="" imgHref="" />
			</div>
		</article>
	</section>
	{/if}
	{#if currentPage == 'about'}
	<section class="h-full max-w-[1000px] w-full">
		<button class="text-white">Go back</button>
		<article class="flex flex-col items-center border-[1px] rounded-md border-neutral-700 sm:ml-8 ml-4 mr-4 sm:mr-8 h-full pt-6 pb-6 pl-2 pr-2">
			<h2 class="text-white font-semibold text-3xl">Laden...</h2>
			<h3 class="text-neutral-500 mt-2 font-normal text-sm italic">About</h3>
		</article>
	</section>
	{/if}
	<footer class="mt-auto w-full">
		<Footer/>
	</footer>
</main>


<script>
import Nav from "../lib/components/Nav.svelte";
import Footer from "../lib/components/Footer.svelte";
import HomeButton from "../lib/components/HomeButtons.svelte";
import { onMount } from "svelte";
import './siteDB.js'
import { writePlanningData, writeLocationsData, writeJourneysData, writeLogsData, getPlanningData, getLocationsData, getJourneysData, getLogsData } from './siteDB';


// window.wData = () => {
// 	doThing();
// }

async function doThing(){
	await writePlanningData()
}

var currentPage = "main";

onMount(() => {
	document.title = "Trip Planner";
	currentPage = "main";

	if (localStorage.getItem("settings") == null) {
		localStorage.setItem('settings', JSON.stringify({"dbStn": true}));
	}
	if (getLogsData() == null) {
		setLogsData([]);
	}
	if (getJourneysData() == null) {
		setJourneysData([]);
	}
	if (getLocationsData() == null) {
		setLocationsData([]);
	}
	if (getPlanningData() == null) {
		setPlanningData([]);
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
	
</script>;
	

<style>
.loader{margin-top:12px;width:24px;height:24px;border:3px solid rgb(50,50,50);border-bottom-color:transparent;border-radius:50%;display:inline-block;box-sizing:border-box;animation:rotation 1s linear infinite}@keyframes rotation{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
</style>
