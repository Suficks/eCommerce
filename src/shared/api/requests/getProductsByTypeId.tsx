import { ProductProjection } from '@commercetools/platform-sdk';
import { apiRoot } from '../BuildClient';

export async function getProductsByTypeId(
  productTypeId: string,
): Promise<ProductProjection[]> {
  const result = await apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        filter: [`productType.id:${productTypeId}`],
      },
    })
    .execute();
  return result.body.results;
}
