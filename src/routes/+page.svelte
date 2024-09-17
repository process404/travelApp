
<div style="width: 100vw; display: flex; flex-direction: column" id="app" class="items-center justify-center">
	<Nav ver="main"/>
	{#if currentPage == 'main'}
	<div class="h-full max-w-[1000px] lg:max-w-[90%] w-full flex flex-col flex-grow lg:justify-center">
		<div class="flex flex-col items-center border-[1px] rounded-md border-neutral-700 sm:ml-8 ml-4 mr-4 sm:mr-8 h-full lg:max-h-[700px] sm:pt-6 sm:pb-6 sm:pl-2 sm:pr-2 flex-grow">
			<div class="flex flex-col lg:flex-row gap-4 w-full h-full mt-4 sm:mt-2 sm:pl-8 sm:pr-8 pl-4 pr-4 flex-grow mb-4 sm:mb-2">
				<!-- <HomeButton clickRoute="logs" buttonName="Add" imgTitle="Gerrit-Jan van den Berg, CC BY-SA 4.0 &lt;https://creativecommons.org/licenses/by-sa/4.0&gt;, via Wikimedia Commons" imgTitle2="Gerrit-Jan van den Berg, CC BY-SA 4.0 <https://creativecommons.org/licenses/by-sa/4.0>, via Wikimedia Commons" imgSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/ICNG_3110.jpg/512px-ICNG_3110.jpg?20220415163918" imgHref="https://commons.wikimedia.org/wiki/File:ICNG_3110.jpg" /> -->
				<HomeButton clickRoute="logs" buttonName="Add" imgTitle="" imgTitle2="" imgSrc="" imgHref="" />
				<!-- <HomeButton clickRoute="overview" buttonName="View" imgTitle="Onderwijsgek at nl.wikipedia, CC BY-SA 3.0 NL &lt;https://creativecommons.org/licenses/by-sa/3.0/nl/deed.en&gt;, via Wikimedia Commons" imgTitle2="NAC, CC BY-SA 3.0 https://creativecommons.org/licenses/by-sa/3.0, via Wikimedia Commons" imgSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/FFS_RABe_522_205_Basel_SBB_180611.jpg/512px-FFS_RABe_522_205_Basel_SBB_180611.jpg?20140315211945" imgHref="https://commons.wikimedia.org/wiki/File:FFS_RABe_522_205_Basel_SBB_180611.jpg" /> -->
				<HomeButton clickRoute="overview" buttonName="View" imgTitle="" imgTitle2="" imgHref="" />
				<!-- <HomeButton clickRoute="planning" buttonName="Planning" imgTitle="Onderwijsgek at nl.wikipedia, CC BY-SA 3.0 NL &lt;https://creativecommons.org/licenses/by-sa/3.0/nl/deed.en&gt;, via Wikimedia Commons" imgTitle2="Onderwijsgek at nl.wikipedia, CC BY-SA 3.0 NL https://creativecommons.org/licenses/by-sa/3.0/nl/deed.en, via Wikimedia Commons" imgSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Nederlandse_Spoorwegen_Kaartautomaat.jpg/512px-Nederlandse_Spoorwegen_Kaartautomaat.jpg?20110727140955" imgHref="https://commons.wikimedia.org/wiki/File:Nederlandse_Spoorwegen_Kaartautomaat.jpg" /> -->
				<HomeButton clickRoute="planning" buttonName="Planning" imgTitle="" imgTitle2="" imgSrc="" imgHref="" />
			</div>
		</div>
	</div>
	{/if}
	{#if currentPage == 'about'}
	<div class="h-full max-w-[1000px] w-full">
		<button class="text-white ">Go back</button>
		<div class="flex flex-col items-center border-[1px] rounded-md border-neutral-700 sm:ml-8 ml-4 mr-4 sm:mr-8 h-full pt-6 pb-6 pl-2 pr-2">
			<h2 class="text-white font-semibold text-3xl">Laden...</h2>
			<h3 class="text-neutral-500 mt-2 font-normal text-sm italic">About</h3>
		</div>
	</div>
	{/if}
	<Footer/>
</div>


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
</script>;
	

<style>
.loader{margin-top:12px;width:24px;height:24px;border:3px solid rgb(50,50,50);border-bottom-color:transparent;border-radius:50%;display:inline-block;box-sizing:border-box;animation:rotation 1s linear infinite}@keyframes rotation{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
</style>
