/**
 * H1 title component
 * @param {*} slot Content rendered within the H1 element.
 */
export default function ApplicationTitle(props) {
  return (
    <h1>{props.children}</h1>
  );
}