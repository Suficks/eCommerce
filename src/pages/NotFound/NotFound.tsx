import { memo } from 'react';

import Liana from '@/shared/assets/images/liana.svg';
import Logo from '@/shared/assets/images/logo.svg';
import cls from './NotFound.module.scss';

interface NotFoundProps {
  additionalMessage?: string;
}

export const NotFound: React.FC<NotFoundProps> = memo(
  // eslint-disable-next-line react/prop-types
  ({ additionalMessage }) => {
    return (
      <main className={cls.notFound}>
        <div className={cls.headerImg} />
        <div className={cls.lianaTop}>
          <Liana />
        </div>
        <Logo />
        <p className={cls.content}>404</p>
        <p className={cls.signature}>Not Found</p>
        {additionalMessage && (
          <p className={cls.additionalMessage}>{additionalMessage}</p>
        )}
        <div className={cls.lianaFooter}>
          <Liana />
        </div>
      </main>
    );
  },
);
