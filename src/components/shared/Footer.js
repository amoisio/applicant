import Button from './Button';

/**
 * Footer component
 * @param {function} onClick onClick(event) callback called when clicking the 'Menu' button.
 * @returns 
 */
export default function Footer(props) {
  return (
    <footer>
      <Button onClick={props.onClick}>Menu</Button>
    </footer>
  );
}