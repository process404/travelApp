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
        import '../../../global.css'
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
                tripID: [...Array(15)].map(() => {
                    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
                    return characters[Math.floor(Math.random() * characters.length)];
                }).join(''),
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
    