import { LineItem } from '@commercetools/platform-sdk';
import classNames from 'classnames';
import { useState } from 'react';
import { FaRegTrashCan } from 'react-icons/fa6';

// import { removeProduct, updateProductQuantity } from '@/entities/Cart';
import { removeProduct } from '@/entities/Cart/model/services/removeProduct';

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
  console.log(product);
  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
    // dispatch(updateProductQuantity({ id: product.id, quantity: quantity + 1 }));
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
      // dispatch(
      // updateProductQuantity({ id: product.id, quantity: quantity - 1 }),
      // );
    }
  };

  const handleRemove = () => {
    dispatch(removeProduct({ key, quantity }));
  };

  return (
    <div className={classNames(cls.ProductCard, {}, [className])}>
      <img src={imageUrl} alt={productName} className={cls.productImage} />
      <div className={cls.productDetails}>
        <h3 className={cls.productName}>{productName}</h3>
        <div className={cls.productQuantity}>
          <button
            type="button"
            onClick={handleDecrease}
            className={cls.quantityButton}
          >
            -
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
          >
            +
          </button>
        </div>
        <div className={cls.productPrice}>
          {discountedPrice ? (
            <>
              <span className={cls.originalPrice}>{price}</span>
              <span className={cls.discountPrice}>{discountedPrice}</span>
            </>
          ) : (
            <span className={cls.price}>{price}</span>
          )}
          {/* <div className={cls.priceWrapper}>
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
          </div> */}
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
    </div>
  );
};
