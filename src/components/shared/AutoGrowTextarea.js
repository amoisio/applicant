import './AutoGrowTextarea.css';
/**
 * Text input.
 * @param {string} value Input value.
 * @param {string} placeholder Input placeholder.
 * @param {function} onChange onChange(modifiedText: string) callback called when the input value changes.
 */
export default function AutoGrowTextarea(props) {
    return (
    <div className='auto-grow' data-value={props.value}>
      <textarea
        rows='1'
        placeholder={props.placeholder}
        onChange={(e) => props.onChange(e.target.value)}
        value={props.value}
        tabIndex="0"
      />
    </div>
  );
}