import { useCallback } from 'react';

import { searchFilterSort } from '../model/services/searchFilerSort';
import { catalogActions } from '../model/slice/catalogSlice';
import { getCatalogPageSearch } from '../model/selectors/catalogPageSelectors';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { SortingConsts } from '@/shared/const/SortingParams';

export const useCatalogFilters = () => {
  const dispatch = useAppDispatch();
  const search = useAppSelector(getCatalogPageSearch);

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

  return {
    // view,
    // sort,
    search,
    // type,
    // onChangeView,
    // onChangeSort,
    onChangeOrder,
    onChangeSearch,
    // onChangeType,
  };
};
