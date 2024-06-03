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
import { ValidationMessages } from '@/shared/const/Validation';
import { LocalStorageKeys } from '@/shared/const/LocalStorage';
import { setLocalStorageValue } from '@/shared/util/LocalStorageHandler';

const MERGE_ANONYMOUS_CART_WITH_USER_CART = 'MergeWithExistingCustomerCart';

function setLocalStorage(isAllTokens: boolean): void {
  if (tokenInstance.get().token) {
    localStorage.setItem(LocalStorageKeys.TOKEN, tokenInstance.get().token);
  }
  if (
    tokenInstance.get().refreshToken &&
    (isAllTokens || !localStorage.getItem(LocalStorageKeys.REFRESH_TOKEN))
  ) {
    localStorage.setItem(
      LocalStorageKeys.REFRESH_TOKEN,
      tokenInstance.get().refreshToken || '',
    );
  }
}

async function getCorrectApiRoot(): Promise<ByProjectKeyRequestBuilder> {
  const user = localStorage.getItem(LocalStorageKeys.USER);
  const refreshToken = localStorage.getItem(LocalStorageKeys.REFRESH_TOKEN);
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
      activeCartSignInMode: MERGE_ANONYMOUS_CART_WITH_USER_CART,
      updateProductData: true,
    };

    const response = await apirootPasswordFlow
      .me()
      .login()
      .post({ body })
      .execute();
    localStorage.setItem(LocalStorageKeys.TOKEN, tokenInstance.get().token);
    localStorage.setItem(
      LocalStorageKeys.REFRESH_TOKEN,
      tokenInstance.get().refreshToken || '',
    );
    localStorage.setItem(
      LocalStorageKeys.USER,
      JSON.stringify(response.body.customer),
    );
    setLocalStorageValue(response.body.customer.version);
    changeApiRootToPassword();
    // getActiveCart(true);

    return apirootPasswordFlow;
  } catch {
    const checkEmailExistResponse = await apiRoot
      .customers()
      .get({ queryArgs: { where: `email="${email}"` } })
      .execute();
    if (checkEmailExistResponse.body.count === 0) {
      throw new Error(ValidationMessages.email.notExist);
    } else if (checkEmailExistResponse.body.count === 1) {
      throw new Error(ValidationMessages.password.wrongPassword);
    }
  }
  return undefined;
}
