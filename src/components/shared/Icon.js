/**
 * An icon.
 * @param {string} icon bootstrap icon.
 */
export default function Icon({ icon, className, tabIndex}) {
  const bicon = icon ?? 'x-lg';
  let classes = `icon bi-${bicon}`;
  if (className) {
    classes = `${classes} ${className}`;
  }
  return <i className={classes} tabIndex={tabIndex}></i>;
}