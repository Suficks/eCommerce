import { ApiRoot } from '@commercetools/platform-sdk';
import { ParentCategoryName, ItemsCategoryName } from '@/pages/CatalogPage';

export interface UserLogin {
  token: string;
  isLogin: boolean;
}

export type ApiRootContextProps = {
  flowApiRoot: ApiRoot | undefined;
  setFlowApiRoot?: React.Dispatch<React.SetStateAction<ApiRoot | undefined>>;
};

export interface ParentCategory {
  name: ParentCategoryName;
  path: string;
  id: string;
}

export interface ItemsCategory {
  name: ItemsCategoryName;
  path: string;
  id: string;
}

export type CategoryCustom = {
  parent: ParentCategory;
  items: ItemsCategory[];
};
