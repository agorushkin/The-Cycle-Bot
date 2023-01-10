import { Event } from '/client/events/event.ts';

import { DayZQueryCommand } from '/client/commands/dayz.ts';

export const MessageCreateEvent = Event('messageCreate', (_, message) => {
  DayZQueryCommand(message);
});