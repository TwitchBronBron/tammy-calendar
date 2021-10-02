/**
 * Returns an array of calendar week rows with day columns
 */
export function createCalendarGrid(numWeeks: number, numDays: number) {
    const rows = [] as Array<Array<{ daysOfMonth: number[]; holidayName: string; }>>;
    for (let i = 0; i < numWeeks; i++) {
        const row = [];
        for (let j = 0; j < numDays; j++) {
            row.push({
                daysOfMonth: [],
                holidayName: null
            });
        }
        rows.push(row);
    }
    return rows;
}

export function buildGridForMonth(year: number, month: number) {
    const rowCount = 6;
    const cellCount = 7;
    const grid = createCalendarGrid(rowCount, cellCount);

    let startWeekday = new Date(year, month - 1, 1).getDay();

    const daysInMonth = 32 - new Date(year, month - 1, 32).getDate();

    for (var i = 0; i < rowCount * cellCount; i++) {
        const rowIndex = i % rowCount;;
        const cellIndex = i % cellCount;;
        const cell = grid[rowIndex][cellIndex];
        cell.daysOfMonth.push(i);
    }

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
