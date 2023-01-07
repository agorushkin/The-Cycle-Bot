import { Config } from '/config.ts';

import { RawDayZResponse, DayZResponse } from '/core/dayz/types.d.ts';

export const sendDayZRequest = async (): Promise<DayZResponse | null> => {
  const response = await fetch(`https://data.cftools.cloud/v1/gameserver/${ Config.game.hash }`);
  const data = await response.json() as RawDayZResponse;
  
  if (
    data === null
    || data === undefined
  ) return null;

  const { status, environment, host, map } = data[ Config.game.hash ];

  return {
    status: {
      queue: status.queue.size,
      players: status.players,
      slots: status.slots,
    },

    environment: {
      map: map,
      time: environment.time,
      acceleration: {
        day: environment.time_acceleration.general,
        night: environment.time_acceleration.night,
      },
    },

    host: {
      address: host.address,
      gamePort: host.game_port,
      queryPort: host.query_port,
    },
  };
};