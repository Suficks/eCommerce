import classNames from 'classnames';

import MainLeaf from '@/shared/assets/images/main_leaf.svg';
import Background from '@/shared/assets/images/info_background.webp';
import { Button } from '@/shared/ui/button/button';
import { Icon } from '@/shared/ui/Icon/Icon';
import { Card } from '@/shared/ui/Card/Card';
import Bottle from '@/shared/assets/images/bottle.svg';
import Cloud from '@/shared/assets/images/cloud.svg';
import Hands from '@/shared/assets/images/hands.svg';

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
      <section className={cls.addInfo}>
        <div className={cls.whyUs}>
          <p className={cls.question}>Why Buy from Us?</p>
          <div className={cls.ecologicalBenefits}>
            <div className={cls.oneBenefit}>
              <Card image={Bottle} width={205} text="641,698 +" green />
              <p>Zero Plastic Products Sold</p>
            </div>
            <div className={cls.oneBenefit}>
              <Card image={Cloud} width={205} text="42,780" green />
              <p>Tons Carbon Emission Prevented</p>
            </div>
            <div className={cls.oneBenefit}>
              <Card image={Hands} width={205} text="50+" green />
              <p>Livelihoods Created</p>
            </div>
          </div>
        </div>
        <div className={cls.featuredProducts}>
          <p className={cls.question}>Featured Products</p>
          <div className={cls.products}>
            <Button text="Shop more" className="buttonMore" />
          </div>
        </div>
      </section>
    </main>
  );
};
