<script>
    import { onMount } from 'svelte';
    import { usrData } from '$lib/store.js';
    import { get } from 'svelte/store';
    import { createEventDispatcher } from 'svelte';

    export let vPath;

    const dispatch = createEventDispatcher();
    let email = get(usrData).email;

    onMount(() => {
        document.getElementById('create-dir').addEventListener('submit', (e) => {
            e.preventDefault();
            let dirName = document.getElementById('dir-name').value;
            let data = {
                folderName: dirName,
                owner: email,
                Virtualpath: vPath
            };
            fetch('https://localhost:7147/api/directory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(data => {
                if (data.status === 200) {
                    dispatch('folderCreated');
                } else {
                    dispatch('folderNotCreated');
                }
            })
            .catch(err => {
                console.log(err);
                alert('API Unavailable!');
            });
        });
    });

</script>

<div id="centered">
    <form id="create-dir">
        <label for="dir-name">Directory Name:</label>
        <input type="text" id="dir-name" name="dir-name" required>
        <input type="submit" value="Create">
    </form>
</div>

<style>
    #centered {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    #create-dir {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
</style>