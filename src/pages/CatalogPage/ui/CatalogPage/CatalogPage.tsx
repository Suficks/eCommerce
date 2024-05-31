import { createRef, memo, useCallback, useEffect } from 'react';
import classNames from 'classnames';

import { Header } from '@/widgets/Header/Header';
import { MainBlock } from '../MainBlock/MainBlock';
import { SalesBlock } from '../SalesBlock/SalesBlock';
import { FiltersBlock } from '../FiltersBlock/FiltersBlock';
import { fetchProducts } from '../../model/services/fetchProducts';
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

import cls from './CatalogPage.module.scss';
import { Breadcrumbs } from '@/features/Breadcrumbs/ui/Breadcrumbs';

interface CatalogPageProps {
  className?: string;
}

export const CatalogPage = memo(({ className }: CatalogPageProps) => {
  const dispatch = useAppDispatch();
  const ref = createRef<HTMLDivElement>();
  const isLoading = useAppSelector(getCatalogPageIsLoading);
  const products = useAppSelector(getCatalogPageProducts);
  const categories = useAppSelector(getCatalogPageCategories);
  const discountProducts = useAppSelector(getCatalogPageDiscountProducts);

  const scrollIntoSection = useCallback(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [ref]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProducts({ currentOffset: 0, itemPerPage: 80 }));
    };
    fetchData();
  }, [dispatch]);

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
        <Breadcrumbs />
        <AllProductsBlock products={products} ref={ref} />
        <Footer />
      </div>
    </main>
  );
});
