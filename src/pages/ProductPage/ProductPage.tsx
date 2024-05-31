/* eslint-disable no-restricted-globals */
import { Product, ProductProjection } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { getProductByKey } from '@/shared/api/requests/getProduct';
import { getProductsByCategory } from '@/shared/api/requests/getProductsByCategory';
import { LoadingAnimation } from '@/shared/ui/loadingAnimation/loadingAnimation';
import { Footer } from '@/widgets/Footer/Footer';
import { Header } from '@/widgets/Header/Header';
import { FAQ } from './BlockFAQ/FAQ';
import { ProductCardBlock } from './ProductCardBlock/ProductCardBlock';
import cls from './ProductPage.module.scss';
import { SimilarPrompts } from './similarPrompts/similarPrompts';
import { Breadcrumbs } from '@/features/Breadcrumbs/ui/Breadcrumbs';

export const ProductPage = () => {
  const { productKey } = useParams();
  if (!productKey) {
    throw new Error("can't find the product key");
  }
  const [product, setProduct] = useState<Product>({} as Product);
  const [loading, setLoading] = useState<boolean>(true);
  const [similarProducts, setSimilarProducts] = useState<ProductProjection[]>(
    [],
  );

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getProductByKey(productKey);
        setProduct(fetchedProduct);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      }
    };
    fetchProduct();
  }, [productKey]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (product.productType) {
        const fetchedProducts = await getProductsByCategory(
          product.masterData.current.categories[0].id,
        );
        setSimilarProducts(fetchedProducts);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [product]);

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
      <Breadcrumbs />
      <main className={cls.main}>
        {loading ? (
          <LoadingAnimation />
        ) : (
          <>
            <ProductCardBlock product={product} />
            <SimilarPrompts products={similarProducts} />
            <FAQ />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};
