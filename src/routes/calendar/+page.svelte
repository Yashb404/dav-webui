<script lang="ts">
  import Calendar from "$lib/components/calendar/Calendar.svelte";
  import EventsTable from "$lib/components/calendar/EventsTable.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import type { Event } from "$lib/types/event";
  import {
    getLocalTimeZone,
    today,
    type DateValue,
  } from "@internationalized/date";

  let { data } = $props();

  let selectedDate = $state<DateValue>(today(getLocalTimeZone()));

  let filteredEvents = $derived.by(() => {
    if (!selectedDate) return data.events;

    const selectedDateStr = `${selectedDate.year}-${String(selectedDate.month).padStart(2, "0")}-${String(selectedDate.day).padStart(2, "0")}`;

    return data.events.filter((event: Event) => {
      const eventDateStr = event.dtstart.split(" ")[0];
      return eventDateStr === selectedDateStr;
    });
  });

  function handleDateSelect(date: DateValue) {
    selectedDate = date;
  }
</script>

<div class="container mx-auto py-8 px-4">
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
    <div class="flex flex-col">
      <h2 class="text-2xl font-bold mb-4">Calendar</h2>
      <div class="flex-1 flex items-start">
        <Calendar bind:value={selectedDate} />
      </div>
    </div>

    <div class="flex flex-col">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-2xl font-bold">
          {#if selectedDate}
            Events on {selectedDate.month}/{selectedDate.day}/{selectedDate.year}
          {:else}
            All Events
          {/if}
        </h2>
      </div>

      {#if filteredEvents.length === 0}
        <div
          class="flex-1 flex items-center justify-center border rounded-lg p-8 text-center"
        >
          <div>
            <p class="text-muted-foreground mb-4">
              {#if selectedDate}
                No events scheduled for this date
              {:else}
                No events scheduled
              {/if}
            </p>
          </div>
        </div>
      {:else}
        <EventsTable events={filteredEvents} />
      {/if}
    </div>
  </div>
</div>
