import tw from "tailwind-styled-components";

const IconButton = tw.button`
  p-1.5
  text-gray-400
  rounded
  hover:bg-gray-100
  transition-all
  duration-200
  flex
  items-center
  justify-center
  cursor-pointer
  ${(props) => {
		if (props.type === "edit") {
			return "hover:text-blue-600 hover:bg-blue-50";
		}
		if (props.type === "delete") {
			return "hover:text-red-600 hover:bg-red-50";
		}
		return "hover:text-gray-600";
  }}
`;

export default IconButton;
