import { ProductProjection } from '@commercetools/platform-sdk';
import classNames from 'classnames';
import { useNavigate } from 'react-router';

import { SliderComponent } from '@/pages/CatalogPage/ui/SalesBlock/Slider';
import noImage from '@/shared/assets/images/No-Image.webp';
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
  const onHandleClick = (key: string) => () => {
    navigate(`/product/${key}`);
  };

  return (
    <section className={classNames(cls.SimilarPrompts, className)}>
      <div className={cls.similarTitle}>Similar Prompts</div>
      <SliderComponent>
        {products.map(({ key, name, masterVariant }) => {
          const { images, prices = [] } = masterVariant;

          const { value: regularPrice } = prices[0];
          const salePrice = prices[0].discounted?.value;

          return (
            <ProductCard
              onClick={onHandleClick(key || '')}
              key={key}
              image={images?.[0].url || noImage}
              name={name['en-GB']}
              price={ConverterPrice(regularPrice.centAmount)}
              sale={salePrice && ConverterPrice(salePrice.centAmount)}
              stars={MathRandom(3, 5)}
              reviews={MathRandom(1, 100)}
            />
          );
        })}
      </SliderComponent>
    </section>
  );
};
