import classNames from 'classnames';

import { getCartProducts } from '@/entities/Cart';
import { useAppSelector } from '@/shared/hooks/redux';
import { Footer } from '@/widgets/Footer/Footer';
import { Header } from '@/widgets/Header/Header';
import cls from './CartPage.module.scss';

interface CartPageProps {
  className?: string;
}

export const CartPage = ({ className }: CartPageProps) => {
  const productsInCart = useAppSelector(getCartProducts);
  return (
    <div className={classNames(cls.CartPage, {}, [className])}>
      <Header />
      <div className={cls.main}>
        <div className={cls.productsWrapper}>
          <button type="button" className={cls.emptyButton}>
            Empty your cart
          </button>
        </div>
        <div className={cls.invoiceWrapper}>Invoice</div>
        <h2>Cart</h2>
      </div>
      <Footer />
    </div>
  );
};
