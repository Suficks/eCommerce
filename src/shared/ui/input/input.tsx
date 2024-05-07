import { useState } from 'react';
import classNames from 'classnames';
import cls from './input.module.scss';

interface InputProps {
  className?: string;
  label?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

export const Input = ({
  className = '',
  label = '',
  placeholder = '',
  onChange,
}: InputProps) => {
  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={cls.label}>
      {label}
      <input
        className={classNames(cls.input, className)}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </label>
  );
};
