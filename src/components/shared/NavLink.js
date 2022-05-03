import { Link } from 'react-router-dom';

export default function NavLink({ to, children }) {
  return (
    <div className='nav-link'>
      <Link to={to}>{children}</Link>
    </div>
  );
}
