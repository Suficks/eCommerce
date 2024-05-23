import classNames from 'classnames';

import { useEffect, useState } from 'react';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { Card } from '@/shared/ui/Card/Card';
import { useAppDispatch } from '@/shared/hooks/redux';
import Product_3 from '@/shared/assets/images/product_3.png';
import { fetchCategories } from '../../model/services/fetchCategories';

import cls from './MainBlock.module.scss';
import { CategoryCustom } from '@/shared/api/types/apiTypes';

interface MainBlockProps {
  className?: string;
}

export const MainBlock = ({ className }: MainBlockProps) => {
  const dispatch = useAppDispatch();
  const [categories, setCategories] = useState<CategoryCustom[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const resultAction = await dispatch(fetchCategories()).unwrap();
      setCategories(resultAction);
    };
    fetchData();
  }, [dispatch]);

  return (
    <section className={classNames(cls.MainBlock, className)}>
      <ul className={cls.list}>
        {categories.map(({ parent }) => (
          <li key={parent.id} className={cls.item}>
            {parent.name}
          </li>
        ))}
      </ul>
      <div className={cls.separator} />
      <Card className={classNames(cls.card)}>
        <img src={Product_3} alt="" />
        <div className={cls.wrapper}>
          <h1 className={cls.title}>Karigar</h1>
          <h1 className={cls.subtitle}>Up to 10% off Voucher</h1>
          <AppLink underlined to="/main">
            Shop Now
          </AppLink>
        </div>
      </Card>
    </section>
  );
};
