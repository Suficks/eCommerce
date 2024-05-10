import cls from './loadingAnimation.module.scss';
import Leaf from '@/shared/assets/images/leaf.svg';

export const LoadingAnimation = () => {
  return (
    <div className={cls.wrapperAnimation}>
      <Leaf />
      <Leaf />
      <Leaf />
      <Leaf />
    </div>
  );
};
