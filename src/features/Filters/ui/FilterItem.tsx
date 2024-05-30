import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { RxCrossCircled, RxReload } from 'react-icons/rx';

import { Input } from '@/shared/ui/input/input';
import { useAppSelector } from '@/shared/hooks/redux';
import { getCatalogPageBrands } from '@/pages/CatalogPage';
import { Icon } from '@/shared/ui/Icon/Icon';

import cls from './FilterItem.module.scss';

interface FilterItemProps {
  className?: string;
  title: string;
  onAddFilters: (value: string) => void;
  onRemoveSelectedFilter: (value: string) => void;
  onRemoveAllFilters: () => void;
}

export const FilterItem = ({
  className,
  title,
  onAddFilters,
  onRemoveSelectedFilter,
  onRemoveAllFilters,
}: FilterItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const brandAttributes = useAppSelector(getCatalogPageBrands);

  const onFilterItemClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event: Event) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const onInputChange = (value: string, checked?: boolean) => {
    if (checked) {
      setSelectedItems((prev) => [...prev, value]);
      onAddFilters(value);
    } else {
      setSelectedItems((prev) => prev.filter((item) => item !== value));
      onRemoveSelectedFilter(value);
    }
  };

  const deleteSelectedItems = (value: string) => () => {
    setSelectedItems((prev) => prev.filter((item) => item !== value));
    onRemoveSelectedFilter(value);
  };

  const deleteAllSelectedItems = () => {
    setSelectedItems([]);
    onRemoveAllFilters();
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div ref={ref} className={classNames(cls.FilterItem, className)}>
        <button
          type="button"
          onClick={onFilterItemClick}
          className={cls.header}
        >
          {title}
          <span
            className={classNames(
              cls.arrow,
              isOpen ? cls.arrow_up : cls.arrow_down,
            )}
          />
        </button>
        <div className={classNames(cls.content, { [cls.hidden]: !isOpen })}>
          <div className={cls.list}>
            {Array.from(brandAttributes).map((attribute) => (
              <li key={attribute} className={cls.item}>
                <Input
                  onChange={onInputChange}
                  label={attribute}
                  classNameLabel={cls.label}
                  type="checkbox"
                  value={attribute}
                />
              </li>
            ))}
          </div>
          <button
            aria-label="close"
            type="button"
            className={cls.close}
            onClick={onFilterItemClick}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
      <div className={cls.selected_items}>
        {selectedItems.map((item) => (
          <div key={item} className={cls.selected}>
            {item}
            <Icon
              Svg={RxCrossCircled}
              className={cls.icon}
              onClick={deleteSelectedItems(item)}
            />
          </div>
        ))}
        {selectedItems.length !== 0 && (
          <div className={cls.selected}>
            Reset all
            <Icon
              Svg={RxReload}
              className={cls.icon}
              onClick={deleteAllSelectedItems}
            />
          </div>
        )}
      </div>
    </>
  );
};
