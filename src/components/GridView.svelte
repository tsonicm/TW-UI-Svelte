<script>
    import { onMount } from 'svelte';
    import txt from '$lib/images/file.png';
    import doc from '$lib/images/document.png';
    import image from '$lib/images/image.png';
    import zip from '$lib/images/zip.png';
    import convertBytes from '$lib/convertBytes.js';
    import { sortAlphabetically, sortAlphabeticallyReverse, sortBySize, sortBySizeReverse } from '$lib/sortFiles.js';

    //import localDB from '../data/files.json';

    function getExtension(name) {
        let extension = name.split('.').pop();
        return extension;
    }

    function shortenNames(name) {
        if (name.length > 15) {
            return name.substring(0, 9) + "..." + name.substring(name.length - 6, name.length);
        }
        return name;
    }

    let files = [];

    onMount(async () => {
        const res = await fetch('https://localhost:7147/api/file');
        files = await res.json();
        //files = localDB;
        sortAlphabetically(files);
    });
</script>

<div id="files">
    {#each files as file}
        <div id="file">
            <a href = 'htpps://localhost:7147/api/file/${file.id}'>
            {#if getExtension(file.name) === "docx" || getExtension(file.name) === "doc" || getExtension(file.name) === "pdf" || getExtension(file.name) === "pptx" || getExtension(file.name) === "ppt" || getExtension(file.name) === "xlsx" || getExtension(file.name) === "xls"}
                <img id="imgType" src={doc} alt="Document">
            {:else if getExtension(file.name) === "png" || getExtension(file.name) === "jpg" || getExtension(file.name) === "jpeg" || getExtension(file.name) === "gif"}
                <img id="imgType" src={image} alt="Picture">
            {:else if getExtension(file.name) === "zip" || getExtension(file.name) === "rar" || getExtension(file.name) === "7z"}
                <img id="imgType" src={zip} alt="Compressed File">
            {:else}
                <img id="imgType" src={txt} alt="Text File">
            {/if}
            <p>{shortenNames(file.name)}<br><span>{convertBytes(file.size)}</span></p>
            </a>
        </div>
    {:else}
        <p>No files found.</p>
    {/each}
</div> 

<style>
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