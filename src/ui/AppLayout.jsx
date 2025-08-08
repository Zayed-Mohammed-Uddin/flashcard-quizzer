import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import Container from "./Container";

function AppLayout() {
	return (
		<>
			<Navigation />
			<Container>
				<Outlet />
			</Container>
		</>
	);
}

export default AppLayout;
