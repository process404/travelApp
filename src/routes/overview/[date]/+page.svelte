<div style="width: 100vw; display: flex; flex-direction: column" id="app">
    <Nav ver="back"/>
    <div class="h-full max-w-[1000px] w-full flex flex-col">
        <div class="flex flex-col items-center border-[1px] rounded-md border-neutral-700 sm:ml-8 ml-4 mr-4 sm:mr-8 h-full sm:pt-6 sm:pb-6 pl-2 pr-2 pb-2">
            {#if param != "unknown"}
                <h2 class="text-white text-xl font-semibold sm:mt-1 mt-3">Overview for <span>{formatDate(param)}</span></h2>
            {:else}
            <h2 class="text-white text-xl font-semibold sm:mt-1 mt-3">Overview for No Date</h2>
            {/if}
        </div>
    </div>
    <Footer/>
</div>

<script>
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import Nav from '../../../lib/components/Nav.svelte';
    import Footer from '../../../lib/components/Footer.svelte';
    
    let param = $page.params.date;
    let formatParam = param.replace(/(\d{4})-(\d{2})-(\d{2})/g, '$3/$2/$1');
    onMount(() => {
        param = param.replace(/-/g, '/');
        document.title = 'Overview for ' + formatParam;
    });

    function formatDate(date){
        const d = new Date(date);
        return d.toLocaleDateString('en-GB', {month: 'long', day: 'numeric'});
    }
</script>

