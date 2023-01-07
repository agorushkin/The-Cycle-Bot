import { Message } from 'harmony';

import { Config } from '/config.ts';

const prefix = Config.client.prefix;

export const Command = <T = string>(command: string, callback: (message: Message, parsed: T) => void, parser?: ((content: string) => [ T, null ] | [ null, Error ])) => {
  const options = command.split(':').filter(Boolean);

  const names = options.pop()?.split('|') ?? [];

  return (message: Message) => {
    const { content } = message;

    const [ name, args ] = content.split(' ');

    if (
      !name.startsWith(prefix) 
      || !names.includes(name.slice(prefix.length).toLowerCase())
    ) return;

    if (!parser) {
      callback(message, args as unknown as T);
      return;
    }

    const [ parsed, error ] = parser(args);

    error
      ? console.error(error)
      : callback(message, parsed);
  };
};