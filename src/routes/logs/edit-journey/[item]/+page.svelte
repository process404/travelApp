<CustomAlert mode={$alrtMode} active={$alrtAct} text={$alrtTxt} on:close={() => $alrtAct = false} />
    <main style="width: 100vw; display: flex; flex-direction: column" id="app">
        <Nav ver="back"/>
            <section class="flex flex-col items-center h-full justify-start overflow-y-scroll customScrollbar overflow-x-hidden">
                <div class="max-w-[1000px] w-full flex flex-col">
                    <article class="flex flex-col items-center border-[1px] rounded-md border-neutral-700 sm:ml-8 ml-4 mr-2 sm:mr-4 h-full sm:pt-6 sm:pb-6 pl-4 pr-4 pb-4">
                        <h2 class="text-white text-xl font-semibold sm:mt-1 mt-3">Edit Journey</h2>
                        <div class="border-[1px] border-neutral-700 rounded-md sm:mt-8 mt-4 w-full max-w-[500px] p-4">
                            <div class="flex items-center justify-center gap-3 mr-1 flex-col mb-3 sm:mb-1">
                                <article class="w-full">
                                    <!--TO-DO - country selector ?-->
                                    <h3 class="text-neutral-300 italic mb-2">From</h3>
                                    {#if loadStns}
                                        <div class="w-full flex items-center justify-center border-neutral-700 border-[1px] rounded-sm">
                                            <span class="loader" style="margin-top:0.5rem; margin-bottom: 0.5rem"></span>
                                        </div>
                                    {:else}
                                        <PromptField ds={locations} on:select={selectFrom} bind:value={from} disabled={$noLocation} ver="loc" bind:presetC={fromC} adDs={allStns}/>
                                    {/if}
                                </article>
                                <article class="w-full">
                                    <h3 class="text-neutral-300 italic mb-2">To</h3>
                                    {#if loadStns}
                                        <div class="w-full flex items-center justify-center border-neutral-700 border-[1px] rounded-sm">
                                            <span class="loader" style="margin-top:0.5rem; margin-bottom: 0.5rem"></span>
                                        </div>
                                    {:else}
                                        <PromptField ds={locations} on:select={selectTo} bind:value={to} disabled={$noLocation} ver="loc" bind:presetC={toC} adDs={allStns}/>
                                    {/if}
                    
                                </article>
                                <article class="border-[1px] border-neutral-700 rounded-md p-2 mt-6 bg-neutral-800 bg-opacity-30 hover:border-neutral-400 duration-50 w-full">
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
                                </article>
                            </div>
                        </div>
                        <article class="border-[1px] border-neutral-700 rounded-md sm:mt-8 mt-4 w-full max-w-[500px] p-4">
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
                                                <h3 class="text-neutral-300 italic mb-2  text-sm ">Service Code</h3>
                                                <input class="input blue w-full reduced h-auto" bind:value={serviceCode}/>
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
                                                        {#each Array.from({ length: 13 }, (_, i) => i - 2) as hour}
                                                            <option selected={hour === 0}>{hour < 10 && hour >= 0 ? `0${hour}` : hour < 0 && hour > -10 ? `-0${Math.abs(hour)}` : hour}</option>
                                                        {/each}
                                                    </select>
                                                    <select class="input reduced iconEdit w-full" bind:value={delayMinutes}>
                                                        {#each Array.from({ length: 119 }, (_, i) => i - 59) as minutes}
                                                            <option selected={minutes === 0}>
                                                                {minutes < 10 && minutes > -10 ? `${minutes < 0 ? '-0' : '0'}${Math.abs(minutes)}` : minutes}
                                                            </option>
                                                        {/each}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="w-1/2">
                                            <h3 class="text-neutral-300 italic mb-2 text-sm">Miles</h3>
                                            <input class="input reduced w-full" bind:value={miles}>
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
                                    <div class="w-full mt-4 mb-3 flex gap-4">
                                        <div class="w-full">
                                            <h3 class="text-neutral-300 italic mb-2 text-sm">Facilities</h3>
                                            <div class="flex">
            
                                                <button class="button text pureSVG" class:blue={journeyWifi} on:click={() => journeyWifi = !journeyWifi}><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-wifi-off" class:opacity-50={!journeyWifi} class:opacity-100={journeyWifi} viewBox="0 0 16 16">
                                                <path d="M10.706 3.294A12.6 12.6 0 0 0 8 3C5.259 3 2.723 3.882.663 5.379a.485.485 0 0 0-.048.736.52.52 0 0 0 .668.05A11.45 11.45 0 0 1 8 4q.946 0 1.852.148zM8 6c-1.905 0-3.68.56-5.166 1.526a.48.48 0 0 0-.063.745.525.525 0 0 0 .652.065 8.45 8.45 0 0 1 3.51-1.27zm2.596 1.404.785-.785q.947.362 1.785.907a.482.482 0 0 1 .063.745.525.525 0 0 1-.652.065 8.5 8.5 0 0 0-1.98-.932zM8 10l.933-.933a6.5 6.5 0 0 1 2.013.637c.285.145.326.524.1.75l-.015.015a.53.53 0 0 1-.611.09A5.5 5.5 0 0 0 8 10m4.905-4.905.747-.747q.886.451 1.685 1.03a.485.485 0 0 1 .047.737.52.52 0 0 1-.668.05 11.5 11.5 0 0 0-1.811-1.07M9.02 11.78c.238.14.236.464.04.66l-.707.706a.5.5 0 0 1-.707 0l-.707-.707c-.195-.195-.197-.518.04-.66A2 2 0 0 1 8 11.5c.374 0 .723.102 1.021.28zm4.355-9.905a.53.53 0 0 1 .75.75l-10.75 10.75a.53.53 0 0 1-.75-.75z"/>
                                                </svg></button>
        
                                                  <button class="button text pureSVG" class:blue={journeyCycles} on:click={() => journeyCycles = !journeyCycles}><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-bicycle" class:opacity-50={!journeyCycles} class:opacity-100={journeyCycles} viewBox="0 0 16 16">
                                                    <path d="M4 4.5a.5.5 0 0 1 .5-.5H6a.5.5 0 0 1 0 1v.5h4.14l.386-1.158A.5.5 0 0 1 11 4h1a.5.5 0 0 1 0 1h-.64l-.311.935.807 1.29a3 3 0 1 1-.848.53l-.508-.812-2.076 3.322A.5.5 0 0 1 8 10.5H5.959a3 3 0 1 1-1.815-3.274L5 5.856V5h-.5a.5.5 0 0 1-.5-.5m1.5 2.443-.508.814c.5.444.85 1.054.967 1.743h1.139zM8 9.057 9.598 6.5H6.402zM4.937 9.5a2 2 0 0 0-.487-.877l-.548.877zM3.603 8.092A2 2 0 1 0 4.937 10.5H3a.5.5 0 0 1-.424-.765zm7.947.53a2 2 0 1 0 .848-.53l1.026 1.643a.5.5 0 1 1-.848.53z"/>
                                                  </svg></button>
        
                                                  <button class="button text pureSVG" class:blue={journeyRestauraunt} on:click={() => journeyRestauraunt = !journeyRestauraunt}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cup-hot" class:opacity-50={!journeyRestauraunt} class:opacity-100={journeyRestauraunt} viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd" d="M.5 6a.5.5 0 0 0-.488.608l1.652 7.434A2.5 2.5 0 0 0 4.104 16h5.792a2.5 2.5 0 0 0 2.44-1.958l.131-.59a3 3 0 0 0 1.3-5.854l.221-.99A.5.5 0 0 0 13.5 6zM13 12.5a2 2 0 0 1-.316-.025l.867-3.898A2.001 2.001 0 0 1 13 12.5M2.64 13.825 1.123 7h11.754l-1.517 6.825A1.5 1.5 0 0 1 9.896 15H4.104a1.5 1.5 0 0 1-1.464-1.175"/>
                                                    <path d="m4.4.8-.003.004-.014.019a4 4 0 0 0-.204.31 2 2 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.6.6 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3 3 0 0 1-.202.388 5 5 0 0 1-.253.382l-.018.025-.005.008-.002.002A.5.5 0 0 1 3.6 4.2l.003-.004.014-.019a4 4 0 0 0 .204-.31 2 2 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.6.6 0 0 0-.09-.252A4 4 0 0 0 3.6 2.8l-.01-.012a5 5 0 0 1-.37-.543A1.53 1.53 0 0 1 3 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a6 6 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 4.4.8m3 0-.003.004-.014.019a4 4 0 0 0-.204.31 2 2 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.6.6 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3 3 0 0 1-.202.388 5 5 0 0 1-.253.382l-.018.025-.005.008-.002.002A.5.5 0 0 1 6.6 4.2l.003-.004.014-.019a4 4 0 0 0 .204-.31 2 2 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.6.6 0 0 0-.09-.252A4 4 0 0 0 6.6 2.8l-.01-.012a5 5 0 0 1-.37-.543A1.53 1.53 0 0 1 6 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a6 6 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 7.4.8m3 0-.003.004-.014.019a4 4 0 0 0-.204.31 2 2 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.6.6 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3 3 0 0 1-.202.388 5 5 0 0 1-.252.382l-.019.025-.005.008-.002.002A.5.5 0 0 1 9.6 4.2l.003-.004.014-.019a4 4 0 0 0 .204-.31 2 2 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.6.6 0 0 0-.09-.252A4 4 0 0 0 9.6 2.8l-.01-.012a5 5 0 0 1-.37-.543A1.53 1.53 0 0 1 9 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a6 6 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 10.4.8"/>
                                                  </svg></button>
        
                                                  <button class="button text pureSVG" class:blue={journeyOvernight} on:click={() => journeyOvernight = !journeyOvernight}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon-stars" class:opacity-50={!journeyOvernight} class:opacity-100={journeyOvernight} viewBox="0 0 16 16">
                                                    <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286"/>
                                                    <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.73 1.73 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.73 1.73 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.73 1.73 0 0 0 1.097-1.097zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z"/>
                                                  </svg></button>
                                            </div>
                                        </div>
                                        <div class="w-full">
                                            <h3 class="text-neutral-300 italic mb-2 text-sm">Travel Class</h3>
                                            <div class="flex">
                                                <button class="button text pureSVG" class:blue={journeyFirstClass} on:click={() => journeyFirstClass = !journeyFirstClass}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class:opacity-50={!journeyFirstClass} class:opacity-100={journeyFirstClass} class="bi bi-1-square" viewBox="0 0 16 16">
                                                        <path d="M9.283 4.002V12H7.971V5.338h-.065L6.072 6.656V5.385l1.899-1.383z"/>
                                                        <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
                                                    </svg>
                                                </button>
    
                                                
                                                <button class="button text pureSVG" class:blue={journeySecondClass} on:click={() => journeySecondClass = !journeySecondClass}>
                                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-2-square" class:opacity-50={!journeySecondClass} class:opacity-100={journeySecondClass} viewBox="0 0 16 16">
                                                        <path d="M6.646 6.24v.07H5.375v-.064c0-1.213.879-2.402 2.637-2.402 1.582 0 2.613.949 2.613 2.215 0 1.002-.6 1.667-1.287 2.43l-.096.107-1.974 2.22v.077h3.498V12H5.422v-.832l2.97-3.293c.434-.475.903-1.008.903-1.705 0-.744-.557-1.236-1.313-1.236-.843 0-1.336.615-1.336 1.306"/>
                                                        <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
                                                      </svg>
                                                   </button>
    
                                                   <button class="button text pureSVG" class:blue={journeyThirdClass} on:click={() => journeyThirdClass = !journeyThirdClass}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-3-square" class:opacity-50={!journeyThirdClass} class:opacity-100={journeyThirdClass} viewBox="0 0 16 16">
                                                        <path d="M7.918 8.414h-.879V7.342h.838c.78 0 1.348-.522 1.342-1.237 0-.709-.563-1.195-1.348-1.195-.79 0-1.312.498-1.348 1.055H5.275c.036-1.137.95-2.115 2.625-2.121 1.594-.012 2.608.885 2.637 2.062.023 1.137-.885 1.776-1.482 1.875v.07c.703.07 1.71.64 1.734 1.917.024 1.459-1.277 2.396-2.93 2.396-1.705 0-2.707-.967-2.754-2.144H6.33c.059.597.68 1.06 1.541 1.066.973.006 1.6-.563 1.588-1.354-.006-.779-.621-1.318-1.541-1.318"/>
                                                        <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
                                                      </svg>
                                                    </button>
                                                    
                                                    <button class="button text pureSVG" class:blue={journeySleeper} on:click={() => journeySleeper = !journeySleeper}>
                                                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class:opacity-50={!journeySleeper} class:opacity-100={journeySleeper} clip-rule="evenodd"><path d="M24 19v-7h-1v-1c0-1.657-1.343-3-3-3h-13v4h-6v-7h-1v14h1v-2h22v2h1zm-23-3h22v-3h-22v3zm7-4h14v-1c0-1.105-.895-2-2-2h-12v3zm-4-5c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zm0 1c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1z"/></svg>
                                                    </button>
                                            </div>
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
                                        <textarea class="input blue resize-none w-full min-h-[120px]"></textarea>
                                    </div>
                                {/if}
                            </div>
                        </article>
    
    
    
    
                        <!-- more journey info needs to go here-->
    
    
    
    
    
                        <article class="border-[1px] border-neutral-700 rounded-md sm:mt-8 mt-4 w-full max-w-[500px] p-4">
                            <h3 class="text-neutral-300 italic">Numbers</h3>
                            <div class="mt-2 flex gap-2 items-center flex-wrap">
                                <div class="flex mb-2 rounded-md border-neutral-800 gap-1 w-full items-start">
                                    <ul class="gap-1 input w-full min-h-[150px] flex-wrap" role="presentation" on:click|self={() => {document.getElementById('numberEntryInput').focus()}}>
                                        {#if logNumbers.length != 0}
                                            {#each $logNumbers as logItem}
                                                <li class="relative mb-1 inline-block">
                                                    <button on:click={() => {logItem['dropdown'] = !logItem['dropdown']; document.getElementById('numberEntryInput').blur()}} class=" bg-blue-800 button blue2 textWhite pl-2 pr-2 sm s-padding mr-1">{logItem['number']} ({logItem['type']} - {logItem['variant']})</button>
                                                    
                                                    {#if logItem['dropdown']}
                                                        <button class="z-30 fixed w-screen h-screen hover:cursor-default left-0 top-0" on:click={closeDropdown(logItem)}></button>
                                                    {/if}
                                                    
                                                    {#if logItem['dropdown']}
                                                    <div class="absolute z-40 left-0 top-100 bg-[rgb(15,15,15)] p-2 w-auto min-h-8 rounded-md rounded-t-none border-[1px] border-neutral-800 min-w-[75px] max-h-[200px] overflow-y-scroll sm:max-h-[300px] pr-0 ">
                                                        {#if logItem['dropdown_2'] == ''}
                                                        <div class="flex gap-2 min-w-[180px]">
                                                            <button class="sm button red pl-2 pr-2 w-full" on:click={removeLog(logItem['id'])}>Remove</button>
                                                            <button class="sm button blue pl-2 pr-2 w-full" on:click={() => logItem['dropdown_2'] = "section"}>Edit type</button>
                                                        </div>
                                                        {/if}
    
                                                        {#if logItem.dropdown_2 === "section"}
                                                        <h3 class="text-white text-sm">Select Vehicle Type</h3>
                                                        <div class="min-w-[200px] w-full flex flex-wrap gap-1 mt-1">
                                            
                                                            <button class="button sm blue2 textWhite pl-2 pr-2" on:click={() => inputVType("Train", logItem)}>Train</button>
                                                            <button class="button sm blue2 textWhite pl-2 pr-2" on:click={() => inputVType("Bus / Coach", logItem)}>Bus / Coach</button>
                                                            <button class="button sm blue2 textWhite pl-2 pr-2" on:click={() => inputVType("Others", logItem)}>Other</button>
                                                        </div>
                                                        {/if}
    
                                                        {#if logItem.dropdown_2 === "area"}
                                                            <h3 class="text-white text-sm">Select Area</h3>
                                                            <div class="min-w-[200px] w-full flex flex-wrap gap-1 mt-1">
                                                                {#each logAreas as area}
                                                                    <button class="button sm blue2 textWhite pl-2 pr-2" on:click={() => inputAreaBtn(area, logItem)}>{area.area}</button>
                                                                {/each}
                                                            </div>
                                                        {/if}
                                                        {#if logItem.dropdown_2 === "type"}
                                                            <h3 class="text-white text-sm">Select Type</h3>
                                                            <div class="min-w-[200px] w-full flex flex-wrap gap-1 mt-1">
                                                                {#if logItem['vehicletype'] == 'Train'}
                                                                {#each $inputArea.trainTypes as type}
                                                                        <button class="button sm blue2 textWhite pl-2 pr-2" on:click={() => inputType(type, logItem)}>{type.name}</button>
                                                                    {/each}
                                                                {:else if logItem['vehicletype'] == "Bus / Coach"}
                                                                {#each $inputArea.busTypes as type}
                                                                        <button class="button sm blue2 textWhite pl-2 pr-2" on:click={() => inputType(type, logItem)}>{type.name}</button>
                                                                    {/each}
                                                                {:else if logItem['vehicletype'] == "Others"}
                                                                    {#each $inputArea.otherTypes as type}
                                                                    <button class="button sm blue2 textWhite pl-2 pr-2" on:click={() => inputType(type, logItem)}>{type.name}</button>
                                                                    {/each}
                                                                    {/if}
                                                                <button class="button sm red textWhite pl-2 pr-2" on:click={() => logItem.dropdown_2 = 'area'}>Back</button>
                                                            </div>
                                                        {/if}
                                                        {#if logItem.dropdown_2 === "variant"}
                                                            <h3 class="text-white text-sm">Select Variant</h3>
                                                            <div class="min-w-[200px] w-full flex flex-wrap gap-1 mt-1  sm:min-w-[450px]">
                                                                {#each $inputVariant as variant}
                                                                <button class="button sm blue2 textWhite pl-2 pr-2" on:click={() => inputVariantBtn(variant, logItem)}>{variant.name}</button>
                                                                {/each}
                                                                <button class="button sm red textWhite pl-2 pr-2" on:click={() => logItem.dropdown_2 = 'type'}>Back</button>
                                                            </div>
                                                        {/if}
                                                    </div>
                                                    {/if}
                            
                                                </li>
                                            {/each}
                                        {/if}
                                        <input id="numberEntryInput" class="focus:border-white border-[1px] border-transparent bg-transparent w-auto mt-1 p-1   " on:keydown={handleKeyPressNumber} bind:value={inputNumber}/>
                                    </ul>
                                </div>
                        
                            </div>
                        </article>
                        <div class="border-[1px] border-neutral-700 rounded-md sm:mt-16 mt-8 w-full max-w-[500px] p-4">
                        <button class="button blue w-full p-2 text-sm x-padding" on:click={confirmLog}>Edit Log</button>
                        </div>
                    </article>
                </div>
            </section>
            <footer class="mt-auto">
                <Footer/>
            </footer>
    </main>
    
    <script>
        // TO-DO
        // Add VIA points for journey (as the app will not be fetching timetable data unless a way is found with minimal / no api usage)
        // Start / End Date AND time
        // Select Operator
        // Add fields such as class, ticket costs, delay, train code, leisure / commute, tags (wifi, dining car, sleeper train, cycling)
        
    
    
    
        import { onMount, tick } from 'svelte';
        import Nav from '../../../../lib/components/Nav.svelte';
        import Footer from '../../../../lib/components/Footer.svelte';
        import CustomAlert from '../../../../lib/components/Alert.svelte';
        import '../../../../global.css'
        import PromptField from '../../../../lib/components/PromptField.svelte';
    
        import "../../../siteDB.js"
        import { writePlanningData, writeLocationsData, writeJourneysData, writeLogsData, getPlanningData, getLocationsData, getJourneysData, getLogsData } from '../../../siteDB';
        
        import operators from '../../../../db/operators.json';

        
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
        var noLocation = writable(false);
        var id = 0
        var toC = ''
        var fromC = ''
        var fromLat = ''
        var fromLong = ''
        var toLat = ''
        var toLong = ''
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
        import additionalStns from '../../../../db/additionalStations.json'
        import { tl_getAllData, tl_putData } from '../../../tl_stationsDB';
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
        var journeySecondClass = true;
        var journeyThirdClass = false;
        var journeyCycles = false;
        var journeyRestauraunt = false;
        var journeyOvernight = false;
        var journeySleeper = false;
        var journeyTags = []
        var existingTags = []
        var journeyNotes = ''
        let serviceCode = ''
    
        function selectVia(o) {
            via = o.detail.text.name;
            viaPoints.push(o.detail.text);
            viaPointsAdd = false;
            // console.log("select", via);
        }
    
        async function getTagsFromJourneys(){
            let journeys = await getJourneysData();
            if(journeys != null){
                const parsedJourneys = journeys;
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

        import { page } from '$app/stores';
        let param = null;
        
        let allStns = null
        let loadStns = true;
        onMount(async () => {
            param = $page.params.item;
            const module = await import('../../../../db/vehicles.json');
            db = module.default; 
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

            let journeys = await getJourneysData();
            if (journeys) {
                const journey = journeys.find(j => j.id === param);
                if (journey) {
                    from = journey.from;
                    fromC = journey.fromCountry;
                    to = journey.to;
                    toC = journey.toCountry;
                    fromLat = journey.fromLat;
                    fromLong = journey.fromLong;
                    toLat = journey.toLat;
                    toLong = journey.toLong;
                    inputDateStart = journey.start_date;
                    inputTimeStart = journey.start_time;
                    inputDateEnd = journey.end_date;
                    inputTimeEnd = journey.end_time;
                    viaPoints = journey.viaPoints;
                    operator = journey.operator;
                    delayHours = journey.delayHours;
                    delayMinutes = journey.delayMinutes;
                    journeyReason = journey.journeyReason;
                    journeyFirstClass = journey.journeyFirstClass;
                    journeySecondClass = journey.journeySecondClass;
                    journeyWifi = journey.journeyWifi;
                    journeyCycles = journey.journeyCycles;
                    journeyRestauraunt = journey.journeyRestauraunt;
                    journeyOvernight = journey.journeyOvernight;
                    journeySleeper = journey.journeySleeper;
                    journeyTags = journey.journeyTags;
                    journeyNotes = journey.journeyNotes;
                    serviceCode = journey.serviceCode;
                    logNumbers.set(journey.numbers);
                    miles = journey.miles
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
            // console.log(logs)
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
            // console.log('logAreas:', logAreas);
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
            // console.log(logs)
            // console.log(inputNumber)
            if (logs) {
                vehFound = logs.some(log => log.number === inputNumber);
                // console.log(vehFound)
                if (vehFound) {
                    veh = logs.find(log => log.number === inputNumber);
                }
            }
    
            if(vehFound && veh){
                logNumbers.update(numbers => {
                    return [...numbers, {"id": id, "vehicletype":"","number":inputNumber,"type":veh.type,"variant":veh.variant, "dropdown":false, "dropdown_2":""}];
                });
            }else{
                logNumbers.update(numbers => {
                    return [...numbers, {"id": id, "vehicletype":"","number":inputNumber,"type":"","variant":"", "dropdown":false, "dropdown_2":""}];
                });
            }
    
    
            inputNumber = ''
        };
            
    
        function handleKeyPressNumber(e){
            if(e.key == 'Enter'){
                if (inputNumber != '') {
                    let numberExists = false;
                    $logNumbers.forEach(logItem => {
                        if (logItem.number === inputNumber) {
                            numberExists = true;
                        }
                    });
                    if (!numberExists) {
                        addNumber();
                    }
                }
            }
            if (e.key === 'Backspace' && inputNumber === '') {
                logNumbers.update(numbers => {
                    if (numbers.length > 0) {
                        numbers.pop();
                    }
                    return numbers;
                });
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

        let miles = 0;

        import OpenRouteService from 'openrouteservice-js';

    
        async function confirmLog(){
            $alrtMode = 'info_nc';
            $alrtTxt = 'Processing...';
            $alrtAct = true;
    
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
    
            if(fromC == '' || toC == ''){
                if(!$noLocation){
                    customAlertSummon("No country selected", "err");
                    return;
                }
            }
    
            let journeys = await getJourneysData();
            if (!journeys) {
                journeys = JSON.stringify([]);
            }

            let railRoute = null;
    
            logNumbers.subscribe(async numbers => {
                const updatedJourney = {
                    id: param,
                    from: from,
                    fromCountry: fromC,
                    to: to,
                    toCountry: toC,
                    fromLat: fromLat,
                    fromLong: fromLong,
                    toLat: toLat,
                    toLong: toLong,
                    railRoute: railRoute,
                    start_date: inputDateStart,
                    start_time: inputTimeStart,
                    end_date: inputDateEnd,
                    end_time: inputTimeEnd,
                    viaPoints: viaPoints,
                    operator: operator,
                    delayHours: delayHours ?? 0,
                    delayMinutes: delayMinutes ?? 0,
                    journeyReason: journeyReason,
                    journeyFirstClass: journeyFirstClass,
                    journeySecondClass: journeySecondClass,
                    journeyWifi: journeyWifi,
                    journeyCycles: journeyCycles,
                    journeyRestauraunt: journeyRestauraunt,
                    journeyOvernight: journeyOvernight,
                    journeySleeper: journeySleeper,
                    journeyTags: journeyTags,
                    journeyNotes: journeyNotes,
                    serviceCode: serviceCode,
                    miles: miles,
                    numbers: numbers.map(({ dropdown, dropdown_2, id, ...train }) => ({
                        ...train
                    }))
                };

                const updatedJourneys = journeys.map(j => j.id === param ? updatedJourney : j);
                let test = await writeJourneysData(updatedJourneys);
                await sleep(3000)
                window.location.href = `/overview/` + inputDateStart;
            });
    
            // console.log($logNumbers)
    
    
        }
    
    
    
        function customAlertSummon(text, mode){
            console.log("Summoning alert")
            $alrtTxt = text;
            $alrtMode = mode;
            $alrtAct = true;
        }
    
            async function inputVType(type, train){
                logAreas = []
                if(!db){
                    db = await import ('../../../../db/vehicles.json');
                    db = module.default
                }
                
                // console.log(type)
                // console.log(db)
                if (type === "Train") {
                    console.log("TR");
                    db.vehTypes.forEach(item => {
                        console.log(item)
                        if (item.trainTypes) {
                            logAreas.push(item);
                            // console.log(item);
                        }
                    });
                } else if (type === "Bus / Coach") {
                    db.vehTypes.forEach(item => {
                        if (item.busTypes) {
                            logAreas.push(item);
                            // console.log(item);
                        }
                    });
                } else if (type === "Others") {
                    db.vehTypes.forEach(item => {
                        if (item.others) {
                            logAreas.push(item);
                            // console.log(item);
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
                fromLat = o.detail.text.lat;
                fromLong = o.detail.text.long;
            }
    
            function selectTo(o){
                to = o.detail.text.name;
                toId = o.detail.text.id;
                toLat = o.detail.text.lat;
                toLong = o.detail.text.long;
                // console.log(from, to, fromId, toId);
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
    
            import { countryFlags } from '../../../../db/countries.js'
    
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
    
            onMount(() => {
            const settings = JSON.parse(localStorage.getItem('settings'));
            if (settings.darkMode) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        });
    
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    
    </script>
    
    <style>
        .loader{margin-top:12px;width:24px;height:24px;border:3px solid rgb(50,50,50);border-bottom-color:transparent;border-radius:50%;display:inline-block;box-sizing:border-box;animation:rotation 1s linear infinite}@keyframes rotation{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
        select{background-color: rgb(31, 31, 31) !important; color: #ddd !important;}
    </style>
    
    