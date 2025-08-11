import tw from "tailwind-styled-components";

const ContentHeader = tw.header`
  ${(props) =>
		props.type === "vertical"
			? `flex flex-col`
			: `flex flex-col mb-6
  sm:flex-row sm:items-center sm:justify-between sm:gap-12 sm:mb-0`}
`;

export default ContentHeader;
