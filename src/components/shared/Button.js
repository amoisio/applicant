/**
 * A clickable button component.
 * @param {*} slot Content rendered inside the button element.
 * @param {function} onClick onClick(event) callback called when user clicks on the button.
 */
export default function Button({onClick, className, ariaLabel, children}) {
  return (
    <button onClick={onClick} className={className} tabIndex="0" aria-label={ariaLabel}>
      {children}
    </button>
  )
}