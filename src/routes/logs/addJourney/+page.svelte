<CustomAlert mode={$alrtMode} active={$alrtAct} text={$alrtTxt} on:close={() => $alrtAct = false} />
<div style="width: 100vw; display: flex; flex-direction: column" id="app">
    <Nav ver="back"/>
        <div class="flex flex-col items-center h-full justify-start overflow-y-scroll customScrollbar overflow-x-hidden">
            <div class="max-w-[1000px] w-full flex flex-col">
                <div class="flex flex-col items-center border-[1px] rounded-md border-neutral-700 sm:ml-8 ml-4 mr-2 sm:mr-4 h-full sm:pt-6 sm:pb-6 pl-4 pr-4 pb-4">
                    <h2 class="text-white text-xl font-semibold sm:mt-1 mt-3">Add Journey</h2>
                    <div class="border-[1px] border-neutral-700 rounded-md sm:mt-8 mt-4 w-full max-w-[500px] p-4">
                        <div class="flex items-center justify-center gap-3 mr-1 flex-col mb-3 sm:mb-1">
                            <div class="w-full">
                                <!--TO-DO - country selector ?-->
                                <h3 class="text-neutral-300 italic mb-2">From</h3>
                                {#if loadStns}
                                    <div class="w-full flex items-center justify-center border-neutral-700 border-[1px] rounded-sm">
                                        <span class="loader" style="margin-top:0.5rem; margin-bottom: 0.5rem"></span>
                                    </div>
                                {:else}
                                    <PromptField ds={locations} on:select={selectFrom} bind:value={from} disabled={$noLocation} ver="loc" bind:presetC={fromC} adDs={allStns}/>
                                {/if}
                            </div>
                            <div class="w-full">
                                <h3 class="text-neutral-300 italic mb-2">To</h3>
                                {#if loadStns}
                                    <div class="w-full flex items-center justify-center border-neutral-700 border-[1px] rounded-sm">
                                        <span class="loader" style="margin-top:0.5rem; margin-bottom: 0.5rem"></span>
                                    </div>
                                {:else}
                                    <PromptField ds={locations} on:select={selectTo} bind:value={to} disabled={$noLocation} ver="loc" bind:presetC={toC} adDs={allStns}/>
                                {/if}
                
                            </div>
                            <div class="border-[1px] border-neutral-700 rounded-md p-2 mt-6 bg-neutral-800 bg-opacity-30 hover:border-neutral-400 duration-50 w-full">
                                <button class="flex justify-between w-full items-center" on:click={() => viaPointsDropdown = !viaPointsDropdown}>
                                    <h2 class="dark:text-neutral-300">Via</h2>
                                    {#if viaPointsDropdown}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-short fill-white w-7 h-7" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5"/>
                                        </svg>
                                    {:else}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-short fill-white w-7 h-7 rotate-180" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5"/>
                                        </svg>
                                    {/if}
                                </button>
                                {#if viaPointsDropdown}
                                    <hr class="w-full mt-2 mb-2 border-neutral-700">
                                    <div class="flex gap-4 flex-col mt-4 items-center justify-center mb-2">
                                        <div class="flex flex-col items-center gap-2">
                                            {#if !from}
                                                <h3 class="text-neutral-300 italic w-full text-center">None selected</h3>
                                            {:else}
                                                {#if fromC}
                                                    {#if isMobileDevice}
                                                        <h3 class="text-neutral-300 w-full text-center">{from} ({getFlag(fromC)})</h3>
                                                    {:else}
                                                        <h3 class="text-neutral-300 w-full text-center flex gap-2 items-center">{from} <span><img class="w-4 h-4" alt={fromC} src={`https://flagsapi.com/${fromC}/flat/64.png`}></span></h3>
                                                    {/if}
                                                {:else}
                                                    <h3 class="text-neutral-300 w-full text-center">{from} (None selected)</h3>
                                                {/if}
                                            {/if}        
                                            <span class="block w-[1px] h-[8px] bg-neutral-300"></span>
                                        </div>
                                        {#if viaPoints.length == 0 && !viaPointsAdd}
                                            <button class="button" on:click={() => viaPointsAdd = true}>Add via point</button>
                                        {:else if viaPointsAdd && !viaPoints.length > 0}
                                            <div class="max-w-[65%] w-full">
                                                <PromptField ds={locations} on:select={selectVia} bind:value={via} ver="loc" adDs={allStns} bind:presetC={viaC} red={true}/>
                                            </div>
                                        {:else if viaPointsAdd && viaPoints.length > 0}
                                            {#each viaPoints as point}
                                                <button class="flex gap-2 p-2 border-[1px] border-neutral-700 rounded-md hover:border-red-800 duration-200 button text wider" on:click={removeVia(point)}>
                                                    {#if isMobileDevice}
                                                        <h3 class="text-neutral-300 w-full text-center">{point.name} ({getFlag(point.country)})</h3>
                                                    {:else}
                                                        <h3 class="text-neutral-300 w-full text-center flex gap-2 items-center">{point.name} <span><img class="w-4 h-4" alt={point.country} src={`https://flagsapi.com/${point.country}/flat/64.png`}></span></h3>
                                                    {/if}
            
                                                    <!-- <button class="button red"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                                    </svg></button> -->
                                                </button>
                                            
                                                {/each}
                                                <div class="max-w-[65%] w-full">
                                                    <PromptField ds={locations} on:select={selectVia} bind:value={via} ver="loc" adDs={allStns} bind:presetC={viaC} red={true}/>
                                                </div>
                                        {:else if !viaPointsAdd && viaPoints.length > 0}
                                            {#each viaPoints as point}
                                                <button class="flex gap-2 p-2 border-[1px] border-neutral-700 rounded-md hover:border-red-800 duration-200 button text wider" on:click={removeVia(point)}>
                                                    {#if isMobileDevice}
                                                        <h3 class="text-neutral-300 w-full text-center italic">{point.name} ({getFlag(point.country)})</h3>
                                                    {:else}
                                                        <h3 class="text-neutral-300 w-full text-center flex gap-2 items-center italic">{point.name} <span><img class="w-4 h-4" alt={point.country} src={`https://flagsapi.com/${point.country}/flat/64.png`}></span></h3>
                                                    {/if}
            
                                                    <!-- <button class="button red"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                                      </svg></button> -->
                                                </button>
                                            {/each}
                                            <span class="block w-[1px] h-[8px] bg-neutral-300"></span>
                                            <button class="button" on:click={() => {viaPointsAdd = true; via = ''}}>Add via point</button>
                                        {/if}
                                        <div class="flex flex-col items-center gap-2">
                                            <span class="block w-[1px] h-[8px] bg-neutral-300"></span>
                                            {#if !to}
                                                <h3 class="text-neutral-300 italic w-full text-center">None selected</h3>
                                            {:else}
                                                {#if toC}
                                                    {#if isMobileDevice}
                                                        <h3 class="text-neutral-300 w-full text-center italic">{to} ({getFlag(toC)})</h3>
                                                    {:else}
                                                        <h3 class="text-neutral-300 w-full text-center flex gap-2 items-center italic">{to} <span><img class="w-4 h-4" alt={toC} src={`https://flagsapi.com/${toC}/flat/64.png`}></span></h3>
                                                    {/if}
                                                {:else}
                                                    <h3 class="text-neutral-300 w-full text-center">{to} (None selected)</h3>
                                                {/if}
                                            {/if}                            
                                        </div>
                                    </div>
                                {/if}
                            </div>
                        </div>
                        <!-- <div class="flex gap-4"> -->
                            <!-- <div class="mt-3 flex gap-2 items-center">
                                <input type="checkbox" class="checkbox blue" name="no_location" bind:checked={$noLocation}>
                                <label for="no_location" class="text-neutral-500 italic  text-xs">No location</label>
                            </div> -->
                            <!-- <div class="mt-3 flex gap-2 items-center">
                                <input type="checkbox" class="checkbox blue" name="no_location" bind:checked={$preciseLocation} on:click={locationToggle}>
                                <label for="no_location" class="text-neutral-500 italic  text-xs">Include device location</label>
                            </div> -->
        
                        <!-- </div> -->
                    </div>
                    <div class="border-[1px] border-neutral-700 rounded-md sm:mt-8 mt-4 w-full max-w-[500px] p-4">
                        <div class="flex gap-4">
                            <div class="w-full">
                                <h3 class="text-neutral-300 italic">Departure</h3>
                                <div class="flex gap-1 sm:gap-3 flex-col sm:flex-row">
                                    <input type="date" class="input blue mt-2 iconEdit w-full" style="font-size: 0.75rem" bind:value={inputDateStart}>
                                    <input type="time" class="input blue mt-2 iconEdit w-full" style="font-size: 0.75rem" bind:value={inputTimeStart}>
                                </div>
                            </div>
                            <div class="w-full">
                                <h3 class="text-neutral-300 italic">Arrival</h3>
                                <div class="flex gap-1 sm:gap-3 flex-col sm:flex-row">
                                    <input type="date" class="input blue mt-2 iconEdit w-full" style="font-size: 0.75rem" bind:value={inputDateEnd}>
                                    <input type="time" class="input blue mt-2 iconEdit w-full" style="font-size: 0.75rem" bind:value={inputTimeEnd}>
                                </div>
                            </div>
                        </div>
                        <div class="border-[1px] border-neutral-700 rounded-md p-2 mt-6 bg-neutral-800 bg-opacity-30 hover:border-neutral-400 duration-50">
                            <button class="flex justify-between w-full items-center" on:click={() => extraJourneyDropdown = !extraJourneyDropdown}>
                                <h2 class="dark:text-neutral-300">Extra Details</h2>
                                {#if extraJourneyDropdown}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-short fill-white w-7 h-7" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5"/>
                                    </svg>
                                {:else}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-short fill-white w-7 h-7 rotate-180" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5"/>
                                    </svg>
                                {/if}
                            </button>
                            {#if extraJourneyDropdown}
                                <hr class="w-full mt-2 mb-2 border-neutral-700">
                                <div class="flex gap-4 sm:flex-row flex-col mt-3">
                                    <div class="w-full">
                                        <h3 class="text-neutral-300 italic mb-2  text-sm">Operator</h3>
                                        <PromptField red="true" ds={operators} bind:value={operator} on:select={selectOperator}/>
                                    </div>
                                    <div class="flex gap-4">
                                        <div class="w-full">
                                            <h3 class="text-neutral-300 italic mb-2  text-sm ">Train Code</h3>
                                            <input class="input blue w-full reduced h-auto"/>
                                        </div>
                                        <div class="w-full sm:hidden">
                                            <h3 class="text-neutral-300 italic mb-2 text-sm">Delay (<b>HH:MM</b>)</h3>
                                            <div class="flex gap-1">
                                                <select class="input reduced iconEdit w-full" bind:value={delayHours}>
                                                    {#each Array.from({ length: 13 }, (_, i) => i) as hour}
                                                        <option>{hour < 10 ? `0${hour}` : hour}</option>
                                                    {/each}
                                                </select>
                                                <select class="input reduced iconEdit w-full" bind:value={delayMinutes}>
                                                    {#each Array.from({ length: 60 }, (_, i) => i) as minutes}
                                                        <option>{minutes < 10 ? `0${minutes}` : minutes}</option>
                                                    {/each}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex gap-4 mt-4 mb-3">
                                    <div class="hidden sm:block w-full">
                                        <div class="w-full">
                                            <h3 class="text-neutral-300 italic mb-2 text-sm">Delay (<b>HH:MM</b>)</h3>
                                            <div class="flex gap-1">
                                                <select class="input reduced iconEdit w-full" bind:value={delayHours}>
                                                    {#each Array.from({ length: 13 }, (_, i) => i) as hour}
                                                        <option>{hour < 10 ? `0${hour}` : hour}</option>
                                                    {/each}
                                                </select>
                                                <select class="input reduced iconEdit w-full" bind:value={delayMinutes}>
                                                    {#each Array.from({ length: 60 }, (_, i) => i) as minutes}
                                                        <option>{minutes < 10 ? `0${minutes}` : minutes}</option>
                                                    {/each}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="w-full">
                                        <h3 class="text-neutral-300 italic mb-2 text-sm">Reason</h3>
                                        <select class="input reduced iconEdit w-full" bind:value={journeyReason}>
                                            <option></option>
                                            <option>Leisure</option>
                                            <option>Work</option>
                                            <option>Commuting</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="w-full mt-4 mb-3">
                                    <h3 class="text-neutral-300 italic mb-2 text-sm">Facilities</h3>
                                    <div class="flex">

                                        <button class="button text pureSVG" class:blue={journeyFirstClass} on:click={() => journeyFirstClass = !journeyFirstClass}>{#if !journeyFirstClass}<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-1-square opacity-50" viewBox="0 0 16 16">
                                            <path d="M9.283 4.002V12H7.971V5.338h-.065L6.072 6.656V5.385l1.899-1.383z"/>
                                            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
                                          </svg>{:else} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-1-square" viewBox="0 0 16 16">
                                            <path d="M9.283 4.002V12H7.971V5.338h-.065L6.072 6.656V5.385l1.899-1.383z"/>
                                            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
                                          </svg>{/if}</button>
                                        
                                        <button class="button text pureSVG" class:blue={journeyWifi} on:click={() => journeyWifi = !journeyWifi}>{#if !journeyWifi}<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-wifi-off opacity-50" viewBox="0 0 16 16">
                                        <path d="M10.706 3.294A12.6 12.6 0 0 0 8 3C5.259 3 2.723 3.882.663 5.379a.485.485 0 0 0-.048.736.52.52 0 0 0 .668.05A11.45 11.45 0 0 1 8 4q.946 0 1.852.148zM8 6c-1.905 0-3.68.56-5.166 1.526a.48.48 0 0 0-.063.745.525.525 0 0 0 .652.065 8.45 8.45 0 0 1 3.51-1.27zm2.596 1.404.785-.785q.947.362 1.785.907a.482.482 0 0 1 .063.745.525.525 0 0 1-.652.065 8.5 8.5 0 0 0-1.98-.932zM8 10l.933-.933a6.5 6.5 0 0 1 2.013.637c.285.145.326.524.1.75l-.015.015a.53.53 0 0 1-.611.09A5.5 5.5 0 0 0 8 10m4.905-4.905.747-.747q.886.451 1.685 1.03a.485.485 0 0 1 .047.737.52.52 0 0 1-.668.05 11.5 11.5 0 0 0-1.811-1.07M9.02 11.78c.238.14.236.464.04.66l-.707.706a.5.5 0 0 1-.707 0l-.707-.707c-.195-.195-.197-.518.04-.66A2 2 0 0 1 8 11.5c.374 0 .723.102 1.021.28zm4.355-9.905a.53.53 0 0 1 .75.75l-10.75 10.75a.53.53 0 0 1-.75-.75z"/>
                                        </svg>{:else} <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-wifi opacity-100" viewBox="0 0 16 16">
                                            <path d="M15.384 6.115a.485.485 0 0 0-.047-.736A12.44 12.44 0 0 0 8 3C5.259 3 2.723 3.882.663 5.379a.485.485 0 0 0-.048.736.52.52 0 0 0 .668.05A11.45 11.45 0 0 1 8 4c2.507 0 4.827.802 6.716 2.164.205.148.49.13.668-.049"/>
                                            <path d="M13.229 8.271a.482.482 0 0 0-.063-.745A9.46 9.46 0 0 0 8 6c-1.905 0-3.68.56-5.166 1.526a.48.48 0 0 0-.063.745.525.525 0 0 0 .652.065A8.46 8.46 0 0 1 8 7a8.46 8.46 0 0 1 4.576 1.336c.206.132.48.108.653-.065m-2.183 2.183c.226-.226.185-.605-.1-.75A6.5 6.5 0 0 0 8 9c-1.06 0-2.062.254-2.946.704-.285.145-.326.524-.1.75l.015.015c.16.16.407.19.611.09A5.5 5.5 0 0 1 8 10c.868 0 1.69.201 2.42.56.203.1.45.07.61-.091zM9.06 12.44c.196-.196.198-.52-.04-.66A2 2 0 0 0 8 11.5a2 2 0 0 0-1.02.28c-.238.14-.236.464-.04.66l.706.706a.5.5 0 0 0 .707 0l.707-.707z"/>
                                          </svg>{/if}</button>

                                          <button class="button text pureSVG" class:blue={journeyCycles} on:click={() => journeyCycles = !journeyCycles}>{#if !journeyCycles}<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-bicycle opacity-50" viewBox="0 0 16 16">
                                            <path d="M4 4.5a.5.5 0 0 1 .5-.5H6a.5.5 0 0 1 0 1v.5h4.14l.386-1.158A.5.5 0 0 1 11 4h1a.5.5 0 0 1 0 1h-.64l-.311.935.807 1.29a3 3 0 1 1-.848.53l-.508-.812-2.076 3.322A.5.5 0 0 1 8 10.5H5.959a3 3 0 1 1-1.815-3.274L5 5.856V5h-.5a.5.5 0 0 1-.5-.5m1.5 2.443-.508.814c.5.444.85 1.054.967 1.743h1.139zM8 9.057 9.598 6.5H6.402zM4.937 9.5a2 2 0 0 0-.487-.877l-.548.877zM3.603 8.092A2 2 0 1 0 4.937 10.5H3a.5.5 0 0 1-.424-.765zm7.947.53a2 2 0 1 0 .848-.53l1.026 1.643a.5.5 0 1 1-.848.53z"/>
                                          </svg>{:else} <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-bicycle" viewBox="0 0 16 16">
                                            <path d="M4 4.5a.5.5 0 0 1 .5-.5H6a.5.5 0 0 1 0 1v.5h4.14l.386-1.158A.5.5 0 0 1 11 4h1a.5.5 0 0 1 0 1h-.64l-.311.935.807 1.29a3 3 0 1 1-.848.53l-.508-.812-2.076 3.322A.5.5 0 0 1 8 10.5H5.959a3 3 0 1 1-1.815-3.274L5 5.856V5h-.5a.5.5 0 0 1-.5-.5m1.5 2.443-.508.814c.5.444.85 1.054.967 1.743h1.139zM8 9.057 9.598 6.5H6.402zM4.937 9.5a2 2 0 0 0-.487-.877l-.548.877zM3.603 8.092A2 2 0 1 0 4.937 10.5H3a.5.5 0 0 1-.424-.765zm7.947.53a2 2 0 1 0 .848-.53l1.026 1.643a.5.5 0 1 1-.848.53z"/>
                                          </svg>{/if}</button>

                                          <button class="button text pureSVG" class:blue={journeyRestauraunt} on:click={() => journeyRestauraunt = !journeyRestauraunt}>{#if !journeyRestauraunt}<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cup-hot opacity-50" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M.5 6a.5.5 0 0 0-.488.608l1.652 7.434A2.5 2.5 0 0 0 4.104 16h5.792a2.5 2.5 0 0 0 2.44-1.958l.131-.59a3 3 0 0 0 1.3-5.854l.221-.99A.5.5 0 0 0 13.5 6zM13 12.5a2 2 0 0 1-.316-.025l.867-3.898A2.001 2.001 0 0 1 13 12.5M2.64 13.825 1.123 7h11.754l-1.517 6.825A1.5 1.5 0 0 1 9.896 15H4.104a1.5 1.5 0 0 1-1.464-1.175"/>
                                            <path d="m4.4.8-.003.004-.014.019a4 4 0 0 0-.204.31 2 2 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.6.6 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3 3 0 0 1-.202.388 5 5 0 0 1-.253.382l-.018.025-.005.008-.002.002A.5.5 0 0 1 3.6 4.2l.003-.004.014-.019a4 4 0 0 0 .204-.31 2 2 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.6.6 0 0 0-.09-.252A4 4 0 0 0 3.6 2.8l-.01-.012a5 5 0 0 1-.37-.543A1.53 1.53 0 0 1 3 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a6 6 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 4.4.8m3 0-.003.004-.014.019a4 4 0 0 0-.204.31 2 2 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.6.6 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3 3 0 0 1-.202.388 5 5 0 0 1-.253.382l-.018.025-.005.008-.002.002A.5.5 0 0 1 6.6 4.2l.003-.004.014-.019a4 4 0 0 0 .204-.31 2 2 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.6.6 0 0 0-.09-.252A4 4 0 0 0 6.6 2.8l-.01-.012a5 5 0 0 1-.37-.543A1.53 1.53 0 0 1 6 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a6 6 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 7.4.8m3 0-.003.004-.014.019a4 4 0 0 0-.204.31 2 2 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.6.6 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3 3 0 0 1-.202.388 5 5 0 0 1-.252.382l-.019.025-.005.008-.002.002A.5.5 0 0 1 9.6 4.2l.003-.004.014-.019a4 4 0 0 0 .204-.31 2 2 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.6.6 0 0 0-.09-.252A4 4 0 0 0 9.6 2.8l-.01-.012a5 5 0 0 1-.37-.543A1.53 1.53 0 0 1 9 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a6 6 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 10.4.8"/>
                                          </svg>{:else} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cup-hot" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M.5 6a.5.5 0 0 0-.488.608l1.652 7.434A2.5 2.5 0 0 0 4.104 16h5.792a2.5 2.5 0 0 0 2.44-1.958l.131-.59a3 3 0 0 0 1.3-5.854l.221-.99A.5.5 0 0 0 13.5 6zM13 12.5a2 2 0 0 1-.316-.025l.867-3.898A2.001 2.001 0 0 1 13 12.5M2.64 13.825 1.123 7h11.754l-1.517 6.825A1.5 1.5 0 0 1 9.896 15H4.104a1.5 1.5 0 0 1-1.464-1.175"/>
                                            <path d="m4.4.8-.003.004-.014.019a4 4 0 0 0-.204.31 2 2 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.6.6 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3 3 0 0 1-.202.388 5 5 0 0 1-.253.382l-.018.025-.005.008-.002.002A.5.5 0 0 1 3.6 4.2l.003-.004.014-.019a4 4 0 0 0 .204-.31 2 2 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.6.6 0 0 0-.09-.252A4 4 0 0 0 3.6 2.8l-.01-.012a5 5 0 0 1-.37-.543A1.53 1.53 0 0 1 3 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a6 6 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 4.4.8m3 0-.003.004-.014.019a4 4 0 0 0-.204.31 2 2 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.6.6 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3 3 0 0 1-.202.388 5 5 0 0 1-.253.382l-.018.025-.005.008-.002.002A.5.5 0 0 1 6.6 4.2l.003-.004.014-.019a4 4 0 0 0 .204-.31 2 2 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.6.6 0 0 0-.09-.252A4 4 0 0 0 6.6 2.8l-.01-.012a5 5 0 0 1-.37-.543A1.53 1.53 0 0 1 6 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a6 6 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 7.4.8m3 0-.003.004-.014.019a4 4 0 0 0-.204.31 2 2 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.6.6 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3 3 0 0 1-.202.388 5 5 0 0 1-.252.382l-.019.025-.005.008-.002.002A.5.5 0 0 1 9.6 4.2l.003-.004.014-.019a4 4 0 0 0 .204-.31 2 2 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.6.6 0 0 0-.09-.252A4 4 0 0 0 9.6 2.8l-.01-.012a5 5 0 0 1-.37-.543A1.53 1.53 0 0 1 9 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a6 6 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 10.4.8"/>
                                          </svg>{/if}</button>

                                          <button class="button text pureSVG" class:blue={journeySleeper} on:click={() => journeySleeper = !journeySleeper}>{#if !journeySleeper}<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon-stars opacity-50" viewBox="0 0 16 16">
                                            <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286"/>
                                            <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.73 1.73 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.73 1.73 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.73 1.73 0 0 0 1.097-1.097zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z"/>
                                          </svg>{:else} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon-stars" viewBox="0 0 16 16">
                                            <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286"/>
                                            <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.73 1.73 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.73 1.73 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.73 1.73 0 0 0 1.097-1.097zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z"/>
                                          </svg>{/if}</button>
                                        
                                    </div>
                                </div>

                                <div class="w-full mt-4 mb-3">
                                    <h3 class="text-neutral-300 italic mb-2 text-sm">Tags</h3>
                                    <div class="input blue min-h-[70px] flex gap-2 flex-wrap items-start justify-start" on:click={() => document.getElementById("focusJourneyTagInput").focus()} role="presentation">
                                        {#each journeyTags as tag}
                                            <button class="button blue2 hover-red" on:click={removeTag(tag)}>
                                                {tag}
                                            </button>
                                        {/each}
                                        <input class="focus:border-white border-[1px] border-transparent bg-transparent w-auto" id="focusJourneyTagInput" on:keydown={addTag} bind:value={tagInput}/>
                                    </div>
                                </div>

                                <div class="w-full mt-4 mb-3">
                                    <h3 class="text-neutral-300 italic mb-2 text-sm">Notes</h3>
                                    <textarea class="input blue resize-none w-full min-h-[70px]"></textarea>
                                </div>
                            {/if}
                        </div>
                    </div>




                    <!-- more journey info needs to go here-->





                    <div class="border-[1px] border-neutral-700 rounded-md sm:mt-8 mt-4 w-full max-w-[500px] p-4">
                        <h3 class="text-neutral-300 italic">Numbers</h3>
                        <div class="mt-2 flex gap-2 items-center flex-wrap">
                            <div class="flex  mb-2 rounded-md border-neutral-800 gap-1 w-full">
                                <input placeholder="Enter Number" class="input blue w-full" on:keydown={handleKeyPressNumber} bind:value={inputNumber}>
                                <!-- <button class="fadeButton p-1" on:click={() => typeDropdown = !typeDropdown}>
                                {#if !typeDropdown}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-short w-5 h-5" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4"/>
                                </svg>
                                {/if}
                                {#if typeDropdown}
                                
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-short w-5 h-5" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5"/>
                                </svg>
                                {/if}
                                </button> -->
                                <button class="button p-[0.2rem]" on:click={() => {addNumber()}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus w-5 h-5" viewBox="0 0 16 16">
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                                </svg></button>
                            </div>
                            {#if logNumbers.length != 0}
                                <ul class="border-[1px] border-neutral-800 w-full h-auto  p-2 flex md:flex-wrap gap-1 flex-nowrap flex-col md:flex-row min-h-[47px]">
                                    {#each $logNumbers as veh}
                                        <li class="relative inline-block p-0 m-0 h-6">
                                            <button on:click={() => {veh['dropdown'] = !veh['dropdown']}} class=" bg-blue-800 button blue2 textWhite pl-2 pr-2 sm s-padding">{veh['name']} ({veh['type']} - {veh['variant']})</button>
                                            {#if veh['dropdown']}
                                                <button class="z-30 fixed w-screen h-screen hover:cursor-defaulleft-0 top-0" on:click={closeDropdown(veh)}></button>
                                            {/if}
                                            
                                            {#if veh['dropdown']}
                                            <div class="absolute z-40 left-0 top-100 bg-[rgb(15,15,15)] p-2 w-auto min-h-8 rounded-md rounded-t-none border-[1px] border-neutral-800 min-w-[75px] max-h-[200px] overflow-y-scroll sm:max-h-[300px] pr-0 ">
                                                {#if veh['dropdown_2'] == ''}
                                                <div class="flex gap-2 min-w-[180px]">
                                                    <button class="sm button red pl-2 pr-2 w-full" on:click={removeLog(veh['id'])}>Remove</button>
                                                    <button class="sm button blue pl-2 pr-2 w-full" on:click={() => veh['dropdown_2'] = "section"}>Edit type</button>
                                                </div>
                                                {/if}

                                                {#if veh.dropdown_2 === "section"}
                                                <h3 class="text-white text-sm">Select Vehicle Type</h3>
                                                <div class="min-w-[200px] w-full flex flex-wrap gap-1 mt-1">
                                                    <button class="button sm blue2 textWhite pl-2 pr-2" on:click={() => inputVType("Train", veh)}>Train</button>
                                                    <button class="button sm blue2 textWhite pl-2 pr-2" on:click={() => inputVType("Bus / Coach", veh)}>Bus / Coach</button>
                                                    <button class="button sm blue2 textWhite pl-2 pr-2" on:click={() => inputVType("Others", veh)}>Other</button>
                                                </div>
                                                {/if}

                                                {#if veh.dropdown_2 === "area"}
                                                    <h3 class="text-white text-sm">Select Area</h3>
                                                    <div class="min-w-[200px] w-full flex flex-wrap gap-1 mt-1">
                                                        {#each logAreas as area}
                                                            <button class="button sm blue2 textWhite pl-2 pr-2" on:click={() => inputAreaBtn(area, veh)}>{area.area}</button>
                                                        {/each}
                                                    </div>
                                                {/if}
                                                {#if veh.dropdown_2 === "type"}
                                                    <h3 class="text-white text-sm">Select Type</h3>
                                                    <div class="min-w-[200px] w-full flex flex-wrap gap-1 mt-1">
                                                        {#if veh['vehicletype'] == 'Train'}
                                                            {#each $inputArea.trainTypes as type}
                                                                <button class="button sm blue2 textWhite pl-2 pr-2" on:click={() => inputType(type, veh)}>{type.name}</button>
                                                            {/each}
                                                        {:else if veh['vehicletype'] == "Bus / Coach"}
                                                            {#each $inputArea.busTypes as type}
                                                                <button class="button sm blue2 textWhite pl-2 pr-2" on:click={() => inputType(type, veh)}>{type.name}</button>
                                                            {/each}
                                                        {:else if veh['vehicletype'] == "Others"}
                                                            {#each $inputArea.otherTypes as type}
                                                                <button class="button sm blue2 textWhite pl-2 pr-2" on:click={() => inputType(type, veh)}>{type.name}</button>
                                                            {/each}
                                                        {/if}
                                                    </div>
                                                {/if}
                                                {#if veh.dropdown_2 === "variant"}
                                                    <h3 class="text-white text-sm">Select Variant</h3>
                                                    <div class="min-w-[200px] w-full flex flex-wrap gap-1 mt-1  sm:min-w-[450px]">
                                                        {#each $inputVariant as variant}
                                                            <button class="button sm blue2 textWhite pl-2 pr-2" on:click={() => inputVariantBtn(variant, veh)}>{variant.name}</button>
                                                        {/each}
                                                    </div>
                                                {/if}
                                            </div>
                                            {/if}
                                        </li>
                                    {/each}
                                </ul>
                            {/if}
                        </div>
                    </div>
                    <div class="border-[1px] border-neutral-700 rounded-md sm:mt-16 mt-8 w-full max-w-[500px] p-4">
                    <button class="button blue w-full p-2 text-sm x-padding" on:click={confirmLog}>Submit Log</button>
                    </div>
                </div>
            </div>
        </div>
    <Footer/>
</div>

<script>
    // TO-DO
    // Add VIA points for journey (as the app will not be fetching timetable data unless a way is found with minimal / no api usage)
    // Start / End Date AND time
    // Select Operator
    // Add fields such as class, ticket costs, delay, train code, leisure / commute, tags (wifi, dining car, sleeper train, cycling)
    



    import { onMount, tick } from 'svelte';
    import Nav from '../../../lib/components/Nav.svelte';
    import Footer from '../../../lib/components/Footer.svelte';
    import CustomAlert from '../../../lib/components/Alert.svelte';
    import '../../../global.css'
    import PromptField from '../../../lib/components/PromptField.svelte';

    import '../../siteDB.js'
    import { writePlanningData, writeLocationsData, writeJourneysData, writeLogsData, getPlanningData, getLocationsData, getJourneysData, getLogsData } from '../../siteDB';
    
    import operators from '../../../db/operators.json';
    
    import { get, writable } from 'svelte/store';
    var combinedLocations = null;
    var locationSuggestions = []
    var logNumbers = writable([])
    var dbWriteable = writable([])

    var typeDropdown = false;
    var inputNumber = ''
    var inputArea = writable([])
    var inputVariant = writable([])
    var inputDateStart = ''
    var inputTimeStart = ''
    var inputDateEnd = ''
    var inputTimeEnd = ''
    var preciseLocation = writable(false)
    var preciseLat;
    var preciseLon;
    var noLocation = writable(false);
    var id = 0
    var toC = ''
    var fromC = ''
    var delayMinutes;
    var delayHours; 
    var operator;
    var journeyReason = ''

    function selectOperator(o){
        operator = o.detail.text.name;
    }
    
    var alrtTxt  = writable('')
    var alrtAct = writable(false)
    var alrtMode = writable('err')

    var db;
    import additionalStns from '../../../db/additionalStations.json'
    import { tl_getAllData, tl_putData } from '../../tl_stationsDB';
	import { add } from 'dexie';
    var logAreas = []
    dbWriteable.set(db)

    var from = ''
    var to = ''
    var fromId = null;
    var toId = null;
    let locations = ''

    var extraJourneyDropdown = false;
    var viaPointsDropdown = false;
    var viaPointsAdd = false;
    var viaPoints = []
    var addViaPoint = ''
    var viaC = ''
    var via = ''
    var journeyWifi = false;
    var journeyFirstClass = false;
    var journeyCycles = false;
    var journeyRestauraunt = false;
    var journeySleeper = false;
    var journeyTags = ["test tag"]
    var existingTags = []
    var journeyNotes = ''

    function selectVia(o) {
        via = o.detail.text.name;
        viaPoints.push(o.detail.text);
        viaPointsAdd = false;
        // console.log("select", via);
    }

    async function getTagsFromJourneys(){
        let journeys = await getJourneysData();
        if(journeys != null){
            const parsedJourneys = JSON.parse(journeys);
            parsedJourneys.forEach(journey => {
                if(journey.tags){
                    journey.tags.forEach(tag => {
                        if(!existingTags.includes(tag)){
                            existingTags.push(tag);
                        }
                    })
                    journeyTags.concat(existingTags)
                }
            });
        }
    }
    
    let allStns = null
    let loadStns = true;
    onMount(async () => {
        db = await import ('../../../db/vehicles.json');
        db = module.default
        locations = await getLocationsData();
        getTagsFromJourneys();
        if (locations != null) {
            locations = locations.concat(additionalStns);
        }else{
            locations = additionalStns;
        }

        if (typeof window !== 'undefined') {
            const settings = JSON.parse(localStorage.getItem('settings'));
            if (settings && settings.dbStn) {
                // Check if stations are already cached
                const cachedStations = await tl_getAllData();
                if (cachedStations.length > 0) {
                    allStns = cachedStations[0].data;
                    loadStns = false;
                } else {
                    // Use a web worker to fetch stations
                    const worker = new Worker(new URL('../../../stationWorker.js', import.meta.url), { type: 'module' });
                    worker.onmessage = async (event) => {
                        allStns = event.data;
                        await tl_putData(allStns);
                        loadStns = false;
                    };
                    worker.onerror = (error) => {
                        console.error('Error in worker:', error);
                        loadStns = false; 
                    };
                    worker.postMessage('fetchStations');
                }
            } else {
                loadStns = false;
            }
        }
    });


    
    function inputType(type, train) {
        // console.log(type)
        inputVariant.set(type.variants);
        // console.log("variants");
        // console.log(inputVariant);
    
        logNumbers.update(numbers => {
            return numbers.map(t => {
                if (t.id === train.id) {
                    t.type = type.name;
                    t.dropdown_2 = 'variant';
                }
                return t;
            });
        });
    }

    async function inputVariantBtn(variant, train) {
        logNumbers.update(numbers => {
            return numbers.map(t => {
                if (t.id === train.id) {
                    t.variant = variant.name
                    t.dropdown_2 = '';
                    t.dropdown = false;
                }
                return t;
            });
        });

        let logs = await getLogsData();
        console.log(logs)
        if (logs) {
            logs.forEach(item => {
                if(item.number === train.name){
                    item.type = train.type;
                    item.variant = train.variant;
                }
            });
            await writeLogsData(logs);
        }
    }
    
    function inputAreaBtn(area, train) {
        inputArea.set(area);
        // Add debugging log to check the structure of logAreas
        console.log('logAreas:', logAreas);
        logNumbers.update(numbers => {
            return numbers.map(t => {
            if (t.id === train.id && t.vehicleType === train.vehicleType) {
                t.area = area;
                t.dropdown_2 = 'type';
            }
            return t;
            });
        });


    }

    function clearLocation(){
        location = ''
        locationSuggestions = []
    }

    async function addNumber(){
        id++;
        // check local storage to see if train is already in logs
        let logs = await getLogsData();
        let vehFound = false
        let veh = null;
        console.log(logs)
        console.log(inputNumber)
        if (logs) {
            vehFound = logs.some(log => log.number === inputNumber);
            console.log(vehFound)
            if (vehFound) {
                veh = logs.find(log => log.number === inputNumber);
            }
        }

        if(vehFound && veh){
            logNumbers.update(numbers => {
                return [...numbers, {"id": id, "vehicletype":"","name":inputNumber,"type":veh.type,"variant":veh.variant, "dropdown":false, "dropdown_2":""}];
            });
        }else{
            logNumbers.update(numbers => {
                return [...numbers, {"id": id, "vehicletype":"","name":inputNumber,"type":"","variant":"", "dropdown":false, "dropdown_2":""}];
            });
        }


        inputNumber = ''
    };
        

    function handleKeyPressNumber(e){
        if(e.key == 'Enter'){
            if(inputNumber != ''){
                addNumber()
            }
        }
    }

    function removeLog(trainId){
        logNumbers.update(numbers => {
            return numbers.filter(number => number.id != trainId);
        });
    }

    function closeDropdown(train){
        logNumbers.update(numbers => {
            return numbers.map(t => {
                if (t.id === train.id) {
                    t.dropdown = false;
                    t.dropdown_2 = '';
                }
                return t;
            });
        });
    }

    async function confirmLog(){
        // stuff here

        var lat;
        var lon;


        if(from === '' || to === ''){
            if(!$noLocation){
            // console.log(from,to)
            customAlertSummon("No location selected", "err");
            return;
            }
        }

        if(inputDateStart == '' || inputDateEnd == ''){
            customAlertSummon("No date selected", "err");
            return;
        }

        if($logNumbers.length == 0){
            customAlertSummon("No numbers added", "err");
            return;
        }

        if(fromC == '' || toC == ''){
            if(!$noLocation){
                customAlertSummon("No country selected", "err");
                return;
            }
        }

        var loc = await getAllLocations()
        if(loc != null){
            const parsedLoc = JSON.parse(loc);
            var found = false;
            for(var locs in parsedLoc){
                if(locs == from){
                    found = true;
                }
            }
            if(found = false){
                parsedLoc.push({"name":from, "country":fromCountry})
            }

            found = false
            for(var locs in parsedLoc){
                if(locs == to){
                    found = true;
                }
            }
            if(found = false){
                parsedLoc.push({"name":to, "country":toCountry})
            } 
        }

        let journeys = await getAllJourneys();
        if (!journeys) {
            journeys = JSON.stringify([]);
        }

        if($preciseLocation && preciseLat && preciseLon){
            logNumbers.subscribe(async numbers => {
            const numbersWithLocation = numbers.map(({ dropdown, dropdown_2, id, ...train }) => ({
                ...train,
                from: from,
                fromCountry: fromC,
                to: to,
                toCountry: toC,
                start_date: inputDateStart,
                start_time: inputTimeStart,
                end_date: inputDateEnd,
                end_time: inputTimeEnd,
                log_lat: preciseLat,
                log_lon: preciseLon,
                viaPoints: viaPoints,
                operator: operator,
                delayHours: delayHours,
                delayMinutes: delayMinutes,
                journeyReason: journeyReason,
                journeyFirstClass, journeyFirstClass,
                journeyWifi: journeyWifi,
                journeyCycles: journeyCycles,
                journeyRestauraunt: journeyRestauraunt,
                journeySleeper: journeySleeper,
                journeyTags: journeyTags,
                journeyNotes: journeyNotes
            }));

            const addNew = JSON.parse(journeys).concat(numbersWithLocation);
            await writeAllJourneys(addNew);
        });
        }else{
            logNumbers.subscribe(async numbers => {
                const numbersWithLocation = numbers.map(({ dropdown, dropdown_2, id, ...train }) => ({
                    ...train,
                    from: from,
                    to: to,
                    start_date: inputDateStart,
                    start_time: inputTimeStart,
                    end_date: inputDateEnd,
                    end_time: inputTimeEnd,
                }));

                const addNew = JSON.parse(journeys).concat(numbersWithLocation);
                await writeAllJourneys(addNew);
            });
        }


        window.location.href = `../overview/` + inputDateStart; 
    }



    function customAlertSummon(text, mode){
        console.log("Summoning alert")
        $alrtTxt = text;
        $alrtMode = mode;
        $alrtAct = true;
    }

    function locationToggle() {
        if($preciseLocation){
            $preciseLocation = false;
        }else{
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const latitude = position.coords.latitude;
                        const longitude = position.coords.longitude;
                        preciseLat = latitude;
                        preciseLon = longitude;
                        console.log(`Latitude: ${preciseLat}, Longitude: ${preciseLon}`);
                        $preciseLocation = true;
                    },
                    (error) => {
                        switch (error.code) {
                            case error.PERMISSION_DENIED:
                                console.log("User denied the request for Geolocation.");
                                customAlertSummon("User denied the request for Geolocation", "err");
                                break;
                            case error.POSITION_UNAVAILABLE:
                                console.log("Location information is unavailable.");
                                customAlertSummon("Location information is unavailable", "err");
                                break;
                            case error.TIMEOUT:
                                console.log("The request to get user location timed out.");
                                customAlertSummon("The request to get user location timed out", "err");
                                break;
                            case error.UNKNOWN_ERROR:
                                console.log("An unknown error occurred.");
                                customAlertSummon("An unknown error occurred", "err");
                                break;
                        }
                        $preciseLocation = false;
                    }
                );
            } else {
                console.log("Geolocation is not supported by the browser.");
                $preciseLocation = false;
            }
        }
        }

        async function inputVType(type, train){
            logAreas = []
            if(!db){
                db = await import ('../../../db/vehicles.json');
                db = module.default
            }
            
            console.log(type)
            console.log(db)
            if (type === "Train") {
                console.log("TR");
                db.vehTypes.forEach(item => {
                    console.log(item)
                    if (item.trainTypes) {
                        logAreas.push(item);
                        console.log(item);
                    }
                });
            } else if (type === "Bus / Coach") {
                db.vehTypes.forEach(item => {
                    if (item.busTypes) {
                        logAreas.push(item);
                        console.log(item);
                    }
                });
            } else if (type === "Others") {
                db.vehTypes.forEach(item => {
                    if (item.others) {
                        logAreas.push(item);
                        console.log(item);
                    }
                });
            }

            logNumbers.update(numbers => {
                return numbers.map(t => {
                    if (t.id === train.id) {
                        t.vehicletype = type;
                        t.dropdown_2 = 'area';
                    }
                    return t;
                });
            });
        }

        function selectFrom(o){
            from = o.detail.text.name;
            fromId = o.detail.text.id;
        }

        function selectTo(o){
            to = o.detail.text.name;
            toId = o.detail.text.id;
            console.log(from, to, fromId, toId);
        }


        let isMobile;
        let isAndroid;
        let isIOS;
        let isMobileDevice = isMobile || isAndroid || isIOS;

        onMount(() => {
            const userAgent = navigator.userAgent.toLowerCase();
            isMobile = /mobile/.test(userAgent);
            isAndroid = /android/.test(userAgent);
            isIOS = /iphone|ipad|ipod/.test(userAgent);
            isMobileDevice = isMobile || isAndroid || isIOS;
        });

        import { countryFlags } from '../../countries.js'

        function getFlag(item){
            let country = item.country
            if(isMobileDevice){
                return countryFlags.find(flag => flag.code === country)
            }
        }

        function removeVia(via){
            viaPoints = viaPoints.filter(point => point !== via);
        }

        function removeTag(tag){
            journeyTags = journeyTags.filter(t => t !== tag);
        }

        var tagInput;
        
        function addTag(event){
            if (event.key === 'Enter' && tagInput.trim() !== '') {
                if (!journeyTags.includes(tagInput)) {
                    journeyTags = [...journeyTags, tagInput];
                }
                tagInput = '';
            } else if (event.key === 'Backspace' && tagInput.trim() === '') {
                journeyTags = journeyTags.slice(0, -1);
            }
        }

</script>

<style>
    .loader{margin-top:12px;width:24px;height:24px;border:3px solid rgb(50,50,50);border-bottom-color:transparent;border-radius:50%;display:inline-block;box-sizing:border-box;animation:rotation 1s linear infinite}@keyframes rotation{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
    select{background-color: rgb(31, 31, 31) !important; color: #ddd !important;}
</style>

