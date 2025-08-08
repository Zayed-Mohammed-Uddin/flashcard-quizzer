import { useNavigate, useNavigation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { IoIosSave } from "react-icons/io";
import { RiResetRightLine } from "react-icons/ri";

import { createDeck } from "../../services/deckApi";
import { resetDraftDeck, selectDraftDeck } from "../../store/decksSlice";

import SectionTitle from "../../ui/SectionTitle";
import FormGroup from "../../ui/FormGroup";
import Label from "../../ui/Label";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import ActionButtons from "../../ui/ActionButtons";
import SaveButton from "../../ui/SaveButton";
import ResetButton from "../../ui/ResetButton";
import Form from "../../ui/Form";

function DeckDetailsForm() {
	const navigate = useNavigate();
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const draftDeck = useSelector(selectDraftDeck);
	const cards = draftDeck.cards;
	const isLoading = navigation.state === "submitting";

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: "onChange",
	});

	const onSubmit = async (data) => {
		try {
			const deckData = {
				name: data.deckName,
				description: data.description,
				cards,
			};
			await createDeck(deckData);
			dispatch(resetDraftDeck());
			navigate("/");
		} catch (err) {
			throw new Error(err.message);
		}
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			{isLoading && <Spinner />}
			<SectionTitle>Deck Details</SectionTitle>
			<FormGroup>
				<Label htmlFor="deckName">Deck Name*</Label>
				<Input
					id="deckName"
					type="text"
					placeholder="Enter deck name..."
					{...register("deckName", {
						required: "Deck name is required",
						minLength: {
							value: 2,
							message:
								"Deck name must be at least 2 characters long",
						},
					})}
					className={errors.deckName ? "border-red-500" : ""}
				/>
				{errors.deckName && (
					<p className="text-red-500 text-sm">
						{errors.deckName.message}
					</p>
				)}
			</FormGroup>
			<FormGroup>
				<Label htmlFor="description">Description*</Label>
				<Textarea
					id="description"
					placeholder="Describe what this deck is about..."
					{...register("description", {
						required: "Description is required",
						minLength: {
							value: 2,
							message:
								"Description must be at least 2 characters long",
						},
					})}
					className={errors.description ? "border-red-500" : ""}
				/>
				{errors.description && (
					<p className="text-red-500 text-sm">
						{errors.description.message}
					</p>
				)}
			</FormGroup>

			<ActionButtons>
				<SaveButton
					variant="primary"
					type="submit"
					disabled={isLoading}
				>
					<IoIosSave className="w-4 h-4" />
					{isLoading ? "Saving..." : "Save Deck"}
				</SaveButton>
				<ResetButton
					variant="secondary"
					type="reset"
					disabled={isLoading}
				>
					<RiResetRightLine className="w-4 h-4" />
					Reset
				</ResetButton>
			</ActionButtons>
		</Form>
	);
}

export default DeckDetailsForm;
