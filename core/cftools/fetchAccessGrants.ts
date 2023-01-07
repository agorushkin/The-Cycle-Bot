import { fetchAccessToken } from '/core/cftools/fetchAccessToken.ts';

export const fetchAccessGrants = async () => {
  const token = await fetchAccessToken();

  const response = await fetch('https://data.cftools.cloud/v1/@app/grants', {
    headers: {
      Authorization: `Bearer ${ token }`,
    },
  });

  const data = await response.json();

  return data.status ? data.tokens : null;
};