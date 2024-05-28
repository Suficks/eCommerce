import { ProductProjection } from '@commercetools/platform-sdk';
import { apiRoot } from '../BuildClient';
import { FilterSortSearchParameters } from '../types/apiTypes';

export async function getFilterSortSearchProducts(
  parameters: FilterSortSearchParameters,
  itemPerPage: number,
): Promise<ProductProjection[]> {
  const {
    // selectedFiltersList,
    // minSelectedPrice,
    // maxSelectedPrice,
    attributesToSort,
    search,
  } = parameters;
  const queryArgs: {
    // filter: string | string[] | undefined;
    limit: number;
    sort?: string;
    ['text.en-GB']?: string;
    fuzzy?: boolean;
  } = {
    // filter: [],
    limit: itemPerPage,
  };

  // if (Array.isArray(queryArgs.filter)) {
  //   if (selectedCategoryId) {
  //     queryArgs.filter.push(`categories.id:"${selectedCategoryId}"`);
  //   }
  //   if (attributesToFilter.key && selectedFiltersList.length) {
  //     queryArgs.filter.push(
  //       `variants.attributes.${attributesToFilter.key}:${selectedFiltersList}`,
  //     );
  //   }
  //   if (attributesToFilter.key && !selectedFiltersList.length) {
  //     queryArgs.filter.push(
  //       `variants.attributes.${attributesToFilter.key}:exists`,
  //     );
  //   }
  //   if (minSelectedPrice || maxSelectedPrice) {
  //     queryArgs.filter.push(
  //       `variants.price.centAmount:range (${minSelectedPrice ? minSelectedPrice * 100 : '*'
  //       } to ${maxSelectedPrice ? maxSelectedPrice * 100 : '*'})`,
  //     );
  //   }
  // }

  if (attributesToSort && attributesToSort.field !== 'default') {
    const { field, order } = attributesToSort;
    queryArgs.sort = `${field} ${order}`;
  }

  if (queryArgs && search) {
    queryArgs['text.en-GB'] = search;
    queryArgs.fuzzy = true;
  }

  const result = await apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs,
    })
    .execute();
  return result.body.results;
  // }
}
