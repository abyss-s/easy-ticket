import styled from "styled-components";
import { InputContainer, Label } from "./InputStyle";

const RadioContainer = styled(InputContainer)`
  gap: 5px;
`;

/*props별 기본값 설정*/
const InputRadio = ({ value, name, text = "add text", onChange = null }) => {
  return (
    <RadioContainer>
      <input
        id="radioInput"
        type="radio"
        name={name}
        value={value}
        onChange={onChange}
      />
      <Label htmlFor="radioInput">{text}</Label>
    </RadioContainer>
  );
};
export default InputRadio;
