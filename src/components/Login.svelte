<script>
    import Button from './Button.svelte';
    import { createEventDispatcher } from 'svelte';
    import { goto } from '$app/navigation';
    import { usrData } from '$lib/store.js';

    const dispatch = createEventDispatcher();
    let email = '';
    let password = '';

    const sleep = ms => new Promise(r => setTimeout(r, ms));

    async function login() {
        const res = await fetch('https://localhost:7147/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        .then(res => res.json())
        .then(async data => {
            if (data.status != 404) {
                usrData.set(data);
                await sleep(500);
                goto('/dashboard');
            } else {
                alert("User not found!");
                goto('/');
            }}).catch(err => {
            console.log(err);
            alert("API Unavailable!");
        });
    };

    function changePage() {
        dispatch('changePage');
    };

</script>


<form id = "logon" on:submit|preventDefault={login}>
    <label for="username">Email</label>
    <input type="text" id="username" bind:value={email} />
    <label for="password">Password</label>
    <input type="password" id="password" bind:value={password} />
    <p>No account? No problem! <span class="goRegister" on:click={changePage}>Sign up here.</span></p>
    <Button type="submit">Log In</Button>
</form>


<style>
    #logon {
        display: grid;
        flex-direction: column;
        align-items: center;
        border-radius: 10px;
        padding: 15px;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: 1rem;
        color: #900000;
        background-color: #adadad22;
        border: 1px solid #900000;
        padding: 1.2rem;
    }

    label {
        margin: 0.5rem;
    }

    input {
        margin: 0.5rem;
        padding: 0.4rem;
        border-radius: 5px;
        border: 1px solid #adadad;
    }

    .goRegister {
        color: #900000;
        cursor: pointer;
        text-decoration: underline;
    }

    .goRegister:hover {
        color: #adadad;
    }
</style>