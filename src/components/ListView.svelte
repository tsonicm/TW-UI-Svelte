<script>
    import { onMount } from 'svelte';
    import download from '$lib/images/download.svg';
    import createDir from '$lib/images/createDir.png';
    import folder from '$lib/images/folder.png';
    import backOne from '$lib/images/return.png';
    import convertBytes from '$lib/convertBytes.js';
    import { sortAlphabetically, sortAlphabeticallyReverse, sortBySize, sortBySizeReverse } from '$lib/sortFiles.js';
    import CreateDirectoryModal from './CreateDirectoryModal.svelte';
    import { createEventDispatcher } from 'svelte';

    // import localDB from '../data/files.json';

    let dispatch = createEventDispatcher();

    let files = [];

    let sortAlpha = 1, sortSize = 0;

    let showDirModal = false;
    
    let vPath;

    let currentPath = '/';

    export function reloadMe(reloadPath) {
        console.log("GridViewPath: " + reloadPath);
        const req = new XMLHttpRequest();
        req.open('GET', 'https://localhost:7147/api/file?path=' + reloadPath, false);
        req.send(null);
        files = JSON.parse(req.responseText);
    }

    function getExtension(name) {
        let extension = name.split('.').pop();
        return extension;
    }

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
        const res = await fetch('https://localhost:7147/api/file?path=/');
        files = await res.json();
        // files = localDB;
        sortAlphabetically(files);
        vPath = files[0].virtualPath;
        dispatch('changePath', {detail: vPath});
    });

    async function handleDelete(fk) {
        const res2 = await fetch('https://localhost:7147/api/file/' + fk, {
            method: 'DELETE'
        })
        if (res2.status === 200) {
            const res = await fetch('https://localhost:7147/api/file?path=' + currentPath);
            files = await res.json();
        }
    }

    async function handleFolderCreated() {
        showDirModal = false;
        const res = await fetch('https://localhost:7147/api/file?path=' + currentPath + '/');
        files = await res.json();
    }

    function handleFolderNotCreated() {
        alert('Error creating directory.');
    }

    function handleShowModal() {
        showDirModal = !showDirModal;
    }

    function checkEmpty(file) {
        if(getExtension(file.name) !== "dir") {
            return true;
        }

        const req = new XMLHttpRequest();
        req.open('GET', `https://localhost:7147/api/file?path=${file.virtualPath}${file.name.split('.')[0]}`, false);
        req.send(null);
        let myFiles = JSON.parse(req.responseText);
            
        if (myFiles.length === 0) {
            return true;
        }

        return false;
    }

    function shortenNames(name) {
        if (name.length > 15) {
            return name.substring(0, 8) + "..." + name.substring(name.length - 6, name.length);
        }

        if (getExtension(name) === "dir") {
            return name.substring(0, name.length - 4);
        }

        return name;
    }

    async function handleDownload(ext, id, path, name) {
        if (ext === "dir") {
            const res = await fetch(`https://localhost:7147/api/file?path=${path}${name.split('.')[0]}`);
            files = await res.json();
            currentPath += `${name.split('.')[0]}/`;
            dispatch('updatePath', {detail: currentPath})
        } else {
        return location.href = `https://localhost:7147/api/file/${id}`;
        }
    }

    async function returnOne() {
        if (currentPath === '/') {
            return;
        }
        let path = currentPath.split('/');
        path.pop();
        path.pop();
        path = path.join('/');
        path += '/';
        currentPath = path;
        if (currentPath === '') {
            currentPath = '/';
            path = '/';
        }
        dispatch('updatePath', {detail: currentPath})
        const res = await fetch(`https://localhost:7147/api/file?path=${path}`);
        files = await res.json();
    }

</script>

{#if showDirModal}
    <CreateDirectoryModal on:folderCreated={handleFolderCreated} on:folderNotCreated={handleFolderNotCreated} on:closeModal={handleShowModal} vPath='{currentPath}'/>
{/if}

<div class = "content-wrapper">
    <table>
        <colgroup>
            <col style = "width: 5%;">
            <col style = "width: 80%;">
            <col style = "width: 10%;">
            <col style = "width: 5%;">
        </colgroup>
        <tr>
            <th></th>
            <th on:click={sortFilesAlpha} style="cursor: pointer"><span id="directionName">↓</span>Name</th>
            <th on:click={sortFilesSize} style="cursor: pointer"><span id="directionSize"></span>Size</th>
            <th></th>
        </tr>
        <tr>
            <td><a style="cursor:pointer;" on:click={handleShowModal}><img src = {createDir} alt = "Create Directory" /></a></td>
            <td colspan = "3">Create a directory</td>
        </tr>
        {#if currentPath !== '/' && currentPath !== ''}
            <tr>
                <td><a style="cursor:pointer;" on:click={returnOne}><img src = {backOne} alt = "Up one level" /></a></td>
                <td colspan = "3">Up one level</td>
            </tr>
        {/if}
        {#key sortAlpha}
        {#key sortSize}
            {#each files as file}
                {#if getExtension(file.name) === 'dir'}
                    <tr>
                        <td><a style="cursor: pointer;" on:click={handleDownload(getExtension(file.name),file.id, file.virtualPath, file.name)}><img src = {folder} alt = "Download File" /></a></td>
                        {#if checkEmpty(file)}
                            <td colspan="2">{shortenNames(file.name)}</td>
                            <td><a id="delete-this" on:click={handleDelete(file.id)}>X</a></td>
                        {:else}
                            <td colspan="3">{shortenNames(file.name)}</td>
                        {/if}
                    </tr>
                {:else}
                    <tr>
                        <td><a href='https://localhost:7147/api/file/{file.id}'><img src = {download} alt = "Download File" /></a></td>
                        <td>{file.name}</td>
                        <td>{convertBytes(file.size)}</td>
                        <td><a id="delete-this" on:click={handleDelete(file.id)}>X</a></td>
                    </tr>
                    {/if}
            {:else}
                <tr>
                    <td colspan = "4">No files found.</td>
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
    
    #delete-this {
        color: #adadad;
        cursor: pointer;
    }

    #delete-this:hover {
        color: #900000;
    }
</style>