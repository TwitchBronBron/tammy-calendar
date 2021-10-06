<script lang="ts">
    import CalendarPage from "./CalendarPage.svelte";
    import { getHolidays } from "./util";

    let year = new Date().getFullYear() + 1;
    $: holidays = getHolidays(year);
    year = 2021;
</script>

<div class="main-page">
    {#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as month}
        <CalendarPage month={month} year={year} holidays={holidays} />
    {/each}
</div>

<style>
    .main-page {
        margin: auto;
        width: 14in;
    }
</style>
