/**
 * A clickable button component.
 * @param {*} slot Content rendered inside the button element.
 * @param {function} onClick onClick(event) callback called when user clicks on the button.
 */
export default function Button(props) {
  return (
    <button onClick={props.onClick}>
      {props.children}
    </button>
  )
}