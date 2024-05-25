/* eslint-disable no-restricted-globals */
import { Product } from '@commercetools/platform-sdk';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

import { getProductByKey } from '@/shared/api/requests/getProduct';
import { ProductSlider } from '@/shared/ui/ProductSlider/productSlider';
import { Button } from '@/shared/ui/button/button';
import { LoadingAnimation } from '@/shared/ui/loadingAnimation/loadingAnimation';
import { ConverterPrice } from '@/shared/util/converterPrice';
import { Footer } from '@/widgets/Footer/Footer';
import { Header } from '@/widgets/Header/Header';
import cls from './ProductPage.module.scss';

export const ProductPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const price: string = product?.masterData.current.masterVariant.prices
    ? ConverterPrice(
        product?.masterData.current.masterVariant.prices[0].value.centAmount,
      )
    : '';
  const discountedPrice = product?.masterData.current.masterVariant.prices?.[0]
    .discounted?.value.centAmount
    ? ConverterPrice(
        product.masterData.current.masterVariant.prices[0].discounted.value
          .centAmount,
      )
    : '';
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getProductByKey('cotton-bag');
        setProduct(fetchedProduct);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      }
    };

    fetchProduct();
  }, []);
  return (
    <div className={cls.wrapper}>
      <Header />
      <button
        type="button"
        className={cls.buttonBack}
        onClick={() => history.back()}
      >
        &larr;
      </button>
      <div className={cls.main}>
        <div className={cls.productCard}>
          <ProductSlider
            images={product?.masterData?.current?.masterVariant?.images || []}
          />{' '}
          {product ? (
            <div className={cls.productData}>
              <h1 className={cls.productName}>
                {product.masterData.current.name['en-GB']}
              </h1>
              <p className={cls.productDescription}>
                {product.masterData.current.description?.['en-GB']}
              </p>
              <div className={cls.priceWrapper}>
                <span
                  className={classNames(cls.price, {
                    [cls.crossed]: discountedPrice,
                  })}
                >
                  {price}
                </span>
                <span
                  className={classNames(
                    {
                      [cls.price]: discountedPrice,
                    },
                    cls.discountedPrice,
                  )}
                >
                  {discountedPrice}
                </span>
              </div>
              <div className={cls.buttonsWrapper}>
                <Button text="Buy now" className={cls.buyButtons} />
                <Button
                  text="Add to card"
                  transparent
                  className={cls.buyButtons}
                />
              </div>
            </div>
          ) : (
            <LoadingAnimation />
          )}
        </div>
        <div className={cls.SimilarPrompts}>
          <p>Similar Prompts</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};
