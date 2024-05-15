import classNames from 'classnames';

import { Header } from '@/widgets/Header/Header';
import { Button } from '@/shared/ui/button/button';
import { Icon } from '@/shared/ui/Icon/Icon';
import { Card } from '@/shared/ui/Card/Card';
import MainLeaf from '@/shared/assets/images/main_leaf.svg';
import Background from '@/shared/assets/images/info_background.webp';
import HeaderImage from '@/shared/assets/images/header1.jpg';
import Bottle from '@/shared/assets/images/bottle.svg';
import Cloud from '@/shared/assets/images/cloud.svg';
import Hands from '@/shared/assets/images/hands.svg';
import Product_1 from '@/shared/assets/images/product_1.png';
import Product_2 from '@/shared/assets/images/product_2.png';
import Product_3 from '@/shared/assets/images/product_3.png';

import cls from './MainPage.module.scss';

interface MainPageProps {
  className?: string;
}

export const MainPage = (props: MainPageProps) => {
  const { className } = props;
  return (
    <main className={classNames(cls.MainPage, {}, [className])}>
      <img src={HeaderImage} alt="headerImage" className={cls.headerImage} />
      <Header />
      <section className={cls.mainBlock}>
        <h1 className={cls.title}>Don’t Panic, it’s</h1>
        <h1 className={cls.subtitle}>Organic</h1>
        <Button text="Explore More" transparent className={cls.button} />
        <Icon Svg={MainLeaf} className={cls.mainLeaf} />
      </section>
      <section className={cls.infoBlock}>
        <Card
          width={1200}
          className={cls.card}
          text="Shop guilt-free knowing that our eco-friendly e-commerce platform is committed to reducing environmental 
          impact and promoting sustainable practices in every step of the shopping process"
        />
        <img src={Background} className={cls.infoBackground} alt="background" />
      </section>
      <section className={cls.addInfo}>
        <div className={cls.benefitsSection}>
          <p className={cls.question}>Why Buy from Us?</p>
          <div className={cls.ecologicalBenefits}>
            <div className={cls.oneBenefit}>
              <Card svg={Bottle} width={205} text="641,698 +" green />
              <p>Zero Plastic Products Sold</p>
            </div>
            <div className={cls.oneBenefit}>
              <Card svg={Cloud} width={205} text="42,780" green />
              <p>Tons Carbon Emission Prevented</p>
            </div>
            <div className={cls.oneBenefit}>
              <Card svg={Hands} width={205} text="50+" green />
              <p>Livelihoods Created</p>
            </div>
          </div>
        </div>
        <div className={cls.featuredProducts}>
          <p className={cls.question}>Featured Products</p>
          <div className={cls.products}>
            <div className={cls.productsWrapper}>
              <Card image={Product_1} alt="product_1" width={210} />
              <Card image={Product_2} alt="product_2" width={210} />
              <Card image={Product_3} alt="product_3" width={210} />
            </div>
            <Button text="Shop more" className={cls.buttonMore} />
          </div>
        </div>
      </section>
    </main>
  );
};
