import ApplicationTitle from './ApplicationTitle';
import Icon from './Icon';

/**
 * Header component
 * @param {*} slot Content rendered inside the ApplicationTitle component.
 */
export default function Header(props) {
  return (
    <header>
      <ApplicationTitle>{props.children}</ApplicationTitle>
      <div className='nav-link'>
        <a href='/'>
          <Icon icon='chevron-left' />
          MENU
        </a>
      </div>
    </header>
  );
}
