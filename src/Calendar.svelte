<script lang="ts">
    import { buildGridForMonth, getMonthName } from "./util";

    export let year: number;
    export let month: number;
    export let isMini = false;

    const grid = buildGridForMonth(year, month);
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
            <th><div>{dow("Sunday")}</div></th>
            <th><div>{dow("Monday")}</div></th>
            <th><div>{dow("Tuesday")}</div></th>
            <th><div>{dow("Wednesday")}</div></th>
            <th><div>{dow("Thursday")}</div></th>
            <th><div>{dow("Friday")}</div></th>
            <th><div>{dow("Saturday")}</div></th>
        </tr>
    </thead>
    <tbody>
        {#each grid as row}
            <tr>
                {#each row as cell}
                    <td>{cell.daysOfMonth[0]}</td>
                {/each}
            </tr>
        {/each}
    </tbody>
</table>

<style>
    table {
        table-layout: fixed;
        width: 100%;
    }
    th,
    td {
        margin: 0;
        border: 3px solid black;
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
    }

    .mini th {
        background-color: lightgrey;
        height:.5em;
        padding: .2em;
    }

    .mini td {
        height: 2em;
        text-align: center;
        vertical-align: middle;
    }
</style>
