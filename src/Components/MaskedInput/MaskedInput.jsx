import React from "react";
import InputMask from "react-input-mask";
import { Input } from "../../globalStyle";

const MaskedInput = ({ value, onChange, mask, type, error, w }) => {
  return (
    <InputMask mask={mask} value={value} onChange={onChange}>
      {(inputProps) => <Input w={w} {...inputProps} type={type} error={error} onChange={onChange}></Input>}
    </InputMask>
  );
};

export default MaskedInput;
