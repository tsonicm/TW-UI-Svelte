<script>
    import Button from './Button.svelte';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    let email = '';
    let firstName = '';
    let lastName = '';
    let password = '';
    let passwordTwo = '';

    function register() {
        if (email === '' || password === '' || firstName === '') {
            alert('Please fill out all fields with an asterisk!');
            return;
        } else if (password !== passwordTwo) {
            alert('Passwords do not match!');
            return;
        } else if (firstName === '') {
            alert('Please fill out a first name!');
        }else {
            const data = {
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: password
            };
            fetch('https://localhost:7147/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            }).then(location.reload());
        }
    };

    function changePage() {
        dispatch('changePage');
    };

</script>


<form id = "logon" on:submit|preventDefault={register}>
    <div class="details">
        <label for="email" class:valid={/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)}>Email *</label>
        <input type="text" id="email" bind:value={email} />
        <label for="firstName" class:valid={firstName}>First Name *</label>
        <input type="text" id="firstName" bind:value={firstName} />
        <label for="lastName" class:valid={lastName}>Last Name</label>
        <input type="text" id="lastName" bind:value={lastName} />
    </div>
    <hr style="height: 100%; color: #900000" />
    <div class="password-area">
        <label for="password" class:valid={password === passwordTwo && password!= ""}>Password *</label>
        <input type="password" id="password" bind:value={password} />
        <label for="passwordTwo" class:valid={password === passwordTwo && password!= ""}>Confirm Password *</label>
        <input type="password" id="passwordTwo" bind:value={passwordTwo}/>
        <ul>
            <li class:valid={password.length >= 8}>At least 8 characters</li>
            <li class:valid={/[A-Z]/.test(password)}>At least 1 uppercase letter</li>
            <li class:valid={/[a-z]/.test(password)}>At least 1 lowercase letter</li>
            <li class:valid={/[0-9]/.test(password)}>At least 1 number</li>
        </ul>
    </div>
    <p class="bottomText">Already have an account? <span class="goLogin" on:click={changePage}>Sign in</span> instead.</p>
    <Button type="submit" class="span-three">Sign up</Button>
</form>


<style>

    ul {
        margin-top: 0;
        margin-bottom: 0;
        margin-left: -15px;
    }

    .valid {
        color: green;
    }

    #logon {
        display: grid;
        grid-template-columns: 200px 5px 200px;
        grid-template-areas:
            '. . .'
            '.'
            '.';
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

    .details {
        display: flex;
        flex-direction: column;
        align-items: left;
        justify-content: center;
        margin-top: 4px;
    }

    .password-area {
        display: flex;
        flex-direction: column;
        align-items: left;
        justify-content: center;
    }

    .bottomText {
        grid-column: span 3;
        text-align: center;
        margin: 10px;
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

    .goLogin {
        color: #900000;
        cursor: pointer;
        text-decoration: underline;
    }

    .goLogin:hover {
        color: #adadad;
    }
</style>