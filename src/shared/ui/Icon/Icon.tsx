import classNames from 'classnames';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
}

export const Icon = ({ className, Svg, ...otherProps }: IconProps) => (
  <div>
    <Svg className={classNames(className)} {...otherProps} />
  </div>
);
