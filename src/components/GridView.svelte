<script>
    import { onMount } from 'svelte';
    import txt from '$lib/images/file.png';
    import doc from '$lib/images/document.png';
    import image from '$lib/images/image.png';
    import zip from '$lib/images/zip.png';
    import createDir from '$lib/images/createDir.png';
    import folder from '$lib/images/folder.png';
    import backOne from '$lib/images/return.png';
    import convertBytes from '$lib/convertBytes.js';
    import { sortAlphabetically, sortAlphabeticallyReverse, sortBySize, sortBySizeReverse } from '$lib/sortFiles.js';
    import CreateDirectoryModal from './CreateDirectoryModal.svelte';
    import { createEventDispatcher } from 'svelte';

    // import localDB from '../data/files.json';

    let vPath;

    const dispatch = createEventDispatcher();

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

    function shortenNames(name) {
        if (name.length > 15) {
            return name.substring(0, 8) + "..." + name.substring(name.length - 6, name.length);
        }

        if (getExtension(name) === "dir") {
            return name.substring(0, name.length - 4);
        }

        return name;
    }

    let files = [];

    let showDirModal = false;

    let currentPath = '/';

    onMount(async () => {
        const res = await fetch('https://localhost:7147/api/file?path=/');
        files = await res.json();
        // files = localDB;
        sortAlphabetically(files);
        vPath = files[0].virtualPath;
        dispatch('updatePath', {detail: vPath});
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
        const res = await fetch('https://localhost:7147/api/file?path=' + currentPath);
        files = await res.json();
    }

    function handleFolderNotCreated() {
        alert('Error creating directory.');
    }

    function handleShowModal() {
        showDirModal = !showDirModal;
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
    
</script>

{#if showDirModal}
    <CreateDirectoryModal on:folderCreated={handleFolderCreated} on:folderNotCreated={handleFolderNotCreated} on:closeModal={handleShowModal} vPath='{currentPath}'/>
{/if}

<div id="files">
    <div id="file" class = "createDir">
        <a on:click={handleShowModal}>
            <img id="imgType" src = {createDir} alt = "Create Directory" />
            <p>Create Directory</p>
        </a>
    </div>
    {#if currentPath !== '/' && currentPath !== ''}
        <div id="file" class="upOne">
            <a on:click={returnOne}>
                <img id="imgType" src = {backOne} alt = "Back One Dir" />
                <p>Back</p>
            </a>
        </div>
    {/if}
    {#each files as file}
        <div id="file">
            {#if checkEmpty(file)}
                <a on:click={handleDelete(file.id)}>
                    <div id="delete-me">
                        X
                    </div>
                </a>
            {/if}

            <a on:click={handleDownload(getExtension(file.name),file.id, file.virtualPath, file.name)} style="cursor:pointer;">
            {#if getExtension(file.name) === "docx" || getExtension(file.name) === "doc" || getExtension(file.name) === "pdf" || getExtension(file.name) === "pptx" || getExtension(file.name) === "ppt" || getExtension(file.name) === "xlsx" || getExtension(file.name) === "xls"}
                <img id="imgType" src={doc} alt="Document">
            {:else if getExtension(file.name) === "png" || getExtension(file.name) === "jpg" || getExtension(file.name) === "jpeg" || getExtension(file.name) === "gif"}
                <img id="imgType" src={image} alt="Picture">
            {:else if getExtension(file.name) === "zip" || getExtension(file.name) === "rar" || getExtension(file.name) === "7z"}
                <img id="imgType" src={zip} alt="Compressed File">
            {:else if getExtension(file.name) === "dir"}
                <img id="imgType" src={folder} alt="Directory">
            {:else}
                <img id="imgType" src={txt} alt="Text File">
            {/if}
            {#if getExtension(file.name) === "dir"}
                <p>{shortenNames(file.name)}</p>
            {:else}
                <p>{shortenNames(file.name)}<br><span>{convertBytes(file.size)}</span></p>
            {/if}
            </a>
        </div>
    {:else}
        <p class="notFound">No files found.</p>
    {/each}
</div> 

<style>

    .createDir {
        cursor: pointer;
    }

    .upOne {
        cursor: pointer;
    }

    .notFound {
        font-size: 1.2rem;
        text-align: center;
    }

    #files {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 20px;
        padding: 20px;
        overflow-y: auto;
        max-height: calc(100vh - 320px);
    }

    #files::-webkit-scrollbar {
        width: 10px;
    }

    #files::-webkit-scrollbar-track {
        background: #ddd;
        border-radius: 5px;
    }

    #files::-webkit-scrollbar-thumb {
        background: #900000;
        border-radius: 5px;
    }

    #files::-webkit-scrollbar-thumb:hover {
        background: #adadad;
    }

    #file {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 150px;
        text-align: center;
        position: relative;
    }

    #delete-me {
        position: absolute;
        top: 0;
        right: 0;
        background-color: #900000;
        color: #ffffff;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: 0.6rem;
    }

    #delete-me:hover {
        background-color: #adadad;
        color: #000000;
    }

    #file:hover {
        background-color: #f2f2f2;
        border-radius: 5px;
    }

    #imgType {
        width: 48px;
        height: 48px;
    }

    p {
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: 1.2rem;
    }
    
    span {
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: 1rem;
        color: #adadad;
    }

    a {
        text-decoration: none;
        color: #000000;
    }

    a:hover {
        color: #900000;
    }
</style>