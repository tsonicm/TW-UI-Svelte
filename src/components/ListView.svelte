<script>
    import files from '../data/files.json';
    import download from '$lib/images/download.svg';

    function getExtension(name) {
        let extension = name.split('.').pop();
        return extension;
    }
</script>

<table class = "maxWidth">
    <colgroup>
        <col style = "width: 5%;">
        <col style = "width: 80%;">
        <col style = "width: 15%;">
    </colgroup>
    <tr>
        <th></th>
        <th>Name</th>
        <th>Size</th>
    </tr>
    {#each files as file}
        <tr>
            <td><a href="#"><img src = {download} alt = "Download File" /></a></td>
            <td>{file.name}</td>
            <td>{file.size}</td>
        </tr>
    {/each}
</table>

<style>
    .maxWidth {
        width: 100%;
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