import { Config } from '/config.ts';

import { render } from 'preact/render';

import { Handler } from 'http-server';
import { AuthPage } from '/public/auth.tsx';

import { fetchAccessToken } from '/core/auth/fetchAccessToken.ts';
import { handleAccessGrant } from '../../core/auth/handleAccessGrant.ts';

export const handler: Handler = async ({ url, respond }) => {
  const query = new URL(url).searchParams;
  const code  = query.get('code');

  if (!code) return respond({
    status: 302,
    headers: {
      location: Config.auth.OAuth2URL,
    },
  });

  const token = await fetchAccessToken(code);

  respond({
    status: 200,
    body: render(AuthPage(token !== null)),
    headers: {
      'content-type': 'text/html',
    },
  });

  if (token) handleAccessGrant(token);
};