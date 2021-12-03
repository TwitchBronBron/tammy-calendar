<script lang="ts">
    import Calendar from './Calendar.svelte';
    import { getMonthName, getLastMonth, Holiday } from './util';

    export let year: number;
    export let month: number;
    export let holidays: Holiday[];

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
                        fitToFiveRows={false}
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
            <Calendar
                year={year}
                month={month}
                fitToFiveRows={true}
                holidays={holidays}
            />
        </div>
    </div>
    <h1>{monthName}</h1>
</div>

<style>
    :root {
        --page-width: 14in;
        --page-height: calc(var(--page-width) / 1.64);
        --calendar-height: calc(0.75 * var(--page-height));
        --border: 0.2em solid black;
    }
    h1 {
        text-align: center;
        font-size: 4em;
    }
    .top-section {
        display: flex;
    }
    .page {
        /* border: 1px solid red; */
        width: var(--page-width);
        height: var(--page-height);
        padding: 0.7in;
        padding-top: 1.3in;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        box-sizing: border-box;
        page-break-after: always;
    }
    .left-column {
        display: inline-block;
        height: var(--calendar-height);
        /* border: 3px solid green; */
        display: inline-flex;
        flex-direction: column;
    }
    .left-border {
        border: var(--border);
        display: flex;
        flex-direction: column;
        padding: 10px;
        flex: 1;
        overflow: hidden;
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
        border: 0;
        height: 0;
        border-bottom: 0.05em solid black;
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
        height: var(--calendar-height);
        /* border: 1px solid blue; */
        overflow: hidden;
    }

    .last-month-name {
        width: 100%;
        text-align: center;
        font-size: 1em;
        padding-bottom: 0.5em;
    }
</style>
