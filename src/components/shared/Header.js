import Title from './Title';

export default function Header(props) {
  return (
    <header>
      <Title>{props.children}</Title>
    </header>
  );
}
