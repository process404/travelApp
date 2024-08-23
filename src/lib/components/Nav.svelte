
<nav class="bg-black w-full min-h-16 p-2 flex mb-4 pl-4 pr-4 items-center justify-center">
    {#if ver == 'main'}
    <div class="max-w-[1000px] flex justify-between w-full">
        <h2 class="text-white text-2xl font-semibold">Trip Planner</h2>
        <div class="flex h-full mt-auto">
            <span style="clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);" class="w-6 h-2 bg-red-600 block"></span>
            <span style="clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);" class="w-6 h-2 bg-blue-600 block"></span>
            <span style="clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);" class="w-6 h-2 bg-neutral-400 block"></span>
        </div>
    </div>
    {/if}
    {#if ver == 'back'}
    <div class="max-w-[1000px] flex justify-between w-full">
        <button on:click="{() => goBack()}" class="text-white bg-blue-900 p-2 rounded-md pl-4 pr-4 hover:bg-blue-800">Go Back</button>
        <div class="flex h-full mt-auto">
            <span style="clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);" class="w-6 h-2 bg-red-600 block"></span>
            <span style="clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);" class="w-6 h-2 bg-blue-600 block"></span>
            <span style="clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);" class="w-6 h-2 bg-neutral-400 block"></span>
        </div>
    </div>
    {/if}
</nav>

<script>
    export let ver;

    console.log("ver", ver)

    function goBack(){
        window.history.back();
    }
</script>