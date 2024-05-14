import {
  ApiRoot,
  Cart,
  Customer,
  CustomerSignInResult,
  MyCustomerSignin,
  ProductProjectionPagedQueryResponse,
} from '@commercetools/platform-sdk';
import { ClientResponse, TokenCache } from '@commercetools/sdk-client-v2';
import { ApiRootContextProps, UserLogin } from './types/apiTypes';
import {
  getAnonymousFlowApiRoot,
  getPasswordFlowApiRoot,
  getRefreshTokenFlowApiRoot,
} from './BuildClient';
import { SubmitData } from '@/features/Registration';
import { LoginSubmitData } from '@/features/Login';

const { VITE_CTP_PROJECT_KEY } = import.meta.env;

export const getRefreshToken = (): string => {
  const userLoginJson = localStorage.getItem('refreshTokenData');
  if (userLoginJson) {
    const userLogin: UserLogin = JSON.parse(userLoginJson);
    return userLogin.token;
  }
  return '';
};

export const createUser = async (
  registrationData: SubmitData,
  refreshTokenFlowApiRoot: ApiRootContextProps,
): Promise<ClientResponse<CustomerSignInResult>> => {
  const apiRoot = refreshTokenFlowApiRoot.flowApiRoot
    ? refreshTokenFlowApiRoot.flowApiRoot
    : getRefreshTokenFlowApiRoot(getRefreshToken());
  const clientData = getClientData(registrationData);
  return apiRoot
    .withProjectKey(VITE_CTP_PROJECT_KEY)
    .customers()
    .post({ body: clientData })
    .execute() as ClientResponse<CustomerSignInResult>;
};

export const getUser = async (
  loginData: LoginSubmitData,
  tokenCache: TokenCache,
  refreshTokenFlowApiRoot: ApiRootContextProps,
): Promise<ClientResponse<Customer>> => {
  const { email, password } = loginData;
  const refreshFlowApiRoot = refreshTokenFlowApiRoot.flowApiRoot
    ? refreshTokenFlowApiRoot.flowApiRoot
    : getRefreshTokenFlowApiRoot(getRefreshToken());
  const clientData: MyCustomerSignin = {
    email,
    password,
    activeCartSignInMode: 'MergeWithExistingCustomerCart',
  };

  await refreshFlowApiRoot
    .withProjectKey(VITE_CTP_PROJECT_KEY)
    .me()
    .login()
    .post({ body: clientData })
    .execute();

  const passwordFlowApiRoot = getPasswordFlowApiRoot(
    email,
    password,
    tokenCache,
  );

  return passwordFlowApiRoot
    .withProjectKey(VITE_CTP_PROJECT_KEY)
    .me()
    .get()
    .execute()
    .then();
};

export const getAnonymousUser = async (
  tokenCache: TokenCache,
): Promise<ClientResponse<Cart>> => {
  const apiRoot = getAnonymousFlowApiRoot(tokenCache);
  return apiRoot
    .withProjectKey(VITE_CTP_PROJECT_KEY)
    .me()
    .carts()
    .post({ body: { currency: 'USD', country: 'RU' } })
    .execute() as ClientResponse<Cart>;
};

export const getProductsList = async (
  refreshTokenFlowApiRoot: ApiRootContextProps,
): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> => {
  const apiRoot = refreshTokenFlowApiRoot.flowApiRoot
    ? refreshTokenFlowApiRoot.flowApiRoot
    : getRefreshTokenFlowApiRoot(getRefreshToken());
  return apiRoot
    .withProjectKey(VITE_CTP_PROJECT_KEY)
    .productProjections()
    .get({
      queryArgs: {
        limit: 30,
      },
    })
    .execute() as ClientResponse<ProductProjectionPagedQueryResponse>;
};
