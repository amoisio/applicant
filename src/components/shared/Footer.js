import NavLink from './NavLink';
import Icon from './Icon';
import './Footer.css';

/**
 * Footer component
 * @param {function} onClick onClick(event) callback called when clicking the 'Menu' button.
 * @returns 
 */
export default function Footer(props) {
  return (
    <footer>
      <div className='copyright'>
        <p>Applicant, 2022 (c) Aleksi Moisio</p>
      </div>
      <div className='links'>
        <NavLink onClick={props.onOpenTemplate}>
          <Icon icon='chevron-left' />
          Template
        </NavLink>
        <NavLink onClick={props.onOpenArchive}>
          <Icon icon='chevron-left' />
          Archive
        </NavLink>
      </div>
    </footer>
  );
}