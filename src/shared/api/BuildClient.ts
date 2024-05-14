import fetch from 'node-fetch';
import {
  AnonymousAuthMiddlewareOptions,
  Client,
  ClientBuilder,
  PasswordAuthMiddlewareOptions,
  RefreshAuthMiddlewareOptions,
  TokenCache,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import {
  ApiRoot,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';

const {
  VITE_CTP_CLIENT_ID,
  VITE_CTP_CLIENT_SECRET,
  VITE_CTP_PROJECT_KEY,
  VITE_CTP_AUTH_URL,
  VITE_CTP_API_URL,
  VITE_CTP_SCOPES,
} = import.meta.env;

const scopes = [VITE_CTP_SCOPES || ''];

// Client credentials flow api root
export const getClientCredentialsFlowApiRoot = (): ApiRoot => {
  const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: VITE_CTP_AUTH_URL || '',
    projectKey: VITE_CTP_PROJECT_KEY || '',
    credentials: {
      clientId: VITE_CTP_CLIENT_ID || '',
      clientSecret: VITE_CTP_CLIENT_SECRET || '',
    },
    scopes,
    fetch,
  };

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: VITE_CTP_API_URL,
    fetch,
  };

  const client: Client = new ClientBuilder()
    .withProjectKey(VITE_CTP_AUTH_URL || '')
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  return createApiBuilderFromCtpClient(client);
};

// Password flow api root
export const getPasswordFlowApiRoot = (
  email: string,
  password: string,
  tokenCache: TokenCache,
): ApiRoot => {
  const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
    host: VITE_CTP_AUTH_URL || '',
    projectKey: VITE_CTP_PROJECT_KEY || '',
    credentials: {
      clientId: VITE_CTP_CLIENT_ID || '',
      clientSecret: VITE_CTP_CLIENT_SECRET || '',
      user: {
        username: email,
        password,
      },
    },
    scopes,
    tokenCache,
    fetch,
  };

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: VITE_CTP_API_URL,
    fetch,
  };

  const client: Client = new ClientBuilder()
    .withProjectKey(VITE_CTP_PROJECT_KEY || '')
    .withPasswordFlow(passwordAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  return createApiBuilderFromCtpClient(client);
};

// Anonymous session flow api root
export const getAnonymousFlowApiRoot = (tokenCache: TokenCache): ApiRoot => {
  const anonymousAuthMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
    host: VITE_CTP_AUTH_URL || '',
    projectKey: VITE_CTP_PROJECT_KEY || '',
    credentials: {
      clientId: VITE_CTP_CLIENT_ID || '',
      clientSecret: VITE_CTP_CLIENT_SECRET || '',
    },
    scopes,
    tokenCache,
    fetch,
  };

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: VITE_CTP_API_URL,
    fetch,
  };

  const client: Client = new ClientBuilder()
    .withProjectKey(VITE_CTP_PROJECT_KEY || '')
    .withAnonymousSessionFlow(anonymousAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  return createApiBuilderFromCtpClient(client);
};

// Refresh token flow api root
export const getRefreshTokenFlowApiRoot = (refreshToken: string): ApiRoot => {
  const refreshAuthMiddlewareOptions: RefreshAuthMiddlewareOptions = {
    host: VITE_CTP_AUTH_URL || '',
    projectKey: VITE_CTP_PROJECT_KEY || '',
    credentials: {
      clientId: VITE_CTP_CLIENT_ID || '',
      clientSecret: VITE_CTP_CLIENT_SECRET || '',
    },
    refreshToken,
    fetch,
  };

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: VITE_CTP_API_URL,
    fetch,
  };

  const client: Client = new ClientBuilder()
    .withProjectKey(VITE_CTP_PROJECT_KEY || '')
    .withRefreshTokenFlow(refreshAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  return createApiBuilderFromCtpClient(client);
};
