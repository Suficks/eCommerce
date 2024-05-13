import fetch from 'node-fetch';
import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

const {
  VITE_CTP_CLIENT_ID,
  VITE_CTP_CLIENT_SECRET,
  VITE_CTP_PROJECT_KEY,
  VITE_CTP_AUTH_URL,
  VITE_CTP_API_URL,
  VITE_CTP_SCOPES,
} = import.meta.env;

const scopes = [VITE_CTP_SCOPES || ''];

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: VITE_CTP_AUTH_URL || '',
  projectKey: VITE_CTP_PROJECT_KEY || '',
  credentials: {
    clientId: VITE_CTP_CLIENT_ID || '',
    clientSecret: VITE_CTP_CLIENT_SECRET || '',
  },
  oauthUri: `/oauth/${VITE_CTP_PROJECT_KEY}/customers/token`,
  scopes,
  fetch,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: VITE_CTP_API_URL || '',
  fetch,
};

const ctpClient = new ClientBuilder()
  .withProjectKey(VITE_CTP_PROJECT_KEY || '')
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: VITE_CTP_PROJECT_KEY || '',
});
