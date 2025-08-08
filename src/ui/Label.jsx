import tw from "tailwind-styled-components";

const StyledLabel = tw.label`
	mb-1 block
`

function Label({ children, htmlFor }) {
	return <StyledLabel htmlFor={htmlFor}>{children}</StyledLabel>;
}

export default Label;
