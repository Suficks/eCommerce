import { ProductProjection } from '@commercetools/platform-sdk';
import { apiRoot } from '../BuildClient';
import { FilterSortSearchParameters } from '../types/apiTypes';

export async function getFilterSortSearchProducts(
  parameters: FilterSortSearchParameters,
  itemPerPage: number,
): Promise<ProductProjection[]> {
  const {
    categoryType: { attributesToFilter, selectedCategoryId },
    selectedFiltersList,
    minPrice,
    maxPrice,
    attributesToSort,
    search,
  } = parameters;
  const queryArgs: {
    filter: string | string[] | undefined;
    sort?: string;
    limit: number;
    ['text.en-GB']?: string;
    fuzzy?: boolean;
  } = {
    filter: [],
    limit: itemPerPage,
  };

  const formattedBrands = selectedFiltersList
    .map((brand) => `"${brand}"`)
    .join(',\n');

  if (Array.isArray(queryArgs.filter)) {
    if (selectedCategoryId) {
      queryArgs.filter.push(`categories.id:"${selectedCategoryId}"`);
    }
    if (attributesToFilter.name && selectedFiltersList.length) {
      queryArgs.filter.push(
        `variants.attributes.${attributesToFilter.name}:${formattedBrands}`,
      );
    }
    if (attributesToFilter.name && !selectedFiltersList.length) {
      queryArgs.filter.push(
        `variants.attributes.${attributesToFilter.name}:exists`,
      );
    }
    if (minPrice || maxPrice) {
      queryArgs.filter.push(
        `variants.price.centAmount:range (${
          minPrice ? minPrice * 100 : '*'
        } to ${maxPrice ? maxPrice * 100 : '*'})`,
      );
    }
  }

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
}
