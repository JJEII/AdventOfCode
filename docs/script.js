// Toggle open/closed all nested DETAILS elements when CTRL-Clicking a SUMMARY element (from its own parent DETAILS, downward)
function toggleAllOpenStates(event) {
	function applyState(el, state) {
		if (el.tagName === "DETAILS") {
			el.open = state;
			for (const e of el.children) {
				applyState(e, state);
			}
		}
	}

	if (event.ctrlKey) {
		event.preventDefault();
		applyState(event.target.parentElement, !event.target.parentElement.open);
	}
}

function tripleclick(event) {
	try {
		if (event.detail === 3) {
			event.preventDefault(); // Prevent further click counts from triggering
			// const pre = event.target;
			// if (pre.tagName === "PRE") {
				// Select all text in the PRE element
				const range = document.createRange();
				range.selectNodeContents(event.target);
				// range.selectNodeContents(pre);
				const sel = window.getSelection();
				sel.removeAllRanges();
				sel.addRange(range);
			// }
		}
	} catch (err) {
	}
}

function initialize() {
	// Open target element if URL has hash (intra-page link)
	const url = window.location.href;
	const id_idx = url.indexOf("#");
	if (id_idx !== -1) {
		const targetElement = document.getElementById(url.substring(id_idx+1));
		console.log(targetElement);
		if (targetElement?.tagName === "DETAILS") {
			targetElement.open = true;
		}
	}
	
	// Add event listeners to all SUMMARY elements so they can be CTRL-Clicked to toggle entire hierarchy open/closed
	Array.from(document.getElementsByTagName("SUMMARY")).forEach( el => {
		el.addEventListener("click", (event) => {
			toggleAllOpenStates(event);
		});
	});
}

window.onload = () => {
	initialize();
};