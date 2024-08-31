<Nav ver="back"/>
    <div class="flex flex-col items-center h-screen justify-start">
        <div class="h-full max-w-[1000px] w-full flex flex-col">
            <div class="flex flex-col items-center border-[1px] rounded-md border-neutral-700 sm:ml-8 ml-4 mr-4 sm:mr-8 h-full sm:pt-6 sm:pb-6 pl-2 pr-2 pb-2">
                <h2 class="text-white text-2xl font-semibold sm:mt-1 m">Settings</h2>
            </div>
        </div>
    </div>
<Footer/>

<script>
    import { onMount } from 'svelte';
    import Nav from '../../lib/components/Nav.svelte';
    import Footer from '../../lib/components/Footer.svelte';
    import '../../global.css'
    onMount(() => {
        document.title = 'Settings';
    });
</script>