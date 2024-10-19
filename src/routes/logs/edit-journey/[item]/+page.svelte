<div>
    <p>Editing journey: {item}</p>
</div>

<script>
    import { onMount } from 'svelte';
    import { page } from '$app/stores';

    let item;

    onMount(() => {
        item = $page.params.item;
        console.log('Item:', item);
    });
</script>