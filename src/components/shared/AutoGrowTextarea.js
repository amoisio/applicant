import './AutoGrowTextarea.css';

/**
 * Text input.
 * @param {string} value Input value.
 * @param {string} placeholder Input placeholder.
 * @param {function} onChange onChange(modifiedText: string) callback called when the input value changes.
 */
export default function AutoGrowTextarea(props) {
  const numberOfLines = (text) => {
    return (text?.match(/\n/g)?.length ?? 0) + 1;
  }
  // TODO: Need to manage the wrapping of a single line of text
  const lines = numberOfLines(props.value);
  const className  = (lines === 1) 
    ? 'single-line-textarea'
    : null;

    return (
    <div className='auto-grow' data-value={props.value}>
      <textarea
        rows='1'
        className={className}
        placeholder={props.placeholder}
        onChange={(e) => props.onChange(e.target.value)}
        value={props.value}
        tabIndex="0"
      />
    </div>
  );
}