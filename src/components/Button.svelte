<script>
    let buttonProps = {
        class: [$$restProps.class]
    }
</script>

<button on:click on:mouseover on:focus on:mouseenter on:mouseleave {...buttonProps}>
    <slot />
</button>

<style>
    button {
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: 1rem;
        color: #900000;
        background-color: #ffffff;
        border: 1px solid #900000;
        border-radius: 5px;
        padding: 0.4rem;
        cursor: pointer;
    }

    button:hover {
        background-color: #900000;
        color: #ffffff;
    }

    .active {
        background-color: #900000;
        color: #ffffff;
    }

    .activeIMG {
        filter: invert(100%);
    }

    .btn {
        margin: 0 0 0 1rem;
    }

    .center-content {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>