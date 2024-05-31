import { useLocation } from 'react-router-dom';

import { useParams } from 'react-router';
import { AiOutlineRight } from 'react-icons/ai';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import cls from './Breadcrumbs.module.scss';
import { Routes } from '@/app/providers/RouterConfig/RouteConfig';

export const Breadcrumbs = () => {
  const location = useLocation();
  const { categoryId, subcategoryId, productKey } = useParams();

  return (
    <div className={cls.wrapper}>
      <ul className={cls.list}>
        <AppLink to={Routes.CATALOG}>Catalog</AppLink>
        {location.pathname.includes(`/${categoryId}`) && (
          <>
            <AiOutlineRight size={20} />
            <AppLink to={`${Routes.CATALOG}/${categoryId}`}>
              {categoryId}
            </AppLink>
          </>
        )}
        {location.pathname.includes(`/${subcategoryId}`) && (
          <>
            <AiOutlineRight size={20} />
            <AppLink to={`${Routes.CATALOG}/${categoryId}/${subcategoryId}`}>
              {subcategoryId}
            </AppLink>
          </>
        )}
        {location.pathname.includes(`/${productKey}`) && (
          <>
            <AiOutlineRight size={20} />
            <AppLink
              to={`${Routes.CATALOG}/${categoryId}/${subcategoryId}/${productKey}`}
            >
              {productKey}
            </AppLink>
          </>
        )}
      </ul>
    </div>
  );
};
