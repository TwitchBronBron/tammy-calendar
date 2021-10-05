<script lang="ts">
    import Calendar from "./Calendar.svelte";
    import { getMonthName, getLastMonth } from "./util";

    export let year: number;
    export let month: number;

    const monthName = getMonthName(month - 1);
    const lastMonth = getLastMonth(month - 1, year);
</script>

<div class="container">
    <div class="left-column">
        <div class="last-month-calendar">
            <div class="last-month-name">
                {lastMonth.monthName}
                {lastMonth.year}
            </div>
            <Calendar year={year} month={month - 1} weeks={6} isMini={true} />
        </div>
        <div class="notes">
            <div class="line" />
            <div class="line" />
            <div class="line" />
            <div class="line" />
            <div class="line" />
            <div class="line" />
            <div class="line" />
            <div class="line" />
            <div class="line" />
        </div>
    </div>
    <div class="calendar">
        <Calendar year={year} month={month} weeks={5} />
        <h1>{monthName} {year}</h1>
    </div>
</div>

<style>
    h1 {
        text-align: center;
        font-size: 1in;
    }
    .container {
        width: 14in;
        height: 8.5in;
        border: 1px solid red;
        padding: 0.5in;
        display: flex;
    }
    .left-column {
        display: inline-block;
        border: 2px solid black;
        padding: 10px;
    }
    .last-month-calendar {
        font-size: 0.3em;
        width: 200px;
    }
    .line {
        width: 100%;
        height: 2px;
        background-color: black;
        margin-top: 0.3in;
    }
    .notes {
        margin-top: 10px;
        border: 2px solid black;
        padding: 5px;
    }

    .calendar {
        margin-left: 20px;
    }

    .last-month-name {
        width: 100%;
        text-align: center;
        font-size: 3em;
    }
</style>
