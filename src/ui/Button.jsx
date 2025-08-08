import tw from "tailwind-styled-components";

const StyledButton = tw.button`
  font-medium
  rounded-md
  transition-all
  duration-200
  ease-in-out
  transform
  sm:hover:scale-105
  sm:active:scale-95
  flex
  items-center
  justify-center
  gap-2
  disabled:opacity-50
  disabled:cursor-not-allowed
  disabled:hover:scale-100
  disabled:hover:shadow-none
  cursor-pointer
  focus:outline-none
  focus:ring-2
  focus:ring-offset-2
  
  ${(props) => {
		if (props.variant === "primary") {
			return "bg-gray-900 text-white hover:bg-gray-800 hover:shadow-xl sm:hover:shadow-lg active:bg-gray-950 focus:ring-gray-900";
		}
		if (props.variant === "secondary") {
			return "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:shadow-lg sm:hover:shadow-md active:bg-gray-100 focus:ring-blue-500";
		}
		if (props.variant === "ghost") {
			return "text-gray-600 hover:text-gray-800 hover:bg-gray-100 hover:shadow-md sm:hover:shadow-sm active:bg-gray-200 focus:ring-gray-500 border border-gray-300";
		}
		return "bg-gray-900 text-white hover:bg-gray-800 hover:shadow-xl sm:hover:shadow-lg active:bg-gray-950 focus:ring-gray-900";
  }}
  
  ${(props) => {
		if (props.size === "sm") {
			return "px-2 sm:px-3 py-1.5 text-xs sm:text-sm";
		}
		if (props.size === "lg") {
			return "px-4 sm:px-6 py-2.5 sm:py-3 text-lg sm:text-base";
		}
		return "px-3 sm:px-4 py-2 text-md sm:text-base";
  }}
`;

function Button({ children, variant = "primary", size = "default", ...props }) {
	return (
		<StyledButton variant={variant} size={size} {...props}>
			{children}
		</StyledButton>
	);
}

export default Button;
