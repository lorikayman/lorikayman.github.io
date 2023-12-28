<script>
    import { List } from "svelte-bootstrap-icons"
    import { nextPageName, doesPageDiffer, currentPageName } from "$lib/stores/mawanet.loader";
</script>

<div class="sidebar" class:nextpage={$doesPageDiffer}>
    <div class="main">
    <a class='index' href="/mawanet/index">
        <List width={34} height={34}/>
    </a>
    </div>
    <a class='index' href="/mawanet/index"><span class="sidebar-span">CENTRAL</span></a>
    <span class="sidebar-span">//</span>
    <span class="sidebar-span" class:nextpagetext={$doesPageDiffer}>{$nextPageName}</span>
</div>

<style>
    .main {
        border-radius: 4px;
        padding: .3em;
        margin-bottom: .2em;
    }
    .main:hover {
        background-color: rgba(30, 30, 33, 0.5);
    }

    .sidebar {
        background-color: rgb(45, 45, 48);
        
        position: fixed;
        padding: 3.4em 0em;
        width: 3.2em;
        height: fit-content;
        display: flex;
        align-items: center;
        writing-mode: vertical-rl;
        text-orientation: mixed;

        border-radius: 4px;
        border-style: hidden;
        border-color: rgb(45, 45, 48);

        & span {
            font-size: 1.4em;
            padding: 0.3em 0em;
        }

    }
    .sidebar :is(svg, a):hover {
        transition-duration: 40ms;
    }

    .sidebar a:first-child:hover {
        color: rgb(245, 181, 5);
    }

    .sidebar a:not(:first-child):hover {
        color: rgb(164, 164, 164);
    }

    .sidebar.nextpage {
        width: 3em !important;
        border-style: solid;
        border-image-source: linear-gradient(
            -40deg,
            hsl(357, 90%, 60%),
            hsl(16, 90%, 60%),
            hsl(25, 90%, 60%)
        );
        border-image-slice: 12;
        /* filter: drop-shadow(0 0 2mm hsla(325, 91%, 60%, 0.2)); */
        filter: drop-shadow(0 0 2mm hsla(48, 91%, 60%, 0.2));

        animation-name: floating;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;
        animation-duration: 800ms;
    }

    .nextpagetext {
        color: hsl(187, 90%, 60%);
        filter: drop-shadow(0 2mm 3mm hsla(187, 90%, 60%, 0.7));
    }

    @keyframes floating {
        0% { transform: translate(0px, 0px); }
        25%  { transform: translate(1px, 0px); }
        50%  { transform: translate(1px, 1px); }
        100%   { transform: translate(0px, 0px); }
    }

</style>