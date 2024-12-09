<script>
    /**
     * @module SecureEnclaveA
     */

    import { slide } from 'svelte/transition'
    import { createCollapsible, melt } from '@melt-ui/svelte'

    import { Fullscreen, ArrowBarUp } from "svelte-bootstrap-icons"

    const {
        elements: { root, content, trigger },
        states: { open }
    } = createCollapsible({
        forceVisible: false,
    })
</script>

<div use:melt={$root}>
    <center>
        <div class="warning-stripes"/>
        <button use:melt={$trigger} class="nier-access-point-trigger">
            {#if $open}
                <span class="nier-access-point-close"><ArrowBarUp/> Revoke access</span>
                to
            {:else}
                <span class="nier-access-point-access"><Fullscreen/> Access</span>
            {/if}
            NIER | Secure Enclave <span class="nier-access-enclave">A</span>
        </button>
        <div class="warning-stripes"/>
    </center>
    {#if $open}
    <div transition:slide class="nier-enclave-a">
        <slot/>
    </div>
    {/if}
</div>

<style>

center {
    display: flex;
    margin: 1.2rem 0rem;
    width: 120%;
    margin-left: -10%;
    gap: 0.8rem;

    flex-wrap: nowrap;
    align-items: center;
    flex-direction: row;
    justify-content: flex-start;

    & > div {
        flex: 1;
        &:first-of-type {
            border-top-left-radius: 8px;
            border-bottom-left-radius: 8px;
        }
        &:last-of-type {
            border-top-right-radius: 8px;
            border-bottom-right-radius: 8px;
        }
    }
    & > button {
        flex: 3;
    }
}

.nier-access-point-trigger {
    font-size: 1.12rem;
    padding: 0.5rem 0.8rem;

    background-color: rgb(45, 45, 48);
    margin: 0em;
    border-width: 1px;
    border-style: solid;
    border-radius: 5px;
    border-color: rgb(55,55,63);
    cursor: pointer;

    & svg {
        margin-bottom: -3px;
        margin-right: 3px;
    }

    &:hover {
        background-color: rgb(50, 50, 54);
    }
}

.nier-access-point-access {
    color: hsl(49, 71%, 74%);
    font-weight: bolder;
}
.nier-access-point-close {
    color: hsl(0, 71%, 74%);
    font-weight: bolder;
}

.nier-access-enclave {
    color: hsl(145, 60%, 70%);
    font-weight: bold;
}

.warning-stripes {
    height: 2rem;
    background-color: hsl(50, 66%, 66%);
    background-image: repeating-linear-gradient(120deg, transparent, transparent 22px, rgb(0,0,0) 1px 50px);
    box-shadow: 0 0 6mm hsla(38, 57%, 69%, 0.36);
}

.nier-enclave-a {
    border-radius: 4px;
    border-color: hsl(145, 30%, 60%);
    border-width: 3px;
    border-style: solid;
    padding: 1rem;

    /* background-color: hsl(145, 30%, 60%); */
    /* box-shadow: 0 15mm 4mm hsla(145, 30%, 60%, 0.26); */

    /* & span,ul,li,p,h2,h3,h4,h5 {
        color: rgb(35, 35, 40);
        font-weight: 600;
    }

    & a {
        color: rgb(100, 100, 110);
    } */
}

</style>