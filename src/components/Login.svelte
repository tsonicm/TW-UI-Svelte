<script>
    import Button from './Button.svelte';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    let username = '';
    let password = '';

    const sleep = ms => new Promise(r => setTimeout(r, ms));

    async function login() {
        console.log('username: ' + username);
        console.log('password: ' + password);
        await sleep(1000);
        location.href = '/dashboard';
    };

    function changePage() {
        dispatch('changePage');
    };

</script>


<form id = "logon" on:submit|preventDefault={login}>
    <label for="username">Email</label>
    <input type="text" id="username" bind:value={username} />
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