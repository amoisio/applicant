/**
 * Text input.
 * @param {string} slot Input value.
 * @param {function} onChange onChange(modifiedText: string) callback called when the input value changes.
 */
export default function InputText(props) {
  return (
    <input
      type='text'
      placeholder={props.placeholder}
      onChange={(e) => props.onChange(e.target.value)}
      value={props.value}
    />
  );
}