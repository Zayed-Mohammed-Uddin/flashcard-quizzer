import tw from "tailwind-styled-components";

const ContentHeader = tw.header`
  flex
  gap-1
  mb-2
  ${(props) =>
		props.type === "horizontal"
			? "sm:flex-row sm:justify-between sm:items-center"
			: "sm:flex-col"}
`;

export default ContentHeader;
