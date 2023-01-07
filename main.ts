import '/client/main.ts';
import '/server/main.ts';

import { initializeApp } from 'firebase/app';
import { getFirestore, } from 'firestore';

import { FirebaseConfig } from '/config.ts';

const firebase  = initializeApp(FirebaseConfig);
export const db = getFirestore(firebase);