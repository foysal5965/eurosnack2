// "use server";

import { FieldValues } from 'react-hook-form';

export const userResetPassword = async (data: FieldValues) => {

   const res = await fetch(
      `https://project-bismillah-backend.vercel.app/api/v1/auth/reset-password`,
      {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(data)
      }
   );

   const userInfo = await res.json()
 
   return userInfo
};
