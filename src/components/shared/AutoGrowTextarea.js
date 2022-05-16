import './AutoGrowTextarea.css';
/**
 * Text input.
 * @param {string} value Input value.
 * @param {string} placeholder Input placeholder.
 * @param {function} onChange onChange(modifiedText: string) callback called when the input value changes.
 */
export default function AutoGrowTextarea({ value, placeholder, onChange, ariaLabel }) {
  return (
    <div className='auto-grow' data-value={value}>
      <textarea
        rows='1'
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        tabIndex="0"
        aria-label={ariaLabel}
      />
    </div>
  );
}