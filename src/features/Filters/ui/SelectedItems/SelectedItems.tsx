import { RxCrossCircled, RxReload } from 'react-icons/rx';
import classNames from 'classnames';
import cls from './SelectedItems.module.scss';
import { Icon } from '@/shared/ui/Icon/Icon';

interface SelectedItemsProps {
  className?: string;
  attributes?: string[];
  onRemoveSelectedFilter: (value: string) => void;
  onRemoveAllFilters: () => void;
}

export const SelectedItems = (props: SelectedItemsProps) => {
  const {
    className,
    attributes = [],
    onRemoveSelectedFilter,
    onRemoveAllFilters,
  } = props;

  const deleteSelectedItems = (value: string) => () => {
    onRemoveSelectedFilter(value);
  };

  const deleteAllSelectedItems = () => {
    onRemoveAllFilters();
  };

  return (
    <div className={classNames(cls.selected_items, className)}>
      {Array.from(attributes).map((item) => (
        <div key={item} className={cls.selected}>
          {item}
          <Icon
            Svg={RxCrossCircled}
            className={cls.icon}
            onClick={deleteSelectedItems(item)}
          />
        </div>
      ))}
      {Array.from(attributes).length !== 0 && (
        <div className={classNames(cls.selected, cls.reset)}>
          Reset all
          <Icon
            Svg={RxReload}
            className={cls.icon}
            onClick={deleteAllSelectedItems}
          />
        </div>
      )}
    </div>
  );
};
