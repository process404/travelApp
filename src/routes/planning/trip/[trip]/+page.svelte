<div class="flex flex-col h-screen">
    <Nav ver="back"/>
        <div class="flex flex-col items-center h-full justify-start overflow-y-scroll customScrollbar overflow-x-hidden">
            <div class="max-w-[1000px] w-full flex flex-col h-full">
                <div class="flex flex-col items-center border-[1px] rounded-md border-neutral-700 sm:ml-8 ml-4 mr-2 sm:mr-8 sm:pt-4 sm:pb-6 pl-4 pr-3 pb-4 overflow-y-scroll customScrollbar h-full">
                    {#if tripName == ''}
                        <span class="loader"></span>
                    {/if}
                    <h2 class="text-white text-xl font-semibold sm:mt-1 mt-5 mb-6">{tripName}</h2>
                    {#if thisTrip == null}
                        <span class="loader"></span>
                    {:else}
                        <div class="w-full pl-1 flex-col justify-center items-center  max-w-[600px]">
                            {#each thisTrip.days as day}
                                <div class="border-[1px] border-neutral-700 rounded-md w-full p-2 h-auto min-h-[100px] first:mt-0 mt-4">
                                    <div class="flex justify-between w-full items-center flex-wrap">
                                        <h2 class="text-white italic">Day {day.day}</h2>
                                        <button class="fadeButton blue p-1 text-sm">Add Journey</button>
                                    </div>
                                    <hr class="mt-2 border-neutral-700 mb-2">
                                </div>
                            {/each} 
                        </div>
                    {/if}
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

    var tripName = '';
    var thisTrip = null;

    onMount(() => {
        document.title = 'Trip';
        var storage = JSON.parse(localStorage.getItem('planning'));
        for(const plan in storage){
            console.log(storage[plan])
            if(storage[plan].tripID == param){
                tripName = storage[plan].name;
                thisTrip = storage[plan];
            }
        }
    });
</script>

<style>
    .loader {
        margin-top:12px;
        width: 24px;
        height: 24px;
        border: 3px solid rgb(50,50,50);
        border-bottom-color: transparent;
        border-radius: 50%;
        display: inline-block;
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
    }

    
    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    } 
</style>