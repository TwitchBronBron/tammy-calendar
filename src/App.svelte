<script lang="ts">
    import CalendarPage from "./CalendarPage.svelte";
    import { getHolidays } from "./util";
    let currentYear = new Date().getFullYear();
    let year = currentYear + 1;
    $: holidays = getHolidays(year);
    let y = currentYear - 20;
    const years = new Array(40).fill(undefined).map((x) => y++);
</script>

<div class="main-page">
    {#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as month}
        <CalendarPage month={month} year={year} holidays={holidays} />
    {/each}
</div>
<div class="controlbar noprint">
    <div>
        Year:
        <button on:click={() => year--}>&minus;</button>
        <select bind:value={year}>
            {#each years as loopYear}
                <option value={loopYear}>{loopYear}</option>
            {/each}
        </select>
        <button on:click={() => year++}>&plus;</button>
    </div>
</div>

<style>
    .main-page {
        margin: auto;
        width: 14in;
    }
    .controlbar {
        position: fixed;
        bottom: 0px;
        left: 0px;
        right: 0px;
        height: 60px;
        background-color: #343a40;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0px 14px 20px 9px black;
    }
    @media print {
   .noprint {
      visibility: hidden;
   }
}
</style>
