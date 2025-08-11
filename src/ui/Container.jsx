import tw from "tailwind-styled-components";

const StyledSection = tw.section`
  flex items-center justify-center
  min-h-[calc(100vh-136.67px)]
  px-4
`;

const StyledContainer = tw.div`
  w-full max-w-screen-md md:max-w-screen-lg
  sm:border sm:border-gray-200 sm:rounded-lg sm:bg-white sm:shadow-sm
  p-6 md:p-10 sm:my-[3rem]
`;

function Container({ children }) {
	return (
		<StyledSection>
			<StyledContainer>{children}</StyledContainer>
		</StyledSection>
	);
}

export default Container;
