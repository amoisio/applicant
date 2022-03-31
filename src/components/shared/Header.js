import ApplicationTitle from './ApplicationTitle';

/**
 * Header component
 * @param {*} slot Content rendered inside the ApplicationTitle component.
 */
export default function Header(props) {
  return (
    <header>
      <ApplicationTitle>{props.children}</ApplicationTitle>
    </header>
  );
}
