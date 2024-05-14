import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';
import { getRefreshTokenFlowApiRoot } from './BuildClient';
import { ApiRootContextProps, UserLogin } from './types/apiTypes';
import { getAnonymousUser, getRefreshToken } from './requests';

export class CustomTokenCache implements TokenCache {
  tokenStore: TokenStore = {
    token: '',
    expirationTime: 0,
    refreshToken: '',
  };

  set(tokenStore: TokenStore): void {
    this.tokenStore = tokenStore;
  }

  get(): TokenStore {
    return this.tokenStore;
  }
}

export const changeToken = (refreshToken: UserLogin): void => {
  localStorage.setItem('refreshTokenData', JSON.stringify(refreshToken));
};

export const createAnonymousToken = async (
  refreshTokenFlowApiRoot?: ApiRootContextProps,
): Promise<void> => {
  const tokenCache = new CustomTokenCache();
  await getAnonymousUser(tokenCache).then(() => {
    const { refreshToken } = tokenCache.get();
    if (refreshToken) {
      changeToken({
        token: refreshToken,
        isLogin: false,
      });
    }
    if (refreshTokenFlowApiRoot) {
      refreshTokenFlowApiRoot.setFlowApiRoot?.(
        getRefreshTokenFlowApiRoot(getRefreshToken()),
      );
    }
  });
};

export const isUserLoggedIn = (): boolean => {
  const userLoginJson = localStorage.getItem('refreshTokenData');
  if (userLoginJson) {
    const userLogin: UserLogin = JSON.parse(userLoginJson);
    return userLogin.isLogin;
  }

  return false;
};
