import Slider from 'react-slick';
import classNames from 'classnames';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Card } from '@/shared/ui/Card/Card';
import BagImage from '@/shared/assets/images/bag_image.jpg';
import CaseImage from '@/shared/assets/images/case_image.jpg';
import CandleImage from '@/shared/assets/images/candle_image.jpg';
import { AppLink } from '@/shared/ui/AppLink/AppLink';

import cls from './MainBlock.module.scss';

export const SliderComponent = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: 'linear',
  };
  return (
    <Slider {...settings} className={cls.mainBlock_slider}>
      <Card className={classNames(cls.card)}>
        <img src={BagImage} alt="" className={cls.image} />
        <div className={cls.text_wrapper}>
          <h1 className={cls.title}>Karigar</h1>
          <h1 className={cls.subtitle}>Up to 10% off Bags</h1>
          <AppLink underlined to="accessories/bags">
            Shop Now
          </AppLink>
        </div>
      </Card>
      <Card className={classNames(cls.card)}>
        <img src={CaseImage} alt="" className={cls.image} />
        <div className={cls.text_wrapper}>
          <h1 className={cls.title}>Soloma</h1>
          <h1 className={cls.subtitle}>Up to 15% off Cases</h1>
          <AppLink underlined to="accessories/cases">
            Shop Now
          </AppLink>
        </div>
      </Card>
      <Card className={classNames(cls.card)}>
        <img src={CandleImage} alt="" className={cls.image} />
        <div className={cls.text_wrapper}>
          <h1 className={cls.title}>Self Care</h1>
          <h1 className={cls.subtitle}>Up to 20% off Candles</h1>
          <AppLink underlined to="self-care/shower-and-shave">
            Shop Now
          </AppLink>
        </div>
      </Card>
    </Slider>
  );
};
