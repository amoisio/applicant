import ApplicationTitle from './ApplicationTitle';

export default function Header(props) {
  return (
    <header>
      <ApplicationTitle>{props.children}</ApplicationTitle>
    </header>
  );
}
