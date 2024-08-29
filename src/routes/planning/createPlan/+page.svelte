<CustomAlert mode={$alrtMode} active={$alrtAct} text={$alrtTxt} on:close={() => $alrtAct = false} />
<div class="flex flex-col h-screen">
    <Nav ver="back"/>
        <div class="flex flex-col items-center h-full justify-start overflow-y-scroll customScrollbar overflow-x-hidden">
            <div class="max-w-[1000px] w-full flex flex-col h-full">
                <div class="flex flex-col items-center border-[1px] rounded-md border-neutral-700 sm:ml-8 ml-4 mr-2 sm:mr-8 h-auto sm:pt-6 sm:pb-6 pl-4 pr-4 pb-4">
                    {#if currentPG == 'home'}
                        <h2 class="text-white text-xl font-semibold sm:mt-1 mt-3">Create Plan</h2>
                        <div class="border-[1px] border-neutral-700 rounded-md sm:mt-8 mt-4 w-full max-w-[500px] p-4">
                            <h3 class="text-neutral-300 italic text-left mb-2">Title</h3>
                            <input minlength="3" maxlength="20" class="standardInput" bind:value={tripName}>
                            <h3 class="text-neutral-300 italic text-left mt-4">Description</h3>
                            <textarea class="standardInput mt-2 text-xs resize-none" minlength="5" maxlength="175" rows="4"></textarea>
                        </div>
                        <div class="border-[1px] border-neutral-700 rounded-md sm:mt-8 mt-4 w-full max-w-[500px] p-4">
                            <div class="flex gap-2 sm:gap-3 sm:flex-row flex-col">
                                <div>
                                    <h3 class="text-neutral-300 italic text-left mb-1">Start</h3>
                                    <input type="date" class="standardInput ml-auto iconEdit" bind:value={tripStart}>
                                </div>
                                <div>
                                    <h3 class="text-neutral-300 italic text-left mb-1">End</h3>
                                    <input type="date" class="standardInput ml-auto iconEdit" bind:value={tripEnd}>
                                </div>
                            </div>
                        </div>
                        <div class="border-[1px] border-neutral-700 rounded-md sm:mt-8 mt-4 w-full max-w-[500px] p-4">
                            <button class="fadeButton blue w-full p-2" on:click={createPlan}>Create plan</button>
                        </div>
                
                        
                    {/if}
                </div>
            </div>
        </div>
        <Footer/>
    </div>
    
    <script>
        import Nav from '../../../lib/components/Nav.svelte';
        import Footer from '../../../lib/components/Footer.svelte';
        import CustomAlert from '../../../lib/components/Alert.svelte';
        import { writable } from 'svelte/store';
        import { onMount } from 'svelte';
        var plansFromDB = []
        var currentPG = 'home'
        
        var tripName = ''
        var tripStart = ''
        var tripEnd = ''
        
        var alrtTxt  = writable('')
        var alrtAct = writable(false)
        var alrtMode = writable('err')
    
        onMount(() => {
            document.title = 'Planning';
            if(localStorage.getItem('plans')){
                plansFromDB = JSON.parse(localStorage.getItem('plans'))
            }
        });

        function createPlan(){
            if(tripName.length < 3){
                $alrtTxt = 'Please enter a valid name'
                $alrtAct = true
                return
            }
            if(tripStart == '' || tripEnd == ''){
                $alrtTxt = 'Please enter a valid start and end date'
                $alrtAct = true
                return
            }

            var plan = {
                tripID: [...Array(15)].map(() => Math.random().toString(36)[2]).join(''),
                name: tripName,
                start: tripStart,
                end: tripEnd,
                days: []
            }

            if (confirm('Are you sure you want to create this plan?')) {
                plansFromDB.push(plan);
                $alrtMode = 'success';
                $alrtTxt = 'Plan created successfully';
                $alrtAct = true;
                tripName = '';
                tripStart = '';
                tripEnd = '';
                localStorage.setItem('planning', JSON.stringify(plansFromDB));
                window.location.href = '/planning';

            }
            
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
        @apply bg-blue-700  before:bg-blue-300 before:bg-opacity-20 text-white
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