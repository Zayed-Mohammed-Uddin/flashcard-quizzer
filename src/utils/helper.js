import { APP_CONFIG } from "./constants";

export const API_BASE_URL = APP_CONFIG.API_BASE_URL;

export const formatDate = (dateString) => {
	if (!dateString) return "No date";

	try {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	} catch {
		return "Invalid date";
	}
};

export const getTimeAgo = (dateString) => {
	if (!dateString) return "Unknown";

	try {
		const date = new Date(dateString);
		const now = new Date();
		const diffInMs = now - date;
		const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

		if (diffInDays === 0) return "Today";
		if (diffInDays === 1) return "Yesterday";
		if (diffInDays < 7) return `${diffInDays} days ago`;
		if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
		return `${Math.floor(diffInDays / 30)} months ago`;
	} catch {
		return "Unknown";
	}
};

export const pluralize = (count, singular, plural = null) => {
	if (count === 1) return singular;
	return plural || `${singular}s`;
};

export const truncateText = (text, maxLength = 100) => {
	if (!text || text.length <= maxLength) return text;
	return `${text.substring(0, maxLength)}...`;
};

export const isValidDeckData = (deckData) => {
	return (
		deckData &&
		typeof deckData.name === "string" &&
		deckData.name.trim().length >= 2 &&
		typeof deckData.description === "string" &&
		deckData.description.trim().length >= 2
	);
};

export const isValidCardData = (cardData) => {
	return (
		cardData &&
		typeof cardData.front === "string" &&
		cardData.front.trim().length > 0 &&
		typeof cardData.back === "string" &&
		cardData.back.trim().length > 0
	);
};

export const generateId = () => {
	return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};
