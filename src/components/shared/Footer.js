import Button from './Button';

export default function Footer(props) {
  return (
    <footer>
      <Button onClick={props.onClick}>Menu</Button>
    </footer>
  );
}