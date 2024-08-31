<div class="flex flex-col h-screen">
<Nav ver="back"/>
    <div class="flex flex-col items-center h-full justify-start overflow-y-scroll customScrollbar overflow-x-hidden">
        <div class="max-w-[1000px] w-full flex flex-col h-full">
            <div class="flex flex-col items-center border-[1px] rounded-md border-neutral-700 sm:ml-8 ml-4 mr-2 sm:mr-8 h-full sm:pt-6 sm:pb-6 pl-4 pr-4 pb-4">
                {#if plansFromDB.length == 0}
                <div class="h-full flex items-center justify-center flex-col gap-4">
                    <h3 class="text-neutral-400 italic mt-2 text-md">You have no plans yet</h3>
                    <div class="flex gap-2 flex-col">
                        <button class="fadeButton blue p-2 pl-8 pr-8" on:click={createPlanPg}>Create a plan</button>
                        <!-- <button class="fadeButton green p-2 pl-8 pr-8">Load from String</button> -->
                    </div>
                </div>
                {:else}
                <h2 class="text-white text-xl font-semibold sm:mt-1 mt-3 mb-8">Your Planning</h2>
                {#each plansFromDB as plan}
                    <div class="flex flex-col w-full h-full overflow-y-scroll customScrollbar ml-2 sm:ml-0">
                        <button class="w-full border-[1px] rounded-md border-neutral-700 p-3 bg-black bg-opacity-30 text-left focus:border-white duration-100 hover:border-white hover:border-opacity-50" on:click={() => window.location.href = '/planning/trip/' + plan.tripID}>
                            <div class="flex items-center gap-4">
                                <h3 class="text-white italic font-semibold text-xl">{plan.name}</h3>
                                {#if timeToStart(plan) < 10}
                                <h3 class="text-white bg-red-700 pl-2 pr-2 p-1 rounded-sm text-xs italic">Begins in {timeToStart(plan)} days</h3>
                                {/if}
                                {#if timeToStart(plan) > 10}
                                <h3 class="text-white bg-neutral-800 pl-2 pr-2 p-1 rounded-sm text-xs italic">Begins in {timeToStart(plan)} days</h3>
                                {/if}
                            </div>
                            <hr class="mt-2 opacity-20">
                            <div class="flex w-full mt-3 gap-2 flex-wrap">
                                <div class="bg-neutral-800 flex pl-3 pr-3 p-1 rounded-sm gap-2 items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-alarm fill-white opacity-30" viewBox="0 0 16 16">
                                    <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9z"/>
                                    <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1zm1.038 3.018a6 6 0 0 1 .924 0 6 6 0 1 1-.924 0M0 3.5c0 .753.333 1.429.86 1.887A8.04 8.04 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5M13.5 1c-.753 0-1.429.333-1.887.86a8.04 8.04 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1"/>
                                    </svg>
                                    <div>

                                        <h4 class="text-white text-sm">{getDays(plan)} days</h4>
                                    </div>
                                </div>
                                <div class="bg-neutral-800 flex pl-3 pr-3 p-1 rounded-sm gap-2 items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar fill-white opacity-30" viewBox="0 0 16 16">
                                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
                                    </svg>
                                    <h4 class="text-white text-sm">{formatDate(plan.start)} to {formatDate(plan.end)}</h4>
                                </div>
                                <div class="bg-neutral-800 flex pl-3 pr-3 p-1 rounded-sm gap-2 items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bus-front-fill fill-white opacity-30" viewBox="0 0 16 16">
                                        <path d="M16 7a1 1 0 0 1-1 1v3.5c0 .818-.393 1.544-1 2v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5V14H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2a2.5 2.5 0 0 1-1-2V8a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1V2.64C1 1.452 1.845.408 3.064.268A44 44 0 0 1 8 0c2.1 0 3.792.136 4.936.268C14.155.408 15 1.452 15 2.64V4a1 1 0 0 1 1 1zM3.552 3.22A43 43 0 0 1 8 3c1.837 0 3.353.107 4.448.22a.5.5 0 0 0 .104-.994A44 44 0 0 0 8 2c-1.876 0-3.426.109-4.552.226a.5.5 0 1 0 .104.994M8 4c-1.876 0-3.426.109-4.552.226A.5.5 0 0 0 3 4.723v3.554a.5.5 0 0 0 .448.497C4.574 8.891 6.124 9 8 9s3.426-.109 4.552-.226A.5.5 0 0 0 13 8.277V4.723a.5.5 0 0 0-.448-.497A44 44 0 0 0 8 4m-3 7a1 1 0 1 0-2 0 1 1 0 0 0 2 0m8 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m-7 0a1 1 0 0 0 1 1h2a1 1 0 1 0 0-2H7a1 1 0 0 0-1 1"/>
                                      </svg>
                                    <h4 class="text-white text-sm">{countJourneys(plan)} journeys</h4>
                                </div>
                            </div>
                            <!-- Stuff to go here = start / end date / days (work this out) / perhaps number of journeys within trip-->
                        </button>
                    </div>
                {/each}
                {/if}
            </div>
        </div>
    </div>
    <Footer/>
</div>

<script>
    import Nav from '../../lib/components/Nav.svelte';
    import Footer from '../../lib/components/Footer.svelte';
    import { onMount } from 'svelte';
    var plansFromDB = []

    onMount(() => {
        document.title = 'Planning';
        if(localStorage.getItem('planning')){
            plansFromDB = JSON.parse(localStorage.getItem('planning'))
        }
    });

    function createPlanPg(){
        window.location.href = '/planning/createPlan'
    }

    function getDays(plan){
        let start = new Date(plan.start);
        let end = new Date(plan.end);
        let diffTime = Math.abs(end - start);
        let days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return days
    }

    function formatDate(date){
        let d = new Date(date);
        let day = d.getDate();
        let month = d.getMonth() + 1;
        let year = d.getFullYear();
        return `${day}/${month}/${year}`
    }

    function countJourneys(plan){
        let count = 0;
        for(const day in plan.days){
            for(const journey in day.journeys){
                count++
            }
        }
        return count;
    }

    function timeToStart(plan){
        let start = new Date(plan.start);
        let now = new Date();
        let diffTime = Math.abs(start - now);
        let days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return days
    }
</script>

<style>
     .non-empty{
        @apply border-b-blue-600 valid:border-blue-600 invalid:border-red-600 hover:invalid:border-red-600
    }
    
    .fadeButton{
        @apply relative z-20
    }

    .fadeButton::before{
        border-radius: 50%;
    }

    .fadeButton{
        @apply text-neutral-300 before:w-0 before:h-full  before:bg-neutral-500 before:bg-opacity-30 before:absolute before:left-1/2 before:top-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:z-[-1] bg-white bg-opacity-[0.02] rounded-sm;
    }

    .fadeButton:hover:before{
       animation: boxFillIn 0.1s forwards;
       animation-timing-function: ease-in-out;
    }

    .fadeButton:active:before{
        animation: boxFill 0.1s forwards;
        animation-timing-function: ease-in-out;
    }

    .fadeButton:hover{
        @apply text-white
    }

    .fadeButton.blue{
        @apply bg-blue-700  before:bg-blue-300 before:bg-opacity-20
    }

    .fadeButton.red{
        @apply bg-red-700  before:bg-red-300 before:bg-opacity-20
    }

    .fadeButton.blue2{
        @apply bg-blue-800  before:bg-blue-300 before:bg-opacity-20
    }

    .fadeButton.blue3{
        @apply bg-blue-900 bg-opacity-50 before:bg-blue-300 before:bg-opacity-50;
    }

    .fadeButton.textWhite{
        @apply text-white
    }

    .fadeButton.green{
        @apply bg-green-800  before:bg-green-300 before:bg-opacity-10 text-white
    }
    
    
    @keyframes boxFillIn{
        0%{
            width: 0%;
            border-radius: 100%;
        }
        100%{
            width: 100%;
            border-radius: 0%;
        }
    }
    
    @keyframes boxFillOut{
        0%{
            width: 100%;
            border-radius: 0;
        }
        100%{
            width: 100%;
            border-radius: 100%;
        }
    }

    @keyframes boxFillOut2{
        0%{
            width: 100%;
            left: -50%;
            border-radius: 0;
        }
        100%{
            width: 100%;
            left: 0%;
            border-radius: 100%;
        }
    }

    .standardInput{
        @apply bg-opacity-30 text-sm rounded-sm w-full p-2 bg-neutral-700 border-0 border-b-[2px] border-neutral-600 text-white placeholder:text-neutral-600 outline-none focus:border-b-blue-600 duration-100 invalid:border-b-red-600 hover:invalid:border-b-red-600
    }

    .standardInput.reduced{
        @apply bg-opacity-30 text-xs rounded-sm w-full p-1 bg-neutral-700 border-0 border-b-[2px] border-neutral-600 text-white placeholder:text-neutral-600 outline-none focus:border-b-blue-600 duration-100 invalid:border-b-red-600 hover:invalid:border-b-red-600
    }

            /* width */
            ::-webkit-scrollbar {
    width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        @apply bg-transparent pt-8
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
    @apply bg-black bg-opacity-20 h-1/4
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
    background: #555;
    }

    .iconEdit::-webkit-calendar-picker-indicator {
        filter: invert(1);
    }

    .fadeCheckbox {
        @apply appearance-none bg-transparent border-[2px] border-neutral-700 w-5 h-5 rounded-sm relative duration-100 hover:cursor-pointer
    }

    .fadeCheckbox:checked {
        @apply bg-blue-600
    }

    .fadeCheckbox::before{
        @apply bg-blue-700 bg-opacity-0 duration-100
    }

    .fadeCheckbox:not(:checked):not(:focus)::before{
        @apply hover:bg-opacity-20
    }

    .fadeCheckbox:checked::before{
        @apply hover:bg-opacity-10
    }

    .fadeCheckbox::before{
        content: '';
        position: absolute;
        width: 200%;
        height: 200%;
        top: -50%;
        left: -50%;
        z-index: -1;
        border-radius: 50%;
    }


    .fadeCheckbox:checked::after{
        position: absolute;
        width: 100%;
        height: 100%;
        content: url('../../../lib/images/check.svg');
        filter: invert(100);
        top: 0;
        transform: translateY(-2px);
    }


    .standardInput.inputDisabled{
        opacity:0.2;
    }

    .standardInput.inputDisabled:hover{
        cursor: not-allowed;
    }
</style>