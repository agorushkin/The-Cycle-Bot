import { Client } from 'harmony';

import { fetchServerInfo } from '/core/dayz/fetchServerInfo.ts';
import { dayZFormatter } from '/core/dayz/dayZFormatter.ts';

export const startClientPresenceUpdate = (client: Client) => {
  setInterval(async () => {
    const data = await fetchServerInfo();

    if (data === null) return;

    const { status } = data;

    const playerFormat  = dayZFormatter.players(status);

    client.setPresence({
      activity: {
        name: `Players - ${ playerFormat }`,
        type: 'WATCHING',
      },
    });
  }, 5000);
}