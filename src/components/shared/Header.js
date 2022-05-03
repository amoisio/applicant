import NavLink from './NavLink';
import ApplicationTitle from './ApplicationTitle';
import Icon from './Icon';
import './Header.css';

/**
 * Header component
 * @param {*} children Content rendered inside the ApplicationTitle component.
 */
export default function Header({ children }) {
  return (
    <header>
      <ApplicationTitle>{children}</ApplicationTitle>
      <NavLink to='/'>
        <Icon icon='chevron-left' />
        MENU
      </NavLink>
    </header>
  );
}
