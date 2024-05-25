import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import { Card } from '../Card/Card';
import cls from './productSlider.module.scss';

interface Image {
  url: string;
}

interface ProductSliderProps {
  images: Image[];
}

export const ProductSlider = ({ images }: ProductSliderProps) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fullscreen: true,
  };

  return (
    <div className={cls.sliderWrapper}>
      <Slider {...settings} className={cls.productSlider}>
        {images.map((image) => (
          <div key={image.url}>
            <Card width={380} image={image.url} className={cls.productImage} />
          </div>
        ))}
      </Slider>
    </div>
  );
};
