import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import Container from "./Container";
import Footer from "./Footer";

function AppLayout() {
	return (
		<>
			<Navigation />
			<Container>
				<Outlet />
			</Container>
			<Footer />
		</>
	);
}

export default AppLayout;
