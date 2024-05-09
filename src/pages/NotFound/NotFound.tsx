import { memo } from 'react';

import Liana from '@/shared/assets/images/liana.svg';
import Logo from '@/shared/assets/images/logo.svg';
import cls from './NotFound.module.scss';

export const NotFound = memo(() => {
  return (
    <main className={cls.notFound}>
      <div className={cls.headerImg} />
      <div className={cls.lianaTop}>
        <Liana />
      </div>
      <Logo />
      <p className={cls.content}>404</p>
      <p className={cls.signature}>Not Found</p>
      <div className={cls.lianaFooter}>
        <Liana />
      </div>
    </main>
  );
});
