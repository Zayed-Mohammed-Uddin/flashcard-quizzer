import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import Container from "../ui/Container";
import Heading from "../ui/Heading";

function Error() {
	const error = useRouteError();
	const navigate = useNavigate();
	const isRouteError = isRouteErrorResponse(error);

	const handleGoHome = () => navigate("/");
	const handleRetry = () => window.location.reload();

	// Get error details
	const errorTitle = isRouteError ? error.status : "Oops!";
	const errorMessage = isRouteError 
		? error.statusText 
		: "Something went wrong";
	const errorDetails = isRouteError 
		? error.data || "Something went wrong"
		: error?.message || "An unexpected error occurred";

	return (
		<Container>
			<div className="flex flex-col items-center justify-center py-16 text-center min-h-[70vh]">
				<div className="mb-6">
					<Heading as="h1" className="text-4xl text-red-600 mb-4">
						{errorTitle}
					</Heading>
					<Heading as="h2" className="text-xl text-gray-800 mb-2">
						{errorMessage}
					</Heading>
					<p className="text-gray-600">
						{errorDetails}
					</p>
				</div>

				<div className="flex gap-4">
					<Button variant="primary" onClick={handleGoHome}>
						Go Home
					</Button>
					<Button variant="secondary" onClick={handleRetry}>
						Retry
					</Button>
				</div>
			</div>
		</Container>
	);
}

export default Error;
