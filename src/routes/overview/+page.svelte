<div style="width: 100vw; display: flex; flex-direction: column" id="app">
    <Nav ver="back"/>
    <div class="h-screen">
    
    </div>
    <Footer/>
</div>


<script>
    import { onMount } from 'svelte';
    import Nav from '../../lib/components/Nav.svelte';
    import Footer from '../../lib/components/Footer.svelte';
    import '../../global.css'
    onMount(() => {
        document.title = 'Overview';
    });
</script>

