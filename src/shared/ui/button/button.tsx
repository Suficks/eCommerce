import classNames from 'classnames';
import cls from './button.module.scss';

interface ButtonProps {
  text: string;
  className?: string;
  onClick?: () => void;
}

export const Button = ({ text, className = '', onClick }: ButtonProps) => {
  return (
    <button
      type="button"
      className={classNames(cls.button, className)}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
