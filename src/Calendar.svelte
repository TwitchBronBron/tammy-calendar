<script lang="ts">
    import { buildGridForMonth, getMonthName } from "./util";
    import type { Holiday } from "./util";

    export let year: number;
    export let month: number;
    export let fitToFiveRows: boolean;
    export let isMini = false;
    export let holidays = [] as Holiday[];

    $: grid = buildGridForMonth(year, month, fitToFiveRows);
    const monthName = getMonthName(month - 1);
    function dow(fullDow: string) {
        if (isMini) {
            return fullDow.substring(0, 3).toUpperCase();
        } else {
            return fullDow;
        }
    }

    function getHoliday(cell: { daysOfMonth: number[] }) {
        return holidays.find(
            (x) =>
                x.year === year &&
                x.month === month &&
                cell.daysOfMonth.includes(x.day)
        );
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
                    <td class="cell {getHoliday(cell)?.color ?? ''}">
                        <span class="day1">{cell.daysOfMonth[0] ?? ""}</span>
                        <p class="holiday">
                            {getHoliday(cell)?.name ?? ""}
                        </p>
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
        border: var(--border);
    }

    th,
    td {
        margin: 0;
        border: 1px solid black;
    }

    .mini th,
    .mini td {
        border: 1px solid black;
    }
    .header {
        display: table-cell;
    }
    th {
        font-size: 1.5em;
        height: 2em;
        text-align: center;
        vertical-align: middle;
        background-color: lightgrey;
    }

    td {
        height: 3.5em;
        font-size: 2em;
        overflow: hidden;
        white-space: nowrap;
        position: relative;
    }

    .mini th {
        background-color: lightgrey;
        height: 0.5em;
        padding: 0.2em;
        padding-bottom: 0.4em;
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
        top: 0.1em;
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

    .cell {
        text-align: center;
        vertical-align: middle;
        width: 100px;
        height: 100px;
    }
    .cell .holiday {
        font-size: 0.5em;
        display: inline-block;
        white-space: normal;
        font-weight: bold;
    }

    .cell.default {
        background-color: #ebd7e1;
    }
    .cell.red {
        background-color: #ff4c4c;
    }
    .cell.blue {
        background-color: #9dc3e6;
    }
    .cell.green {
        background-color: #00b050;
    }
    .cell.yellow {
        background-color: #f0f52d;
    }
    .cell.orange {
        background-color: #ffc000;
    }
</style>
