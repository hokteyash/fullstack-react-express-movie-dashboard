import { forwardRef, useImperativeHandle, useState } from "react";
import "../css/Input.css";

const Input = forwardRef((props, ref) => {
  const [value, setValue] = useState("");
  useImperativeHandle(ref, () => ({
    getValue: () => value,
    resetValue: () => setValue(""),
  }));
  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="registerInput"
    />
  );
});

export default Input;
