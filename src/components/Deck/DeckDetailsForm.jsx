import { useNavigate, useNavigation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { IoIosSave } from "react-icons/io";
import { RiResetRightLine } from "react-icons/ri";

import { createDeck, updateDeck } from "../../services/deckApi";
import {
	resetDraftCards,
	selectDraftCards,
	updateDeck as updateDeckAction,
} from "./slice/decksSlice";
import { VALIDATION_RULES, MESSAGES } from "../../utils";
import {
	Form,
	FormGroup,
	Label,
	Input,
	Textarea,
	ActionButtons,
	Button,
	SectionTitle,
} from "../../ui";

function DeckDetailsForm({ mode = "create", initialData = null }) {
	const navigate = useNavigate();
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const draftCards = useSelector(selectDraftCards);
	const isLoading = navigation.state === "submitting";
	const isEditing = mode === "edit";

	const cards = isEditing ? initialData?.cards || [] : draftCards;

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: "onChange",
		defaultValues: {
			deckName: initialData?.name || "",
			description: initialData?.description || "",
		},
	});

	const onSubmit = async (data) => {
		try {
			const deckData = {
				name: data.deckName,
				description: data.description,
				cards,
			};

			if (isEditing && initialData?.id) {
				const updatedDeck = await updateDeck(initialData.id, deckData);

				if (updatedDeck && updatedDeck.id) {
					dispatch(updateDeckAction(updatedDeck));
				} else {
					throw new Error("Invalid response from server");
				}
			} else {
				const newDeck = await createDeck(deckData);

				if (!newDeck || !newDeck.id) {
					throw new Error("Failed to create deck - invalid response");
				}
			}

			if (!isEditing) {
				dispatch(resetDraftCards());
			}
			navigate("/");
		} catch (err) {
			throw new Error(err.message);
		}
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
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
							value: VALIDATION_RULES.DECK_NAME_MIN_LENGTH,
							message: `Deck name must be at least ${VALIDATION_RULES.DECK_NAME_MIN_LENGTH} characters long`,
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
							value: VALIDATION_RULES.DESCRIPTION_MIN_LENGTH,
							message: `Description must be at least ${VALIDATION_RULES.DESCRIPTION_MIN_LENGTH} characters long`,
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
				<Button
					variant="primary"
					type="submit"
					disabled={isLoading}
					order="second"
				>
					<IoIosSave className="w-4 h-4" />
					{isLoading
						? MESSAGES.SAVING
						: isEditing
						? "Update Deck"
						: "Save Deck"}
				</Button>
				<Button
					variant="secondary"
					type="reset"
					disabled={isLoading}
					order="first"
				>
					<RiResetRightLine className="w-4 h-4" />
					Reset
				</Button>
			</ActionButtons>
		</Form>
	);
}

export default DeckDetailsForm;
