import { DAVClient } from "tsdav";
import {
  DAV_SERVER_URL,
  DAV_SERVER_USERNAME,
  DAV_SERVER_PASSWORD,
} from "$env/static/private";

const client = new DAVClient({
  serverUrl: DAV_SERVER_URL,
  credentials: {
    username: DAV_SERVER_USERNAME,
    password: DAV_SERVER_PASSWORD,
  },
  authMethod: "Basic",
  defaultAccountType: "caldav",
});

interface CalendarEvent {
  summary: string;
  dtstart: string;
  dtend: string;
}

function parseiCalDate(icalDate: string): string {
  if (!icalDate) return "";

  icalDate = icalDate.trim();

  const year = icalDate.slice(0, 4);
  const month = icalDate.slice(4, 6);
  const day = icalDate.slice(6, 8);

  if (icalDate.length === 8 || !icalDate.includes("T")) {
    return `${year}-${month}-${day}`;
  }

  const hour = icalDate.slice(9, 11);
  const minute = icalDate.slice(11, 13);

  return `${year}-${month}-${day} ${hour}:${minute}`;
}

export async function getEvents(): Promise<CalendarEvent[]> {
  await client.login();
  const calendars = await client.fetchCalendars();
  const calendarObjects = await client.fetchCalendarObjects({
    calendar: calendars[0],
  });

  const eventJSON = calendarObjects.map((obj) => {
    const lines = obj.data.split("\n");
    const event: CalendarEvent = { summary: "", dtstart: "", dtend: "" };

    for (const line of lines) {
      const trimmedLine = line.trim();

      if (trimmedLine.startsWith("SUMMARY:")) {
        event.summary = trimmedLine.slice(8).trim();
      } else if (trimmedLine.startsWith("DTSTART")) {
        const value = trimmedLine.split(":")[1]?.trim() || "";
        event.dtstart = parseiCalDate(value);
      } else if (trimmedLine.startsWith("DTEND")) {
        const value = trimmedLine.split(":")[1]?.trim() || "";
        event.dtend = parseiCalDate(value);
      }
    }

    return event;
  });

  return eventJSON;
}
