<script>
    import upload from '$lib/images/plus.png';

    function showModal() {
        let modal = document.querySelector('#uploadModalBackground');
        let modalContent = document.querySelector('#uploadModal');

        modal.style.opacity = '1';
        modal.style.visibility = 'visible';

        modalContent.style.opacity = '1';
        modalContent.style.visibility = 'visible';
    }
    
    function hideModal() {
        let modal = document.querySelector('#uploadModalBackground');
        let modalContent = document.querySelector('#uploadModal');

        modal.style.opacity = '0';
        modal.style.visibility = 'hidden';

        modalContent.style.opacity = '0';
        modalContent.style.visibility = 'hidden';

        if (files) {
            files = null;
            let filesChosen = document.querySelector('.chosen-files');
            filesChosen.replaceChildren();
            let p = document.createElement('p');
            p.innerHTML = 'No files chosen.';
            filesChosen.appendChild(p);
        }
    }

    function convertBytes(bytes) {
        let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

        if (bytes == 0) {
            return '0 Byte';
        }

        let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));

        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    }

    let files;

    $: if (files) {
        let filesChosen = document.querySelector('.chosen-files');
        filesChosen.removeChild(filesChosen.firstChild);
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            let fileDiv = document.createElement('p');
            fileDiv.style.margin = '0';
            fileDiv.innerHTML = file.name + ' (' + convertBytes(file.size) + ')';
            filesChosen.appendChild(fileDiv);
        }
    }


</script>

<div id = "fileUpload" on:click={showModal}>
    <img src = {upload} alt = "Upload Files" />
</div>

<div id = "uploadModalBackground">
    <div id = "uploadModal">
        <div class = "close-btn">
            <a href = "#" on:click={hideModal}>X</a>
        </div>
        <form method="post" use:enhance enctype="multipart/form-data">
            <input bind:files multiple type = "file" id = "fileUploadBtn" />
            <label for = "fileUploadBtn">Choose your files</label>
            <div class = "chosen-files">
                <p>No files chosen.</p>
            </div>
            <input type = "submit" value = "Upload" id = "uploadFileBtn"/>
        </form>
    </div>
</div>

<style>

    .chosen-files {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        width: 100%;
        max-height: 150px;

        overflow-y: auto;

        margin-top: 1rem;

        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: 1rem;
        color: #adadad;
    }

    .chosen-files::-webkit-scrollbar {
        width: 5px;
    }

    .chosen-files::-webkit-scrollbar-track {
        background: #ddd;
    }

    .chosen-files::-webkit-scrollbar-thumb {
        background: #900000;
    }

    .chosen-files::-webkit-scrollbar-thumb:hover {
        background: #adadad;
    }

    #fileUpload {
        position: fixed;
        bottom: 15px;
        right: 15px;
        cursor: pointer;
    }

    img {
        width: 64px;
        height: 64px;
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    #uploadFileBtn {
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: 1.2rem;
        color: #900000;
        background-color: #f2f2f2;
        border: none;
        border-radius: 5px;
        padding: 0.5rem 1rem;
        margin-top: 1rem;
        cursor: pointer;
    }

    #uploadModalBackground {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;

        background-color: rgba(0, 0, 0, 0.5);

        opacity: 0;
        visibility: hidden;

        z-index: 99;

        transition: opacity 1s ease-in-out, visibility 1s ease-in-out;
    }

    #uploadModal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        width: 300px;
        height: 300px;

        background-color: #f2f2f2;
        border-radius: 15px;

        opacity: 0;
        visibility: hidden;

        z-index: 100;

        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

        transition: opacity 1s ease-in-out, visibility 1s ease-in-out;
    }

    #fileUploadBtn {
        display: none;
    }

    label {
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: 1.2rem;
        color: #900000;
        cursor: pointer;
    }

    .close-btn {
        position: absolute;
        top: 10px;
        right: 10px;
    }

    .close-btn a {
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: 1.2rem;
        color: #900000;
        text-decoration: none;
    }

    .close-btn a:hover {
        color: #adadad;
    }


    @keyframes fadeIn {
        0% {
            opacity: 0;
            visibility: hidden;
        }

        100% {
            opacity: 1;
            visibility: visible;
        }
    }

</style>