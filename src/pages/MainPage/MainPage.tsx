import classNames from 'classnames';

import MainLeaf from '@/shared/assets/images/main_leaf.svg';
import Background from '@/shared/assets/images/info_background.webp';
import { Button } from '@/shared/ui/button/button';
import { Icon } from '@/shared/ui/Icon/Icon';
import { Card } from '@/shared/ui/Card/Card';

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
      <div className={cls.infoBlock}>
        <Card
          width={1200}
          className={cls.card}
          text="Shop guilt-free knowing that our eco-friendly e-commerce platform is committed to reducing environmental 
          impact and promoting sustainable practices in every step of the shopping process"
        />
        <img src={Background} className={cls.infoBackground} alt="background" />
      </div>
    </main>
  );
};
