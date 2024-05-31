import { ProductProjection } from '@commercetools/platform-sdk';
import classNames from 'classnames';
import { useNavigate } from 'react-router';

import { ConverterPrice } from '@/shared/util/converterPrice';
import { Button } from '@/shared/ui/button/button';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux';
import { getProductPath } from '../../model/services/getProductPath';
import { LoadingAnimation } from '@/shared/ui/loadingAnimation/loadingAnimation';
import {
  getCatalogPageIsLoading,
  getCatalogPageProducts,
} from '../../model/selectors/catalogPageSelectors';

import cls from './AllProductsBlock.module.scss';

interface AllProductsBlockProps {
  className?: string;
}

export const AllProductsBlock = ({ className }: AllProductsBlockProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useAppSelector(getCatalogPageIsLoading);
  const products = useAppSelector(getCatalogPageProducts); // Тут мы должны получать продукты в соответствии с линком (категория/подкатегория)
  if (isLoading) {
    return <LoadingAnimation />;
  }

  const handleOnClick =
    (productKey: string, categoryKey: string, itemName: string) => async () => {
      const { category, subCategory } = await dispatch(
        getProductPath({ productKey, categoryKey }),
      ).unwrap();
      navigate(`${category}/${subCategory}/${itemName}`);
    };

  return (
    <section className={classNames(cls.AllProductsBlock, className)}>
      <div className={cls.products}>
        {products.length === 0 && (
          <div className={cls.no_products}>Products not found</div>
        )}
        {products.map((item) => {
          const { masterVariant } = item;
          const { images, prices = [] } = masterVariant;
          const { value: regularPrice, discounted } = prices[0];

          return (
            <div key={item.id} className={cls.product}>
              <img src={images?.[0]?.url || ''} alt="" className={cls.image} />
              <p className={cls.name}>{item.name['en-GB']}</p>
              <div className={cls.price_wrapper}>
                {discounted ? (
                  <div className={cls.prices}>
                    <p className={cls.price}>
                      {ConverterPrice(discounted?.value.centAmount)}
                    </p>
                    <p className={cls.discounted}>
                      {ConverterPrice(regularPrice?.centAmount)}
                    </p>
                  </div>
                ) : (
                  <p className={cls.price}>
                    {ConverterPrice(regularPrice?.centAmount)}
                  </p>
                )}
                <p className={cls.reviews}>186 Reviews</p>
              </div>
              <p className={cls.description}>{item.description?.['en-GB']}</p>
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
