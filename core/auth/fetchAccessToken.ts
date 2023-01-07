import { Config } from '/config.ts';
const { clientId, clientSecret, redirectURI } = Config.auth;

export const fetchAccessToken = async (code: string): Promise<null | string> => {

  const response = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectURI,
      scope: 'identify',
    }),
  });

  const data = await response.json();

  return data.error ? null : data.access_token;
};