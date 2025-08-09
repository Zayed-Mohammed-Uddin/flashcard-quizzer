import tw from "tailwind-styled-components";

const QuestionContainer = tw.div`
	mt-8
`;

const QuestionHeader = tw.div`
	flex
	justify-between
	items-center
	mb-6
`;

const QuestionTitle = tw.h2`
	text-xl
	font-semibold
	text-gray-800
	m-0
`;

const LevelBadge = tw.span`
	bg-red-500
	text-white
	px-4
	py-2
	rounded-full
	text-sm
	font-semibold
	shadow-md
`;

const CardDisplay = tw.div`
	bg-gray-50
	border-2
	border-gray-200
	rounded-xl
	p-16
	mb-8
	text-center
	min-h-[240px]
	flex
	items-center
	justify-center
	shadow-lg
	transition-all
	duration-200
	hover:border-gray-300
	hover:shadow-xl
`;

const CardContent = tw.div`
	text-3xl
	font-medium
	text-gray-800
	leading-relaxed
	break-words
`;

const ActionButtonsContainer = tw.div`
	flex
	gap-4
	w-full
`;

const RevealButton = tw.button`
	w-full
	bg-black
	text-white
	border-none
	rounded-lg
	px-6
	py-4
	text-base
	font-semibold
	cursor-pointer
	flex
	items-center
	justify-center
	gap-3
	transition-all
	duration-200
	shadow-lg
	hover:bg-gray-800
	hover:-translate-y-0.5
	hover:shadow-2xl
	active:translate-y-0
`;

const AnswerButton = tw.button`
	flex-1
	border-none
	rounded-lg
	px-6
	py-4
	text-base
	font-semibold
	cursor-pointer
	transition-all
	duration-200
	text-white
	shadow-lg
	hover:-translate-y-0.5
	hover:shadow-2xl
	active:translate-y-0
	${(props) =>
		props.variant === "incorrect" ? "bg-red-600 hover:bg-red-700" : ""}
	${(props) =>
		props.variant === "correct" ? "bg-green-600 hover:bg-green-700" : ""}
`;

export {
	QuestionContainer,
	QuestionHeader,
	QuestionTitle,
	LevelBadge,
	CardDisplay,
	CardContent,
	ActionButtonsContainer,
	RevealButton,
	AnswerButton,
};
