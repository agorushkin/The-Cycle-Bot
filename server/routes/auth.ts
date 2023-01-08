import { Handler } from 'http-server';

import { fetchAccessToken } from '/core/auth/fetchAccessToken.ts';
import { handleAccessGrant } from '../../core/auth/handleAccessGrant.ts';

export const handler: Handler = async ({ url, respond }) => {
  const query = new URL(url).searchParams;
  const code  = query.get('code');

  if (!code) return void respond({ status: 400 });
  
  const token = await fetchAccessToken(code);

  respond({
    status: 302,
    headers: {
      location: 'https://discord.com/channels/@me/1060752021801685002',
    },
  });

  if (token) handleAccessGrant(token);
};