import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";

import DashboardPage from "./components/Dashboard/DashboardPage";
import CreateDeckPage from "./components/Deck/CreateDeckPage";
import EditDeckPage from "./components/Deck/EditDeckPage";
import QuizPage from "./components/Quiz/QuizPage";

import { editDeckLoader } from "./components/Deck/loader/editDeckLoader";
import { quizDeckLoader } from "./components/Quiz/loader/quizLoader";

const router = createBrowserRouter([
	{
		path: "/",
		element: <AppLayout />,
		errorElement: <Error />,
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
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
