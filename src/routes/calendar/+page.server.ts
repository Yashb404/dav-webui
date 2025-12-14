import { getEvents } from "$lib/services/dav";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  try {
    const events = await getEvents();
    return {
      events,
    };
  } catch (error) {
    console.error("Failed to fetch events", error);
    return {
      events: [],
    };
  }
};
