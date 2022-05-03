import NavLink from './NavLink';
import Icon from './Icon';
import './Footer.css';

export default function Footer() {
  return (
    <footer>
      <div className='copyright'>
        <span>&copy; 2022 Aleksi Moisio</span>
      </div>
      <div className='links'>
        <NavLink to='/template'>
          <Icon icon='chevron-left' />
          Template
        </NavLink>
        <NavLink to='/archive'>
          <Icon icon='chevron-left' />
          Archive
        </NavLink>
      </div>
    </footer>
  );
}
