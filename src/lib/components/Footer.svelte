<footer class="dark:bg-black dark:bg-opacity-20 opacity-100 bg-opacity-20  bg-neutral-400 w-full min-h-[50px] p-2 flex items-center justify-between mt-4">
    <h1 class="text-center dark:text-white text-neutral-900 text-xs dark:opacity-70 italic">Travel App / 2024</h1>
    <div class="flex gap-3">
        <button class="button text sm  text-sm mods p-1" on:click={() => window.location.href="/"}>Home</button>
        <button class="button text sm text-sm mods p-1" on:click={() => window.location.href="/settings"}>Settings</button>
    </div>
</footer>

<style>

.mods{
    @apply text-neutral-200
}
</style>