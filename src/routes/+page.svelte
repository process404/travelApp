<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->

<Nav ver="main"/>

<div id="app" x-data="app" class="h-screen flex flex-col items-center">
	{#if currentPage == 'main'}
	<div class="h-full max-w-[1000px] w-full">
		<div class="flex flex-col items-center border-[1px] rounded-md border-neutral-700 sm:ml-8 ml-4 mr-4 sm:mr-8 h-full pt-6 pb-6 pl-2 pr-2">
			<div class="w-full flex  flex-col gap-2 items-center pl-16 pr-16 justify-center">
				<h2 class="text-white font-semibold text-3xl">Hello!</h2>
				<h3 class="text-neutral-500 font-normal text-sm italic">Please select an area</h3>
			</div>
			<div class="flex flex-col gap-8 w-full mt-6 pl-8 pr-8">
				<button on:click={() => switchPage('logs')}  class="clip w-full max-h-[200px] h-auto relative border-[2px] border-neutral-700 hover:border-white duration-100 group overflow-hidden">
					<div class="absolute w-full h-full top-0 left-0 flex items-end justify-end flex-col">
						<div class="flex h-full items-center mt-2">
							<h2 class=" mr-4 rounded-sm text-white bg-black bg-opacity-50 text-3xl z-20 p-2 pl-8 pr-4 flex items-center  clip">Logs <span class="ml-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-short w-12 h-12 pt-1" viewBox="0 0 16 16">
								<path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"/>
							</svg></span></h2>
						</div>
						
						<a title="NAC, CC BY-SA 3.0 &lt;https://creativecommons.org/licenses/by-sa/3.0&gt;, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:FFS_RABe_522_205_Basel_SBB_180611.jpg" class="bg-black bottom-0  mr-auto z-30 text-white bg-opacity-40 text-[0.5rem] p-1 left-0 pl-2 pr-2 rounded-sm w-full sm:w-auto">NAC, CC BY-SA 3.0 https://creativecommons.org/licenses/by-sa/3.0, via Wikimedia Commons</a>
					</div>

					<div class="absolute left-0 top-0 w-full h-full z-10 bg-black opacity-0 group-hover:opacity-50 duration-200"></div>
					<img class="w-full h-full z-10 object-cover blur-sm opacity-100 duration-100" alt="FFS RABe 522 205 Basel SBB 180611" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/FFS_RABe_522_205_Basel_SBB_180611.jpg/512px-FFS_RABe_522_205_Basel_SBB_180611.jpg?20140315211945">
				</button>
				<button on:click={() => switchPage('planning')}  class="clip w-full max-h-[200px] h-auto relative border-[2px] border-neutral-700 hover:border-white duration-100 group overflow-hidden">
					<div class="absolute w-full h-full top-0 left-0 flex items-end justify-end flex-col">
						<div class="flex h-full items-center mt-2">
							<h2 class="sm:right-10 right-4 rounded-sm text-white bg-black bg-opacity-50 text-3xl z-20 p-2 pl-8 pr-4 flex items-center top-16 clip mr-4">Planning <span class="ml-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-short w-12 h-12 pt-1" viewBox="0 0 16 16">
								<path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"/>
							</svg></span></h2>
						</div>
						<a title="Onderwijsgek at nl.wikipedia, CC BY-SA 3.0 NL &lt;https://creativecommons.org/licenses/by-sa/3.0/nl/deed.en&gt;, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Nederlandse_Spoorwegen_Kaartautomaat.jpg" class="bg-black bottom-0  mr-auto z-30 text-white bg-opacity-40 text-[0.5rem] p-1 pl-4 pr-2 rounded-sm w-full sm:w-auto">Onderwijsgek at nl.wikipedia, CC BY-SA 3.0 NL https://creativecommons.org/licenses/by-sa/3.0/nl/deed.en, via Wikimedia Commons</a>
					</div>
					<div class="absolute left-0 top-0 w-full h-full z-10 bg-black opacity-0 group-hover:opacity-50 duration-200"></div>
					<img class="w-full h-full z-10 object-cover blur-sm opacity-100 duration-100" alt="FFS RABe 522 205 Basel SBB 180611" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Nederlandse_Spoorwegen_Kaartautomaat.jpg/512px-Nederlandse_Spoorwegen_Kaartautomaat.jpg?20110727140955">
				</button>
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
</div>

<Footer/>

<script>
	import Nav from '../lib/components/Nav.svelte';
	import Footer from '../lib/components/Footer.svelte';

	import { onMount } from 'svelte';
	var currentPage = 'main'

	onMount(() => {
		document.title = 'Trip Planner';
		currentPage = 'main';
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
