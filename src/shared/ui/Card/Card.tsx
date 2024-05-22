import classNames from 'classnames';
import cls from './Card.module.scss';
import { Icon } from '../Icon/Icon';

interface CardProps {
  className?: string;
  image?: string;
  svg?: React.VFC<React.SVGProps<SVGSVGElement>>;
  width?: number;
  green?: boolean;
  text?: string;
  alt?: string;
}

export const Card = (props: CardProps) => {
  const { className, text, image, svg, green, width, alt } = props;
  return (
    <div
      className={classNames(cls.Card, className)}
      style={{ maxWidth: width }}
    >
      {image && <img src={image} alt={alt} />}
      {svg && <Icon Svg={svg} />}
      {text && (
        <p className={classNames(cls.text, { [cls.green]: green })}>{text}</p>
      )}
    </div>
  );
};
