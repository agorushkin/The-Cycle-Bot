import { db } from '/main.ts';
import { doc, getDoc, setDoc, updateDoc } from 'firestore';

import { Config } from '/config.ts';
const { applicationId, applicationSecret } = Config.cftools;

export const fetchAccessToken = async (): Promise<null | string> => {
  const date = new Date().getTime();

  const tokenRef = doc(db, 'tokens', 'cftools');
  const tokenDoc = await getDoc(tokenRef);

  if (tokenDoc.exists()) {
    const { token, expires } = tokenDoc.data();

    if (expires > date) return token;
  }

  const response = await fetch('https://data.cftools.cloud/v1/auth/register', { 
    method: 'POST',

    body: JSON.stringify({
      application_id: applicationId,
      secret: applicationSecret,
    }),
  });

  const data = await response.json();
  if (!data.status) return null;

  tokenDoc.exists()
    ? await updateDoc(tokenRef, { token: data.token, expires: date + 8.64e+7 })
    : await setDoc(tokenRef, { token: data.token, expires: date + 8.64e+7 });

  return data.token;
};