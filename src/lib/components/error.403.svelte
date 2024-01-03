<script>
    // import { FileLock2Fill } from "svelte-bootstrap-icons";
</script>

<div class="subcontent">
    <center>
        <h2 class="error403">
            <!-- <FileLock2Fill width={22} height={22}/> Access Denied <FileLock2Fill width={22} height={22}/> -->
            Access Denied
        </h2>
    </center>
</div>


<style>
div.subcontent {
    padding: 1rem 0rem;
}
h2.error403 {
    font-weight: 800;
    padding: 6px;
    background-color: rgba(193, 39, 65, 0.619) !important;
    border-radius: 5px;
    filter: drop-shadow(0 0.2em 0.16rem rgba(193, 39, 65, 0.9)) !important;

    & > svg {
        margin-bottom: -4px;
    }
}
</style>