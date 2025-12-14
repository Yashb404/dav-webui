<script lang="ts">
  import * as Table from "$lib/components/ui/table/index.js";
  import type { Event } from "$lib/types/event";

  interface Props {
    events: Event[];
  }

  let { events }: Props = $props();
</script>

<Table.Root>
  <Table.Caption>List of the events</Table.Caption>
  <Table.Header>
    <Table.Row>
      <Table.Head class="w-[100px]">Event name</Table.Head>
      <Table.Head>Start</Table.Head>
      <Table.Head>End</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each events as event}
      <Table.Row>
        <Table.Cell class="font-medium">{event.summary}</Table.Cell>
        <Table.Cell>{event.dtstart}</Table.Cell>
        <Table.Cell>{event.dtend}</Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
