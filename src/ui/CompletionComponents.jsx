import tw from "tailwind-styled-components";

const CompletionCard = tw.div`
	bg-gradient-to-br
	from-blue-50
	to-blue-100
	border-2
	border-blue-200
	rounded-2xl
	p-12
	text-center
	mt-8
	shadow-xl
`;

const CompletionScore = tw.div`
	text-6xl
	font-bold
	text-blue-600
	mb-4
`;

const CompletionMessage = tw.p`
	text-lg
	text-gray-700
	mb-8
`;

const ScoreBreakdown = tw.div`
	flex
	justify-center
	gap-8
	mb-8
`;

const ScoreStat = tw.div`
	text-center
`;

const StatNumber = tw.div`
	text-2xl
	font-semibold
	text-gray-800
`;

const StatLabel = tw.div`
	text-sm
	text-gray-600
	mt-1
`;

export {
	CompletionCard,
	CompletionScore,
	CompletionMessage,
	ScoreBreakdown,
	ScoreStat,
	StatNumber,
	StatLabel,
};
