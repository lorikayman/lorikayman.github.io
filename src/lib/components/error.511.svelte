<div class="wave-effect">
    <h4>Unauthorized // 511</h4>
</div>

<style>

h4 {
    color: hsl(0, 1%, 82%);
    font-weight: 200;
}

.wave-effect {

    margin: 0.6rem 0rem;
    border-radius: 4px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: linear-gradient(to bottom, hsl(0, 10%, 15%) 28%, hsl(0, 80%, 36%) 110%);
    background-size: 140% 140%;

    animation: waves 10s ease infinite;
}

@keyframes waves {
    0%{background-position: 50% 0%}
    50%{background-position: 50% 100%}
    100%{background-position: 50% 0%}
}

</style>
