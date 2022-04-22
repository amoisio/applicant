import ApplicationTitle from './ApplicationTitle';
import Icon from './Icon';
import NavLink from './NavLink';
import './Header.css';

/**
 * Header component
 * @param {*} slot Content rendered inside the ApplicationTitle component.
 */
export default function Header(props) {
  return (
    <header>
      <ApplicationTitle>{props.children}</ApplicationTitle>
      <NavLink href='#' onClick={props.onOpenMenu}>
        <Icon icon='chevron-left' />
        MENU
      </NavLink>
    </header>
  );
}
