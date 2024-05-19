import { createAsyncThunk } from '@reduxjs/toolkit';

import { SubmitData } from '../types/Registration';
import { signUpUser } from '@/shared/api';
import { ValidationErrors } from '@/shared/const/Validation';

export const signUpUserThunk = createAsyncThunk(
  'signUp/signUpUserThunk',
  async (signUpData: SubmitData) => {
    const { alreadyExist, serverError } = ValidationErrors;
    try {
      const response = await signUpUser(signUpData);

      return response;
    } catch (e) {
      const error = e as Error;
      switch (error.message) {
        case 'There is already an existing customer with the provided email.': {
          throw new Error(alreadyExist.error, {
            cause: 'emailError',
          });
        }
        default: {
          throw new Error(serverError.error, {
            cause: 'serverError',
          });
        }
      }
    }
  },
);
