import { createRef, memo, useCallback, useEffect } from 'react';
import classNames from 'classnames';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';

import { NotFound } from '@commercetools/sdk-client-v2/dist/declarations/src/sdk-client/errors';
import { Header } from '@/widgets/Header/Header';
import { MainBlock } from '../MainBlock/MainBlock';
import { SalesBlock } from '../SalesBlock/SalesBlock';
import { FiltersBlock } from '../FiltersBlock/FiltersBlock';
import { fetchAllProducts } from '../../model/services/fetchAllProducts';
import { AllProductsBlock } from '../AllProductsBlock/AllProductsBlock';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux';
import { Footer } from '@/widgets/Footer/Footer';
import { LoadingAnimation } from '@/shared/ui/loadingAnimation/loadingAnimation';
import {
  getCatalogPageCategories,
  getCatalogPageDiscountProducts,
  getCatalogPageIsLoading,
  getCatalogPageProducts,
} from '../../model/selectors/catalogPageSelectors';
import { Breadcrumbs } from '@/features/Breadcrumbs/ui/Breadcrumbs';
import { getCategoriesByKey } from '../../model/services/getCategoriesByKey';
import { useCatalogFilters } from '../../hooks/useCatalogPageFilters';
import { getAdditionalInfo } from '../../model/services/getAdditionalInfo';
import { ToastConfig } from '@/shared/const/ToastConfig';

import cls from './CatalogPage.module.scss';
import { catalogActions } from '../../model/slice/catalogSlice';

interface CatalogPageProps {
  className?: string;
}

export const CatalogPage = memo(({ className }: CatalogPageProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const ref = createRef<HTMLDivElement>();
  const isLoading = useAppSelector(getCatalogPageIsLoading);
  const products = useAppSelector(getCatalogPageProducts);
  const categories = useAppSelector(getCatalogPageCategories);
  const discountProducts = useAppSelector(getCatalogPageDiscountProducts);
  const { categoryId, subcategoryId } = useParams();
  const { onChangeSelectedCategory } = useCatalogFilters();

  const scrollIntoSection = useCallback(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [ref]);

  const fetchCategory = useCallback(
    async (id: string) => {
      try {
        const result = await dispatch(getCategoriesByKey(id)).unwrap();
        if (result) {
          return result;
        }
      } catch (e) {
        navigate('/*');
        toast.error(
          'Failed to fetch product or invalid URL parameters',
          ToastConfig,
        );
        return '';
      }
      return '';
    },
    [dispatch, navigate],
  );

  const getAdditionalInfoHandler = useCallback(async () => {
    await dispatch(getAdditionalInfo());
  }, [dispatch]);

  const getAllProductsHandler = useCallback(async () => {
    await dispatch(fetchAllProducts({ currentOffset: 0, itemPerPage: 80 }));
  }, [dispatch]);

  useEffect(() => {
    const fetchAndSetCategory = async () => {
      let category = '';

      if (subcategoryId) {
        category = await fetchCategory(subcategoryId);
      }
      if (!category && categoryId) {
        category = await fetchCategory(categoryId);
      }
      if (category) {
        onChangeSelectedCategory(category);
      }
    };
    getAdditionalInfoHandler();
    fetchAndSetCategory();

    if (!subcategoryId && !categoryId) {
      getAllProductsHandler();
    }
  }, [
    categoryId,
    subcategoryId,
    onChangeSelectedCategory,
    fetchCategory,
    getAdditionalInfoHandler,
    getAllProductsHandler,
    dispatch,
  ]);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <main className={classNames(cls.CatalogPage, {}, [className])}>
      <div className="wrapper">
        <Header />
        <MainBlock
          categories={categories}
          scrollIntoSection={scrollIntoSection}
        />
        <SalesBlock discountProducts={discountProducts} />
        <FiltersBlock categories={categories} />
        <Breadcrumbs scrollIntoSection={scrollIntoSection} />
        <AllProductsBlock products={products} ref={ref} />
        <Footer />
      </div>
    </main>
  );
});
