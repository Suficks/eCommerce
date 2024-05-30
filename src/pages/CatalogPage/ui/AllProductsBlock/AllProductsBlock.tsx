import { ProductProjection } from '@commercetools/platform-sdk';
import classNames from 'classnames';
import { useNavigate } from 'react-router';
import { CiSearch } from 'react-icons/ci';

import { Title } from '@/shared/ui/Title/Title';
import { ConverterPrice } from '@/shared/util/converterPrice';
import { Button } from '@/shared/ui/button/button';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux';
import { getProductPath } from '../../model/services/getProductPath';
import { LoadingAnimation } from '@/shared/ui/loadingAnimation/loadingAnimation';
import { Input } from '@/shared/ui/input/input';
import { getCatalogPageIsLoading } from '../../model/selectors/catalogPageSelectors';
import { useCatalogFilters } from '../../hooks/useCatalogPageFilters';
import { CatalogSortSelector } from '@/features/CatalogSortSelector';
import { FilterItem } from '@/features/Filters/ui/FilterItem';
import { SelectedItems } from '@/features/Filters';

import cls from './AllProductsBlock.module.scss';

interface AllProductsBlockProps {
  className?: string;
  products: ProductProjection[];
}

export const AllProductsBlock = ({
  className,
  products,
}: AllProductsBlockProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useAppSelector(getCatalogPageIsLoading);
  const {
    search,
    brandAttributes,
    selectedBrands,
    maxPrice,
    minPrice,
    onChangeOrder,
    onChangeSearch,
    onChangeMaxPrice,
    onChangeMinPrice,
    onAddBrands,
    onRemoveSelectedBrands,
    onRemoveAllFilters,
  } = useCatalogFilters();

  if (isLoading) {
    return <LoadingAnimation />;
  }

  const handleOnClick =
    (productKey: string, categoryKey: string, itemName: string) => async () => {
      const { category, subCategory } = await dispatch(
        getProductPath({ productKey, categoryKey }),
      ).unwrap();
      navigate(`${category}/${subCategory}/${itemName}`);
    };

  return (
    <section className={classNames(cls.AllProductsBlock, className)}>
      <Title
        subtitle="All products"
        title="Explore Our Products"
        className={cls.title}
      />
      <Input
        value={search}
        onChange={onChangeSearch}
        className={cls.input}
        placeholder="Поиск"
        icon={<CiSearch className={cls.icon} />}
      />
      <div className={cls.filtersWrap}>
        <FilterItem
          selectedBrands={selectedBrands}
          brandAttributes={brandAttributes}
          onAddBrands={onAddBrands}
          onRemoveSelectedBrands={onRemoveSelectedBrands}
          title="Brand"
        />
        <FilterItem
          maxPrice={maxPrice}
          minPrice={minPrice}
          onChangeMaxPrice={onChangeMaxPrice}
          onChangeMinPrice={onChangeMinPrice}
          title="Price"
          range
        />
      </div>
      <SelectedItems
        attributes={selectedBrands}
        onRemoveSelectedFilter={onRemoveSelectedBrands}
        onRemoveAllFilters={onRemoveAllFilters}
      />
      <SelectedItems
        minPrice={minPrice}
        maxPrice={maxPrice}
        onRemoveAllFilters={onRemoveAllFilters}
      />
      <CatalogSortSelector onChangeOrder={onChangeOrder} />
      <div className={cls.products}>
        {products.length === 0 && (
          <div className={cls.no_products}>Products not found</div>
        )}
        {products.map((item) => {
          const { masterVariant } = item;
          const { images, prices = [] } = masterVariant;
          const { value: regularPrice, discounted } = prices[0];

          return (
            <div key={item.id} className={cls.product}>
              <img src={images?.[0]?.url || ''} alt="" className={cls.image} />
              <p className={cls.name}>{item.name['en-GB']}</p>
              <div className={cls.price_wrapper}>
                {discounted ? (
                  <div className={cls.prices}>
                    <p className={cls.price}>
                      {ConverterPrice(discounted?.value.centAmount)}
                    </p>
                    <p className={cls.discounted}>
                      {ConverterPrice(regularPrice?.centAmount)}
                    </p>
                  </div>
                ) : (
                  <p className={cls.price}>
                    {ConverterPrice(regularPrice?.centAmount)}
                  </p>
                )}
                <p className={cls.reviews}>186 Reviews</p>
              </div>
              <p className={cls.description}>{item.description?.['en-GB']}</p>
              <Button
                onClick={handleOnClick(
                  item.productType.id,
                  item.categories?.[0].id,
                  item.key || '',
                )}
                small
                className={cls.button}
                transparent
                text="Buy Now"
                green
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};
