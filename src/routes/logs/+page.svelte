<main style="width: 100vw; display: flex; flex-direction: column" id="app" class="items-center justify-center">
    <Nav ver="back" class="w-full"/>
    <section class="h-full max-w-[1000px] w-full flex flex-col">
        {#if currentPage === 'home'}
        <article class="flex flex-col items-center border-[1px] rounded-md border-neutral-700 sm:ml-8 ml-4 mr-4 sm:mr-8 h-full sm:pt-6 sm:pb-6 pl-2 pr-2 pb-2">
            <h2 class="dark:text-white text-3xl font-semibold mt-4">Add to Database</h2>
            <h3 class="dark:text-neutral-400 italic mt-2">Please select an option</h3>
            <div class="border-[1px] rounded-md border-neutral-700 w-full sm:p-4 p-2 mt-4 sm:mt-8 flex justify-center gap-2 h-full flex-col max-w-[600px]">
                <div class="border-[0px] rounded-md border-neutral-700 w-full h-full flex gap-2">
                    <button class="button blue2 darkbefore w-full lessprominent text-md noanim" on:click={() => goInnerPage('add-journey')}>Add Journey</button>
                    <button class="button blue2 darkbefore w-full lessprominent text-md noanim" on:click={() => goInnerPage('add-log')}>Add Log</button>
                </div>
                <div class="border-[0px] rounded-md border-neutral-700 w-full h-full flex flex-col gap-2">
                    <button class="button blue3 darkbefore noanim h-full lessprominent text-md noanim" on:click={() => goInnerPage('add-location')}>Add Location</button>
                    <button class="button blue3 darkbefore noanim h-full lessprominent text-md noanim" on:click={() => goInnerPage('add-note')}>Add Note</button>
                </div>
            </div>
            <!-- <div class="border-[1px] rounded-md border-neutral-700 w-full sm:p-4 p-2 mt-4 flex justify-center gap-2 h-full">
                <div class="border-[1px] rounded-md border-neutral-700 p-2 w-full h-full max-w-[400px] flex flex-col">
                    <button class="bg-green-700 text-white w-full p-1 rounded-sm hover:bg-green-800 h-full pt-2 pb-2">View Logs</button>
                    <button class="bg-green-700 text-white w-full p-1 rounded-sm hover:bg-green-800 h-full pt-2 pb-2 mt-2">View Journeys</button>
                </div>
            </div> -->
        </article>
        {/if}
        
    </section>
    <footer class="mt-auto w-full">
        <Footer/>
    </footer>
</main>

<script>
    import '../../global.css'


    import Nav from '../../lib/components/Nav.svelte';
    import Footer from '../../lib/components/Footer.svelte';

    import { onMount } from 'svelte';

    var currentPage = 'home'

    onMount(() => {
        document.title = 'Logs';
    });

    function goInnerPage(page){
        const basePath = window.location.pathname.endsWith('/') ? window.location.pathname : `${window.location.pathname}/`;
        const fullPath = `${basePath}${page}`;
        window.location.href = fullPath;
    }

    onMount(() => {
        const settings = JSON.parse(localStorage.getItem('settings'));
        if (settings.darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    });
</script>
