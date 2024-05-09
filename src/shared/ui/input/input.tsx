import { FC } from 'react';
import classNames from 'classnames';
import { UseFormRegisterReturn } from 'react-hook-form';
import cls from './input.module.scss';

interface InputProps {
  className?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  type?: string;
  register?: UseFormRegisterReturn<string>;
}

export const Input: FC<InputProps> = ({
  className = '',
  label = '',
  placeholder = '',
  value,
  type,
  register,
}) => {
  return (
    <label className={cls.label}>
      {label}
      <input
        className={classNames(cls.input, className)}
        placeholder={placeholder}
        value={value}
        type={type}
        {...register}
      />
    </label>
  );
};
