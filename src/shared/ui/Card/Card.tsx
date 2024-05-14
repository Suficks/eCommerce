import classNames from 'classnames';
import cls from './Card.module.scss';
import { Icon } from '../Icon/Icon';

interface CardProps {
  className?: string;
  image?: React.VFC<React.SVGProps<SVGSVGElement>>;
  width?: number;
  green?: boolean;
  text?: string;
}

export const Card = (props: CardProps) => {
  const { className, text, image, green, width } = props;
  return (
    <div
      className={classNames(cls.Card, className)}
      style={{ maxWidth: width }}
    >
      {image && <Icon Svg={image} />}
      {text && (
        <p className={classNames(cls.text, { [cls.green]: green })}>{text}</p>
      )}
    </div>
  );
};
