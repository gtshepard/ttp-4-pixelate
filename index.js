
let num_rows = 0;
let num_cols = 0;

let rootElID = 'pixel-board';
let rootElement = document.getElementById(rootElID);

let selectedColor = "red";

let allowFreeDraw = false;

rootElement.onmousedown = function () {

	allowFreeDraw = true;

}

rootElement.onmouseup = function () {

	allowFreeDraw = false;

}

let makeClickable = function (el) {

	el.props = {
		clicked: false
	};

	el.onmousedown = function () {

		if (el.props.clicked == false) {
			el.style.backgroundColor = selectedColor;
		}

		else {
			el.style.backgroundColor = "transparent";
		}

		el.props.clicked = !el.props.clicked;

	}

	el.onmouseover = function () {

		if (allowFreeDraw == false) {

			return;

		}

		if (el.props.clicked == false) {

			el.style.backgroundColor = selectedColor;
			el.props.clicked = true;

		}
	}

}

let addRows = function () {

	let r = document.createElement('tr');

	for (let i = 0; i < num_cols; i++) {

		let c = document.createElement('td');

		makeClickable(c);

		r.appendChild(c);

	}

	num_rows++;

	rootElement.appendChild(r);

}

let removeRows = function () {

	if (num_rows <= 0) {
		return;
	}

	let rows = document.querySelectorAll('#' + rootElID + ' tr');
	let lastRow = rows[rows.length - 1];

	rootElement.removeChild(lastRow);

	num_rows--;

	if (num_rows <= 0) {

		num_cols = 0;

	}

}


let addCols = function () {

	let rows = document.querySelectorAll('#' + rootElID +' tr');

	for (let i = 0; i < rows.length; i++) {

		let c = document.createElement('td');
		
		makeClickable(c);

		rows[i].appendChild(c);

	}

	num_cols++;

}

let removeCols = function () {

	if (num_cols <= 0) {
		return;
	}

	let rows = document.querySelectorAll('#' + rootElID + ' tr');

	for (let i = 0; i < rows.length; i++) {


		rows[i].removeChild(rows[i].lastElementChild);

	}

	num_cols--;

	if (num_cols <= 0) {

		num_rows = 0;

		rootElement.innerHTML = "";
	}
}

document.getElementById('add-rows').onclick = function () { 

	if (num_cols == 0) {
		num_cols = 1;
	}

	addRows();

};

document.getElementById('remove-rows').onclick = function () {
	
	removeRows();

}


document.getElementById('add-cols').onclick = function () {
	
	if (num_cols == 0) {
		addRows();
	}

	addCols();

}

document.getElementById('remove-cols').onclick = function () {
	
	removeCols();

}