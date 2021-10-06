<script lang="ts">
    import { buildGridForMonth, getMonthName } from "./util";

    export let year: number;
    export let month: number;
    export let weeks: number;
    export let isMini = false;

    const grid = buildGridForMonth(year, month, weeks);
    const monthName = getMonthName(month - 1);
    function dow(fullDow: string) {
        if (isMini) {
            return fullDow.substring(0, 3).toUpperCase();
        } else {
            return fullDow;
        }
    }
</script>

<table class={isMini ? "mini" : "full"}>
    <thead>
        <tr>
            <th class="header"><div>{dow("Sunday")}</div></th>
            <th class="header"><div>{dow("Monday")}</div></th>
            <th class="header"><div>{dow("Tuesday")}</div></th>
            <th class="header"><div>{dow("Wednesday")}</div></th>
            <th class="header"><div>{dow("Thursday")}</div></th>
            <th class="header"><div>{dow("Friday")}</div></th>
            <th class="header"><div>{dow("Saturday")}</div></th>
        </tr>
    </thead>
    <tbody>
        {#each grid as row}
            <tr>
                {#each row as cell}
                    <td class="cell">
                        <span class="day1">{cell.daysOfMonth[0] ?? ""}</span>
                        {#if cell.daysOfMonth[1]}
                            <span class="day2">{cell.daysOfMonth[1]}</span>
                        {/if}
                    </td>
                {/each}
            </tr>
        {/each}
    </tbody>
</table>

<style>
    table {
        table-layout: fixed;
        width: 100%;
        height: 100%;
    }
    th,
    td {
        margin: 0;
        border: 3px solid black;
    }
    .header {
        display: table-cell;
    }
    th {
        font-size: 1.6em;
        height: 2em;
        text-align: center;
        vertical-align: middle;
        background-color: lightgrey;
    }

    td {
        height: 3.5em;
        font-size: 2em;
        padding-left: 0.15em;
        padding-top: 0.15em;
        overflow: hidden;
        white-space: nowrap;
        position: relative;
    }

    .mini th {
        background-color: lightgrey;
        height: 0.5em;
        padding: 0.2em;
    }

    .mini td {
        height: 2em;
        text-align: center;
        vertical-align: middle;
        position: initial !important;
    }
    .day1 {
        display: inline-block;
        position: absolute;
        left: 0.1em;
        left: 0.1em;
    }
    .day2 {
        display: inline-block;
        position: absolute;
        bottom: 0.1em;
        right: 0.1em;
    }
    .mini .day1,
    .mini .day2 {
        position: initial;
    }
</style>
