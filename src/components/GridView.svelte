<script>
    import files from '../data/files.json';
    import txt from '$lib/images/file.png';
    import doc from '$lib/images/document.png';
    import image from '$lib/images/image.png';
    import zip from '$lib/images/zip.png';

    function getExtension(name) {
        let extension = name.split('.').pop();
        return extension;
    }
</script>

<div id="files">
    {#each files as file}
        <div id="file">
            <a href = "#">
            {#if getExtension(file.name) === "docx" || getExtension(file.name) === "doc" || getExtension(file.name) === "pdf" || getExtension(file.name) === "pptx" || getExtension(file.name) === "ppt" || getExtension(file.name) === "xlsx" || getExtension(file.name) === "xls"}
                <img id="imgType" src={doc} alt="Document">
            {:else if getExtension(file.name) === "png" || getExtension(file.name) === "jpg" || getExtension(file.name) === "jpeg" || getExtension(file.name) === "gif"}
                <img id="imgType" src={image} alt="Picture">
            {:else if getExtension(file.name) === "zip" || getExtension(file.name) === "rar" || getExtension(file.name) === "7z"}
                <img id="imgType" src={zip} alt="Compressed File">
            {:else}
                <img id="imgType" src={txt} alt="Text File">
            {/if}
            <p>{file.name}<br><span>{file.size}</span></p>
            </a>
        </div>
    {/each}
</div> 

<style>
    #files {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 20px;
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