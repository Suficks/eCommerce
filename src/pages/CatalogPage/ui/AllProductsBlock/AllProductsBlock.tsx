import { ProductProjection } from '@commercetools/platform-sdk';
import classNames from 'classnames';

import { Title } from '@/shared/ui/Title/Title';
import { ConverterPrice } from '@/shared/util/converterPrice';
import { MathRandom } from '@/shared/util/MathRandom';
import { Button } from '@/shared/ui/button/button';

import cls from './AllProductsBlock.module.scss';

interface AllProductsBlockProps {
  className?: string;
  products: ProductProjection[];
}

export const AllProductsBlock = ({
  className,
  products,
}: AllProductsBlockProps) => {
  return (
    <section className={classNames(cls.AllProductsBlock, className)}>
      <Title subtitle="All products" title="Explore Our Products" />
      <div className={cls.products}>
        {products.map((item) => {
          const { masterVariant } = item;
          const { images, prices = [] } = masterVariant;
          const { value: regularPrice } = prices[0];

          return (
            <div key={item.id} className={cls.product}>
              <img src={images?.[0].url} alt="" className={cls.image} />
              <p className={cls.name}>{item.name['en-GB']}</p>
              <div className={cls.price_wrapper}>
                <p className={cls.price}>
                  {ConverterPrice(regularPrice.centAmount)}
                </p>
                <p className={cls.reviews}>{`${MathRandom(1, 400)} Reviews`}</p>
              </div>
              <Button
                small
                className={cls.button}
                transparent
                text="Buy Now"
                green
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};
