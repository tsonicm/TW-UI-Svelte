<script>
    import Header from '../components/Header.svelte';
    import Footer from '../components/Footer.svelte';
    import FileView from '../components/GridView.svelte';
	import ListView from '../components/ListView.svelte';
    import Button from '../components/Button.svelte';
    import List from '$lib/images/list.svg';
    import Grid from '$lib/images/grid.svg';

    let displayStyle = false;

    function setActiveBtn() {
        let btns = document.querySelectorAll('button');
        let listV = document.getElementById('listV');
        let gridV = document.getElementById('gridV');

        btns.forEach(btn => {
            btn.classList.remove('active');
        });

        this.classList.add('active');
    }
</script>

<svelte:head>
    <title>WeSync</title>
    <meta name="description" content="WeSync is a free and open source tool to synchronize your files between your devices.">
</svelte:head>

<Header />
<div class = "dataTitle">
    <h1 class = "Files">Files</h1>
    <Button on:click = {setActiveBtn}
            on:click = {() => displayStyle = false}
            class = "btn center-content">
            List View
        </Button>
    <Button on:click = {setActiveBtn} 
            on:click = {() => displayStyle = true}
            class = "btn center-content active">
            Grid View
        </Button>
</div>
{#if displayStyle}
    <FileView />
{:else}
    <ListView />
{/if}

<Footer />

<style>
    h1 {
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: 2rem;
        color: #900000;
        text-align: left;
    }

    .dataTitle {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        height: 120px;
        text-align: center;
    }

    .Files {
        text-align: left;
        vertical-align: middle;
        float: left;
        width: 80%;
        margin: 0 0 0 1rem;
    }
</style>