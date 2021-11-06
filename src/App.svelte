<script lang="ts">
    import CalendarPage from "./CalendarPage.svelte";
    import { getHolidays } from "./util";

    let currentYear = new Date().getFullYear();
    let year = currentYear + 1;
    $: holidays = getHolidays(year);
    let y = currentYear - 20;
    const years = new Array(40).fill(undefined).map((x) => y++);
    let isExportingPdf = false;

    async function exportToPdf() {
        isExportingPdf = true;
        try {
            const pages = [...document.querySelectorAll(".page")];
            let pdf;
            for (let i = 0; i < pages.length; i++) {
                const canvas = await html2canvas(pages[i]);
                let width = canvas.width;
                let height = canvas.height;

                if (i === 0) {
                    //set the orientation
                    if (width > height) {
                        pdf = new jspdf.jsPDF("l", "px", [width, height]);
                    } else {
                        pdf = new jspdf.jsPDF("p", "px", [height, width]);
                    }
                } else {
                    pdf.addPage();
                }
                //then we get the dimensions from the 'pdf' file itself
                width = pdf.internal.pageSize.getWidth();
                height = pdf.internal.pageSize.getHeight();
                pdf.addImage(canvas, "JPEG", 0, 0, width, height);
            }
            pdf.save(`Calendar ${year}.pdf`);
        } finally {
            isExportingPdf = false;
        }
    }
</script>

<div class="main-page">
    {#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as month}
        <CalendarPage month={month} year={year} holidays={holidays} />
    {/each}
</div>
<div class="controlbar noprint">
    {#if !isExportingPdf}
        <div style="padding: 0px 10px">
            Year:
            <button on:click={() => year--}>&minus;</button>
            <select bind:value={year}>
                {#each years as loopYear}
                    <option value={loopYear}>{loopYear}</option>
                {/each}
            </select>
            <button on:click={() => year++}>&plus;</button>
        </div>
        <button on:click={exportToPdf}>Export to PDF</button>
    {:else}
        Generating PDF. Please wait...
    {/if}
</div>

<style>
    button {
        cursor: pointer;
    }
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
