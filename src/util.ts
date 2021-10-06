/**
 * Returns an array of calendar week rows with day columns
 */
export function createCalendarGrid(numWeeks: number, numDays: number) {
    const rows = [] as Array<Array<{ daysOfMonth: number[]; holidayName: string; }>>;
    for (let i = 0; i < numWeeks; i++) {
        const row = [];
        for (let j = 0; j < numDays; j++) {
            row.push({
                daysOfMonth: []
            });
        }
        rows.push(row);
    }
    return rows;
}

export function buildGridForMonth(yearNumber: number, monthNumber: number, numWeeks: number) {
    const numDaysPerWeek = 7;
    const grid = createCalendarGrid(numWeeks, numDaysPerWeek);
    //the index of the weekday (0-6)
    let startWeekdayIndex = new Date(yearNumber, monthNumber - 1, 1).getDay();
    let lastDayOfMonthIndex = new Date(yearNumber, monthNumber, 0).getDate();
    const lastWeekIndex = numWeeks - 1;

    let dayIndex = (startWeekdayIndex + 1) * -1;
    for (let w = 0; w < numWeeks; w++) {
        //skip creating empty weeks
        if (dayIndex >= lastDayOfMonthIndex) {
            grid.splice(w, 1);
            continue;
        }
        //force the final rows together if necessary
        let weekIndex = w < 4 ? w : 4;
        for (let d = 0; d < numDaysPerWeek; d++) {
            dayIndex++;
            if (dayIndex >= 0 && dayIndex < lastDayOfMonthIndex) {
                grid[weekIndex][d].daysOfMonth.push(dayIndex + 1);
            }
        }
    }
    console.log(grid);

    return grid;
}

/**
 * Get the name of the month given the zero-based month index (0=january)
 */
export function getMonthName(monthIndex: number) {
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    return monthNames[monthIndex];
}

export function getLastMonth(currentMonthIndex: number, currentYear: number) {
    const lastMonthIndex = (12 + currentMonthIndex - 1) % 12;
    return {
        monthIndex: lastMonthIndex,
        monthName: getMonthName(lastMonthIndex),
        year: lastMonthIndex > currentMonthIndex ? currentYear - 1 : currentYear
    }
}
