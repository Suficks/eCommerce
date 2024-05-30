import { useCallback } from 'react';

import { searchFilterSort } from '../model/services/searchFilerSort';
import { catalogActions } from '../model/slice/catalogSlice';
import {
  getCatalogPageBrands,
  getCatalogPageSelectedBrands,
  getCatalogPageMaxPrice,
  getCatalogPageMinPrice,
  getCatalogPageSearch,
} from '../model/selectors/catalogPageSelectors';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { SortingConsts } from '@/shared/const/SortingParams';

export const useCatalogFilters = () => {
  const dispatch = useAppDispatch();
  const search = useAppSelector(getCatalogPageSearch);
  const brandAttributes = useAppSelector(getCatalogPageBrands);
  const selectedBrands = useAppSelector(getCatalogPageSelectedBrands);
  const maxPrice = useAppSelector(getCatalogPageMaxPrice);
  const minPrice = useAppSelector(getCatalogPageMinPrice);

  const fetchData = useCallback(() => {
    dispatch(searchFilterSort());
  }, [dispatch]);

  const debouncedFetchData = useDebounce(fetchData, 500);

  const onChangeSearch = useCallback(
    (searchString: string) => {
      dispatch(catalogActions.setSearch(searchString));
      debouncedFetchData();
    },
    [dispatch, debouncedFetchData],
  );

  const onChangeOrder = useCallback(
    (value: SortingConsts) => {
      dispatch(catalogActions.setOrder(value));
      fetchData();
    },
    [dispatch, fetchData],
  );

  const onChangeMaxPrice = useCallback(
    (newPrice: string) => {
      dispatch(catalogActions.changeMaxPrice(newPrice));
      fetchData();
    },
    [dispatch, fetchData],
  );

  const onChangeMinPrice = useCallback(
    (newPrice: string) => {
      dispatch(catalogActions.changeMinPrice(newPrice));
      fetchData();
    },
    [dispatch, fetchData],
  );

  const onAddBrands = useCallback(
    (value: string) => {
      dispatch(catalogActions.setFilters(value));
      fetchData();
    },
    [dispatch, fetchData],
  );

  const onRemoveSelectedBrands = useCallback(
    (value: string) => {
      dispatch(catalogActions.removeSelectedFilter(value));
      fetchData();
    },
    [dispatch, fetchData],
  );

  const onRemoveAllFilters = useCallback(() => {
    dispatch(catalogActions.removeAllFilters());
    fetchData();
  }, [dispatch, fetchData]);

  return {
    brandAttributes,
    search,
    selectedBrands,
    maxPrice,
    minPrice,
    onChangeOrder,
    onChangeSearch,
    onAddBrands,
    onRemoveSelectedBrands,
    onRemoveAllFilters,
    onChangeMaxPrice,
    onChangeMinPrice,
  };
};
