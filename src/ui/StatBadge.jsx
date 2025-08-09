import tw from "tailwind-styled-components";

const StatBadge = tw.span`
  ${(props) => {
		if (props.type === "total") {
			return "bg-blue-100 text-blue-800";
		}
		if (props.type === "due") {
			return "bg-gray-900 text-white";
		}
		if (props.type === "score-high") {
			return "bg-green-100 text-green-800"; // 80% and above
		}
		if (props.type === "score-medium") {
			return "bg-yellow-100 text-yellow-800"; // 51-79%
		}
		if (props.type === "score-low") {
			return "bg-red-100 text-red-800"; // 50% and below
		}
		if (props.type === "score") {
			return "bg-green-100 text-green-800"; // fallback
		}
		return "bg-gray-100 text-gray-800";
  }}
  px-2
  py-1
  rounded-full
  text-xs
  font-medium
`;

export default StatBadge;
