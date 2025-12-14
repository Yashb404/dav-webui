<script lang="ts">
  import { Calendar as CalendarPrimitive } from "$lib/components/ui/calendar/index.js";
  import {
    getLocalTimeZone,
    today,
    type DateValue,
  } from "@internationalized/date";

  interface Props {
    value?: DateValue;
  }

  let { value = $bindable(today(getLocalTimeZone())) }: Props = $props();
</script>

<div class="w-full">
  <CalendarPrimitive
    type="single"
    bind:value
    class="rounded-lg border shadow-lg p-6 w-full max-w-2xl"
    captionLayout="dropdown"
  />
</div>

<style>
  :global(.calendar) {
    font-size: 1.1rem;
  }

  :global(.calendar [data-calendar-cell]) {
    min-height: 3.5rem;
    min-width: 3.5rem;
    font-size: 1rem;
  }

  :global(.calendar [data-calendar-heading]) {
    font-size: 1.1rem;
    font-weight: 600;
  }

  :global(.calendar [data-calendar-grid]) {
    gap: 0.5rem;
  }
</style>
