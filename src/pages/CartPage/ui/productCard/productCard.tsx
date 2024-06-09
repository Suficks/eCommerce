import { LineItem } from '@commercetools/platform-sdk';
import classNames from 'classnames';
import { useState } from 'react';
import { FaRegTrashCan } from 'react-icons/fa6';

// import { removeProduct, updateProductQuantity } from '@/entities/Cart';
import { removeProduct } from '@/entities/Cart/model/services/removeProduct';

import { updateQuantity } from '@/entities/Cart/model/services/updateQuantity';
import Minus from '@/shared/assets/images/minus.svg';
import Plus from '@/shared/assets/images/plus.svg';
import { useAppDispatch } from '@/shared/hooks/redux';
import { ConverterPrice } from '@/shared/util/converterPrice';
import cls from './productCard.module.scss';

interface ProductCardProps {
  className?: string;
  product: LineItem;
}

export const ProductCard = ({ className, product }: ProductCardProps) => {
  const {
    name: { 'en-GB': productName },
    variant: { images },
    price: {
      value: { centAmount },
      discounted,
    },
    totalPrice,
  } = product;

  const imageUrl =
    images && images.length > 0 ? images[0].url : 'default-image-url';
  const price = ConverterPrice(centAmount);
  const discountedPrice = discounted
    ? ConverterPrice(discounted.value.centAmount)
    : null;

  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(product.quantity);
  const key = product.productKey || '';
  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
    dispatch(updateQuantity({ cardId: product.id, quantity: quantity + 1 }));
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
      dispatch(updateQuantity({ cardId: product.id, quantity: quantity - 1 }));
    }
  };

  const handleRemove = () => {
    dispatch(removeProduct({ key, quantity }));
  };

  return (
    <div className={classNames(cls.ProductCard, {}, [className])}>
      <div className={cls.imageAndNameWrapper}>
        <img src={imageUrl} alt={productName} className={cls.productImage} />
        <div className={cls.nameAndPriceWrapper}>
          <h3 className={cls.productName}>{productName}</h3>
          <div className={cls.productPrice}>
            {discountedPrice ? (
              <>
                <span className={cls.originalPrice}>{price}</span>
                <span className={cls.discountPrice}>{discountedPrice}</span>
              </>
            ) : (
              <span className={cls.price}>{price}</span>
            )}
            {/* {ConverterPrice(totalPrice.centAmount)} */}
          </div>
        </div>
      </div>
      <div className={cls.productDetails}>
        <div className={cls.productQuantity}>
          <button
            type="button"
            onClick={handleDecrease}
            className={cls.quantityButton}
            aria-label="close"
          >
            <Minus />
          </button>
          <input
            type="number"
            value={quantity}
            readOnly
            className={cls.quantityInput}
          />
          <button
            type="button"
            onClick={handleIncrease}
            className={cls.quantityButton}
            aria-label="close"
          >
            <Plus />
          </button>
        </div>
        <div className={cls.totalPriceWrapper}>
          total:
          <div className={cls.totalPrice}>
            {ConverterPrice(totalPrice.centAmount)}
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={handleRemove}
        className={cls.removeButton}
        aria-label="close"
      >
        <FaRegTrashCan />
      </button>
    </div>
  );
};
