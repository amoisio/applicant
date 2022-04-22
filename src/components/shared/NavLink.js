export default function NavLink(props) {
  const href = props.href ?? "#";
  const onClick = props.onClick ?? (() => console.log('clicked!'));
  return (
    <div className='nav-link'>
      <a href={href} onClick={onClick}>{props.children}</a>
    </div>
  );
}
