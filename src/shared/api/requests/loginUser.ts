import {
  ByProjectKeyRequestBuilder,
  MyCustomerSignin,
} from '@commercetools/platform-sdk';
import {
  apiRoot,
  apirootPassword,
  constructClientAnonymousFlow,
  constructClientPasswordFlow,
  constructClientRefresh,
} from '../BuildClient';
import { tokenInstance } from '../tokenHandlers';
import { ValidationErrors } from '@/shared/const/Validation';

function setLocalStorage(allTokens: boolean): void {
  if (tokenInstance.get().token) {
    localStorage.setItem('token', tokenInstance.get().token);
  }
  if (
    tokenInstance.get().refreshToken &&
    (allTokens || !localStorage.getItem('refreshToken'))
  ) {
    localStorage.setItem(
      'refreshToken',
      tokenInstance.get().refreshToken || '',
    );
  }
}

async function getCorrectApiRoot(): Promise<ByProjectKeyRequestBuilder> {
  const user = localStorage.getItem('user');
  const refreshToken = localStorage.getItem('refreshToken');
  let result;

  if (user && apirootPassword) {
    result = apirootPassword;
    setLocalStorage(true);
  } else if (refreshToken) {
    try {
      result = constructClientRefresh();
      setLocalStorage(false);
    } catch {
      result = constructClientAnonymousFlow();
      setLocalStorage(true);
    }
  } else {
    result = constructClientAnonymousFlow();
    setLocalStorage(true);
  }

  return result;
}

let apiRootForRequest = await getCorrectApiRoot();

export async function changeApiRootToPassword(): Promise<void> {
  if (apirootPassword) {
    apiRootForRequest = apirootPassword;
  }
}

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
    const apirootPasswordFlow = constructClientPasswordFlow(email, password);

    const body: MyCustomerSignin = {
      email,
      password,
      activeCartSignInMode: 'MergeWithExistingCustomerCart',
      updateProductData: true,
    };

    const response = await apirootPasswordFlow
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
    changeApiRootToPassword();
    // getActiveCart(true);

    return apirootPasswordFlow;
  } catch {
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
  }
  return undefined;
}
