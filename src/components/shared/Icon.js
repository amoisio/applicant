/**
 * An icon.
 * @param {string} icon bootstrap icon.
 */
export default function Icon(props) {
  const icon = props.icon ?? 'x-lg';
  const classes = `icon bi-${icon} ${props.className}`;
  return <i className={classes} tabIndex={props.tabIndex}></i>;
}