/**
 * H2 title component
 * @param {*} slot Content rendered inside the h2 element. 
 */
export default function ViewTitle(props) {
  return (
    <h1>{props.children}</h1>
  );
}