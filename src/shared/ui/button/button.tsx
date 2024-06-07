import classNames from 'classnames';
import { ReactNode } from 'react';

import cls from './button.module.scss';

interface ButtonProps {
  text: string;
  className?: string;
  transparent?: boolean;
  green?: boolean;
  small?: boolean;
  icon?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button = ({
  text,
  className = '',
  transparent = false,
  small,
  green,
  icon,
  onClick,
  disabled,
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={classNames(cls.button, className, {
        [cls.transparent]: transparent,
        [cls.green]: green,
        [cls.small]: small,
      })}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
      {icon}
    </button>
  );
};
