import Slider from 'react-slick';
import classNames from 'classnames';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Card } from '@/shared/ui/Card/Card';
import Product_3 from '@/shared/assets/images/product_3.png';
import Product_2 from '@/shared/assets/images/product_2.png';
import Product_1 from '@/shared/assets/images/product_1.png';
import { AppLink } from '@/shared/ui/AppLink/AppLink';

import cls from './MainBlock.module.scss';

export const SliderComponent = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: 'linear',
  };
  return (
    <Slider {...settings}>
      <Card className={classNames(cls.card)}>
        <img src={Product_3} alt="" />
        <div className={cls.text_wrapper}>
          <h1 className={cls.title}>Karigar</h1>
          <h1 className={cls.subtitle}>Up to 10% off Bags</h1>
          <AppLink underlined to="/main">
            Shop Now
          </AppLink>
        </div>
      </Card>
      <Card className={classNames(cls.card)}>
        <img src={Product_2} alt="" />
        <div className={cls.text_wrapper}>
          <h1 className={cls.title}>Soloma</h1>
          <h1 className={cls.subtitle}>Up to 15% off Cases</h1>
          <AppLink underlined to="/main">
            Shop Now
          </AppLink>
        </div>
      </Card>
      <Card className={classNames(cls.card)}>
        <img src={Product_1} alt="" />
        <div className={cls.text_wrapper}>
          <h1 className={cls.title}>Self Care</h1>
          <h1 className={cls.subtitle}>Up to 20% off Candles</h1>
          <AppLink underlined to="/main">
            Shop Now
          </AppLink>
        </div>
      </Card>
    </Slider>
  );
};
