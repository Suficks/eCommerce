import classNames from 'classnames';

import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { CategoryCustom } from '@/shared/api/types/apiTypes';
import { SliderComponent } from './Slider';
import { SectionSeparator } from '@/shared/ui/SectionSeparator/SectionSeparator';

import cls from './MainBlock.module.scss';

interface MainBlockProps {
  className?: string;
  categories: CategoryCustom[];
}

export const MainBlock = ({ className, categories }: MainBlockProps) => {
  return (
    <section className={classNames(cls.MainBlock, className)}>
      <ul className={cls.list}>
        {categories.map(({ parent }) => (
          <AppLink to={`${parent.path}`} key={parent.id} className={cls.item}>
            {parent.name}
          </AppLink>
        ))}
      </ul>
      <div className={cls.separator} />
      <SliderComponent />
      <SectionSeparator />
    </section>
  );
};
