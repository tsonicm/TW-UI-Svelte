<script>
    import sha256 from 'js-sha256';
    import { goto } from '$app/navigation';
    import { get } from 'svelte/store';
    import { usrData } from '$lib/store.js';
    import { onMount } from 'svelte';

    let email = 'John.Doe@host.tld';
    let firstName = 'John';
    let lastName = 'Doe';

    onMount (() => {
        if (get(usrData).email === undefined || get(usrData).email === '' || get(usrData).email === null) {
            // goto('/');
        } else {
            email = get(usrData).email;
            firstName = get(usrData).firstName;
            lastName = get(usrData).lastName;
        }
    });

</script>

<header>
    <div class = "header">
        <div class = "title">
            <h1>We<span>Sync</span></h1>
        </div>
        <div class = "account">
            <img id = "pfp" src = 'https://gravatar.com/avatar/{sha256(email)}' alt = "Profile Picture">
            <p class = "name">{firstName} {lastName}</p>
        </div>
    </div>
    <hr>
</header>

<style>
    .header {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        height: 120px;
        text-align: center;
    }

    .account {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 120px;
        height: 120px;
        float: right;
    }

    #pfp {
        width: 64px;
        height: 64px;
    }

    .name {
        margin: 5px;
    }

    .title {
        text-align: left;
        vertical-align: middle;
        float: left;
        width: 90%;
        margin: 0 0 0 1rem;
    }

    h1 {
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: 4rem;
        color: #900000
    }

    p {
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }

    span {
        color: #adadad;
    }

    hr {
        width: 100%;
        border: 1px solid #adadad;
    }
</style>