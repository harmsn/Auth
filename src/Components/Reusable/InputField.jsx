import { Input } from 'antd';
import 'antd/dist/antd.min.css'

const InputField = ({ value, label, name, placeholder, type, onChange }) => (
    <div className="form-group" style={{marginTop:'12px'}}>
      {label && <label htmlFor="input-field">{label}</label>}
      <Input
        type={type}
        value={value}
        name={name}
        className="form-control"
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
);
  
export default InputField;