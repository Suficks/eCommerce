import { Product } from '@commercetools/platform-sdk';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

import { ProductSlider } from '@/pages/ProductPage/ProductSlider/productSlider';
import { getProductByKey } from '@/shared/api/requests/getProduct';
import noImage from '@/shared/assets/images/No-Image.webp';
import plantFromProductPage from '@/shared/assets/images/plantFromProductPage.png';
import { Card } from '@/shared/ui/Card/Card';
import { Button } from '@/shared/ui/button/button';
import { LoadingAnimation } from '@/shared/ui/loadingAnimation/loadingAnimation';
import { ConverterPrice } from '@/shared/util/converterPrice';
import cls from './productCard.module.scss';

export const ProductCard = () => {
  const [product, setProduct] = useState<Product | null>(null);
  // const productTypeId = product?.productType.id;
  const imagesArr =
    product?.masterData?.current?.masterVariant?.images?.length === 0 ||
    product?.masterData?.current?.masterVariant?.images === undefined
      ? [
          {
            url: noImage,
            dimensions: {
              w: 1665,
              h: 2048,
            },
          },
        ]
      : product?.masterData?.current?.masterVariant?.images;

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
        const fetchedProduct = await getProductByKey('safety-razor-set');
        // const fetchedProduct = await getProductByKey('charcoal-filter-carafe');
        // const fetchedProduct = await getProductByKey('carbon-water-filter');
        setProduct(fetchedProduct);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      }
    };

    fetchProduct();
  }, []);
  return (
    <div className={cls.productCard}>
      <img src={plantFromProductPage} alt="" className={cls.plantImage} />
      {imagesArr.length === 1 ? (
        <Card width={300} image={imagesArr[0].url} className={cls.imageCard} />
      ) : (
        <ProductSlider images={imagesArr} />
      )}
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
            <Button text="Add to card" transparent className={cls.buyButtons} />
          </div>
        </div>
      ) : (
        <LoadingAnimation />
      )}
    </div>
  );
};
