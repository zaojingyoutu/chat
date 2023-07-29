// 子组件
function Select(props) {
  return (
    <select value={props.value} onChange={(e) => props.onChange(e)} style={{height:'25px',margin:'10px',width:'45vh'}}>
      {props.options.map((item) => (
        <option key={item.uuid}>{item.name}</option>
      ))}
    </select>
  );
}

export default Select;
