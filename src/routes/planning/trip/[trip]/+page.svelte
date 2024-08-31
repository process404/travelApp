<div class="flex flex-col h-screen">
    <Nav ver="back"/>
        <div class="flex flex-col items-center h-full justify-start overflow-y-scroll customScrollbar overflow-x-hidden">
            <div class="max-w-[1000px] w-full flex flex-col h-full">
                <div class="flex flex-col items-center border-[1px] rounded-md border-neutral-700 sm:ml-8 ml-4 mr-2 sm:mr-8 h-full sm:pt-4 sm:pb-6 pl-4 pr-4 pb-4">
                    <h2 class="text-white text-xl font-semibold sm:mt-1 mt-2 mb-8">{tripName}</h2>
                </div>
            </div>
        </div>
    <Footer/>
</div>

<script>
    import { onMount } from 'svelte';
    import Nav from '../../../../lib/components/Nav.svelte';
    import Footer from '../../../../lib/components/Footer.svelte';
    import '../../../../global.css';
    import { page } from '$app/stores';
    var param = $page.params.trip;

    var tripName = 'Trip name here';

    onMount(() => {
        document.title = 'Trip';
    });
</script>