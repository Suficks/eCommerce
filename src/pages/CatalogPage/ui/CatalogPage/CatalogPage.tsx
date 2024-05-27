import { memo, useEffect, useState } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';
import classNames from 'classnames';

import { Header } from '@/widgets/Header/Header';
import { MainBlock } from '../MainBlock/MainBlock';
import { SalesBlock } from '../SalesBlock/SalesBlock';
import { CategoriesBlock } from '../CategoriesBlock/CategoriesBlock';
import { fetchCategories } from '../../model/services/fetchCategories';
import { useAppDispatch } from '@/shared/hooks/redux';
import { CategoryCustom } from '@/shared/api';
// import { useAppDispatch } from '@/shared/hooks/redux';
// import { fetchAllProducts } from '../../model/services/fetchDiscountProducts';

import cls from './CatalogPage.module.scss';

interface CatalogPageProps {
  className?: string;
}

export const CatalogPage = memo(({ className }: CatalogPageProps) => {
  const dispatch = useAppDispatch();
  // const [products, setProducts] = useState<ProductProjection[]>([]);
  const [categories, setCategories] = useState<CategoryCustom[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const resultAction = await dispatch(fetchCategories()).unwrap();
      setCategories(resultAction);
    };
    fetchData();
  }, [dispatch]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const resultAction = await dispatch(fetchAllProducts()).unwrap();
  //     setProducts(resultAction);
  //   };
  //   fetchData();
  // }, [dispatch]);

  return (
    <main className={classNames(cls.CatalogPage, {}, [className])}>
      <div className="wrapper">
        <Header />
        <MainBlock categories={categories} />
        <SalesBlock />
        <CategoriesBlock categories={categories} />
      </div>
    </main>
  );
});
