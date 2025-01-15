<div class="book-citation">
    <slot/>
</div>

<style>

.book-citation {
    border-radius: 4px;
    text-align: justify;
    /* border-color: hsl(0 0% 52%); */
    /* border-width: 3px; */
    /* border-style: solid; */
    padding: 1rem;

    background-color: hsl(0 0% 52%);
    /* box-shadow: 0 1mm 4mm hsla(0, 30%, 60%, 0.26); */

    & span,ul,li,p,h2,h3,h4,h5 {
        color: rgb(35, 35, 40);
        font-weight: 600;
    }

    & a {
        color: rgb(70, 60, 65);
    }

    & :is(h2,h3,h4,h5)::after {
        content: unset;
    }

}
</style>