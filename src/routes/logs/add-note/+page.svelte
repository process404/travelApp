<div style="width: 100vw; display: flex; flex-direction: column" id="app">
<Nav ver="back"/>
    <div class="h-full w-full flex flex-col items-center">
        <div class="max-w-[1000px] lg:w-full w-[97%] flex flex-col items-center border-[1px] rounded-md border-neutral-700 sm:ml-8 ml-4 mr-4 sm:mr-8 h-full sm:pt-6 sm:pb-6 pl-2 pr-2 pb-2">
            <h2 class="text-white text-xl font-semibold sm:mt-1 mt-3">Add Note</h2>
        </div>
    </div>
    <div class="mt-auto">
        <Footer/>
    </div>
</div>

<script>
    import { onMount } from 'svelte';
    import Nav from '../../../lib/components/Nav.svelte';
    import Footer from '../../../lib/components/Footer.svelte';
    import '../../../global.css'
    onMount(() => {
        document.title = 'Add Note';
    });

    onMount(() => {
        const settings = JSON.parse(localStorage.getItem('settings'));
        if (settings.darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    });
</script>

