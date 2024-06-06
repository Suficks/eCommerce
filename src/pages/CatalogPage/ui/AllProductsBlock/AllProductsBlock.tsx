import { ProductProjection } from '@commercetools/platform-sdk';
import classNames from 'classnames';
import { useNavigate } from 'react-router';
import { forwardRef, useCallback } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import { ConverterPrice } from '@/shared/util/converterPrice';
import { Button } from '@/shared/ui/button/button';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux';
import { getProductPath } from '../../model/services/getProductPath';
import { LoadingAnimation } from '@/shared/ui/loadingAnimation/loadingAnimation';
import {
  getCatalogPageHasMore,
  getCatalogPageIsLoading,
  getCatalogPageLimit,
} from '../../model/selectors/catalogPageSelectors';
import { fetchNextPart } from '../../model/services/fetchNextPart';

import cls from './AllProductsBlock.module.scss';

interface AllProductsBlockProps {
  className?: string;
  products: ProductProjection[];
}

export const AllProductsBlock = forwardRef<
  HTMLDivElement,
  AllProductsBlockProps
>(({ className, products }, ref) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useAppSelector(getCatalogPageIsLoading);
  const hasMore = useAppSelector(getCatalogPageHasMore);
  const limit = useAppSelector(getCatalogPageLimit);

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextPart());
  }, [dispatch]);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  const handleOnClick =
    (productId: string, categoryId: string, itemName: string) => async () => {
      const { category, subCategory } = await dispatch(
        getProductPath({ productId, categoryId }),
      ).unwrap();
      navigate(`${category}/${subCategory}/${itemName}`);
    };

  return (
    <section ref={ref} className={classNames(cls.AllProductsBlock, className)}>
      <InfiniteScroll
        dataLength={products.length}
        next={onLoadNextPart}
        hasMore={hasMore}
        loader=""
      >
        <div className={cls.products}>
          {products.length === 0 && (
            <div className={cls.no_products}>Products not found</div>
          )}
          {products.map((item) => {
            const {
              masterVariant,
              id,
              productType,
              categories,
              key,
              name,
              description,
            } = item;
            const { images, prices = [] } = masterVariant;
            const { value: regularPrice, discounted } = prices[0];

            return (
              <div key={id} className={cls.product}>
                <button
                  className={cls.clickableCard}
                  type="button"
                  onClick={handleOnClick(
                    productType.id,
                    categories?.[0].id,
                    key || '',
                  )}
                >
                  <img
                    src={images?.[0]?.url || ''}
                    alt=""
                    className={cls.image}
                  />
                  <p className={cls.name}>{name['en-GB']}</p>
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
                  <p className={cls.description}>{description?.['en-GB']}</p>
                </button>
                <Button
                  small
                  className={cls.button}
                  transparent
                  text="Add to Cart"
                  green
                />
              </div>
            );
          })}
        </div>
      </InfiniteScroll>
    </section>
  );
});
