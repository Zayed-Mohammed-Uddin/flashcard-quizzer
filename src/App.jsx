import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { AppLayout, Error } from "./ui";

import LandingPage from "./components/LandingPage";
import DashboardPage from "./components/Dashboard/DashboardPage";
import CreateDeckPage from "./components/Deck/CreateDeckPage";
import EditDeckPage from "./components/Deck/EditDeckPage";
import QuizPage from "./components/Quiz/QuizPage";

import { editDeckLoader } from "./components/Deck/loader/editDeckLoader";
import { quizDeckLoader } from "./components/Quiz/loader/quizLoader";
import ProtectedRoute from "./ui/ProtectedRoute";

const router = createBrowserRouter(
	[
		{
			path: "/",
			element: <AppLayout />,
			errorElement: <Error />,
			children: [
				{
					path: "/welcome",
					element: <LandingPage />,
				},
				{
					element: <ProtectedRoute />,
					children: [
						{
							index: true,
							element: <DashboardPage />,
						},
						{
							path: "/create-deck",
							element: <CreateDeckPage />,
						},
						{
							path: "/edit-deck/:deckId",
							element: <EditDeckPage />,
							loader: editDeckLoader,
						},
						{
							path: "/quiz-deck/:deckId",
							element: <QuizPage />,
							loader: quizDeckLoader,
						},
					],
				},
			],
		},
	],
	{
		future: {
			v7_startTransition: true,
		},
	}
);

function App() {
	return (
		<RouterProvider
			router={router}
			hydrationData={{}}
			future={{
				v7_startTransition: true,
			}}
		/>
	);
}

export default App;
