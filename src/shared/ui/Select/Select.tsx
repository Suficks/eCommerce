import { FC } from 'react';
import classNames from 'classnames';
import { UseFormRegisterReturn } from 'react-hook-form';
import cls from './select.module.scss';

interface InputProps {
  className?: string;
  label?: string;
  register?: UseFormRegisterReturn<string>;
  optionValues: string[];
}

export const Select: FC<InputProps> = ({
  className = '',
  label = '',
  register,
  optionValues,
}) => {
  return (
    <>
      <label className={cls.label}>{label}</label>
      <select className={classNames(cls.select, className)} {...register}>
        {optionValues?.map((country) => (
          <option className={`${cls.option}`} key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
    </>
  );
};
