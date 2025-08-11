import tw from "tailwind-styled-components";

const StyledHeading = tw.h1`
  ${(props) => {
		if (props.as === "h1") {
			return "text-2xl sm:text-3xl font-bold mb-2 text-center";
		}
		if (props.as === "h2") {
			return "text-xl sm:text-2xl font-semibold mb-2 text-center";
		}
		if (props.as === "h3") {
			return "text-lg sm:text-xl font-semibold mb-2 text-center";
		}
		return "text-base sm:text-lg font-medium mb-2 text-center";
  }}
  text-gray-900
`;

function Heading({ children, as = "h1", ...props }) {
	return (
		<StyledHeading as={as} {...props}>
			{children}
		</StyledHeading>
	);
}

export default Heading;
