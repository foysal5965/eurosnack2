'use server';

import { authKey } from '@/constants/authKey';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const setAccessToken = async (token: string | null, option?: { passwordChangeRequired?: boolean; redirect?: string }) => {
   const cookiesStore = await cookies();
   cookiesStore.set(authKey, token || ''); // Set to empty string if token is null

   if (option?.passwordChangeRequired) {
      redirect('/dashboard');
   } else if (option?.redirect) {
      redirect(option.redirect);
   }
};

export default setAccessToken;
