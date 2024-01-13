<script>
    import Button from '../components/Button.svelte';
    import Login from '../components/Login.svelte';
    import { scale } from 'svelte/transition'
    
    function loginClick() {
        showLogin = true;
    }

    let showLogin = false;

</script>

<div class="container">
    <div class = "content">
        <h1 class="logo">We<span class="logo">Sync</span></h1>
        <section id="form-area">
            {#if !showLogin}
                <div id='splash' class="">
                    <Button class="big" on:click={loginClick}>Login</Button>
                    <Button class="big margin-left">Register</Button>
                </div>
            {:else}
                <div id="login-form" transition:scale>
                    <Login />
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

    #login-form {
        display: flex;
    }

    .hidden {
        display: none !important;
    }
</style>
