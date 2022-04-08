/**
 * An icon.
 * @param {string} icon bootstrap icon.
 */
export default function Icon(props) {
  const icon = props.icon ?? 'x-lg';
  const cl = `bi-${icon}`;
  return <i className={cl}></i>;
}