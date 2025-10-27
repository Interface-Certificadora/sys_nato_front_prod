import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { useState, useCallback, memo } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

interface SenhaProps {
  onvalue: (value: string) => void;
  setvalue: string;
  envClick?: () => void;
}

export const SenhaComponent = memo(({ setvalue, onvalue, envClick }: SenhaProps) => {
  const [show, setShow] = useState(false);

  const handleClick = useCallback(() => setShow((prev) => !prev), []);

  const handleonvalue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value: string = e.target.value;
    onvalue(value);
  }, [onvalue]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && envClick) {
      envClick();
    }
  }, [envClick]);

  return (
    <>
      <InputGroup size="lg">
        <Input
          pr="4.5rem"
          type={show ? "text" : "password"}
          value={setvalue}
          onChange={handleonvalue}
          border={"1px solid #b8b8b8cc"}
          onKeyDownCapture={handleKeyDown}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? <FaEyeSlash /> : <IoEyeSharp />}
          </Button>
        </InputRightElement>
      </InputGroup>
    </>
  );
});
