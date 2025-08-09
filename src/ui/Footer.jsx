import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";

const StyledFooter = tw.footer`
    bg-gray-100
    text-center
    text-gray-600
    py-6
	hidden
	sm:block
`;
function Footer() {
	return (
		<StyledFooter>
			<p>
				&copy; 2025 Flashcard Quizzer. All rights reserved. Developed by{" "}
				<strong>
					<Link
						to="https://github.com/Zayed-Mohammed-Uddin"
						className="hover:underline"
					>
						Zayed Uddin
					</Link>
					.
				</strong>
			</p>
		</StyledFooter>
	);
}

export default Footer;
