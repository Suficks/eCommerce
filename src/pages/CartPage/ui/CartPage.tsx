import classNames from 'classnames';

import cls from './CartPage.module.scss';

interface CartPageProps {
  className?: string;
}

export const CartPage = ({ className }: CartPageProps) => {
  return (
    <div className={classNames(cls.CartPage, {}, [className])}>Cartpage</div>
  );
};
