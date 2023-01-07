import { Client } from 'harmony';

import { sendDayZRequest } from '/core/dayz/sendDayZRequest.ts';
import { dayZFormatter } from '/core/dayz/dayZFormatter.ts';

const PRESENCE = [ [ 'PLAYER_COUNT', 'TIME', 'ADDRESS' ], 0 ] as [ string[], number ];

export const startClientPresenceUpdate = (client: Client) => {
  setInterval(async () => {
    const data = await sendDayZRequest();

    if (data === null) return;

    const { status, environment, host } = data;

    const playerFormat  = dayZFormatter.players(status);
    const timeFormat    = dayZFormatter.time(environment, true);
    const addressFormat = dayZFormatter.address(host, 'game');

    const activities = [
      `Players - ${ playerFormat }`,
      `Time - ${ timeFormat }`,
      `Address - ${ addressFormat }`,
    ];

    client.setPresence({
      activity: {
        name: activities[PRESENCE[1]],
        type: 'WATCHING',
      },
    });

    PRESENCE[1] === PRESENCE[0].length - 1 ? PRESENCE[1] = 0 : PRESENCE[1]++;
  }, 5000);
}