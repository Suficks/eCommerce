import { ProductProjection } from '@commercetools/platform-sdk';
import classNames from 'classnames';
import { useNavigate } from 'react-router';
import { CiSearch } from 'react-icons/ci';

import { Title } from '@/shared/ui/Title/Title';
import { ConverterPrice } from '@/shared/util/converterPrice';
import { MathRandom } from '@/shared/util/MathRandom';
import { Button } from '@/shared/ui/button/button';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux';
import { getProductPath } from '../../model/services/getProductPath';
import { LoadingAnimation } from '@/shared/ui/loadingAnimation/loadingAnimation';
import { Input } from '@/shared/ui/input/input';
import { getCatalogPageIsLoading } from '../../model/selectors/catalogPageSelectors';
import cls from './AllProductsBlock.module.scss';
import { useCatalogFilters } from '../../hooks/useCatalogPageFilters';

interface AllProductsBlockProps {
  className?: string;
  products: ProductProjection[];
}

export const AllProductsBlock = ({
  className,
  products,
}: AllProductsBlockProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useAppSelector(getCatalogPageIsLoading);
  const { search, onChangeSearch } = useCatalogFilters();

  if (isLoading) {
    return <LoadingAnimation />;
  }

  const handleOnClick =
    (productKey: string, categoryKey: string, itemName: string) => async () => {
      const { category, subCategory } = await dispatch(
        getProductPath({ productKey, categoryKey }),
      ).unwrap();
      navigate(`catalog/${category}/${subCategory}/${itemName}`);
    };

  return (
    <section className={classNames(cls.AllProductsBlock, className)}>
      <Title
        subtitle="All products"
        title="Explore Our Products"
        className={cls.title}
      />
      <Input
        value={search}
        onChange={onChangeSearch}
        className={cls.input}
        placeholder="Поиск"
        icon={<CiSearch className={cls.icon} />}
      />
      <div className={cls.products}>
        {products.map((item) => {
          const { masterVariant } = item;
          const { images, prices = [] } = masterVariant;
          const { value: regularPrice } = prices[0];

          return (
            <div key={item.id} className={cls.product}>
              <img src={images?.[0]?.url || ''} alt="" className={cls.image} />
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
                  item.key || '',
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
      </div>
    </section>
  );
};
