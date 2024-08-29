{#if active}
<button class="z-40 w-screen h-screen fixed left-0 top-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center pl-4 pr-4" on:click|self={closeAlert}>
    {#if mode == 'err'}
    <div class="bg-red-700 p-4 w-full rounded-md flex flex-col gap-3 hover:cursor-default">
        <div class="flex gap-3 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bug fill-white w-5 h-5" viewBox="0 0 16 16">
                <path d="M4.355.522a.5.5 0 0 1 .623.333l.291.956A5 5 0 0 1 8 1c1.007 0 1.946.298 2.731.811l.29-.956a.5.5 0 1 1 .957.29l-.41 1.352A5 5 0 0 1 13 6h.5a.5.5 0 0 0 .5-.5V5a.5.5 0 0 1 1 0v.5A1.5 1.5 0 0 1 13.5 7H13v1h1.5a.5.5 0 0 1 0 1H13v1h.5a1.5 1.5 0 0 1 1.5 1.5v.5a.5.5 0 1 1-1 0v-.5a.5.5 0 0 0-.5-.5H13a5 5 0 0 1-10 0h-.5a.5.5 0 0 0-.5.5v.5a.5.5 0 1 1-1 0v-.5A1.5 1.5 0 0 1 2.5 10H3V9H1.5a.5.5 0 0 1 0-1H3V7h-.5A1.5 1.5 0 0 1 1 5.5V5a.5.5 0 0 1 1 0v.5a.5.5 0 0 0 .5.5H3c0-1.364.547-2.601 1.432-3.503l-.41-1.352a.5.5 0 0 1 .333-.623M4 7v4a4 4 0 0 0 3.5 3.97V7zm4.5 0v7.97A4 4 0 0 0 12 11V7zM12 6a4 4 0 0 0-1.334-2.982A3.98 3.98 0 0 0 8 2a3.98 3.98 0 0 0-2.667 1.018A4 4 0 0 0 4 6z"/>
              </svg>
            <h2 class="text-white font-bold text-xl">Error</h2>
            <h4 class="text-white ml-auto text-xs text-opacity-60">Click outside of this box to close</h4>
        </div>
        <hr>
        <h4 class="text-white text-center">{text}</h4>
        
    </div>
    {/if}
    {#if mode == 'success'}
    <div class="bg-green-700 p-4 w-full rounded-md">
        <div class="flex gap-3 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check fill-white w-5 h-5" viewBox="0 0 16 16">
                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
              </svg>
            <h2 class="text-white font-bold text-xl">Success</h2>
            <h4 class="text-white ml-auto text-xs text-opacity-60">Click outside of this box to close</h4>
        </div>
        <hr>
        <h4 class="text-white text-center">{text}</h4>
    </div>
    {/if}
    {#if mode == 'info'}
    <div class="bg-neutral-700 p-4 w-full rounded-md">
        <div class="flex gap-3 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle fill-white w-5 h-5" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
              </svg>
            <h2 class="text-white font-bold text-xl">Information</h2>
            <h4 class="text-white ml-auto text-xs text-opacity-60">Click outside of this box to close</h4>
        </div>
        <hr>
        <h4 class="text-white text-center">{text}</h4>
    </div>
    {/if}
</button>
{/if}

<script>
export let mode;
export let active;
export let text

import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();
function closeAlert() {
    active = false;
    dispatch('close');
}
</script>