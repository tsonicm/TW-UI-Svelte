<script>
    import Button from '../components/Button.svelte';
    import Login from '../components/Login.svelte';
    import Register from '../components/Register.svelte';
    import { blur } from 'svelte/transition'

    function loginClick() {
        showLogin = true;
    }

    function registerClick() {
        showRegister = true;
    }

    let showLogin = false;
    let showRegister = false;

    function switchLoginRegister(event) {
        showLogin = !showLogin;
        showRegister = !showRegister;
    }

</script>

<div class="container">
    <div class = "content">
        <h1 class="logo">We<span class="logo">Sync</span></h1>
        <section id="form-area">
            {#if !showLogin && !showRegister}
                <div>
                    <Button class="big" on:click={loginClick}>Login</Button>
                    <Button class="big margin-left" on:click={registerClick}>Sign up</Button>
                </div>
            {:else if showLogin}
                <div id="form" in:blur>
                    <Login on:changePage={switchLoginRegister}/>
                </div>
            {:else if showRegister}
                <div id="form" in:blur>
                    <Register on:changePage={switchLoginRegister}/>
                </div>
            {/if}
        </section>
    </div>
</div>

<style>
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 10px;
        padding: 15px;
    }

    h1.logo {
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: 4rem;
        color: #900000;
        margin: 0;
        margin-bottom: 30px;
    }

    span.logo {
        color: #adadad;
    }

    #form-area {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #form {
        display: flex;
        position: relative;
    }
</style>
