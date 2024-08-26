<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->


<div id="app" class="flex flex-col items-center h-screen justify-start">
	<Nav ver="main"/>
	{#if currentPage == 'main'}
	<div class="h-full max-w-[1000px] w-full flex flex-col flex-grow">
		<div class="flex flex-col items-center border-[1px] rounded-md border-neutral-700 sm:ml-8 ml-4 mr-4 sm:mr-8 h-full sm:pt-6 sm:pb-6 sm:pl-2 sm:pr-2 flex-grow">
			<!-- <div class="w-full flex  flex-col gap-2 items-center pl-16 pr-16 justify-center">
				<h2 class="text-white font-semibold text-3xl">Hello!</h2>
				<h3 class="text-neutral-500 font-normal text-sm italic">Please select an area</h3>
			</div> -->
			<div class="flex flex-col gap-4 w-full h-full sm:mt-6 mt-4 sm:pl-8 sm:pr-8 pl-2 pr-4 flex-grow">
				<HomeButton clickRoute="logs" buttonName="Add" imgTitle="Gerrit-Jan van den Berg, CC BY-SA 4.0 &lt;https://creativecommons.org/licenses/by-sa/4.0&gt;, via Wikimedia Commons" imgTitle2="Gerrit-Jan van den Berg, CC BY-SA 4.0 <https://creativecommons.org/licenses/by-sa/4.0>, via Wikimedia Commons" imgSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/ICNG_3110.jpg/512px-ICNG_3110.jpg?20220415163918" imgHref="https://commons.wikimedia.org/wiki/File:ICNG_3110.jpg" />
				<HomeButton clickRoute="overview" buttonName="View" imgTitle="Onderwijsgek at nl.wikipedia, CC BY-SA 3.0 NL &lt;https://creativecommons.org/licenses/by-sa/3.0/nl/deed.en&gt;, via Wikimedia Commons" imgTitle2="NAC, CC BY-SA 3.0 https://creativecommons.org/licenses/by-sa/3.0, via Wikimedia Commons" imgSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/FFS_RABe_522_205_Basel_SBB_180611.jpg/512px-FFS_RABe_522_205_Basel_SBB_180611.jpg?20140315211945" imgHref="https://commons.wikimedia.org/wiki/File:FFS_RABe_522_205_Basel_SBB_180611.jpg" />
				<HomeButton clickRoute="planning" buttonName="Planning" imgTitle="Onderwijsgek at nl.wikipedia, CC BY-SA 3.0 NL &lt;https://creativecommons.org/licenses/by-sa/3.0/nl/deed.en&gt;, via Wikimedia Commons" imgTitle2="Onderwijsgek at nl.wikipedia, CC BY-SA 3.0 NL https://creativecommons.org/licenses/by-sa/3.0/nl/deed.en, via Wikimedia Commons" imgSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Nederlandse_Spoorwegen_Kaartautomaat.jpg/512px-Nederlandse_Spoorwegen_Kaartautomaat.jpg?20110727140955" imgHref="https://commons.wikimedia.org/wiki/File:Nederlandse_Spoorwegen_Kaartautomaat.jpg" />
				<!-- <HomeButton clickRoute="settings" buttonName="Settings" imgTitle="" imgTitle2="" imgSrc="" imgHref="" /> -->
			</div>
		</div>
	</div>
	{/if}
	{#if currentPage == 'about'}
	<div class="h-full max-w-[1000px] w-full">
		<button class="text-white ">Go back</button>
		<div class="flex flex-col items-center border-[1px] rounded-md border-neutral-700 sm:ml-8 ml-4 mr-4 sm:mr-8 h-full pt-6 pb-6 pl-2 pr-2">
			<h2 class="text-white font-semibold text-3xl">Hello!</h2>
			<h3 class="text-neutral-500 mt-2 font-normal text-sm italic">About</h3>
		</div>
	</div>
	{/if}
	<Footer/>
</div>


<script>
	import Nav from '../lib/components/Nav.svelte';
	import Footer from '../lib/components/Footer.svelte';
	import HomeButton from '../lib/components/HomeButtons.svelte';

	import { onMount } from 'svelte';
	var currentPage = 'main'

	onMount(() => {
		document.title = 'Trip Planner';
		currentPage = 'main';

		if(localStorage.getItem('storage') == null){
			localStorage.setItem('storage', true)
			localStorage.setItem('logs', JSON.stringify([]));
			localStorage.setItem('journeys', JSON.stringify([]));
			localStorage.setItem('stations', JSON.stringify([]));
			localStorage.setItem('locations', JSON.stringify([]));
			localStorage.setItem('planning', JSON.stringify([]));
		}

	});



	function switchPage(page){
		currentPage = page;
		window.location.href = page;
	}

</script>

<style>

	.clip{

	}
</style>
