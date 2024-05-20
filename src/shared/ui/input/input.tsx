import { ReactElement } from 'react';
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
  classNameLabel?: string;
  icon?: ReactElement;
}

export const Input = ({
  className = '',
  label = '',
  placeholder = '',
  value,
  type,
  register,
  icon,
  classNameLabel,
}: InputProps) => {
  return (
    <label className={classNames(cls.label, classNameLabel)}>
      {label}
      <input
        className={classNames(cls.input, className)}
        placeholder={placeholder}
        value={value}
        type={type}
        {...register}
      />
      {icon}
    </label>
  );
};
