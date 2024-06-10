import classNames from 'classnames';

import { cartThunk, getCartProducts } from '@/entities/Cart';
import { getCartTotalPrice } from '@/entities/Cart/model/selectors/cartSelectors';
import plant_1 from '@/shared/assets/images/plant_for_cart_1.png';
import plant_2 from '@/shared/assets/images/plant_for_cart_2.png';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux';
import { ConverterPrice } from '@/shared/util/converterPrice';
import { Footer } from '@/widgets/Footer/Footer';
import { Header } from '@/widgets/Header/Header';
import { ProductCard } from './productCard/productCard';

import cls from './CartPage.module.scss';

interface CartPageProps {
  className?: string;
}

export const CartPage = ({ className }: CartPageProps) => {
  const productsInCart = useAppSelector(getCartProducts);
  const totalPrice = useAppSelector(getCartTotalPrice);
  const dispatch = useAppDispatch();

  const { length: cartLength } = productsInCart;

  const onClearClick = () => {
    dispatch(cartThunk({ mode: 'remove' }));
  };

  return (
    <div className={classNames(cls.wrapper, {}, [className])}>
      <Header />
      <div className={cls.main}>
        <img src={plant_1} alt="" className={cls.plantImageTop} />
        <img src={plant_2} alt="" className={cls.plantImageBottom} />
        <div className={cls.productsWrapper}>
          <button
            type="button"
            className={cls.clearButton}
            onClick={onClearClick}
          >
            Clear cart
          </button>
          {productsInCart.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className={cls.invoiceWrapper}>
          Invoice
          {ConverterPrice(totalPrice.centAmount)}
        </div>
      </div>
      <Footer />
    </div>
  );
};
