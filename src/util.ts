import Holidays from "date-holidays";

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

export function buildGridForMonth(yearNumber: number, monthNumber: number, fitToFiveRows = false) {
    const numWeeks = 6;
    const numDaysPerWeek = 7;
    const grid = createCalendarGrid(numWeeks, numDaysPerWeek);
    //the index of the weekday (0-6)
    let startWeekdayIndex = new Date(yearNumber, monthNumber - 1, 1).getDay();
    let lastDayOfMonthIndex = new Date(yearNumber, monthNumber, 0).getDate();
    const lastWeekIndex = numWeeks - 1;

    let dayIndex = (startWeekdayIndex + 1) * -1;
    for (let w = 0; w < numWeeks; w++) {
        //force the final rows together if necessary
        let weekIndex = w;
        if (fitToFiveRows && w >= 4) {
            weekIndex = 4;
        }
        for (let d = 0; d < numDaysPerWeek; d++) {
            dayIndex++;
            if (dayIndex >= 0 && dayIndex < lastDayOfMonthIndex) {
                grid[weekIndex][d].daysOfMonth.push(dayIndex + 1);
            }
        }
    }
    //delete empty rows
    outer: for (let w = numWeeks - 1; w >= 0; w--) {
        for (let d = 0; d < numDaysPerWeek; d++) {
            if (grid[w][d].daysOfMonth.length > 0) {
                continue outer;
            }
        }
        grid.splice(w);
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

//christmas and vday - red
//july 4, labor day - blue
// thanksgiving - yellowish orange
// father's day

export function getHolidays(year: number) {
    const holidays = new Holidays("US", "pa").getHolidays(year);
    const keepers = new Map<string, { color?: string; name?: string }>([
        [`New Year's Day`, { color: 'default' }],
        [`Martin Luther King Jr. Day`, { color: 'default', name: `Martin Luther King's Birthday` }],
        [`Valentine's Day`, { color: 'red' }],
        [`Presidents' Day`, { color: 'default' }],
        [`Easter Sunday`, { color: 'default', name: 'Easter' }],
        [`Mother's Day`, { color: 'yellow' }],
        [`Memorial Day`, { color: 'default' }],
        [`Father's Day`, { color: 'default' }],
        [`Independence Day`, { color: 'blue', name: '4th of July' }],
        [`Labor Day`, { color: 'blue' }],
        [`Columbus Day`, { color: 'default' }],
        [`Veteran's Day`, { color: 'default' }],
        [`Thanksgiving Day`, { color: 'orange', name: 'Thanksgiving' }],
        [`Christmas Day`, { color: 'red', name: 'Christmas' }]
    ]);

    const result = holidays.map((x) => {
        if (keepers.has(x.name)) {
            const holiday = x as unknown as Holiday;
            const date = new Date(x.start);
            holiday.color = keepers.get(x.name)?.color ?? 'default';
            holiday.name = keepers.get(x.name)?.name ?? x.name;
            holiday.year = date.getFullYear();
            holiday.month = date.getMonth() + 1;
            holiday.day = date.getDate();
            return x;
        }
    }).filter(x => !!x) as unknown as Holiday[];
    result.push({
        year: year,
        month: 3,
        day: 17,
        name: `St. Patrick's Day`,
        color: 'green'
    });

    //add good friday
    const easter = result.find(x => x.name.toLowerCase().startsWith('easter'));
    result.push({
        year: year,
        month: easter.month,
        day: easter.day - 2,
        name: 'Good Friday',
        color: 'default'
    });

    return result;
}


export interface Holiday {
    name: string;
    year: number;
    /**
     * The 1-based month number
     */
    month: number;
    /**
     * The 1-based day number
     */
    day: number;
    /**
     * The class name of the color this column should be
     */
    color: string;
}
