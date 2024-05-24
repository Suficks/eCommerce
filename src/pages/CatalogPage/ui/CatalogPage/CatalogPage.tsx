import { memo, useEffect, useState } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';
import classNames from 'classnames';

import { Header } from '@/widgets/Header/Header';
import { MainBlock } from '../MainBlock/MainBlock';
import { SalesBlock } from '../SalesBlock/SalesBlock';
// import { useAppDispatch } from '@/shared/hooks/redux';
// import { fetchAllProducts } from '../../model/services/fetchDiscountProducts';

import cls from './CatalogPage.module.scss';

interface CatalogPageProps {
  className?: string;
}

export const CatalogPage = memo(({ className }: CatalogPageProps) => {
  // const dispatch = useAppDispatch();
  // const [products, setProducts] = useState<ProductProjection[]>([]);

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
        <MainBlock />
        <SalesBlock />
      </div>
    </main>
  );
});
