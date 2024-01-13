<script>
    import Button from './Button.svelte';

    let username = '';
    let password = '';

    function login() {
        console.log('username: ' + username);
        console.log('password: ' + password);
    };

</script>


<form id = "logon" on:submit|preventDefault={login}>
    <label for="username">Username</label>
    <input type="text" id="username" bind:value={username} />
    <label for="password">Password</label>
    <input type="password" id="password" bind:value={password} />
    <p>Don't have an account? <a href = "/register">Create one.</a></p>
    <Button type="submit">Login</Button>
</form>


<style>
    #logon {
        display: inherit;
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
</style>