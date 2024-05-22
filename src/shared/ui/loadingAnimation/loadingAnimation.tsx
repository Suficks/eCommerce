import { Icon } from '../Icon/Icon';
import Leaf from '@/shared/assets/images/leaf.svg';

import cls from './loadingAnimation.module.scss';

export const LoadingAnimation = () => {
  return (
    <div className={cls.wrapperAnimation}>
      <Icon Svg={Leaf} className={cls.leaf} />
      <Icon Svg={Leaf} className={cls.leaf} />
      <Icon Svg={Leaf} className={cls.leaf} />
      <Icon Svg={Leaf} className={cls.leaf} />
    </div>
  );
};
