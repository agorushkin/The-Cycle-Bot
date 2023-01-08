import { db } from '/main.ts';
import { doc, getDoc, updateDoc, setDoc } from 'firestore';

import { fetchUserData } from './fetchUserData.ts';

import { client } from '/client/main.ts';

export const handleAccessGrant = async (token: string) => {
  const connections = await fetchUserData<{ verified: boolean, type: string, id: string }[]>('users/@me/connections', token);
  const identity    = await fetchUserData<{ id: string }>('users/@me', token);

  if (!connections || !identity) return;

  const directMessages = await client.createDM(identity.id);

  const steamId = connections.find(connection => connection.type === 'steam')?.id ?? null;

  if (!steamId) return void directMessages.send([
    'You have not linked your Steam account to your Discord connections.',
    'Please link your Steam account to your Discord account and try again.',
  ].join('\n'));

  const userRef = doc(db, 'users', identity.id);
  const userDoc = await getDoc(userRef);

  userDoc.exists()
    ? await updateDoc(userRef, { steamId })
    : await setDoc(userRef, { steamId });

  directMessages.send('You have successfully linked your Steam account to your Discord account!');
};