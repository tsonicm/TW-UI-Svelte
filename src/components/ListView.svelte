<script>
    import getFiles from '$lib/getFiles.js';
    import download from '$lib/images/download.svg';
    import convertBytes from '$lib/convertBytes.js';

    let files = getFiles();
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
            <th>Name</th>
            <th>Size</th>
        </tr>
        {#each files as file}
            <tr>
                <td><a href='https://localhost:7147/api/file/${file.id}'><img src = {download} alt = "Download File" /></a></td>
                <td>{file.name}</td>
                <td>{convertBytes(file.size)}</td>
            </tr>
        {:else}
            <tr>
                <td colspan = "3">No files found.</td>
            </tr>
        {/each}
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