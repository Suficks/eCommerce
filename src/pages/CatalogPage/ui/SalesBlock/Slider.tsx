import Slider from 'react-slick';

export const SliderComponent = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };
  return <Slider {...settings} />;
};
