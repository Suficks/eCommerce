import { ReactNode } from 'react';
import Slider from 'react-slick';

import { SliderArrowNext } from '@/shared/ui/SliderArrows/SliderArrowNext';
import { SliderArrowPrev } from '@/shared/ui/SliderArrows/SliderArrowPrev';

export const SliderComponent = ({ children }: { children: ReactNode }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: true,
    nextArrow: <SliderArrowNext position />,
    prevArrow: <SliderArrowPrev position />,
  };
  return <Slider {...settings}>{children}</Slider>;
};
