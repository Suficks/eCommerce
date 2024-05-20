import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import { useEffect } from 'react';
import Bottle from '@/shared/assets/images/bottle.svg';
import Cloud from '@/shared/assets/images/cloud.svg';
import Hands from '@/shared/assets/images/hands.svg';
import HeaderImage from '@/shared/assets/images/header1.jpg';
import Icon_facebook from '@/shared/assets/images/icon_facebook.png';
import Icon_instagram from '@/shared/assets/images/icon_instagram.png';
import Icon_telegram from '@/shared/assets/images/icon_telegram.png';
import Icon_youtube from '@/shared/assets/images/icon_youtube.png';
import Background from '@/shared/assets/images/info_background.webp';
import MainLeaf from '@/shared/assets/images/main_leaf.svg';
import Product_1 from '@/shared/assets/images/product_1.png';
import Product_2 from '@/shared/assets/images/product_2.png';
import Product_3 from '@/shared/assets/images/product_3.png';
import animation_background from '@/shared/assets/video/background_video.mp4';
import { Card } from '@/shared/ui/Card/Card';
import { Icon } from '@/shared/ui/Icon/Icon';
import { Header } from '@/widgets/Header/Header';

import { Routes } from '@/app/providers/RouterConfig/RouteConfig';
import cls from './MainPage.module.scss';

interface MainPageProps {
  className?: string;
}

export const MainPage = (props: MainPageProps) => {
  const { className } = props;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className={classNames(cls.MainPage, {}, [className])}>
      <div className={cls.wrapper}>
        <img src={HeaderImage} alt="" className={cls.headerImage} />
        <Header />
        <section className={cls.mainBlock}>
          <h1 className={cls.title}>Don’t Panic, it’s</h1>
          <h1 className={cls.subtitle}>Organic</h1>
          <NavLink to={Routes.CATALOG} className={cls.linkAsButton}>
            Explore More
          </NavLink>
          <Icon Svg={MainLeaf} className={cls.mainLeaf} />
        </section>
        <section className={cls.infoBlock}>
          <Card
            width={1200}
            className={cls.card}
            text="Shop guilt-free knowing that our eco-friendly e-commerce platform is committed to reducing environmental 
          impact and promoting sustainable practices in every step of the shopping process"
          />
          <img src={Background} className={cls.infoBackground} alt="" />
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
                <NavLink to={Routes.CATALOG}>
                  <Card image={Product_1} alt="product_1" width={210} />
                </NavLink>
                <NavLink to={Routes.CATALOG}>
                  <Card image={Product_3} alt="product_3" width={230} />
                </NavLink>
                <NavLink to={Routes.CATALOG}>
                  <Card image={Product_2} alt="product_2" width={210} />
                </NavLink>
              </div>
              <NavLink to={Routes.CATALOG} className={cls.linkAsButton}>
                Shop more
              </NavLink>
            </div>
          </div>
          <div className={cls.socialMedia}>
            <video autoPlay loop muted className={cls.videoBackground}>
              <source src={animation_background} type="video/mp4" />
            </video>
            <p>Let’s get Social!</p>
            <div className={cls.iconWrapper}>
              <NavLink to="https://www.instagram.com/ecobar_by/?hl=ru">
                <img
                  src={Icon_instagram}
                  alt="our_instagram"
                  className={cls.icon}
                />
              </NavLink>
              <NavLink to="https://t.me/noplasticitsfantastic_store">
                <img
                  src={Icon_telegram}
                  alt="our_telegram"
                  className={cls.icon}
                />
              </NavLink>
              <NavLink to="https://www.facebook.com/ecobarby/">
                <img
                  src={Icon_facebook}
                  alt="our_facebook"
                  className={cls.icon}
                />
              </NavLink>
              <NavLink to="https://www.youtube.com/channel/UC9XoSUHD5wztVgqnCKQqSDg">
                <img
                  src={Icon_youtube}
                  alt="our_youtube"
                  className={cls.icon}
                />
              </NavLink>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
