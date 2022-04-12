import './AutoGrowTextarea.css';

/**
 * Text input.
 * @param {string} value Input value.
 * @param {string} placeholder Input placeholder.
 * @param {function} onChange onChange(modifiedText: string) callback called when the input value changes.
 */
export default function AutoGrowTextarea(props) {
  const numberOfLines = (text) => {
    if (!text) {
      return 0;
    }
    return text.match(/\n/g)?.length ?? 0;
  }
  const lines = numberOfLines(props.value);
  const style = (lines === 0) 
    ? { height: '20px' }
    : {};

  return (
    <div className='input-sizer stacked' data-value={props.value}>
      <textarea
        rows='1'
        style={style}
        placeholder={props.placeholder}
        onChange={(e) => props.onChange(e.target.value)}
        value={props.value}
      />
    </div>
  );
}