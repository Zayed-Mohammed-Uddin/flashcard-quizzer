import tw from "tailwind-styled-components";

const StyledContainer = tw.section`
  w-full
  sm:max-w-4xl
  mx-auto
  sm:my-6
  lg:my-12
  sm:border
  sm:border-gray-200
  sm:rounded-lg
  sm:bg-white
  sm:shadow-sm
  px-10
  py-4
  sm:p-6
  lg:p-8
`;

function Container({ children }) {
	return <StyledContainer>{children}</StyledContainer>;
}

export default Container;
