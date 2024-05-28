import { memo, useEffect } from 'react';
import classNames from 'classnames';

import { Header } from '@/widgets/Header/Header';
import { MainBlock } from '../MainBlock/MainBlock';
import { SalesBlock } from '../SalesBlock/SalesBlock';
import { CategoriesBlock } from '../CategoriesBlock/CategoriesBlock';
import { fetchProducts } from '../../model/services/fetchProducts';
import { AllProductsBlock } from '../AllProductsBlock/AllProductsBlock';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux';
import { Footer } from '@/widgets/Footer/Footer';
import { LoadingAnimation } from '@/shared/ui/loadingAnimation/loadingAnimation';
import {
  getCatalogPageCategories,
  getCatalogPageIsLoading,
  getCatalogPageProducts,
} from '../../model/selectors/catalogPageSelectors';

import cls from './CatalogPage.module.scss';

interface CatalogPageProps {
  className?: string;
}

export const CatalogPage = memo(({ className }: CatalogPageProps) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(getCatalogPageIsLoading);
  const products = useAppSelector(getCatalogPageProducts);
  const categories = useAppSelector(getCatalogPageCategories);
  const discountProducts = useAppSelector(
    (state) => state.catalog.discountProducts,
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProducts({ currentOffset: 6, itemPerPage: 6 }));
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
        <MainBlock categories={categories} />
        <SalesBlock discountProducts={discountProducts} />
        <CategoriesBlock categories={categories} />
        <AllProductsBlock products={products} />
        <Footer />
      </div>
    </main>
  );
});
