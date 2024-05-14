import classNames from 'classnames';

import { Button } from '@/shared/ui/button/button';
import MainLeaf from '@/shared/assets/images/main_leaf.svg';
import { Icon } from '@/shared/ui/Icon/Icon';

import cls from './MainPage.module.scss';

interface MainPageProps {
  className?: string;
}

export const MainPage = (props: MainPageProps) => {
  const { className } = props;
  return (
    <main className={classNames(cls.MainPage, {}, [className])}>
      <div className={cls.mainBlock}>
        <h1 className={cls.title}>Don’t Panic, it’s</h1>
        <h1 className={cls.subtitle}>Organic</h1>
        <Button text="Explore More" transparent className={cls.button} />
        <Icon Svg={MainLeaf} className={cls.mainLeaf} />
      </div>
    </main>
  );
};
