/* eslint-disable no-restricted-globals */
import { Product } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';

import { getProductByKey } from '@/shared/api/requests/getProduct';
import { ProductSlider } from '@/shared/ui/ProductSlider/productSlider';
import { LoadingAnimation } from '@/shared/ui/loadingAnimation/loadingAnimation';
import { Footer } from '@/widgets/Footer/Footer';
import { Header } from '@/widgets/Header/Header';
import cls from './ProductPage.module.scss';

export const ProductPage = () => {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getProductByKey('toothbrush-2');
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
      <button type="button" onClick={() => history.back()}>
        goBack
      </button>
      <div className={cls.main}>
        <div className={cls.productCard}>
          <ProductSlider
            images={product?.masterData?.current?.masterVariant?.images || []}
          />{' '}
          {product ? (
            <div>
              <h1>{product.masterData.current.name['en-GB']}</h1>
              <p>{product.masterData.current.description?.['en-GB']}</p>
            </div>
          ) : (
            <LoadingAnimation />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};
