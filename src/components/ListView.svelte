<script>
    import { onMount } from 'svelte';
    import download from '$lib/images/download.svg';
    import convertBytes from '$lib/convertBytes.js';
    import { sortAlphabetically, sortAlphabeticallyReverse, sortBySize, sortBySizeReverse } from '$lib/sortFiles.js';

    import localDB from '../data/files.json';
    let files = [];

    let sortAlpha = 1, sortSize = 0;

    function sortFilesAlpha() {
        if (sortAlpha === 0) {
            sortAlphabetically(files);
            sortAlpha = 1;
            sortSize = 0;
            document.getElementById('directionName').innerHTML = '↓';
            document.getElementById('directionSize').innerHTML = '';
        } else if (sortAlpha === 1) {
            sortAlphabetically(files);
            sortAlpha = 2;
            document.getElementById('directionName').innerHTML = '↓';
        } else {
            sortAlphabeticallyReverse(files);
            sortAlpha = 1;
            document.getElementById('directionName').innerHTML = '↑';
        }
    }

    function sortFilesSize() {
        if (sortSize === 0) {
            sortBySize(files);
            sortSize = 1;
            sortAlpha = 0;
            document.getElementById('directionName').innerHTML = '';
            document.getElementById('directionSize').innerHTML = '↓';
        } else if (sortSize === 1) {
            sortBySize(files);
            sortSize = 2;
            document.getElementById('directionSize').innerHTML = '↓';
        } else {
            sortBySizeReverse(files);
            sortSize = 1;
            document.getElementById('directionSize').innerHTML = '↑';
        }
    }

    onMount(async () => {
        // const res = await fetch('https://localhost:7147/api/file');
        // files = await res.json();
        files = localDB;
        sortAlphabetically(files);
    });
</script>

<div class = "content-wrapper">
    <table>
        <colgroup>
            <col style = "width: 5%;">
            <col style = "width: 85%;">
            <col style = "width: 10%;">
        </colgroup>
        <tr>
            <th></th>
            <th on:click={sortFilesAlpha} style="cursor: pointer"><span id="directionName">↓</span>Name</th>
            <th on:click={sortFilesSize} style="cursor: pointer"><span id="directionSize"></span>Size</th>
        </tr>
        {#key sortAlpha}
        {#key sortSize}
            {#each files as file}
                <tr>
                    <td><a href='https://localhost:7147/api/file/{file.id}'><img src = {download} alt = "Download File" /></a></td>
                    <td>{file.name}</td>
                    <td>{convertBytes(file.size)}</td>
                </tr>
            {:else}
                <tr>
                    <td colspan = "3">No files found.</td>
                </tr>
            {/each}
        {/key}
        {/key}
    </table>
</div>

<style>
    .content-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        max-height: calc(100vh - 290px);
        overflow-y: scroll;
    }

    .content-wrapper::-webkit-scrollbar {
        width: 10px;
    }

    .content-wrapper::-webkit-scrollbar-track {
        background: #ddd;
        border-radius: 5px;
    }

    .content-wrapper::-webkit-scrollbar-thumb {
        background: #900000;
        border-radius: 5px;
    }

    .content-wrapper::-webkit-scrollbar-thumb:hover {
        background: #adadad;
    }

    .content-wrapper table {
        width: 95%;
        border-collapse: collapse;
    }

    th {
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: 1.2rem;
        text-align: left;
        padding: 1rem;
        border-bottom: 1px solid #adadad;
    }

    td {
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: 1rem;
        text-align: left;
        padding: 1rem;
        border-bottom: 1px solid #adadad;
    }

    img {
        width: 32px;
        height: 32px;
    }

    img:hover {
        filter: invert(8%) sepia(97%) saturate(5396%) hue-rotate(14deg) brightness(87%) contrast(117%);
    }
</style>