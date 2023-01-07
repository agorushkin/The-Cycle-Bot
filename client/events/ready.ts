import { Event } from '/client/events/event.ts';

import { startClientPresenceUpdate } from '/client/func/presence.ts';

export const StartupEvent = Event('ready', (client) => {
  console.log(`Client running ${ client.user!.username }#${ client.user!.discriminator }`);

  startClientPresenceUpdate(client);
});