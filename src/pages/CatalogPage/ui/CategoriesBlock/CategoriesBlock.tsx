import classNames from 'classnames';
import { useMemo } from 'react';

import { Title } from '@/shared/ui/Title/Title';
import { Card } from '@/shared/ui/Card/Card';
import { CategoryCustom } from '@/shared/api';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { Icon } from '@/shared/ui/Icon/Icon';
import { SectionSeparator } from '@/shared/ui/SectionSeparator/SectionSeparator';
import HomeIcon from '@/shared/assets/images/home_icon.png';
import AccessoriesIcon from '@/shared/assets/images/accessories_icon.png';
import TablewareIcon from '@/shared/assets/images/tableware_icon.png';
import PersonalCareIcon from '@/shared/assets/images/personal_care_icon.png';
import LeafIcon from '@/shared/assets/images/categories_leaf.svg';

import cls from './CategoriesBlock.module.scss';

interface CategoriesBlockProps {
  className?: string;
  categories: CategoryCustom[];
}

export const CategoriesBlock = ({
  className,
  categories,
}: CategoriesBlockProps) => {
  const ItemsWithImage = useMemo(
    () => ({
      Home: HomeIcon,
      Accessories: AccessoriesIcon,
      Tableware: TablewareIcon,
      'Personal care products': PersonalCareIcon,
    }),
    [],
  );

  return (
    <section className={classNames(cls.CategoriesBlock, className)}>
      <Title title="Browse By Category" subtitle="Categories" />
      <Icon Svg={LeafIcon} className={cls.leftLeaf} />
      <div className={cls.wrapper}>
        {categories.map(({ parent }) => {
          return (
            <AppLink
              to={`catalog/${parent.path}`}
              key={parent.id}
              className={cls.link}
            >
              <Card
                clickable
                transparent
                className={cls.card}
                text={parent.name}
                image={ItemsWithImage[parent.name]}
              />
            </AppLink>
          );
        })}
      </div>
      <Icon Svg={LeafIcon} className={cls.rightLeaf} />
      <SectionSeparator />
    </section>
  );
};
