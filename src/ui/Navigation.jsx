import tw from "tailwind-styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GoBook } from "react-icons/go";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { APP_CONFIG } from "../utils";
import {
	selectUsername,
	clearUsername,
} from "../components/User/slice/userSlice";
import Button from "./Button";

const StyledNavigation = tw.nav`
  bg-white
  border-b
  border-gray-200
  px-4
  sm:px-6
  lg:px-8
  py-4
  max-w-7xl
  mx-auto
  flex
  items-center
  justify-between
`;

const NavContentLeft = tw.div`
  flex
  items-center
  gap-3
`;

const NavContentRight = tw.div`
  flex
  items-center
  gap-3
`;

const BookIcon = tw.div`
  text-xl
  sm:text-2xl
  text-blue-600
`;

const Title = tw.h1`
  text-lg
  sm:text-xl
  font-semibold
  text-gray-900
`;

const UserSection = tw.div`
  flex
  items-center
  gap-2
`;

const UserAvatar = tw.div`
  w-8
  h-8
  bg-gray-300
  rounded-full
  flex
  items-center
  justify-center
  text-gray-600
`;

const UserName = tw.span`
  text-sm
  font-medium
  text-gray-700
  hidden
  sm:block
`;

function Navigation() {
	const username = useSelector(selectUsername);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(clearUsername());
		navigate("/welcome");
	};

	return (
		<StyledNavigation>
			<NavContentLeft>
				<BookIcon>
					<GoBook />
				</BookIcon>
				<Title>{APP_CONFIG.APP_NAME}</Title>
			</NavContentLeft>
			<NavContentRight>
				{username && (
					<>
						<UserSection>
							<UserAvatar>
								<FaUser className="w-4 h-4" />
							</UserAvatar>
							<UserName>{username}</UserName>
						</UserSection>
						<Button
							variant="ghost"
							size="sm"
							onClick={handleLogout}
							className="p-2"
						>
							<FaSignOutAlt className="w-4 h-4" />
						</Button>
					</>
				)}
			</NavContentRight>
		</StyledNavigation>
	);
}

export default Navigation;
