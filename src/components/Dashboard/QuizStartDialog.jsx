import * as AlertDialog from "@radix-ui/react-alert-dialog";
import Button from "../../ui/Button";

function QuizStartDialog({ deck, isOpen, onOpenChange, onForceStart }) {
	return (
		<AlertDialog.Root open={isOpen} onOpenChange={onOpenChange}>
			<AlertDialog.Portal>
				<AlertDialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" />
				<AlertDialog.Content
					className="fixed left-1/2 top-1/2 z-50 bg-white p-6 rounded shadow-lg w-[400px]"
					style={{
						transform: "translate(-50%, -50%)",
					}}
				>
					<AlertDialog.Title className="text-lg font-bold mb-2 text-blue-600">
						No Cards Due for Review
					</AlertDialog.Title>
					<AlertDialog.Description className="text-gray-600 mb-4">
						All cards in "{deck.name}" have been reviewed recently
						and are not due yet. Would you like to review all cards
						anyway for extra practice?
					</AlertDialog.Description>
					<div className="flex justify-end gap-2">
						<Button
							variant="secondary"
							onClick={() => onOpenChange(false)}
						>
							Cancel
						</Button>
						<Button variant="primary" onClick={onForceStart}>
							Review All Cards
						</Button>
					</div>
				</AlertDialog.Content>
			</AlertDialog.Portal>
		</AlertDialog.Root>
	);
}

export default QuizStartDialog;
