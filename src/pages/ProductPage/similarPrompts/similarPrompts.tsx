import { ProductProjection } from '@commercetools/platform-sdk';
import classNames from 'classnames';
import { useNavigate } from 'react-router';

import { SliderComponent } from '@/pages/CatalogPage/ui/SalesBlock/Slider';
import { ProductCard } from '@/shared/ui/ProductCard/ProductCard';
import { MathRandom } from '@/shared/util/MathRandom';
import { ConverterPrice } from '@/shared/util/converterPrice';
import cls from './similarProducts.module.scss';

interface SimilarPromptsProps {
  className?: string;
  products: ProductProjection[];
}

export const SimilarPrompts = ({
  className,
  products,
}: SimilarPromptsProps) => {
  const navigate = useNavigate();

  const onHandleClick = (id: string) => () => {
    navigate(`/catalog/${id}`);
  };

  return (
    <section className={classNames(cls.SimilarPrompts, className)}>
      <div className={cls.similarTitle}>Similar Prompts</div>
      <SliderComponent>
        {products.map(({ id, name, masterVariant }) => {
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
    </section>
  );
};
