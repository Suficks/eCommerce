import { LineItem } from '@commercetools/platform-sdk';

export interface CartSchema {
  products: LineItem[];
  isLoading?: boolean;
  isAdd?: boolean;
  loadingProductId?: string | null;
}
