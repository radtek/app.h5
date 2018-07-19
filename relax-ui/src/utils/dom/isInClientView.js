export default function isInClientView(el, parentEl, threshold = 20) {
	const rect = el.getBoundingClientRect();
	const pRect = (parentEl || window.document.body).getBoundingClientRect();

	/* eslint-disable no-mixed-spaces-and-tabs */
	const elRect =
		threshold > 0
			? {
				left: pRect.left - threshold,
				right: pRect.right + threshold,
				top: pRect.top - threshold,
				bottom: pRect.bottom + threshold
			  }
			: pRect;

	return (
		((elRect.left < rect.left && rect.left < elRect.right) ||
			(elRect.left < rect.right && rect.right < elRect.right)) &&
		((elRect.top < rect.top && rect.top < elRect.bottom) ||
			(elRect.top < rect.bottom && rect.bottom < elRect.bottom))
	);
}
