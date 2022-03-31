/**
 * H2 title component
 * @param {*} slot Content rendered inside the h2 element. 
 */
export default function ViewTitle(props) {
  return (
    <h2>{props.children}</h2>
  );
}