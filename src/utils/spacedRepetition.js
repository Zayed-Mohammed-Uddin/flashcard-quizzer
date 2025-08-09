/**
 * Spaced Repetition Algorithm Implementation
 * Based on the SM-2 algorithm (SuperMemo 2)
 */

const INTERVALS = {
	1: 1,
	2: 3,
	3: 7,
	4: 14,
	5: 30,
};

/**
 * Calculate the next review date based on user's answer correctness
 * @param {Object} card - The flashcard object
 * @param {boolean} wasCorrect - Whether the user answered correctly
 * @returns {Object} Updated card with new review dates
 */
export function calculateNextReview(card, wasCorrect) {
	const now = Date.now();
	const currentLevel = card.level || 1;
	const reviewCount = (card.reviewCount || 0) + 1;
	let newLevel = currentLevel;
	let easeFactor = card.easeFactor || 2.5;

	if (wasCorrect) {
		newLevel = Math.min(5, currentLevel + 1);
		easeFactor = Math.min(3.0, easeFactor + 0.1);
	} else {
		newLevel = Math.max(1, currentLevel - 1);
		easeFactor = Math.max(1.3, easeFactor - 0.2);
	}

	let intervalDays = INTERVALS[newLevel];

	if (reviewCount > 1) {
		intervalDays = Math.round(intervalDays * easeFactor);
	}

	const intervalMs = intervalDays * 24 * 60 * 60 * 1000;
	const nextReview = now + intervalMs;

	return {
		...card,
		level: newLevel,
		lastReviewed: now,
		nextReview: nextReview,
		reviewCount: reviewCount,
		easeFactor: easeFactor,
	};
}

/**
 * Get cards that are due for review
 * @param {Array} cards - Array of flashcards
 * @returns {Array} Cards that are due for review
 */
export function getDueCards(cards) {
	const now = Date.now();
	return cards.filter((card) => {
		if (!card.nextReview && !card.lastReviewed) {
			return true;
		}
		return card.nextReview && card.nextReview <= now;
	});
}

/**
 * Get human-readable time until next review
 * @param {number} nextReview - Timestamp of next review
 * @returns {string} Human-readable time string
 */
export function getTimeUntilReview(nextReview) {
	if (!nextReview) return "New card";

	const now = Date.now();
	const diff = nextReview - now;

	if (diff <= 0) return "Due now";

	const days = Math.floor(diff / (24 * 60 * 60 * 1000));
	const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));

	if (days > 0) {
		return `${days} day${days > 1 ? "s" : ""}`;
	} else if (hours > 0) {
		return `${hours} hour${hours > 1 ? "s" : ""}`;
	} else {
		return "Less than 1 hour";
	}
}

/**
 * Get card statistics for dashboard
 * @param {Array} cards - Array of flashcards
 * @returns {Object} Card statistics
 */
export function getCardStats(cards) {
	const totalCards = cards.length;
	const dueCards = getDueCards(cards).length;
	const newCards = cards.filter((card) => !card.lastReviewed).length;
	const reviewedCards = cards.filter((card) => card.lastReviewed).length;

	return {
		total: totalCards,
		due: dueCards,
		new: newCards,
		reviewed: reviewedCards,
	};
}
