
<div class="w-screen h-screen flex flex-col" style="background: rgb(255,255,255)">
    <div class="w-full h-auto p-2 flex items-center justify-between non-print">
        <div>
            <button class="fadeButton dark p-2 text-sm" on:click={() => window.history.back()}>Go Back</button>
            <button class="fadeButton green p-2 text-sm pl-4 pr-4" on:click={print}>Print</button>
        </div>
        <h3 class="text-xs w-1/2">This will not show when you click print. <b>Desktop recommended.</b></h3>
    </div>
    {#if plan}
    <div class="ml-2 mr-2 mt-4 mb-4 flex justify-between items-center">
        <div>
            <h2 class="font-bold">{UC(plan.name)}</h2>
            <h3 class="font-bold">{UC(plan.description)}</h3>
        </div>
    </div>
    <div class="ml-2 mr-2">
        <table class="table-auto w-full">
            <thead class="bg-black">
                <th class="text-white">ID</th>
                <th class="text-white">DEP</th>
                <th class="text-white">ARR</th>
                <th class="text-white">FROM</th>
                <th class="text-white">TO</th>
                <th class="text-white">OP</th>
                <th class="text-white">NOTE</th>
            </thead>
        </table>
        <tbody>

        </tbody>
    </div>
    {/if}
</div>

<script>
    import { page } from '$app/stores';
    import Nav from '../../../../../lib/components/Nav.svelte';
    import Footer from '../../../../../lib/components/Footer.svelte';
    import '../../../../../global.css'
    var param = $page.params.trip;
    let plan = {}
    console.log(param)

    function print(){
        window.print();
    }

    import { onMount } from 'svelte';

    onMount(() => {
        document.title = 'Print Window';
        if (localStorage.getItem('planning')) {
            let plansFromDB = JSON.parse(localStorage.getItem('planning'));
            plan = plansFromDB.find((plan) => plan.tripID === param);
            if(plan){
                console.log(plan)
            }
        }
    });

    function UC(str) {
        console.log(str)
        if (str) {
            return str.toUpperCase();
        }
        return '';
    }


</script>

<style>
    @media print {
        .non-print {
            display: none;
        }
    }
</style>