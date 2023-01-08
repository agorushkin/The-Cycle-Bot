import { Client, ClientEvents } from 'harmony';

export const Event = <K extends keyof ClientEvents = keyof ClientEvents>(event: K, callback: (client: Client, ...args: ClientEvents[K]) => void) => {
  return event === 'ready'
    ? (client: Client) => (callback as unknown as (client: Client) => void)(client)
    : (client: Client) => client.on(event, (...args) => callback(client, ...args));
};