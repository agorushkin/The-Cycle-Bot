import { Embed } from 'harmony';

import { Command } from '/client/commands/command.ts';

import { fetchServerInfo } from '/core/dayz/fetchServerInfo.ts';
import { dayZFormatter } from '/core/dayz/dayZFormatter.ts';

export const DayZQueryCommand = Command('dzs|dayz', async (message) => {
  const data = await fetchServerInfo();

  if (!data) {
    const embed = new Embed({
      title: '\🔴 Server is offline',
      color: 0xff0000,
    });

    message.reply(embed);
    return;
  }

  const { status, environment, host } = data;

  const embed = new Embed({
    title: 'Server Info',
    fields: [
      { name: 'Players', value: `\`${ dayZFormatter.players(status) }\``, inline: true },
      { name: 'Time', value: `\`${ dayZFormatter.time(environment, false) }\``, inline: true },
      { name: 'Map', value: `\`${ dayZFormatter.map(environment.map) }\``, inline: true },
      { name: 'Address', value: `\`${ dayZFormatter.address(host, 'game') }\``, inline: false },
    ],
  });

  message.reply(embed);
});