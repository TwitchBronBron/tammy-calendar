<script lang="ts">
	import CalendarPage from "./CalendarPage.svelte";
	let year = new Date().getFullYear() + 1;
	year = 2021;
</script>

{#each [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as month}
	<CalendarPage {month} {year} />
{/each}
