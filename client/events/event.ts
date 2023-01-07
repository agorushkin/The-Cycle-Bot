import { Client, ClientEvents } from 'harmony';

export const Event = <K extends keyof ClientEvents = keyof ClientEvents>(name: K, callback: (client: Client, ...args: ClientEvents[K]) => void) => {
  return name === 'ready'
    ? (client: Client) => (callback as unknown as (client: Client) => void)(client)
    : (client: Client) => client.on(name, (...args) => callback(client, ...args));
};