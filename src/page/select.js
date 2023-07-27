// 子组件
function Select(props) {
    return (
      <select value={props.value}
      onChange={(e) => props.onChange(e)}>  
        {props.options.map(item => (
          <option key={item.uuid}>{item.name}</option>
        ))}
      </select>
    );
  }
  
export default Select;
