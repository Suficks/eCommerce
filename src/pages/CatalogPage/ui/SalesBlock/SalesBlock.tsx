import classNames from 'classnames';

import cls from './SalesBlock.module.scss';

interface SalesBlockProps {
  className?: string;
}

export const SalesBlock = ({ className }: SalesBlockProps) => {
  return <section className={classNames(cls.SalesBlock, className)} />;
};
