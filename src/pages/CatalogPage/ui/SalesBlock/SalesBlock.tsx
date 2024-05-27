import { useNavigate } from 'react-router';
import { ProductProjection } from '@commercetools/platform-sdk';
import classNames from 'classnames';

import { Title } from '@/shared/ui/Title/Title';
import { Icon } from '@/shared/ui/Icon/Icon';
import { ProductCard } from '@/shared/ui/ProductCard/ProductCard';
import SalesLeaf from '@/shared/assets/images/sales-leaf.svg';
import { MathRandom } from '@/shared/util/MathRandom';
import { SliderComponent } from './Slider';
import { ConverterPrice } from '@/shared/util/converterPrice';
import { SectionSeparator } from '@/shared/ui/SectionSeparator/SectionSeparator';

import cls from './SalesBlock.module.scss';

interface SalesBlockProps {
  className?: string;
  salesProducts: ProductProjection[];
}

export const SalesBlock = ({ className, salesProducts }: SalesBlockProps) => {
  const navigate = useNavigate();

  const onHandleClick = (id: string) => () => {
    navigate(`/catalog/${id}`);
  };

  return (
    <section className={classNames(cls.SalesBlock, className)}>
      <Icon Svg={SalesLeaf} className={cls.leaf} />
      <Title subtitle="Today's" title="Flash Sale" className={cls.title} />
      <SliderComponent>
        {salesProducts.map(({ id, name, masterVariant }) => {
          const { images, prices = [] } = masterVariant;
          if (prices[0].discounted) {
            const { value: regularPrice } = prices[0];
            const { value: salePrice } = prices[0].discounted;
            return (
              <ProductCard
                onClick={onHandleClick(id)}
                key={id}
                image={images?.[0].url || ''}
                name={name['en-GB']}
                price={ConverterPrice(regularPrice.centAmount)}
                sale={ConverterPrice(salePrice.centAmount)}
                stars={MathRandom(3, 5)}
                reviews={MathRandom(1, 100)}
              />
            );
          }
          return null;
        })}
      </SliderComponent>
      <SectionSeparator />
    </section>
  );
};
