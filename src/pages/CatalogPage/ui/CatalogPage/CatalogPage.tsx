import { memo } from 'react';
import classNames from 'classnames';

import { Header } from '@/widgets/Header/Header';
import { MainBlock } from '../MainBlock/MainBlock';

import cls from './CatalogPage.module.scss';

interface CatalogPageProps {
  className?: string;
}

export const CatalogPage = memo(({ className }: CatalogPageProps) => {
  return (
    <main className={classNames(cls.CatalogPage, {}, [className])}>
      <div className="wrapper">
        <Header />
        <MainBlock />
      </div>
    </main>
  );
});
