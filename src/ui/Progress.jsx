import tw from "tailwind-styled-components";

const ProgressContainer = tw.div`
	w-full
	my-6
`;

const ProgressHeader = tw.div`
	flex
	justify-between
	items-center
	mb-3
	text-sm
	font-medium
`;

const ProgressLabel = tw.span`
	text-gray-700
`;

const ProgressScore = tw.span`
	text-gray-600
	font-semibold
`;

const ProgressBarWrapper = tw.div`
	w-full
	h-3
	bg-gray-200
	rounded-md
	overflow-hidden
	shadow-inner
`;

const ProgressBarFill = tw.div`
	h-full
	bg-gradient-to-r
	from-blue-500
	to-blue-600
	rounded-md
	transition-all
	duration-[400ms]
	ease-in-out
	shadow-sm
`;

function Progress({ current, total, correct, label = "Progress" }) {
	const progressPercentage = total > 0 ? (current / total) * 100 : 0;

	return (
		<ProgressContainer>
			<ProgressHeader>
				<ProgressLabel>{label}</ProgressLabel>
				<ProgressScore>
					{correct}/{total} correct
				</ProgressScore>
			</ProgressHeader>
			<ProgressBarWrapper>
				<ProgressBarFill style={{ width: `${progressPercentage}%` }} />
			</ProgressBarWrapper>
		</ProgressContainer>
	);
}

export default Progress;
