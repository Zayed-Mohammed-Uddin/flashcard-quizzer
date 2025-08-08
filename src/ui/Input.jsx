import tw from "tailwind-styled-components";

const Input = tw.input`
  w-full
  px-3
  py-2
  border
  border-gray-300
  rounded-md
  focus:outline-none
  focus:ring-2
  focus:ring-gray-300/30
  focus:border-gray-300/30
  transition-colors
`;

export default Input;
