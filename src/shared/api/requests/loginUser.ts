import {
  ByProjectKeyRequestBuilder,
  MyCustomerSignin,
} from '@commercetools/platform-sdk';
import { apiRoot, constructClientPasswordFlow } from '../BuildClient';
import { tokenInstance } from '../tokenHandlers';
import { ValidationErrors } from '@/shared/const/Validation';

export async function loginUser(
  email: string,
  password: string,
): Promise<ByProjectKeyRequestBuilder | undefined> {
  try {
    tokenInstance.set({
      token: '',
      expirationTime: 0,
      refreshToken: '',
    });
    const apirootPassword = constructClientPasswordFlow(email, password);

    const body: MyCustomerSignin = {
      email,
      password,
      activeCartSignInMode: 'MergeWithExistingCustomerCart',
      updateProductData: true,
    };

    const response = await apirootPassword
      .me()
      .login()
      .post({ body })
      .execute();
    localStorage.setItem('token', tokenInstance.get().token);
    localStorage.setItem(
      'refreshToken',
      tokenInstance.get().refreshToken || '',
    );
    localStorage.setItem('user', JSON.stringify(response.body.customer));
    localStorage.setItem(
      'version',
      JSON.stringify(response.body.customer.version),
    );
    // changeApiRootToPassword();
    // getActiveCart(true);

    return apirootPassword;
  } catch {
    try {
      const checkEmailExistResponse = await apiRoot
        .customers()
        .get({ queryArgs: { where: `email="${email}"` } })
        .execute();
      if (checkEmailExistResponse.body.count === 0) {
        throw new Error(ValidationErrors.email.notExist, {
          cause: 'emailError',
        });
      } else if (checkEmailExistResponse.body.count === 1) {
        throw new Error(ValidationErrors.password.wrongPassword, {
          cause: 'passwordError',
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
  return undefined;
}
