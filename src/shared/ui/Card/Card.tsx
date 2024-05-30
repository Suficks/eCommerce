import classNames from 'classnames';
import { ReactNode } from 'react';

import { Icon } from '../Icon/Icon';

import cls from './Card.module.scss';

interface CardProps {
  className?: string;
  children?: ReactNode;
  image?: string;
  svg?: React.VFC<React.SVGProps<SVGSVGElement>>;
  width?: number;
  green?: boolean;
  transparent?: boolean;
  clickable?: boolean;
  text?: string;
  alt?: string;
  onClick?: () => void;
}

export const Card = ({
  className,
  text,
  image,
  svg,
  green,
  width,
  clickable = false,
  alt,
  children,
  transparent = false,
  onClick,
}: CardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        cls.Card,
        { [cls.transparent]: transparent, [cls.hovered]: clickable },
        className,
      )}
      style={{ maxWidth: width }}
    >
      {image && <img src={image} className={cls.image} alt={alt} />}
      {svg && <Icon Svg={svg} />}
      {text && (
        <p
          className={classNames(cls.text, {
            [cls.green]: green,
          })}
        >
          {text}
        </p>
      )}
      {children}
    </button>
  );
};
