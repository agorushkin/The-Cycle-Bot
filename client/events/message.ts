import { Event } from '/client/events/event.ts';

import { DayZQueryCommand } from '/client/commands/dayz.ts';
import { LinkSteamAccountCommand } from '/client/commands/link.ts';

export const MessageCreateEvent = Event('messageCreate', (_, message) => {
  DayZQueryCommand(message);
  LinkSteamAccountCommand(message);
});