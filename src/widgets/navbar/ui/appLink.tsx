import { Link } from 'react-router-dom';

interface AppLinkProps {
  to: string;
  text: string;
  className?: string;
}

function AppLink({ to, text, className }: AppLinkProps) {
  return (
    <Link to={to} className={`app-link ${className}`}>
      {text}
    </Link>
  );
}

AppLink.defaultProps = {
  className: '',
};
export default AppLink;
