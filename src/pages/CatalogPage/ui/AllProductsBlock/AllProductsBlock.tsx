import { ProductProjection } from '@commercetools/platform-sdk';
import classNames from 'classnames';
import { useNavigate } from 'react-router';

import { getCategoryById, getProductTypeById } from '@/shared/api';
import { Title } from '@/shared/ui/Title/Title';
import { ConverterPrice } from '@/shared/util/converterPrice';
import { MathRandom } from '@/shared/util/MathRandom';
import { Button } from '@/shared/ui/button/button';
import { SliderArrowPrev } from '@/shared/ui/SliderArrows/SliderArrowPrev';
import { SliderArrowNext } from '@/shared/ui/SliderArrows/SliderArrowNext';

import cls from './AllProductsBlock.module.scss';

interface AllProductsBlockProps {
  className?: string;
  products: ProductProjection[];
}

export const AllProductsBlock = ({
  className,
  products,
}: AllProductsBlockProps) => {
  const navigate = useNavigate();

  const handleOnClick =
    (
      productKey: string = '',
      categoryKey: string = '',
      itemName: string = '',
    ) =>
    async () => {
      const [{ key: category }] = await getProductTypeById(productKey);
      const [{ key: subCategory }] = await getCategoryById(categoryKey);

      navigate(`catalog/${category}/${subCategory}/${itemName}`);
    };

  return (
    <section className={classNames(cls.AllProductsBlock, className)}>
      <Title
        subtitle="All products"
        title="Explore Our Products"
        className={cls.title}
      />
      <div className={cls.products}>
        <SliderArrowPrev position className={cls.prev} />
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
                onClick={handleOnClick(
                  item.productType.id,
                  item.categories?.[0].id,
                  item.key,
                )}
                small
                className={cls.button}
                transparent
                text="Buy Now"
                green
              />
            </div>
          );
        })}
        <SliderArrowNext position className={cls.next} />
      </div>
    </section>
  );
};
