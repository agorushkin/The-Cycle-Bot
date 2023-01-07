import { Config } from '/config.ts';

const { token } = Config.client;

import { Client, Intents } from 'harmony';

export const client = new Client({
  intents: Intents.All,
  token,
});

import { StartupEvent } from '/client/events/ready.ts';
import { MessageCreateEvent } from '/client/events/message.ts';

client.connect().then(() => {
  StartupEvent(client);

  MessageCreateEvent(client);
});