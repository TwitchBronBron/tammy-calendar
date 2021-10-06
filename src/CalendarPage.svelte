<script lang="ts">
    import Calendar from "./Calendar.svelte";
    import { getMonthName, getLastMonth } from "./util";

    export let year: number;
    export let month: number;

    const monthName = getMonthName(month - 1);
    const lastMonth = getLastMonth(month - 1, year);
</script>

<div class="page">
    <div class="top-section">
        <div class="left-column">
            <div class="header">{monthName} {year}</div>
            <div class="left-border">
                <div class="last-month-name">
                    {lastMonth.monthName}
                    {lastMonth.year}
                </div>
                <div class="last-month-calendar">
                    <Calendar
                        year={year}
                        month={month - 1}
                        weeks={6}
                        isMini={true}
                    />
                </div>
                <div class="notes">
                    <hr />
                    <hr />
                    <hr />
                    <hr />
                    <hr />
                    <hr />
                    <hr />
                    <hr />
                    <hr />
                    <hr />
                    <hr />
                    <hr />
                </div>
            </div>
        </div>
        <div class="calendar">
            <Calendar year={year} month={month} weeks={5} />
        </div>
    </div>
    <h1>{monthName}</h1>
</div>

<style>
    h1 {
        text-align: center;
        font-size: 4em;
    }
    .top-section {
        display: flex;
    }
    .page {
        width: 14in;
        height: 8.5in;
        padding: 0.5in;
        display: flex;
        flex-direction: column;
        border: 1px solid red;
        overflow: hidden;
        box-sizing: border-box;
    }
    .left-column {
        display: inline-block;
        height: 100%;
        display: inline-flex;
        flex-direction: column;
    }
    .left-border {
        border: 0.2em solid black;
        display: flex;
        flex-direction: column;
        padding: 10px;
        flex: 1;
    }
    .last-month-calendar {
        font-size: 0.3em;
        width: 200px;
    }
    .header {
        height: 1.4em;
        background-color: transparent;
    }
    hr {
        width: 100%;
        height: 2px;
        background-color: black;
        margin-top: 0.3in;
    }
    .notes {
        margin-top: 10px;
        flex: 1;
        height: 100%;
        overflow: hidden;
    }

    .calendar {
        margin-left: 10px;
        height: 7in;
    }

    .last-month-name {
        width: 100%;
        text-align: center;
        font-size: 1em;
        padding-bottom: 0.5em;
    }
</style>
