<script>
    /**
     * @module SecureEnclaveA
     */

    import { slide } from 'svelte/transition'
    import { createCollapsible, melt } from '@melt-ui/svelte'
    const {
    elements: { root, content, trigger },
    states: { open }
    } = createCollapsible({
        forceVisible: false,
    })
</script>

<div use:melt={$root}>
    <p use:melt={$trigger} class="niem-access-point-trigger">
        <button>
            {#if $open}
                <span class="niem-access-point-close">Revoke access</span>
                to
            {:else}
                <span class="niem-access-point-access">Access</span>
            {/if}
            data at <span class="niem-access-enclave">NIEM Secure Enclave A</span>
        </button>
    </p>
    {#if $open}
    <div transition:slide class="niem-enclave-a">
        <slot/>
    </div>
    {/if}
</div>

<style>

.niem-access-point-trigger {
    & > button {
        font-size: 1.02rem;
        padding: 0.3rem 0.5rem;

        background-color: rgb(40,40,45);
        margin: 0em;
        border-width: 1px;
        border-style: solid;
        border-radius: 5px;
        border-color: rgb(80,80,85);
        cursor: pointer;

        &:hover {
            background-color: rgb(50,50,55);
            /* border-color: rgb(75,75,80); */
        }
    }
}

.niem-access-point-access {
    color: hsl(49, 71%, 74%);
    font-weight: bolder;
}
.niem-access-point-close {
    color: hsl(0, 71%, 74%);
    font-weight: bolder;
}

.niem-access-enclave {
    color: hsl(145, 70%, 70%);
    font-weight: bold;

    &::before {
        content: '[ ';
    }
    &::after {
        content: ' ]';
    }
}

.niem-enclave-a {
    border-radius: 4px;
    border-color: hsl(145, 70%, 70%);
    border-width: 1px;
    border-style: solid;
    padding: 1rem;
}

</style>