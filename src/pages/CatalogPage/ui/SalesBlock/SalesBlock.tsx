import classNames from 'classnames';

import { Title } from '@/shared/ui/Title/Title';
import SalesLeaf from '@/shared/assets/images/sales-leaf.svg';
import { Icon } from '@/shared/ui/Icon/Icon';
import { ProductCard } from '@/shared/ui/ProductCard/ProductCard';
import Product_1 from '@/shared/assets/images/product_1.png';

import cls from './SalesBlock.module.scss';

interface SalesBlockProps {
  className?: string;
}

export const SalesBlock = ({ className }: SalesBlockProps) => {
  return (
    <section className={classNames(cls.SalesBlock, className)}>
      <Icon Svg={SalesLeaf} className={cls.leaf} />
      <Title subtitle="Today's" title="Flash Sale" />
      <ProductCard
        image={Product_1}
        name="Jute Bag"
        price={160}
        sale={120}
        stars={4}
        reviews={88}
      />
    </section>
  );
};
