import { Product } from '@commercetools/platform-sdk';
import 'bootstrap/dist/css/bootstrap.min.css';
import classNames from 'classnames';
import { useState } from 'react';
import { Button as BootstrapButton, Modal } from 'react-bootstrap';

import { ProductSlider } from '@/pages/ProductPage/ProductSlider/productSlider';
import noImage from '@/shared/assets/images/No-Image.webp';
import NextButton from '@/shared/assets/images/next-slide.svg';
import plantFromProductPage from '@/shared/assets/images/plantFromProductPage.png';
import PrevButton from '@/shared/assets/images/prev-slide.svg';
import { Card } from '@/shared/ui/Card/Card';
import { Button } from '@/shared/ui/button/button';
import { ConverterPrice } from '@/shared/util/converterPrice';
import cls from './ProductCardBlock.module.scss';

interface ProductCardBlockProps {
  product: Product;
}

export const ProductCardBlock = ({ product }: ProductCardBlockProps) => {
  const [show, setShow] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const {
    masterData: {
      current: {
        masterVariant: { images = [], prices = [] },
        name,
        description,
      },
    },
  } = product;
  const imagesArr =
    images.length === 0
      ? [
          {
            url: noImage,
            dimensions: {
              w: 1665,
              h: 2048,
            },
          },
        ]
      : images;

  const price = prices.length ? ConverterPrice(prices[0].value.centAmount) : '';
  const discountedPrice = prices[0]?.discounted?.value.centAmount
    ? ConverterPrice(prices[0].discounted.value.centAmount)
    : '';
  const productName = name['en-GB'];
  const productDescription = description?.['en-GB'];
  const handleShow = (index: number) => {
    setCurrentImageIndex(index);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagesArr.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + imagesArr.length) % imagesArr.length,
    );
  };
  return (
    <div className={cls.productCard}>
      <img src={plantFromProductPage} alt="" className={cls.plantImage} />
      {imagesArr.length === 1 ? (
        <Card
          width={300}
          image={imagesArr[0].url}
          className={cls.imageCard}
          onClick={() => handleShow(0)}
        />
      ) : (
        <ProductSlider images={imagesArr} onClick={() => handleShow(0)} />
      )}
      <div className={cls.productData}>
        <h1 className={cls.productName}>{productName}</h1>
        <p className={cls.productDescription}>{productDescription}</p>
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
      <Modal
        show={show}
        onHide={handleClose}
        centered
        animation
        contentClassName={cls.modal}
        dialogClassName={cls.modalWrap}
      >
        <Modal.Header closeButton>
          <Modal.Title>Product Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={cls.modalImageContainer}>
            <BootstrapButton
              onClick={handlePrevImage}
              className={cls.modalButton}
            >
              <PrevButton />
            </BootstrapButton>
            <img
              src={imagesArr[currentImageIndex].url}
              alt="Product"
              className={cls.modalImage}
            />
            <BootstrapButton
              onClick={handleNextImage}
              className={cls.modalButton}
            >
              <NextButton />
            </BootstrapButton>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
