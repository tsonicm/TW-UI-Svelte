<script>
    import { onMount } from 'svelte';
    import { usrData } from '$lib/store.js';
    import { get } from 'svelte/store';
    import { createEventDispatcher } from 'svelte';
	import Button from './Button.svelte';

    export let vPath;

    const dispatch = createEventDispatcher();
    let email = get(usrData).email;

    onMount(() => {
        document.getElementById('create-dir').addEventListener('submit', async (e) => {
            e.preventDefault();
            let dirName = document.getElementById('dir-name').value;

            if (vPath === undefined || vPath === null || vPath === '') {
                vPath = '/';
            }

            let data = {
                folderName: dirName,
                owner: email,
                Virtualpath: vPath
            };
            
            try {
                let result = await fetch('https://localhost:7147/api/file/folder', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })

                if (result.ok) {
                    dispatch('folderCreated');
                    return;
                } else {
                    dispatch('folderNotCreated');
                    return;
                }
            } catch (err) {
                console.log(err);
                dispatch('folderNotCreated');
                return;
            }

        });

        document.getElementById('closeMe').addEventListener('click', () => {
            dispatch('closeModal');
        });
    });

</script>

<div id = "createModalBackground">
    <div id = "centered">
        <div id = "closeMe">
            X
        </div>
        <form id="create-dir">
            <label for="dir-name" style="margin-bottom: 5px;">Directory Name:</label>
            <input type="text" id="dir-name" name="dir-name" required style="margin-bottom: 5px;">
            <Button>Create</Button>
        </form>
    </div>
</div>

<style>

    #closeMe {
        width: 20px;
        height: 20px;
        position: absolute;
        top: 5px;
        right: 0px;
        cursor: pointer;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: 0.8rem;
        color: #900000;
    }

    #closeMe:hover {
        color: #adadad;
    }

    #centered {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        background-color: white;
        border-radius: 10px;

        padding: 15px;
        width: 180px;
    }

    #create-dir {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    #createModalBackground {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;

        background-color: rgba(0, 0, 0, 0.5);

        transition: opacity 0.5s ease-in-out, visibility 0.5s ease-in-out;
    }

    form {
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
</style>