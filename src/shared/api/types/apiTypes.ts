import { ApiRoot } from '@commercetools/platform-sdk';

export interface UserLogin {
  token: string;
  isLogin: boolean;
}

export type ApiRootContextProps = {
  flowApiRoot: ApiRoot | undefined;
  setFlowApiRoot?: React.Dispatch<React.SetStateAction<ApiRoot | undefined>>;
};
