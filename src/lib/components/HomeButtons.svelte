<button on:click={() => switchPage()} class="clip w-full h-full relative border-[0px] hover:border-[1px] border-neutral-700 hover:border-white duration-100 group overflow-hidden">
    <div class="absolute w-full h-full top-0 left-0 flex items-end justify-end flex-col">
        <div class="flex h-full items-center w-full sm:w-auto justify-center sm:justify-normal">
            <h2 class="sm:right-10 right-4 rounded-md text-white bg-black bg-opacity-60 border-[1px] border-neutral-700 text-3xl z-20 p-2 sm:pl-8 pl-4 pr-4 flex items-center top-16 clip sm:mr-4">{buttonName} <span class="ml-2 sm:inline-block hidden"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-short w-12 h-12 pt-1" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"/>
            </svg></span></h2>
        </div>
        {#if imgTitle}
        <a title="{imgTitle}" href="{imgHref}" class="bg-black bottom-0  mr-auto z-30 text-white bg-opacity-40 text-[8px] sm:text-[10px]  p-1 pl-2 pr-2 rounded-sm w-full sm:w-auto">{imgTitle2}</a>
        {/if}
    </div>
    {#if imgSrc}
    <img class="absolute top-0 w-full h-full z-10 object-cover blur-sm opacity-100 duration-100 group-hover:opacity-70" alt="Train" src="{imgSrc}">
    {/if}
    {#if !imgSrc}
        <div class="absolute top-0 w-full h-full z-10 bg-neutral-700 bg-opacity-60"></div>
    }
    {/if}
</button>

<script>
    export let buttonName;
    export let imgTitle;
    export let imgTitle2;
    export let imgHref;
    export let imgSrc;
    export let clickRoute;

    function switchPage(){
        window.location.href = `/${clickRoute}`;
    }
</script>