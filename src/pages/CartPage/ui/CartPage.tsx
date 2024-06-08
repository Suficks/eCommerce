import classNames from 'classnames';

import { getCartProducts } from '@/entities/Cart';
import { useAppSelector } from '@/shared/hooks/redux';
import { Footer } from '@/widgets/Footer/Footer';
import { Header } from '@/widgets/Header/Header';
import cls from './CartPage.module.scss';
import { ProductCard } from './productCard/productCard';

interface CartPageProps {
  className?: string;
}

export const CartPage = ({ className }: CartPageProps) => {
  const productsInCart = useAppSelector(getCartProducts);
  return (
    <div className={classNames(cls.wrapper, {}, [className])}>
      <Header />
      <div className={cls.main}>
        <div className={cls.productsWrapper}>
          <button type="button" className={cls.clearButton}>
            Clear cart
          </button>
          {productsInCart.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className={cls.invoiceWrapper}>Invoice</div>
      </div>
      <Footer />
    </div>
  );
};
