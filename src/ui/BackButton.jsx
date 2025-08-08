import tw from "tailwind-styled-components";

const BackButton = tw.button`
  flex
  items-center
  gap-2
  text-gray-600
  hover:text-gray-800
  transition-colors
  mb-2
  font-medium
  cursor-pointer
  rounded-md
  p-2

  hover:bg-gray-200/60
`;

export default BackButton;
