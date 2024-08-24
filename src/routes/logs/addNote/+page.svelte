<Nav ver="back"/>
<div class="h-screen">

</div>
<Footer/>

<script>
    import { onMount } from 'svelte';
    import Nav from '../../../lib/components/Nav.svelte';
    import Footer from '../../../lib/components/Footer.svelte';
    onMount(() => {
        document.title = 'Add Note';
    });
</script>

