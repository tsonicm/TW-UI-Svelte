<script>
    import user from '$lib/images/user.png';
</script>

<header>
    <div class = "header">
        <div class = "title">
            <h1>We<span>Sync</span></h1>
        </div>
        <div class = "account">
            <img id = "account" src = {user} alt = "Account">
            <p>John Doe</p>
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
        width: 90px;
        height: 120px;
        background-color: #adadad;
        border-radius: 15px;
        float: right;
    }

    #account {
        width: 64px;
        height: 64px;
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