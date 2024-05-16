import classNames from 'classnames';
import cls from './button.module.scss';

interface ButtonProps {
  text: string;
  className?: string;
  transparent?: boolean;
  green?: boolean;
  onClick?: () => void;
}

export const Button = ({
  text,
  className = '',
  transparent = false,
  green,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={classNames(
        cls.button,
        className,
        {
          [cls.transparent]: transparent,
        },
        { [cls.green]: green },
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
