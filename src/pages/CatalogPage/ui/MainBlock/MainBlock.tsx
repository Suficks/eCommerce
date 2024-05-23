import classNames from 'classnames';
import { useEffect, useState } from 'react';

import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { useAppDispatch } from '@/shared/hooks/redux';
import { fetchCategories } from '../../model/services/fetchCategories';
import { CategoryCustom } from '@/shared/api/types/apiTypes';
import { SliderComponent } from './Slider';

import cls from './MainBlock.module.scss';

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
          <AppLink
            to={`/catalog/${parent.path}`}
            key={parent.id}
            className={cls.item}
          >
            {parent.name}
          </AppLink>
        ))}
      </ul>
      <div className={cls.separator} />
      <SliderComponent />
    </section>
  );
};
