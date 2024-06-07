import classNames from 'classnames';

import { Footer } from '@/widgets/Footer/Footer';
import { Header } from '@/widgets/Header/Header';
import cls from './CartPage.module.scss';

interface CartPageProps {
  className?: string;
}

export const CartPage = ({ className }: CartPageProps) => {
  return (
    <div className={classNames(cls.CartPage, {}, [className])}>
      <Header />
      <div className={cls.cart}>
        <h2>Cart</h2>
      </div>
      <Footer />
    </div>
  );
};
