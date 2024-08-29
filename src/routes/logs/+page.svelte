<Nav ver="back" class="w-full"/>
<div class="flex flex-col items-center h-screen justify-start">
    <div class="h-full max-w-[1000px] w-full flex flex-col">
        {#if currentPage === 'home'}
        <div class="flex flex-col items-center border-[1px] rounded-md border-neutral-700 sm:ml-8 ml-4 mr-4 sm:mr-8 h-full sm:pt-6 sm:pb-6 pl-2 pr-2 pb-2">
            <h2 class="text-white text-3xl font-semibold mt-4">Add Records</h2>
            <h3 class="text-neutral-400 italic mt-2">Please select an option</h3>
            <div class="border-[1px] rounded-md border-neutral-700 w-full sm:p-4 p-2 mt-4 sm:mt-8 flex justify-center gap-2 h-full flex-col max-w-[600px]">
                <div class="border-[0px] rounded-md border-neutral-700 w-full h-full flex gap-2">
                    <button class="fadeButton blue2 w-full" on:click={() => goInnerPage('addJourney')}>Add Journey</button>
                    <button class="fadeButton blue2 w-full" on:click={() => goInnerPage('addLog')}>Add Log</button>
                </div>
                <div class="border-[0px] rounded-md border-neutral-700 w-full h-full flex flex-col gap-2">
                    <button class="fadeButton blue3 h-full" on:click={() => goInnerPage('addLocation')}>Add Location</button>
                    <button class="fadeButton blue3 h-full" on:click={() => goInnerPage('addNote')}>Add Note</button>
                </div>
            </div>
            <!-- <div class="border-[1px] rounded-md border-neutral-700 w-full sm:p-4 p-2 mt-4 flex justify-center gap-2 h-full">
                <div class="border-[1px] rounded-md border-neutral-700 p-2 w-full h-full max-w-[400px] flex flex-col">
                    <button class="bg-green-700 text-white w-full p-1 rounded-sm hover:bg-green-800 h-full pt-2 pb-2">View Logs</button>
                    <button class="bg-green-700 text-white w-full p-1 rounded-sm hover:bg-green-800 h-full pt-2 pb-2 mt-2">View Journeys</button>
                </div>
            </div> -->
        </div>
        {/if}
        
    </div>
</div>
<Footer/>

<script>
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
        @apply bg-blue-900 bg-opacity-50 before:bg-blue-300 before:bg-opacity-10;
    }

    .fadeButton.textWhite{
        @apply text-white
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
        @apply bg-opacity-30 text-sm rounded-sm w-full p-2 bg-neutral-700 border-0 border-b-[2px] border-neutral-600 text-white placeholder:text-neutral-600 outline-none focus:border-b-blue-600 duration-100 invalid:border-b-red-600
    }

    .standardInput.reduced{
        @apply bg-opacity-30 text-xs rounded-sm w-full p-1 bg-neutral-700 border-0 border-b-[2px] border-neutral-600 text-white placeholder:text-neutral-600 outline-none focus:border-b-blue-600 duration-100 invalid:border-b-red-600
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