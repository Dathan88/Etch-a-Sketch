const sketchArea = document.getElementById('sketchArea');
const customInput = document.getElementById('customInput');
const customLabel = document.getElementById('customLabel');
const inputWrap = document.getElementById('inputWrap');
const inputArea = document.getElementsByClassName('inputArea');
const btn = document.getElementById('btn');
const btn2 = document.getElementById('btn2');
const customButton = document.getElementById('customButton');

// contains styles for above variables
function eventStyles() {
	btn.addEventListener('click', () => {
		// btn.style.display = 'none';
		inputArea[0].style.display = 'none';
		inputArea[1].style.display = 'inline-flex';
		customLabel.style.display = 'inline-flex';
		inputWrap.style.display = 'inline-flex';
		customButton.style.display = 'inline-flex';
	});

	btn2.addEventListener('click', () => {
		sketchArea.innerHTML = '';
		createBoard();
	});

	customInput.addEventListener('keyup', e => {
		e.preventDefault();
		if (e.keyCode === 13) {
			if (checkValid()) {
				customBoard(customInput.value);
				customInput.value = '';
				inputArea[0].style.display = 'inline-flex';
				inputArea[1].style.display = 'none';
				customLabel.style.display = 'none';
				inputWrap.style.display = 'none';
				customButton.style.display = 'none';
			}
		}
	});

	customButton.addEventListener('click', e => {
		e.preventDefault();
		if (checkValid()) {
			customBoard(customInput.value);
			customInput.value = '';
			inputArea[0].style.display = 'inline-flex';
			inputArea[1].style.display = 'none';
			customLabel.style.display = 'none';
			inputWrap.style.display = 'none';
			customButton.style.display = 'none';
		}
	});
}

// creates board - called from window.onload
function createBoard() {
	sketchArea.innerHTML = '';
	sketchArea.style.gridTemplateColumns = `repeat(16, ${100 / 16}% )`;
	sketchArea.style.gridTemplateRows = `repeat(16, ${100 / 16}%  )`;
	for (i = 0; i < 256; i++) {
		const square = document.createElement('div');
		square.addEventListener('mouseover', e => {
			e.target.style.background = 'black';
		});
		sketchArea.appendChild(square);
	}
}

// called on submit/enter press. Creates custom board w/ randomColor
function customBoard(sq) {
	sketchArea.innerHTML = '';
	sketchArea.style.gridTemplateColumns = `repeat(${sq}, ${100 / sq}% )`;
	sketchArea.style.gridTemplateRows = `repeat(${sq}, ${100 / sq}%  )`;

	for (i = 0; i < sq * sq; i++) {
		const box = document.createElement('div');
		box.addEventListener('mouseover', e => {
			e.target.style.background = randomColor();
		});
		sketchArea.appendChild(box);
	}
}

// called with customBoard/ makes the change color on each pass over
function randomColor() {
	const letters = '0120456789ABCDEF';
	let color = '#';
	for (i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

// check if input is > 0 and < 51
function checkValid() {
	const rules = new RegExp('^([1-9]|[1-4][0-9]|(50))$');
	return rules.test(customInput.value);
}

// create syles and board onload - styles first or code breaks
window.onload = function() {
	eventStyles();
	createBoard();
	customInput.oninput = checkValid;
};
