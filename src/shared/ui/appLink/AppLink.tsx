import { Link } from 'react-router-dom';

interface AppLinkProps {
  to: string;
  text: string;
  className?: string;
}

export const AppLink = ({ to, text, className = '' }: AppLinkProps) => {
  return (
    <Link to={to} className={className}>
      {text}
    </Link>
  );
};
