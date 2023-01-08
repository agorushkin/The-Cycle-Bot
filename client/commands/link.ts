import { MessageComponentData } from 'harmony';
import { Command } from '/client/commands/command.ts';

import { Config } from '/config.ts';

export const LinkSteamAccountCommand = Command('link', (message) => {
  const button: MessageComponentData = {
    type: 'BUTTON',
    label: 'Link Steam Account',
    style: 'LINK',
    url: Config.auth.authURL,
  };

  const base: MessageComponentData = {
    type: 'ACTION_ROW',
    components: [ button ],
  };
    
  message.reply({
    content: '⚠️ Make sure you have Steam linked to your account in order for this to work ⚠️',
    components: [ base ]
  });
});