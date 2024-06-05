import { ProductProjection } from '@commercetools/platform-sdk';

export interface CartSchema {
  products: ProductProjection[];
}
